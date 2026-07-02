/* ============================================================
   Section: Building a RAG flow, part 2 — from chunks to an answer
   Sixth RAG section — LAB. Completes RAG: inserts Parser -> Prompt
   Template ({context}) -> Language Model between Chroma Search
   Results and Chat Output, so the flow WRITES a grounded answer
   instead of dumping raw chunks. The big framing: this IS Section 12
   (chat with a document) — grounded prompting — except the context
   now comes from RETRIEVAL instead of the whole document.

   VERIFIED (repo 2026-06-29, parser.mdx + earlier RAG research in
   [[langflow-verified-facts]]):
   - Parser: two modes — Parser(template) + Stringify. Output = Message.
     For clean context use Parser mode, template "{text}" (pulls the
     chunk text column of each retrieved row; sep default \n).
     Stringify = zero-config fallback (dumps whole structure incl.
     metadata).
   - Wiring: Chroma Search Results -> Parser -> Prompt Template
     {context} -> Language Model System Message; Chat Input -> Language
     Model Input; Language Model -> Chat Output. (Chat Input already ->
     Chroma Search Query from part 1; it now fans out to LM Input too.)
   - Prompt Template needs Check & Save for the {context} port (S3 fact).
   - Mirrors S12: {document}->System Message + Chat Input->Input.

   Pure HTML (no onMount). Predict/troubleshoot via Toolkit.problem.
   Full-flow SVG. No "$" glyph, no KaTeX math, literal \n as \\n.
   ============================================================ */

