/* ============================================================
   Section: Studio project 4 — build, measure & tune a RAG app
   Fourth group studio (see [[studios-are-recurring]]); capstone of
   the RAG block. Synthesizes the whole block: full RAG build
   (S19-24) + retrieval evaluation precision/recall (S25) + grounding
   & honesty (S12/S24, not-in-document test S14) + testing/rubric
   (S10/S14) + cost (S16-18).

   SIGNATURE new dimension vs the S14 document studio: teams don't
   EYEBALL it — they MEASURE retrieval (recall/precision on an answer
   key) and TUNE the knobs (chunk size, overlap, Number of Results)
   against the numbers, then re-measure. "Feels better" -> "recall
   6/10 -> 9/10." That's the engineering muscle.

   Follows the established studio pattern: scenario switcher (onMount,
   A/B/C), test buckets incl. not-in-document, .dist-table rubric,
   group red-team (2 attacks), curveball, deliverables checklist,
   closing "this is the job" callout. Scenarios use REAL big docs
   (RAG only matters when the doc is too big to paste).

   Pure HTML + scenario-switcher onMount. No "$" glyph (cost in words),
   no KaTeX. No new CSS (reuses .widget/.controls/.btn/.dist-table/
   .checklist/.steps/.callout).
   ============================================================ */

