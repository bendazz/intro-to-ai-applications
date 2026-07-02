/* ============================================================
   Section: Finding meaning by location — embeddings & similarity
   Second RAG section — CONCEPT (no inline problems; ends "What you
   learned"). Explains the mechanism S19 deferred: how a computer
   finds chunks BY MEANING, not by matching words.

   Spine: text -> a POINT in space (an embedding = a list of
   numbers / coordinates); similar meaning -> nearby points;
   retrieval = embed the question, grab the NEAREST chunk points.
   Pays off S19's "weekend" vs "Saturday/Sunday" example.

   Two interactive SVG maps built in onMount:
     A) meaning map — click a word, nearest neighbors light up
        (real 2D-distance among hand-placed, honestly-clustered pts)
     B) retrieval-by-closeness — pick a question, its point drops in,
        nearest chunk lights up + line + readout.
   Plus a "chunk as a list of numbers" .emb-vec moment.

   HONEST: coordinates are hand-placed to reflect genuine meaning
   groupings; page states plainly that real embeddings have hundreds
   of dimensions and the 2D map is a flattened sketch; numbers shown
   are illustrative. No "$" glyph, no KaTeX math, literal Unicode in
   strings. Reuses .emb-vec/.readout/.controls/.btn. No new CSS.
   ============================================================ */

