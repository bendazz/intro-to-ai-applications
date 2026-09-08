/* ============================================================
   Section: Practice — chunking by hand (Split Text)
   Sits between chunking-langflow and rag-flow-retrieval in the
   "Retrieval (RAG)" group. Same format as cost-practice /
   budget-practice: pure HTML, no onMount, a row of Toolkit.problem
   click-to-reveal.

   The skill: run Langflow's Split Text algorithm on paper. Students
   have SEEN chunks in Inspect output (chunking-langflow); this makes
   them able to PREDICT the chunks, which is what the no-devices exam
   can actually test.

   Shape: 8 problems, tracing first (1-7), diagnosing last (8-10).
   Deliberately in this order — you cannot diagnose "why is my
   overlap zero" until you can run the pop loop yourself.

   VERIFIED: every atom length, buffer total, pop and chunk length
   below was computed by running the REAL langchain
   CharacterTextSplitter (from the Langflow 1.11 venv) on the exact
   strings quoted, then hand-checked against an instrumented trace.
   Do not adjust a number here without re-running it.

   Key facts the set is built on (from split_text.py + base.py):
     - Phase 1 cut on separator; empty pieces dropped; atoms never
       subdivided later.
     - Phase 2 fit test INCLUDES one separator's length once the
       buffer is non-empty: total + len + sep_len > chunk_size.
     - On emit, pop from the FRONT while total > chunk_overlap.
       If the last atom alone exceeds chunk_overlap the buffer
       empties => overlap ZERO.
     - Joined chunks are .strip()ed.

   Sample documents are rendered by the local `chunkDoc` helper, which
   prints each line's character count in a right-hand gutter (instructor
   asked for this so students spend the time on the algorithm, not on
   counting). Counts are COMPUTED from the text, so they cannot drift;
   they exclude the separator, which keeps the +1 in the fit test as
   something the student still has to supply. A blank line gets an
   EMPTY gutter, not a 0 — under a \n\n separator the blank line is the
   separator itself, and a 0 would imply a third, empty atom.

   GOTCHA: no "$" glyph anywhere in RENDERED HTML (KaTeX pairing).
   Money written in words. Inequalities written as &gt; / &lt;. This
   file does carry two literal "$" outside the html template — one in
   this comment and one in the helper's /\n$/ regex. Both are invisible
   to KaTeX; a checker that does not skip comments and JS will flag
   them as false positives.
   ============================================================ */

/* Renders a sample document with a live character count beside every
   line, so students spend their effort on the algorithm rather than on
   counting. Counts are COMPUTED here — they can never drift out of step
   with the text, and they exclude the separator, which is exactly the
   +1 the fit test makes students remember for themselves. */
