/* ============================================================
   Section: Practice — budgeting a bot that remembers
   Third practice set in the Tokens & cost group, following
   budget-practice and preceding budget-studio. Same format the
   instructor asked for: pure HTML, no onMount, Toolkit.problem
   click-to-reveal.

   The NEW skill: budget arithmetic when history is resent every
   turn, and the SLIDING WINDOW as the tool that makes it fit.
   Chain across the three sets is: cost-practice = "what does it
   cost", budget-practice = "make it fit", this = "make it fit
   when the bill grows with the conversation".

   Continuity: reuses the 60-token question / 140-token reply from
   cost-practice problem 7, so students meet numbers they have
   already seen grow.

   KEY IDEA students can do by hand: with memory, the input per
   turn grows in a straight line, so the whole conversation =
   average of the first and last turn × number of turns. That is
   an arithmetic series, so the shortcut is EXACT, not an
   approximation — and it keeps a quadratic on paper-and-pencil.
   A window of W exchanges caps every turn past turn W, which
   turns the growth flat.

   GOTCHA: money-heavy → NO "$" glyph anywhere; money in the words
   "dollars"/"cents"; arithmetic in plain text with literal × ÷ ≈.
   Same illustrative rates (small 1/5 dollars per million in/out).
   ============================================================ */