window.SectionContent["embeddings-similarity"] = {
  title: "Finding meaning by location",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 20</div>
    <h1>Finding meaning by location: embeddings</h1>

    <p>Last time we left off with the one hard step RAG depends on: given a
    question, <em>find the chunks that are relevant to it</em> — by meaning, not by
    matching words. Someone asks about "weekend hours" and the answer lives in a
    sentence that says "Saturday and Sunday." No shared words, same meaning. How on
    earth does a computer measure that?</p>

    <h2>The trick: turn meaning into a place</h2>
    <p>Here is the idea that makes it work. A special model reads a piece of text
    and turns it into a <strong>list of numbers</strong> — and those numbers act
    like <strong>coordinates</strong>, an address for that text in a kind of "map
    of meaning." The list is called an <strong>embedding</strong>.</p>

    ${Toolkit.widget(
      "A chunk becomes a list of numbers",
      `<div class="emb-vec">
         <div class="emb-vec-head">text in — &ldquo;Saturday and Sunday hours are 8 a.m. to 6 p.m.&rdquo;</div>
         <div class="emb-vec-nums">[ 0.12, -0.44, 0.87, 0.03, -0.19, 0.55, … ]</div>
       </div>
       <p style="color:var(--ink-soft); margin:8px 2px 0; font-size:.94em">
         Those numbers are the chunk's coordinates (illustrative — a real embedding
         has <strong>hundreds</strong> of them, not six). The whole point of the
         model that makes them: <strong>text with similar meaning gets similar
         coordinates</strong>, so it lands in nearly the same spot.</p>`
    )}

    <p>If two pieces of text mean nearly the same thing, their points sit close
    together. If they mean very different things, their points are far apart.
    <strong>Closeness on the map = closeness in meaning.</strong> That is the whole
    secret.</p>

    <h2>Seeing the map</h2>
    <p>A real map of meaning has hundreds of directions, which we cannot draw. So
    below is an honest <em>flattened</em> version — the same idea squashed down to
    two directions so it fits on the page. Click any word and watch its nearest
    neighbors light up. Notice they belong together by <em>meaning</em>, even when
    the letters are completely different.</p>

    ${Toolkit.widget(
      "Map of meaning — click a word to find its neighbors",
      `<svg id="emb-map" viewBox="0 0 640 360" role="img"
            aria-label="A 2D map where related words cluster together"
            style="width:100%; height:auto; background:#fbfcfe; border-radius:10px"></svg>`
    )}

    ${Toolkit.callout(
      `The map is a sketch. Real embeddings live in a space with hundreds of
       directions, and the computer measures how close two points are with plain
       arithmetic on their number-lists (there are a couple of standard ways to do
       it). But the picture in your head is exactly right: <strong>near means
       similar</strong>.`,
      { label: "Keeping it honest" }
    )}

    <h2>So retrieval is just: find the nearest points</h2>
    <p>Now the mystery from last section dissolves. At question time the system
    does the obvious thing:</p>
    <ol class="steps">
      <li>Run the <strong>question</strong> through the same embedding model to get
      <em>its</em> point on the map.</li>
      <li>Look for the <strong>chunk points sitting closest</strong> to it.</li>
      <li>Hand those chunks to the model as context — the retrieval step from
      Section 19.</li>
    </ol>

    <p>Pick a question below. Its point drops onto the map, and the closest chunk —
    the one whose <em>meaning</em> is nearest — lights up and gets retrieved.</p>

    ${Toolkit.widget(
      "Retrieval by closeness — the question finds its chunk",
      `<div class="controls" id="emb-qs">
         <button class="btn" data-q="0">What are the weekend hours?</button>
         <button class="btn ghost" data-q="1">Can my kid get homework help?</button>
         <button class="btn ghost" data-q="2">Do you teach yoga?</button>
       </div>
       <svg id="emb-retr" viewBox="0 0 640 360" role="img"
            aria-label="A question point lands near its most relevant chunk"
            style="width:100%; height:auto; background:#fbfcfe; border-radius:10px; margin-top:8px"></svg>
       <div class="readout">
         <div class="stat"><span class="label">Closest chunk — retrieved</span><span class="value" id="emb-hit">–</span></div>
       </div>
       <p style="color:var(--ink-soft); margin:8px 2px 0; font-size:.94em">
         Different words, same meaning: &ldquo;weekend&rdquo; lands right next to the
         chunk about Saturday and Sunday — no matching words required.</p>`
    )}

    <h2>Where this fits in the two phases</h2>
    <p>Embeddings are what actually happen inside the two-phase picture from last
    time:</p>
    <ul>
      <li><strong>Ahead of time (indexing):</strong> run every chunk through the
      embedding model and save the points. That collection of points is called a
      <strong>vector store</strong> — a searchable "map of meaning" for your
      document. (You will meet it by name when we build this in Langflow.)</li>
      <li><strong>At question time (retrieval):</strong> embed the question the same
      way, and ask the vector store for the nearest chunk points.</li>
    </ul>

    <p>Same embedding model on both sides — that is what lets a question and its
    answer end up near each other, even worded completely differently.</p>

    <h2>What you learned</h2>
    <ul>
      <li>An <strong>embedding</strong> turns a piece of text into a list of
      numbers that act like <strong>coordinates</strong> — a location on a "map of
      meaning."</li>
      <li>The embedding model is built so that <strong>similar meaning gives nearby
      points</strong>; closeness on the map means closeness in meaning.</li>
      <li><strong>Retrieval</strong> = embed the question, then grab the chunk
      points sitting closest to it. That is how it finds answers by meaning, not by
      matching words.</li>
      <li>The stored chunk points live in a <strong>vector store</strong>, built
      once at indexing time and searched at question time — both using the same
      embedding model.</li>
      <li>Real embeddings have hundreds of dimensions; the 2D maps here are honest
      flattened sketches of that same idea.</li>
    </ul>
  `,

  onMount(root) {
    const SVGNS = "http://www.w3.org/2000/svg";
    function el(name, attrs) {
      const e = document.createElementNS(SVGNS, name);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    // normalized (0..1) -> pixel inside a padded 640x360 box
    function toPx(x, y) {
      return [50 + x * 540, 34 + y * 292];
    }
    function dist(a, b) {
      const dx = a[0] - b[0], dy = a[1] - b[1];
      return Math.sqrt(dx * dx + dy * dy);
    }

    /* ---------- Widget A: meaning map ---------- */
    const words = [
      { t: "Monday", x: 0.14, y: 0.24, g: 0 },
      { t: "weekend", x: 0.26, y: 0.30, g: 0 },
      { t: "Saturday", x: 0.20, y: 0.40, g: 0 },
      { t: "hours", x: 0.31, y: 0.20, g: 0 },
      { t: "open", x: 0.12, y: 0.35, g: 0 },
      { t: "yoga", x: 0.70, y: 0.24, g: 1 },
      { t: "gym", x: 0.80, y: 0.30, g: 1 },
      { t: "workout", x: 0.73, y: 0.40, g: 1 },
      { t: "treadmill", x: 0.84, y: 0.22, g: 1 },
      { t: "children", x: 0.40, y: 0.74, g: 2 },
      { t: "after-school", x: 0.53, y: 0.78, g: 2 },
      { t: "homework", x: 0.45, y: 0.86, g: 2 },
    ];
    const COL = { base: "#9db0ea", sel: "#e0863b", near: "#2f9e8f", dim: "#cfd6e4" };
    const mapSvg = root.querySelector("#emb-map");
    const lineLayer = el("g", {});
    mapSvg.appendChild(lineLayer);
    const wNodes = words.map((w) => {
      const [px, py] = toPx(w.x, w.y);
      const c = el("circle", { cx: px, cy: py, r: 8, fill: COL.base, stroke: "#5b6472", "stroke-width": 1.2, style: "cursor:pointer" });
      const label = el("text", { x: px, y: py - 13, "text-anchor": "middle", "font-size": 13, fill: "#2b3444", style: "cursor:pointer", "pointer-events": "none" });
      label.textContent = w.t;
      mapSvg.appendChild(c);
      mapSvg.appendChild(label);
      return { c, label, p: [px, py] };
    });

    function highlightWord(i) {
      while (lineLayer.firstChild) lineLayer.removeChild(lineLayer.firstChild);
      const from = wNodes[i].p;
      const order = wNodes
        .map((n, j) => ({ j, d: dist(from, n.p) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d);
      const near = new Set(order.slice(0, 3).map((o) => o.j));
      wNodes.forEach((n, j) => {
        let fill = COL.dim, r = 7, tcol = "#aab3c4";
        if (j === i) { fill = COL.sel; r = 10; tcol = "#2b3444"; }
        else if (near.has(j)) { fill = COL.near; r = 9; tcol = "#2b3444"; }
        n.c.setAttribute("fill", fill);
        n.c.setAttribute("r", r);
        n.label.setAttribute("fill", tcol);
      });
      near.forEach((j) => {
        lineLayer.appendChild(el("line", {
          x1: from[0], y1: from[1], x2: wNodes[j].p[0], y2: wNodes[j].p[1],
          stroke: COL.near, "stroke-width": 1.5, "stroke-dasharray": "4 3", opacity: 0.7,
        }));
      });
    }
    wNodes.forEach((n, i) => n.c.addEventListener("click", () => highlightWord(i)));
    highlightWord(1); // start on "weekend"

    /* ---------- Widget B: retrieval by closeness ---------- */
    const chunks = [
      { t: "Chunk 1 · hours", x: 0.20, y: 0.24 },
      { t: "Chunk 2 · membership", x: 0.52, y: 0.20 },
      { t: "Chunk 3 · classes", x: 0.82, y: 0.30 },
      { t: "Chunk 4 · fitness floor", x: 0.80, y: 0.64 },
      { t: "Chunk 5 · after-school", x: 0.30, y: 0.72 },
      { t: "Chunk 6 · room rental", x: 0.56, y: 0.48 },
    ];
    const queries = [
      { label: "weekend hours?", x: 0.15, y: 0.33 },
      { label: "homework help?", x: 0.25, y: 0.64 },
      { label: "yoga?", x: 0.86, y: 0.25 },
    ];
    const retrSvg = root.querySelector("#emb-retr");
    const rLineLayer = el("g", {});
    retrSvg.appendChild(rLineLayer);
    const cNodes = chunks.map((c) => {
      const [px, py] = toPx(c.x, c.y);
      const circ = el("circle", { cx: px, cy: py, r: 9, fill: "#9db0ea", stroke: "#5b6472", "stroke-width": 1.2 });
      const label = el("text", { x: px, y: py - 14, "text-anchor": "middle", "font-size": 12, fill: "#2b3444", "pointer-events": "none" });
      label.textContent = c.t;
      retrSvg.appendChild(circ);
      retrSvg.appendChild(label);
      return { circ, label, p: [px, py] };
    });
    // question marker (created once, moved on select)
    const qDot = el("circle", { cx: -20, cy: -20, r: 8, fill: "#e0863b", stroke: "#8a3f12", "stroke-width": 1.5 });
    const qLabel = el("text", { x: -20, y: -20, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#8a3f12", "pointer-events": "none" });
    retrSvg.appendChild(qDot);
    retrSvg.appendChild(qLabel);
    const hitEl = root.querySelector("#emb-hit");
    const qBtns = Array.from(root.querySelectorAll("#emb-qs button"));

    function ask(qi) {
      const q = queries[qi];
      const [px, py] = toPx(q.x, q.y);
      qBtns.forEach((b, j) => b.classList.toggle("ghost", j !== qi));
      // nearest chunk by real 2D distance
      let best = 0, bestD = Infinity;
      cNodes.forEach((n, j) => {
        const d = dist([px, py], n.p);
        if (d < bestD) { bestD = d; best = j; }
      });
      cNodes.forEach((n, j) => {
        n.circ.setAttribute("fill", j === best ? "#2f9e8f" : "#cfd6e4");
        n.circ.setAttribute("r", j === best ? 12 : 8);
        n.label.setAttribute("fill", j === best ? "#2b3444" : "#aab3c4");
      });
      qDot.setAttribute("cx", px); qDot.setAttribute("cy", py);
      qLabel.setAttribute("x", px); qLabel.setAttribute("y", py + 20);
      qLabel.textContent = q.label;
      while (rLineLayer.firstChild) rLineLayer.removeChild(rLineLayer.firstChild);
      rLineLayer.appendChild(el("line", {
        x1: px, y1: py, x2: cNodes[best].p[0], y2: cNodes[best].p[1],
        stroke: "#e0863b", "stroke-width": 2, "stroke-dasharray": "5 3",
      }));
      hitEl.textContent = chunks[best].t;
    }
    qBtns.forEach((b) => b.addEventListener("click", () => ask(parseInt(b.dataset.q, 10))));
    ask(0);
  },
};
