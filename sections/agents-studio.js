/* ============================================================
   Section: Studio project 5 — build & interrogate an agent
   Fifth group studio (see [[studios-are-recurring]]); capstone of the
   Agents block AND a synthesis of the whole course. Signature (vs all
   prior studios): teams test the agent's DECISIONS, not just outputs —
   which tool it picked, whether it looped, what it cost, and (the S31
   mature question) whether an agent was even the right choice.

   Synthesizes: tools + descriptions (S28), building agents (S29),
   RAG-as-a-tool (S30), reliability/cost/when-not-to (S31), plus
   prompting, documents, RAG, testing/eval (S25), cost (S16-18).

   Follows the locked-in studio pattern: scenario switcher (onMount,
   A/B/C), decision-focused test buckets, .dist-table rubric, group
   red-team (3 fronts), curveball, deliverables checklist, closing
   "this is the job" callout. NEW signature deliverable: the
   agent-vs-fixed-pipeline reckoning.

   Pure HTML + scenario-switcher onMount. No "$" glyph (cost in words),
   no KaTeX, no new CSS.
   ============================================================ */

window.SectionContent["agents-studio"] = {
  title: "Studio: build & test an agent",

  html: `
    <div class="eyebrow">Agents · Section 32 · Studio</div>
    <h1>Studio project: build and interrogate an agent</h1>

    <p>This is the capstone of the agents block — and, really, of everything you've
    built. You'll assemble a <strong>multi-tool agent</strong> that pulls together your
    whole toolkit: a knowledge base (your RAG app), a calculator, maybe the date or web
    search. Then you'll do the part that matters most with agents: not just check its
    answers, but <strong>interrogate its decisions</strong>.</p>

    <h2>What makes this studio different</h2>
    <p>Every earlier studio graded <em>outputs</em>. An agent forces a harder question,
    because the agent chooses its own path: <strong>did it pick the right tool? did it
    loop? was it worth the cost? and — honestly — was an agent even the right choice?</strong>
    You'll grade the reasoning, not just the reply.</p>

    <h2>How the studio works</h2>
    <ol class="steps">
      <li><strong>Pick a scenario</strong> — each needs an agent with at least two
      genuinely different tools.</li>
      <li><strong>Build the agent</strong> — Agent component, a model, and its tools
      (Sections 29–30), each with a sharp description.</li>
      <li><strong>Write a decision test set</strong> — questions in the buckets below.</li>
      <li><strong>Run it and watch the traces</strong> — in the Playground, grade
      <em>which tool</em> it called, not just the final answer.</li>
      <li><strong>Score routing, reliability, and cost</strong> with the rubric.</li>
      <li><strong>Make the call</strong> — was an agent the right tool here, or would a
      fixed pipeline have been better?</li>
      <li><strong>Group round</strong> — red-team another team, then take the curveball.</li>
    </ol>

    <h2>Your test set: four kinds of question</h2>
    <ul>
      <li><strong>Right-tool</strong> — each clearly needs one specific tool. Does the
      agent reach for the correct one? (This is the agent's version of "recall.")</li>
      <li><strong>No-tool</strong> — small talk or things the model just knows. Does it
      correctly <em>avoid</em> calling a tool?</li>
      <li><strong>Can't-answer</strong> ⭐ — not in the documents and no tool helps. Does
      it admit it — without looping or inventing?</li>
      <li><strong>Decoy / multi-step</strong> — a question that looks like one tool but
      needs another, or needs two tools in sequence. The real test of routing.</li>
    </ul>

    <h2>Your scenario</h2>
    <div class="controls" id="as-switch">
      <button class="btn" id="as-1">Study buddy</button>
      <button class="btn ghost" id="as-2">Club / HR assistant</button>
      <button class="btn ghost" id="as-3">Bring your own</button>
    </div>

    <div id="as-scenario-1" class="widget">
      <div class="widget-title">Scenario A — The Study Buddy</div>
      <ul>
        <li><strong>The job:</strong> help a student with one of their courses.</li>
        <li><strong>Tools:</strong> a <strong>Knowledge Base</strong> (course notes or a
        textbook chapter, as a RAG tool) plus a <strong>Calculator</strong>.</li>
        <li><strong>Routing to test:</strong> "explain photosynthesis" → knowledge base;
        "what's 15% of 240?" → calculator; "hi" → no tool; "who won the 1998 World Cup?"
        → probably no tool (or can't-answer if out of scope).</li>
        <li><strong>Watch for:</strong> does it mix them up — trying to "calculate" a
        concept question, or answering a math question from the notes?</li>
      </ul>
    </div>

    <div id="as-scenario-2" class="widget" hidden>
      <div class="widget-title">Scenario B — The Club / HR Assistant</div>
      <ul>
        <li><strong>The job:</strong> answer member or employee questions.</li>
        <li><strong>Tools:</strong> a <strong>Handbook Knowledge Base</strong> plus the
        <strong>Current Date</strong> tool (and optionally Web Search).</li>
        <li><strong>Routing to test:</strong> "how many absences are allowed?" → knowledge
        base; "what's today's date?" → date tool; "what's the CEO's favorite color?" →
        can't-answer; "how many days until the handbook's stated holiday?" → date
        <em>and</em> knowledge base, in sequence.</li>
        <li><strong>Watch for:</strong> multi-step questions where it needs two tools —
        does it chain them, or give up after one?</li>
      </ul>
    </div>

    <div id="as-scenario-3" class="widget" hidden>
      <div class="widget-title">Scenario C — Bring your own</div>
      <ul>
        <li><strong>The job:</strong> design a real agent with a clear purpose and at
        least two <em>distinct</em> tools (so routing actually matters).</li>
        <li><strong>Make it honest:</strong> include questions your tools can't answer,
        so you can test whether it admits limits.</li>
        <li><strong>Then:</strong> build, test its decisions, judge, and defend — same as
        the others.</li>
      </ul>
    </div>

    <h2>Grade the decisions, not just the answers</h2>
    <p>Open the Playground trace and judge each dimension weak (0), okay (1), or strong (2):</p>
    <table class="dist-table">
      <thead>
        <tr><th>Dimension</th><th>What you're checking (in the trace)</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Right tool</strong></td><td>On tool questions, did it call the correct tool?</td></tr>
        <tr><td><strong>No needless tool</strong></td><td>On small talk, did it skip tools and just answer?</td></tr>
        <tr><td><strong>Knows its limits</strong></td><td>On can't-answer questions, does it admit it — no loop, no invention?</td></tr>
        <tr><td><strong>Answer quality</strong></td><td>Is the final answer correct, grounded, and complete?</td></tr>
        <tr><td><strong>Cost &amp; steps</strong></td><td>How many model calls per question? Any runaway loops?</td></tr>
      </tbody>
    </table>

    <h2>The reckoning: agent, or pipeline?</h2>
    <p>This is the signature deliverable of this studio, straight from Section 31. Look
    honestly at your app and answer: <strong>did it actually need to be an agent?</strong></p>
    <ul>
      <li>If the questions genuinely vary and need different tools, the agent earns its
      keep — say why.</li>
      <li>If it mostly does one thing, a <strong>fixed pipeline</strong> would be cheaper,
      faster, and more predictable — admit it, and describe the flow you'd build instead.</li>
    </ul>
    <p>A team that builds a slick agent <em>and</em> can argue it wasn't necessary
    understands more than a team that just built one.</p>

    <h2>The curveball</h2>
    <p>Partway through, take one:</p>
    <ul>
      <li><strong>Force a loop.</strong> Find a question that makes your agent retry and
      retry, then fix it — cap the steps, or sharpen a description so it gives up cleanly.</li>
      <li><strong>Run it three times.</strong> Ask the same tricky question three times.
      Same path each time? If not, what does that say about testing agents?</li>
      <li><strong>Add a decoy tool.</strong> Attach a second, similar-sounding tool and
      watch routing degrade — then fix the descriptions (Section 28).</li>
    </ul>

    <h2>The group round: red-team on three fronts</h2>
    <p>Swap agents with another team and try to break each part of its judgment:</p>
    <ul>
      <li><strong>Break routing:</strong> get it to pick the <em>wrong</em> tool for a
      question.</li>
      <li><strong>Break the budget:</strong> get it to loop or rack up model calls.</li>
      <li><strong>Break honesty:</strong> get it to answer confidently when it shouldn't
      (no tool actually had the answer).</li>
    </ul>
    <p>The strongest agent routes correctly, refuses to loop, and stays honest — cheaply.</p>

    <h2>Before you call it done</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="as-d1" /><label for="as-d1">A working agent with at
        least two distinct tools, each with a clear description.</label></li>
      <li><input type="checkbox" id="as-d2" /><label for="as-d2">A decision test set with
        all four kinds of question.</label></li>
      <li><input type="checkbox" id="as-d3" /><label for="as-d3">Each question graded from
        the <strong>trace</strong> — routing, honesty, and cost, not just the answer.</label></li>
      <li><input type="checkbox" id="as-d4" /><label for="as-d4">A written verdict:
        <strong>agent or fixed pipeline?</strong> — with your reasoning.</label></li>
      <li><input type="checkbox" id="as-d5" /><label for="as-d5">Curveball handled and the
        three-front red-team survived.</label></li>
    </ul>

    ${Toolkit.callout(
      `The senior skill isn't building an agent — it's interrogating one. Anyone can wire
       up an Agent component; the real work is watching what it decides, catching where it
       loops or misroutes or bluffs, and being honest about whether it should have been an
       agent at all. Do that, and you're not just using AI tools — you're engineering with
       them.`,
      { label: "This is the job" }
    )}
  `,

  onMount(root) {
    const items = [
      { b: root.querySelector("#as-1"), p: root.querySelector("#as-scenario-1") },
      { b: root.querySelector("#as-2"), p: root.querySelector("#as-scenario-2") },
      { b: root.querySelector("#as-3"), p: root.querySelector("#as-scenario-3") },
    ];
    function show(idx) {
      items.forEach((x, i) => {
        x.p.hidden = i !== idx;
        x.b.classList.toggle("ghost", i !== idx);
      });
    }
    items.forEach((x, i) => x.b.addEventListener("click", () => show(i)));
    show(0);
  },
};
