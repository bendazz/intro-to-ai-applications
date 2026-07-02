/* ============================================================
   Section: Chat with a document
   The bridge toward RAG. Give the model your OWN document in the
   prompt (as context) so it can answer questions about it —
   "grounding." Reuses Read File (S3), Prompt Template variables
   (S3/9), and the System-Message pattern (S6/7).

   Flow (all verified components):
     Read File (Raw Content, Message) → Prompt Template {document}
       → Language Model System Message
     Chat Input → Language Model Input
     Language Model → Chat Output
   The "answer only from the document, else say you don't know"
   rule is the heart: grounding + honesty (ties to S8 + hallucination).

   Ends with the context-window wall (one short doc works; a huge
   doc or many docs won't fit) → motivates real RAG next.
   ============================================================ */

window.SectionContent["chat-with-document"] = {
  title: "Chat with a document",

  html: `
    <div class="eyebrow">Working with documents · Section 12</div>
    <h1>Chat with a document</h1>

    <p>Your chatbot is clever, but it only knows two things: whatever was baked
    into the model when it was trained, and whatever you type. It knows nothing
    about <em>your</em> stuff — your club's rules, your course syllabus, your
    company's return policy, the manual for your specific dishwasher. Yet
    "answer questions about <strong>this</strong> document" is exactly what a
    huge number of genuinely useful AI apps do. Let us build one.</p>

    <p>You already have the missing piece. Back in
    <a href="#langflow-canvas-basics">Section 3</a> you used the
    <strong>Read File</strong> box to pull a document's text into a flow. We
    never did anything with it. Today we put it to work.</p>

    <h2>The idea: hand the model the material</h2>

    <p>Remember the function machine — the model can only use what is right in
    front of it. So the trick is almost embarrassingly simple: <strong>put the
    document into the prompt</strong>, then ask your question. With the text
    sitting there in front of it, the model can read it and answer from it. This
    has a name — <strong>grounding</strong>: giving the model the specific
    material its answer should be based on, instead of relying on its general,
    sometimes-wrong memory.</p>

    <p>Here is the flow. The document flows in from a Read File box and becomes
    part of the model's instructions; your question comes in as usual.</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 232" role="img"
           aria-label="Read File feeds a Prompt Template document variable into the Language Model System Message; Chat Input feeds the model's Input; the model feeds Chat Output">
        <rect x="18" y="22" width="150" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="93" y="46" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Read File</text>
        <text x="93" y="63" text-anchor="middle" font-size="10.5" fill="#8a93a6">your document</text>

        <rect x="208" y="22" width="158" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="287" y="46" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Prompt Template</text>
        <text x="287" y="63" text-anchor="middle" font-size="10.5" fill="#8a93a6">doc fills {document}</text>

        <rect x="18" y="152" width="150" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="93" y="176" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="93" y="193" text-anchor="middle" font-size="10.5" fill="#8a93a6">your question</text>

        <rect x="208" y="152" width="158" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="287" y="176" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Language Model</text>
        <text x="287" y="193" text-anchor="middle" font-size="10.5" fill="#8a93a6">answers from it</text>

        <rect x="402" y="152" width="140" height="54" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="472" y="176" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="472" y="193" text-anchor="middle" font-size="10.5" fill="#8a93a6">the answer</text>

        <line x1="168" y1="49" x2="208" y2="49" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="287" y1="76" x2="287" y2="152" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="299" y="118" font-size="10.5" fill="#8a93a6">System Message</text>
        <line x1="168" y1="179" x2="208" y2="179" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="366" y1="179" x2="402" y2="179" stroke="#3b82f6" stroke-width="2.5"/>
        <circle cx="168" cy="49" r="5" fill="#3b82f6"/>
        <circle cx="208" cy="49" r="5" fill="#3b82f6"/>
        <circle cx="287" cy="76" r="5" fill="#3b82f6"/>
        <circle cx="287" cy="152" r="5" fill="#3b82f6"/>
        <circle cx="168" cy="179" r="5" fill="#3b82f6"/>
        <circle cx="208" cy="179" r="5" fill="#3b82f6"/>
        <circle cx="366" cy="179" r="5" fill="#3b82f6"/>
        <circle cx="402" cy="179" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <h2>Build it</h2>

    <p><a href="sections/northwood-info.txt" download>Download the sample
    document</a> (a one-page community-center info sheet) — or use any short text
    document of your own.</p>

    <ol class="steps">
      <li>Start from your chatbot: <strong>Chat Input → Language Model → Chat
        Output</strong>, with the model and provider set.</li>
      <li>Add a <strong>Read File</strong> box and upload the document.</li>
      <li>Add a <strong>Prompt Template</strong>. In its <strong>Template</strong>
        field, write the grounding instructions with a <code>{document}</code>
        blank:
        <br /><code>You answer questions about the document below. Use ONLY what
        the document says. If the answer is not in the document, say you do not
        know rather than guessing.<br /><br />Document:<br />{document}</code>
        <br />Click <strong>Check &amp; Save</strong> so the
        <strong>document</strong> input appears.</li>
      <li>Wire the <strong>Read File</strong> output (its <strong>Raw
        Content</strong>) → the Prompt Template's <strong>document</strong> input.</li>
      <li>Wire the <strong>Prompt Template</strong> output → the Language Model's
        <strong>System Message</strong>.</li>
      <li>Leave <strong>Chat Input → Language Model Input</strong> and
        <strong>Language Model → Chat Output</strong> as they are.</li>
      <li>Open the <strong>Playground</strong> and ask about the document —
        <strong>What time does the center open on Saturday?</strong> It answers
        from the sheet, not from thin air.</li>
    </ol>

    <h2>The honesty rule earns its keep</h2>

    <p>Now ask something the document does <em>not</em> cover, like
    <strong>"Do you have a swimming pool?"</strong> Because of the rule you wrote
    — <em>use only the document; if it is not there, say you do not know</em> —
    a well-behaved bot admits it does not know, instead of inventing a pool.</p>

    ${Toolkit.problem(
      `Why is that "use only the document, otherwise say you don't know" line so
       important? What would likely happen without it?`,
      `<p>Without it, the model falls back on its <em>general</em> training to
       fill the gap — and cheerfully makes up a plausible-sounding pool, or
       guesses the membership price, because it is predicting likely text, not
       checking your sheet (Section 1). The rule forces it to stay
       <strong>grounded</strong> in your document and to admit the limits of what
       it was given. For a real app — a policy bot, a syllabus helper — that
       honesty is the difference between useful and dangerous.</p>`,
      { label: "Predict, then check" }
    )}

    ${Toolkit.callout(
      `This is the same lesson as Section 1, now working <em>for</em> you: the
       model knows only what is in front of it. So if you put the right material
       in front of it, it can answer accurately about things it was never trained
       on — your document, written yesterday, that no model has ever seen.`,
      { type: "ai", label: "Why grounding works" }
    )}

    <h2>Go build useful things</h2>
    <p>You now have a pattern that powers an enormous number of real apps. Swap
    the document and you have a new tool: a study buddy for your class notes, a
    bot that answers from your club's bylaws, a helper that reads a recipe and
    answers "can I make this without eggs?", an assistant for a product's manual.
    Same flow, different document.</p>

    <h2>The catch — and what comes next</h2>
    <p>Try this with a <em>tiny</em> document and it feels like magic. But notice
    what we are doing: we paste the <strong>entire</strong> document into the
    prompt, every single time. That is fine for a one-page sheet. But what about
    a 300-page manual? Or a thousand documents? You cannot stuff all of it into
    every prompt — remember from <a href="#chatbot-memory">Section 7</a> that a
    model can only take in so much text at once. There is a ceiling, and big
    documents blow right through it. Solving <em>that</em> — how to feed the
    model just the <strong>relevant</strong> piece of a huge pile of text — is
    the next big idea in this course.</p>

    <h2>What you accomplished</h2>
    <ul>
      <li>You built a bot that answers questions about a <strong>document you
      supply</strong> — by putting the document's text into the prompt as
      context, a technique called <strong>grounding</strong>.</li>
      <li>You reused <strong>Read File</strong> (Section 3) and a Prompt Template
      <code>{document}</code> variable to feed the document into the model's
      System Message.</li>
      <li>You saw that an <strong>"use only the document, else say you don't
      know"</strong> rule keeps the bot honest and stops it inventing answers.</li>
      <li>You hit the real limit: the whole document goes into <em>every</em>
      prompt, so this breaks down for large or numerous documents — the problem
      the next topic exists to solve.</li>
    </ul>
  `,
};
