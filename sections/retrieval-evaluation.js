/* ============================================================
   Section: Is your retrieval any good? Precision & recall
   Seventh RAG section — CONCEPT (no inline problems; ends "What you
   learned"). Placed BEFORE the RAG studio so teams can MEASURE
   retrieval, not eyeball it. Instructor (a mathematician) asked
   whether to do retrieval evaluation / confusion matrices like the
   prior math course; agreed shape = precision & recall VISUAL-FIRST
   for no-background students, confusion matrix as an OPTIONAL deeper
   layer the instructor can expand live. See [[instructor-is-mathematician]].

   Spine: RAG rides on retrieval fetching the right chunks (garbage
   in) → two levels of eval (crisp retrieval vs fuzzy answer, S10/14)
   → need an "answer key" (which chunks are relevant; a bit subjective)
   → precision ("of what it grabbed, how much helped?") + recall
   ("of what could help, how much did it grab?") shown as sets →
   the precision/recall TRADE-OFF via k (Chroma Number of Results) →
   recall usually matters more for RAG (answer must be present) →
   OPTIONAL confusion-matrix layer mapping the 4 tile colors to
   TP/FP/FN/TN + F1 → recipe for your own app (bridge to studio).

   Interactive precision/recall explorer (onMount): 12 chunks ranked
   by similarity, relevant = {1,3,8}; slider k = how many retrieved
   (top-k). Tiles color as hit/junk(fp)/miss; live precision & recall
   numbers + bars + tradeoff caption. Real arithmetic.

   NO KaTeX (backslash-in-template-literal gotcha); plain-text math
   with × ÷ ∩ literal Unicode. No "$" glyph. New CSS: .pr-* (styles.css).
   ============================================================ */

