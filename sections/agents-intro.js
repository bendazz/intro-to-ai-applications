/* ============================================================
   Section: What is an agent?
   First AGENTS section — CONCEPT (no inline problems; ends "What you
   learned"). Motivated by the limit of everything so far: our flows
   are FIXED PIPELINES (the builder wired the steps; same path every
   time). An agent puts the MODEL in charge of the steps — give it
   tools + a goal, and it decides which tools to use, in a
   think -> act -> observe loop, until done.

   VERIFIED against langflow repo (agents.mdx, _partial-agents-work.mdx,
   repo 2026-06-29): LLM = reasoning engine that decides which actions/
   tools to take; tools = functions wrapped with a DESCRIPTION the agent
   reads to decide; Agent component holds LLM + instructions + built-in
   chat memory + Tools port; any component becomes a tool via Tool Mode
   (Toolset -> Tools). RAG/knowledge base can be a tool. (Lab details
   deferred to the build section.)

   Interactive agent-loop visualizer (onMount): pick a request, step
   through the think/act/observe/answer trace; different requests use
   different tools (incl. NONE, and a multi-step chain). Plus a
   fixed-pipeline-vs-agent SVG contrast.

   New CSS: .ag-* (styles.css). No "$" glyph (money in words), no
   KaTeX, literal Unicode arrows.
   ============================================================ */

