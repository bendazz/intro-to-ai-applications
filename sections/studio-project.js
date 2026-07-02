/* ============================================================
   Section: Studio project — design, build, and test a chatbot
   A project/studio brief (not a step-by-step lab). Synthesizes
   prompting (S8), single-purpose framing (S9), and evaluation
   (S10). Students get a scenario, then devise their OWN test
   questions (three buckets) and OWN grading (rubric), and iterate.
   Group red-team swap included. No new Langflow mechanics.

   Interactive: a scenario switcher (3 briefs) + static copy-able
   templates + a "before you're done" checklist. onMount = switcher.
   ============================================================ */

window.SectionContent["studio-project"] = {
  title: "Studio project: build & test a bot",

  html: `
    <div class="eyebrow">Project studio · Section 11</div>
    <h1>Studio project: design, build, and test a real chatbot</h1>

    <p>This section is different. There are no numbered steps to copy, because
    <strong>you are the builder now.</strong> You will be handed a realistic
    scenario — a company or person who needs a chatbot, and the people it is
    for — and <em>you</em> decide how to build it, what to test, and how to judge
    whether it is any good. That is not a watered-down version of the job. That
    <strong>is</strong> the job.</p>

    <p>Everything you need, you already have: building a chatbot with a strong
    system prompt (Sections 6–8), and testing it against cases you trust
    (Section 10). This brings it together.</p>

    <h2>How the studio works</h2>
    <ol class="steps">
      <li><strong>Take a scenario</strong> (below). Read it closely — the
        important constraints are often implied, not spelled out.</li>
      <li><strong>Build a first version</strong> of the bot in Langflow, with a
        system prompt that fits the job and the audience.</li>
      <li><strong>Write your test questions</strong> — your own, covering the
        three buckets explained below.</li>
      <li><strong>Decide how you will grade</strong> — your own rubric.</li>
      <li><strong>Run, grade, improve, re-test.</strong> Find the weak spots, fix
        the prompt, and re-run your <em>whole</em> set (watch for regressions!).</li>
      <li><strong>Swap and red-team</strong> — trade bots with another group and
        try to make each other's misbehave.</li>
    </ol>

    <h2>Skill 1 — writing test questions that actually probe</h2>
    <p>A weak test set only asks the easy, obvious questions, so it always
    "passes." A strong one deliberately covers <strong>three buckets</strong>:</p>
    <ul>
      <li><strong>Happy path</strong> — the normal things the bot exists to do.
      The questions a typical user would really ask.</li>
      <li><strong>Hard path</strong> — ambiguous, tricky, or unanswerable: vague
      requests, questions the bot <em>can't</em> know, two questions at once,
      someone confused or upset.</li>
      <li><strong>Must-not</strong> — things it should <em>refuse</em> or hand
      off: off-topic, unsafe, or out-of-scope requests. <strong>This is the
      bucket students forget</strong>, and it is where the scenario's real
      constraints hide.</li>
    </ul>
    <p>Plan a handful in each bucket. A simple table does the job:</p>
    <table class="dist-table">
      <thead><tr><th>Bucket</th><th>What to probe</th><th>Example (a library bot)</th></tr></thead>
      <tbody>
        <tr><td>Happy path</td><td>the everyday jobs</td><td>"What are your weekend hours?"</td></tr>
        <tr><td>Hard path</td><td>vague / can't-know</td><td>"Recommend me something good." · "Is my neighbor a member?"</td></tr>
        <tr><td>Must-not</td><td>out of scope / unsafe</td><td>"Give me legal advice." · "Write my school essay."</td></tr>
      </tbody>
    </table>

    <h2>Skill 2 — deciding how to grade</h2>
    <p>You cannot improve a bot without agreeing on what "good" means. Pull your
    <strong>criteria straight from the scenario</strong> — its goals and its
    worries — and turn each into something you can mark. A few criteria that fit
    almost any bot:</p>
    <table class="dist-table">
      <thead><tr><th>Criterion (from the brief)</th><th>What you are checking</th></tr></thead>
      <tbody>
        <tr><td>Accurate</td><td>Did it answer correctly, without making things up?</td></tr>
        <tr><td>Right tone</td><td>Did it sound right for <em>this</em> audience?</td></tr>
        <tr><td>In scope</td><td>Did it stick to what the bot is for?</td></tr>
        <tr><td>Refused well</td><td>For "must-not" cases, did it decline or hand off gracefully?</td></tr>
      </tbody>
    </table>
    <p>Then pick how you score each answer. Two common choices:</p>
    <ul>
      <li><strong>Pass / fail</strong> per criterion — fast and clear.</li>
      <li>A small <strong>0–1–2 scale</strong> (no / partly / yes) — more nuance,
      good for tone and completeness.</li>
    </ul>

    ${Toolkit.callout(
      `Here is the honest part you already met in the last section: for an
       open-ended chatbot there is no single "correct" answer, so two graders can
       look at the same reply and disagree. That is not a flaw in your rubric —
       it is the reason to <em>have</em> one. If your group disagrees on a score,
       that conversation ("what did we actually want here?") is some of the most
       valuable work in the whole project.`,
      { type: "ai", label: "Grading is a judgment call — make it a shared one" }
    )}

    <h2>A worked example, in miniature</h2>
    <p>Imagine a tiny scenario: a neighborhood coffee shop, <strong>The Daily
    Grind</strong>, wants a bot to answer customer questions on its website.
    Here is the <em>start</em> of a test plan — just to show the shape before you
    build your own:</p>
    <ul>
      <li><strong>Happy:</strong> "What time do you open on Sunday?" · "Do you
      have oat milk?"</li>
      <li><strong>Hard:</strong> "What's your best drink?" (subjective — should
      it pick one, or ask about taste?) · "Do you cater weddings?" (it may not
      know)</li>
      <li><strong>Must-not:</strong> "What do you think of the cafe across the
      street?" (it should not trash a competitor) · "What's the wifi password?"
      (a policy call the owner cares about)</li>
    </ul>
    <p>And a three-line rubric: <em>Accurate about our menu and hours? ·
    Friendly, neighborly tone? · Stayed on coffee-shop topics?</em> Notice how
    every test and every criterion came straight out of the scenario. Yours will
    too.</p>

    <h2>Your scenario</h2>
    <p>Pick one (or take the one you are assigned). Read between the lines — the
    "must-not" tests are yours to discover.</p>

    <div class="controls" id="sc-switch">
      <button class="btn" id="sc-1">Public library</button>
      <button class="btn ghost" id="sc-2">App support bot</button>
      <button class="btn ghost" id="sc-3">Homework helper</button>
    </div>

    <div id="scenario-1" class="widget">
      <div class="widget-title">Scenario A — Riverside Public Library</div>
      <ul>
        <li><strong>You are:</strong> on the team at the Riverside Public Library.</li>
        <li><strong>The bot:</strong> a friendly assistant on the library website
        that answers patron questions and suggests books to read.</li>
        <li><strong>Why we need it:</strong> the front desk is swamped; patrons
        want quick answers about hours, getting a library card, and finding
        something to read.</li>
        <li><strong>Who will use it:</strong> the general public — children,
        teens, adults, seniors — many not especially comfortable with technology.</li>
        <li><strong>The director also mentioned:</strong> she is nervous it might
        "make things up" — invent a book that does not exist, or an event that is
        not happening. And it should never give legal, medical, or financial
        advice; those belong with a professional. When it is unsure, it should
        gently point people to a real librarian.</li>
      </ul>
    </div>

    <div id="scenario-2" class="widget" hidden>
      <div class="widget-title">Scenario B — BrightBooks support bot</div>
      <ul>
        <li><strong>You are:</strong> at BrightBooks, a simple accounting app for
        small businesses.</li>
        <li><strong>The bot:</strong> an in-app support assistant that helps new
        users get set up and answers "how do I…" questions.</li>
        <li><strong>Why we need it:</strong> new users get stuck in their first
        week and give up; a helper that answers common questions keeps them from
        churning.</li>
        <li><strong>Who will use it:</strong> small-business owners who are
        <em>not</em> accountants — often busy, often a little stressed, and not
        fluent in finance jargon.</li>
        <li><strong>The product lead also mentioned:</strong> keep it calm and
        plain-spoken. It must <em>not</em> give tax or legal advice — that is a
        real liability. And genuine billing disputes or broken-account problems
        should be handed to a human support agent, not "solved" by the bot.</li>
      </ul>
    </div>

    <div id="scenario-3" class="widget" hidden>
      <div class="widget-title">Scenario C — 7th-grade science homework helper</div>
      <ul>
        <li><strong>You are:</strong> building a tool for a 7th-grade science
        teacher.</li>
        <li><strong>The bot:</strong> a homework helper that students can use
        after school when the teacher is not available.</li>
        <li><strong>Why we need it:</strong> one teacher cannot help thirty kids
        at once; a patient helper can guide them through their homework.</li>
        <li><strong>Who will use it:</strong> 12- and 13-year-olds, with a wide
        range of reading levels and confidence.</li>
        <li><strong>The teacher also mentioned:</strong> it should <em>guide,
        not give away answers</em> — no doing the whole assignment for them. Keep
        the language simple and encouraging, keep it age-appropriate, and keep it
        on schoolwork; it should politely refuse off-topic or inappropriate
        requests.</li>
      </ul>
    </div>

    <h2>The group round: try to break it</h2>
    <p>Once your bot survives your <em>own</em> tests, the real fun starts. Trade
    bots with another group and become their toughest user: hunt for inputs that
    make the bot do something it should not — wander off topic, invent a fact,
    give advice it was told to avoid, or be talked out of its rules. Every break
    you find is a test the other group's set was missing. This is exactly how
    real teams harden an AI app before it ships, and it drives home a humbling
    truth: <strong>your own test set always has blind spots.</strong></p>

    <h2>Before you call it done</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="d1" /><label for="d1">My bot has a system
        prompt written specifically for this scenario and audience.</label></li>
      <li><input type="checkbox" id="d2" /><label for="d2">My test set has
        questions in all three buckets — happy, hard, and must-not.</label></li>
      <li><input type="checkbox" id="d3" /><label for="d3">I have a written
        grading scheme, and I can say what score my bot earned.</label></li>
      <li><input type="checkbox" id="d4" /><label for="d4">I improved the prompt
        at least once and re-ran the <em>whole</em> test set.</label></li>
      <li><input type="checkbox" id="d5" /><label for="d5">Another group tried to
        break it, and I turned what they found into new tests.</label></li>
    </ul>

    ${Toolkit.callout(
      `Step back and notice what just happened: nobody told you the steps. You
       took a vague human need, decided what the bot should and should not do,
       built it, defined what "good" meant, measured it, and made it better. The
       boxes and wires were never the hard part of building an AI application —
       <strong>this</strong> is. And you can do it.`,
      { label: "This is the job" }
    )}
  `,

  onMount(root) {
    /* ---- Scenario switcher ---- */
    const btns = [
      { b: root.querySelector("#sc-1"), p: root.querySelector("#scenario-1") },
      { b: root.querySelector("#sc-2"), p: root.querySelector("#scenario-2") },
      { b: root.querySelector("#sc-3"), p: root.querySelector("#scenario-3") },
    ];

    function show(idx) {
      btns.forEach((x, i) => {
        x.p.hidden = i !== idx;
        x.b.classList.toggle("ghost", i !== idx);
      });
    }

    btns.forEach((x, i) => x.b.addEventListener("click", () => show(i)));
    show(0);
  },
};
