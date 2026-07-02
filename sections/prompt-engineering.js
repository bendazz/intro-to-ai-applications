/* ============================================================
   Section: Prompt engineering — asking for what you want
   A concept section (no inline problems; ends with "What you
   learned"; a *-practice section can follow). Provider-agnostic
   craft — no new Langflow components, just better words in the
   Prompt Template / System Message met in Sections 6–7.

   Honest interactive: a "prompt builder" that assembles REAL
   prompt text from toggled ingredients (no fabricated model
   outputs). Before/after answers are produced by the student in
   their own Playground, so they are real.
   ============================================================ */

window.SectionContent["prompt-engineering"] = {
  title: "Prompt engineering",

  html: `
    <div class="eyebrow">Building in Langflow · Section 8</div>
    <h1>Prompt engineering: asking for what you actually want</h1>

    <p>You have already done this once. Back in
    <a href="#add-a-model">Section 6</a>, changing the system message from "a
    friendly tutor" to "a cheerful pirate" changed the answer completely —
    without touching the question. That was <strong>prompt engineering</strong>:
    the craft of writing the input so the model gives you what you want. It is
    the single most useful skill in this entire course, and it needs no new
    boxes — just better words in the Prompt Template.</p>

    <h2>The one principle everything rests on</h2>

    <p>Recall the function machine from <a href="#talking-to-ai">Section 1</a>:
    the model has nothing to go on except the text you hand it. It
    <strong>cannot read your mind</strong>, cannot see your intentions, and
    knows nothing about who you are or why you are asking. So every detail you
    leave out, it has to <strong>guess</strong>.</p>

    <p>Ask <strong>"Tell me about dogs"</strong> and the model must silently
    decide: How long an answer? For a child or a vet? About breeds, care,
    history, biology? It will pick something — but it is picking <em>for</em>
    you. Good prompting is mostly just <strong>doing that deciding yourself,
    out loud,</strong> so the model does not have to guess.</p>

    <h2>The anatomy of a strong prompt</h2>

    <p>A strong prompt usually answers four questions for the model, plus one
    power move:</p>
    <ul>
      <li><strong>WHO</strong> should it be? — give it a <strong>role</strong>
      ("You are a patient math tutor…").</li>
      <li><strong>WHAT</strong> exactly should it do? — state the
      <strong>task</strong> specifically.</li>
      <li><strong>HOW</strong> should the answer look? —
      <strong>format and length</strong> ("3 bullet points," "one sentence," "a
      table").</li>
      <li><strong>RULES</strong>? — <strong>constraints</strong>: the audience,
      the tone, what to avoid, what to do when unsure.</li>
      <li><strong>SHOW</strong> it — give an <strong>example</strong> of what you
      want. (The power move; more on it below.)</li>
    </ul>

    <p>Toggle these ingredients on and off and watch a vague request turn into a
    precise one. This is just text being assembled — exactly the text the model
    would receive:</p>

    ${Toolkit.widget(
      "Build a prompt",
      `<div class="emb-chips" id="pe-chips"></div>
       <div class="emb-vec">
         <div class="emb-vec-head">The prompt the model receives</div>
         <div class="emb-vec-nums" id="pe-preview" style="white-space:pre-wrap"></div>
       </div>`
    )}

    <h2>See it for real in the Playground</h2>

    <p>Do not take my word for it — run both of these in your chatbot's
    Playground and compare what comes back.</p>

    <ol class="steps">
      <li><strong>The weak prompt.</strong> Ask: <code>Tell me about the
        moon.</code> Notice what it guesses — the length, the audience, the
        angle.</li>
      <li><strong>The strong prompt.</strong> Now ask:
        <br /><code>You are an astronomy guide for curious beginners. In 3 short
        bullet points, each one sentence and free of jargon, explain what the
        moon is and why it appears to change shape during the month. If anything
        is uncertain, say so.</code></li>
      <li>Compare. Same topic, very different answer — because the second prompt
        stopped the model from having to guess.</li>
    </ol>

    <h2>The power move: show, don't just tell</h2>

    <p>You can <em>describe</em> what you want, or you can <strong>show an
    example</strong> and let the model copy the pattern. This works
    astonishingly well, and it is a direct consequence of how the model works:
    remember from Section 1 that it is always predicting <strong>what comes
    next</strong>. Give it a pattern and "what comes next" is simply more of
    that pattern. Try this in the Playground:</p>

    <p><code>Give each thing a one-word feeling.<br />A birthday party →
    joyful<br />A dentist visit → nervous<br />A long road trip →</code></p>

    <p>The model finishes the line in the style you set up, with no further
    explanation needed. Showing two or three examples like this — called
    <strong>few-shot</strong> prompting — is often faster and more reliable than
    trying to describe the format in words.</p>

    <h2>The honesty rule</h2>

    ${Toolkit.callout(
      `A model would rather give you a confident wrong answer than admit it does
       not know — because it is predicting plausible text, not checking facts
       (Section 1 again). One short line in your prompt helps a lot:
       <strong>"If you are not sure, say so instead of guessing."</strong> It
       will not fix the problem completely — nothing does — but it is the
       cheapest reliability upgrade you can make.`,
      { type: "warn", label: "Curb the confident guessing" }
    )}

    <h2>Prompting is a loop, not a lucky guess</h2>

    <p>Nobody writes the perfect prompt on the first try. The real skill is
    <strong>iterating</strong>: write a prompt, run it, look at what is wrong,
    change <em>one thing</em>, run it again. Your Playground is a laboratory, and
    changing one ingredient at a time is how you learn what each one does. The
    students who get great results are not smarter — they just go around that
    loop a few more times.</p>

    ${Toolkit.callout(
      `Hold onto this skill — it only grows in importance. Everything we build
       from here is, underneath, a way of putting better text in front of the
       model: retrieval (next big topic) feeds it the right facts; agents give
       it instructions for using tools. The prompt is always at the center.`,
      { type: "ai", label: "Why this is the keystone skill" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>The model only knows what is in the prompt; every detail you omit, it
      <strong>guesses</strong>. Good prompting is doing that deciding for it.</li>
      <li>A strong prompt answers <strong>WHO</strong> (role),
      <strong>WHAT</strong> (specific task), <strong>HOW</strong> (format and
      length), and the <strong>RULES</strong> (constraints) — and often
      <strong>SHOWS</strong> an example.</li>
      <li><strong>Few-shot</strong> prompting — giving a couple of
      example pairs — leans on the model's "predict what comes next" nature and
      is a powerful way to lock in a format.</li>
      <li>Adding <strong>"say so if you are unsure"</strong> reduces confident
      made-up answers.</li>
      <li>Prompting is an <strong>iterative loop</strong>: run, inspect, change
      one thing, repeat.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- Prompt builder: assemble real prompt text from toggles ---- */
    const INGREDIENTS = [
      { id: "role", label: "WHO · a role",      text: "You are a friendly science teacher." },
      { id: "aud",  label: "RULES · audience",  text: "Explain it to a 9th-grader with no science background, and avoid jargon." },
      { id: "fmt",  label: "HOW · format",      text: "Answer in exactly 3 short bullet points." },
      { id: "ex",   label: "SHOW · an example", text: "Include one everyday analogy to make it concrete." },
      { id: "hon",  label: "RULES · honesty",   text: "If any part is uncertain, say so rather than guess." },
    ];

    const chipsEl = root.querySelector("#pe-chips");
    const preview = root.querySelector("#pe-preview");
    const on = new Set();

    function rebuild() {
      chipsEl.querySelectorAll(".emb-chip").forEach((b) => {
        b.classList.toggle("on", on.has(b.dataset.id));
      });
      const lines = INGREDIENTS.filter((i) => on.has(i.id)).map((i) => i.text);
      if (lines.length === 0) {
        preview.textContent =
          "Explain how rainbows form.\n\n(That is the whole prompt — the model " +
          "must guess who it is talking to, how long to be, and what to include.)";
      } else {
        preview.textContent =
          lines.join("\n") + "\n\nNow: Explain how rainbows form.";
      }
    }

    INGREDIENTS.forEach((ing) => {
      const b = document.createElement("button");
      b.className = "emb-chip";
      b.dataset.id = ing.id;
      b.textContent = ing.label;
      b.addEventListener("click", () => {
        if (on.has(ing.id)) on.delete(ing.id);
        else on.add(ing.id);
        rebuild();
      });
      chipsEl.appendChild(b);
    });

    rebuild();
  },
};
