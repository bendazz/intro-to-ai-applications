/* ============================================================
   Section: Hands-on chunking in Langflow (Split Text), NO embeddings
   Fourth RAG section — LAB (slows the hands-on down per instructor).
   Practice ONLY chunking with the Split Text component; embeddings
   come later. Built around the doc's own advice: run -> Inspect
   output -> adjust -> rerun, so students SEE the real chunks.

   VERIFIED against langflow source (gh: src/lfx/.../processing/
   split_text.py, repo 2026-06-29) + split-text.mdx:
     - uses langchain CharacterTextSplitter (SINGLE separator, NOT
       recursive).
     - defaults: separator "\n", chunk_size 1000, chunk_overlap 200,
       keep_separator "False" (opts False/True/Start/End).
     - MECHANIC: split on separator FIRST, then merge small pieces up
       to chunk_size; a piece already larger than chunk_size is output
       AS-IS (never subdivided). => chunk_size is a TARGET not a cap.
       Matches instructor's observations (natural breaks win; overlap
       can seem ignored at clean breaks).
     - _fix_separator auto-corrects "/n"->newline, "/t"->tab.
   Inputs accepted: Message/JSON/Table; outputs Chunks or DataFrame;
   the "text" column holds the chunks. Workflow: add Text Input or
   Read File -> Split Text -> Run component -> Inspect output.

   Pure HTML (no onMount). Predict/troubleshoot via Toolkit.problem
   with custom labels. One flow SVG. Literal "\n" shown by writing
   \\n in source. No "$", no KaTeX math.
   ============================================================ */

