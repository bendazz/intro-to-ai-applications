/* ============================================================
   Section: Build your first agent (Langflow lab)
   Third AGENTS section — LAB. Build a real agent, give it a
   Calculator tool, and WATCH it decide in the Playground (the
   think→act→observe loop from S27 made real; Playground shows each
   tool call + input + result + final answer).

   VERIFIED (agents.mdx, agents-tools.mdx, calculator.mdx, web-search.mdx;
   repo 2026-06-29 — see [[langflow-verified-facts]] Agent entry):
   - Build: New Flow → Blank → Agent → set Language Model (provider+model
     from Models pane; Gemini/Anthropic both do tool calling) → Chat Input
     → Agent Input, Agent Response → Chat Output → Playground.
   - Agent alone = just chat; add TOOLS to make it agentic.
   - CALCULATOR = keyless (add/sub/mul/div/exponent; input expression;
     output JSON). Perfect reliable star tool.
   - Attach a tool: enable **Tool Mode** in the component's header menu →
     exposes a Tool/Toolset output → connect to Agent's **Tools** port.
     (Some components emit Tool output by default.)
   - **Edit Tool Actions** (gear) to refine action name/description/enabled
     — ties S28 "descriptions are prompts for tools".
   - Agent has **Agent Instructions** (system_prompt), built-in chat MEMORY
     (on by default, S7 callback), **Current Date** toggle. Web Search =
     keyless (DuckDuckGo/News/RSS scrape) but rate-limit-prone → optional.

   Pure HTML (no onMount). Predict/troubleshoot via Toolkit.problem.
   Flow SVG. No "$" glyph, no KaTeX, literal × Unicode.
   ============================================================ */

