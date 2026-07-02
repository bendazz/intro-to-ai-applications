/* ============================================================
   Section: When documents fight back — cleaning & wrangling
   The practical, messy reality of chat-with-a-document, a bit
   deeper on Langflow's no-code wrangler components (instructor
   asked for more depth here).

   Verified vs repo docs (read-file, text-operations, type-convert,
   parser, split-text mdx):
     - Read File: Raw vs Structured Content; Advanced Parser
       (Docling) → cleaner text + Markdown + OCR (EasyOCR). Caveats:
       not default on Intel Mac; Windows Dev Mode; one file at a time.
     - Text Operations: one op per box (Text Clean = Remove Extra
       Spaces / Remove Empty Lines / Remove Special Characters;
       plus Replace [regex], Extract, Head/Tail, Strip, Word Count).
       Run component + Inspect output.
     - Type Convert: Message <-> JSON <-> Table adapter.
     - Parser: Table/JSON -> Message via {column} template (one
       Message per row) or Stringify.
     - Split Text: chunking (chunk_size/overlap/separator) — a RAG
       primitive, previewed here, used properly later.

   Honest interactive cleaner does the cleaning in real JS.
   ============================================================ */

window.SectionContent["document-wrangling"] = {
  title: "When documents fight back",

  html: `
    <div class="eyebrow">Working with documents · Section 13</div>
    <h1>When documents fight back: cleaning and wrangling</h1>

    <p>Our sample document last section was a tidy little text file, and
    everything just worked. Real documents are not tidy. Point your shiny new
    document bot at an actual PDF and you may get scrambled columns, page
    numbers wedged into the middle of sentences, strange characters, or — worst
    of all — nothing at all. This is not you doing something wrong. Wrestling
    messy real-world files into clean text is a normal, everyday part of building
    document apps, and Langflow gives you real no-code tools for it.</p>

    <h2>The golden habit: inspect what you actually extracted</h2>

    <p>Before you trust <em>any</em> document app, do one thing: click
    <strong>Run component</strong> on your <strong>Read File</strong> box and
    then <strong>Inspect</strong> its output. Read the text the way the model
    will receive it. If it is garbled, your bot is doomed no matter how clever
    your prompt is — <strong>garbage in, garbage out.</strong> Almost nobody
    looks, and it is the single most useful habit in this whole topic.</p>

    <h2>Why PDFs are the hard case</h2>

    <p>PDFs cause the most grief, for two different reasons:</p>
    <ul>
      <li><strong>Text PDFs vs scanned PDFs.</strong> A "text" PDF really has the
      words inside it, ready to extract. A <strong>scanned</strong> PDF is just a
      <em>photograph</em> of a page — to a computer it is a picture, with no text
      to pull out at all. Getting words out of a picture needs
      <strong>OCR</strong> (optical character recognition), which reads the
      letters out of the image.</li>
      <li><strong>Layout chaos.</strong> Even text PDFs go sideways: two-column
      pages get read straight across so the columns interleave into nonsense;
      tables collapse into a jumble; headers, footers, and page numbers get mixed
      into the real content.</li>
    </ul>

    <p>Langflow's lever for this is inside the <strong>Read File</strong> box:
    turn on <strong>Advanced Parser</strong>. It uses a stronger engine (Docling)
    that extracts far cleaner text from PDFs and Word documents, lays it out as
    tidy Markdown, and can run <strong>OCR</strong> on scanned pages. And
    remember Read File offers <strong>Raw Content</strong> (plain text, what we
    have used) versus <strong>Structured Content</strong> (for spreadsheets and
    data files, which come out as a table rather than prose).</p>

    ${Toolkit.callout(
      `A few honest gotchas with Advanced Parser, worth knowing before class:
       the engine is <strong>not installed by default on Intel Macs</strong>
       (Apple-Silicon Macs are fine), <strong>Windows may need "Developer
       Mode"</strong> turned on, and it processes <strong>one file at a
       time</strong>. So on some lab machines, plain extraction is all you get —
       which makes the cleanup tools below even more valuable.`,
      { type: "note", label: "Before you rely on it" }
    )}

    <h2>The wrangler toolbox</h2>

    <p>Here are the no-code boxes you reach for when the text needs work. Each
    does one small job; you chain them like an assembly line.</p>

    <h3>Text Operations — the workhorse</h3>
    <p>The <strong>Text Operations</strong> box performs one cleanup operation at
    a time. The most useful for documents is <strong>Text Clean</strong>, which
    can <em>remove extra spaces</em>, <em>remove empty lines</em>, and
    <em>remove special characters</em>. (Others include find-and-replace,
    pulling out a pattern, taking just the first or last part of a long file, and
    counting words.) You pick one operation per box and chain several boxes if
    you need more than one. Try the cleaner below — it really runs the cleaning,
    right here:</p>

    ${Toolkit.widget(
      "Text cleaner (the same idea as Text Clean)",
      `<div class="emb-vec">
         <div class="emb-vec-head">Raw extracted text (messy)</div>
         <div class="emb-vec-nums" id="wr-raw" style="white-space:pre-wrap"></div>
       </div>
       <div class="emb-chips" id="wr-ops" style="margin-top:12px"></div>
       <div class="emb-vec" style="margin-top:12px">
         <div class="emb-vec-head">After cleaning</div>
         <div class="emb-vec-nums" id="wr-clean" style="white-space:pre-wrap"></div>
       </div>`
    )}

    <p>Notice that "remove special characters" is <em>aggressive</em> — it strips
    punctuation too, not just the junk. That is the whole art of wrangling: clean
    enough to help, not so much that you damage the meaning. Always inspect the
    result.</p>

    <h3>Type Convert — the adapter</h3>
    <p>Remember from <a href="#langflow-canvas-basics">Section 3</a> that ports
    are color-coded because boxes speak different <strong>data types</strong> —
    plain text (Message), tables, structured data. Sometimes two boxes refuse to
    connect because their types do not match. <strong>Type Convert</strong> is
    the adapter: it reshapes data from one type into another (for example, a
    table into plain text) so the next box will accept it.</p>

    <h3>Parser — when your "document" is a spreadsheet</h3>
    <p>Plenty of "documents" are really tables — a CSV of products, a roster, a
    price list. A model reads prose far better than raw rows, so the
    <strong>Parser</strong> box turns each row into a sentence using a template
    with <code>{column}</code> blanks (the same blank-filling idea from Section
    3). For example <code>{name} was hired on {start_date} as {title}.</code>
    turns one spreadsheet row into one clean sentence the model can actually
    use.</p>

    <h3>Split Text — for when it is just too big</h3>
    <p>If a document is enormous, the <strong>Split Text</strong> box chops it
    into smaller <strong>chunks</strong>. We are only flagging it here — it is
    the key to handling large documents, and we will use it properly when we
    tackle exactly that problem.</p>

    <table class="dist-table">
      <thead><tr><th>The problem</th><th>Reach for</th></tr></thead>
      <tbody>
        <tr><td>A PDF extracts as garbage, or it is scanned</td><td>Read File → <strong>Advanced Parser</strong> (with OCR)</td></tr>
        <tr><td>Messy spacing, blank lines, junk characters</td><td><strong>Text Operations</strong> → Text Clean</td></tr>
        <tr><td>Find-and-replace, or pull out a pattern</td><td><strong>Text Operations</strong> → Replace / Extract</td></tr>
        <tr><td>Two boxes will not connect (wrong type)</td><td><strong>Type Convert</strong></td></tr>
        <tr><td>Your source is a spreadsheet or table</td><td><strong>Parser</strong> (row → sentence)</td></tr>
        <tr><td>The document is far too big</td><td><strong>Split Text</strong> (chunk it) — soon</td></tr>
      </tbody>
    </table>

    <h2>Build a little cleanup pipeline</h2>
    <p>The real power is chaining these. To clean up a document before it reaches
    your bot, you just slot a wrangler box into the flow:</p>
    <ol class="steps">
      <li>Take your document flow from last section. Between the
        <strong>Read File</strong> box and the Prompt Template, add a
        <strong>Text Operations</strong> box set to <strong>Text Clean</strong>.</li>
      <li>Wire <strong>Read File → Text Operations → Prompt Template</strong> (the
        document blank), so the text is scrubbed on its way through.</li>
      <li><strong>Inspect after each box</strong> to watch the text get cleaner
        step by step. Each box does one job; the flow is your cleanup assembly
        line.</li>
    </ol>

    ${Toolkit.callout(
      `This is the same data-flow idea from your very first canvas: text moving
       through a series of small, single-job boxes. "Wrangling" sounds advanced,
       but it is just a few more boxes in the pipe, each tidying the text a
       little more before the model sees it.`,
      { type: "ai", label: "It is still just a pipeline" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>Real documents are messy; the first habit is to <strong>inspect what
      Read File actually extracted</strong> — garbage in, garbage out.</li>
      <li><strong>PDFs</strong> are the hard case: scanned ones need
      <strong>OCR</strong>, and layouts scramble. Read File's <strong>Advanced
      Parser</strong> extracts much cleaner text (with caveats on some machines).</li>
      <li>The no-code wrangler boxes: <strong>Text Operations</strong> (clean,
      replace, extract), <strong>Type Convert</strong> (adapter between data
      types), <strong>Parser</strong> (table rows → sentences), and
      <strong>Split Text</strong> (chunk big files).</li>
      <li>You clean documents the same way you build everything else: a
      <strong>pipeline</strong> of small single-job boxes, inspected at each step.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- Honest text cleaner: really runs the cleaning in JS ---- */
    const RAW =
      "The   Northwood   Community   Center   is open\n" +
      "\n" +
      "   to everyone.\n" +
      "\n" +
      "— Page 3 —\n" +
      "\n" +
      "Membership   costs   forty   dollars   a   month.\n" +
      "\n" +
      "\n" +
      "Classes   include   yoga★   and   water   aerobics☆.";

    const OPS = [
      { id: "pages",   label: "Strip page markers" },
      { id: "empty",   label: "Remove empty lines" },
      { id: "spaces",  label: "Collapse extra spaces" },
      { id: "special", label: "Remove special characters" },
    ];

    const rawEl = root.querySelector("#wr-raw");
    const opsEl = root.querySelector("#wr-ops");
    const cleanEl = root.querySelector("#wr-clean");
    const on = new Set();

    rawEl.textContent = RAW;

    function clean() {
      let lines = RAW.split("\n");
      if (on.has("pages")) {
        lines = lines.filter((l) => !/^\s*—?\s*page\s+\d+\s*—?\s*$/i.test(l));
      }
      if (on.has("empty")) {
        lines = lines.filter((l) => l.trim() !== "");
      }
      let text = lines.join("\n");
      if (on.has("spaces")) {
        text = text
          .split("\n")
          .map((l) => l.replace(/ {2,}/g, " ").trim())
          .join("\n");
      }
      if (on.has("special")) {
        text = text.replace(/[^A-Za-z0-9\s]/g, "");
      }
      cleanEl.textContent = text;
    }

    OPS.forEach((op) => {
      const b = document.createElement("button");
      b.className = "emb-chip";
      b.dataset.id = op.id;
      b.textContent = op.label;
      b.addEventListener("click", () => {
        if (on.has(op.id)) on.delete(op.id);
        else on.add(op.id);
        b.classList.toggle("on", on.has(op.id));
        clean();
      });
      opsEl.appendChild(b);
    });

    clean();
  },
};
