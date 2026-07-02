/* ============================================================
   Section: One flow, many tools (user input as a variable)
   The pivot from "chatbot" to "AI application." Routes the user
   input THROUGH a Prompt Template variable, so a fixed template
   turns raw input into a specific job. Builds three tools that
   share ONE wiring and differ only in the template text:
   explain-simply, tone rewriter, sentiment classifier.

   Reuses Section 3's {variable}+Check&Save with a real model.

   Flow (verified wiring, all Message/blue ports):
     Chat Input → Prompt Template {input} → Language Model Input
     → Chat Output. (Prompt feeds the model's INPUT here, not the
     System Message — the templated text IS the user message.)

   Interactive "tool gallery" assembles REAL prompt text (template
   with the typed input spliced in); no fabricated model outputs.
   ============================================================ */

window.SectionContent["single-purpose-tools"] = {
  title: "One flow, many tools",

  html: `
    <div class="eyebrow">Building in Langflow · Section 9</div>
    <h1>One flow, many tools: user input as a variable</h1>

    <p>Everything we have built so far is an <strong>open chatbot</strong>: the
    user types whatever they like, and the model chats back. But look at the AI
    features inside real software — a "translate" button, a "summarize this"
    link, a "fix my tone" helper. Those are not chatbots. They are
    <strong>single-purpose tools</strong>: the app holds a fixed prompt, and the
    user just drops one piece of input into it. That shift — from open chat to a
    purpose-built tool — is what turns a model into an <strong>application</strong>.</p>

    <h2>The one change that makes a tool</h2>

    <p>Here is the whole trick, and you already know both halves of it. In your
    chatbot, the user's words went <em>straight</em> to the model. In a tool, the
    user's words first flow <strong>through a Prompt Template</strong>, dropping
    into a <code>{variable}</code> blank — exactly the blanks you made (keyless)
    back in <a href="#langflow-canvas-basics">Section 3</a>, now with a real
    model on the end.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 124" role="img"
           aria-label="Chat Input flows into a Prompt Template variable, then into the Language Model, then to Chat Output">
        <rect x="8" y="38" width="120" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="68" y="62" text-anchor="middle" font-size="12.5" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="68" y="79" text-anchor="middle" font-size="10" fill="#8a93a6">your input</text>

        <rect x="148" y="38" width="140" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="218" y="62" text-anchor="middle" font-size="12.5" font-weight="600" fill="#1f2430">Prompt Template</text>
        <text x="218" y="79" text-anchor="middle" font-size="10" fill="#8a93a6">wraps it in a job</text>

        <rect x="308" y="38" width="130" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="373" y="62" text-anchor="middle" font-size="12.5" font-weight="600" fill="#1f2430">Language Model</text>
        <text x="373" y="79" text-anchor="middle" font-size="10" fill="#8a93a6">does the job</text>

        <rect x="458" y="38" width="94" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="505" y="62" text-anchor="middle" font-size="12" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="505" y="79" text-anchor="middle" font-size="10" fill="#8a93a6">the result</text>

        <line x1="128" y1="65" x2="148" y2="65" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="288" y1="65" x2="308" y2="65" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="438" y1="65" x2="458" y2="65" stroke="#3b82f6" stroke-width="2.5"/>
        <circle cx="128" cy="65" r="5" fill="#3b82f6"/>
        <circle cx="148" cy="65" r="5" fill="#3b82f6"/>
        <circle cx="288" cy="65" r="5" fill="#3b82f6"/>
        <circle cx="308" cy="65" r="5" fill="#3b82f6"/>
        <circle cx="438" cy="65" r="5" fill="#3b82f6"/>
        <circle cx="458" cy="65" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <p>Notice the Prompt Template now feeds the Language Model's
    <strong>Input</strong> — not its System Message. The templated text
    <em>is</em> the message we send. Below, pick a tool and type something; watch
    your words drop into that tool's template to become the exact prompt the
    model receives.</p>

    ${Toolkit.widget(
      "Tool gallery — one wiring, three jobs",
      `<div class="emb-chips" id="tool-pick"></div>
       <label style="display:block; font-size:.85rem; color:var(--ink-faint); margin:14px 0 4px">Your input:</label>
       <textarea id="tool-input" rows="2"
         style="width:100%; font:inherit; font-size:.92rem; padding:8px 10px; border:1px solid var(--line); border-radius:8px; resize:vertical; background:var(--surface); color:var(--ink)"></textarea>
       <div class="emb-vec" style="margin-top:12px">
         <div class="emb-vec-head" id="tool-head"></div>
         <div class="emb-vec-nums" id="tool-preview" style="white-space:pre-wrap"></div>
       </div>`
    )}

    <h2>Build tool #1 — "Explain it simply"</h2>

    <p>Let us build the first one for real. The wiring is the diagram above.</p>

    <ol class="steps">
      <li>On a fresh canvas, add a <strong>Chat Input</strong>, a
        <strong>Language Model</strong> (set your provider and model), and a
        <strong>Chat Output</strong>.</li>
      <li>Add a <strong>Prompt Template</strong>. In its <strong>Template</strong>
        field, type:
        <br /><code>Explain the following so a complete beginner understands it,
        in 3 short sentences with one everyday analogy:<br /><br />{input}</code>
        <br />Click <strong>Check &amp; Save</strong> so the <strong>input</strong>
        blank appears.</li>
      <li>Wire <strong>Chat Input</strong> → the Prompt Template's
        <strong>input</strong>.</li>
      <li>Wire the <strong>Prompt Template</strong> output → the Language Model's
        <strong>Input</strong> (the same port your Chat Input used to plug into).</li>
      <li>Wire the <strong>Language Model</strong> → <strong>Chat Output</strong>.</li>
      <li>Open the <strong>Playground</strong> and type a topic, like
        <strong>How does the internet work?</strong> — and you get a simple,
        three-sentence explanation, no matter what topic you throw at it.</li>
    </ol>

    ${Toolkit.problem(
      `Before you run it: if a student types just <strong>cats</strong> into this
       tool, what is the exact text the <em>model</em> receives?`,
      `<p>Explain the following so a complete beginner understands it, in 3 short
       sentences with one everyday analogy:</p>
       <p>cats</p>
       <p>The word "cats" simply drops into the <code>{input}</code> blank. The
       model never sees the blank — it sees the finished prompt.</p>`,
      { label: "Predict, then check" }
    )}

    <h2>Now make it a different app — change one thing</h2>

    <p>Here is the satisfying part. To build a <em>completely different</em>
    tool, you do not touch the wiring at all. You change only the
    <strong>template text</strong> (then Check &amp; Save). Same four boxes, same
    connections — new app.</p>

    <h3>Tool #2 — "Fix the tone"</h3>
    <p>Change the Template to:</p>
    <p><code>Rewrite the following message so it sounds warm and professional,
    while keeping it short:<br /><br />{input}</code></p>
    <p>Now type a blunt note into the Playground — <strong>hey i cant make the
    meeting move it</strong> — and out comes a polished version. You built a tone
    rewriter by editing one box.</p>

    <h3>Tool #3 — "Classify a review"</h3>
    <p>Change the Template again to:</p>
    <p><code>Classify the sentiment of this customer review as Positive,
    Negative, or Neutral, then explain your choice in one sentence:<br /><br />{input}</code></p>
    <p>Paste in a review — <strong>The food arrived cold, but the staff were
    incredibly kind about it</strong> — and the model sorts it into a category
    with a reason.</p>

    ${Toolkit.callout(
      `That third tool has a real name: a <strong>classifier</strong> — something
       that sorts inputs into categories. Classification is one of the oldest and
       most useful jobs in all of AI (spam-or-not, urgent-or-not, which-department).
       You just built one with a single sentence of instructions and no training
       data at all. That is genuinely remarkable, and we will come back to why it
       works.`,
      { type: "ai", label: "You just built a classifier" }
    )}

    <h2>The big idea</h2>

    ${Toolkit.callout(
      `One flow, many tools. The boxes and wires were identical all three times —
       the <em>only</em> difference between an explainer, a tone-fixer, and a
       classifier was the words in the template. This is what most "AI features"
       in real software actually are: a carefully written prompt template with a
       blank for the user's input. You now know how to build them.`,
      { label: "What you really learned here" }
    )}

    <p>So go further. Keep the wiring, change the template, and you have a new
    tool in seconds: a quiz-maker (<code>Write 3 quiz questions about:
    {input}</code>), a recipe scaler, an emoji translator, a grammar fixer. Try
    inventing one of your own.</p>

    <h2>What you accomplished</h2>
    <ul>
      <li>You learned the difference between an <strong>open chatbot</strong> and
      a <strong>single-purpose tool</strong> — and that the tool is the shape of
      most real AI applications.</li>
      <li>You routed the user's input <strong>through a Prompt Template
      variable</strong> into the model, reusing the <code>{variable}</code> +
      Check &amp; Save skill from Section 3 with a real model.</li>
      <li>You built <strong>three different apps</strong> — an explainer, a tone
      rewriter, and a sentiment <strong>classifier</strong> — that shared one
      identical flow and differed only in the template.</li>
      <li>You saw the headline of the whole course made concrete:
      <strong>change the words in the box, change the app.</strong></li>
    </ul>
  `,

  onMount(root) {
    /* ---- Tool gallery: splice typed input into the chosen template ---- */
    const TOOLS = [
      {
        id: "explain",
        label: "Explain it simply",
        tmpl: "Explain the following so a complete beginner understands it, in 3 short sentences with one everyday analogy:\n\n{input}",
        sample: "How does the internet work?",
      },
      {
        id: "tone",
        label: "Fix the tone",
        tmpl: "Rewrite the following message so it sounds warm and professional, while keeping it short:\n\n{input}",
        sample: "hey i cant make the meeting today move it to friday",
      },
      {
        id: "classify",
        label: "Classify a review",
        tmpl: "Classify the sentiment of this customer review as Positive, Negative, or Neutral, then explain your choice in one sentence:\n\n{input}",
        sample: "The food arrived cold, but the staff were incredibly kind about fixing it.",
      },
    ];

    const pick = root.querySelector("#tool-pick");
    const input = root.querySelector("#tool-input");
    const head = root.querySelector("#tool-head");
    const preview = root.querySelector("#tool-preview");
    let current = TOOLS[0];

    function render() {
      pick.querySelectorAll(".emb-chip").forEach((b) => {
        b.classList.toggle("on", b.dataset.id === current.id);
      });
      head.textContent = current.label + " — the prompt the model receives";
      const val = input.value.trim() || "(type something above)";
      // split/join avoids special-character surprises in replacement text
      preview.textContent = current.tmpl.split("{input}").join(val);
    }

    TOOLS.forEach((t) => {
      const b = document.createElement("button");
      b.className = "emb-chip" + (t.id === current.id ? " on" : "");
      b.dataset.id = t.id;
      b.textContent = t.label;
      b.addEventListener("click", () => {
        current = t;
        input.value = t.sample;
        render();
      });
      pick.appendChild(b);
    });

    input.value = current.sample;
    input.addEventListener("input", render);
    render();
  },
};