window.SectionContent["agent-build"] = {
  title: "Build your first agent",

  html: `
    <div class="eyebrow">Agents · Section 29 · Lab</div>
    <h1>Build your first agent</h1>

    <p>Concepts in hand — now let's build one. We'll make an agent, hand it a single
    tool (a Calculator), and then do the fun part: watch it <em>decide</em> to use
    that tool, live, in the Playground. The think → act → observe loop stops being a
    diagram and starts being something you can see.</p>

    <h2>Part 1 — the bare agent</h2>
    <ol class="steps">
      <li><strong>New Flow → Blank Flow.</strong></li>
      <li>Drag on an <strong>Agent</strong> component. This one box holds the model,
      its instructions, memory, and a place to plug in tools.</li>
      <li>Set its <strong>Language Model</strong>: pick your provider (Gemini or
      Anthropic) and a model — the same key setup from Section 6. Both providers'
      models can call tools.</li>
      <li>Add <strong>Chat Input</strong> and <strong>Chat Output</strong>. Connect
      Chat Input → the Agent's <strong>Input</strong>, and the Agent's
      <strong>Response</strong> → Chat Output.</li>
      <li>Open the <strong>Playground</strong> and chat. It works — but right now it's
      just a chatbot with no tools. (Notice it already remembers earlier messages:
      agents have the memory we built by hand in Section 7 turned on by default.)</li>
    </ol>

    <h2>Part 2 — give it a tool</h2>
    <ol class="steps">
      <li>Drag on a <strong>Calculator</strong> component. On its own it just does
      arithmetic; we're going to hand it to the agent.</li>
      <li>Open the Calculator's <strong>header menu</strong> (the ⋯ menu on the
      component) and turn on <strong>Tool Mode</strong>. This exposes a
      <strong>Toolset</strong> output.</li>
      <li>Connect the Calculator's <strong>Toolset</strong> output to the Agent's
      <strong>Tools</strong> port.</li>
    </ol>
    <p>That's the whole move: a component becomes a tool the moment Tool Mode is on and
    its Toolset is wired into the Agent's Tools port.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 620 220" role="img"
           aria-label="Chat Input into an Agent into Chat Output, with a Calculator connected to the Agent's Tools port">
        <defs>
          <marker id="ab-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>
        <rect x="20" y="46" width="108" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="74" y="71" font-size="11" text-anchor="middle" fill="#2b3444">Chat Input</text>
        <line x1="128" y1="67" x2="228" y2="67" stroke="#8a94a6" stroke-width="2" marker-end="url(#ab-arrow)"></line>

        <rect x="228" y="40" width="140" height="54" rx="10" fill="#e9eefc" stroke="#9db0ea" stroke-width="2"></rect>
        <text x="298" y="63" font-size="12" text-anchor="middle" fill="#2b3444" font-weight="650">Agent</text>
        <text x="298" y="80" font-size="9" text-anchor="middle" fill="#5b6472">model + memory + tools</text>

        <line x1="368" y1="67" x2="468" y2="67" stroke="#8a94a6" stroke-width="2" marker-end="url(#ab-arrow)"></line>
        <rect x="468" y="46" width="120" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="528" y="71" font-size="11" text-anchor="middle" fill="#2b3444">Chat Output</text>

        <rect x="228" y="150" width="140" height="42" rx="8" fill="#fff" stroke="#8bb8ad"></rect>
        <text x="298" y="171" font-size="11" text-anchor="middle" fill="#2b3444">Calculator</text>
        <text x="298" y="184" font-size="9" text-anchor="middle" fill="#8a94a6">Tool Mode on</text>
        <line x1="298" y1="150" x2="298" y2="96" stroke="#8a94a6" stroke-width="2" marker-end="url(#ab-arrow)"></line>
        <text x="304" y="120" font-size="9" fill="#8a94a6">Toolset → Tools</text>
      </svg>
    </div>

    <h2>Part 3 — watch it decide</h2>
    <p>Back to the Playground. Try these in order:</p>
    <ol class="steps">
      <li>Ask: <em>"What tools do you have?"</em> — it should mention the Calculator.</li>
      <li>Ask a gnarly arithmetic question: <em>"What is 4318 × 27?"</em> Watch the
      Playground — it shows the agent <strong>calling the Calculator</strong>, the
      input it passed, the result it got back, and then the final answer. That's the
      loop, live.</li>
      <li>Ask something ordinary: <em>"Explain what a comet is."</em> No tool needed —
      it just answers.</li>
    </ol>
    <p>Same agent, three different paths, chosen on the spot. The Playground's display
    of each tool call is your window into the agent's decisions — keep it open.</p>

    ${Toolkit.callout(
      `The Playground showing the tool call, its input, and its raw result is the most
       useful debugging view you have. When an agent does something surprising, this is
       where you see <em>why</em> — which tool it reached for and what it passed.`,
      { type: "ai", label: "Your window in" }
    )}

    <h2>Part 4 — steer it</h2>
    <ul>
      <li><strong>Agent Instructions.</strong> Fill in the Agent's instructions field
      to set its personality and rules for every turn — e.g. "You are a concise
      teaching assistant. Always use the Calculator for arithmetic rather than doing it
      in your head." This is prompt engineering, aimed at the agent.</li>
      <li><strong>Current Date.</strong> The Agent has a built-in <strong>Current
      Date</strong> toggle — flip it on and it can answer "what's today's date?" with no
      extra components.</li>
      <li><strong>Edit Tool Actions.</strong> Click a tool's gear to rename its
      actions, sharpen their descriptions, or switch off ones you don't want. This is
      the Section 28 lesson made real: you tune the descriptions to steer the agent.</li>
      <li><strong>Optional — Web Search.</strong> Add a <strong>Web Search</strong>
      component (Tool Mode on) for live internet lookups. It needs no key, but it
      scrapes and can hit rate limits, so treat it as a bonus rather than a
      dependency.</li>
    </ul>

    <h2>Predict, then try</h2>

    ${Toolkit.problem(
      `You ask <em>"What is 4318 × 27?"</em> once with the Calculator attached and once
       with it removed. Will the answers differ?`,
      `Very likely yes. With the Calculator, the agent calls it and returns exactly
       <strong>116,586</strong>. With no calculator, the model has to do the
       multiplication "in its head" the way it writes any text — and models are
       notoriously shaky at big arithmetic, so it may be close but wrong. That gap is
       the whole point of tools: they give the agent abilities the model alone doesn't
       reliably have.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `You dragged a Calculator onto the canvas, but the agent keeps doing math itself
       and never calls it. What did you miss?`,
      `Almost certainly the connection. A component sitting on the canvas isn't a tool
       until you (1) turn on <strong>Tool Mode</strong> in its header menu and (2) wire
       its <strong>Toolset</strong> output into the Agent's <strong>Tools</strong>
       port. If both are done and it still ignores the tool, use <strong>Edit Tool
       Actions</strong> to clarify the description, or add an Agent Instruction telling
       it to prefer the Calculator for arithmetic.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.problem(
      `In the Agent's <strong>Language Model</strong> dropdown, your model isn't listed
       — or the list is empty. Why?`,
      `The Agent only lists language models you've configured in the <strong>Models</strong>
       pane. Make sure your provider's key is saved and that you've enabled a
       <em>language</em> model (an embeddings-only provider won't show up here). Same
       setup as Sections 6 and 23.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.problem(
      `Right after the multiplication, you type <em>"now double that."</em> Does the
       agent know what "that" is?`,
      `Yes — it remembers. The Agent's built-in memory keeps the conversation, so
       "that" refers to 116,586 and it answers 233,172. This is the memory loop you
       wired by hand in Section 7, now switched on for you.`,
      { label: "Predict" }
    )}

    ${Toolkit.callout(
      `<strong>Keep an eye on cost.</strong> A single question can trigger several model
       calls — think, call a tool, read the result, answer — so an agent uses more
       tokens per question than a plain chatbot. It's the flexibility tax from Sections
       16–18. Fine for class; worth watching in a real app.`,
      { label: "Cost note" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You built a working <strong>agent</strong>: Chat Input → Agent → Chat Output,
      with a real model.</li>
      <li>You turned a Calculator into a <strong>tool</strong> (Tool Mode → Toolset →
      Tools) and watched the agent decide when to use it.</li>
      <li>You saw the <strong>loop live</strong> in the Playground — the tool call, its
      input, and its result.</li>
      <li>You steered it with <strong>Agent Instructions</strong> and tuned a tool with
      <strong>Edit Tool Actions</strong>.</li>
      <li>You confirmed it <strong>remembers</strong> across turns, for free.</li>
    </ul>
  `,
};
