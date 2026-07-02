/* ============================================================
   Section: Give your agent a knowledge base (RAG as a tool)
   Fourth AGENTS section — LAB. THE CONVERGENCE: wire the S23-24 RAG
   app in as a TOOL so the agent decides WHEN to consult the
   documents (retrieval ON DEMAND, vs pure RAG which always
   retrieved — callback to S27's "RAG retrieves even for 'hi'").

   VERIFIED (agents-tools.mdx "Use flows as tools", repo 2026-06-29;
   see [[langflow-verified-facts]] Agent entry):
   - Primary approach = **Run Flow** component: add Run Flow → select
     your saved RAG flow → enable **Tool Mode** (the flow becomes an
     action) → connect Run Flow's **Tool** output → Agent **Tools** port.
     Run Flow passes the agent's query as the sub-flow's input and
     returns its output.
   - GOTCHA: the sub-flow's vector store must be **persistent** (set
     Chroma **Persist Directory** + load once via Run component) so the
     data is present when the agent calls it; an ephemeral in-memory
     store is empty on a fresh run. (Ties S23 persistence note.)
   - Tool DESCRIPTION (Edit Tool Actions) is how the agent knows when
     to use it (S28 lesson).
   - Alt (brief mention): enable Tool Mode directly on the vector store
     (Chroma) within one flow for retrieval-only.

   Pure HTML (no onMount). Predict/troubleshoot via Toolkit.problem.
   Flow SVG. No "$" glyph, no KaTeX, literal × Unicode.
   ============================================================ */

