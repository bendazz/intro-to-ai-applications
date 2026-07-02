/* ============================================================
   Section: Getting a Gemini API key (free)
   First of two key sections. Gemini is the no-cost path: free
   tier, no credit card, so it cannot bill the student. Also the
   place we introduce the concept of an API key in general.

   Facts verified June 2026 (Google AI Studio free tier):
     - aistudio.google.com → "Get API key" → "Create API key".
     - No credit card / no billing required for the free tier.
     - Free models are Gemini Flash class; Pro removed from free
       tier on 2026-04-01. ~1,500 requests/day is plenty for class.
     - Free-tier prompts MAY be used by Google to improve products.
   ============================================================ */

window.SectionContent["api-key-gemini"] = {
  title: "Getting a Gemini key (free)",

  html: `
    <div class="eyebrow">Getting an API key · Section 4</div>
    <h1>Getting a Gemini API key (free)</h1>

    <p>Up to now, every flow we built ran entirely on your own machine — no
    real AI involved. To make a flow actually <em>think</em>, Langflow needs to
    talk to a model that lives on a company's servers. And to do that, it needs
    your permission, in the form of an <strong>API key</strong>. This section
    gets you one from Google, for free.</p>

    <h2>First: what is an API key?</h2>

    <p>An <strong>API key</strong> is a long secret string of letters and
    numbers — think of it as a <strong>password that identifies you</strong> to
    a model provider. When Langflow sends your text off to a model, it includes
    your key so the provider knows two things: <em>who is asking</em>, and
    <em>whose account to count this against</em>.</p>

    ${Toolkit.callout(
      `Treat your API key exactly like a password. Anyone who has it can use the
       model as <em>you</em> — spending your quota, or on a paid provider, your
       money. Never paste it into a chat, an email, a screenshot, or anything
       public. We will keep it tucked safely inside Langflow.`,
      { type: "warn", label: "Treat it like a password" }
    )}

    <h2>Why Gemini, and why first</h2>

    <p>We support two model providers in this course: <strong>Google
    (Gemini)</strong> and <strong>Anthropic (Claude)</strong>. We start with
    Gemini for one simple reason: <strong>it is free and needs no credit
    card.</strong> Because you never give Google a way to charge you, the free
    Gemini key <em>cannot</em> produce a surprise bill — the safest possible
    place to begin.</p>

    <h2>Get your key</h2>

    <ol class="steps">
      <li>Go to <strong>Google AI Studio</strong>:
        <a href="https://aistudio.google.com" target="_blank" rel="noopener">aistudio.google.com</a>.
        Sign in with a Google account (any ordinary Gmail account works).</li>
      <li>Click <strong>Get API key</strong> (look for it in the left-hand menu
        or as a button on the page).</li>
      <li>Click <strong>Create API key</strong>.</li>
      <li>If it asks you to choose or create a <strong>project</strong>, let it
        create a new one for you (or pick any existing project — it does not
        matter for our purposes).</li>
      <li>A key appears — a long string starting with letters and numbers.
        <strong>Copy it</strong> and paste it somewhere safe for now (a password
        manager, or a secure note). You can also return to this same
        <strong>Get API key</strong> page later to copy it again.</li>
    </ol>

    ${Toolkit.callout(
      `One privacy note about the <em>free</em> tier: Google may use the text
       you send through it to help improve their products. Nothing you do in
       this course requires private information, but as a habit, don't paste
       anything truly sensitive (real passwords, personal data) into a flow
       running on a free key.`,
      { type: "note", label: "Free-tier privacy" }
    )}

    <h2>What you get for free</h2>

    <ul>
      <li><strong>No credit card, no cost, no expiration.</strong> The free tier
      is genuinely free.</li>
      <li><strong>Fast "Flash" models.</strong> The free tier includes Google's
      <strong>Gemini Flash</strong> models, which are quick and more than good
      enough for everything we do. (As of 2026 the larger "Pro" models are no
      longer free, but we do not need them.)</li>
      <li><strong>Generous daily limits.</strong> You can make on the order of a
      thousand-plus requests per day — far more than a class session uses. If
      you ever hit the limit, the key simply pauses until the next day. It never
      charges you.</li>
    </ul>

    <h2>Check yourself</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="g1" /><label for="g1">I signed in to Google
        AI Studio with a Google account.</label></li>
      <li><input type="checkbox" id="g2" /><label for="g2">I clicked
        <strong>Get API key</strong> → <strong>Create API key</strong> and a key
        was generated.</label></li>
      <li><input type="checkbox" id="g3" /><label for="g3">I copied the key
        somewhere safe.</label></li>
      <li><input type="checkbox" id="g4" /><label for="g4">I understand the key
        is a secret, to be treated like a password.</label></li>
    </ul>

    <h2>If something went wrong</h2>

    ${Toolkit.problem(
      `Do I have to enter a <strong>credit card</strong>?`,
      `<p>No. The whole point of the Gemini free tier is that it needs no card.
       If a page ever asks you to add billing or a payment method, you do not
       need it for this course — back out and stay on the free tier.</p>`,
      { label: "Need a card?" }
    )}

    ${Toolkit.problem(
      `I closed the page and think I <strong>lost my key</strong>.`,
      `<p>No harm done. Return to <strong>aistudio.google.com</strong>, click
       <strong>Get API key</strong> again, and you will see the key (or keys)
       you already made — copy it again. If you would rather, just click
       <strong>Create API key</strong> to make a fresh one.</p>`,
      { label: "Lost the key" }
    )}

    ${Toolkit.problem(
      `It is asking me to pick or create a <strong>project</strong> and I don't
       know what that means.`,
      `<p>A "project" is just a folder Google uses to organize things. For this
       course it does not matter which one you use — let AI Studio create a new
       project for you, or accept whatever it suggests, and continue.</p>`,
      { label: "What project?" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You learned what an <strong>API key</strong> is — a secret password
      that identifies you to a model provider — and that it must be guarded like
      any password.</li>
      <li>You created a <strong>free Gemini API key</strong> in Google AI Studio,
      with no credit card and no possibility of a surprise charge.</li>
      <li>You know the free tier gives you fast <strong>Flash</strong> models and
      generous daily limits — plenty for this course.</li>
    </ul>
  `,
};
