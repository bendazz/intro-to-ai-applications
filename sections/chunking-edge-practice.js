/* ============================================================
   Section: Practice — chunking edge cases (Split Text)
   Sits right after chunking-practice in the "Retrieval (RAG)" group.
   Same format: pure HTML, no onMount, a row of Toolkit.problem
   click-to-reveal.

   Written at the instructor's request after working through the
   first set: two things tripped the instructor up, so this set drills exactly
   those two and nothing else.
     1. WHEN A SEPARATOR COUNTS. Only between two atoms that are both
        in the buffer. A lone carried atom has none; popping an atom
        takes its separator with it; the separator that joins the
        carried atoms to the next atom is charged when that atom is
        added, not in the overlap test. (Problems 1-3.)
     2. CHUNK SIZE WINS. The pop loop also runs while the incoming
        atom would not fit beside what is left, so a tail that passes
        the overlap test can still be dropped. (Problems 4-6.)
   Problem 7 is a spot-the-mistake on idea 1, exam-shaped.

   VERIFIED: every atom length, buffer total, pop and chunk below was
   produced by an instrumented copy of langchain's _merge_splits and
   asserted equal to the REAL CharacterTextSplitter output (Langflow
   Desktop venv, keep_separator=False) on the exact strings quoted.
   Do not adjust a number here without re-running it.

   Uses the global `chunkDoc` helper defined in chunking-practice.js,
   which index.html loads immediately before this file.

   GOTCHA: no dollar-sign glyph anywhere (KaTeX pairing); inequalities are
   written in words.
   ============================================================ */

