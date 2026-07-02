/* ============================================================
   Section: Practice — estimating cost
   A dedicated *-practice section (pure HTML, no onMount; a row of
   Toolkit.problem click-to-reveal). Instructor explicitly asked
   for hands-on cost MATH here — applied cost estimation is a real
   builder skill (pick a model, size a budget, judge viability).
   See [[course-goal-not-math]]: this is a welcome EXCEPTION —
   applied arithmetic in a practice section is fine; the steer is
   only about not framing the whole course as math.

   GOTCHA: money-heavy → NO "$" glyph anywhere; money in the words
   "dollars"/"cents"; arithmetic in plain text with literal × ÷ ≈.
   Rates are the same round illustrative examples as Section 16
   (small 1/5, premium 5/25 dollars per million in/out).
   ============================================================ */

window.SectionContent["cost-practice"] = {
  title: "Practice: estimating cost",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Tokens &amp; cost · Practice</div>
    <h1>Practice: estimating cost</h1>

    <p>Before shipping an app, builders actually run these numbers — to choose a
    model, set a budget, or decide whether an idea is affordable at all. Let us
    work through a set. Reveal each solution only after you have tried it.</p>

    ${Toolkit.callout(
      `<strong>Everything you need:</strong>
       <ul>
         <li><strong>Words to tokens:</strong> tokens ≈ words × 4 ÷ 3 (so 750
         words ≈ 1,000 tokens).</li>
         <li><strong>Cost of some tokens:</strong> (number of tokens ÷ 1,000,000)
         × the rate.</li>
         <li><strong>Total call:</strong> input cost + output cost.</li>
         <li><strong>Example rates (a small model):</strong> 1 dollar per million
         input tokens, 5 dollars per million output tokens. (A premium model: 5
         and 25.)</li>
         <li>We give answers in <strong>cents</strong> to keep them friendly
         (1 dollar = 100 cents).</li>
       </ul>`,
      { label: "Cheat sheet" }
    )}

    ${Toolkit.problem(
      `<strong>One call.</strong> Using the small model, a request sends
       <strong>3,000 input tokens</strong> and the model writes
       <strong>600 output tokens</strong>. What does that one call cost?`,
      `<p>Input: 3,000 ÷ 1,000,000 × 1 dollar = 0.003 dollars = <strong>0.3 cents</strong>.</p>
       <p>Output: 600 ÷ 1,000,000 × 5 dollars = 0.003 dollars = <strong>0.3 cents</strong>.</p>
       <p>Total = 0.3 + 0.3 = <strong>0.6 cents</strong>. (Barely more than half a cent.)</p>`
    )}

    ${Toolkit.problem(
      `<strong>From words.</strong> A prompt is <strong>750 words</strong> and the
       reply is <strong>300 words</strong>, on the small model. What does it cost?
       (Convert words to tokens first.)`,
      `<p>Input tokens ≈ 750 × 4 ÷ 3 = 1,000. Output tokens ≈ 300 × 4 ÷ 3 = 400.</p>
       <p>Input: 1,000 ÷ 1,000,000 × 1 = 0.001 dollars = 0.1 cents.</p>
       <p>Output: 400 ÷ 1,000,000 × 5 = 0.002 dollars = 0.2 cents.</p>
       <p>Total = <strong>0.3 cents</strong>.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Which end costs more?</strong> On the small model, a call has only
       <strong>200 input tokens</strong> but a long <strong>1,000-token
       reply</strong>. Find each cost, and say which dominates and why.`,
      `<p>Input: 200 ÷ 1,000,000 × 1 = 0.0002 dollars = 0.02 cents.</p>
       <p>Output: 1,000 ÷ 1,000,000 × 5 = 0.005 dollars = 0.5 cents.</p>
       <p>The <strong>reply dominates</strong> — it costs 25 times the prompt,
       even though it is only 5 times as many tokens, because output is charged at
       5 times the rate. Lesson: long, chatty replies are where the money goes.</p>`
    )}

    ${Toolkit.problem(
      `<strong>At scale.</strong> Suppose each question-and-answer costs about
       <strong>0.3 cents</strong> (from Problem 2). Your app answers
       <strong>4,000 questions a day</strong>. What is the daily cost, and roughly
       the monthly cost?`,
      `<p>Daily: 4,000 × 0.3 cents = 1,200 cents = <strong>12 dollars a day</strong>.</p>
       <p>Monthly (about 30 days): 12 × 30 = <strong>360 dollars a month</strong>.</p>
       <p>A third of a cent feels free — but multiplied by real traffic it becomes
       a genuine budget line. Scale is why cost is worth thinking about early.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Is premium worth it?</strong> A job uses <strong>2,000 input
       tokens</strong> and a <strong>500-token reply</strong>. Compute the cost on
       the small model (1 and 5) and on the premium model (5 and 25). How many
       times more is premium?`,
      `<p>Small: input 2,000 ÷ 1,000,000 × 1 = 0.002; output 500 ÷ 1,000,000 × 5 =
       0.0025; total = 0.0045 dollars = <strong>0.45 cents</strong>.</p>
       <p>Premium: input 2,000 ÷ 1,000,000 × 5 = 0.01; output 500 ÷ 1,000,000 × 25
       = 0.0125; total = 0.0225 dollars = <strong>2.25 cents</strong>.</p>
       <p>Premium is <strong>5 times</strong> more. If the small model does the job
       well, you would be paying 5 times as much for nothing.</p>`
    )}

    ${Toolkit.problem(
      `<strong>The document tax.</strong> A document bot answers questions about a
       15-page manual (≈ 12,000 tokens). Each question adds about
       <strong>100 tokens</strong>, and each reply is about
       <strong>300 tokens</strong>, on the small model. Compare, per question:
       (A) stuffing the <em>whole</em> manual into the prompt each time, versus
       (B) sending only the one relevant page (≈ 800 tokens). Then compare over
       <strong>10,000 questions</strong>.`,
      `<p><strong>A — whole manual.</strong> Input = 100 + 12,000 = 12,100 tokens.
       Input cost = 12,100 ÷ 1,000,000 × 1 = 0.0121 dollars. Output = 300 ÷
       1,000,000 × 5 = 0.0015. Total ≈ 0.0136 dollars ≈ <strong>1.36 cents</strong>
       per question. Over 10,000: ≈ <strong>136 dollars</strong>.</p>
       <p><strong>B — one relevant page.</strong> Input = 100 + 800 = 900 tokens.
       Input cost = 900 ÷ 1,000,000 × 1 = 0.0009. Output = 0.0015. Total ≈ 0.0024
       dollars ≈ <strong>0.24 cents</strong> per question. Over 10,000: ≈
       <strong>24 dollars</strong>.</p>
       <p>Sending only the relevant page saves about <strong>112 dollars</strong>
       across 10,000 questions — and it is also the only version that even fits in
       the context window. This is exactly why the next topic exists.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Chats get pricier as they go.</strong> On the small model, each new
       user message is about <strong>60 tokens</strong> and each reply about
       <strong>140 tokens</strong>. Because the whole history is resent every
       turn, compare the <em>input</em> cost of turn 1 versus turn 10.`,
      `<p>Turn 1 input = 60 tokens → 60 ÷ 1,000,000 × 1 = 0.00006 dollars ≈
       0.006 cents.</p>
       <p>Turn 10 input = the new 60 tokens plus 9 earlier exchanges of
       (60 + 140 = 200) each = 60 + 9 × 200 = 1,860 tokens → 1,860 ÷ 1,000,000 × 1
       = 0.00186 dollars ≈ 0.19 cents.</p>
       <p>Turn 10 costs about <strong>31 times</strong> as much to send as turn 1,
       for a message that looks identical to the user — because you resend the
       whole growing conversation each time.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Budgeting the class.</strong> You prepaid <strong>10 dollars</strong>
       (1,000 cents). If each student question costs about <strong>0.5 cents</strong>
       on the small model, how many questions does that cover? And on a premium
       model at about <strong>2.5 cents</strong> each?`,
      `<p>Small model: 1,000 ÷ 0.5 = <strong>2,000 questions</strong>.</p>
       <p>Premium model: 1,000 ÷ 2.5 = <strong>400 questions</strong>.</p>
       <p>The same prepaid budget buys <strong>5 times</strong> as many questions on
       the small model — which is exactly why we chose a small model and prepaid a
       little (Section 5). You can now size a budget for a real app.</p>`
    )}

    <p>These are the calculations behind real decisions: which model to use, how
    lean to keep prompts, whether to send a whole document or just the relevant
    part, and how far a budget will stretch. That last skill — sizing what an app
    will cost before you build it — is one every AI-app builder needs.</p>
  `,
};
