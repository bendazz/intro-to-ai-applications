/* ============================================================
   Section: The big idea behind RAG
   First RAG section — CONCEPT (no inline problems; ends "What you
   learned"). Pays off three doorways already built: memory forgets
   (S7), document won't fit the context window (S15), sending it all
   is expensive (S16-18). One fix: store the doc in PIECES, fetch
   only the relevant piece per question, put THAT in the prompt.

   Interactive "retrieval" demo (onMount): pick a question → the
   relevant chunk lights up among 6, others dim, and the small
   assembled prompt appears ("1 of 6 pieces sent"). HONEST: the
   question→chunk match is hand-authored for illustration; how the
   computer actually finds it (by meaning) is its own next topic —
   present-tense motivation only, NOT a forward teaser.

   Reuses .emb-chip/.emb-chip.on + .emb-vec + .flowsvg. No new CSS.
   No "$" glyph; no KaTeX math. Literal Unicode → in JS strings.
   ============================================================ */

window.SectionContent["rag-intuition"] = {
  title: "The big idea behind RAG",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 19</div>
    <h1>The big idea behind RAG</h1>

    <p>We keep hitting the same wall from three directions. It is time to knock
    it down.</p>

    <ul>
      <li><strong>The chatbot forgets</strong> (Section 7): the model has no memory
      of its own, so the app has to hand it the conversation every time.</li>
      <li><strong>The document will not fit</strong> (Section 15): a big document
      overflows the context window — the model's desk is large but finite.</li>
      <li><strong>Sending it all is expensive</strong> (Sections 16–18): even when
      it fits, you pay for the whole document on <em>every single question</em>.</li>
    </ul>

    <p>All three point to the same fix. Stop handing over the whole book. Instead,
    <strong>store the document in pieces, and for each question fetch only the few
    pieces that are actually relevant</strong> — then put just those in the prompt.
    That is <strong>RAG</strong>: <strong>R</strong>etrieval-<strong>A</strong>ugmented
    <strong>G</strong>eneration. Retrieve the relevant bits, then let the model
    generate its answer using them.</p>

    ${Toolkit.callout(
      `Think of an <strong>open-book exam</strong>. You do not reread the entire
       textbook for every question — you flip to the one page that answers it, and
       work from there. RAG gives the model that same superpower: a librarian who
       hands it exactly the right page, and nothing else.`,
      { label: "The metaphor" }
    )}

    <h2>It happens in two phases</h2>
    <p>The trick to understanding RAG is to see that the work splits into two
    separate times.</p>

    <ol class="steps">
      <li><strong>Ahead of time (indexing).</strong> Take the document, chop it
      into bite-sized <strong>chunks</strong> (a paragraph or so each), and store
      them somewhere searchable. You do this <em>once</em>, before anyone asks
      anything.</li>
      <li><strong>At question time (retrieval).</strong> A question comes in. Find
      the chunks most relevant to <em>that question</em>, paste only those into the
      prompt as context, and let the model answer — grounded in the pieces you
      handed it, exactly like Section 12.</li>
    </ol>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 720 340" role="img"
           aria-label="Two-phase RAG diagram: indexing ahead of time, retrieval at question time">
        <defs>
          <marker id="rag-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>

        <!-- Phase 1: indexing -->
        <text x="16" y="28" font-size="13" font-weight="700" fill="#5b6472">AHEAD OF TIME — index the document</text>
        <rect x="16" y="42" width="120" height="52" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="76" y="66" font-size="12" text-anchor="middle" fill="#2b3444">Document</text>
        <text x="76" y="82" font-size="11" text-anchor="middle" fill="#8a94a6">(the whole book)</text>

        <line x1="136" y1="68" x2="196" y2="68" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>
        <text x="166" y="58" font-size="10" text-anchor="middle" fill="#8a94a6">split</text>

        <rect x="196" y="44" width="86" height="15" rx="3" fill="#fff" stroke="#c7cede"></rect>
        <rect x="196" y="62" width="86" height="15" rx="3" fill="#fff" stroke="#c7cede"></rect>
        <rect x="196" y="80" width="86" height="15" rx="3" fill="#fff" stroke="#c7cede"></rect>
        <text x="239" y="108" font-size="11" text-anchor="middle" fill="#8a94a6">chunks</text>

        <line x1="282" y1="68" x2="342" y2="68" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>
        <text x="312" y="58" font-size="10" text-anchor="middle" fill="#8a94a6">store</text>

        <path d="M342,54 a44,10 0 0,1 88,0 l0,40 a44,10 0 0,1 -88,0 z" fill="#e6f0ee" stroke="#8bb8ad"></path>
        <ellipse cx="386" cy="54" rx="44" ry="10" fill="#f0f7f5" stroke="#8bb8ad"></ellipse>
        <text x="386" y="86" font-size="12" text-anchor="middle" fill="#2b3444">the store</text>

        <!-- Phase 2: retrieval -->
        <text x="16" y="176" font-size="13" font-weight="700" fill="#5b6472">AT QUESTION TIME — answer one question</text>
        <rect x="16" y="196" width="120" height="46" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="76" y="224" font-size="12" text-anchor="middle" fill="#2b3444">Question</text>

        <line x1="136" y1="219" x2="342" y2="140" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>
        <text x="228" y="176" font-size="10" text-anchor="middle" fill="#8a94a6">find the relevant chunks</text>

        <line x1="386" y1="104" x2="386" y2="150" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>

        <rect x="330" y="150" width="112" height="30" rx="6" fill="#fff" stroke="#8bb8ad" stroke-width="2"></rect>
        <text x="386" y="169" font-size="11" text-anchor="middle" fill="#2b3444">just the right piece</text>

        <line x1="252" y1="219" x2="470" y2="219" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>
        <line x1="386" y1="180" x2="386" y2="204" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>

        <rect x="470" y="196" width="96" height="46" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="518" y="219" font-size="12" text-anchor="middle" fill="#2b3444">Prompt</text>
        <text x="518" y="234" font-size="10" text-anchor="middle" fill="#8a94a6">piece + question</text>

        <line x1="566" y1="219" x2="626" y2="219" stroke="#8a94a6" stroke-width="2" marker-end="url(#rag-arrow)"></line>
        <rect x="626" y="196" width="80" height="46" rx="8" fill="#e9eefc" stroke="#9db0ea"></rect>
        <text x="666" y="219" font-size="12" text-anchor="middle" fill="#2b3444">Model</text>
        <text x="666" y="234" font-size="10" text-anchor="middle" fill="#8a94a6">→ answer</text>
      </svg>
    </div>

    <p>The top row happens once. The bottom row happens for every question — and
    notice what reaches the model: not the book, just <strong>one small
    piece</strong> plus the question.</p>

    <h2>See it in action</h2>
    <p>Here is a small community-center document, already split into six chunks.
    Pick a question and watch which piece gets pulled and handed to the model.</p>

    ${Toolkit.widget(
      "Retrieval demo — only the relevant piece is sent",
      `<div class="controls" id="rag-qs">
         <button class="btn" data-q="0">When does it open Saturday?</button>
         <button class="btn ghost" data-q="1">Do you have yoga?</button>
         <button class="btn ghost" data-q="2">Can I rent a room for a party?</button>
         <button class="btn ghost" data-q="3">Is there an after-school program?</button>
       </div>
       <div class="emb-chips" id="rag-chunks" style="margin-top:10px"></div>
       <div class="readout" style="margin-top:6px">
         <div class="stat"><span class="label">Pieces sent to the model</span><span class="value" id="rag-count">1 of 6</span></div>
       </div>
       <div class="emb-vec" style="margin-top:8px">
         <div class="emb-vec-head">What the model actually receives</div>
         <div class="emb-vec-nums" id="rag-prompt" style="white-space:pre-wrap; font-family:inherit"></div>
       </div>`
    )}

    <p>Six chunks here; a real document might have thousands. Either way, the model
    only ever sees the handful that matter — so it fits the context window, it
    costs a fraction of a cent, and it works just as well for a whole library as
    for one page.</p>

    <h2>The clever part: what counts as "relevant"?</h2>
    <p>Everything above hinges on one step — <em>find the chunks most relevant to
    the question</em>. In our demo we matched them by hand. But a real system has
    to do it automatically, for any question, across thousands of chunks. And it
    cannot just match words: someone might ask "what time do you open on the
    weekend?" when the document says "Saturday and Sunday hours are…". No shared
    words, same meaning.</p>

    <p>So the real magic of RAG is a way to find pieces <strong>by meaning, not by
    matching words</strong>. That mechanism is worth a close look of its own, and
    it is where we go from here.</p>

    ${Toolkit.callout(
      `RAG is not a new kind of model. It is the same grounded-prompting idea from
       Section 12 — put the answer in front of the model — made to <em>scale</em>:
       instead of pasting the whole document, you paste only the pieces that
       matter, fetched fresh for each question.`,
      { type: "ai", label: "Keep in mind" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>The context-window wall, the memory wall, and the cost wall all have one
      cure: <strong>send only the relevant piece of a document, not the whole
      thing</strong>.</li>
      <li><strong>RAG</strong> = <strong>R</strong>etrieval-<strong>A</strong>ugmented
      <strong>G</strong>eneration: retrieve the relevant chunks, then let the model
      generate an answer grounded in them.</li>
      <li>It works in <strong>two phases</strong>: <em>index</em> the document once
      (split into chunks, store them), then <em>retrieve</em> the relevant chunks
      at question time.</li>
      <li>This is grounded prompting from Section 12, scaled up — so it fits the
      context window, stays cheap, and handles huge or many documents.</li>
      <li>The heart of it is finding chunks <strong>by meaning, not by matching
      words</strong> — the next thing to understand.</li>
    </ul>
  `,

  onMount(root) {
    const chunks = [
      "The center is open Monday to Friday, 6 a.m. to 9 p.m. On Saturday and Sunday, hours are 8 a.m. to 6 p.m.",
      "A standard membership is billed monthly and includes the gym, the indoor track, and all group classes.",
      "Group classes include yoga, spin, and strength training. Yoga runs Tuesday and Thursday mornings.",
      "The fitness floor has cardio machines, free weights, and a stretching area. Staff are on hand at peak times.",
      "After-school programs serve children ages 6 to 12, with homework help and sports until 6 p.m.",
      "The community room can be reserved for parties and meetings. Book it at the front desk.",
    ];
    // Which chunk each question retrieves (hand-authored for this illustration).
    const questions = [
      { text: "When does it open on Saturday?", chunk: 0 },
      { text: "Do you have yoga classes?", chunk: 2 },
      { text: "Can I rent a room for a party?", chunk: 5 },
      { text: "Is there an after-school program?", chunk: 4 },
    ];

    const chunkWrap = root.querySelector("#rag-chunks");
    const countEl = root.querySelector("#rag-count");
    const promptEl = root.querySelector("#rag-prompt");
    const qButtons = Array.from(root.querySelectorAll("#rag-qs button"));

    // Build the chunk chips once.
    chunks.forEach((c, i) => {
      const chip = document.createElement("span");
      chip.className = "emb-chip";
      chip.dataset.i = String(i);
      chip.textContent = "Chunk " + (i + 1);
      chip.title = c;
      chunkWrap.appendChild(chip);
    });
    const chips = Array.from(chunkWrap.querySelectorAll(".emb-chip"));

    function show(qIdx) {
      const q = questions[qIdx];
      chips.forEach((chip, i) => chip.classList.toggle("on", i === q.chunk));
      qButtons.forEach((b, i) => b.classList.toggle("ghost", i !== qIdx));
      countEl.textContent = "1 of " + chunks.length;
      promptEl.textContent =
        "Context: " + chunks[q.chunk] +
        "\n\nQuestion: " + q.text +
        "\n\nAnswer using only the context above.";
    }

    qButtons.forEach((b) =>
      b.addEventListener("click", () => show(parseInt(b.dataset.q, 10)))
    );
    show(0);
  },
};
