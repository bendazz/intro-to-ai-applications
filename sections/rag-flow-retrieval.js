/* ============================================================
   Section: Building a RAG flow, part 1 — store & search (retrieval)
   Fifth RAG section — LAB. Assembles S20-22 into a REAL working flow
   that, given a question, returns the most relevant CHUNKS of a
   document. Deliberately stops before the LLM (the "R" of RAG); the
   next section adds generation. Matches instructor's go-slow style.

   VERIFIED against langflow repo (2026-06-29) + gh source:
   - Embedding Model core component providers (EMBEDDING_PROVIDER_
     CLASS_MAPPING): OpenAI, Google Generative AI, Ollama, IBM WatsonX.
     ANTHROPIC IS NOT PRESENT (no embeddings API) → students embed with
     their free GEMINI key (or local Ollama). Ports: provider + model
     (set in Models pane) → Embeddings output.
   - Chroma DB (Chroma bundle): LOCAL, no account. Persist Directory
     empty = ephemeral in-memory; set a path to persist. Ports:
     Ingest Data (JSON/Table, writes), Embedding (Embeddings), Search
     Query (String, reads), Search Results output. Collection default
     "langflow"; Number of Results default 10; Allow Duplicates default
     true. ONE Chroma component does both read & write.
   - Wiring (from components-embedding-models.mdx): Read File Loaded
     Files → Split Text Input; Split Text Chunks → Chroma Ingest Data;
     Embedding Model Embeddings → Chroma Embedding; Chat Input → Chroma
     Search Query; Chroma Search Results → Chat Output.
   - Ingest = Run component on Chroma DB (runs upstream). Search =
     Playground chat.

   Pure HTML (no onMount). Predict/troubleshoot via Toolkit.problem.
   One two-job flow SVG. No "$" glyph, no KaTeX. Model names kept as
   durable examples with a "names change" hedge.
   ============================================================ */

