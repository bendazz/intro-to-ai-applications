/* ============================================================
   Section: Tools — how an agent chooses what to do
   Second AGENTS section — CONCEPT (no inline problems; ends "What you
   learned"). Deepens the tool idea from S27: what a tool really is
   (name + DESCRIPTION + inputs + result), and HOW the agent chooses
   (reads the descriptions → picks WHICH tool + figures WHAT input).
   Big design lesson: tool descriptions are prompts for your tools
   (callback S8); curate the toolset; the agent trusts the result
   (grounding callback). Anything can be a tool, incl. your RAG app.

   VERIFIED: consistent with agents.mdx/_partial-agents-work.mdx
   ("Tool object's description tells the agent what the tool can do so
   it can decide"; any component via Tool Mode). See [[langflow-verified-facts]].

   Interactive "tool picker" (onMount): a toolbox of 3 tools with
   Clear vs Vague descriptions (toggle); pick a request → highlights
   which tool the agent picks + the input it passes + why. Vague
   descriptions cause a visible misroute (the honest lesson).

   New CSS: .tool-card/.tool-name/.tool-desc (styles.css). No "$"
   glyph, no KaTeX, literal Unicode (✓ ✗ ×).
   ============================================================ */

window.SectionContent["agent-tools"] = {
  title: "Tools: how an agent decides",

  html: `
    <div class="eyebrow">Agents · Section 28</div>
    <h1>Tools: how an agent decides what to do</h1>

    <p>We said an agent picks tools to get its job done. That word "picks" is doing a
    lot of work — so let's open it up. What <em>is</em> a tool, exactly, and how does
    the agent actually choose one?</p>

    <h2>What a tool really is</h2>
    <p>A tool has four simple parts:</p>
    <ul>
      <li>a <strong>name</strong> — like "Calculator";</li>
      <li>a <strong>description</strong> — plain language saying what it does and when
      to use it;</li>
      <li>the <strong>input</strong> it needs — the calculator needs a math expression,
      a search tool needs a query;</li>
      <li>the <strong>result</strong> it hands back.</li>
    </ul>
    <p>That's it. A tool is just a labeled capability with instructions for use. In
    Langflow, you turn almost any component into one by flipping on <strong>Tool
    Mode</strong> — which is how, later, your whole RAG flow becomes a single tool the
    agent can reach for.</p>

    <h2>Two decisions on every step</h2>
    <p>When the agent thinks, it's really making two choices:</p>
    <ol class="steps">
      <li><strong>Which tool?</strong> It reads the description of each available tool
      and matches it against the request.</li>
      <li><strong>What input?</strong> Having chosen a tool, it pulls the right input
      out of the request — turning "what's 15% of 80?" into the expression
      <em>80 × 0.15</em> for the calculator.</li>
    </ol>
    <p>Both choices lean entirely on the tool's <strong>description</strong>. The agent
    has never "seen" your calculator — it only knows the sentence you wrote about it.</p>

    <h2>See it choose</h2>
    <p>Below is a toolbox with three tools. Pick a request and watch which tool the
    agent reaches for and what input it passes. Then flip the descriptions from
    <strong>clear</strong> to <strong>vague</strong> and try again — the same agent,
    the same requests, but now it starts to stumble.</p>

    ${Toolkit.widget(
      "Tool picker",
      `<div class="controls" id="tp-mode">
         <button class="btn" id="tp-clear">Clear descriptions</button>
         <button class="btn ghost" id="tp-vague">Vague descriptions</button>
       </div>
       <div id="tp-tools" style="margin:10px 0"></div>
       <div class="controls" id="tp-reqs">
         <button class="btn" data-i="0">Our refund policy?</button>
         <button class="btn ghost" data-i="1">15% of 80?</button>
         <button class="btn ghost" data-i="2">Latest AI news?</button>
         <button class="btn ghost" data-i="3">Say thanks</button>
       </div>
       <div class="readout" style="margin-top:10px">
         <div class="stat"><span class="label">Agent picks</span><span class="value" id="tp-pick">–</span></div>
         <div class="stat"><span class="label">Input it passes</span><span class="value" id="tp-input">–</span></div>
       </div>
       <p id="tp-why" style="color:var(--ink-soft); margin:8px 2px 2px; font-size:.94em"></p>`
    )}

    <h2>The description is the whole game</h2>
    <p>Notice what broke. With vague descriptions, a question about your refund policy
    became a coin toss — "handles documents" and "looks things up" both sounded like
    they might fit, so the agent couldn't tell them apart. Nothing about the model
    changed; only the sentences you wrote about the tools.</p>

    ${Toolkit.callout(
      `<strong>Tool descriptions are prompts for your tools.</strong> The same care you
       learned in prompt engineering (Section 8) applies here: say clearly what the
       tool is for and when to use it. A crisp description — "looks up facts in <em>our
       company handbook</em>" — routes requests correctly; a fuzzy one — "handles
       documents" — leaves the agent guessing.`,
      { type: "ai", label: "The key skill" }
    )}

    <h2>Give it the right tools — not every tool</h2>
    <p>It's tempting to hand an agent everything. Resist it. The toolset is something
    you <strong>curate</strong>:</p>
    <ul>
      <li><strong>Too few tools</strong> and the agent simply can't do the job — it has
      no way to look anything up.</li>
      <li><strong>Too many, or overlapping ones</strong> and it gets confused about
      which to use — two tools that sound alike are exactly where it picks wrong.</li>
    </ul>
    <p>The goal is a small set of clearly-distinct tools, each with a description that
    makes its lane obvious.</p>

    <h2>One more honest point: it trusts the result</h2>
    <p>When a tool returns something, the agent generally <strong>believes it</strong>
    and builds its answer on top. That's the grounding idea again (Section 12): a tool
    that returns bad or empty data leads to a bad answer, no matter how well the agent
    reasoned. Good agents need good tools <em>and</em> good descriptions — the choosing
    and the doing both have to work.</p>

    <h2>What you learned</h2>
    <ul>
      <li>A <strong>tool</strong> = a name, a plain-language <strong>description</strong>,
      the <strong>input</strong> it needs, and the <strong>result</strong> it returns.</li>
      <li>On each step the agent makes two choices from the descriptions:
      <strong>which tool</strong>, and <strong>what input</strong> to give it.</li>
      <li><strong>Descriptions are prompts for your tools</strong> — clear ones route
      correctly, vague ones cause misuse.</li>
      <li><strong>Curate</strong> the toolset: enough to do the job, not so many
      (or so similar) that the agent gets confused.</li>
      <li>The agent <strong>trusts</strong> what a tool returns, so a bad tool means a
      bad answer even when the reasoning was fine.</li>
    </ul>
  `,

  onMount(root) {
    const tools = [
      {
        id: "kb", name: "Knowledge Base",
        clear: "Looks up facts in OUR company handbook and policies. Input: a question.",
        vague: "Handles documents. Input: text.",
      },
      {
        id: "calc", name: "Calculator",
        clear: "Does arithmetic and evaluates math expressions. Input: a math expression.",
        vague: "Works with numbers. Input: text.",
      },
      {
        id: "search", name: "Web Search",
        clear: "Finds current information from the internet — news, prices, live facts. Input: a search query.",
        vague: "Looks things up. Input: text.",
      },
    ];
    const requests = [
      {
        clearPick: "kb", input: "refund policy",
        whyClear: "\"Our refund policy\" matches the Knowledge Base's lane: facts in our handbook.",
        vaguePick: "unsure",
        whyVague: "With vague descriptions, \"handles documents\" and \"looks things up\" both seem to fit — the agent can't tell which, so it may guess wrong or give up.",
      },
      {
        clearPick: "calc", input: "80 × 0.15",
        whyClear: "A math expression — clearly the Calculator.",
        vaguePick: "calc",
        whyVague: "Numbers are an obvious cue, so even \"works with numbers\" catches this one.",
      },
      {
        clearPick: "search", input: "latest AI news",
        whyClear: "\"Latest news\" needs current info from the internet — Web Search.",
        vaguePick: "search",
        whyVague: "\"Looks things up\" loosely points here, but it's shakier than a clear description would be.",
      },
      {
        clearPick: null, input: "— none —",
        whyClear: "A greeting needs no tool; the agent just replies.",
        vaguePick: null,
        whyVague: "Still no tool needed — a thank-you is a thank-you.",
      },
    ];

    const modeClearBtn = root.querySelector("#tp-clear");
    const modeVagueBtn = root.querySelector("#tp-vague");
    const toolsEl = root.querySelector("#tp-tools");
    const reqBtns = Array.from(root.querySelectorAll("#tp-reqs button"));
    const pickEl = root.querySelector("#tp-pick");
    const inputEl = root.querySelector("#tp-input");
    const whyEl = root.querySelector("#tp-why");
    let mode = "clear", curReq = 0;

    function nameOf(id) {
      const t = tools.find((x) => x.id === id);
      return t ? t.name : null;
    }

    function render() {
      const r = requests[curReq];
      const pickId = mode === "clear" ? r.clearPick : r.vaguePick;

      // toolbox cards
      toolsEl.textContent = "";
      tools.forEach((t) => {
        const card = document.createElement("div");
        card.className = "tool-card" + (pickId === t.id ? " pick" : "");
        const nm = document.createElement("div");
        nm.className = "tool-name";
        nm.textContent = t.name + (pickId === t.id ? "  ✓" : "");
        const ds = document.createElement("div");
        ds.className = "tool-desc";
        ds.textContent = mode === "clear" ? t.clear : t.vague;
        card.appendChild(nm);
        card.appendChild(ds);
        toolsEl.appendChild(card);
      });

      // readout
      if (pickId === "unsure") {
        pickEl.textContent = "not sure ✗";
        inputEl.textContent = "—";
      } else if (pickId === null) {
        pickEl.textContent = "no tool";
        inputEl.textContent = r.input;
      } else {
        pickEl.textContent = nameOf(pickId);
        inputEl.textContent = r.input;
      }
      whyEl.textContent = mode === "clear" ? r.whyClear : r.whyVague;
    }

    function setMode(m) {
      mode = m;
      modeClearBtn.classList.toggle("ghost", m !== "clear");
      modeVagueBtn.classList.toggle("ghost", m !== "vague");
      render();
    }
    function pickReq(i) {
      curReq = i;
      reqBtns.forEach((b, j) => b.classList.toggle("ghost", j !== i));
      render();
    }

    modeClearBtn.addEventListener("click", () => setMode("clear"));
    modeVagueBtn.addEventListener("click", () => setMode("vague"));
    reqBtns.forEach((b) => b.addEventListener("click", () => pickReq(parseInt(b.dataset.i, 10))));
    setMode("clear");
    pickReq(0);
  },
};