window.SectionContent["retrieval-evaluation"] = {
  title: "Is your retrieval any good?",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 25</div>
    <h1>Is your retrieval any good? Precision and recall</h1>

    <p>You built a RAG chatbot and it answered your questions — on faith. But the
    whole thing rides on one step: retrieval fetching the <em>right</em> chunks. If
    the chunk that holds the answer never makes it into the context, even a perfect
    model is stuck — it can only work with what it's handed. So the honest question
    is: <strong>how good is your retrieval, and how would you know?</strong> You
    measure it.</p>

    ${Toolkit.callout(
      `Evaluating a RAG app really has two levels. The <strong>crisp</strong> one:
       did retrieval fetch the right chunks? That's measurable, and it's today's
       topic. The <strong>fuzzy</strong> one: is the final answer good, grounded, and
       honest? That's the rubric-and-judgment work you did in Sections 10 and 14.
       Good evaluation uses both.`,
      { type: "ai", label: "Two levels of evaluation" }
    )}

    <h2>First you need an answer key</h2>
    <p>To measure retrieval, you have to decide, for each test question, which
    chunks <em>truly</em> answer it — the ones retrieval <em>should</em> pull back.
    That's your ground truth, your answer key. Building it is a small labeling job:
    read your chunks, and for a question like "what are the weekend hours?" mark the
    chunk(s) that actually contain that fact.</p>
    <p>It's a little subjective — reasonable people might disagree on whether a
    borderline chunk "counts" — and that's fine. Making "relevant" concrete is itself
    part of understanding your app. With an answer key in hand, two simple questions
    tell you almost everything.</p>

    <h2>The two questions</h2>
    <p>Picture two groups of chunks: the ones that are truly <strong>relevant</strong>
    (your answer key), and the ones your app actually <strong>retrieved</strong>. What
    matters is how they overlap.</p>
    <ul>
      <li><strong>Precision</strong> — <em>of the chunks it retrieved, how many were
      relevant?</em> This catches wasted slots: junk chunks crowding the context.</li>
      <li><strong>Recall</strong> — <em>of the relevant chunks that exist, how many
      did it retrieve?</em> This catches misses: the answer that never showed up.</li>
    </ul>
    <p>In plain arithmetic, with "hits" meaning chunks that are both relevant and
    retrieved:</p>
    <ul>
      <li>precision = hits ÷ (number retrieved)</li>
      <li>recall = hits ÷ (number relevant)</li>
    </ul>

    <h2>Play with the trade-off</h2>
    <p>Below, twelve chunks are lined up left-to-right by how similar they are to a
    question (most similar first). Three are truly relevant (★). The slider is
    <strong>how many chunks you retrieve</strong> — exactly Chroma's <em>Number of
    Results</em> setting. Slide it and watch precision and recall pull against each
    other.</p>

    ${Toolkit.widget(
      "Precision &amp; recall explorer",
      `<div style="display:grid; grid-template-columns:15em 1fr 4em; align-items:center; gap:12px; margin:2px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Chunks retrieved (k)</span>
         <input type="range" id="pr-k" min="1" max="12" value="3" style="width:100%; accent-color:var(--accent)">
         <span id="pr-k-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div class="pr-grid" id="pr-grid"></div>
       <div class="pr-legend">
         <span class="pr-key"><span class="pr-dot" style="border-color:var(--teal); background:#d7f0ea"></span> hit (relevant + retrieved)</span>
         <span class="pr-key"><span class="pr-dot" style="border-color:var(--accent); background:var(--accent-soft)"></span> retrieved junk</span>
         <span class="pr-key"><span class="pr-dot" style="border-color:#d98a3d; background:#fbeddb"></span> missed relevant</span>
         <span class="pr-key">★ = truly relevant</span>
       </div>
       <div class="readout" style="margin-top:12px">
         <div class="stat"><span class="label">Precision</span><span class="value" id="pr-prec">–</span></div>
         <div class="stat"><span class="label">Recall</span><span class="value" id="pr-rec">–</span></div>
         <div class="stat"><span class="label">Retrieved · hits</span><span class="value" id="pr-counts">–</span></div>
       </div>
       <div style="margin-top:10px">
         <div style="font-size:.8rem; color:var(--ink-soft)">Precision</div>
         <div class="pnw-track"><div class="pnw-fill" id="pr-prec-bar" style="width:0"></div></div>
         <div style="font-size:.8rem; color:var(--ink-soft); margin-top:6px">Recall</div>
         <div class="pnw-track"><div class="pnw-fill" id="pr-rec-bar" style="width:0"></div></div>
       </div>
       <p id="pr-cap" style="color:var(--ink-soft); margin:10px 2px 2px; font-size:.94em"></p>`
    )}

    <p>Retrieve <strong>too few</strong> and precision is high but you miss relevant
    chunks (low recall) — the answer may never reach the model. Retrieve
    <strong>too many</strong> and you catch everything (high recall) but drown the
    good chunks in junk (low precision) — more tokens, more noise. This is the same
    dial you tune with <strong>chunk size</strong> and <strong>Number of
    Results</strong>.</p>

    ${Toolkit.callout(
      `For RAG, <strong>recall usually matters most</strong>: if the answer isn't in
       the retrieved chunks at all, the model simply can't answer (or worse, makes
       something up). Precision matters too — it controls cost and noise — but a
       missing answer is fatal in a way that a little extra junk is not.`,
      { label: "Which one matters more?" }
    )}

    <h2>Going deeper (optional)</h2>
    <p>If you've met the <strong>confusion matrix</strong> before, it's hiding in
    plain sight above — it's just the four tile colors:</p>
    <ul>
      <li><strong>Hit</strong> (relevant + retrieved) = a <em>true positive</em>.</li>
      <li><strong>Missed relevant</strong> (relevant, not retrieved) = a <em>false
      negative</em> — what hurts recall.</li>
      <li><strong>Retrieved junk</strong> (not relevant, retrieved) = a <em>false
      positive</em> — what hurts precision.</li>
      <li><strong>Everything else</strong> (not relevant, not retrieved) = a <em>true
      negative</em>.</li>
    </ul>
    <p>Notice that last group is enormous — a real store has thousands of chunks
    correctly left alone — and it tells you almost nothing. That's exactly why, for
    retrieval, precision and recall are more useful than the full matrix. If you want
    a single number balancing the two, the <strong>F1 score</strong> is their
    harmonic mean: F1 = 2 × precision × recall ÷ (precision + recall). And because
    retrieval returns a <em>ranked</em> list, practitioners often measure "precision
    at k" and "recall at k" for a chosen k, or reward getting a relevant chunk near
    the <em>top</em>. Your instructor may take this as far as the class is interested;
    the two questions above are all you truly need.</p>

    <h2>Doing it for your own app</h2>
    <p>The practical recipe, which you'll use in the studio:</p>
    <ol class="steps">
      <li>Write about ten test questions your document should answer.</li>
      <li>For each, note which chunk(s) are truly relevant — your answer key.</li>
      <li>Run retrieval and see which chunks came back.</li>
      <li>Count the hits, and compute precision and recall.</li>
      <li>Adjust <strong>chunk size</strong>, <strong>overlap</strong>, and
      <strong>Number of Results</strong> — then measure again.</li>
    </ol>
    <p>Now "I tweaked the settings and it feels better" becomes "recall went from six
    in ten to nine in ten." That's the difference between guessing and engineering.</p>

    <h2>What you learned</h2>
    <ul>
      <li>RAG lives or dies on retrieval — if the right chunk isn't retrieved, the
      model can't use it.</li>
      <li>Evaluation has a <strong>crisp</strong> side (retrieval) and a
      <strong>fuzzy</strong> side (answer quality); this section is the crisp one.</li>
      <li>Measuring needs an <strong>answer key</strong>: which chunks are truly
      relevant for each question.</li>
      <li><strong>Precision</strong> = of what you retrieved, how much was relevant;
      <strong>recall</strong> = of what's relevant, how much you retrieved.</li>
      <li>They <strong>trade off</strong> as you retrieve more or fewer chunks; for
      RAG, recall usually comes first.</li>
      <li>The same idea underlies the confusion matrix and F1 — optional depth on top
      of the two core questions.</li>
    </ul>
  `,

  onMount(root) {
    const N = 12;
    const relevant = new Set([1, 3, 8]); // ranks (1 = most similar) that truly answer the question
    const grid = root.querySelector("#pr-grid");
    const kEl = root.querySelector("#pr-k");
    const kV = root.querySelector("#pr-k-v");
    const precEl = root.querySelector("#pr-prec");
    const recEl = root.querySelector("#pr-rec");
    const countsEl = root.querySelector("#pr-counts");
    const precBar = root.querySelector("#pr-prec-bar");
    const recBar = root.querySelector("#pr-rec-bar");
    const capEl = root.querySelector("#pr-cap");

    // Build the 12 chunk tiles once (ranked left to right).
    const tiles = [];
    for (let r = 1; r <= N; r++) {
      const t = document.createElement("div");
      t.className = "pr-tile";
      t.textContent = String(r);
      if (relevant.has(r)) {
        const star = document.createElement("span");
        star.className = "pr-star";
        star.textContent = "★";
        t.appendChild(star);
      }
      grid.appendChild(t);
      tiles.push(t);
    }

    function render() {
      const k = parseInt(kEl.value, 10);
      kV.textContent = String(k);
      let hits = 0;
      tiles.forEach((t, i) => {
        const r = i + 1;
        const isRetrieved = r <= k;
        const isRelevant = relevant.has(r);
        t.classList.remove("hit", "fp", "miss");
        if (isRetrieved && isRelevant) { t.classList.add("hit"); hits++; }
        else if (isRetrieved && !isRelevant) t.classList.add("fp");
        else if (!isRetrieved && isRelevant) t.classList.add("miss");
      });
      const precision = hits / k;
      const recall = hits / relevant.size;
      precEl.textContent = Math.round(precision * 100) + "%";
      recEl.textContent = Math.round(recall * 100) + "%";
      countsEl.textContent = k + " retrieved · " + hits + " hit" + (hits === 1 ? "" : "s");
      precBar.style.width = Math.round(precision * 100) + "%";
      recBar.style.width = Math.round(recall * 100) + "%";

      if (recall < 0.5) {
        capEl.textContent = "Grabbing only a few chunks: what you pull is mostly on-target (high precision), but you're missing relevant chunks (low recall) — the answer might never reach the model.";
      } else if (precision < 0.5) {
        capEl.textContent = "Grabbing lots of chunks: you catch all the relevant ones (high recall), but most of what you grabbed is junk (low precision) — extra tokens and noise for the model.";
      } else {
        capEl.textContent = "A reasonable balance — solid on both precision and recall.";
      }
    }

    kEl.addEventListener("input", render);
    render();
  },
};
