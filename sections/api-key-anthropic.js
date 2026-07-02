/* ============================================================
   Section: Getting an Anthropic (Claude) key — safely
   Second key section. Unlike Gemini, the Claude API costs real
   money (prepaid credits), so this section is mostly about the
   GUARDRAILS that make a "bill of consequence" impossible. The
   load-bearing message: prepaid credits + auto-reload OFF = a
   hard ceiling you cannot exceed.

   NOTE (playbook): money is written in WORDS and there are no
   literal dollar-sign characters anywhere, to avoid KaTeX mis-parsing.

   Facts verified June 2026 (support.claude.com + Console):
     - console.anthropic.com; Settings > Billing > "Buy credits".
     - Billing is PREPAID credits; auto-reload optional, OFF by
       default (Settings > Billing, "Edit" the auto-reload section).
     - Out of credits → API stops; no subscription / monthly bill.
     - Credits expire 1 year, non-refundable; failed calls not charged.
     - API keys under Settings > API Keys > "Create Key"; shown once.
   ============================================================ */

window.SectionContent["api-key-anthropic"] = {
  title: "Getting an Anthropic key (safely)",

  html: `
    <div class="eyebrow">Getting an API key · Section 5</div>
    <h1>Getting an Anthropic (Claude) API key — safely</h1>

    <p>The second provider we support is <strong>Anthropic</strong>, the maker
    of the <strong>Claude</strong> models. Claude is excellent, and trying it is
    worthwhile — but there is one real difference from Gemini: the Claude API
    <strong>costs money</strong>. Not much (we are talking pennies for
    coursework), but real money all the same. That is nothing to be afraid of,
    as long as you set it up correctly — and setting it up so a scary bill is
    <em>impossible</em> is what most of this section is about.</p>

    ${Toolkit.callout(
      `You do <strong>not</strong> have to do this section. The free Gemini key
       from the last section works for everything in this course. Anthropic is
       an <em>optional</em> path for anyone who wants to try Claude. If you would
       rather not spend a cent, skip ahead — you lose nothing.`,
      { type: "note", label: "Optional" }
    )}

    <h2>How Claude billing works — the one idea that keeps you safe</h2>

    <p>Here is the whole mental model, and it is genuinely reassuring once you
    see it:</p>

    <ul>
      <li>The Claude API is <strong>prepaid</strong>. You buy a small amount of
      <strong>credits</strong> up front — you can start with about <strong>five
      dollars</strong> — and your usage slowly draws that balance down.</li>
      <li>There is an optional feature called <strong>auto-reload</strong> that
      automatically buys more credits when you run low. <strong>Leave it
      off.</strong></li>
      <li>With auto-reload off, the credits you bought are a <strong>hard
      ceiling</strong>. When they run out, the API simply <strong>stops
      working</strong> until <em>you</em> choose to buy more. There is no
      subscription and no monthly bill.</li>
    </ul>

    ${Toolkit.callout(
      `Read this twice, because it is the whole game: <strong>prepaid credits,
       with auto-reload turned off, means you can never spend more than you put
       in.</strong> Load five dollars and the most you can ever be charged is
       five dollars — full stop. When it is gone, Claude politely stops
       answering until you decide to add more. A "bill of consequence" is not
       possible.`,
      { type: "warn", label: "The one thing to remember" }
    )}

    <h2>Step 1 — Create your Console account</h2>
    <ol class="steps">
      <li>Go to the <strong>Anthropic Console</strong>:
        <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>.</li>
      <li>Sign up (or sign in) and verify your email if asked.</li>
    </ol>

    <h2>Step 2 — Set your safety ceiling (do this before anything else)</h2>
    <ol class="steps">
      <li>Open <strong>Settings</strong>, then <strong>Billing</strong>.</li>
      <li>Click <strong>Buy credits</strong> and purchase a <strong>small</strong>
        amount — about <strong>five dollars</strong> is plenty for a whole
        semester of coursework.</li>
      <li>Find the <strong>auto-reload</strong> setting on the same Billing page
        and make sure it is <strong>OFF</strong>. (It is off by default; just
        confirm it. If you ever see it enabled, click <strong>Edit</strong> and
        turn it off.)</li>
    </ol>

    ${Toolkit.callout(
      `That second step is your seatbelt. With a small prepaid balance and
       auto-reload off, the worst case in the entire course is that you use up a
       few dollars and Claude stops until you top up. Everything else below is
       extra protection on top of an already-safe setup.`,
      { type: "ai", label: "Why we did billing first" }
    )}

    <h2>Step 3 — Create your API key</h2>
    <ol class="steps">
      <li>In <strong>Settings</strong>, open <strong>API Keys</strong>.</li>
      <li>Click <strong>Create Key</strong> and give it a name you will
        recognize, such as <strong>langflow-class</strong>.</li>
      <li>If offered, set a <strong>spending limit</strong> on the key as a
        second layer of protection.</li>
      <li><strong>Copy the key immediately.</strong> Unlike Google, Anthropic
        shows you the key <strong>only once</strong>. Paste it somewhere safe
        right away. If you lose it, you cannot view it again — you simply delete
        that key and make a new one.</li>
    </ol>

    <h2>Your layered guardrails, in order of importance</h2>
    <ol>
      <li><strong>Prepaid credits, auto-reload off.</strong> The hard ceiling.
      This alone makes a runaway bill impossible.</li>
      <li><strong>A per-key spending limit</strong> (if offered) — a second wall
      inside the first.</li>
      <li><strong>Use the cheapest Claude model.</strong> The small, fast model
      (the "Haiku" class) costs a tiny fraction of the larger ones. A few
      dollars of credit buys an enormous amount of classwork. We will pick the
      model inside Langflow.</li>
      <li><strong>Keep the key secret.</strong> Never share, screenshot, or post
      it. We will store it inside Langflow as a masked
      <strong>credential</strong>, not out in the open.</li>
      <li><strong>Watch and revoke.</strong> The Console shows your usage; if a
      key is ever exposed, delete it in <strong>API Keys</strong> and make a new
      one.</li>
    </ol>

    ${Toolkit.callout(
      `If your instructor gave you a department-provided key (because you chose
       to pay the small fee instead of making your own account), you can skip
       the account and billing steps — but read the guardrails above anyway, so
       you understand the key you are holding and keep it secret.`,
      { label: "Using a department key?" }
    )}

    <h2>Check yourself</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="a1" /><label for="a1">I created an Anthropic
        Console account.</label></li>
      <li><input type="checkbox" id="a2" /><label for="a2">I bought a small
        amount of credits (about five dollars).</label></li>
      <li><input type="checkbox" id="a3" /><label for="a3">I confirmed
        <strong>auto-reload is OFF</strong>.</label></li>
      <li><input type="checkbox" id="a4" /><label for="a4">I created a key and
        copied it somewhere safe.</label></li>
      <li><input type="checkbox" id="a5" /><label for="a5">I understand that with
        auto-reload off, I can never spend more than I prepaid.</label></li>
    </ul>

    <h2>If something went wrong</h2>

    ${Toolkit.problem(
      `How can I be <strong>absolutely sure</strong> I won't get a big bill?`,
      `<p>Buy only a small amount of credits and keep <strong>auto-reload
       off</strong>. Those two choices put a hard ceiling on your spending: when
       the credits are gone, the API stops answering until you choose to add
       more. There is no subscription and no monthly invoice — you only ever
       spend the credits you deliberately bought.</p>`,
      { label: "No surprise bills?" }
    )}

    ${Toolkit.problem(
      `I <strong>lost my key</strong> or it stopped working.`,
      `<p>Anthropic shows a key only once, so there is no way to view it again
       later. That is fine: go to <strong>Settings → API Keys</strong>, delete
       the old key, click <strong>Create Key</strong>, and copy the new one
       right away.</p>`,
      { label: "Lost or broken key" }
    )}

    ${Toolkit.problem(
      `Will I be charged <strong>every month</strong>, like a subscription?`,
      `<p>No. Claude API billing is <strong>prepaid</strong>, not a
       subscription. There is no recurring charge. You spend only the credits
       you bought, and nothing happens automatically unless you turn on
       auto-reload — which we told you to leave off.</p>`,
      { label: "Is it a subscription?" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You learned how Claude API billing works: <strong>prepaid
      credits</strong>, drawn down by usage, with <strong>no subscription</strong>.</li>
      <li>You set the guardrail that matters most — a <strong>small prepaid
      balance with auto-reload off</strong> — making a runaway bill impossible.</li>
      <li>You created an Anthropic API key, set an optional spending limit, and
      stored it safely like a password.</li>
      <li>You know the supporting habits: use the cheap <strong>Haiku</strong>
      model, keep the key secret, and revoke it if it ever leaks.</li>
    </ul>
  `,
};