window.SectionContent["agent-rag-tool"] = {
  title: "Give your agent a knowledge base",

  html: `
    <div class="eyebrow">Agents · Section 30 · Lab</div>
    <h1>Give your agent a knowledge base: RAG as a tool</h1>

    <p>This is the moment the course converges. You've built a RAG app that answers
    from a document (Sections 23–24), and an agent that decides which tools to use
    (Section 29). Now we connect them: your <strong>whole RAG app becomes a single
    tool</strong>, and the agent reaches for it only when a question actually calls for
    your documents.</p>

    <p>Remember the nagging thing about pure RAG? It retrieves on <em>every</em>
    question — even "hi." Hand it to an agent and that problem disappears: the agent
    handles small talk and arithmetic itself, and consults the knowledge base only when
    it decides the question needs it. That's <strong>retrieval on demand</strong>.</p>

    <h2>Part 1 — make your RAG flow reusable</h2>
    <p>Open your RAG flow from Section 24. Two small changes turn it into something the
    agent can call reliably:</p>
    <ol class="steps">
      <li><strong>Make the store persistent.</strong> In the Chroma DB component, set a
      <strong>Persist Directory</strong> (a folder path). An empty Persist Directory
      means the store lives only for one run — fine for testing, but useless to an agent
      calling it later. With a path, the data stays on disk.</li>
      <li><strong>Load it once.</strong> Click <strong>Run component</strong> on Chroma
      DB to read, split, embed, and store — just like before. Now the knowledge is
      saved and waiting.</li>
      <li><strong>Name the flow</strong> something clear, like "Handbook Knowledge
      Base." That name is how you'll recognize it in the next step.</li>
    </ol>

    <h2>Part 2 — build the agent and attach the RAG flow as a tool</h2>
    <ol class="steps">
      <li><strong>New Flow → Blank Flow.</strong> Add an <strong>Agent</strong>, set its
      <strong>Language Model</strong>, and wire <strong>Chat Input</strong> →
      Agent → <strong>Chat Output</strong> — the same base agent from Section 29.</li>
      <li>Add a <strong>Run Flow</strong> component. In its dropdown, select your saved
      <strong>RAG flow</strong>. This component's whole job is to run another flow.</li>
      <li>Enable <strong>Tool Mode</strong> on the Run Flow component. Your RAG flow now
      becomes an action the agent can call.</li>
      <li>Click <strong>Edit Tool Actions</strong> and give it a crisp
      <strong>description</strong>: "Search and answer questions using the company
      handbook." (Section 28: this sentence is how the agent knows when to use it.)</li>
      <li>Connect the Run Flow component's <strong>Tool</strong> output to the Agent's
      <strong>Tools</strong> port.</li>
    </ol>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 640 240" role="img"
           aria-label="Chat Input into Agent into Chat Output, with a Run Flow component wrapping the RAG flow attached to the Agent's Tools port">
        <defs>
          <marker id="art-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>
        <rect x="20" y="44" width="104" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="72" y="69" font-size="11" text-anchor="middle" fill="#2b3444">Chat Input</text>
        <line x1="124" y1="65" x2="216" y2="65" stroke="#8a94a6" stroke-width="2" marker-end="url(#art-arrow)"></line>

        <rect x="216" y="38" width="140" height="54" rx="10" fill="#e9eefc" stroke="#9db0ea" stroke-width="2"></rect>
        <text x="286" y="61" font-size="12" text-anchor="middle" fill="#2b3444" font-weight="650">Agent</text>
        <text x="286" y="78" font-size="9" text-anchor="middle" fill="#5b6472">decides when to search</text>

        <line x1="356" y1="65" x2="448" y2="65" stroke="#8a94a6" stroke-width="2" marker-end="url(#art-arrow)"></line>
        <rect x="448" y="44" width="118" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="507" y="69" font-size="11" text-anchor="middle" fill="#2b3444">Chat Output</text>

        <rect x="206" y="150" width="160" height="52" rx="9" fill="#e6f0ee" stroke="#8bb8ad" stroke-width="2"></rect>
        <text x="286" y="172" font-size="11" text-anchor="middle" fill="#2b3444">Run Flow · Knowledge Base</text>
        <text x="286" y="188" font-size="9" text-anchor="middle" fill="#5b6472">your whole RAG flow, as a tool</text>
        <line x1="286" y1="150" x2="286" y2="94" stroke="#8a94a6" stroke-width="2" marker-end="url(#art-arrow)"></line>
        <text x="292" y="122" font-size="9" fill="#8a94a6">Tool → Tools</text>
      </svg>
    </div>

    <h2>Part 3 — watch it route</h2>
    <p>Open the Playground and feel the difference:</p>
    <ol class="steps">
      <li>Ask: <em>"What tools do you have?"</em> — the knowledge base should be
      listed.</li>
      <li>Ask a document question: <em>"What's the late-work policy?"</em> Watch the
      agent <strong>call the knowledge base tool</strong>, which runs your entire RAG
      flow behind the scenes and hands back a grounded answer.</li>
      <li>Ask something unrelated: <em>"Say hello,"</em> or <em>"What's 12 × 9?"</em>
      The agent does <strong>not</strong> touch the knowledge base — it just answers.</li>
    </ol>
    <p>The agent is now a router: documents questions go to RAG, everything else it
    handles itself. Add the <strong>Calculator</strong> from Section 29 alongside it,
    and you have an agent that picks between doing math and searching your docs — per
    question.</p>

    ${Toolkit.callout(
      `Your grounding and honesty rules still live inside the RAG flow, so they still
       apply: ask the knowledge base something the document doesn't cover and it should
       still say it doesn't know. Wrapping RAG as a tool doesn't loosen its honesty — it
       just lets the agent decide when to use it.`,
      { type: "ai", label: "Honesty carries over" }
    )}

    <h2>Predict, then try</h2>

    ${Toolkit.problem(
      `You say <em>"hi"</em> to your agent. Does it search the knowledge base — the way
       your pure RAG flow always did?`,
      `No. The agent sees a greeting, decides no tool is needed, and just says hi. Pure
       RAG retrieved on every single message, wasting a search (and tokens) on "hi."
       The agent only calls the knowledge base when the question warrants it. That
       "retrieval on demand" is exactly what agents add to RAG.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `The agent never calls your knowledge base — it answers document questions from
       thin air or says it can't help. Two things to check?`,
      `First, the tool itself: is <strong>Tool Mode</strong> on the Run Flow component,
       and is its <strong>Tool</strong> output wired to the Agent's <strong>Tools</strong>
       port? Second, the <strong>description</strong>: if it's vague, the agent won't
       realize your documents are relevant — use <strong>Edit Tool Actions</strong> to
       say plainly what's in the knowledge base (the Section 28 lesson).`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.problem(
      `The agent <em>does</em> call the knowledge base, but it comes back empty — no
       matter what you ask. What went wrong?`,
      `Almost certainly the store was never loaded, or it's ephemeral. If the Chroma
       <strong>Persist Directory</strong> is empty, each fresh run starts with an empty
       store, so a tool call finds nothing. Set a Persist Directory, click
       <strong>Run component</strong> on Chroma to load your document once, and the
       agent's calls will find the data.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.callout(
      `<strong>Simpler alternative.</strong> If you only want the agent to fetch chunks
       (not run a whole RAG flow), you can enable <strong>Tool Mode</strong> directly on
       the vector store component and wire it to the agent — retrieval as a tool, in one
       flow. The Run Flow approach is nicer when you want your full, grounded RAG app —
       honesty rules and all — behind one tool.`,
      { label: "Another way" }
    )}

    ${Toolkit.callout(
      `<strong>Cost reality.</strong> A single document question now fires several model
       calls: the agent decides, the RAG flow embeds the query and calls its own model
       to write the grounded answer, and the agent phrases the final reply. Powerful,
       but more tokens than either piece alone — keep Sections 16–18 in mind.`,
      { label: "Cost note" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You wrapped your <strong>entire RAG app as a single tool</strong> using the
      Run Flow component.</li>
      <li>You built an agent that <strong>decides when</strong> to consult your
      documents — retrieval on demand, not on every message.</li>
      <li>You learned the persistence gotcha: an agent's knowledge base must be a
      <strong>loaded, persistent</strong> store.</li>
      <li>You saw grounding and honesty <strong>carry over</strong> from the RAG flow
      into the tool.</li>
      <li>Everything you've built — prompting, documents, RAG, agents — now works
      together in one app.</li>
    </ul>
  `,
};
