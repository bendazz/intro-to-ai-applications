/* ============================================================
   Section: Studio project 2 — a document assistant
   Second group studio (mirrors S11), now for document apps. Uses
   ALL skills: wrangling (S13), grounded prompting (S12), and
   testing/grading (S10-11). New signature skill: the
   "not-in-the-document" test — does the bot admit it doesn't
   know, or invent? That's the core reliability question for
   document/RAG apps.

   Scenario switcher (café menu, club handbook, bring-your-own)
   with two ready sample docs. Group red-team round. No new
   Langflow mechanics; reuses .widget/.dist-table/.checklist/
   .controls; onMount = scenario switcher.
   ============================================================ */

window.SectionContent["document-studio"] = {
  title: "Studio project: a document assistant",

  html: `
    <div class="eyebrow">Working with documents · Section 14</div>
    <h1>Studio project: build and test a document assistant</h1>

    <p>You loved building and breaking the chatbot, so let us do it again — this
    time for a <strong>document assistant</strong>, and this time you will use
    <em>every</em> skill you have. You will wrangle a real, messy document
    (Section 13), ground a bot in it with a careful prompt (Section 12), and test
    it hard (Sections 10–11). It pulls the whole documents arc together into one
    project.</p>

    <p>And there is a new twist that matters more here than anywhere else.</p>

    <h2>The question that defines a good document app</h2>
    <p>For a chatbot, "is it good?" mostly meant accurate and well-mannered. For
    a document assistant, the make-or-break question is sharper:
    <strong>does it stay honest about what is actually in the document?</strong>
    A menu bot that invents a dish, or a handbook bot that makes up a rule, is
    worse than useless — it is misleading. So your test set must include the move
    that no chatbot test needed: questions whose answers are <strong>not in the
    document at all</strong>, to see whether the bot admits it or makes something
    up.</p>

    <h2>How the studio works</h2>
    <ol class="steps">
      <li><strong>Take a scenario</strong> (below) — or, even better, bring a
        <em>real</em> document of your own.</li>
      <li><strong>Get the document in, and clean.</strong> Load it, then
        <strong>Inspect</strong> what was actually extracted, and wrangle it if
        it is messy. Do not skip this — a bot built on garbled text is doomed.</li>
      <li><strong>Build the grounded bot</strong>: Read File → (cleanup) → Prompt
        Template with the document and the "use only the document, else say you
        do not know" rule → model.</li>
      <li><strong>Write your test questions</strong> across the four angles
        below — especially the not-in-the-document ones.</li>
      <li><strong>Decide your grading</strong>, run it, find weak spots, improve
        the prompt, and re-run the <em>whole</em> set.</li>
      <li><strong>Swap and red-team</strong> — try to trick another group's bot
        into inventing something.</li>
    </ol>

    <h2>Your test questions — four angles</h2>
    <p>Same three buckets as before, plus the document special:</p>
    <ul>
      <li><strong>Happy path</strong> — clearly answerable from the document (a
      price on the menu; the club's meeting time).</li>
      <li><strong>Hard path</strong> — ambiguous, or needs two facts combined, or
      is only partly covered.</li>
      <li><strong>Not in the document</strong> ⭐ — answers the document simply
      does not contain. Does the bot say "I don't know / that is not in the
      document," or does it invent? <strong>This is the one to obsess over.</strong></li>
      <li><strong>Must-not</strong> — out of scope or unsafe (a menu bot must not
      <em>guarantee</em> a dish is safe for a severe allergy; it should point to
      a human).</li>
    </ul>

    <h2>Your grading — criteria that fit a document bot</h2>
    <table class="dist-table">
      <thead><tr><th>Criterion</th><th>What you are checking</th></tr></thead>
      <tbody>
        <tr><td>Grounded</td><td>Did the answer actually come from the document?</td></tr>
        <tr><td>Honest about gaps</td><td>For "not in the document" cases, did it admit it instead of inventing?</td></tr>
        <tr><td>Accurate</td><td>Did it get the details right (the actual price, the actual time)?</td></tr>
        <tr><td>Right tone &amp; scope</td><td>Did it suit the audience and stay on the job?</td></tr>
      </tbody>
    </table>
    <p>Score each answer pass/fail, or on a 0–1–2 scale — your call, as long as
    your whole group grades the same way.</p>

    <h2>Your scenario</h2>
    <p>Pick one (or take the one you are assigned). The "not in the document"
    tests are yours to find — read the document and notice what it leaves out.</p>

    <div class="controls" id="ds-switch">
      <button class="btn" id="ds-1">Café menu</button>
      <button class="btn ghost" id="ds-2">Club handbook</button>
      <button class="btn ghost" id="ds-3">Bring your own</button>
    </div>

    <div id="ds-scenario-1" class="widget">
      <div class="widget-title">Scenario A — The Olive Branch Café</div>
      <ul>
        <li><strong>You are:</strong> helping a small café put a bot on its
        website.</li>
        <li><strong>The bot:</strong> answers customer questions from the menu —
        dishes, prices, hours, what is vegetarian.</li>
        <li><strong>Why:</strong> the café gets the same questions over and over
        and wants to answer them at any hour.</li>
        <li><strong>Who will use it:</strong> hungry customers, who will not
        tolerate a wrong price or a made-up dish.</li>
        <li><strong>Watch for:</strong> the menu does not list everything —
        nothing about gluten-free options, today's specials, delivery, or
        catering, and it tells customers to discuss allergies with staff. Those
        gaps are your best "not in the document" and "must-not" tests.</li>
      </ul>
      <p><a href="sections/menu-olive-branch.txt" download>Download the menu</a></p>
    </div>

    <div id="ds-scenario-2" class="widget" hidden>
      <div class="widget-title">Scenario B — Westview Robotics Club</div>
      <ul>
        <li><strong>You are:</strong> building a helper for a high-school club.</li>
        <li><strong>The bot:</strong> answers members' questions from the club
        handbook — meeting times, dues, rules, safety.</li>
        <li><strong>Why:</strong> new members ask the same logistics questions,
        and the advisor is busy.</li>
        <li><strong>Who will use it:</strong> teenage club members and their
        curious parents.</li>
        <li><strong>Watch for:</strong> the handbook excerpt says nothing about
        the competition schedule, travel arrangements, the budget, or how teams
        are chosen — perfect "not in the document" tests. And policy questions
        should be answered from the handbook, never improvised.</li>
      </ul>
      <p><a href="sections/handbook-robotics.txt" download>Download the handbook</a></p>
    </div>

    <div id="ds-scenario-3" class="widget" hidden>
      <div class="widget-title">Scenario C — Bring your own document</div>
      <ul>
        <li><strong>The challenge:</strong> find a <em>real</em> document and
        build an assistant for it — a real restaurant's PDF menu, your actual
        club or course handbook, a product's manual, a syllabus, a park
        brochure.</li>
        <li><strong>Why this is the best one:</strong> real documents are
        <em>messy</em>. A real PDF menu may extract as scrambled nonsense — which
        means you get to use your Section 13 wrangling skills for real, not on a
        tidy sample.</li>
        <li><strong>Watch for:</strong> inspect the extracted text first; if it
        is garbled, clean it before you build. And you will need to know your
        document well enough to write fair "not in the document" tests.</li>
      </ul>
    </div>

    <h2>The group round: make it lie</h2>
    <p>Once your bot survives your own tests, trade with another group and try to
    make their bot <strong>invent something</strong> — a dish that is not on the
    menu, a rule that is not in the handbook, a confident answer to something the
    document never said. Every invention you coax out is a "not in the document"
    test their set was missing. This is exactly how real teams pressure-test a
    document app before trusting it, and it drives home why honesty about gaps is
    the whole game.</p>

    <h2>Before you call it done</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="ds-d1" /><label for="ds-d1">I loaded the
        document and <strong>inspected</strong> the extracted text, cleaning it
        if needed.</label></li>
      <li><input type="checkbox" id="ds-d2" /><label for="ds-d2">My prompt
        grounds the bot in the document and tells it to admit when something is
        not there.</label></li>
      <li><input type="checkbox" id="ds-d3" /><label for="ds-d3">My test set has
        happy, hard, <strong>not-in-the-document</strong>, and must-not
        questions.</label></li>
      <li><input type="checkbox" id="ds-d4" /><label for="ds-d4">I graded it,
        improved the prompt, and re-ran the whole set.</label></li>
      <li><input type="checkbox" id="ds-d5" /><label for="ds-d5">Another group
        tried to make it lie, and I turned what they found into new tests.</label></li>
    </ul>

    ${Toolkit.callout(
      `Step back and see what you can now do: take a real, messy document, get
       clean text out of it, ground a model in it, and <em>prove</em> it stays
       honest about what the document does and does not say. That is a genuine,
       useful AI application — and "does it stay honest about its source?" is
       exactly the question we will carry forward when documents get too big to
       hand over all at once.`,
      { label: "This is a real document app" }
    )}
  `,

  onMount(root) {
    /* ---- Scenario switcher ---- */
    const items = [
      { b: root.querySelector("#ds-1"), p: root.querySelector("#ds-scenario-1") },
      { b: root.querySelector("#ds-2"), p: root.querySelector("#ds-scenario-2") },
      { b: root.querySelector("#ds-3"), p: root.querySelector("#ds-scenario-3") },
    ];
    function show(idx) {
      items.forEach((x, i) => {
        x.p.hidden = i !== idx;
        x.b.classList.toggle("ghost", i !== idx);
      });
    }
    items.forEach((x, i) => x.b.addEventListener("click", () => show(i)));
    show(0);
  },
};