window.SectionContent["rag-flow-retrieval"] = {
  title: "Building RAG, part 1: store & search",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 23 · Lab</div>
    <h1>Building a RAG flow, part 1: store and search your document</h1>

    <p>We have all the pieces now — chunks (Sections 21–22), embeddings and the
    vector store (Section 20). Time to wire them into one working flow. We'll stop
    at a genuinely exciting halfway point: a flow where you type a question and it
    hands back the <strong>most relevant chunks of your document</strong>, matched
    by meaning. That is the <strong>R</strong> in RAG — retrieval. Getting a model
    to turn those chunks into a polished answer is a small, separate addition we'll
    make next.</p>

    <h2>Two jobs, one flow</h2>
    <p>The flow does two different jobs, and it helps to keep them straight:</p>
    <ul>
      <li><strong>Loading (do this once):</strong> read the file, split it into
      chunks, turn each chunk into a point, and store the points. Read File →
      Split Text → Embedding Model → Chroma DB.</li>
      <li><strong>Searching (do this every question):</strong> take a question, turn
      it into a point, and ask the store for the nearest chunks. Chat Input → Chroma
      DB → Chat Output.</li>
    </ul>
    <p>One <strong>Chroma DB</strong> component handles both — it's the store you
    write into and the store you search.</p>

    <h2>The components you'll add</h2>
    <ul>
      <li><strong>Read File</strong> — upload your document (a <code>.txt</code>,
      <code>.md</code>, or <code>.pdf</code>). Same box as before.</li>
      <li><strong>Split Text</strong> — your chunker from last lab. Start with a
      separator of <code>\\n\\n</code> and a modest Chunk Size.</li>
      <li><strong>Embedding Model</strong> — the box that turns text into points.
      Set its <strong>Provider</strong> to <strong>Google Generative AI</strong> and
      pick an embedding model (something like <code>text-embedding-004</code> — exact
      names change).</li>
      <li><strong>Chroma DB</strong> — a local vector store. No account, no signup.
      Leave <strong>Persist Directory</strong> empty and it simply lives in memory
      for your session.</li>
      <li><strong>Chat Input</strong> and <strong>Chat Output</strong> — so you can
      search from the Playground.</li>
    </ul>

    ${Toolkit.callout(
      `<strong>Use your Gemini key for this step — not Anthropic.</strong> Anthropic
       makes chat models but <em>no</em> embedding model, so it won't even appear in
       the Embedding Model provider list. Google's embeddings run on the same free
       Gemini key you already set up, and the free tier easily covers a class.
       (Fully offline alternative: the <strong>Ollama</strong> provider runs an
       embedding model locally with no key, if you've installed it.)`,
      { type: "warn", label: "Which key for embeddings" }
    )}

    <p>First, make sure the embedding model is turned on: open <strong>Settings →
    Model Providers → Google Generative AI</strong>, confirm your key is saved, and
    <strong>enable a model listed under Embedding Models</strong>. Only enabled
    models show up in the component.</p>

    <h2>Wiring it up</h2>
    <p>Drag on the six components, then connect them like this:</p>
    <ol class="steps">
      <li><strong>Read File</strong> → <strong>Split Text</strong> (its
      <em>Loaded Files</em> output into Split Text's input).</li>
      <li><strong>Split Text</strong> <em>Chunks</em> output → <strong>Chroma DB</strong>
      <em>Ingest Data</em> input.</li>
      <li><strong>Embedding Model</strong> <em>Embeddings</em> output →
      <strong>Chroma DB</strong> <em>Embedding</em> input.</li>
      <li><strong>Chat Input</strong> → <strong>Chroma DB</strong> <em>Search Query</em>
      input.</li>
      <li><strong>Chroma DB</strong> <em>Search Results</em> output →
      <strong>Chat Output</strong>.</li>
    </ol>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 720 300" role="img"
           aria-label="A retrieval flow: Read File and Split Text and Embedding Model feed Chroma DB, which is searched by Chat Input and returns to Chat Output">
        <defs>
          <marker id="rf-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a94a6"></path>
          </marker>
        </defs>

        <text x="16" y="24" font-size="12" font-weight="700" fill="#5b6472">LOADING — run once</text>
        <rect x="16" y="36" width="104" height="40" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="68" y="60" font-size="11" text-anchor="middle" fill="#2b3444">Read File</text>
        <line x1="120" y1="56" x2="164" y2="56" stroke="#8a94a6" stroke-width="2" marker-end="url(#rf-arrow)"></line>
        <rect x="164" y="36" width="104" height="40" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="216" y="60" font-size="11" text-anchor="middle" fill="#2b3444">Split Text</text>

        <rect x="16" y="110" width="140" height="40" rx="7" fill="#e9eefc" stroke="#9db0ea"></rect>
        <text x="86" y="130" font-size="11" text-anchor="middle" fill="#2b3444">Embedding Model</text>
        <text x="86" y="143" font-size="9" text-anchor="middle" fill="#8a94a6">Gemini</text>

        <!-- Chroma hub -->
        <rect x="330" y="86" width="150" height="66" rx="9" fill="#e6f0ee" stroke="#8bb8ad" stroke-width="2"></rect>
        <text x="405" y="114" font-size="13" text-anchor="middle" fill="#2b3444" font-weight="650">Chroma DB</text>
        <text x="405" y="132" font-size="10" text-anchor="middle" fill="#5b6472">the vector store</text>

        <!-- ingest arrows into Chroma -->
        <line x1="268" y1="56" x2="360" y2="86" stroke="#8a94a6" stroke-width="2" marker-end="url(#rf-arrow)"></line>
        <text x="300" y="66" font-size="9" fill="#8a94a6">chunks</text>
        <line x1="156" y1="130" x2="330" y2="118" stroke="#8a94a6" stroke-width="2" marker-end="url(#rf-arrow)"></line>
        <text x="228" y="120" font-size="9" fill="#8a94a6">embedding</text>

        <text x="16" y="206" font-size="12" font-weight="700" fill="#5b6472">SEARCHING — every question</text>
        <rect x="16" y="220" width="104" height="40" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="68" y="244" font-size="11" text-anchor="middle" fill="#2b3444">Chat Input</text>
        <line x1="120" y1="240" x2="360" y2="150" stroke="#8a94a6" stroke-width="2" marker-end="url(#rf-arrow)"></line>
        <text x="180" y="212" font-size="9" fill="#8a94a6">search query</text>

        <rect x="556" y="102" width="148" height="40" rx="7" fill="#eef1f6" stroke="#c7cede"></rect>
        <text x="630" y="126" font-size="11" text-anchor="middle" fill="#2b3444">Chat Output</text>
        <line x1="480" y1="119" x2="556" y2="122" stroke="#8a94a6" stroke-width="2" marker-end="url(#rf-arrow)"></line>
        <text x="500" y="112" font-size="9" fill="#8a94a6">results</text>
      </svg>
    </div>

    <h2>Run it — loading, then searching</h2>
    <ol class="steps">
      <li><strong>Upload the document.</strong> Click the Read File component and add
      your file.</li>
      <li><strong>Load the store.</strong> Click <strong>Run component</strong> on the
      <strong>Chroma DB</strong> box. This runs everything it depends on — read,
      split, embed — and writes the chunks-as-points into the store. (Peek with
      <strong>Inspect output</strong> on Split Text to confirm you got sensible
      chunks.)</li>
      <li><strong>Search it.</strong> Open the <strong>Playground</strong> and type a
      question about your document. Chat Input becomes a point, Chroma finds the
      nearest chunks, and Chat Output shows them.</li>
    </ol>

    ${Toolkit.callout(
      `Notice which button does which job: <strong>Run component</strong> on Chroma
       <em>loads</em> the data; the <strong>Playground</strong> <em>searches</em> it.
       If you edit the document, Run the component again to reload.`,
      { type: "ai", label: "Two buttons, two jobs" }
    )}

    <h2>The moment it clicks</h2>

    ${Toolkit.problem(
      `Your document contains the sentence: "Saturday and Sunday hours are 8 a.m. to
       6 p.m." In the Playground you ask: <em>"When are you open on the
       weekend?"</em> The words "weekend" and "open" appear nowhere in that sentence.
       What comes back?`,
      `The Saturday-and-Sunday chunk — the right one. Search matches by
       <strong>meaning</strong>, not words: your question and that sentence landed
       near each other on the map of meaning (Section 20), even though they share no
       words. This is the whole idea made real — and it's exactly what keyword search
       could never do.`,
      { label: "Predict" }
    )}

    <p>That returned chunk is raw — you're seeing the retrieved text itself, not a
    tidy answer. That's on purpose: right now you can watch retrieval work with
    nothing hiding it.</p>

    <h2>When it doesn't work</h2>

    ${Toolkit.problem(
      `You open the Playground, ask a question, and get <strong>nothing back</strong>
       (or an empty result). What's the most likely cause?`,
      `You searched a store you never loaded. Search only finds what's already in
       Chroma, so you must click <strong>Run component</strong> on the Chroma DB box
       <em>first</em> to ingest the document. Also check that Read File actually got
       your file and that Split Text produced chunks (Inspect its output). An empty
       store returns empty results.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.problem(
      `In the Embedding Model component, you look for <strong>Anthropic</strong> in
       the provider list to reuse your Anthropic key — but it isn't there. Did
       something break?`,
      `Nothing's broken. Anthropic offers chat models but no embedding model, so it
       simply isn't an option here. Switch the provider to <strong>Google Generative
       AI</strong> and use your Gemini key (free tier). If you see a key or permission
       error, make sure the key is saved in Model Providers and that you enabled a
       model under <strong>Embedding Models</strong>.`,
      { label: "Troubleshooting" }
    )}

    ${Toolkit.callout(
      `<strong>A note on cost.</strong> Embedding uses tokens too: you pay a little to
       embed all your chunks once at load time, plus a tiny amount to embed each
       question. It's cheap — embeddings cost far less than chat models — and Gemini's
       free tier covers class use comfortably. (Reload a huge document over and over
       and it adds up; load once and search freely.)`,
      { label: "Cost check" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You built a flow that <strong>loads a document into a vector store</strong>
      (read → split → embed → store) and <strong>searches it by meaning</strong>
      (question → embed → nearest chunks).</li>
      <li>You used the <strong>Embedding Model</strong> component with your
      <strong>Gemini</strong> key — because Anthropic can't embed.</li>
      <li>You used <strong>Chroma DB</strong>, a local vector store that needs no
      account.</li>
      <li>You saw retrieval find the right chunk from a question worded completely
      differently — Section 20's promise, running for real.</li>
    </ul>

    <p>You now have the retrieval half of RAG working and visible. The other half —
    handing those chunks to a model so it writes a clean, grounded answer — is a
    short hop from here.</p>
  `,
};