window.SectionContent["agents-intro"] = {
  title: "What is an agent?",

  html: `
    <div class="eyebrow">Agents · Section 27</div>
    <h1>What is an agent?</h1>

    <p>Look back at every flow you've built. You decided the steps, you wired them in
    order, and the flow runs that same path every single time. RAG always retrieves
    and then answers — even if you just say "hi." A calculator flow always calculates.
    You, the builder, are the one who chose what happens; the model only fills in the
    blank you positioned for it. That's a <strong>fixed pipeline</strong>, and it has
    a ceiling: <strong>real requests don't all have the same shape.</strong></p>

    <p>Some questions need a lookup. Some need arithmetic. Some need several steps in a
    row. Some need no tools at all. A fixed pipeline can't know in advance which of
    those a given question calls for — because <em>you</em> had to decide that when you
    wired it, before any question arrived.</p>

    <h2>The shift: let the model decide the steps</h2>
    <p>An <strong>agent</strong> flips who's in charge of the steps. Instead of wiring
    a fixed path, you hand the model a set of <strong>tools</strong> and a goal, and
    the <strong>model itself decides</strong> which tools to use, in what order, and
    when it's done. The model stops being a blank-filler and becomes the
    decision-maker — a reasoning engine driving the flow.</p>

    <h2>The loop it runs</h2>
    <p>An agent works in a loop, over and over until it can answer:</p>
    <ol class="steps">
      <li><strong>Think</strong> — look at the request and the story so far, and decide
      the next move. Do I need a tool? Which one?</li>
      <li><strong>Act</strong> — run the chosen tool (search the web, do the math, look
      in the documents…).</li>
      <li><strong>Observe</strong> — read what the tool returned.</li>
      <li><strong>Repeat</strong> — with that new information, think again — until it
      has enough to give a final <strong>answer</strong>.</li>
    </ol>

    <p>Try it. Pick a request and step through what the agent decides. Notice that
    different requests take different paths — and one needs no tool at all.</p>

    ${Toolkit.widget(
      "Watch an agent think",
      `<div class="controls" id="ag-reqs">
         <button class="btn" data-i="0">Say hi</button>
         <button class="btn ghost" data-i="1">18% of 47 dollars?</button>
         <button class="btn ghost" data-i="2">Handbook on late work?</button>
         <button class="btn ghost" data-i="3">Date + anything due?</button>
       </div>
       <div class="ag-req" id="ag-req"></div>
       <div class="ag-trace" id="ag-trace"></div>
       <div class="controls" style="margin-top:10px">
         <button class="btn" id="ag-step">Step ▶</button>
         <button class="btn ghost" id="ag-reset">Reset</button>
       </div>
       <p id="ag-cap" style="color:var(--ink-soft); margin:8px 2px 2px; font-size:.94em"></p>`
    )}

    <h2>What exactly is a "tool"?</h2>
    <p>A tool is simply a <strong>capability the agent can call</strong> — a web
    search, a calculator, today's date, or <strong>your RAG knowledge base</strong>.
    Each tool comes with a short <strong>description</strong> written in plain
    language: "searches the web for current information," "looks up facts in the
    company handbook." The agent doesn't magically know what a tool does — it
    <em>reads that description</em> and decides whether the tool fits the request.</p>

    ${Toolkit.callout(
      `It's words all the way down. The agent picks tools by reading their
       descriptions, and it reasons in the same next-word way every model does. An
       agent isn't a new kind of AI — it's the same model you already know, wrapped in
       a loop and handed some tools.`,
      { type: "ai", label: "Still the same model" }
    )}

    <h2>Fixed pipeline vs. agent</h2>
    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 720 300" role="img"
           aria-label="Left: a fixed pipeline is a straight line of steps. Right: an agent is a model at the center that chooses among tools in a loop.">
        <defs>
          <marker id="ag-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>

        <text x="20" y="26" font-size="13" font-weight="700" fill="#5b6472">FIXED PIPELINE</text>
        <text x="20" y="44" font-size="10" fill="#8a94a6">you wired the steps — same path every time</text>
        <rect x="20" y="70" width="70" height="38" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="55" y="93" font-size="10" text-anchor="middle" fill="#2b3444">Input</text>
        <line x1="90" y1="89" x2="118" y2="89" stroke="#8a94a6" stroke-width="2" marker-end="url(#ag-arrow)"></line>
        <rect x="118" y="70" width="70" height="38" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="153" y="93" font-size="10" text-anchor="middle" fill="#2b3444">Step</text>
        <line x1="188" y1="89" x2="216" y2="89" stroke="#8a94a6" stroke-width="2" marker-end="url(#ag-arrow)"></line>
        <rect x="216" y="70" width="70" height="38" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="251" y="93" font-size="10" text-anchor="middle" fill="#2b3444">Step</text>
        <line x1="180" y1="150" x2="180" y2="150"></line>
        <line x1="251" y1="108" x2="251" y2="150" stroke="#8a94a6" stroke-width="2" marker-end="url(#ag-arrow)"></line>
        <rect x="216" y="150" width="70" height="38" rx="7" fill="#e6f0ee" stroke="#8bb8ad"></rect>
        <text x="251" y="173" font-size="10" text-anchor="middle" fill="#2b3444">Answer</text>

        <line x1="345" y1="20" x2="345" y2="280" stroke="#e6e8ef" stroke-width="2"></line>

        <text x="380" y="26" font-size="13" font-weight="700" fill="#5b6472">AGENT</text>
        <text x="380" y="44" font-size="10" fill="#8a94a6">the model decides which tools to use, looping</text>

        <rect x="470" y="120" width="120" height="52" rx="10" fill="#e9eefc" stroke="#9db0ea" stroke-width="2"></rect>
        <text x="530" y="143" font-size="12" text-anchor="middle" fill="#2b3444" font-weight="650">Model</text>
        <text x="530" y="159" font-size="9" text-anchor="middle" fill="#5b6472">decides &amp; loops</text>

        <rect x="380" y="70" width="94" height="34" rx="7" fill="#fff" stroke="#8bb8ad"></rect>
        <text x="427" y="91" font-size="10" text-anchor="middle" fill="#2b3444">Web Search</text>
        <rect x="380" y="200" width="94" height="34" rx="7" fill="#fff" stroke="#8bb8ad"></rect>
        <text x="427" y="221" font-size="10" text-anchor="middle" fill="#2b3444">Calculator</text>
        <rect x="600" y="200" width="104" height="34" rx="7" fill="#fff" stroke="#8bb8ad"></rect>
        <text x="652" y="221" font-size="10" text-anchor="middle" fill="#2b3444">Knowledge base</text>

        <line x1="474" y1="96" x2="500" y2="120" stroke="#8a94a6" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
        <line x1="500" y1="150" x2="474" y2="210" stroke="#8a94a6" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
        <line x1="600" y1="212" x2="560" y2="168" stroke="#8a94a6" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
        <text x="452" y="120" font-size="8" fill="#8a94a6">use / result</text>

        <line x1="360" y1="150" x2="466" y2="146" stroke="#8a94a6" stroke-width="2" marker-end="url(#ag-arrow)"></line>
        <text x="372" y="140" font-size="9" fill="#8a94a6">ask</text>
        <line x1="530" y1="172" x2="530" y2="262" stroke="#8a94a6" stroke-width="2" marker-end="url(#ag-arrow)"></line>
        <text x="536" y="255" font-size="9" fill="#8a94a6">answer</text>
      </svg>
    </div>

    <p>The fixed pipeline is a machine with buttons in a set order. The agent is more
    like an assistant who reads the request, figures out which of its tools to reach
    for, uses them, and comes back with an answer — and might use none, one, or
    several.</p>

    <h2>Why this is a big deal</h2>
    <ul>
      <li><strong>One app, many shapes of request.</strong> The same agent can answer
      a factual lookup, do a calculation, or search your documents — because it picks
      the right tool per question.</li>
      <li><strong>It can chain steps.</strong> "What's today's date, and is anything
      due this week?" — check the date, <em>then</em> search the documents, then
      answer. The loop makes multi-step tasks possible.</li>
      <li><strong>It can decide to do nothing.</strong> "Say hi" needs no tool, and a
      good agent just replies.</li>
    </ul>

    ${Toolkit.callout(
      `The freedom has a cost. Because the model is making decisions, an agent is
       <strong>less predictable</strong> than a fixed flow — it can pick the wrong
       tool, go in circles, or make many model calls (which adds up, in the sense of
       Sections 16–18). Real power, real responsibility; we'll look hard at that.`,
      { type: "warn", label: "The trade-off" }
    )}

    <p>One happy note: remember building the chatbot's memory by hand in Section 7?
    Agents come with memory <strong>built in</strong> — the loop keeps track of the
    conversation for you.</p>

    <h2>What you learned</h2>
    <ul>
      <li>Every flow so far was a <strong>fixed pipeline</strong>: you chose the steps,
      and they run the same way every time.</li>
      <li>An <strong>agent</strong> hands the model a goal and a set of
      <strong>tools</strong>, and lets the <em>model</em> decide which tools to use and
      when.</li>
      <li>It runs a <strong>think → act → observe</strong> loop until it can answer —
      using none, one, or several tools.</li>
      <li>A <strong>tool</strong> is a capability with a plain-language
      <strong>description</strong> the agent reads to decide whether it fits — and your
      RAG knowledge base can be one.</li>
      <li>It's the same model underneath, wrapped in a loop — powerful, but less
      predictable than a fixed flow.</li>
    </ul>
  `,

  onMount(root) {
    const TRACES = [
      {
        req: "“Say hi.”",
        cap: "No tool needed — a good agent recognizes that and just answers.",
        steps: [
          { type: "think", tag: "Think", text: "This is a simple greeting. I don't need any tool for this." },
          { type: "answer", tag: "Answer", text: "Hi there! How can I help you today?" },
        ],
      },
      {
        req: "“What's 18% of 47 dollars?”",
        cap: "One tool: the agent recognizes arithmetic and reaches for the Calculator.",
        steps: [
          { type: "think", tag: "Think", text: "This is a math question. I'll use the Calculator tool." },
          { type: "act", tag: "Act · Calculator", text: "compute 47 × 0.18" },
          { type: "observe", tag: "Observe", text: "8.46" },
          { type: "answer", tag: "Answer", text: "18% of 47 dollars is 8.46 dollars." },
        ],
      },
      {
        req: "“What does the handbook say about late work?”",
        cap: "Here the agent chooses your RAG knowledge base as its tool — retrieval, on demand.",
        steps: [
          { type: "think", tag: "Think", text: "This asks about our handbook. I'll search the knowledge base." },
          { type: "act", tag: "Act · Knowledge base", text: "search: late work policy" },
          { type: "observe", tag: "Observe", text: "Retrieved chunk: “Late work loses 10% per day, up to three days…”" },
          { type: "answer", tag: "Answer", text: "The handbook says late work loses 10% per day, for up to three days." },
        ],
      },
      {
        req: "“What's today's date, and is anything due this week?”",
        cap: "Two tools, in a loop: get the date, then search — the agent chains steps.",
        steps: [
          { type: "think", tag: "Think", text: "I need today's date first, then I can check what's due." },
          { type: "act", tag: "Act · Current Date", text: "get today's date" },
          { type: "observe", tag: "Observe", text: "Monday, July 6" },
          { type: "think", tag: "Think", text: "Now search the documents for due dates this week." },
          { type: "act", tag: "Act · Knowledge base", text: "search: due dates week of July 6" },
          { type: "observe", tag: "Observe", text: "Retrieved chunk: “Project outline due Friday, July 10.”" },
          { type: "answer", tag: "Answer", text: "Today is Monday, July 6. Your project outline is due Friday, July 10." },
        ],
      },
    ];

    const reqBtns = Array.from(root.querySelectorAll("#ag-reqs button"));
    const reqEl = root.querySelector("#ag-req");
    const traceEl = root.querySelector("#ag-trace");
    const stepBtn = root.querySelector("#ag-step");
    const resetBtn = root.querySelector("#ag-reset");
    const capEl = root.querySelector("#ag-cap");
    let cur = 0, shown = 0;

    function render() {
      const t = TRACES[cur];
      reqEl.textContent = "Request: " + t.req;
      traceEl.textContent = "";
      for (let i = 0; i < shown; i++) {
        const s = t.steps[i];
        const div = document.createElement("div");
        div.className = "ag-step ag-" + s.type;
        const tag = document.createElement("span");
        tag.className = "ag-tag";
        tag.textContent = s.tag;
        div.appendChild(tag);
        div.appendChild(document.createTextNode(s.text));
        traceEl.appendChild(div);
      }
      const done = shown >= t.steps.length;
      stepBtn.disabled = done;
      stepBtn.classList.toggle("ghost", done);
      capEl.textContent = done ? t.cap : "";
    }

    function pick(i) {
      cur = i;
      shown = 0;
      reqBtns.forEach((b, j) => b.classList.toggle("ghost", j !== i));
      render();
    }

    reqBtns.forEach((b) => b.addEventListener("click", () => pick(parseInt(b.dataset.i, 10))));
    stepBtn.addEventListener("click", () => {
      if (shown < TRACES[cur].steps.length) { shown++; render(); }
    });
    resetBtn.addEventListener("click", () => { shown = 0; render(); });
    pick(0);
  },
};
