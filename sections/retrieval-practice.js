/* ============================================================
   Section: Practice — precision and recall
   Practice set for retrieval-evaluation, placed between it and
   rag-studio in the Retrieval (RAG) group. Pure HTML, no onMount,
   a row of Toolkit.problem click-to-reveal — but every problem is
   MULTIPLE CHOICE (A–D in the question, answer + "why not the
   others" in the solution). Instructor asked for MC so the set
   rehearses the paper exam format.

   The NEW idea vs retrieval-evaluation: the BEST POSSIBLE score.
   k caps what a perfect retrieval could get:
     best possible hits      = the smaller of k and relevant
     best possible precision = best hits ÷ k
     best possible recall    = best hits ÷ relevant
   Only k = relevant lets both reach 100%. The instructor's lab has
   students label every chunk of his syllabus, run a question, and
   score it — this set is the arithmetic for that.

   Distractor rule: every wrong choice is a SPECIFIC mistake (swapped
   denominators, dividing by all chunks, the junk share, the actual
   score where the best was asked, assuming 100% is always possible).
   Answers balanced 3 each across A/B/C/D. Percentages rounded to
   whole numbers. No currency glyph, no raw less-than, no KaTeX.
   ============================================================ */

window.SectionContent["retrieval-practice"] = {
  title: "Practice: precision and recall",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Retrieval (RAG) · Practice</div>
    <h1>Practice: precision and recall</h1>

    <p>Last section you measured retrieval with two questions: of what came back,
    how much was relevant, and of what was relevant, how much came back? This set
    drills that arithmetic, and adds one more idea you need before measuring your
    own app: <strong>the best score you could possibly get</strong>.</p>

    <h2>The best possible score</h2>
    <p>It's tempting to grade precision and recall against 100%. But the number of
    chunks you retrieve, <strong>k</strong>, can make 100% impossible.</p>
    <ul>
      <li>Say 4 chunks are relevant and you retrieve <strong>8</strong>. Even if
      retrieval is perfect and all 4 come back, the other 4 slots have to be filled
      with something. Precision can't beat 4 ÷ 8 = <strong>50%</strong>.</li>
      <li>Say 4 chunks are relevant and you retrieve <strong>2</strong>. Even if both
      are relevant, at least 2 relevant chunks get left out. Recall can't beat
      2 ÷ 4 = <strong>50%</strong>.</li>
    </ul>
    <p>So a score only means something next to its best possible value.</p>

    ${Toolkit.callout(
      `<strong>Everything you need:</strong>
       <ul>
         <li><strong>k</strong> — how many chunks were retrieved (Chroma's
         <em>Number of Results</em>).</li>
         <li><strong>Relevant</strong> — how many chunks the answer key marks as
         truly answering the question.</li>
         <li><strong>Hits</strong> — chunks that are both relevant and retrieved.</li>
         <li><strong>Precision</strong> = hits ÷ k</li>
         <li><strong>Recall</strong> = hits ÷ relevant</li>
         <li><strong>Best possible hits</strong> = the smaller of k and relevant
         (what a perfect retrieval would get).</li>
         <li><strong>Best possible precision</strong> = best possible hits ÷ k</li>
         <li><strong>Best possible recall</strong> = best possible hits ÷ relevant</li>
         <li>The number of <strong>not relevant</strong> chunks isn't in any
         formula. It tells you what <em>could</em> happen.</li>
       </ul>
       Round percentages to the nearest whole percent. Every problem is multiple
       choice: commit to an answer before you open the solution.`,
      { label: "Cheat sheet" }
    )}

    <h2>Scenario 1</h2>
    <p>You split a course syllabus into 20 chunks and ask, <em>"How is the course
    graded?"</em> Your answer key marks <strong>6 chunks relevant</strong> and
    <strong>14 not relevant</strong>. Number of Results is set to
    <strong>k = 4</strong>, and <strong>3</strong> of the 4 chunks that come back
    are relevant.</p>

    ${Toolkit.problem(
      `<p><strong>Scenario 1</strong> (6 relevant, 14 not relevant, k = 4, 3 hits).
       What is the <strong>precision</strong>?</p>
       <ol type="A">
         <li>50%</li>
         <li>75%</li>
         <li>15%</li>
         <li>25%</li>
       </ol>`,
      `<p><strong>B — 75%</strong></p>
       <p>Precision = hits ÷ k = 3 ÷ 4 = 75%. Of the 4 chunks that came back, 3 were
       relevant.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>50%</strong> is 3 ÷ 6 — dividing by the relevant chunks. That's
         recall.</li>
         <li><strong>15%</strong> is 3 ÷ 20 — dividing by every chunk in the store.
         Precision only asks about the chunks that came back.</li>
         <li><strong>25%</strong> is 1 ÷ 4 — the share that was junk, the opposite of
         precision.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 1</strong> (6 relevant, 14 not relevant, k = 4, 3 hits).
       What is the <strong>recall</strong>?</p>
       <ol type="A">
         <li>75%</li>
         <li>15%</li>
         <li>21%</li>
         <li>50%</li>
       </ol>`,
      `<p><strong>D — 50%</strong></p>
       <p>Recall = hits ÷ relevant = 3 ÷ 6 = 50%. Of the 6 chunks that could help,
       retrieval found 3.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>75%</strong> is 3 ÷ 4 — dividing by k. That's precision.</li>
         <li><strong>15%</strong> is 3 ÷ 20 — dividing by every chunk in the
         store.</li>
         <li><strong>21%</strong> is 3 ÷ 14 — dividing by the not-relevant chunks,
         which aren't in either formula.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 1</strong> (6 relevant, 14 not relevant, k = 4, 3 hits).
       What was the <strong>best possible precision</strong>?</p>
       <ol type="A">
         <li>100%</li>
         <li>75%</li>
         <li>67%</li>
         <li>30%</li>
       </ol>`,
      `<p><strong>A — 100%</strong></p>
       <p>Best possible hits = the smaller of k (4) and relevant (6) = 4. Best possible
       precision = 4 ÷ 4 = 100%. There are more relevant chunks than slots, so a
       perfect retrieval could fill every slot with a relevant one.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>75%</strong> is the precision this run <em>actually</em> got, not
         the best it could have got.</li>
         <li><strong>67%</strong> is 4 ÷ 6 — the right best-possible hits, divided by
         relevant instead of k. That's the best possible recall.</li>
         <li><strong>30%</strong> is 6 ÷ 20 — relevant chunks over all chunks, which
         has nothing to do with k.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 1</strong> (6 relevant, 14 not relevant, k = 4, 3 hits).
       What was the <strong>best possible recall</strong>?</p>
       <ol type="A">
         <li>100%</li>
         <li>50%</li>
         <li>67%</li>
         <li>20%</li>
       </ol>`,
      `<p><strong>C — 67%</strong></p>
       <p>Best possible hits = the smaller of 4 and 6 = 4. Best possible recall =
       4 ÷ 6 ≈ 67%. With only 4 slots, at least 2 of the 6 relevant chunks are always
       left out, no matter how good retrieval is.</p>
       <p>So this run's 50% recall isn't as bad as it looks: the ceiling was 67%, and
       it fell short by one chunk.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>100%</strong> assumes a perfect score is always reachable. With
         k smaller than the number of relevant chunks, it isn't.</li>
         <li><strong>50%</strong> is the recall this run actually got.</li>
         <li><strong>20%</strong> is 4 ÷ 20 — k over all chunks.</li>
       </ul>`
    )}

    <h2>Scenario 2</h2>
    <p>Same syllabus, new question: <em>"When is the final exam?"</em> This time the
    answer key marks <strong>3 chunks relevant</strong> and <strong>17 not
    relevant</strong>. Number of Results is set to <strong>k = 10</strong>, and
    <strong>2</strong> of the 10 chunks that come back are relevant.</p>

    ${Toolkit.problem(
      `<p><strong>Scenario 2</strong> (3 relevant, 17 not relevant, k = 10, 2 hits).
       What is the <strong>precision</strong>?</p>
       <ol type="A">
         <li>67%</li>
         <li>10%</li>
         <li>20%</li>
         <li>80%</li>
       </ol>`,
      `<p><strong>C — 20%</strong></p>
       <p>Precision = hits ÷ k = 2 ÷ 10 = 20%.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>67%</strong> is 2 ÷ 3 — dividing by relevant. That's recall.</li>
         <li><strong>10%</strong> is 2 ÷ 20 — dividing by every chunk in the
         store.</li>
         <li><strong>80%</strong> is 8 ÷ 10 — the share that was junk.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 2</strong> (3 relevant, 17 not relevant, k = 10, 2 hits).
       What is the <strong>recall</strong>?</p>
       <ol type="A">
         <li>67%</li>
         <li>20%</li>
         <li>10%</li>
         <li>12%</li>
       </ol>`,
      `<p><strong>A — 67%</strong></p>
       <p>Recall = hits ÷ relevant = 2 ÷ 3 ≈ 67%. One of the three relevant chunks
       never came back.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>20%</strong> is 2 ÷ 10 — dividing by k. That's precision.</li>
         <li><strong>10%</strong> is 2 ÷ 20 — dividing by every chunk in the
         store.</li>
         <li><strong>12%</strong> is 2 ÷ 17 — dividing by the not-relevant
         chunks.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 2</strong> (3 relevant, 17 not relevant, k = 10, 2 hits).
       What was the <strong>best possible precision</strong>?</p>
       <ol type="A">
         <li>100%</li>
         <li>20%</li>
         <li>15%</li>
         <li>30%</li>
       </ol>`,
      `<p><strong>D — 30%</strong></p>
       <p>Best possible hits = the smaller of k (10) and relevant (3) = 3. Best
       possible precision = 3 ÷ 10 = 30%. Only 3 relevant chunks exist, so even a
       perfect retrieval fills the other 7 slots with junk.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>100%</strong> assumes a perfect score is always reachable. With
         k bigger than the number of relevant chunks, it isn't.</li>
         <li><strong>20%</strong> is the precision this run actually got.</li>
         <li><strong>15%</strong> is 3 ÷ 20 — relevant over all chunks.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p><strong>Scenario 2</strong> (3 relevant, 17 not relevant, k = 10, 2 hits).
       What was the <strong>best possible recall</strong>?</p>
       <ol type="A">
         <li>67%</li>
         <li>100%</li>
         <li>30%</li>
         <li>50%</li>
       </ol>`,
      `<p><strong>B — 100%</strong></p>
       <p>Best possible hits = the smaller of 10 and 3 = 3. Best possible recall =
       3 ÷ 3 = 100%. With 10 slots there was room for all 3 relevant chunks, so
       missing one is a real miss.</p>
       <p>Compare Scenario 1: there, a low-looking recall was mostly the fault of a
       small k. Here the setting gave retrieval every chance.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>67%</strong> is the recall this run actually got.</li>
         <li><strong>30%</strong> is 3 ÷ 10 — the right best-possible hits, divided by
         k instead of relevant. That's the best possible precision.</li>
         <li><strong>50%</strong> is 10 ÷ 20 — k over all chunks.</li>
       </ul>`
    )}

    <h2>Using the best possible score</h2>

    ${Toolkit.problem(
      `<p>Two teams ask the Scenario 2 question (3 relevant chunks). <strong>Team
       A</strong> retrieves 10 chunks and gets all 3 relevant ones: precision 30%,
       recall 100%. <strong>Team B</strong> retrieves 4 chunks and gets 2 relevant
       ones: precision 50%, recall 67%.</p>
       <p>A classmate says Team A's retrieval did badly, since its precision was only
       30%. Is that fair?</p>
       <ol type="A">
         <li>Yes — most of what Team A retrieved was junk, so its retrieval was
         poor.</li>
         <li>Yes — Team B had the higher precision, so Team B's retrieval was
         better.</li>
         <li>No — with 10 retrieved and 3 relevant, 30% is the best precision
         possible.</li>
         <li>No — Team A's precision was really 3 ÷ 3 = 100%, not 30%.</li>
       </ol>`,
      `<p><strong>C</strong></p>
       <p>Team A: best possible hits = the smaller of 10 and 3 = 3, so best precision
       = 3 ÷ 10 = 30% and best recall = 3 ÷ 3 = 100%. Team A reached
       <strong>both</strong>. For its setting, retrieval was perfect.</p>
       <p>Team B: best possible hits = the smaller of 4 and 3 = 3, so best precision
       = 3 ÷ 4 = 75% and best recall = 100%. Team B got 50% and 67% — short on both.
       It had room for every relevant chunk and missed one.</p>
       <p>If there's a fair complaint about Team A, it's the <em>setting</em>: k = 10
       sends 7 junk chunks to the model on every question, which costs tokens. That's
       a reason to lower k, not evidence that retrieval failed.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>A</strong> grades against 100%. The junk was forced by k, not
         caused by bad retrieval.</li>
         <li><strong>B</strong> compares raw scores without their ceilings. Team B
         scored higher and still did worse against what was possible.</li>
         <li><strong>D</strong> divides by relevant instead of k. 3 ÷ 3 is Team A's
         recall.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p>A question has <strong>4 relevant</strong> chunks and <strong>16 not
       relevant</strong>. Which Number of Results lets a perfect retrieval score 100%
       on <strong>both</strong> precision and recall?</p>
       <ol type="A">
         <li>k = 1</li>
         <li>k = 4</li>
         <li>k = 10</li>
         <li>k = 20</li>
       </ol>`,
      `<p><strong>B — k = 4</strong></p>
       <p>When k equals the number of relevant chunks, best possible hits = 4, so best
       precision = 4 ÷ 4 = 100% and best recall = 4 ÷ 4 = 100%. It's the only k where
       both ceilings are 100%.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>k = 1</strong>: best precision is 1 ÷ 1 = 100%, but best recall is
         only 1 ÷ 4 = 25%. Retrieving less isn't automatically better.</li>
         <li><strong>k = 10</strong> (Chroma's default): best recall is 100%, but best
         precision is only 4 ÷ 10 = 40%.</li>
         <li><strong>k = 20</strong> retrieves everything, so recall is guaranteed
         100% — and best precision is only 4 ÷ 20 = 20%.</li>
       </ul>
       <p>In a real app, different questions have different numbers of relevant
       chunks, so no single Number of Results is right for all of them. That's why
       the trade-off never fully goes away.</p>`
    )}

    ${Toolkit.problem(
      `<p>You retrieve <strong>5</strong> chunks. Precision is <strong>60%</strong>
       and recall is <strong>50%</strong>. How many chunks does the answer key mark
       as relevant?</p>
       <ol type="A">
         <li>3</li>
         <li>5</li>
         <li>10</li>
         <li>6</li>
       </ol>`,
      `<p><strong>D — 6</strong></p>
       <p>Work backwards one formula at a time.</p>
       <p>Precision = hits ÷ k, so 60% = hits ÷ 5, and hits = 3.</p>
       <p>Recall = hits ÷ relevant, so 50% = 3 ÷ relevant. 3 is half of what
       number? Relevant = 6.</p>
       <p>Why not the others:</p>
       <ul>
         <li><strong>3</strong> is the number of hits — stopping one step early.</li>
         <li><strong>5</strong> is 3 ÷ 60%, which just gets k back.</li>
         <li><strong>10</strong> is 5 ÷ 50% — using k where hits belongs.</li>
       </ul>`
    )}

    ${Toolkit.problem(
      `<p>An answer key marks <strong>4 chunks relevant</strong> and <strong>6 not
       relevant</strong> (10 chunks in all). Which of these results
       <strong>could not</strong> happen?</p>
       <ol type="A">
         <li>Retrieve 9 chunks and get 2 hits</li>
         <li>Retrieve 6 chunks and get 0 hits</li>
         <li>Retrieve 10 chunks and get 4 hits</li>
         <li>Retrieve 3 chunks and get 3 hits</li>
       </ol>`,
      `<p><strong>A</strong></p>
       <p>9 retrieved with 2 hits means the other 7 were not relevant — but only 6
       not-relevant chunks exist. Retrieve 9 and at least 9 − 6 = 3 of them
       <em>must</em> be relevant.</p>
       <p>Why the others can happen:</p>
       <ul>
         <li><strong>B</strong>: all 6 not-relevant chunks come back and nothing else.
         A terrible retrieval, but a possible one.</li>
         <li><strong>C</strong>: retrieving all 10 chunks always gets all 4 relevant
         ones.</li>
         <li><strong>D</strong>: 3 hits is fine, since 4 relevant chunks exist.</li>
       </ul>
       <p>This is the one job of the not-relevant count: it isn't in any formula,
       but it tells you which results are possible.</p>`
    )}

    <p>The habit to keep: a precision or recall score means little on its own. Write
    down <strong>k</strong> and the <strong>number of relevant chunks</strong> next to
    every score you report, work out the best possible value, and judge the score
    against that.</p>
  `,
};
