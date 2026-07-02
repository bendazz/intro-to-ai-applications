/* ============================================================
   Section: Tokens and the context window
   Explains WHY "hand over the whole thing" keeps breaking: the
   model reads TOKENS, and only so many fit in its CONTEXT WINDOW
   at once. Ties together the memory limit (S7) and the document
   limit (S12/14), opens the door to RAG, and sets up cost (next).

   Two honest in-browser widgets:
     1. Tokenizer — approximate text -> token chips + count
        (clearly labeled approximate; real tokenizers differ).
     2. Context-window meter — sliders for chat length & document
        size fill a bar against an illustrative ~200,000-token
        limit; overflow shows the wall.

   NUMBERS ARE ROUND/ILLUSTRATIVE and version-dependent (current
   Gemini Flash / Claude Haiku ~200K; some models 1M+). Not a math
   lesson (see [[course-goal-not-math]]).
   ============================================================ */

window.SectionContent["tokens-context-window"] = {
  title: "Tokens and the context window",

  html: `
    <div class="eyebrow">Tokens &amp; cost · Section 15</div>
    <h1>Tokens and the context window</h1>

    <p>We keep bumping into the same wall. Long conversations start to
    <em>forget</em> (Section 7). Big documents <em>won't fit</em> in the prompt
    (Sections 12 and 14). These are the same wall, and it has a name. Understand
    it and a lot of the course clicks into place — plus it is the doorway to the
    next big idea. It comes down to two things: <strong>tokens</strong> and the
    <strong>context window</strong>.</p>

    <h2>What is a token?</h2>

    <p>Back in <a href="#talking-to-ai">Section 1</a> we said the model writes
    one small piece at a time, and mentioned those pieces are called
    <strong>tokens</strong>. Here is the fuller picture: the model does not read
    <em>letters</em>, and it does not quite read <em>words</em> either. It reads
    <strong>tokens</strong> — little chunks of text. A common word is usually one
    token; a long or unusual word gets split into several. A rough rule of thumb:
    <strong>one token is about four characters, or roughly three-quarters of a
    word.</strong></p>

    <p>Type something below and watch it break into tokens:</p>

    ${Toolkit.widget(
      "See the tokens",
      `<textarea id="tk-input" rows="2"
         style="width:100%; font:inherit; font-size:.95rem; padding:8px 10px; border:1px solid var(--line); border-radius:8px; resize:vertical; background:var(--surface); color:var(--ink)"></textarea>
       <div id="tk-chips" style="margin-top:12px; line-height:2.1"></div>
       <div class="readout">
         <div class="stat"><span class="label">Characters</span><span class="value" id="tk-chars">0</span></div>
         <div class="stat"><span class="label">Tokens (approx.)</span><span class="value" id="tk-count">0</span></div>
       </div>
       <div style="font-size:.82rem; color:var(--ink-faint); margin-top:.6em">
         An approximation — real tokenizers split a little differently — but it
         shows the idea: common words are one token; long or rare words become
         several.
       </div>`
    )}

    <p>Why should a beginner care about tokens? Two reasons, and they run the
    rest of this course: tokens are what the model's memory limit is measured in,
    and tokens are what you <strong>pay for</strong> (that is the next section).</p>

    <h2>The context window: the model's desk</h2>

    <p>Here is the key idea. A model can only look at a limited amount of text
    <strong>at one time</strong>. Picture a <strong>desk</strong>: everything the
    model needs for a single reply has to fit on that desk at once —</p>
    <ul>
      <li>your <strong>instructions</strong> (the system prompt),</li>
      <li>the <strong>whole conversation so far</strong> (remember, we resend it
      every turn),</li>
      <li>any <strong>document</strong> you pasted in,</li>
      <li>and room for the <strong>reply</strong> it is about to write.</li>
    </ul>
    <p>That desk is the <strong>context window</strong>, and it is measured in
    tokens. Modern models have big desks — very roughly a couple hundred thousand
    tokens, which is a few hundred pages of text (some models hold even more). Big
    — but <strong>not infinite</strong>. Drag the sliders and watch the desk fill:</p>

    ${Toolkit.widget(
      "Fill the desk (context window)",
      `<div style="display:grid; grid-template-columns:10em 1fr 5em; align-items:center; gap:12px; margin:6px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Chat history</span>
         <input type="range" id="cw-msgs" min="0" max="200" value="12" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="cw-msgs-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div style="display:grid; grid-template-columns:10em 1fr 5em; align-items:center; gap:12px; margin:6px 0">
         <span style="font-weight:650; color:var(--ink-soft)">Document</span>
         <input type="range" id="cw-pages" min="0" max="800" value="3" style="width:100%; accent-color:var(--accent)">
         <span class="sval" id="cw-pages-v" style="text-align:right; font-variant-numeric:tabular-nums"></span>
       </div>
       <div class="pnw-track" style="height:26px; margin-top:16px">
         <div class="pnw-fill" id="cw-fill"></div>
       </div>
       <div class="readout">
         <div class="stat"><span class="label">On the desk</span><span class="value" id="cw-total">0</span></div>
         <div class="stat"><span class="label">The desk holds</span><span class="value">~200,000</span></div>
         <div class="stat"><span class="label">Status</span><span class="value" id="cw-status">Fits</span></div>
       </div>`
    )}

    <h2>Now the wall makes sense</h2>

    <p>Everything we struggled with was really the desk running out of room:</p>
    <ul>
      <li><strong>Long conversations forget.</strong> Every turn you resend the
      whole history, so the desk fills up. Eventually the earliest messages have
      to be pushed off the edge to make room — and once they are gone, the model
      genuinely cannot see them. That is your chatbot "forgetting."</li>
      <li><strong>Big documents don't fit.</strong> Paste a 300-page manual onto
      a desk that holds a few hundred pages and there is no room left for the
      question, let alone a thousand documents. It simply overflows.</li>
    </ul>

    ${Toolkit.callout(
      `This is the doorway to the next big topic. If a document is too big to put
       on the desk all at once, we cannot hand the model everything. So the trick
       will be to hand it only the <strong>relevant piece</strong> — find the one
       paragraph that answers the question and put just that on the desk. Figuring
       out how to do that is what the next major part of the course is about.`,
      { type: "ai", label: "Why this opens the next door" }
    )}

    <h2>What you learned</h2>
    <ul>
      <li>Models read <strong>tokens</strong> — chunks of text, roughly four
      characters or three-quarters of a word each. Common words are one token;
      long or rare ones split into several.</li>
      <li>The <strong>context window</strong> is the model's "desk": all the text
      for one reply — instructions, full conversation, any document, and the
      reply itself — must fit on it at once. It is large but <strong>finite</strong>.</li>
      <li>That single limit explains both mysteries: long chats
      <strong>forget</strong> (old messages fall off the desk) and big documents
      <strong>don't fit</strong> (they overflow it).</li>
      <li>It points straight at the fix — give the model only the
      <strong>relevant</strong> piece — and at the next question:
      <strong>what does all this text cost?</strong></li>
    </ul>
  `,

  onMount(root) {
    /* ---- Widget 1: approximate tokenizer ---- */
    const input = root.querySelector("#tk-input");
    const chips = root.querySelector("#tk-chips");
    const charsEl = root.querySelector("#tk-chars");
    const countEl = root.querySelector("#tk-count");

    function tokenize(text) {
      const out = [];
      const parts = text.match(/[A-Za-z0-9]+|[^\sA-Za-z0-9]/g) || [];
      for (const p of parts) {
        if (/^[A-Za-z0-9]+$/.test(p) && p.length > 6) {
          for (let i = 0; i < p.length; i += 4) out.push(p.slice(i, i + 4));
        } else {
          out.push(p);
        }
      }
      return out;
    }

    function renderTokens() {
      const text = input.value;
      const toks = tokenize(text);
      charsEl.textContent = text.length.toLocaleString();
      countEl.textContent = toks.length.toLocaleString();
      chips.innerHTML = toks
        .map(
          (t) =>
            `<span style="display:inline-block; padding:2px 7px; margin:2px; border:1px solid var(--line); border-radius:6px; background:var(--surface); font-family:var(--font-mono); font-size:.8rem; color:var(--ink-soft)">${t
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</span>`
        )
        .join("");
    }

    input.value = "Artificial intelligence is transforming how we build software.";
    input.addEventListener("input", renderTokens);
    renderTokens();

    /* ---- Widget 2: context-window meter ---- */
    const LIMIT = 200000;      // illustrative
    const FIXED = 250 + 1500;  // instructions + reply reserve
    const PER_MSG = 70;        // tokens per chat message (rough)
    const PER_PAGE = 500;      // tokens per document page (rough)

    const msgs = root.querySelector("#cw-msgs");
    const pages = root.querySelector("#cw-pages");
    const msgsV = root.querySelector("#cw-msgs-v");
    const pagesV = root.querySelector("#cw-pages-v");
    const fill = root.querySelector("#cw-fill");
    const totalEl = root.querySelector("#cw-total");
    const statusEl = root.querySelector("#cw-status");

    function updateMeter() {
      const m = parseInt(msgs.value, 10);
      const d = parseInt(pages.value, 10);
      msgsV.textContent = m + " msgs";
      pagesV.textContent = d + " pg";
      const total = FIXED + m * PER_MSG + d * PER_PAGE;
      totalEl.textContent = total.toLocaleString();
      const pct = Math.min(100, (total / LIMIT) * 100);
      fill.style.width = pct + "%";
      if (total > LIMIT) {
        fill.style.background = "var(--rose)";
        statusEl.textContent = "OVERFLOWS — won't fit";
        statusEl.style.color = "var(--rose)";
      } else {
        fill.style.background = "var(--accent)";
        statusEl.textContent = "Fits (" + Math.round(pct) + "% full)";
        statusEl.style.color = "var(--teal)";
      }
    }

    msgs.addEventListener("input", updateMeter);
    pages.addEventListener("input", updateMeter);
    updateMeter();
  },
};
