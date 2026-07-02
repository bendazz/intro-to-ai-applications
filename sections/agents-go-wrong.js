/* ============================================================
   Section: When agents go wrong
   Fifth AGENTS section — CONCEPT (no inline problems; ends "What you
   learned"). Honest counterweight to S27-30: agents fail in ways
   fixed pipelines can't (because the model decides), and they can get
   expensive. The mature lesson: an agent trades predictability +
   speed + cost for flexibility — use one only when you need it.

   Ties: cost S16-18 (loops = money pit), grounding S12 (trusts tool
   output), tool descriptions S28 (wrong-tool fix), evaluation S25
   (agents harder to test), fixed-pipeline value S27.

   Interactive "agent gone wrong" step-through (onMount, reuses S27
   .ag-* trace + new .ag-step.bad): 4 failure modes (wrong tool /
   runaway loop / trusts bad data / skips the tool), each reveals a
   bad trace + a Diagnosis and Fix when complete; a steps counter
   climbs (visible cost for the loop).

   No "$" glyph (money in words), no KaTeX, literal × Unicode.
   ============================================================ */

window.SectionContent["agents-go-wrong"] = {
  title: "When agents go wrong",

  html: `
    <div class="eyebrow">Agents · Section 31</div>
    <h1>When agents go wrong</h1>

    <p>You've seen agents at their best — deciding, using tools, routing to your
    knowledge base. Now the honest part. The very thing that makes an agent powerful —
    the model gets to decide — is also what makes it <strong>unreliable</strong>. A
    fixed pipeline does the same thing every time; an agent might do something
    different, or something wrong, and it can run up a bill doing it. Being a good
    builder means knowing how agents fail, and when <em>not</em> to use one.</p>

    <h2>Watch one go off the rails</h2>
    <p>Pick a failure mode and step through what the agent does. Each ends with a
    diagnosis and a fix.</p>

    ${Toolkit.widget(
      "Agent gone wrong",
      `<div class="controls" id="gw-modes">
         <button class="btn" data-i="0">Wrong tool</button>
         <button class="btn ghost" data-i="1">Runaway loop</button>
         <button class="btn ghost" data-i="2">Trusts bad data</button>
         <button class="btn ghost" data-i="3">Skips the tool</button>
       </div>
       <div class="ag-req" id="gw-req"></div>
       <div class="ag-trace" id="gw-trace"></div>
       <div class="readout" style="margin-top:8px">
         <div class="stat"><span class="label">Steps taken (≈ model calls)</span><span class="value" id="gw-count">0</span></div>
       </div>
       <div class="controls" style="margin-top:8px">
         <button class="btn" id="gw-step">Step ▶</button>
         <button class="btn ghost" id="gw-reset">Reset</button>
       </div>
       <p id="gw-diag" style="margin:10px 2px 2px; font-size:.94em"></p>`
    )}

    <h2>The ways they fail</h2>
    <p>Group the trouble into four kinds:</p>
    <ul>
      <li><strong>Bad decisions.</strong> It picks the wrong tool (searches the web for
      something in your handbook), passes a garbled input, or skips a tool it should
      have used and winks the answer instead. Most of these trace back to fuzzy tool
      descriptions or instructions — Section 28's lesson, biting back.</li>
      <li><strong>Loops.</strong> When a tool doesn't return what it hoped, an agent can
      keep trying — the same search, slightly reworded, again and again — without ever
      deciding to stop. This is the most expensive failure of all.</li>
      <li><strong>Trusting bad output.</strong> An agent believes whatever its tools
      return. If a tool hands back stale, wrong, or irrelevant data, the agent builds a
      confident answer on top of it — grounding (Section 12) cuts both ways.</li>
      <li><strong>Unpredictability.</strong> Ask the same question twice and the agent
      may take two different paths. That flexibility is the point, but it makes agents
      genuinely harder to test than a fixed flow.</li>
    </ul>

    <h2>The cost trap</h2>
    <p>This one deserves its own warning. Every step an agent takes — think, call a
    tool, read the result, decide again — is <strong>another model call</strong>. A
    question that a fixed flow answers in one call might take an agent five. And a
    loop that doesn't stop can fire off call after call, quietly. In the sense of
    Sections 16–18, an agent is the highest-variance thing you can build: usually fine,
    occasionally a runaway.</p>

    ${Toolkit.callout(
      `Cap the steps. Most agent setups let you limit how many times the loop can run —
       use it. A hard ceiling turns "silently burns forty model calls" into "stops after
       six and tells you it's stuck," which is a much better failure.`,
      { type: "warn", label: "Put a ceiling on it" }
    )}

    <h2>Harder to test — and higher stakes when it acts</h2>
    <p>Because an agent's path changes run to run, you can't check it once and trust it
    forever. You evaluate it the way you learned in Section 25 — many inputs — but you
    also watch <em>how</em> it got there: which tools it called, with what inputs. The
    Playground trace from Section 29 is your main instrument.</p>

    <p>And a sharper point: our agents so far only <em>answer</em>. But agents can be
    given tools that <strong>act</strong> — send an email, change a file, place an
    order. Now a wrong decision has real consequences, not just a wrong sentence. Two
    cautions come with that:</p>
    <ul>
      <li><strong>Keep a human in the loop</strong> for anything consequential — have
      the agent propose the action and a person approve it.</li>
      <li><strong>Distrust untrusted input.</strong> A web page or document the agent
      reads could contain text that tries to hijack it ("ignore your instructions
      and…"). An agent that acts on the open internet needs real guardrails.</li>
    </ul>

    <h2>The real skill: knowing when NOT to use an agent</h2>
    <p>Here's the judgment that separates a thoughtful builder from someone chasing the
    shiny thing. An agent trades <strong>predictability, speed, and low cost</strong>
    for <strong>flexibility</strong>. That trade is worth it when a task genuinely
    varies — different questions needing different tools. It is a bad trade when the
    task is always the same shape.</p>

    ${Toolkit.callout(
      `If your app always does the same steps — like "take a document question, retrieve,
       answer" — a <strong>fixed pipeline</strong> (your RAG flow) is cheaper, faster,
       and more reliable than an agent. Reach for an agent when you truly need it to
       <em>decide</em>; don't reach for one by default.`,
      { type: "ai", label: "The mature choice" }
    )}

    <h2>Keeping an agent on the rails</h2>
    <p>When you do use one, these habits prevent most of the trouble above:</p>
    <ul class="checklist">
      <li><input type="checkbox" id="gw-c1" /><label for="gw-c1">Give it <strong>few,
        clearly-distinct tools</strong> with sharp descriptions.</label></li>
      <li><input type="checkbox" id="gw-c2" /><label for="gw-c2">Write <strong>Agent
        Instructions</strong> that say when to use each tool.</label></li>
      <li><input type="checkbox" id="gw-c3" /><label for="gw-c3"><strong>Cap the
        steps</strong> so a loop can't run away.</label></li>
      <li><input type="checkbox" id="gw-c4" /><label for="gw-c4">Watch the
        <strong>Playground trace</strong> — check which tools it called.</label></li>
      <li><input type="checkbox" id="gw-c5" /><label for="gw-c5"><strong>Test across
        many inputs</strong>, and require human approval for risky actions.</label></li>
    </ul>

    <h2>What you learned</h2>
    <ul>
      <li>Agents fail in ways fixed flows don't: <strong>wrong tool, loops, trusting
      bad data, and unpredictability</strong> — all because the model is deciding.</li>
      <li>The biggest practical risk is <strong>cost</strong>: every step is a model
      call, and loops can run away — so <strong>cap the steps</strong>.</li>
      <li>Agents are <strong>harder to test</strong> (the path changes), so watch the
      trace and test across many inputs.</li>
      <li>An agent that can <strong>act</strong> raises the stakes — keep a human in the
      loop and distrust untrusted input.</li>
      <li>The real skill is <strong>choosing</strong>: use an agent only when you need
      its flexibility; otherwise a fixed pipeline is cheaper and more reliable.</li>
    </ul>
  `,

  onMount(root) {
    const MODES = [
      {
        req: "“What's our refund policy?”",
        steps: [
          { type: "think", tag: "Think", text: "I'll look this up on the web." },
          { type: "act", tag: "Act · Web Search", text: "refund policy", bad: true },
          { type: "observe", tag: "Observe", text: "A random online store's page: “Refunds within 30 days.”" },
          { type: "answer", tag: "Answer", text: "You can get a refund within 30 days.", bad: true },
        ],
        diag: "It chose Web Search for a question about YOUR handbook, so it answered from a stranger's website instead of your documents.",
        fix: "Sharpen the knowledge base tool's description (\"our company handbook\") and narrow or remove Web Search — descriptions steer tool choice (Section 28).",
      },
      {
        req: "“Summarize the 2023 budget.” (not in the documents)",
        steps: [
          { type: "think", tag: "Think", text: "I'll search the knowledge base." },
          { type: "act", tag: "Act · Knowledge base", text: "2023 budget" },
          { type: "observe", tag: "Observe", text: "No relevant results." },
          { type: "think", tag: "Think", text: "Let me try different words." },
          { type: "act", tag: "Act · Knowledge base", text: "annual budget 2023", bad: true },
          { type: "observe", tag: "Observe", text: "No relevant results." },
          { type: "think", tag: "Think", text: "Maybe once more…" },
          { type: "act", tag: "Act · Knowledge base", text: "budget report", bad: true },
          { type: "observe", tag: "Observe", text: "No relevant results." },
          { type: "answer", tag: "Stopped", text: "Halted after the step limit — no answer.", bad: true },
        ],
        diag: "The answer simply isn't in the documents, but instead of giving up the agent kept retrying — and every step was another model call.",
        fix: "Cap the number of steps, and make sure the instructions let it say \"I couldn't find that\" and stop. Loops are the classic agent money pit (Sections 16–18).",
      },
      {
        req: "“What does a widget cost?”",
        steps: [
          { type: "think", tag: "Think", text: "I'll check the knowledge base." },
          { type: "act", tag: "Act · Knowledge base", text: "widget price" },
          { type: "observe", tag: "Observe", text: "Retrieved an OUTDATED chunk from 2019: “Widgets cost five dollars.”", bad: true },
          { type: "answer", tag: "Answer", text: "A widget costs five dollars.", bad: true },
        ],
        diag: "The tool handed back stale data (a 2019 price), and the agent trusted it completely — garbage in, confident answer out.",
        fix: "An agent believes its tools, so the reasoning can't rescue bad inputs. Keep the tool's data fresh and correct (grounding, Section 12).",
      },
      {
        req: "“What is 4,318 × 27?” (a Calculator is attached)",
        steps: [
          { type: "think", tag: "Think", text: "I can just work this out myself.", bad: true },
          { type: "answer", tag: "Answer", text: "About 116,000.", bad: true },
        ],
        diag: "It had a Calculator available but skipped it and did shaky mental math — the real answer is 116,586, so it's off by hundreds.",
        fix: "Add an Agent Instruction to always use the Calculator for arithmetic, or make the tool's description more compelling. Even with tools, agents sometimes wing it.",
      },
    ];

    const modeBtns = Array.from(root.querySelectorAll("#gw-modes button"));
    const reqEl = root.querySelector("#gw-req");
    const traceEl = root.querySelector("#gw-trace");
    const countEl = root.querySelector("#gw-count");
    const stepBtn = root.querySelector("#gw-step");
    const resetBtn = root.querySelector("#gw-reset");
    const diagEl = root.querySelector("#gw-diag");
    let cur = 0, shown = 0;

    function render() {
      const m = MODES[cur];
      reqEl.textContent = "Request: " + m.req;
      traceEl.textContent = "";
      for (let i = 0; i < shown; i++) {
        const s = m.steps[i];
        const div = document.createElement("div");
        div.className = "ag-step ag-" + s.type + (s.bad ? " bad" : "");
        const tag = document.createElement("span");
        tag.className = "ag-tag";
        tag.textContent = s.tag;
        div.appendChild(tag);
        div.appendChild(document.createTextNode(s.text));
        traceEl.appendChild(div);
      }
      countEl.textContent = String(shown);
      const done = shown >= m.steps.length;
      stepBtn.disabled = done;
      stepBtn.classList.toggle("ghost", done);
      diagEl.innerHTML = done
        ? "<strong style=\"color:var(--rose)\">What went wrong:</strong> " + m.diag +
          "<br><strong style=\"color:var(--teal)\">Fix:</strong> " + m.fix
        : "";
    }

    function pick(i) {
      cur = i;
      shown = 0;
      modeBtns.forEach((b, j) => b.classList.toggle("ghost", j !== i));
      render();
    }

    modeBtns.forEach((b) => b.addEventListener("click", () => pick(parseInt(b.dataset.i, 10))));
    stepBtn.addEventListener("click", () => {
      if (shown < MODES[cur].steps.length) { shown++; render(); }
    });
    resetBtn.addEventListener("click", () => { shown = 0; render(); });
    pick(0);
  },
};