window.SectionContent["chunking-edge-practice"] = {
  title: "Practice: chunking edge cases",

  html: `
    ${(Toolkit.resetProblems(), "")}
    <div class="eyebrow">Retrieval (RAG) · Practice</div>
    <h1>Practice: chunking edge cases</h1>

    <p>The algorithm is the same as in the previous practice set. These problems
    aim at the two places where careful people still slip: <strong>when to count
    the separator</strong>, and <strong>what happens when the overlap and the Chunk
    Size disagree</strong>.</p>

    <p>As before, every number is real: these are the chunks Langflow actually
    produces.</p>

    ${Toolkit.callout(
      `<strong>1. When does a separator count?</strong> Only <em>between</em> two atoms
       that are both in the buffer.
       <ul>
         <li>A buffer holding one atom holds <strong>no</strong> separator.</li>
         <li>When you pop an atom off the front, its separator leaves with it.</li>
         <li>The separator that will join the carried atoms to the next atom is not
         part of the overlap. It is counted when that next atom is added.</li>
         <li>With Separator <code>\\n\\n</code>, each separator counts as
         <strong>2</strong>.</li>
       </ul>
       <strong>2. Chunk Size wins.</strong> After emitting a chunk, pop atoms off the
       front while the buffer is bigger than Chunk Overlap — <strong>or while the next
       atom still would not fit</strong> beside what is left. Overlap is a limit on
       how much <em>may</em> carry, not a promise that anything will.`,
      { label: "The two ideas" }
    )}

    ${Toolkit.problem(
      `<strong>A carried line that exactly fills the overlap.</strong> Separator
       <code>\\n</code>, Chunk Size <strong>45</strong>, Chunk Overlap
       <strong>18</strong>.
       ${chunkDoc(`Charge the batteries.
Label every cable.
Check the motors.
Pack the spare wheels.`)}
       Give the chunks and their lengths.`,
      `<p>Atoms: 21, 18, 17, 22.</p>
       <p>Buffer 21 → 21 + 18 + 1 = 40. Atom 3 would make 40 + 17 + 1 = 58, over 45.
       <strong>Emit chunk 1 = 40.</strong></p>
       <p>Pop while over 18: drop atom 1 — and the newline that joined it to atom 2 —
       so 40 − 21 − 1 = <strong>18</strong>. Stop: 18 is not over 18. Atom 2 is now
       alone in the buffer, so there is no newline left to count. The carried size is
       18, not 19.</p>
       <p>Add atom 3: 18 + 1 + 17 = 36. <em>That</em> +1 is the newline between
       "Label every cable." and "Check the motors." — it is counted now, as the
       buffer grows, not back in the overlap test.</p>
       <p>Atom 4 would make 36 + 22 + 1 = 59, over 45. <strong>Emit chunk 2 =
       36.</strong> Pop: 36 − 18 − 1 = 17, stop. Add atom 4: 17 + 1 + 22 = 40. End.
       <strong>Emit chunk 3 = 40.</strong></p>
       <p><strong>Three chunks: 40, 36, 40, each sharing one line with the one
       before.</strong></p>`
    )}

    ${Toolkit.problem(
      `<strong>Two lines that look like they fit.</strong> Separator
       <code>\\n</code>, Chunk Size <strong>50</strong>, Chunk Overlap
       <strong>20</strong>.
       ${chunkDoc(`Build night is Friday.
Code first
Test after
Clean up the bench after.`)}
       The two short lines are 10 characters each, and the overlap is 20. Do both of
       them carry into the second chunk?`,
      `<p>Atoms: 22, 10, 10, 25.</p>
       <p>Buffer 22 → 33 → 44. Atom 4 would make 44 + 25 + 1 = 70, over 50.
       <strong>Emit chunk 1 = 44.</strong></p>
       <p>Pop while over 20: drop atom 1 → 44 − 22 − 1 = <strong>21</strong>. Still
       over 20. The two lines are 10 + 10 = 20, but they are both in the buffer, so
       the newline <em>between</em> them counts: 10 + 1 + 10 = 21. Drop atom 2 →
       10. Stop.</p>
       <p>Add atom 4: 10 + 1 + 25 = 36. End. <strong>Emit chunk 2 = 36.</strong></p>
       <p><strong>Two chunks: 44 and 36. Only one line carries, not two.</strong></p>
       <p>Compare with the previous problem. There, one carried line with nothing
       beside it had no separator. Here, two carried lines have one separator between
       them, and that single character is what tips 20 into 21.</p>`
    )}

    ${Toolkit.problem(
      `<strong>A separator worth two.</strong> Separator <code>\\n\\n</code>, Chunk
       Size <strong>60</strong>, Chunk Overlap <strong>34</strong>. Four one-line
       paragraphs with blank lines between them:
       ${chunkDoc(`Doors open at six.

Bring your badge.

Sign the waiver.

No food at benches.`)}
       Give the chunks. How many paragraphs does chunk 2 share with chunk 1?`,
      `<p>Atoms: 18, 17, 16, 19. The blank lines are the separators, and each one is
       <strong>two</strong> characters (two newlines).</p>
       <p>Buffer 18 → 18 + 17 + 2 = 37 → 37 + 16 + 2 = 55. Atom 4 would make
       55 + 19 + 2 = 76, over 60. <strong>Emit chunk 1 = 55.</strong></p>
       <p>Pop while over 34: drop atom 1 → 55 − 18 − 2 = <strong>35</strong>. Still
       over 34 (17 + 2 + 16). Drop atom 2 → 16. Stop.</p>
       <p>Add atom 4: 16 + 2 + 19 = 37. End. <strong>Emit chunk 2 = 37.</strong></p>
       <p><strong>Two chunks: 55 and 37, sharing one paragraph.</strong></p>
       <p>Count that separator as 1 and you get 34 — not over 34 — and you would carry
       two paragraphs. Wrong by one character, and wrong about the overlap.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Fits the overlap, but not the chunk.</strong> Separator
       <code>\\n</code>, Chunk Size <strong>50</strong>, Chunk Overlap
       <strong>20</strong>.
       ${chunkDoc(`Meet at the lab.
Bring a laptop.
The competition rules are posted on the door.`)}
       Give the chunks. Does "Bring a laptop." appear twice?`,
      `<p>Atoms: 16, 15, 45.</p>
       <p>Buffer 16 → 32. Atom 3 would make 32 + 45 + 1 = 78, over 50.
       <strong>Emit chunk 1 = 32.</strong></p>
       <p>Pop while over 20: drop atom 1 → 15. The overlap test is satisfied —
       15 is not over 20 — so "Bring a laptop." is ready to carry.</p>
       <p>But atom 3 has to fit beside it: 15 + 1 + 45 = 61, over 50. It does not, so
       the pop loop keeps going. Drop atom 2 → 0.</p>
       <p>Add atom 3: 45. End. <strong>Emit chunk 2 = 45.</strong></p>
       <p><strong>Two chunks: 32 and 45, zero overlap.</strong> "Bring a laptop."
       appears only once.</p>
       <p>Keeping it would have produced a 61-character chunk with a Chunk Size of 50.
       Split Text will not do that just to keep an overlap: <strong>Chunk Size
       wins.</strong></p>`
    )}

    ${Toolkit.problem(
      `<strong>Room for one, not two.</strong> Separator <code>\\n</code>, Chunk
       Size <strong>50</strong>, Chunk Overlap <strong>25</strong>.
       ${chunkDoc(`Robotics club news.
Be early.
Bring gloves.
The drill press needs a sign-off.`)}
       Give the chunks, and say how many lines chunk 2 shares with chunk 1.`,
      `<p>Atoms: 19, 9, 13, 33.</p>
       <p>Buffer 19 → 29 → 43. Atom 4 would make 43 + 33 + 1 = 77, over 50.
       <strong>Emit chunk 1 = 43.</strong></p>
       <p>Pop while over 25: drop atom 1 → 43 − 19 − 1 = 23. The overlap test is
       satisfied with <em>two</em> lines, "Be early." and "Bring gloves."</p>
       <p>Does atom 4 fit beside them? 23 + 1 + 33 = 57, over 50. No — pop again.
       Drop atom 2 → 13. Now 13 + 1 + 33 = 47, which fits. Stop.</p>
       <p>Add atom 4: 47. End. <strong>Emit chunk 2 = 47.</strong></p>
       <p><strong>Two chunks: 43 and 47, sharing one line.</strong> The overlap
       allowed two lines; the Chunk Size only had room for one.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Landing exactly on the size.</strong> Separator <code>\\n</code>,
       Chunk Size <strong>40</strong>, Chunk Overlap <strong>15</strong>.
       ${chunkDoc(`Solder in pairs.
Wear goggles.
The fume fan must stay on.`)}
       After chunk 1 is emitted, does "Wear goggles." survive the second check?`,
      `<p>Atoms: 16, 13, 26.</p>
       <p>Buffer 16 → 30. Atom 3 would make 30 + 26 + 1 = 57, over 40.
       <strong>Emit chunk 1 = 30.</strong></p>
       <p>Pop while over 15: drop atom 1 → 13. Stop.</p>
       <p>Does atom 3 fit beside it? 13 + 1 + 26 = <strong>40</strong>. The question is
       whether that is <em>bigger than</em> 40, and it is not. It fits, so nothing
       more pops.</p>
       <p>Add atom 3: 40. End. <strong>Emit chunk 2 = 40.</strong></p>
       <p><strong>Two chunks: 30 and 40, sharing one line.</strong> Both checks in the
       pop loop are strictly "bigger than", just like the fit test.</p>`
    )}

    ${Toolkit.problem(
      `<strong>Spot the mistake.</strong> Separator <code>\\n</code>, Chunk Size
       <strong>45</strong>, Chunk Overlap <strong>22</strong>.
       ${chunkDoc(`Wipe the whiteboard.
Stack the chairs.
Lock the tool cabinet.
Turn off the lights.`)}
       A classmate's work: <em>"Atoms 20, 17, 22, 20. Chunk 1 = 38 (atoms 1–2). Pop
       to 17; atom 2 carries. Chunk 2 = 40 (atoms 2–3). Pop: drop atom 2, leaving
       atom 3. Atom 3 plus its newline is 23, which is over 22, so drop it too. Chunk
       3 = 20."</em> Which step is wrong, and what are the right chunks?`,
      `<p>The wrong step is <strong>"atom 3 plus its newline is 23"</strong>. Once atom
       2 is popped, atom 3 is alone in the buffer, and a lone atom has no separator.
       The buffer is 40 − 17 − 1 = <strong>22</strong>, which is not over 22. Atom 3
       carries.</p>
       <p>Check the Chunk Size too: 22 + 1 + 20 = 43, not over 45. It fits.</p>
       <p><strong>Three chunks: 38, 40, 43, each sharing one line with the one
       before.</strong></p>
       <p>The newline your classmate counted is real — but it belongs to chunk 3. It
       is the +1 in 22 + 1 + 20.</p>`
    )}

    <h2>What you can now do</h2>
    <ul class="checklist">
      <li><input type="checkbox" id="cep-1" /><label for="cep-1">Say whether a
        separator counts: only between two atoms that are both in the
        buffer.</label></li>
      <li><input type="checkbox" id="cep-2" /><label for="cep-2">Run both checks in
        the pop loop: over the overlap, or no room for the next atom.</label></li>
      <li><input type="checkbox" id="cep-3" /><label for="cep-3">Explain why a line
        that fits the overlap can still fail to carry.</label></li>
    </ul>
  `
};
