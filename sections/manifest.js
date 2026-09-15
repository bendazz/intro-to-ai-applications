/* ============================================================
   sections/manifest.js
   The ONE place section order & grouping is defined.
   window.SECTIONS = [ { id, title, group? }, ... ]
     - id    : matches the key a section registers in SectionContent
               and the <script src="sections/<id>.js"> tag in index.html
     - title : shown in the sidebar and pager
     - group : optional shared label that buckets sections in the sidebar
   Add a section = add a line here (+ its <script> tag + its file).
   ============================================================ */

// Each section file registers itself onto this map; create it here so the
// section <script>s (which load after manifest.js, before app.js) can write to it.
window.SectionContent = window.SectionContent || {};

window.SECTIONS = [
  {
    id: "talking-to-ai",
    title: "What happens when you talk to an AI?",
    group: "Foundations",
  },
  {
    id: "install-langflow",
    title: "Installing Langflow Desktop",
    group: "Foundations",
  },
  {
    id: "langflow-canvas-basics",
    title: "Your first moves in Langflow",
    group: "Building in Langflow",
  },
  {
    id: "api-key-gemini",
    title: "Getting a Gemini key (free)",
    group: "Getting an API key",
  },
  {
    id: "api-key-anthropic",
    title: "Getting an Anthropic key (safely)",
    group: "Getting an API key",
  },
  {
    id: "add-a-model",
    title: "Bringing in a real model",
    group: "Building in Langflow",
  },
  {
    id: "chatbot-memory",
    title: "Giving the chatbot a memory",
    group: "Building in Langflow",
  },
  {
    id: "prompt-engineering",
    title: "Prompt engineering",
    group: "Building in Langflow",
  },
  {
    id: "single-purpose-tools",
    title: "One flow, many tools",
    group: "Building in Langflow",
  },
  {
    id: "testing-your-app",
    title: "Is it any good? Testing your app",
    group: "Building in Langflow",
  },
  {
    id: "studio-project",
    title: "Studio project: build & test a bot",
    group: "Project studio",
  },
  {
    id: "chat-with-document",
    title: "Chat with a document",
    group: "Working with documents",
  },
  {
    id: "document-wrangling",
    title: "When documents fight back",
    group: "Working with documents",
  },
  {
    id: "document-studio",
    title: "Studio project: a document assistant",
    group: "Working with documents",
  },
  {
    id: "tokens-context-window",
    title: "Tokens and the context window",
    group: "Tokens & cost",
  },
  {
    id: "cost",
    title: "What it costs",
    group: "Tokens & cost",
  },
  {
    id: "cost-practice",
    title: "Practice: estimating cost",
    group: "Tokens & cost",
  },
  {
    id: "budget-practice",
    title: "Practice: matching a budget",
    group: "Tokens & cost",
  },
  {
    id: "budget-memory-practice",
    title: "Practice: budgeting a bot that remembers",
    group: "Tokens & cost",
  },
  {
    id: "budget-studio",
    title: "Studio project: build it to a budget",
    group: "Tokens & cost",
  },
  {
    id: "rag-intuition",
    title: "The big idea behind RAG",
    group: "Retrieval (RAG)",
  },
  {
    id: "embeddings-similarity",
    title: "Finding meaning by location",
    group: "Retrieval (RAG)",
  },
  {
    id: "chunking",
    title: "Cutting the document into chunks",
    group: "Retrieval (RAG)",
  },
  {
    id: "chunking-langflow",
    title: "Hands-on: chunking in Langflow",
    group: "Retrieval (RAG)",
  },
  {
    id: "chunking-practice",
    title: "Practice: chunking by hand",
    group: "Retrieval (RAG)",
  },
  {
    id: "rag-flow-retrieval",
    title: "Building RAG, part 1: store & search",
    group: "Retrieval (RAG)",
  },
  {
    id: "rag-flow-generation",
    title: "Building RAG, part 2: write the answer",
    group: "Retrieval (RAG)",
  },
  {
    id: "retrieval-evaluation",
    title: "Is your retrieval any good?",
    group: "Retrieval (RAG)",
  },
  {
    id: "retrieval-practice",
    title: "Practice: precision and recall",
    group: "Retrieval (RAG)",
  },
  {
    id: "rag-studio",
    title: "Studio: build & tune a RAG app",
    group: "Retrieval (RAG)",
  },
  {
    id: "agents-intro",
    title: "What is an agent?",
    group: "Agents",
  },
  {
    id: "agent-tools",
    title: "Tools: how an agent decides",
    group: "Agents",
  },
  {
    id: "agent-build",
    title: "Build your first agent",
    group: "Agents",
  },
  {
    id: "agent-rag-tool",
    title: "Give your agent a knowledge base",
    group: "Agents",
  },
  {
    id: "agents-go-wrong",
    title: "When agents go wrong",
    group: "Agents",
  },
  {
    id: "agents-studio",
    title: "Studio: build & test an agent",
    group: "Agents",
  },
];
