/* ============================================================
   Section: Practice — matching a budget (no memory)
   Second practice set in the Tokens & cost group, sitting between
   cost-practice and budget-studio. Instructor asked for it in the
   SAME format as cost-practice: pure HTML, no onMount, a row of
   Toolkit.problem click-to-reveal.

   The NEW skill vs cost-practice: that set asks "what does this
   cost?" — this one runs the arithmetic BACKWARDS from a budget.
   Does it fit / what can I afford / how much document can I send /
   which lever do I pull / how much headroom do I leave. This is
   the muscle budget-studio then exercises under a scenario.

   Scope: bot with NO memory (each question stands alone). The
   memory case is the next section, deliberately kept separate so
   the quadratic does not muddy the plain budget arithmetic.

   GOTCHA: money-heavy → NO "$" glyph anywhere; money in the words
   "dollars"/"cents"; arithmetic in plain text with literal × ÷ ≈.
   Same illustrative rates as Section 16 and cost-practice
   (small 1/5, premium 5/25 dollars per million in/out).
   ============================================================ */

window.SectionContent["budget-practice"] = {
  title: "Practice: matching a budget",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Tokens &amp; cost · Practice</div>
    <h1>Practice: matching a budget</h1>

    <p>Last time you were handed an app and asked what it costs. Real work
    almost never arrives that way. You are handed a <strong>budget</strong> and
    asked whether the app you want can live inside it — and if it cannot, which
    part to change. That is the same arithmetic run backwards, and it is the
    skill you will need in the studio.</p>

    ${Toolkit.callout(
      `<strong>Everything you need:</strong>
       <ul>
         <li><strong>Cost of some tokens:</strong> (number of tokens ÷ 1,000,000)
         × the rate.</li>
         <li><strong>One question:</strong> input cost + output cost.</li>
         <li><strong>A month:</strong> cost of one question × questions per
         month.</li>
         <li><strong>Backwards:</strong> what one question may cost = budget ÷
         questions per month.</li>
         <li><strong>Example rates (a small model):</strong> 1 dollar per million
         input tokens, 5 dollars per million output tokens. (A premium model: 5
         and 25.)</li>
         <li>Rough page size: <strong>500 tokens</strong> per page.</li>
       </ul>`,
      { label: "Cheat sheet" }
    )}

    ${Toolkit.problem(
      `<strong>Does it fit?</strong> Your bot sends
       <strong>1,500 input tokens</strong> per question and writes
       <strong>200 output tokens</strong> back, on the small model. You expect
       <strong>3,000 questions a month</strong> and you have been given
       <strong>20 dollars a month</strong>. Does it fit?`,
      `<p>Input: 1,500 ÷ 1,000,000 × 1 = 0.0015 dollars.</p>
       <p>Output: 200 ÷ 1,000,000 × 5 = 0.001 dollars.</p>
       <p>One question = 0.0015 + 0.001 = 0.0025 dollars = <strong>0.25 cents</strong>.</p>
       <p>A month = 3,000 × 0.0025 = <strong>7.50 dollars</strong>.</p>
       <p><strong>It fits</strong>, and comfortably — you are using a little over a
       third of the budget. Notice you had to price one question first; every
       problem in this set starts there.</p>`
    )}

    ${Toolkit.problem(
      `<strong>What can I afford?</strong> Same bot, same 0.25 cents per
       question. Your client has <strong>25 dollars a month</strong> to spend.
       How many questions does that buy?`,
      `<p>25 dollars = 2,500 cents. Each question costs 0.25 cents.</p>
       <p>2,500 ÷ 0.25 = <strong>10,000 questions a month</strong>.</p>
       <p>That is about 330 a day. Now you can answer the question a client
       actually asks — not "what does it cost" but "how many people can I let
       use this?"</p>`
    )}

    ${Toolkit.problem(
      `<strong>Work backwards to a design.</strong> You have
       <strong>30 dollars a month</strong> and expect
       <strong>6,000 questions a month</strong>. Replies run about
       <strong>200 tokens</strong>, small model. How many tokens of document can
       you afford to send with each question? Convert that to pages.`,
      `<p>What one question may cost: 30 ÷ 6,000 = <strong>0.005 dollars</strong>.</p>
       <p>The reply is not negotiable: 200 ÷ 1,000,000 × 5 = 0.001 dollars.</p>
       <p>That leaves 0.005 − 0.001 = 0.004 dollars for input.</p>
       <p>Input tokens = 0.004 × 1,000,000 ÷ 1 = <strong>4,000 tokens</strong>.</p>
       <p>The user's question itself takes about 50, leaving roughly 3,950 for
       document — at 500 tokens a page, about
       <strong>7 pages</strong> (round down; you want to fit, not just barely
       miss).</p>
       <p>This is the most useful direction to run the numbers. The budget did
       not just tell you yes or no — it told you how to build the thing.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Two designs, one budget.</strong> A bot answers questions about a
       15-page manual (≈ <strong>12,000 tokens</strong>). Questions are about
       100 tokens, replies about <strong>300 tokens</strong>, small model, and
       you expect <strong>5,000 questions a month</strong> against a
       <strong>25 dollar</strong> budget. Try it two ways: (A) send the whole
       manual every time, (B) send only the one relevant page (≈ 800 tokens).`,
      `<p><strong>A — whole manual.</strong> Input = 100 + 12,000 = 12,100 →
       12,100 ÷ 1,000,000 × 1 = 0.0121. Output = 300 ÷ 1,000,000 × 5 = 0.0015.
       One question ≈ 0.0136 dollars = 1.36 cents.</p>
       <p>A month = 5,000 × 0.0136 = <strong>68 dollars</strong> — nearly three
       times the budget. <strong>Does not fit.</strong></p>
       <p><strong>B — one relevant page.</strong> Input = 100 + 800 = 900 →
       0.0009. Output = 0.0015. One question ≈ 0.0024 dollars = 0.24 cents.</p>
       <p>A month = 5,000 × 0.0024 = <strong>12 dollars</strong>.
       <strong>Fits</strong>, with 13 dollars to spare.</p>
       <p>Same manual, same questions, same model — and one design is affordable
       while the other is not. What you choose to send is a budget decision, not
       just a technical one.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Can you afford the premium model?</strong> Take design B above
       (900 input, 300 output) and switch to the premium model (5 and 25). Still
       <strong>5,000 questions a month</strong>, still a
       <strong>25 dollar</strong> budget. Does it fit? If not, how many questions
       a month <em>would</em> fit?`,
      `<p>Input: 900 ÷ 1,000,000 × 5 = 0.0045 dollars.</p>
       <p>Output: 300 ÷ 1,000,000 × 25 = 0.0075 dollars.</p>
       <p>One question = 0.012 dollars = 1.2 cents — five times the small
       model's 0.24 cents.</p>
       <p>A month = 5,000 × 0.012 = <strong>60 dollars</strong>.
       <strong>Does not fit.</strong></p>
       <p>What would fit: 25 ÷ 0.012 ≈ <strong>2,080 questions a month</strong>.</p>
       <p>So the budget does not forbid the premium model — it forbids the
       premium model <em>at this volume</em>. You could serve a smaller group
       well, or a larger group more cheaply. That is a real product decision, and
       the arithmetic is what puts it in front of you.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Which lever do you pull?</strong> You are over budget and need to
       trim. Your bot handles <strong>4,000 questions a month</strong> on the
       small model. You can either cut <strong>200 tokens of input</strong> (send
       a little less document) or <strong>200 tokens of output</strong> (ask for
       shorter replies). Which saves more, and by how much?`,
      `<p>Cutting 200 <strong>input</strong> tokens: 200 ÷ 1,000,000 × 1 = 0.0002
       dollars a question → 4,000 × 0.0002 = <strong>0.80 dollars a month</strong>.</p>
       <p>Cutting 200 <strong>output</strong> tokens: 200 ÷ 1,000,000 × 5 = 0.001
       dollars a question → 4,000 × 0.001 = <strong>4 dollars a month</strong>.</p>
       <p>The same 200 tokens are worth <strong>5 times as much</strong> on the
       output side, because output is charged at 5 times the rate. When you need
       to trim, <strong>shorten the replies first</strong> — it is the cheapest
       change to make and the one that moves the bill most.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Leave yourself room.</strong> Your plan comes to
       <strong>38 dollars a month</strong> against a <strong>40 dollar</strong>
       budget. A colleague says that is too tight. Show why: what happens if real
       usage runs <strong>20 percent</strong> above your estimate? What should you
       have planned to instead?`,
      `<p>Twenty percent over: 38 × 1.2 = <strong>45.60 dollars</strong> — over
       budget by 5.60.</p>
       <p>To survive a 20 percent overrun you need a plan of
       40 ÷ 1.2 ≈ <strong>33 dollars</strong>, leaving about 7 dollars of
       headroom.</p>
       <p>Here is the point: every number you multiplied by was an
       <em>estimate</em>. You do not really know how many questions a month you
       will get. Being 5 percent wrong about token counts is harmless; being 20
       percent wrong about how many people show up is not. Plan to about
       three quarters of the budget so the estimate can be wrong and you are
       still fine.</p>`
    )}

    <p>Notice what changed from the last practice set. You are no longer
    reporting a number — you are making decisions with one: which model, how much
    to send, how long the replies run, how many users you can serve, and how much
    room to leave for being wrong. That is what it means to build to a budget.</p>
  `,
};
