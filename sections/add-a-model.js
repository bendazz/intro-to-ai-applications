/* ============================================================
   Section: Bringing in a real model
   The payoff. Students connect their API key and get a genuine
   AI response for the first time, then use the Prompt Template
   (met keyless in Section 3) to instruct the model via its
   System Message. Provider switcher covers both Gemini & Anthropic.

   NOTE (playbook): money in WORDS; no literal dollar-sign chars.

   Mechanics verified vs repo docs (see [[langflow-verified-facts]]):
     - Key lives in the Model Providers pane: profile icon → Settings
       → Model Providers → pick provider → API Key → Save → enable model.
     - Built-in providers include Anthropic and Google Generative AI.
     - Core Language Model component: provider + model dropdowns;
       inputs "Input" (input_value) and "System Message" (system_message,
       must be enabled); default output "Model Response" (Message).
     - Flow: Chat Input → Language Model Input; Prompt Template →
       Language Model System Message; Language Model → Chat Output;
       run in Playground.
   ============================================================ */

window.SectionContent["add-a-model"] = {
  title: "Bringing in a real model",

  html: `
    <div class="eyebrow">Building in Langflow · Section 6</div>
    <h1>Bringing in a real model</h1>

    <p>You have a key. You know the canvas. It is time for the moment this
    course has been building toward: connecting a <strong>real model</strong>
    and getting a genuine AI answer back.</p>

    <p>Cast your mind back to <a href="#talking-to-ai">Section 1</a>, where we
    pictured a model as a <strong>function</strong> — a box that takes text in
    and gives text out. In Langflow that box has a name: the
    <strong>Language Model</strong> component. Everything you learned about
    wiring boxes was preparation for dropping this one real box into a flow.</p>

    <h2>Step 1 — Tell Langflow your key</h2>

    <p>Langflow keeps your API key in one safe, masked place — exactly as we
    promised back in the key sections. You enter it once, Langflow stores it
    encrypted, and it never appears out on the canvas. Pick your provider:</p>

    <div class="controls" id="prov-switch">
      <button class="btn" id="prov-gemini">Gemini (free)</button>
      <button class="btn ghost" id="prov-anthropic">Anthropic (Claude)</button>
    </div>

    <div id="setup-gemini">
      <ol class="steps">
        <li>Click your <strong>profile icon</strong> → <strong>Settings</strong>
          → <strong>Model Providers</strong>.</li>
        <li>Select <strong>Google Generative AI</strong> (sometimes shown as
          <strong>Google</strong>) from the list of providers.</li>
        <li>Paste your free Gemini key into the <strong>API Key</strong> field
          and click <strong>Save</strong>.</li>
        <li><strong>Enable a Flash model</strong> — for example one labeled
          <strong>Gemini 2.5 Flash</strong>. Flash models are fast, free, and
          perfect for this course. (The exact names in the list change over
          time; any model labeled <strong>Flash</strong> is a fine choice.)</li>
      </ol>
    </div>

    <div id="setup-anthropic" hidden>
      <ol class="steps">
        <li>Click your <strong>profile icon</strong> → <strong>Settings</strong>
          → <strong>Model Providers</strong>.</li>
        <li>Select <strong>Anthropic</strong> from the list of providers.</li>
        <li>Paste your Anthropic key into the <strong>API Key</strong> field and
          click <strong>Save</strong>.</li>
        <li><strong>Enable a Haiku model</strong> — the small, fast, cheapest
          Claude (for example a model with <strong>Haiku</strong> in its name).
          Haiku makes your prepaid credits last a very long time. (Exact version
          names change; pick whichever <strong>Haiku</strong> is offered.)</li>
      </ol>
    </div>

    ${Toolkit.callout(
      `This Model Providers pane is the "masked credential" home we kept
       promising. Your key is entered once, stored encrypted, and reused by
       every flow — you never paste it onto the canvas where someone could read
       it over your shoulder. You only add one key per provider.`,
      { type: "ai", label: "Where your key lives" }
    )}

    <h2>Step 2 — The simplest real flow</h2>

    <p>Three boxes is all it takes: your question goes in, the model thinks, the
    answer comes out.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 130" role="img"
           aria-label="Chat Input connects to Language Model, which connects to Chat Output">
        <rect x="12" y="40" width="150" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="87" y="66" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="87" y="84" text-anchor="middle" font-size="11" fill="#8a93a6">your question</text>

        <rect x="205" y="40" width="160" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="285" y="66" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Language Model</text>
        <text x="285" y="84" text-anchor="middle" font-size="11" fill="#8a93a6">the real model</text>

        <rect x="408" y="40" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="478" y="66" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="478" y="84" text-anchor="middle" font-size="11" fill="#8a93a6">the answer</text>

        <line x1="162" y1="68" x2="205" y2="68" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="365" y1="68" x2="408" y2="68" stroke="#3b82f6" stroke-width="2.5"/>
        <circle cx="162" cy="68" r="5" fill="#3b82f6"/>
        <circle cx="205" cy="68" r="5" fill="#3b82f6"/>
        <circle cx="365" cy="68" r="5" fill="#3b82f6"/>
        <circle cx="408" cy="68" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <ol class="steps">
      <li>On a fresh canvas, add a <strong>Chat Input</strong> and a
        <strong>Chat Output</strong> (search the sidebar for <strong>chat</strong>).</li>
      <li>Search for <strong>language model</strong> and drag a
        <strong>Language Model</strong> component between them.</li>
      <li>On the Language Model box, set the <strong>Provider</strong> to the one
        you just configured, and pick your enabled <strong>Model</strong> from
        its dropdown.</li>
      <li>Wire <strong>Chat Input's output</strong> → the Language Model's
        <strong>Input</strong>.</li>
      <li>Wire the Language Model's <strong>output</strong> →
        <strong>Chat Output's</strong> input.</li>
      <li>Open the <strong>Playground</strong> and ask something, such as
        <strong>What is the capital of France?</strong></li>
    </ol>

    ${Toolkit.callout(
      `A real answer just came back — and watch closely: it arrives word by
       word, left to right, exactly as we described in Section 1. That is not an
       animation. The model really is writing one piece at a time, each piece
       chosen in light of everything before it. The function machine from the
       very first section is now running inside your flow.`,
      { type: "ai", label: "The moment" }
    )}

    <h2>Step 3 — Tell the model how to behave</h2>

    <p>Remember the <strong>Prompt Template</strong> box from
    <a href="#langflow-canvas-basics">Section 3</a> — the fill-in-the-blank box
    that, on its own, did not call any AI? This is the job it was made for.
    Models have a special input called the <strong>System Message</strong>:
    instructions for <em>how</em> to behave, separate from the user's question.
    We will feed those instructions in with a Prompt Template.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 210" role="img"
           aria-label="A Prompt Template feeds the Language Model's System Message; Chat Input and Chat Output connect on either side">
        <rect x="200" y="14" width="170" height="48" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="285" y="36" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Prompt Template</text>
        <text x="285" y="52" text-anchor="middle" font-size="10.5" fill="#8a93a6">the instructions</text>

        <rect x="12" y="120" width="150" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="87" y="146" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="87" y="164" text-anchor="middle" font-size="11" fill="#8a93a6">your question</text>

        <rect x="205" y="120" width="160" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="285" y="146" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Language Model</text>
        <text x="285" y="164" text-anchor="middle" font-size="11" fill="#8a93a6">the real model</text>

        <rect x="408" y="120" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="478" y="146" text-anchor="middle" font-size="14" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="478" y="164" text-anchor="middle" font-size="11" fill="#8a93a6">the answer</text>

        <line x1="285" y1="62" x2="285" y2="120" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="297" y="96" font-size="10.5" fill="#8a93a6">System Message</text>
        <line x1="162" y1="148" x2="205" y2="148" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="365" y1="148" x2="408" y2="148" stroke="#3b82f6" stroke-width="2.5"/>
        <circle cx="285" cy="62" r="5" fill="#3b82f6"/>
        <circle cx="285" cy="120" r="5" fill="#3b82f6"/>
        <circle cx="162" cy="148" r="5" fill="#3b82f6"/>
        <circle cx="205" cy="148" r="5" fill="#3b82f6"/>
        <circle cx="365" cy="148" r="5" fill="#3b82f6"/>
        <circle cx="408" cy="148" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <ol class="steps">
      <li>On the Language Model box, open its settings (the controls panel) and
        turn on the <strong>System Message</strong> input so it shows a
        connectable port.</li>
      <li>Add a <strong>Prompt Template</strong> box. In its
        <strong>Template</strong> field, write instructions — no curly-brace
        blanks needed this time — for example:
        <br /><code>You are a friendly tutor for first-year students. Explain
        things simply, in two or three sentences, with a small everyday
        example.</code>
        <br />Click <strong>Check &amp; Save</strong>.</li>
      <li>Wire the <strong>Prompt Template's output</strong> → the Language
        Model's <strong>System Message</strong> input.</li>
      <li>Open the <strong>Playground</strong> and ask the same question again.</li>
    </ol>

    <p>The answer comes back in the tutor's voice — simpler, shorter, with an
    example. You did not change the question; you changed the
    <strong>instructions</strong>. That is the Prompt Template finally doing its
    real job: shaping how a live model behaves.</p>

    ${Toolkit.callout(
      `Try swapping the instructions and asking again: make it answer as a
       cheerful pirate, or a careful science teacher, or in exactly one
       sentence. Same question, wildly different answers — because you changed
       the system message. Quietly, you are doing your first
       <strong>prompt engineering</strong>.`,
      { label: "Play with it" }
    )}

    ${Toolkit.callout(
      `Every time you press send, you spend a little — a handful of
       <em>tokens</em>, those small pieces of text from Section 1. On the free
       Gemini tier that counts against your daily quota and costs no money at
       all. On Anthropic it draws a sliver of your prepaid credits — with a
       Haiku model, fractions of a cent per question. Either way, you could run
       this hundreds of times today for next to nothing. We will look hard at
       what things cost in a later section.`,
      { type: "note", label: "What a run costs" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You stored your API key in Langflow's <strong>Model Providers</strong>
      pane — entered once, masked, encrypted, reused everywhere.</li>
      <li>You built <strong>Chat Input → Language Model → Chat Output</strong>
      and got your first <strong>real AI response</strong> — generated one piece
      at a time, just as Section 1 described.</li>
      <li>You used a <strong>Prompt Template</strong> as the
      <strong>System Message</strong> to control <em>how</em> the model behaves —
      the real purpose of the box you first met keyless in Section 3.</li>
      <li>You saw that changing the instructions, not the question, changes the
      answer — your first taste of <strong>prompt engineering</strong>.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- Provider switcher: show key-setup steps for the chosen provider ---- */
    const gBtn = root.querySelector("#prov-gemini");
    const aBtn = root.querySelector("#prov-anthropic");
    const gPanel = root.querySelector("#setup-gemini");
    const aPanel = root.querySelector("#setup-anthropic");

    function show(which) {
      const gem = which === "gemini";
      gPanel.hidden = !gem;
      aPanel.hidden = gem;
      gBtn.classList.toggle("ghost", !gem);
      aBtn.classList.toggle("ghost", gem);
    }

    gBtn.addEventListener("click", () => show("gemini"));
    aBtn.addEventListener("click", () => show("anthropic"));
    show("gemini"); // default to the free path
  },
};