const chunkDoc = (raw) => {
  const lines = raw.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<div class="doc">
    <div class="doc-line doc-head"><span class="t"></span><span class="n">chars</span></div>
    ${lines.map((l) => `<div class="doc-line"><span class="t">${esc(l)}</span><span class="n">${l.length || ""}</span></div>`).join("")}
  </div>`;
};

window.SectionContent["chunking-practice"] = {
  title: "Practice: chunking by hand",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Retrieval (RAG) · Practice</div>
    <h1>Practice: chunking by hand</h1>

    <p>You have watched Split Text produce chunks and read them in
    <strong>Inspect output</strong>. Now do it without the computer. If you can
    run the algorithm on paper you can <em>predict</em> what a setting will do
    before you click Run — and, more usefully, work backwards from chunks that
    came out wrong to the setting that caused it.</p>

    <p>Every number below is real: these are the chunks Langflow actually
    produces for the text and settings given.</p>

    ${Toolkit.callout(
      `<strong>The whole algorithm, both phases:</strong>
       <ol>
         <li><strong>Cut.</strong> Break the text at <em>every</em> occurrence of the
         Separator. Throw away any empty pieces. Call what is left
         <strong>atoms</strong>. Chunk Size and Chunk Overlap do nothing here, and
         <strong>no atom is ever split later</strong>.</li>
         <li><strong>Glue.</strong> Walk the atoms left to right into a buffer. Before
         adding an atom, test whether it fits:
         <br><code>buffer + atom + 1 separator &gt; Chunk Size ?</code>
         <br>(Count the separator only when the buffer already has something in it.)
         <ul>
           <li><strong>Fits:</strong> add it. The buffer grows by the atom plus one
           separator.</li>
           <li><strong>Does not fit:</strong> emit the buffer as a chunk. Then
           <strong>pop atoms off the front while the buffer is bigger than Chunk
           Overlap.</strong> Whatever survives is carried into the next chunk. Now add
           the atom.</li>
         </ul></li>
         <li>At the end of the text, emit whatever is still in the buffer.</li>
       </ol>
       <strong>Two consequences worth memorising:</strong> an atom bigger than Chunk
       Size comes out whole (Chunk Size is a <em>target</em>, not a cap), and if the
       last atom in the buffer is bigger than Chunk Overlap the buffer empties and
       your overlap is <em>zero</em>.`,
      { label: "Cheat sheet" }
    )}

    ${Toolkit.problem(
      `<strong>Just the cut.</strong> Separator <code>\\n</code>, Chunk Size
       <strong>1000</strong>, Chunk Overlap <strong>0</strong>. The document is three
       lines:
       ${chunkDoc(`Chapter One
It was cold.
The dog barked.`)}
       How many atoms, how long is each, and how many chunks come out?`,
      `<p><strong>Three atoms:</strong> "Chapter One" (11), "It was cold." (12),
       "The dog barked." (15).</p>
       <p>Now glue. 11, then 11 + 12 + 1 = 24, then 24 + 15 + 1 = 40. Nothing ever
       approaches 1000, so nothing is ever emitted early.</p>
       <p><strong>One chunk, 40 characters</strong> — the whole document.</p>
       <p>The point: when Chunk Size is comfortably larger than the document,
       the separator does not matter and neither does the overlap. Cutting and
       chunking are not the same thing.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Where does the +1 come from?</strong> Separator <code>\\n</code>,
       Chunk Size <strong>40</strong>, Chunk Overlap <strong>0</strong>.
       ${chunkDoc(`Red team the bot.
Try the trickier cases.
Log every refusal.
Swap with a partner.`)}
       Give the chunks and their lengths.`,
      `<p>Atoms: 17, 23, 18, 20.</p>
       <p>Buffer 17. Does atom 2 fit? 17 + 23 = 40, which is <em>not</em> over 40 — so
       you might say yes. But the test is 17 + 23 + <strong>1</strong> = 41, and 41
       <em>is</em> over 40. It does not fit. <strong>Emit chunk 1 = 17 chars</strong>,
       atom 1 on its own.</p>
       <p>That <strong>+1</strong> is the newline that gets put back when atoms are
       joined into a chunk. Here it is the whole ballgame: leave it out and you predict
       two lines glued together, and you are wrong.</p>
       <p>Pop while the buffer is over <strong>0</strong> — which empties it every
       time. Buffer takes atom 2: 23. Atom 3: 23 + 18 + 1 = 42, over 40.
       <strong>Emit chunk 2 = 23</strong>. Empty. Buffer takes atom 3: 18.</p>
       <p>Atom 4: 18 + 20 + 1 = 39, not over 40 — <strong>it fits</strong>. Buffer 39.
       End of text: <strong>emit chunk 3 = 39</strong>.</p>
       <p><strong>Three chunks: 17, 23, 39.</strong></p>
       <p>Two lessons. Count the separator, once, whenever the buffer is not empty.
       And with Chunk Overlap 0 the buffer empties on every emit, so no chunk shares
       anything with its neighbour — which is exactly what overlap 0 means.</p>`
    )}

    ${Toolkit.problem(
      `<strong>The club handbook.</strong> Separator <code>\\n</code>, Chunk Size
       <strong>100</strong>, Chunk Overlap <strong>30</strong>.
       ${chunkDoc(`The Robotics Club meets
every Tuesday at seven.
Dues are twenty dollars
per semester, payable
to the treasurer.
Members must sign the
safety waiver before
using any power tool.
The lab closes at ten.`)}
       How many chunks, and how long is each?`,
      `<p>Atoms, in order: 23, 23, 23, 21, 17, 21, 20, 21, 22.</p>
       <p>Buffer: 23 → 47 → 71 → 93 (atoms 1–4).</p>
       <p>Atom 5 would make 93 + 17 + 1 = 111, over 100.
       <strong>Emit chunk 1 = 93 chars</strong> (atoms 1–4).</p>
       <p>Now pop while the buffer is over 30:
       93 → drop atom 1 → 69 → drop atom 2 → 45 → drop atom 3 → 21. Stop, 21 is not
       over 30. <strong>Atom 4 is carried forward</strong> — that is the overlap.</p>
       <p>Buffer: 21 → 39 (atom 5) → 61 (atom 6) → 82 (atom 7). Atom 8 would make
       104. <strong>Emit chunk 2 = 82 chars</strong> (atoms 4–7). Pop: 82 → 60 → 42 →
       20. <strong>Atom 7 carried.</strong></p>
       <p>Buffer: 20 → 42 (atom 8) → 65 (atom 9). End of text.
       <strong>Emit chunk 3 = 65 chars</strong> (atoms 7–9).</p>
       <p><strong>Three chunks: 93, 82, 65</strong>, each sharing exactly one line
       with the one before it. This is chunking working properly — and notice not one
       chunk is anywhere near 100. Chunk Size is a ceiling you bump into, not a size
       you hit.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Count the overlap.</strong> Separator <code>\\n</code>, Chunk Size
       <strong>60</strong>, Chunk Overlap <strong>30</strong>.
       ${chunkDoc(`Bring goggles.
Bring gloves.
Bring a notebook.
Bring your badge.
Bring a pen.
Bring water.`)}
       Give the chunks — and say how many <em>lines</em> each one shares with the
       previous chunk.`,
      `<p>Atoms: 14, 13, 17, 17, 12, 12.</p>
       <p>Buffer: 14 → 28 → 46 (atoms 1–3). Atom 4 would make 46 + 17 + 1 = 64, over
       60. <strong>Emit chunk 1 = 46</strong> (atoms 1–3). Pop while over 30:
       46 → drop atom 1 → 31 → still over 30, drop atom 2 → 17. <strong>Atom 3
       carried — one line.</strong></p>
       <p>Buffer: 17 → 35 (atom 4) → 48 (atom 5). Atom 6 would make 61, over 60.
       <strong>Emit chunk 2 = 48</strong> (atoms 3–5). Pop while over 30: 48 → drop
       atom 3 → 30. Stop — 30 is not <em>over</em> 30. <strong>Atoms 4 and 5 carried
       — two lines.</strong></p>
       <p>Buffer: 30 → 43 (atom 6). End. <strong>Emit chunk 3 = 43</strong> (atoms
       4–6).</p>
       <p><strong>Three chunks: 46, 48, 43. Chunk 2 shares one line, chunk 3 shares
       two.</strong></p>
       <p>Two things to take away. The overlap is not a fixed amount — it is however
       many whole atoms happen to fit under the budget, and it changes from seam to
       seam. And the test is strictly <em>greater than</em>: a buffer of exactly 30
       against an overlap of 30 stops popping.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Where did my overlap go?</strong> Separator <code>\\n</code>, Chunk
       Size <strong>100</strong>, Chunk Overlap <strong>30</strong>.
       ${chunkDoc(`The lab closes at ten on weeknights.
Members sign the waiver each fall.
Dues are twenty dollars per term.`)}
       Give the chunks. How much overlap do you get?`,
      `<p>Atoms: 36, 34, 33.</p>
       <p>Buffer: 36 → 71 (atoms 1–2). Atom 3 would make 71 + 33 + 1 = 105, over 100.
       <strong>Emit chunk 1 = 71</strong>.</p>
       <p>Pop while over 30: 71 → drop atom 1 → 34. Still over 30, so drop atom 2 →
       <strong>0. The buffer is empty.</strong></p>
       <p>Buffer takes atom 3: 33. End of text. <strong>Emit chunk 2 = 33</strong>.</p>
       <p><strong>Two chunks: 71 and 33, with zero overlap</strong> — even though
       Chunk Overlap is set to 30 and neither chunk is oversized.</p>
       <p>This is the trap. The pop loop does not stop when it has carried "about 30
       characters"; it keeps going while the buffer is over 30, and atom 2 is 34 on
       its own. There is no way to keep part of it, so it goes too. <strong>Overlap
       only survives when the atoms are smaller than the Chunk Overlap
       budget.</strong> Here every atom is bigger, so the answer was always going to
       be zero.</p>`
    )}

    ${Toolkit.problem(
      `<strong>An atom that will not fit.</strong> Separator <code>\\n\\n</code>,
       Chunk Size <strong>60</strong>, Chunk Overlap <strong>10</strong>. Two
       paragraphs, with a blank line between them:
       ${chunkDoc(`Meetings are Tuesday.

Every member must sign the safety waiver before using any power tool in the lab, without exception.`)}
       Give the chunks and their lengths.`,
      `<p><strong>Two</strong> atoms: 21 and <strong>99</strong>. The blank line is not a
       third, empty atom — those two newlines <em>are</em> the separator, and they are
       consumed by the cut. That is why it carries no character count above.</p>
       <p>Buffer: 21. Atom 2 would make 21 + 99 + 2 = 122, over 60.
       <strong>Emit chunk 1 = 21</strong>. Pop while over 10: 21 → drop atom 1 → 0,
       empty.</p>
       <p>Buffer takes atom 2: 99. End of text. <strong>Emit chunk 2 = 99</strong>.</p>
       <p><strong>Two chunks: 21 and 99 — and the second is 39 characters over the
       Chunk Size you set.</strong></p>
       <p>Split Text does not subdivide it, and it does not error. It emits the atom
       whole and Langflow writes a line to its log: <em>"Created a chunk of size 99,
       which is longer than the specified 60."</em> Nothing in the Inspect output
       tells you this happened — you have to notice the length yourself.</p>
       <p>Lowering Chunk Size would not help at all. The only lever that touches this
       chunk is the <strong>Separator</strong>: a paragraph is one atom, and if you
       want it broken up you have to cut at something finer.</p>`
    )}

    ${Toolkit.problem(
      `<strong>One document, two separators.</strong> Chunk Size <strong>70</strong>,
       Chunk Overlap <strong>50</strong>, for both runs. The document (a blank line
       between the two pairs):
       ${chunkDoc(`Dues are twenty dollars.
Pay the treasurer.

The lab closes at ten.
Sign the waiver first.`)}
       Run it once with Separator <code>\\n\\n</code> and once with <code>\\n</code>.
       What comes out each time?`,
      `<p><strong>With <code>\\n\\n</code>:</strong> two atoms, 43 and 45 (each still
       contains a newline inside it — that newline is not a separator on this run).
       Buffer 43; atom 2 would make 43 + 45 + 2 = 90, over 70. Emit chunk 1 = 43. Pop
       while over 50 — 43 is not over 50, so nothing pops… but look again at the
       loop: it also pops while the atom still will not fit and the buffer is not
       empty. 43 + 45 + 2 is still 90, so atom 1 is dropped anyway and the buffer
       empties. Emit chunk 2 = 45 at the end.
       <strong>Two chunks, 43 and 45, zero overlap.</strong></p>
       <p><strong>With <code>\\n</code>:</strong> four atoms — 24, 18, 22, 22.
       Buffer 24 → 43 → 66. Atom 4 would make 89, over 70. Emit chunk 1 = 66 (atoms
       1–3). Pop while over 50: 66 → drop atom 1 → 41, stop.
       <strong>Atoms 2 and 3 carried.</strong> Buffer 41 → 64. End, emit chunk 2 = 64.
       <strong>Two chunks, 66 and 64, sharing two lines.</strong></p>
       <p>Same document, same Chunk Size, same Chunk Overlap — and one run has real
       overlap while the other has none. The <strong>Separator decided it</strong>,
       by deciding how big the atoms were.</p>
       <p>The second run also shows the pop loop's other job: it keeps popping while
       the incoming atom still does not fit, which is why an oversized atom always
       starts a chunk of its own.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Diagnose it.</strong> A student sets Chunk Size <strong>1000</strong>
       and gets chunks of 1,400, 2,100 and 900 characters. They are certain Langflow
       is broken. What actually happened, and what should they change?`,
      `<p>Nothing is broken. Their document has atoms longer than 1000 characters, and
       an atom is never subdivided — it is emitted whole. Chunk Size only decides when
       to <em>stop gluing atoms together</em>; it cannot make an atom smaller.</p>
       <p>Almost certainly the document has unwrapped paragraphs — one paragraph per
       line, no hard line breaks inside — so the default Separator <code>\\n</code>
       produces paragraph-sized atoms.</p>
       <p><strong>The fix is the Separator, not Chunk Size.</strong> Move it down a
       level: from <code>\\n</code> to <code>. </code> for sentences. Lowering Chunk
       Size to 500 would change nothing about the 2,100-character chunk.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Diagnose it.</strong> Another student sets Chunk Overlap to
       <strong>200</strong> and inspects the output: no two chunks share a single
       word. Chunk Size is 1000 and no chunk is over it. Why?`,
      `<p>Their atoms are each longer than 200 characters. Every time a chunk is
       emitted, the pop loop runs while the buffer is over 200 — and since the last
       remaining atom is itself over 200, it gets popped too and the buffer empties.
       Zero overlap, every seam, silently.</p>
       <p><strong>The fix is again the Separator.</strong> Chunk Overlap can only be
       spent in whole atoms, so the atoms have to be comfortably smaller than the
       overlap budget before any of them can survive. Raising Chunk Overlap to 400
       would also work, but it is the blunter move — it makes every chunk overlap by
       a large fraction, which multiplies how much you store and search.</p>
       <p>The general rule: <strong>Separator and Chunk Overlap have to be chosen
       together.</strong> An overlap number means nothing until you know how big your
       atoms are.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Design it.</strong> You are chunking a 40-page club handbook for a RAG
       app. The file is prose: paragraphs of three to six sentences, separated by
       blank lines, hard-wrapped at about 80 characters a line. You want chunks of
       roughly 800 characters that overlap by a sentence or so. What do you set, and
       what do you check first in Inspect output?`,
      `<p><strong>Separator.</strong> Not <code>\\n\\n</code> — that gives
       paragraph-sized atoms of maybe 400 to 900 characters, so a single paragraph
       could exceed 800 and come out oversized, and no overlap would survive.
       Not <code>\\n</code> either, at least not obviously: the file is hard-wrapped,
       so atoms are 80-character lines. That is actually workable. <code>. </code>
       gives sentence atoms of roughly 100 to 150 characters, which is the cleanest
       match to "overlap by a sentence or so".</p>
       <p><strong>Chunk Size 800. Chunk Overlap 150 or so</strong> — big enough to
       carry one sentence atom, small enough that you are not duplicating a quarter
       of the document.</p>
       <p><strong>What to check first:</strong> the <em>lengths</em> in the text
       column. Two questions, in this order — is any chunk longer than 800 (an atom
       too big, so cut finer), and do consecutive chunks actually repeat a sentence
       (if not, your atoms are bigger than the overlap). Both failures are invisible
       unless you look for them; neither raises an error.</p>
       <p>And the honest answer to "which separator": run it, look, adjust, run
       again. That loop is the skill — these problems just let you predict what you
       are about to see.</p>`
    )}

    <h2>What you can now do</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="cpr-1" /><label for="cpr-1">Cut a document into
        atoms and know that nothing later will split one.</label></li>
      <li><input type="checkbox" id="cpr-2" /><label for="cpr-2">Run the fit test
        with the separator counted, and produce the chunks by hand.</label></li>
      <li><input type="checkbox" id="cpr-3" /><label for="cpr-3">Run the pop loop and
        say exactly which atoms carry forward as overlap.</label></li>
      <li><input type="checkbox" id="cpr-4" /><label for="cpr-4">Explain an oversized
        chunk, and know that Chunk Size cannot fix it.</label></li>
      <li><input type="checkbox" id="cpr-5" /><label for="cpr-5">Explain a zero
        overlap, and reach for the Separator rather than the overlap number.</label></li>
    </ul>
  `
};
