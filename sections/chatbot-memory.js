/* ============================================================
   Section: Giving the chatbot a memory
   Deepens the chatbot. Pays off Section 1's promise that the
   model has no memory of its own — the APP supplies it. We build
   the memory loop by hand so students SEE the mechanism:
   retrieve the saved conversation, inject it into the prompt,
   store each new reply.

   Mechanics verified vs repo docs (message-history.mdx, memory.mdx;
   see [[langflow-verified-facts]]):
     - Two Message History components: one in RETRIEVE mode, one in
       STORE mode (each Message History does one or the other).
     - Retrieve output → a Prompt Template {memory} variable (needs
       Check & Save) → Language Model System Message.
     - Chat Input → Language Model Input; Language Model → Chat Output.
     - Chat Output → Store-mode Message History "Message" input.
     - History grouped by session_id (default = flow ID).
     - Agent component has built-in memory (one switch); we use the
       Language Model on purpose, to expose the mechanism.
   ============================================================ */

window.SectionContent["chatbot-memory"] = {
  title: "Giving the chatbot a memory",

  html: `
    <div class="eyebrow">Building in Langflow · Section 7</div>
    <h1>Giving the chatbot a memory</h1>

    <p>Try this with the chatbot you built last section. Ask it
    <strong>"What is the capital of France?"</strong> It answers Paris. Now ask
    <strong>"How many people live there?"</strong> — and it has no idea what
    "there" means. It will guess, or ask you which city. Your chatbot has the
    memory of a goldfish: every message is a fresh start.</p>

    <p>This is not a bug. It is exactly what we predicted way back in
    <a href="#talking-to-ai">Section 1</a>: the model <strong>has no memory of
    its own</strong>, and any memory has to be supplied by the <em>app</em>
    around it. We left that as a promise. Now we keep it.</p>

    <h2>Why it forgets</h2>

    <p>Remember the function machine: text in, text out, and nothing kept
    between calls. Each time you send a message, the model sees
    <strong>only what Langflow hands it that turn</strong> — your latest
    question, and nothing else. The earlier conversation is simply not there. So
    if we want the model to "remember," there is only one option: we have to
    <strong>hand it the past conversation ourselves, every single time.</strong></p>

    <h2>The trick: show it the whole conversation, every turn</h2>

    <p>Here is the entire idea, as a loop that runs on every message:</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 200" role="img"
           aria-label="The memory loop: retrieve the conversation, paste it into the prompt and ask the model, store the reply, then repeat">
        <defs>
          <marker id="mem-ah" markerWidth="10" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L7,3 L0,6 Z" fill="#8a93a6"/>
          </marker>
        </defs>
        <rect x="10" y="44" width="160" height="62" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="90" y="71" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">1 · Retrieve</text>
        <text x="90" y="89" text-anchor="middle" font-size="11" fill="#8a93a6">the chat so far</text>

        <rect x="200" y="44" width="160" height="62" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="280" y="71" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">2 · Paste it in</text>
        <text x="280" y="89" text-anchor="middle" font-size="11" fill="#8a93a6">and ask the model</text>

        <rect x="390" y="44" width="160" height="62" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="470" y="71" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">3 · Store</text>
        <text x="470" y="89" text-anchor="middle" font-size="11" fill="#8a93a6">the new reply</text>

        <line x1="170" y1="75" x2="197" y2="75" stroke="#8a93a6" stroke-width="2" marker-end="url(#mem-ah)"/>
        <line x1="360" y1="75" x2="387" y2="75" stroke="#8a93a6" stroke-width="2" marker-end="url(#mem-ah)"/>
        <path d="M470,106 C470,168 90,168 90,109" fill="none" stroke="#8a93a6" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#mem-ah)"/>
        <text x="280" y="160" text-anchor="middle" font-size="11" fill="#8a93a6">…and repeat on every new message</text>
      </svg>
    </div>

    <p>The crucial thing to notice: <strong>the memory does not live in the
    model.</strong> It lives in a little record-keeping system in the app — a
    saved log of the conversation, plus the habit of pasting that log back into
    the prompt before each question. The model stays as forgetful as ever; the
    app just keeps reminding it.</p>

    <h2>Build it</h2>

    <p>Langflow gives us a box called <strong>Message History</strong> that does
    exactly this record-keeping. We use <strong>two</strong> of them: one set to
    <strong>Retrieve</strong> (reads the saved conversation back in) and one set
    to <strong>Store</strong> (saves each new reply). Between them sits the
    Prompt Template, carrying the history into the model through a
    <code>{memory}</code> blank.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 312" role="img"
           aria-label="Message History Retrieve feeds a Prompt Template memory variable into the Language Model System Message; Chat Input feeds the model; the model feeds Chat Output; Chat Output feeds a Message History Store box">
        <rect x="18" y="22" width="158" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="97" y="46" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Message History</text>
        <text x="97" y="64" text-anchor="middle" font-size="11" fill="#8a93a6">(Retrieve)</text>

        <rect x="208" y="22" width="158" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="287" y="46" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Prompt Template</text>
        <text x="287" y="64" text-anchor="middle" font-size="10.5" fill="#8a93a6">history fills {memory}</text>

        <rect x="18" y="150" width="158" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="97" y="174" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="97" y="192" text-anchor="middle" font-size="11" fill="#8a93a6">your question</text>

        <rect x="208" y="150" width="158" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="287" y="174" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Language Model</text>
        <text x="287" y="192" text-anchor="middle" font-size="11" fill="#8a93a6">the real model</text>

        <rect x="402" y="150" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="472" y="174" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="472" y="192" text-anchor="middle" font-size="11" fill="#8a93a6">the reply</text>

        <rect x="208" y="250" width="158" height="52" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="287" y="272" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Message History</text>
        <text x="287" y="290" text-anchor="middle" font-size="11" fill="#8a93a6">(Store)</text>

        <line x1="176" y1="50" x2="208" y2="50" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="287" y1="78" x2="287" y2="150" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="299" y="118" font-size="10.5" fill="#8a93a6">System Message</text>
        <line x1="176" y1="178" x2="208" y2="178" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="366" y1="178" x2="402" y2="178" stroke="#3b82f6" stroke-width="2.5"/>
        <path d="M472,206 C472,232 287,228 287,249" fill="none" stroke="#3b82f6" stroke-width="2.5"/>

        <circle cx="176" cy="50" r="5" fill="#3b82f6"/>
        <circle cx="208" cy="50" r="5" fill="#3b82f6"/>
        <circle cx="287" cy="78" r="5" fill="#3b82f6"/>
        <circle cx="287" cy="150" r="5" fill="#3b82f6"/>
        <circle cx="176" cy="178" r="5" fill="#3b82f6"/>
        <circle cx="208" cy="178" r="5" fill="#3b82f6"/>
        <circle cx="366" cy="178" r="5" fill="#3b82f6"/>
        <circle cx="402" cy="178" r="5" fill="#3b82f6"/>
        <circle cx="472" cy="206" r="5" fill="#3b82f6"/>
        <circle cx="287" cy="249" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <ol class="steps">
      <li>Start from your working chatbot from last section: <strong>Chat
        Input → Language Model → Chat Output</strong>. (Rebuild those three if
        you need to.)</li>
      <li>Search the sidebar for <strong>message history</strong> and drag one
        on near the start. Set its mode to <strong>Retrieve</strong>. This box
        reads the saved conversation back in.</li>
      <li>Add a <strong>Prompt Template</strong>. In its <strong>Template</strong>
        field, write a short instruction with a <code>{memory}</code> blank, for
        example:
        <br /><code>You are a helpful, friendly assistant.<br />Here is the
        conversation so far:<br />{memory}</code>
        <br />Click <strong>Check &amp; Save</strong> so the
        <strong>memory</strong> input appears (just like the blanks you made in
        Section 3).</li>
      <li>Wire the <strong>Message History (Retrieve)</strong> output → the
        Prompt Template's <strong>memory</strong> input.</li>
      <li>Wire the <strong>Prompt Template</strong> output → the Language
        Model's <strong>System Message</strong> input (turn on System Message if
        it is not already showing, as you did last section).</li>
      <li>Drag on a <strong>second</strong> Message History box at the end and
        set it to <strong>Store</strong>. Wire <strong>Chat Output</strong> →
        this box's <strong>Message</strong> input. This saves each reply for
        next time.</li>
      <li>Open the <strong>Playground</strong>. Say:
        <strong>My name is Sam and I love the ocean.</strong> Then ask:
        <strong>What is my name, and what do I love?</strong></li>
    </ol>

    ${Toolkit.callout(
      `You may wonder why we wired this by hand when surely there is a switch for
       it. There is — Langflow's <strong>Agent</strong> box has memory built in.
       We did it the long way on purpose, because now you can <em>see</em> what
       "memory" actually is: a saved log, retrieved and pasted back in, then
       updated. No magic — just careful record-keeping wrapped around a
       forgetful model.`,
      { type: "ai", label: "Why build it by hand?" }
    )}

    <h2>Test the memory</h2>

    ${Toolkit.problem(
      `In a fresh conversation, you tell the bot <strong>"My favorite color is
       teal,"</strong> and it replies. Then you ask <strong>"What's my favorite
       color?"</strong> What does it answer, and — more importantly — <em>how</em>
       did it know?`,
      `<p>It answers <strong>teal</strong>. But the model did not "remember"
       anything. Here is the real sequence: when you sent the first message, the
       <strong>Store</strong> box saved it. When you asked the second question,
       the <strong>Retrieve</strong> box pulled that saved line back out and the
       Prompt Template pasted it into the system message — so the text the model
       actually received already contained "My favorite color is teal." It
       answered from what was in front of it, exactly as a forgetful machine
       would. The flow reminded it.</p>`,
      { label: "Predict, then check" }
    )}

    ${Toolkit.callout(
      `Conversations are kept separate by <em>session</em>. Everything in one
       Playground chat shares a session, so it all hangs together. Start a brand
       new session (or clear the chat) and the bot is a blank slate again —
       because the saved log it retrieves is empty.`,
      { type: "note", label: "One conversation at a time" }
    )}

    <p>One thing worth noticing for later: the retrieved history gets a little
    <strong>longer with every turn</strong>, and the whole thing is pasted into
    the prompt each time. A model can only read so much text at once — there is
    a ceiling. Short chats never come close, but the conversation isn't free or
    infinite, and that ceiling will matter when we start handing models large
    amounts of text.</p>

    <h2>What you accomplished</h2>
    <ul>
      <li>You turned a one-shot Q&amp;A into a real <strong>back-and-forth
      chatbot</strong> that remembers what was said earlier.</li>
      <li>You built the memory <strong>loop</strong> yourself —
      <strong>retrieve</strong> the saved conversation, <strong>paste</strong>
      it into the prompt, <strong>store</strong> each new reply — using two
      <strong>Message History</strong> boxes and a <code>{memory}</code> blank in
      the Prompt Template.</li>
      <li>You confirmed the big idea from Section 1: <strong>the memory is in the
      app, not the model.</strong> The model never stopped being forgetful; the
      flow keeps reminding it.</li>
      <li>You saw that the remembered conversation keeps growing — a hint that
      how much text a model can hold at once is a real and limited thing.</li>
    </ul>
  `,
};
