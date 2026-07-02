/* ============================================================
   Section: Studio project 3 — build a great app on a budget
   Third group studio (studios are now a RECURRING feature per the
   instructor). Integrates prompting (S8), evaluation (S10-11/14),
   documents (S12-14), AND cost (S16-17). NEW muscle: the
   cost-quality tradeoff under a BUDGET — the most "like work" yet.

   Interactive budget-checker widget (onMount): model toggle +
   sliders (document sent, reply length, questions/month, budget)
   → per-question & monthly cost vs budget, fits/over. Plus a
   scenario switcher. Reuses menu + handbook sample docs.

   GOTCHA: money-heavy → NO "$" glyph in static HTML; money in
   words; widget renders cents/"dollars" via JS after typeset.
   Illustrative rates: small 1/5, premium 5/25 per million.
   ============================================================ */

window.SectionContent["budget-studio"] = {
  title: "Studio: build it to a budget",

  html: `
    <div class="eyebrow">Tokens &amp; cost · Section 18 · Studio</div>
    <h1>Studio project: build a great app — on a budget</h1>

    <p>Here is the constraint that makes this feel like a real job. Until now,
    "good" was the only target. But at work you are almost always handed a
    <strong>budget</strong>, and the real challenge is to build something good
    <em>enough</em> that <strong>fits what the client can afford</strong> — and to
    justify the choices you made. This studio brings together everything you can
    do: wrangle a document, ground a bot in it, prompt it well, test it, and now
    <strong>cost it out and make it fit</strong>.</p>

    <h2>The new skill: the cost-quality tradeoff</h2>
    <p>Every quality upgrade has a price tag, and part of the job is deciding
    which are worth it:</p>
    <ul>
      <li>A <strong>premium model</strong> may answer better — but costs several
      times more per question.</li>
      <li>Sending the <strong>whole document</strong> every time is thorough — but
      you pay for all of it on every single question.</li>
      <li>A <strong>long, detailed reply</strong> is nice — but output is the
      priciest tokens of all.</li>
    </ul>
    <p>Your job is to balance these against the budget and <strong>defend your
    decisions</strong>, exactly as you would to a boss or a client.</p>

    <h2>How the studio works</h2>
    <ol class="steps">
      <li><strong>Take a scenario</strong> — it comes with a document, an expected
        <strong>usage</strong> (questions per month), and a <strong>budget</strong>.</li>
      <li><strong>Build the document assistant</strong> using all your skills
        (load + inspect + clean the document, ground the prompt, add the honesty
        rule).</li>
      <li><strong>Test it for quality</strong> — your own test set, including the
        all-important "not in the document" cases.</li>
      <li><strong>Cost it out</strong> — estimate the cost per question and per
        month at the expected usage. Use the checker below.</li>
      <li><strong>Make it fit.</strong> Over budget? Make tradeoffs — a cheaper
        model, send less of the document, shorter replies — then re-check
        <em>both</em> quality and cost.</li>
      <li><strong>Write a short cost report</strong> justifying your choices.</li>
      <li><strong>Group round</strong> — compare who got the best quality within
        budget, and take the curveball.</li>
    </ol>

    ${Toolkit.callout(
      `<strong>Cost cheat sheet</strong> (same as the practice set): tokens ≈
       words × 4 ÷ 3; a page ≈ 500 tokens; cost = tokens ÷ 1,000,000 × the rate.
       Example rates — small model: 1 (input) and 5 (output) dollars per million;
       premium: 5 and 25. The checker does the arithmetic for you.`,
      { label: "You will need" }
    )}

    ${Toolkit.widget(
      "Budget checker — does your design fit?",
      `<div class="controls" id="bk-model">
         <button class="btn" id="bk-small">Small model (cheap)</button>
         <button class="btn ghost" id="bk-large">Large model (premium)</button>
       </div>
       <div style="display:grid; grid-template-columns:12.5em 1fr 6em; align-items:center; gap:12px; margin:10px 0 4px">
         <span style="font-weight:650; color:var(--ink-soft)">Document sent / question</span>
         <input type="range" id="bk-doc" min="0" max="60" value="1" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="bk-doc-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:12.5em 1fr 6em; align-items:center; gap:12px; margin:4px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Reply length</span>
         <input type="range" id="bk-reply" min="20" max="400" value="120" step="10" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="bk-reply-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:12.5em 1fr 6em; align-items:center; gap:12px; margin:4px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Questions per month</span>
         <input type="range" id="bk-vol" min="100" max="10000" value="2000" step="100" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="bk-vol-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:12.5em 1fr 6em; align-items:center; gap:12px; margin:4px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Monthly budget</span>
         <input type="range" id="bk-budget" min="1" max="100" value="10" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="bk-budget-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div class="readout">
         <div class="stat"><span class="label">Per question</span><span class="value" id="bk-perq">–</span></div>
         <div class="stat"><span class="label">Per month</span><span class="value" id="bk-month">–</span></div>
         <div class="stat"><span class="label">Status</span><span class="value" id="bk-status">–</span></div>
       </div>`
    )}

    <h2>Your scenario</h2>
    <div class="controls" id="bs-switch">
      <button class="btn" id="bs-1">Café menu</button>
      <button class="btn ghost" id="bs-2">Club handbook</button>
      <button class="btn ghost" id="bs-3">Bring your own</button>
    </div>

    <div id="bs-scenario-1" class="widget">
      <div class="widget-title">Scenario A — The Olive Branch Café</div>
      <ul>
        <li><strong>The job:</strong> a bot that answers customer questions from
        the menu.</li>
        <li><strong>Document:</strong> the café menu (about one page).
        <a href="sections/menu-olive-branch.txt" download>Download</a></li>
        <li><strong>Expected usage:</strong> about <strong>2,000 questions a
        month</strong>.</li>
        <li><strong>Budget:</strong> <strong>ten dollars a month</strong> for the
        pilot.</li>
        <li><strong>The tension:</strong> comfortable on a small model — but check
        whether a premium model would still fit. (Set the checker to 2,000
        questions and try both.)</li>
      </ul>
    </div>

    <div id="bs-scenario-2" class="widget" hidden>
      <div class="widget-title">Scenario B — Westview Robotics Club</div>
      <ul>
        <li><strong>The job:</strong> a bot that answers members' questions from
        the club handbook.</li>
        <li><strong>Document:</strong> the handbook — imagine the full version is
        much larger than our excerpt (say <strong>30 pages</strong>).
        <a href="sections/handbook-robotics.txt" download>Download the excerpt</a></li>
        <li><strong>Expected usage:</strong> about <strong>1,500 questions a
        month</strong>.</li>
        <li><strong>Budget:</strong> <strong>fifteen dollars a month</strong>.</li>
        <li><strong>The tension:</strong> a big document sent on every question
        gets expensive fast. In the checker, slide "document sent" up toward 30
        pages and watch what happens. What could you do to fit the budget without
        losing good answers?</li>
      </ul>
    </div>

    <div id="bs-scenario-3" class="widget" hidden>
      <div class="widget-title">Scenario C — Bring your own</div>
      <ul>
        <li><strong>The job:</strong> pick a real document and a real purpose, and
        invent a plausible <strong>usage</strong> and <strong>budget</strong> for
        it.</li>
        <li><strong>Make it interesting:</strong> choose a <em>large</em> document
        and a tight budget, so the tradeoffs actually bite.</li>
        <li><strong>Then:</strong> build it, test it, cost it, and make it fit —
        same as the others.</li>
      </ul>
    </div>

    <h2>The curveball</h2>
    <p>Real projects change under your feet. Partway through, take one of these:
    <strong>the client just tripled the expected usage</strong>, or <strong>cut
    the budget in half</strong>. Does your design still fit? If not, what do you
    cut — a cheaper model, less of the document, shorter replies — and what does
    it cost you in quality? Re-run the checker and decide.</p>

    <h2>The group round: best bang for the buck</h2>
    <p>Compare across groups. The winner is not the fanciest bot — it is the one
    that delivers the <strong>best quality per dollar</strong> within its budget.
    Then red-team each other on <em>both</em> fronts: find a question that gives a
    bad answer, <strong>and</strong> find a way their design would blow its budget
    (a flood of long questions, a bigger document than they planned for).</p>

    <h2>Before you call it done</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="bs-d1" /><label for="bs-d1">My bot is built,
        grounded in the document, and passes my quality tests (including
        not-in-the-document cases).</label></li>
      <li><input type="checkbox" id="bs-d2" /><label for="bs-d2">I estimated the
        cost per question and per month at the expected usage.</label></li>
      <li><input type="checkbox" id="bs-d3" /><label for="bs-d3">It <strong>fits
        the budget</strong> — and I made deliberate tradeoffs to get there.</label></li>
      <li><input type="checkbox" id="bs-d4" /><label for="bs-d4">I can justify my
        choices (model, how much document, reply length) in a short cost
        report.</label></li>
      <li><input type="checkbox" id="bs-d5" /><label for="bs-d5">I handled the
        curveball and survived the group red-team.</label></li>
    </ul>

    ${Toolkit.callout(
      `This is the whole job in one exercise: something good enough, that fits the
       budget, that you can defend. And notice where the budget pressure pushed
       you — toward sending <em>less</em> of the document without losing good
       answers. Doing that well, sending only the part that matters, is exactly
       the skill we build next.`,
      { label: "This is the job" }
    )}
  `,

  onMount(root) {
    /* ---- Budget checker ---- */
    const RATES = { small: { in: 1, out: 5 }, large: { in: 5, out: 25 } };
    const smallBtn = root.querySelector("#bk-small");
    const largeBtn = root.querySelector("#bk-large");
    const doc = root.querySelector("#bk-doc");
    const reply = root.querySelector("#bk-reply");
    const vol = root.querySelector("#bk-vol");
    const budget = root.querySelector("#bk-budget");
    const docV = root.querySelector("#bk-doc-v");
    const replyV = root.querySelector("#bk-reply-v");
    const volV = root.querySelector("#bk-vol-v");
    const budgetV = root.querySelector("#bk-budget-v");
    const perqEl = root.querySelector("#bk-perq");
    const monthEl = root.querySelector("#bk-month");
    const statusEl = root.querySelector("#bk-status");
    let model = "small";

    function money(d) {
      if (d < 0.001) return "under 0.1¢";
      if (d < 0.01) return (d * 100).toFixed(2) + "¢";
      if (d < 1) return (d * 100).toFixed(1) + "¢";
      return d.toFixed(2) + " dollars";
    }

    function update() {
      const pages = parseInt(doc.value, 10);
      const rw = parseInt(reply.value, 10);
      const v = parseInt(vol.value, 10);
      const b = parseInt(budget.value, 10);
      docV.textContent = pages + " pg";
      replyV.textContent = rw + " w";
      volV.textContent = v.toLocaleString() + "/mo";
      budgetV.textContent = b + " dollars";

      const inTok = 50 + pages * 500;
      const outTok = rw * 1.33;
      const r = RATES[model];
      const perQ = (inTok / 1e6) * r.in + (outTok / 1e6) * r.out;
      const month = perQ * v;
      perqEl.textContent = money(perQ);
      monthEl.textContent = money(month);

      if (month <= b) {
        statusEl.textContent = "Fits (" + Math.round((month / b) * 100) + "% of budget)";
        statusEl.style.color = "var(--teal)";
      } else {
        statusEl.textContent = "OVER by " + money(month - b);
        statusEl.style.color = "var(--rose)";
      }
    }

    function setModel(m) {
      model = m;
      smallBtn.classList.toggle("ghost", m !== "small");
      largeBtn.classList.toggle("ghost", m !== "large");
      update();
    }

    smallBtn.addEventListener("click", () => setModel("small"));
    largeBtn.addEventListener("click", () => setModel("large"));
    [doc, reply, vol, budget].forEach((el) => el.addEventListener("input", update));
    setModel("small");

    /* ---- Scenario switcher ---- */
    const items = [
      { b: root.querySelector("#bs-1"), p: root.querySelector("#bs-scenario-1") },
      { b: root.querySelector("#bs-2"), p: root.querySelector("#bs-scenario-2") },
      { b: root.querySelector("#bs-3"), p: root.querySelector("#bs-scenario-3") },
    ];
    function showScenario(idx) {
      items.forEach((x, i) => {
        x.p.hidden = i !== idx;
        x.b.classList.toggle("ghost", i !== idx);
      });
    }
    items.forEach((x, i) => x.b.addEventListener("click", () => showScenario(i)));
    showScenario(0);
  },
};
