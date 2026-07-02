/* ============================================================
   Section: What happens when you talk to an AI?
   The opening concept section. No tools, no code — just the one
   idea everything else in the course rests on: the model is a
   function from text to text, and it writes its answer one
   piece at a time by predicting what comes next.
   ============================================================ */

window.SectionContent["talking-to-ai"] = {
  title: "What happens when you talk to an AI?",

  html: `
    <div class="eyebrow">Foundations · Section 1</div>
    <h1>What happens when you talk to an AI?</h1>

    <p>You open a chatbot, type a question, and a moment later an answer
    appears. It feels like talking to <em>someone</em>. For this whole course
    we are going to take that feeling apart — not to ruin the magic, but
    because once you see the simple machine underneath, every AI app we build
    (chatbots, search assistants, agents that take actions, teams of agents)
    turns out to be a different way of wrapping that <strong>one</strong>
    machine. So let us start with the machine itself.</p>

    <h2>The model is a function</h2>

    <p>At the center of every AI app in this course is a thing called a
    <strong>language model</strong>. Forget for a moment how it was made.
    Think only about what it <em>does</em>, from the outside:</p>

    <ul>
      <li>You give it some <strong>text</strong> (your question, an
      instruction, a document — anything written).</li>
      <li>It gives you back some <strong>text</strong> (its answer).</li>
    </ul>

    <p>That is the entire job. Text in, text out. In math, a box that takes
    something in and gives something back is called a
    <strong>function</strong>, and we can write what the model does in exactly
    that language:</p>

    <p style="text-align:center; font-size:1.1rem">
      $\\text{response} = \\text{model}(\\text{prompt})$
    </p>

    <p>Two words there are worth keeping for the rest of the course. The text
    you put <em>in</em> is called the <strong>prompt</strong>. The text that
    comes <em>out</em> is called the <strong>response</strong>. The model is
    the function in the middle. Press a prompt in below and watch a response
    come out the other side.</p>

    ${Toolkit.widget(
      "The function machine",
      `<div class="fnm">
         <div class="fnm-panel">
           <div class="fnm-tag">Prompt (text in)</div>
           <div class="fnm-text" id="fnm-prompt">Pick a prompt below…</div>
         </div>
         <div class="fnm-arrow">→</div>
         <div class="fnm-core"><div class="fnm-chip" id="fnm-chip">MODEL</div></div>
         <div class="fnm-arrow">→</div>
         <div class="fnm-panel">
           <div class="fnm-tag">Response (text out)</div>
           <div class="fnm-text fnm-out" id="fnm-out"></div>
         </div>
       </div>
       <div class="controls" id="fnm-buttons"></div>`
    )}

    <p>Notice that you did not tell the machine <em>how</em> to answer. You did
    not give it the rules of French geography or the recipe for a haiku. You
    just handed it text, and text came back. Everything clever the model seems
    to know is already baked inside that middle box — we will look at how it
    got there in a later section. For now, the shape is the whole point:
    <strong>one box, text in, text out.</strong></p>

    ${Toolkit.callout(
      `Hold onto this picture. A chatbot is this box with the conversation
       fed back in. A document assistant is this box with the right page
       pasted into the prompt first. An agent is this box asked, over and
       over, "what should I do next?" Different apps, same box in the middle.`,
      { type: "ai", label: "Where this lives in an AI app" }
    )}

    <h2>It writes one word at a time</h2>

    <p>If you watched the response appear above, you saw it arrive piece by
    piece, left to right — not all at once. That is not a typing animation we
    added for show. It is genuinely how the model works.</p>

    <p>The model does not think up a whole answer and then reveal it. It
    produces <strong>one small piece of text, then another, then another</strong>,
    each time looking at everything so far — your prompt plus the words it has
    already written — to choose the next piece. (Those small pieces are called
    <strong>tokens</strong>; a token is roughly a word or part of a word. We
    will not fuss over them now, but you will hear the word again, especially
    when we talk about cost.)</p>

    <p>So a better picture of the function is a loop: write a piece, look at
    everything so far, write the next piece, and repeat until the answer feels
    complete.</p>

    <h2>Really, it is predicting what comes next</h2>

    <p>Here is the part that surprises people. When the model picks that next
    piece of text, it is doing something astonishingly simple to describe: it
    is guessing <strong>what word is most likely to come next</strong>, given
    everything written so far. It is a very, very good autocomplete.</p>

    <p>You already have this skill. Read the line below and your brain fills in
    the blank before you can stop it:</p>

    ${Toolkit.widget(
      "Predict the next word",
      `<div class="pnw-prefix">I poured myself a hot cup of
         <span class="pnw-blank" id="pnw-blank">?</span></div>
       <div class="controls">
         <button class="btn" id="pnw-reveal">Reveal what a model expects</button>
       </div>
       <div class="pnw-bars" id="pnw-bars" hidden></div>
       <div class="pnw-cap" id="pnw-cap" hidden>
         Illustrative only — the real list runs to tens of thousands of
         possible next words, each with its own score. The model does not
         pick the single top word every time; a touch of randomness is why
         the same prompt can give different answers.
       </div>`
    )}

    <p>The model holds a score for <em>every</em> possible next word — "coffee"
    scores high here, "elephant" scores almost nothing — and then chooses one.
    Then it does the whole thing again for the word after that. Stack up
    thousands of these tiny, sensible guesses and you get a paragraph that
    reads as if someone understood your question.</p>

    ${Toolkit.callout(
      `Because the model is predicting plausible text — not looking up
       verified facts in a database — it can write something that sounds
       perfectly confident and is simply wrong. That is not a bug we can
       fully switch off; it is a direct consequence of how the machine works.
       Trusting it wisely, and giving it the right material to work from, is a
       large part of what building good AI apps is about.`,
      { type: "note", label: "Heads up" }
    )}

    <h2>The same machine, every time</h2>

    <p>One last thing to notice, because it shapes everything we build next.
    The function does not change between questions, and it does not quietly
    remember you. Each time, it sees only the text you hand it in that one
    prompt. Ask "What is its capital?" with nothing before it, and the model
    has no idea what "it" means — there is no earlier conversation inside the
    box.</p>

    <p>So how do real chatbots seem to remember what you said three messages
    ago? They do something almost sneaky: every time you send a new message,
    the app quietly pastes the <em>whole conversation so far</em> back into the
    prompt. The memory is not inside the model — it is something the
    <strong>app</strong> arranges around the model. Keep that distinction; it
    is the seed of how a bare function becomes a chatbot.</p>

    ${Toolkit.callout(
      `Everything in this course is a way of choosing what text to put into
       that prompt, and what to do with the text that comes out. That is it.
       Build a good answer to "what goes in the box, and what happens to what
       comes out?" and you can build any AI app.`,
      { label: "The whole course in one line" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>An AI app is built around a <strong>language model</strong>, which
      behaves like a <strong>function</strong>: text in (the
      <strong>prompt</strong>), text out (the <strong>response</strong>).</li>
      <li>The model writes its answer <strong>one piece at a time</strong>,
      left to right, each piece chosen in light of everything written so far.</li>
      <li>It chooses each piece by <strong>predicting the most likely next
      word</strong> — a powerful autocomplete — which is also why it can sound
      confident yet be wrong.</li>
      <li>The model does not remember on its own. Any "memory" is the
      <strong>app</strong> deciding what text to place into the prompt.</li>
      <li>Every app we build is a different answer to one question:
      <strong>what goes into the box, and what do we do with what comes
      out?</strong></li>
    </ul>
  `,

  onMount(root) {
    /* ---- The function machine: stream a canned, true response ---- */
    const prompts = [
      {
        label: "Capital of France?",
        prompt: "What is the capital of France?",
        response: "The capital of France is Paris.",
      },
      {
        label: "Write a haiku",
        prompt: "Write a haiku about the ocean.",
        response:
          "Endless rolling waves\nwhisper secrets to the shore —\nblue meeting the sky.",
      },
      {
        label: "Translate a phrase",
        prompt: "Translate “good morning” into Spanish.",
        response: "“Good morning” in Spanish is “Buenos días.”",
      },
      {
        label: "A little math",
        prompt: "What is 7 times 8?",
        response: "7 times 8 is 56.",
      },
    ];

    const promptEl = root.querySelector("#fnm-prompt");
    const outEl = root.querySelector("#fnm-out");
    const chip = root.querySelector("#fnm-chip");
    const btnRow = root.querySelector("#fnm-buttons");
    let timer = null;

    function run(p) {
      if (timer) clearInterval(timer);
      promptEl.textContent = p.prompt;
      outEl.textContent = "";
      outEl.classList.add("streaming");
      chip.classList.add("thinking");
      // split keeping the whitespace so spacing/newlines survive
      const pieces = p.response.split(/(\s+)/);
      let i = 0;
      timer = setInterval(() => {
        if (!outEl.isConnected) { clearInterval(timer); return; }
        if (i >= pieces.length) {
          clearInterval(timer);
          outEl.classList.remove("streaming");
          chip.classList.remove("thinking");
          return;
        }
        outEl.textContent += pieces[i++];
      }, 60);
    }

    prompts.forEach((p, idx) => {
      const b = document.createElement("button");
      b.className = "btn ghost";
      b.textContent = p.label;
      b.addEventListener("click", () => run(p));
      btnRow.appendChild(b);
      if (idx === 0) run(p); // bring the widget to life on arrival
    });

    /* ---- Predict the next word: reveal an illustrative score bar ---- */
    const candidates = [
      { word: "coffee", pct: 42 },
      { word: "tea", pct: 21 },
      { word: "water", pct: 11 },
      { word: "cocoa", pct: 8 },
      { word: "soup", pct: 5 },
    ];
    const revealBtn = root.querySelector("#pnw-reveal");
    const barsEl = root.querySelector("#pnw-bars");
    const capEl = root.querySelector("#pnw-cap");
    const blankEl = root.querySelector("#pnw-blank");

    revealBtn.addEventListener("click", () => {
      barsEl.innerHTML = candidates
        .map(
          (c) => `<div class="pnw-row">
              <div class="pnw-word">${c.word}</div>
              <div class="pnw-track"><div class="pnw-fill" data-w="${c.pct}"></div></div>
              <div class="pnw-pct">${c.pct}%</div>
            </div>`
        )
        .join("");
      barsEl.hidden = false;
      capEl.hidden = false;
      blankEl.textContent = "coffee";
      revealBtn.disabled = true;
      // animate the fills after they are in the DOM
      requestAnimationFrame(() => {
        barsEl.querySelectorAll(".pnw-fill").forEach((f) => {
          f.style.width = f.dataset.w + "%";
        });
      });
    });
  },
};
