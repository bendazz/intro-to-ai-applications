/* ============================================================
   Section: Cutting the document into chunks
   Third RAG section — CONCEPT + light hands-on (no inline problems;
   ends "What you learned"). Answers "how do we cut the document into
   pieces?" The chunk is the UNIT OF RETRIEVAL and becomes ONE point
   on the map (S20), so how you cut matters.

   Spine: chunk = unit of retrieval + one point per chunk → the
   Goldilocks problem (too big = blurry point + wasted tokens;
   too small = lost context, answer split; just right = one idea) →
   cut on natural boundaries, not blind mid-sentence → OVERLAP at
   the seams → Split Text component (chunk size / overlap / separator,
   present-tense; the build comes next).

   Interactive chunking playground (onMount): real word-split in JS,
   sliders for chunk size + overlap, chunks rendered as cards with
   overlap words highlighted, live readout + Goldilocks hint.

   New CSS: .chk-list/.chk-card/.chk-tag/.chk-ov (in styles.css).
   No "$" glyph, no KaTeX math, literal Unicode. Inline slider grids
   like budget-studio.
   ============================================================ */

window.SectionContent["chunking"] = {
  title: "Cutting the document into chunks",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 21</div>
    <h1>Cutting the document into chunks</h1>

    <p>We now know the two-phase plan: index the document into pieces, then
    retrieve the relevant pieces per question. And we know each piece becomes a
    point on the map of meaning. One question we skated past: <strong>how do you
    cut the document into pieces in the first place?</strong> That step is called
    <strong>chunking</strong>, and it is a real design decision — not an
    afterthought.</p>

    <h2>Why the cut matters so much</h2>
    <p>Two facts make chunking important:</p>
    <ul>
      <li><strong>A chunk is the unit of retrieval.</strong> You do not fetch half
      a chunk — you fetch whole chunks. So the chunk is exactly what the model gets
      handed as context. Cut badly, and you hand it the wrong thing.</li>
      <li><strong>Each chunk becomes one point</strong> on the map (Section 20). A
      point stands for the <em>whole</em> chunk's meaning — so a chunk really ought
      to be about <em>one thing</em>.</li>
    </ul>

    <h2>The Goldilocks problem</h2>
    <p>Chunk size is a balance, and both extremes hurt:</p>
    <ul>
      <li><strong>Too big.</strong> A giant chunk covers several topics at once. Its
      single point is a blurry <em>average</em> of all of them, so it matches
      questions vaguely instead of sharply. And every time it is retrieved you pay
      to send all that extra text (Sections 16–18).</li>
      <li><strong>Too small.</strong> A tiny chunk is a fragment. It loses the
      context around it — a sentence that says "it costs the same" is useless if the
      chunk that says what "it" is got cut away. Worse, a full answer can end up
      split across two chunks, and retrieval might grab only one half.</li>
      <li><strong>Just right.</strong> One coherent idea per chunk — usually about a
      paragraph, or a short section under its own heading.</li>
    </ul>

    ${Toolkit.callout(
      `The goal is not a magic number of words. It is <strong>one idea per
       chunk</strong>: big enough to stand on its own, small enough not to drag in
       unrelated topics.`,
      { type: "ai", label: "The rule of thumb" }
    )}

    <h2>Where to make the cut</h2>
    <p>The laziest way to chop is every N characters, no matter what — which happily
    slices sentences and even words in half. Better to cut on <strong>natural
    boundaries</strong>: prefer to break between paragraphs, then between sentences,
    so each chunk is made of whole thoughts.</p>

    <h3>The seam problem, and overlap</h3>
    <p>Even with clean cuts, an idea can straddle a boundary — the setup lands at
    the end of one chunk and the payoff at the start of the next, so neither chunk
    holds the complete thought. The fix is <strong>overlap</strong>: let each chunk
    repeat a little of the end of the one before it. A few shared words or a shared
    sentence at every seam means an idea that lands on a boundary still shows up
    whole in at least one chunk.</p>

    <h2>Try it: the chunking playground</h2>
    <p>Here is a short passage. Slide the chunk size and the overlap and watch how
    the document actually gets cut. The highlighted words at the top of each chunk
    are the <span class="chk-ov">overlap</span> carried over from the chunk
    before.</p>

    ${Toolkit.widget(
      "Chunking playground",
      `<div style="display:grid; grid-template-columns:11em 1fr 5em; align-items:center; gap:12px; margin:2px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Chunk size</span>
         <input type="range" id="chk-size" min="6" max="30" value="14" style="width:100%; accent-color:var(--accent)">
         <span id="chk-size-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:11em 1fr 5em; align-items:center; gap:12px; margin:2px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Overlap</span>
         <input type="range" id="chk-ov" min="0" max="8" value="3" style="width:100%; accent-color:var(--accent)">
         <span id="chk-ov-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div class="readout" style="margin-top:6px">
         <div class="stat"><span class="label">Chunks made</span><span class="value" id="chk-count">–</span></div>
       </div>
       <p id="chk-hint" style="color:var(--ink-soft); margin:8px 2px 2px; font-size:.94em"></p>
       <div class="chk-list" id="chk-list"></div>`
    )}

    <h2>Doing it in Langflow</h2>
    <p>The component that does this is <strong>Split Text</strong> — the same box we
    glimpsed back in Sections 3 and 13. Its main settings are exactly the two dials
    you just played with, plus one more:</p>
    <ul>
      <li><strong>Chunk size</strong> — how big each piece is.</li>
      <li><strong>Chunk overlap</strong> — how much neighbors share at the seams.</li>
      <li><strong>Separator</strong> — the boundary it prefers to cut on (for
      example, break at blank lines between paragraphs).</li>
    </ul>
    <p>We will wire it up for real when we build a RAG flow.</p>

    <h2>What you learned</h2>
    <ul>
      <li><strong>Chunking</strong> is how you cut a document into the pieces that
      get stored and retrieved — a real design choice, not a detail.</li>
      <li>A chunk is the <strong>unit of retrieval</strong> and becomes <strong>one
      point</strong> on the map, so it should hold <strong>one idea</strong>.</li>
      <li><strong>Too big</strong> = a blurry point and wasted tokens; <strong>too
      small</strong> = lost context and split answers; aim for one coherent passage.</li>
      <li>Cut on <strong>natural boundaries</strong>, and use <strong>overlap</strong>
      so ideas that land on a seam still appear whole in a chunk.</li>
      <li>In Langflow this is the <strong>Split Text</strong> component: chunk size,
      chunk overlap, and separator.</li>
    </ul>
  `,

  onMount(root) {
    const passage =
      "The Northwood Community Center opened in 1998 and sits beside Miller Park. " +
      "It offers a gym, an indoor track, and several meeting rooms. Members can join " +
      "monthly, and the fee includes all group classes. Popular classes include yoga " +
      "on Tuesday and Thursday mornings, plus spin and strength training in the " +
      "evenings. The center also runs after-school programs for children ages six to " +
      "twelve, with homework help and sports until six. The community room can be " +
      "reserved for parties and meetings by booking at the front desk. Staff are on " +
      "hand throughout the day to answer questions and give tours.";
    const words = passage.split(/\s+/);

    const sizeEl = root.querySelector("#chk-size");
    const ovEl = root.querySelector("#chk-ov");
    const sizeV = root.querySelector("#chk-size-v");
    const ovV = root.querySelector("#chk-ov-v");
    const countEl = root.querySelector("#chk-count");
    const hintEl = root.querySelector("#chk-hint");
    const listEl = root.querySelector("#chk-list");

    function render() {
      const size = parseInt(sizeEl.value, 10);
      let overlap = parseInt(ovEl.value, 10);
      if (overlap > size - 1) overlap = size - 1; // overlap must leave forward progress
      const step = size - overlap;

      sizeV.textContent = size + " w";
      ovV.textContent = overlap + " w";

      // Build chunks: real word-window with overlap.
      const chunks = [];
      for (let i = 0; i < words.length; i += step) {
        const slice = words.slice(i, i + size);
        chunks.push({ words: slice, carried: i === 0 ? 0 : overlap });
        if (i + size >= words.length) break;
      }

      countEl.textContent = chunks.length + " chunks · ~" + size + " words each · " + overlap + "-word overlap";

      // Live Goldilocks hint.
      if (size <= 8) {
        hintEl.textContent = "Small chunks make precise points, but each may be missing context — a full answer can get split across pieces.";
      } else if (size >= 24) {
        hintEl.textContent = "Large chunks carry lots of context, but each point blurs several topics together and you send more tokens than you need.";
      } else {
        hintEl.textContent = "A balanced size — roughly one idea per chunk.";
      }

      // Render chunk cards; highlight the carried-over (overlap) words.
      listEl.textContent = "";
      chunks.forEach((ch, idx) => {
        const card = document.createElement("div");
        card.className = "chk-card";
        const tag = document.createElement("span");
        tag.className = "chk-tag";
        tag.textContent = "Chunk " + (idx + 1);
        card.appendChild(tag);
        if (ch.carried > 0) {
          const ov = document.createElement("span");
          ov.className = "chk-ov";
          ov.textContent = ch.words.slice(0, ch.carried).join(" ");
          card.appendChild(ov);
          card.appendChild(document.createTextNode(" " + ch.words.slice(ch.carried).join(" ")));
        } else {
          card.appendChild(document.createTextNode(ch.words.join(" ")));
        }
        listEl.appendChild(card);
      });
    }

    sizeEl.addEventListener("input", render);
    ovEl.addEventListener("input", render);
    render();
  },
};