window.SectionContent["budget-memory-practice"] = {
  title: "Practice: budgeting a bot that remembers",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Tokens &amp; cost · Practice</div>
    <h1>Practice: budgeting a bot that remembers</h1>

    <p>Every budget you have built so far assumed each question stands alone. Turn
    memory on and that stops being true: you resend the whole conversation every
    turn, so the twentieth message costs many times what the first one did. The
    bill no longer grows in a straight line with the number of turns — it grows
    faster than that. This set is about pricing that, and about the one setting
    that brings it back under control.</p>

    ${Toolkit.callout(
      `<strong>Everything you need:</strong>
       <ul>
         <li><strong>Our bot:</strong> each user message ≈ <strong>60 tokens</strong>,
         each reply ≈ <strong>140 tokens</strong>. So one full exchange adds
         <strong>200 tokens</strong> of history.</li>
         <li><strong>Input on turn k</strong> (remembering everything) =
         60 + (k − 1) × 200.</li>
         <li><strong>A whole conversation:</strong> the input grows by the same
         amount each turn, so total input =
         <strong>(first turn + last turn) ÷ 2 × number of turns</strong>. Averaging
         the two ends is exact here, not a guess.</li>
         <li><strong>Sliding window of W exchanges:</strong> once past turn W, every
         turn sends at most W × 200 + 60 — and never more.</li>
         <li><strong>Rates (small model):</strong> 1 dollar per million input, 5
         dollars per million output.</li>
       </ul>`,
      { label: "Cheat sheet" }
    )}

    ${Toolkit.problem(
      `<strong>How bad does it get?</strong> Our bot remembers everything. What
       does the app send on <strong>turn 1</strong>, and what does it send on
       <strong>turn 20</strong>? How many times bigger is turn 20?`,
      `<p>Turn 1 input = <strong>60 tokens</strong> — just the question.</p>
       <p>Turn 20 input = 60 + 19 × 200 = 60 + 3,800 = <strong>3,860 tokens</strong>.</p>
       <p>3,860 ÷ 60 ≈ <strong>64 times</strong> bigger.</p>
       <p>To the user, turn 20 looks exactly like turn 1 — same size question, same
       size answer. The difference is invisible to them and entirely yours to pay
       for.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Price a whole conversation.</strong> A user has a
       <strong>20-turn</strong> conversation with the bot above, small model.
       What does that one conversation cost? (Use the averaging shortcut for the
       input, and do not forget the replies.)`,
      `<p><strong>Input.</strong> First turn 60, last turn 3,860. Average =
       (60 + 3,860) ÷ 2 = 1,960 tokens per turn. Across 20 turns:
       1,960 × 20 = <strong>39,200 input tokens</strong>.</p>
       <p>Cost: 39,200 ÷ 1,000,000 × 1 = 0.0392 dollars.</p>
       <p><strong>Output.</strong> 20 replies × 140 = 2,800 tokens →
       2,800 ÷ 1,000,000 × 5 = 0.014 dollars.</p>
       <p>Total ≈ 0.0532 dollars ≈ <strong>5.3 cents</strong> for the
       conversation.</p>
       <p>Worth seeing what memory cost you: without it, input would have been
       20 × 60 = 1,200 tokens (0.0012 dollars) and the whole conversation about
       <strong>1.5 cents</strong>. Memory made this conversation
       <strong>more than three times</strong> as expensive — and the input part of
       the bill <strong>32 times</strong> as expensive.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Put a window on it.</strong> Now the bot keeps only the last
       <strong>5 exchanges</strong> and forgets anything older. What does it send
       on turn 20 now, compared with the 3,860 tokens it sent before?`,
      `<p>Turn 20 sends the 5 most recent exchanges plus the new question:
       5 × 200 + 60 = <strong>1,060 tokens</strong>.</p>
       <p>Down from 3,860 — about <strong>3.6 times</strong> smaller.</p>
       <p>And here is the part that matters more than the size: 1,060 is also what
       turn 50 would send, and turn 500. Past turn 5 the input
       <strong>stops growing</strong>. The window did not just make this turn
       cheaper; it put a ceiling on every turn that will ever follow.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Price the windowed conversation.</strong> Same 20-turn
       conversation, now with the 5-exchange window. What is the total input, and
       what does the conversation cost? (Turns 1 through 5 still grow normally;
       turns 6 onward are flat.)`,
      `<p><strong>Turns 1–5</strong> grow as before: 60, 260, 460, 660, 860 →
       sum = <strong>2,300 tokens</strong>.</p>
       <p><strong>Turns 6–20</strong> are 15 turns at 1,060 each →
       <strong>15,900 tokens</strong>.</p>
       <p>Total input = 2,300 + 15,900 = <strong>18,200 tokens</strong> →
       0.0182 dollars.</p>
       <p>Output is untouched by the window: still 0.014 dollars.</p>
       <p>Total ≈ 0.0322 dollars ≈ <strong>3.2 cents</strong>, down from 5.3
       cents — a <strong>40 percent</strong> cut to the conversation, from one
       setting.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Does the app fit?</strong> You expect
       <strong>2,000 conversations a month</strong> of about 20 turns each, and
       you have <strong>75 dollars a month</strong>. Check it both ways: with the
       5-exchange window, and without any window at all.`,
      `<p><strong>With the window</strong> (3.22 cents each):
       2,000 × 0.0322 = <strong>64.40 dollars</strong>. <strong>Fits</strong>, with
       about 10 dollars to spare.</p>
       <p><strong>Without a window</strong> (5.32 cents each):
       2,000 × 0.0532 = <strong>106.40 dollars</strong>.
       <strong>Over budget</strong> by more than 31 dollars.</p>
       <p>Same bot, same users, same model, same conversations. The window is the
       only difference between an app that fits and an app that does not.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Size the window to the budget.</strong> The budget is cut to
       <strong>50 dollars a month</strong>, still 2,000 conversations of 20 turns.
       A 5-exchange window costs 64.40 — too much. Try
       <strong>3 exchanges</strong> and <strong>2 exchanges</strong>. What is the
       largest window you can afford?`,
      `<p><strong>Window of 3.</strong> Turns 1–3: 60 + 260 + 460 = 780. Turns 4–20
       are 17 turns at 3 × 200 + 60 = 660 → 11,220. Total input = 12,000 tokens →
       0.012 dollars. Plus output 0.014 → 0.026 dollars a conversation.</p>
       <p>2,000 × 0.026 = <strong>52 dollars</strong> — over by 2. So close, and
       still no.</p>
       <p><strong>Window of 2.</strong> Turns 1–2: 60 + 260 = 320. Turns 3–20 are
       18 turns at 2 × 200 + 60 = 460 → 8,280. Total input = 8,600 tokens →
       0.0086 dollars. Plus output 0.014 → 0.0226 dollars a conversation.</p>
       <p>2,000 × 0.0226 = <strong>45.20 dollars</strong>. <strong>Fits</strong>,
       with about 5 dollars of headroom.</p>
       <p>So the answer is a <strong>2-exchange window</strong> — and you should
       feel a little uneasy about it, because that is a bot that remembers only
       the last two things you said. You did not find a free saving; you found the
       price of the budget, paid in how much the bot can remember. That is the
       trade you will have to defend.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Who is actually spending your money?</strong> Real users do not all
       chat the same amount. Say that out of every
       <strong>1,000 conversations</strong>, 900 run a quick
       <strong>4 turns</strong> and 100 run a long <strong>40 turns</strong>. With
       no window, find the input tokens for each kind, then the share of the bill
       the long ones account for.`,
      `<p><strong>A 4-turn conversation.</strong> Last turn = 60 + 3 × 200 = 660.
       Average = (60 + 660) ÷ 2 = 360. Total = 360 × 4 =
       <strong>1,440 tokens</strong>.</p>
       <p><strong>A 40-turn conversation.</strong> Last turn = 60 + 39 × 200 =
       7,860. Average = (60 + 7,860) ÷ 2 = 3,960. Total = 3,960 × 40 =
       <strong>158,400 tokens</strong>.</p>
       <p>Across 1,000 conversations: the short ones give
       900 × 1,440 = 1,296,000 tokens; the long ones give
       100 × 158,400 = 15,840,000 tokens. Altogether 17,136,000.</p>
       <p>The long conversations are <strong>10 percent</strong> of your traffic and
       <strong>92 percent</strong> of your input bill.</p>
       <p>This is why you cannot budget from the average conversation. Ten percent
       of your users are the budget; the typical user barely registers.</p>`
    )}

    ${Toolkit.problem(
      `<strong>What the window really buys.</strong> Same 1,000 conversations
       (900 short, 100 long), now with the <strong>5-exchange window</strong>. What
       happens to each kind, and to the total?`,
      `<p><strong>The 4-turn conversations do not change at all</strong> —
       1,440 tokens each. They never reach 5 exchanges, so the window never
       touches them.</p>
       <p><strong>The 40-turn conversations:</strong> turns 1–5 = 2,300; turns 6–40
       are 35 turns at 1,060 = 37,100. Total = <strong>39,400 tokens</strong>,
       down from 158,400.</p>
       <p>Across 1,000 conversations: 900 × 1,440 = 1,296,000, plus
       100 × 39,400 = 3,940,000. Altogether <strong>5,236,000 tokens</strong>,
       down from 17,136,000 — the input bill falls by about
       <strong>69 percent</strong>.</p>
       <p>Read that result carefully, because it is the whole argument for a
       window. It cut the bill by more than two thirds while
       <strong>doing nothing to 90 percent of your users</strong>. A window is not
       a tax on ordinary conversations — it is a ceiling on the rare runaway one,
       which is exactly where the money was going.</p>`
    )}

    <p>Three sets, three questions. What does it cost. Will it fit. And now: will
    it fit when the bill grows with every turn, and what do you give up to make
    it. The last one is the honest version of the job — a budget is rarely met by
    finding a saving nobody noticed, and usually met by choosing, on purpose,
    which good thing you can do without.</p>
  `,
};
