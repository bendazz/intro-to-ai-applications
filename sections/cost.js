/* ============================================================
   Section: What it costs (and how to keep it cheap)
   Cost as a DESIGN CONSTRAINT, not a math lesson (see
   [[course-goal-not-math]]). Builds directly on tokens (S15):
   you pay per token; input and output priced separately (output
   costs more); model choice is the biggest lever; sending whole
   documents / long conversations is where bills grow.

   GOTCHA: money-heavy section → NO "$" glyph in the static HTML
   (KaTeX). Prose uses words ("a fraction of a cent", "a dollar
   per million tokens"). The estimator widget renders costs in
   cents / the word "dollars" via JS in onMount (after typeset).

   Rates are ROUND ILLUSTRATIVE examples (verified ~current June
   2026: small ~1/5, premium ~5/25 per million in/out); prices
   change — the SHAPE is the lesson, not the exact number.
   ============================================================ */

window.SectionContent["cost"] = {
  title: "What it costs",

  html: `
    <div class="eyebrow">Tokens &amp; cost · Section 16</div>
    <h1>What it costs (and how to keep it cheap)</h1>

    <p>Now that you know what a token is, cost is simple to state: you
    <strong>pay per token</strong>. But this is not a section about doing sums.
    It is about a real decision you make every time you build an AI app —
    <strong>cost shapes which model you choose, how you write your prompts, and
    whether an idea is even affordable.</strong> Good builders feel this from day
    one; it is part of what "building an application" means.</p>

    <h2>How pricing is shaped</h2>
    <p>Two facts are worth carrying, and they barely ever change even as the
    actual prices do:</p>
    <ul>
      <li><strong>There are two meters, not one.</strong> You pay for the tokens
      you <strong>send</strong> (the input — your prompt, the conversation, any
      document) <em>and</em> for the tokens the model <strong>writes back</strong>
      (the output). And output usually costs <strong>several times more</strong>
      per token than input. So a bot told to "answer in one sentence" is cheaper
      than one that writes an essay — for the very same question.</li>
      <li><strong>Prices are tiny per token but quoted per million.</strong> A
      small model might cost around a dollar per million input tokens and a few
      dollars per million output tokens; a premium model can be five times that
      or more. The exact numbers drift constantly — what matters is the shape.</li>
    </ul>

    <p>Play with it. Pick a model, set how much you send and how long the reply
    is, and watch the cost move:</p>

    ${Toolkit.widget(
      "Cost estimator",
      `<div class="controls" id="co-model">
         <button class="btn" id="co-small">Small model (cheap)</button>
         <button class="btn ghost" id="co-large">Large model (premium)</button>
       </div>
       <div style="display:grid; grid-template-columns:12em 1fr 5.5em; align-items:center; gap:12px; margin:10px 0 4px">
         <span style="font-weight:650; color:var(--ink-soft)">How much you send</span>
         <input type="range" id="co-send" min="10" max="5000" value="60" step="10" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="co-send-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:12em 1fr 5.5em; align-items:center; gap:12px; margin:4px 0">
         <span style="font-weight:650; color:var(--ink-soft)">How long the reply</span>
         <input type="range" id="co-reply" min="10" max="800" value="150" step="10" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="co-reply-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div class="readout">
         <div class="stat"><span class="label">Sending it (input)</span><span class="value" id="co-in">–</span></div>
         <div class="stat"><span class="label">The reply (output)</span><span class="value" id="co-out">–</span></div>
         <div class="stat"><span class="label">One question</span><span class="value" id="co-one">–</span></div>
         <div class="stat"><span class="label">1,000 of them</span><span class="value" id="co-k">–</span></div>
         <div class="stat"><span class="label" id="co-other-label">On a premium model</span><span class="value" id="co-other">–</span></div>
       </div>
       <div style="font-size:.82rem; color:var(--ink-faint); margin-top:.6em">
         Example rates only, not a quote — real prices change often. The point is
         how the pieces drive the cost. (About 750 words is a page; a big "send"
         is like stuffing a document into the prompt.)
       </div>`
    )}

    <h2>The three levers that move your bill</h2>
    <p>Almost every cost decision comes down to three knobs:</p>

    <h3>1. Which model — the biggest lever by far</h3>
    <p>Swapping a premium model for a small one can cut the cost of the same job
    by five to fifty times. And for most everyday jobs — classifying a review,
    answering from a document, fixing tone — a small model (the Haiku or Flash
    class you already met) is <strong>plenty</strong>. The habit that saves the
    most money: <strong>reach for the smallest model that does the job well</strong>,
    and only pay for a premium one when you genuinely need its extra strength.</p>

    <h3>2. How much you send — every token, every time</h3>
    <p>You are billed for the whole prompt on <em>every single call</em>. A lean
    prompt is a cheap prompt. This is exactly where documents bite: if you stuff
    a whole document into the prompt (Sections 12 and 14), you pay for that
    entire document <strong>on every question a user asks</strong>. Try it in the
    estimator — drag "how much you send" up to a few thousand words and watch a
    fraction of a cent become several cents each time. Multiply by a thousand
    users and it is real money.</p>

    <h3>3. How often, and how long the conversation</h3>
    <p>Volume adds up — a thousand calls cost a thousand times one call. And
    conversations are sneaky. Remember from <a href="#chatbot-memory">Section
    7</a> that you resend the <em>whole</em> history every turn? That means by
    message twenty, you are paying to send twenty messages of history along with
    the new question. The <strong>last</strong> message in a long chat can cost
    many times what the first one did — even though it looks the same to the
    user.</p>

    <h2>So how worried should you be?</h2>
    <p>For a class, barely at all. With a small model, a normal question-and-answer
    costs a <strong>fraction of a cent</strong> — you could run a whole course's
    worth of experiments for a few dollars. That is exactly why the prepaid
    guardrails from <a href="#api-key-anthropic">Section 5</a> stretch so far. A
    scary bill almost never comes from normal use; it comes from one of the three
    levers going wrong — a premium model where a cheap one would do, a giant
    document on every call, or a runaway conversation.</p>

    ${Toolkit.callout(
      `Notice that lever #2 keeps pointing at the same fix. Paying to send a whole
       document on every question is wasteful <em>and</em> it does not even fit
       (Section 15). Both problems have the same answer: send the model only the
       <strong>relevant piece</strong> of the document, not all of it. That is the
       idea we finally build next.`,
      { type: "ai", label: "Cost points at the same door" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>You pay <strong>per token</strong>, on two meters: the tokens you
      <strong>send</strong> and the tokens the model <strong>writes</strong> —
      and output usually costs several times more.</li>
      <li>Three levers move the bill: <strong>which model</strong> (the biggest),
      <strong>how much you send</strong> every call, and <strong>how often / how
      long</strong> the conversation.</li>
      <li>Cost is a <strong>design decision</strong>, not an afterthought — the
      cheapest app that does the job well is usually the best one.</li>
      <li>The costliest habit, stuffing whole documents into every prompt, points
      straight at the fix: send only the <strong>relevant piece</strong>.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- Cost estimator (illustrative rates, per million tokens) ---- */
    const RATES = {
      small: { in: 1, out: 5, other: "premium", otherKey: "large" },
      large: { in: 5, out: 25, other: "cheap", otherKey: "small" },
    };
    const TOK_PER_WORD = 1.33;

    const smallBtn = root.querySelector("#co-small");
    const largeBtn = root.querySelector("#co-large");
    const send = root.querySelector("#co-send");
    const reply = root.querySelector("#co-reply");
    const sendV = root.querySelector("#co-send-v");
    const replyV = root.querySelector("#co-reply-v");
    const inEl = root.querySelector("#co-in");
    const outEl = root.querySelector("#co-out");
    const oneEl = root.querySelector("#co-one");
    const kEl = root.querySelector("#co-k");
    const otherEl = root.querySelector("#co-other");
    const otherLabel = root.querySelector("#co-other-label");
    let model = "small";

    // format dollars (a number) without ever using the "$" glyph
    function fmt(d) {
      if (d < 0.001) return "under 0.1¢";
      if (d < 0.01) return (d * 100).toFixed(2) + "¢";
      if (d < 1) return (d * 100).toFixed(1) + "¢";
      return d.toFixed(2) + " dollars";
    }

    function costFor(rate, inTok, outTok) {
      return (inTok / 1e6) * rate.in + (outTok / 1e6) * rate.out;
    }

    function update() {
      const sw = parseInt(send.value, 10);
      const rw = parseInt(reply.value, 10);
      sendV.textContent = sw.toLocaleString() + " w";
      replyV.textContent = rw + " w";
      const inTok = sw * TOK_PER_WORD;
      const outTok = rw * TOK_PER_WORD;
      const r = RATES[model];
      const inCost = (inTok / 1e6) * r.in;
      const outCost = (outTok / 1e6) * r.out;
      const total = inCost + outCost;
      inEl.textContent = fmt(inCost);
      outEl.textContent = fmt(outCost);
      oneEl.textContent = fmt(total);
      kEl.textContent = fmt(total * 1000);
      otherLabel.textContent = "On a " + r.other + " model";
      otherEl.textContent = fmt(costFor(RATES[r.otherKey], inTok, outTok));
    }

    function setModel(m) {
      model = m;
      smallBtn.classList.toggle("ghost", m !== "small");
      largeBtn.classList.toggle("ghost", m !== "large");
      update();
    }

    smallBtn.addEventListener("click", () => setModel("small"));
    largeBtn.addEventListener("click", () => setModel("large"));
    send.addEventListener("input", update);
    reply.addEventListener("input", update);
    setModel("small");
  },
};
