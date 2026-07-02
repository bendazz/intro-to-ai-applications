/* ============================================================
   Section: Is it any good? Testing your app
   First taste of EVALUATION, grounded in the Section 9 classifier
   (discrete labels → you can objectively mark each run right/wrong).
   Teaches: test set / golden set, scoring, the test→fix→retest
   loop, regressions, and the honest hard part (open-ended outputs
   have no single right answer).

   FRAMING NOTE (see [[course-goal-not-math]]): this course is about
   how AI apps work and are built, NOT math. Accuracy here is just a
   way to tell whether the app works — keep it light, never a math
   lesson.

   Running is MANUAL in the Playground (no new components). The
   scorecard widget tallies the student's REAL results (they tick a
   box per case after running it); nothing is faked.
   ============================================================ */

window.SectionContent["testing-your-app"] = {
  title: "Is it any good? Testing your app",

  html: `
    <div class="eyebrow">Building in Langflow · Section 10</div>
    <h1>Is it any good? Testing your app</h1>

    <p>Your classifier from last section gave answers. But were they the
    <em>right</em> answers? You probably tried it once or twice, it looked fine,
    and you moved on. That is exactly how a lot of broken software ships:
    "it seemed to work." People who build AI apps for real do something better —
    they <strong>test</strong>. This section is your first taste of
    <strong>evaluation</strong>: deciding, honestly and repeatably, whether your
    app actually does its job.</p>

    <h2>Why "it seemed fine" is a trap</h2>

    <p>Two problems with eyeballing a couple of answers. First, you only saw a
    couple — you have no idea how it does on the <em>weird</em> inputs, which is
    exactly where apps fall over. Second, and worse: when you later tweak the
    prompt to fix something, how will you know you did not quietly
    <strong>break</strong> something that used to work? You cannot — unless you
    have a fixed set of cases you re-check every single time.</p>

    <h2>The heart of it: a test set</h2>

    <p>A <strong>test set</strong> (some people call it a "golden set") is just a
    list of <strong>inputs paired with the answer you want</strong>. For our
    classifier, each case is a review plus the sentiment it <em>should</em> get.
    Here is one to use — and notice it includes some deliberately tricky reviews,
    because the tricky ones are where you learn something:</p>

    <table class="dist-table">
      <thead><tr><th>Review (the input)</th><th>Answer you want</th></tr></thead>
      <tbody>
        <tr><td>Absolutely love this — best purchase I have made all year!</td><td>Positive</td></tr>
        <tr><td>Worst product I have ever owned. A total waste of money.</td><td>Negative</td></tr>
        <tr><td>It arrived on Tuesday.</td><td>Neutral</td></tr>
        <tr><td>The food was cold, but the staff were incredibly kind about fixing it.</td><td>Neutral</td></tr>
        <tr><td>Oh, fantastic. It broke again on day two. Just wonderful.</td><td>Negative</td></tr>
        <tr><td>Not bad at all, actually.</td><td>Positive</td></tr>
        <tr><td>Five stars. Would absolutely recommend.</td><td>Positive</td></tr>
        <tr><td>Meh. It is okay I guess, nothing special.</td><td>Neutral</td></tr>
      </tbody>
    </table>

    <p>Some of these are genuinely arguable — is "cold food but kind staff"
    really Neutral? That argument <em>is</em> part of the work: before you can
    test an app, you have to decide what a good answer even means. We will use
    the answers above as our agreed-upon target.</p>

    <h2>Run the test set and score it</h2>

    <p>Open your classifier in the Playground and run <strong>each</strong> review
    through it, one at a time. For each, compare the model's answer to the answer
    you wanted, and tick the box if it matched. The scorecard keeps a running
    total.</p>

    ${Toolkit.widget(
      "Scorecard",
      `<table class="dist-table" style="margin-top:0">
         <thead><tr><th>Review</th><th>Wanted</th><th style="text-align:center">Got it right?</th></tr></thead>
         <tbody id="ev-rows"></tbody>
       </table>
       <div class="readout">
         <div class="stat"><span class="label">Correct</span><span class="value" id="ev-correct">0 / 8</span></div>
         <div class="stat"><span class="label">Score</span><span class="value" id="ev-pct">0%</span></div>
       </div>
       <div class="controls"><button class="btn ghost" id="ev-reset">Clear all</button></div>`
    )}

    <p>That score — how many it got right out of the total — is the whole point.
    It turns "seems fine" into something you can actually compare. Write your
    first score down; it is the number you are about to try to beat.</p>

    <h2>The failures are where the gold is</h2>

    <p>Look only at the ones it got <strong>wrong</strong>. There is almost always
    a pattern. Did it miss the <strong>sarcasm</strong> in "Oh, fantastic… just
    wonderful"? Did the <strong>mixed</strong> review confuse it? Did
    "not bad at all" trip it up? Here is the key reframe: that is not the model
    being stupid. <strong>Your prompt never told it how to handle those
    cases.</strong> A failure is usually a missing instruction.</p>

    <h2>Fix the prompt, then test again</h2>

    <ol class="steps">
      <li>Pick one failure pattern. Add a rule to your classifier's
        <strong>Template</strong> that addresses it — for example:
        <br /><code>Watch for sarcasm: judge the writer's real feeling, not the
        literal words. If a review mixes good and bad points, classify by the
        overall feeling, and use Neutral only if it is genuinely balanced.</code></li>
      <li>Click <strong>Check &amp; Save</strong>.</li>
      <li><strong>Re-run the entire test set</strong> — all eight, not just the
        ones that failed — and score it again with a fresh scorecard.</li>
    </ol>

    ${Toolkit.callout(
      `Why re-run <em>all</em> of them? Because a rule that fixes the sarcastic
       review might suddenly flip one that was already correct. This is called a
       <strong>regression</strong> — fixing one thing quietly breaks another —
       and it is the single biggest reason to keep a test set and re-check the
       whole thing after every change. Improvement is only real if the score goes
       up <em>overall</em>.`,
      { type: "warn", label: "The regression trap" }
    )}

    ${Toolkit.problem(
      `You add the sarcasm rule and re-test. The sarcastic review is now correct,
       but your score only went from 6/8 to 6/8 — no better. What likely
       happened, and why was running the whole set the thing that saved you?`,
      `<p>Your new rule fixed the sarcastic case but <strong>broke a different
       one</strong> — perhaps a plainly positive review got second-guessed into
       Neutral. Net change: zero. If you had only re-checked the case you were
       trying to fix, you would have celebrated a "fix" that actually made the app
       no better. Re-running the full set is what revealed the hidden regression
       — now you can refine the rule to fix sarcasm <em>without</em> the side
       effect.</p>`,
      { label: "Predict, then check" }
    )}

    <h2>The honest hard part</h2>

    <p>Notice why this was even possible: the classifier has
    <strong>clear right answers</strong>, so "correct or not" was a simple call.
    Now think about your <em>explainer</em> or <em>tone-fixer</em> from last
    section. What is the single correct explanation of how rainbows form? There
    isn't one. Judging open-ended answers is far harder and more subjective —
    you need a <strong>rubric</strong> ("is it accurate? simple enough? the right
    length?"), or a <strong>person</strong> to read and rate them, or even
    <strong>another AI</strong> hired to judge. Figuring out what "good" means for
    <em>your</em> app is half the work, and it is one of the genuinely hard parts
    of building AI applications. We will come back to it.</p>

    <h2>What you learned</h2>
    <ul>
      <li>Builders don't trust "it seemed fine" — they
      <strong>test</strong>, because you can't see the weird cases or catch
      breakage by eyeballing a couple of answers.</li>
      <li>A <strong>test set</strong> — inputs paired with the answers you want —
      is the heart of checking an app, and scoring it gives you an honest number
      to compare against.</li>
      <li>Failures usually mean a <strong>missing instruction</strong>, not a
      stupid model. You fix the prompt and re-test.</li>
      <li>Always re-run the <strong>whole</strong> set: a fix in one place can
      cause a <strong>regression</strong> somewhere else.</li>
      <li>Apps with clear right answers are easy to score; <strong>open-ended</strong>
      apps are not, and deciding what "good" means is one of the hard parts of
      building AI applications.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- Scorecard: student ticks real results from their Playground runs ---- */
    const TESTS = [
      { review: "Absolutely love this — best purchase all year!", want: "Positive" },
      { review: "Worst product I have ever owned.", want: "Negative" },
      { review: "It arrived on Tuesday.", want: "Neutral" },
      { review: "Cold food, but the staff were incredibly kind.", want: "Neutral" },
      { review: "Oh, fantastic. It broke again on day two.", want: "Negative" },
      { review: "Not bad at all, actually.", want: "Positive" },
      { review: "Five stars. Would absolutely recommend.", want: "Positive" },
      { review: "Meh. It is okay I guess, nothing special.", want: "Neutral" },
    ];

    const rows = root.querySelector("#ev-rows");
    const correctEl = root.querySelector("#ev-correct");
    const pctEl = root.querySelector("#ev-pct");
    const resetBtn = root.querySelector("#ev-reset");
    const n = TESTS.length;

    function tally() {
      const boxes = rows.querySelectorAll("input[type=checkbox]");
      let c = 0;
      boxes.forEach((b) => { if (b.checked) c += 1; });
      correctEl.textContent = c + " / " + n;
      pctEl.textContent = Math.round((c / n) * 100) + "%";
    }

    TESTS.forEach((t) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = t.review;
      const td2 = document.createElement("td");
      td2.textContent = t.want;
      const td3 = document.createElement("td");
      td3.style.textAlign = "center";
      const box = document.createElement("input");
      box.type = "checkbox";
      box.style.width = "18px";
      box.style.height = "18px";
      box.style.accentColor = "var(--accent)";
      box.style.cursor = "pointer";
      box.addEventListener("change", tally);
      td3.appendChild(box);
      tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
      rows.appendChild(tr);
    });

    resetBtn.addEventListener("click", () => {
      rows.querySelectorAll("input[type=checkbox]").forEach((b) => { b.checked = false; });
      tally();
    });

    tally();
  },
};