window.SectionContent["chunking-langflow"] = {
  title: "Hands-on: chunking in Langflow",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 22 · Lab</div>
    <h1>Hands-on: chunking in Langflow</h1>

    <p>Last section was the idea. Now let's actually cut a document into chunks in
    Langflow — and only that. No embeddings, no vector store yet; just the
    <strong>Split Text</strong> component and the settings you played with. The good
    news: Langflow lets you <em>see</em> the chunks it makes. The catch: Split Text
    has a couple of defaults that surprise almost everyone the first time. We'll
    meet them on purpose.</p>

    <h2>Build the tiny flow</h2>
    <p>Two boxes is all we need.</p>

    <ol class="steps">
      <li><strong>Add some text.</strong> Drag a <strong>Text Input</strong> onto the
      canvas and paste a few paragraphs into it. (Prefer a real file? Use a
      <strong>Read File</strong> component instead and upload a
      <code>.txt</code> — for example
      <a href="sections/handbook-robotics.txt" download>this club handbook</a>.)</li>
      <li><strong>Add Split Text.</strong> Drag on a <strong>Split Text</strong>
      component.</li>
      <li><strong>Wire them.</strong> Connect the text box's output into Split Text's
      <strong>Input</strong> port. (Split Text accepts Message, JSON, or Table — a
      Text Input's Message is fine.)</li>
      <li><strong>Leave the settings at their defaults</strong> for the very first
      run: Chunk Size 1000, Chunk Overlap 200, Separator a single newline.</li>
      <li><strong>Run just this box.</strong> Click <strong>Run component</strong> on
      Split Text (you do <em>not</em> need the Playground — there's no chat here).</li>
      <li><strong>Look at what it made.</strong> Click <strong>Inspect output</strong>.
      The <strong>text</strong> column is your list of chunks. Count them; notice how
      long they are.</li>
    </ol>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 620 120" role="img"
           aria-label="Text Input flows into Split Text, whose output you inspect">
        <defs>
          <marker id="ck-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>
        <rect x="16" y="40" width="150" height="46" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="91" y="61" font-size="12" text-anchor="middle" fill="#2b3444">Text Input</text>
        <text x="91" y="77" font-size="10" text-anchor="middle" fill="#8a94a6">or Read File</text>

        <line x1="166" y1="63" x2="236" y2="63" stroke="#8a94a6" stroke-width="2" marker-end="url(#ck-arrow)"></line>

        <rect x="236" y="40" width="150" height="46" rx="8" fill="#e9eefc" stroke="#9db0ea"></rect>
        <text x="311" y="61" font-size="12" text-anchor="middle" fill="#2b3444">Split Text</text>
        <text x="311" y="77" font-size="10" text-anchor="middle" fill="#8a94a6">size · overlap · separator</text>

        <line x1="386" y1="63" x2="456" y2="63" stroke="#8a94a6" stroke-width="2" marker-end="url(#ck-arrow)"></line>

        <rect x="456" y="40" width="150" height="46" rx="8" fill="#e6f0ee" stroke="#8bb8ad"></rect>
        <text x="531" y="61" font-size="12" text-anchor="middle" fill="#2b3444">Inspect output</text>
        <text x="531" y="77" font-size="10" text-anchor="middle" fill="#8a94a6">your chunks</text>
      </svg>
    </div>

    <h2>How Split Text actually thinks</h2>
    <p>Here is the mental model that explains everything you'll see. Split Text works
    in two steps:</p>
    <ol class="steps">
      <li><strong>Break on the separator — and nowhere else.</strong> It cuts the
      text everywhere the <strong>Separator</strong> appears. The default separator
      is a single newline (<code>\\n</code>), so out of the box it breaks at every
      line.</li>
      <li><strong>Pack pieces up to Chunk Size.</strong> It then glues those pieces
      back together in order, ending each chunk just before it would pass
      <strong>Chunk Size</strong> characters.</li>
    </ol>

    ${Toolkit.callout(
      `The step that trips everyone: Split Text <strong>never cuts inside a piece</strong>
       from step 1. So if a single piece is already longer than Chunk Size, that whole
       piece comes out as one <strong>oversized chunk</strong>. <strong>Chunk Size is a
       target, not a hard limit.</strong>`,
      { type: "warn", label: "The big surprise" }
    )}

    <p>This is exactly why natural breaks win: Split Text respects your separator
    above all, and would rather hand you a too-big chunk than slice through the
    middle of one.</p>

    <h2>The settings, and what they really do</h2>
    <ul>
      <li><strong>Chunk Size</strong> (default 1000) — the target length in
      <em>characters</em> (not words). A ceiling it aims for while packing, but will
      exceed for an un-splittable piece.</li>
      <li><strong>Chunk Overlap</strong> (default 200) — how many characters each new
      chunk repeats from the end of the previous one. You'll see it most clearly when
      several small pieces get packed together; it can look absent right at a clean
      separator break, where pieces line up on the boundary. Inspect to see what
      really happened.</li>
      <li><strong>Separator</strong> (default <code>\\n</code>) — the one boundary it
      cuts on. Set it to <code>\\n\\n</code> to break on blank lines between
      paragraphs, or a space to break between words. This is your biggest lever —
      change this first.</li>
      <li><strong>Keep Separator</strong> (default off) — whether the separator
      characters stay in the chunks, and where. Leave it off to start.</li>
    </ul>

    ${Toolkit.callout(
      `Type the separator carefully. A real newline is a <strong>backslash</strong>-n
       (<code>\\n</code>). If you slip and type a forward slash (<code>/n</code>),
       Langflow quietly fixes that common mistake for you — but they are not the same
       character, so build the habit of using <code>\\n</code>.`,
      { label: "Small gotcha" }
    )}

    <h2>Guided experiments</h2>
    <p>Change one setting, hit <strong>Run component</strong>, then
    <strong>Inspect output</strong> again. Predict first, then reveal.</p>

    ${Toolkit.problem(
      `<strong>Paragraphs, tiny size.</strong> Your sample has a paragraph about 600
       characters long. You set Separator to <code>\\n\\n</code> and Chunk Size to
       200. How long will the chunk holding that paragraph be?`,
      `About <strong>600 characters</strong> — a single oversized chunk. With the
       separator set to blank lines, that paragraph is one indivisible piece, and
       Split Text never cuts inside a piece. It hands you the whole 600-character
       paragraph even though you asked for 200. To actually break it up, pick a finer
       separator (a single <code>\\n</code>, or a space), or clean the text first.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `<strong>A separator that isn't there.</strong> You set Separator to
       <code>###</code>, but your document contains no <code>###</code> anywhere.
       What comes out of Split Text?`,
      `<strong>One chunk containing the entire document.</strong> If the separator
       never appears, there's nothing to cut on, so the whole text stays as a single
       piece — and since it's almost certainly longer than Chunk Size, it comes out as
       one giant oversized chunk. A lone huge chunk is the classic sign your separator
       didn't match the document.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `<strong>Everything at default.</strong> You paste text whose paragraphs are
       separated by blank lines and leave every setting alone. Roughly how does it
       split?`,
      `The default separator is a <em>single</em> newline (<code>\\n</code>), so it
       breaks at <strong>every line</strong>, then packs those lines together up to
       1000 characters. Depending on your text, that can merge several short lines
       into one chunk, or keep one long line whole. If you were expecting
       paragraph-sized chunks, that's the fix: set the separator to
       <code>\\n\\n</code>.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `<strong>Nothing changed.</strong> You carefully typed <code>/n</code> as your
       separator to split on new lines, but the output looks like it split on
       something else — or barely split at all. Why?`,
      `<code>/n</code> (forward slash) is not a newline; <code>\\n</code> (backslash)
       is. Langflow tries to auto-correct the common <code>/n</code> slip to a real
       newline, so it may "work" in a confusing way — but if you meant the literal
       characters slash-n, that string simply doesn't appear in your text, so it
       barely splits. Use <code>\\n</code>.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.callout(
      `<strong>The habit that saves you:</strong> after every change, Run the
       component and Inspect the output. Chunking is easy to get wrong silently — the
       flow still runs, it just chops the document in a way you didn't intend. Looking
       at the actual chunks is the whole skill.`,
      { type: "ai", label: "Do this every time" }
    )}

    <h2>What you can now do</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="ckl-1" /><label for="ckl-1">Wire Text Input (or
        Read File) into Split Text and run just that component.</label></li>
      <li><input type="checkbox" id="ckl-2" /><label for="ckl-2">Inspect the output
        and read the actual chunks in the text column.</label></li>
      <li><input type="checkbox" id="ckl-3" /><label for="ckl-3">Explain why Chunk
        Size is a target, not a hard limit — and recognize an oversized chunk.</label></li>
      <li><input type="checkbox" id="ckl-4" /><label for="ckl-4">Use the Separator as
        your main lever (<code>\\n</code> vs <code>\\n\\n</code>) and predict the
        result.</label></li>
    </ul>

    <p>You can now turn a document into clean chunks and check them by eye — the raw
    material a retrieval system runs on. Those chunks are what we'll turn into points
    and store when we build the full flow.</p>
  `,
};