window.SectionContent["rag-studio"] = {
  title: "Studio: build & tune a RAG app",

  html: `
    <div class="eyebrow">Retrieval (RAG) · Section 26 · Studio</div>
    <h1>Studio project: build, measure, and tune a RAG assistant</h1>

    <p>This is the capstone of everything we've done with retrieval. You've built a
    RAG chatbot and learned how to tell whether its retrieval is any good. Now you'll
    do the whole job on a <strong>real, big document</strong> — one far too large to
    paste into a prompt. Build it, and then do the part that separates a demo from an
    engineered product: <strong>measure it, tune it, and prove you can trust it.</strong></p>

    <h2>What makes this studio different</h2>
    <p>The document studio back in Section 14 asked "does it seem good?" This one
    asks "<strong>how good is it, in numbers, and can you make it better on
    purpose?</strong>" You'll put a recall figure on your retrieval, change a setting,
    and watch the number move. That's the difference between guessing and
    engineering.</p>

    <h2>How the studio works</h2>
    <ol class="steps">
      <li><strong>Pick a scenario</strong> — each comes with a big document and a job
      to do.</li>
      <li><strong>Build the RAG flow</strong> — the full pipeline from Sections 23–24:
      load → split → embed → store, then retrieve → parse → prompt → answer, grounded
      and honest.</li>
      <li><strong>Write a test set</strong> — questions in the buckets below.</li>
      <li><strong>Measure retrieval</strong> — build an answer key and compute recall
      (and precision) the way you did in Section 25.</li>
      <li><strong>Tune and re-measure</strong> — adjust chunk size, overlap, and
      Number of Results; run the numbers again.</li>
      <li><strong>Judge the answers</strong> — grade quality with the rubric.</li>
      <li><strong>Group round</strong> — red-team another team, then take the
      curveball.</li>
    </ol>

    <h2>Your test set: four kinds of question</h2>
    <ul>
      <li><strong>Easy lookups</strong> — the answer sits plainly in one chunk.
      Retrieval should nail these.</li>
      <li><strong>Hard &amp; reworded</strong> — the answer exists but is phrased
      nothing like your question, or is spread across a couple of chunks. This is the
      real test of retrieval-by-meaning and recall.</li>
      <li><strong>Not in the document</strong> ⭐ — the honesty test. The bot must
      admit it doesn't know instead of inventing an answer.</li>
      <li><strong>Decoys</strong> — a question whose words look a lot like some
      <em>wrong</em> passage, to see whether retrieval grabs the look-alike instead of
      the truly relevant chunk.</li>
    </ul>

    <h2>Your scenario</h2>
    <div class="controls" id="rs-switch">
      <button class="btn" id="rs-1">Handbook helper</button>
      <button class="btn ghost" id="rs-2">Manual bot</button>
      <button class="btn ghost" id="rs-3">Bring your own</button>
    </div>

    <div id="rs-scenario-1" class="widget">
      <div class="widget-title">Scenario A — The Handbook Helper</div>
      <ul>
        <li><strong>The job:</strong> answer questions from a long handbook — a
        student handbook, club or HOA rules, an employee policy manual (30+ pages).</li>
        <li><strong>Get a real one:</strong> your school's handbook, a syllabus plus
        course policies, or any lengthy rules document you can download as a
        <code>.pdf</code> or <code>.txt</code>.</li>
        <li><strong>Why it's a RAG job:</strong> nobody can paste the whole handbook
        into a prompt, and the answer to "how many absences are allowed?" hides on one
        page out of forty.</li>
        <li><strong>Watch for:</strong> handbooks repeat similar wording in many
        places — perfect for building decoy questions.</li>
      </ul>
    </div>

    <div id="rs-scenario-2" class="widget" hidden>
      <div class="widget-title">Scenario B — The Manual Bot</div>
      <ul>
        <li><strong>The job:</strong> a support bot for a long product manual — an
        appliance, a camera, a piece of software.</li>
        <li><strong>Get a real one:</strong> download a real product manual PDF (they
        are easy to find and often 50+ pages).</li>
        <li><strong>Why it's a RAG job:</strong> the classic "the answer is on page
        47" problem. Troubleshooting questions ("it won't turn on") must find the
        right section fast.</li>
        <li><strong>Watch for:</strong> manuals are full of tables and diagrams —
        expect messy chunks, and lean on your wrangling skills from Section 13.</li>
      </ul>
    </div>

    <div id="rs-scenario-3" class="widget" hidden>
      <div class="widget-title">Scenario C — Bring your own knowledge base</div>
      <ul>
        <li><strong>The job:</strong> pick a real, sizeable document (or a few) and a
        real purpose — a textbook chapter, a long report, a set of articles, game
        rules.</li>
        <li><strong>Make it a true RAG job:</strong> choose something clearly too big
        to hand over whole. The bigger and messier, the more retrieval earns its
        keep.</li>
        <li><strong>Then:</strong> build, measure, tune, and prove it — same as the
        others.</li>
      </ul>
    </div>

    <h2>Measure it — the heart of this studio</h2>
    <p>Turn "seems fine" into a number:</p>
    <ol class="steps">
      <li>For each test question, decide which chunk(s) truly hold the answer — your
      <strong>answer key</strong>.</li>
      <li>Run the question and see which chunks retrieval actually returned.</li>
      <li>Count the <strong>hits</strong>, then compute <strong>recall</strong> (of
      the relevant chunks, how many came back) and <strong>precision</strong> (of
      what came back, how many were relevant).</li>
      <li>Tally recall across your whole test set. That single figure — say, seven in
      ten — is your retrieval's report card.</li>
    </ol>

    ${Toolkit.callout(
      `Remember which number to chase: for RAG, <strong>recall comes first</strong>.
       If the answer never gets retrieved, the model cannot use it — no prompt wording
       saves you. Precision matters for cost and noise, but a missed answer is the
       fatal one.`,
      { type: "ai", label: "Chase recall first" }
    )}

    <h2>Tune it — then measure again</h2>
    <p>You have three knobs, and now a number to turn them against. Change one at a
    time and re-measure:</p>
    <ul>
      <li><strong>Chunk size</strong> — too big blurs the point and wastes tokens; too
      small splits answers across chunks (Section 21).</li>
      <li><strong>Overlap</strong> — a little helps ideas that straddle a seam survive
      (Section 22).</li>
      <li><strong>Number of Results</strong> — retrieve more to lift recall (at the
      cost of precision and tokens), fewer to tighten precision (Section 25).</li>
    </ul>
    <p>Your goal isn't a perfect score — it's to make a change, justify it with the
    numbers, and know <em>why</em> recall moved.</p>

    <h2>Grade the answers</h2>
    <p>Retrieval is half the story; the answer still has to be good. Score each dimension
    weak (0), okay (1), or strong (2):</p>
    <table class="dist-table">
      <thead>
        <tr><th>Dimension</th><th>What you're checking</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Retrieved the right chunk</strong></td><td>Did the answer key chunk actually come back? (your recall)</td></tr>
        <tr><td><strong>Grounded</strong></td><td>Does the answer use the retrieved context, not invented facts?</td></tr>
        <tr><td><strong>Honest about gaps</strong></td><td>On not-in-document questions, does it admit it doesn't know?</td></tr>
        <tr><td><strong>Accurate &amp; complete</strong></td><td>Is the answer correct and does it cover the question?</td></tr>
        <tr><td><strong>Efficient</strong></td><td>Is it retrieving a sane number of chunks, not a pile of junk?</td></tr>
      </tbody>
    </table>

    <h2>The curveball</h2>
    <p>Real knowledge bases change and real budgets tighten. Partway through, take one:</p>
    <ul>
      <li><strong>The document grew.</strong> A new section (or a second document) gets
      added. Reload the store and re-measure — did recall hold up, or did the new
      material change what gets retrieved?</li>
      <li><strong>Cut the cost.</strong> Halve your Number of Results to save tokens.
      What happens to recall? Is the trade worth it? Defend your choice.</li>
    </ul>

    <h2>The group round: red-team on two fronts</h2>
    <p>Swap apps with another team and attack both halves of RAG:</p>
    <ul>
      <li><strong>Break retrieval:</strong> find a question whose answer is genuinely
      in their document but that their bot <em>can't</em> retrieve — a recall miss.</li>
      <li><strong>Break honesty:</strong> get their bot to confidently answer something
      that isn't in the document at all.</li>
    </ul>
    <p>The strongest app is the one that's hardest to break on both — high recall
    <em>and</em> honest about what it doesn't know.</p>

    <h2>Before you call it done</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="rgs-1" /><label for="rgs-1">A working RAG app on a
        real, big document (load → retrieve → grounded, honest answer).</label></li>
      <li><input type="checkbox" id="rgs-2" /><label for="rgs-2">A test set with all
        four question kinds, including not-in-document and decoys.</label></li>
      <li><input type="checkbox" id="rgs-3" /><label for="rgs-3">An answer key and a
        measured <strong>recall</strong> figure for your test set.</label></li>
      <li><input type="checkbox" id="rgs-4" /><label for="rgs-4">At least one tuning
        change, justified by how the number moved.</label></li>
      <li><input type="checkbox" id="rgs-5" /><label for="rgs-5">Grounding and honesty
        graded, the curveball handled, and the red-team survived.</label></li>
    </ul>

    ${Toolkit.callout(
      `This is what the job actually looks like: not "I built a chatbot," but "I built
       it, measured that it retrieves the right thing eight times in ten, tuned it up
       from six, and it admits when it doesn't know." Building it is the start.
       Measuring and improving it — on purpose, with evidence — is the work.`,
      { label: "This is the job" }
    )}
  `,

  onMount(root) {
    const items = [
      { b: root.querySelector("#rs-1"), p: root.querySelector("#rs-scenario-1") },
      { b: root.querySelector("#rs-2"), p: root.querySelector("#rs-scenario-2") },
      { b: root.querySelector("#rs-3"), p: root.querySelector("#rs-scenario-3") },
    ];
    function show(idx) {
      items.forEach((x, i) => {
        x.p.hidden = i !== idx;
        x.b.classList.toggle("ghost", i !== idx);
      });
    }
    items.forEach((x, i) => x.b.addEventListener("click", () => show(i)));
    show(0);
  },
};