window.SectionContent["rag-flow-generation"] = {
  title: "Building RAG, part 2: write the answer",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 24 · Lab</div>
    <h1>Building a RAG flow, part 2: from chunks to an answer</h1>

    <p>Part 1 gave us retrieval: ask a question, get back the most relevant chunks —
    raw. Useful, but not exactly a chatbot. Now we add the <strong>AG</strong> of RAG:
    hand those chunks to a model and let it write a clean, grounded answer.</p>

    ${Toolkit.callout(
      `Here's the secret that makes this easy: <strong>you already did this in
       Section 12.</strong> Chatting with a document meant putting the document into
       the prompt as context and telling the model to answer from it. RAG is the exact
       same move — except the context is no longer the <em>whole</em> document, it's
       just the few chunks that search pulled back. Grounded prompting, fed by
       retrieval.`,
      { type: "ai", label: "You've seen this before" }
    )}

    <h2>Three boxes to add</h2>
    <p>We're inserting a short chain between Chroma's <em>Search Results</em> and the
    Chat Output:</p>
    <ul>
      <li><strong>Parser</strong> — the retrieved chunks arrive as structured data
      (rows with a text column plus metadata). Parser turns them into plain text the
      prompt can use. You met this box in Section 13.</li>
      <li><strong>Prompt Template</strong> — the same grounding-and-honesty
      instruction from Section 12, with a <code>{context}</code> blank where the
      retrieved text goes.</li>
      <li><strong>Language Model</strong> — reads the instruction plus the context
      plus the question, and writes the answer.</li>
    </ul>

    <h2>The rewire</h2>
    <p>In Part 1, Chroma's results went straight to Chat Output. We cut that wire and
    route through the new chain instead:</p>
    <ol class="steps">
      <li><strong>Remove</strong> the wire from Chroma DB <em>Search Results</em> →
      Chat Output.</li>
      <li><strong>Chroma DB</strong> <em>Search Results</em> → <strong>Parser</strong>
      input.</li>
      <li><strong>Parser</strong> → <strong>Prompt Template</strong>
      <code>{context}</code> input.</li>
      <li><strong>Prompt Template</strong> → <strong>Language Model</strong>
      <em>System Message</em> input.</li>
      <li><strong>Chat Input</strong> → <strong>Language Model</strong> <em>Input</em>
      (the question itself). Chat Input now feeds two boxes: Chroma's Search Query
      <em>and</em> the model's Input.</li>
      <li><strong>Language Model</strong> → <strong>Chat Output</strong>.</li>
    </ol>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 830 250" role="img"
           aria-label="The answering chain: Chroma to Parser to Prompt to Language Model to Chat Output, with Chat Input feeding both Chroma and the model">
        <defs>
          <marker id="rg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>

        <!-- loading hint -->
        <text x="150" y="40" font-size="9" text-anchor="middle" fill="#8a94a6">(loaded in part 1)</text>

        <rect x="96" y="48" width="108" height="42" rx="8" fill="#e6f0ee" stroke="#8bb8ad" stroke-width="2"></rect>
        <text x="150" y="73" font-size="11" text-anchor="middle" fill="#2b3444">Chroma DB</text>

        <rect x="244" y="48" width="96" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="292" y="73" font-size="11" text-anchor="middle" fill="#2b3444">Parser</text>

        <rect x="380" y="48" width="112" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="436" y="70" font-size="11" text-anchor="middle" fill="#2b3444">Prompt</text>
        <text x="436" y="82" font-size="9" text-anchor="middle" fill="#8a94a6">{context}</text>

        <rect x="532" y="48" width="120" height="42" rx="8" fill="#e9eefc" stroke="#9db0ea"></rect>
        <text x="592" y="73" font-size="11" text-anchor="middle" fill="#2b3444">Language Model</text>

        <rect x="700" y="48" width="112" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="756" y="73" font-size="11" text-anchor="middle" fill="#2b3444">Chat Output</text>

        <line x1="204" y1="69" x2="240" y2="69" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>
        <line x1="340" y1="69" x2="376" y2="69" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>
        <text x="358" y="61" font-size="8" text-anchor="middle" fill="#8a94a6">context</text>
        <line x1="492" y1="69" x2="528" y2="69" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>
        <text x="512" y="61" font-size="8" text-anchor="middle" fill="#8a94a6">system</text>
        <line x1="652" y1="69" x2="696" y2="69" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>

        <!-- Chat Input feeding both Chroma (query) and Language Model (question) -->
        <rect x="40" y="180" width="108" height="42" rx="8" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="94" y="205" font-size="11" text-anchor="middle" fill="#2b3444">Chat Input</text>
        <line x1="110" y1="180" x2="140" y2="92" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>
        <text x="96" y="140" font-size="8" fill="#8a94a6">search query</text>
        <line x1="148" y1="201" x2="560" y2="92" stroke="#8a94a6" stroke-width="2" marker-end="url(#rg-arrow)"></line>
        <text x="430" y="150" font-size="8" fill="#8a94a6">the question → model Input</text>
      </svg>
    </div>

    <h2>Setting the two new boxes</h2>
    <p><strong>Parser.</strong> Set its mode to <strong>Parser</strong> and use the
    template <code>{text}</code> — that pulls just the text of each retrieved chunk,
    one per line, and leaves the metadata behind. (In a pinch, <strong>Stringify</strong>
    mode also works with no template; it just includes more clutter.)</p>

    <p><strong>Prompt Template.</strong> Type an instruction with one blank, then
    click <strong>Check &amp; Save</strong> so the <code>{context}</code> port
    appears (same as Section 3). For example:</p>

    ${Toolkit.callout(
      `You are a helpful assistant. Answer the question using <strong>only</strong> the
       context below. If the answer is not in the context, say you don't know — do not
       make anything up.<br><br>Context:<br>{context}`,
      { label: "Prompt Template text" }
    )}

    <p>That "only the context / say you don't know" rule is the same honesty
    instruction from Section 12 — and it matters even more now, because the model
    sees only the retrieved chunks, not the whole document.</p>

    <h2>Run it</h2>
    <ol class="steps">
      <li><strong>Load</strong> (if you haven't this session): click
      <strong>Run component</strong> on Chroma DB to read, split, embed, and store —
      unchanged from Part 1.</li>
      <li><strong>Ask.</strong> Open the <strong>Playground</strong> and ask a real
      question. Now, instead of raw chunks, you get a written answer grounded in your
      document.</li>
    </ol>

    <h2>See the difference</h2>

    ${Toolkit.problem(
      `You ask the same question you tried in Part 1. Last time you got back a blob of
       chunk text. What's different now?`,
      `Now a model reads those same chunks and replies in clean, natural language — a
       real answer instead of raw passages. Same retrieval underneath; the new chain
       just turns the found text into a response. That is the "Augmented Generation"
       half: the model's answer is <em>augmented</em> by the retrieved context.`,
      { label: "Predict" }
    )}

    ${Toolkit.problem(
      `You ask something your document genuinely doesn't cover — say, the Wi-Fi
       password, which appears nowhere in it. With the prompt above, what should
       happen?`,
      `It should say it doesn't know, rather than invent one. Search returns whatever
       chunks are "closest," but none actually contain the answer, and the
       "only the context / say you don't know" rule tells the model to admit the gap.
       This honesty is the difference between a trustworthy document assistant and a
       confident liar — the exact reliability test from the document studio (Section
       14).`,
      { label: "Predict" }
    )}

    <h2>When it misbehaves</h2>

    ${Toolkit.problem(
      `The model answers your question, but from <strong>general knowledge</strong> —
       it clearly ignored your document (it "knows" things your file never says).
       What do you check?`,
      `Two things. First, the prompt: it must say to use <strong>only</strong> the
       context — without that rule the model happily falls back on what it already
       knows. Second, the wiring: make sure Parser is actually feeding the Prompt's
       <code>{context}</code>, and that context isn't empty — click
       <strong>Inspect output</strong> on the Parser to see the text it produced. Empty
       context (often because the store was never loaded) leaves the model nothing to
       stand on.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.problem(
      `You wired Parser into the Prompt, but there's <strong>no
       <code>{context}</code> input port</strong> on the Prompt Template to connect to.
       Why?`,
      `You typed <code>{context}</code> in the template but didn't click
       <strong>Check &amp; Save</strong>. The variable ports only appear after you save
       the template — the same gotcha from Section 3. Save it, and the
       <code>{context}</code> port shows up.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.callout(
      `<strong>Cost, finally paying off.</strong> You now pay for embeddings (tiny) plus
       the chat model per answer — but the model only ever reads the <em>few retrieved
       chunks</em>, never the whole document. That is exactly the saving we predicted
       back in Sections 16–18: RAG keeps big documents affordable by sending only the
       part that matters.`,
      { label: "The payoff" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You completed a <strong>full RAG chatbot</strong>: it finds the relevant part
      of a document and answers grounded in it.</li>
      <li>You added <strong>Parser</strong> (chunks → text), a <strong>Prompt
      Template</strong> with a <code>{context}</code> blank, and a <strong>Language
      Model</strong> — the "Augmented Generation" half.</li>
      <li>You saw it <strong>admit when it doesn't know</strong>, the mark of a
      trustworthy document assistant.</li>
      <li>You connected the whole idea: RAG is <strong>Section 12's grounded
      prompting, fed by retrieval</strong> — which is what keeps big documents cheap.</li>
    </ul>

    <p>You've now built, end to end, the application this whole block was pointing at:
    a chatbot that can answer questions about a document far too big to hand over
    whole.</p>
  `,
};
