/* ============================================================
   Section: Your first moves in Langflow
   A keyless, hands-on canvas lab. Students learn the mechanics —
   add, move, wire, run, inspect — and build flows that pass text
   through, transform it (Prompt Template), and read a file. No
   API key or model anywhere, so nothing can cost money or break.

   Tool facts verified vs docs.langflow.org (June 2026):
     - Add components by dragging from the components sidebar.
     - Pan = drag empty canvas; zoom via Canvas controls (Zoom to Fit).
     - Wire by dragging an OUTPUT port to an INPUT port; circular
       handles; port COLOR = data type (blue = Message); only
       matching colors connect.
     - Run one box = "Run component"; view result = "Inspect" /
       "Last Run". Playground runs a flow that has a Chat Input.
     - Prompt Template: typing {var} opens a new input port for it;
       outputs a Message; no model needed.
     - File component: loads a file; "Raw Content" output is a
       Message with the file's text; no model needed.
   ============================================================ */

window.SectionContent["langflow-canvas-basics"] = {
  title: "Your first moves in Langflow",

  html: `
    <div class="eyebrow">Building in Langflow · Section 3</div>
    <h1>Your first moves in Langflow</h1>

    <p>Langflow is installed and you reached the empty canvas. Now we get our
    hands moving. Before anyone drives a car, they find the pedals and practice
    in an empty parking lot — and that is exactly what this section is. We will
    learn the controls of Langflow by building a few tiny flows, and every one
    of them runs <strong>without an API key and without a model</strong>.</p>

    ${Toolkit.callout(
      `Nothing in this section uses a model or a key, so nothing here can cost
       money, leak anything, or break. Click around freely. If a flow gets
       messy, delete it and start a new one — there is no harm to do.`,
      { type: "note", label: "Relax — this is the parking lot" }
    )}

    <h2>The workspace, in three parts</h2>

    <p>When you open a blank flow, the screen has three regions worth naming:</p>

    <ul>
      <li><strong>The components sidebar</strong> (on the left) — a catalog of
      <em>boxes</em> you can use, sorted into groups like <strong>Core
      components</strong> and <strong>Bundles</strong>. There is a search bar at
      the top; when you want a box, the fastest path is to search for it by
      name.</li>
      <li><strong>The canvas</strong> (the big open middle) — the space where
      your flow lives. You drag boxes here and connect them.</li>
      <li><strong>The canvas controls</strong> — the zoom percentage and the
      <strong>Canvas controls</strong> button (look for <strong>Zoom to
      Fit</strong>, which frames your whole flow if you ever lose it
      off-screen). To slide the canvas around, click and drag any
      <em>empty</em> spot.</li>
    </ul>

    <h2>Activity 1 — add a box, move it, delete it</h2>

    <p>Let us just get something onto the canvas and push it around.</p>

    <ol class="steps">
      <li>Start a <strong>new flow</strong> (look for a "New Flow" or blank-flow
      option; if Langflow offers templates, choose the blank one).</li>
      <li>In the sidebar search, type <strong>chat</strong>. Find
      <strong>Chat Input</strong> and <strong>drag it onto the canvas</strong>.</li>
      <li><strong>Move it:</strong> click and drag the box to a new spot. Then
      drag an empty part of the canvas to slide everything around.</li>
      <li><strong>Zoom:</strong> scroll to zoom in and out, then click
      <strong>Canvas controls → Zoom to Fit</strong> to recenter.</li>
      <li><strong>Delete it:</strong> click the box to select it and press the
      Delete (or Backspace) key. Poof. Now drag a fresh <strong>Chat
      Input</strong> back on — we will use it next.</li>
    </ol>

    ${Toolkit.callout(
      `Adding and deleting boxes costs nothing and changes nothing permanent.
       A box only does something when you connect it up and run the flow — and
       even then, these particular boxes just move text around.`,
      { label: "Good to know" }
    )}

    <h2>Activity 2 — wire two boxes and run them</h2>

    <p>The simplest possible flow is two boxes: text comes in one end and goes
    out the other. It does nothing clever — it is a pipe — but building it
    teaches the two skills every flow needs: <strong>wiring</strong> and
    <strong>running</strong>.</p>

    <h3>How wiring works</h3>
    <p>Look closely at the edge of a box and you will see small
    <strong>circular handles</strong> — these are <strong>ports</strong>. An
    <strong>output</strong> port (the box sending text) is on its right; an
    <strong>input</strong> port (the box receiving text) is on its left. You
    connect two boxes by <strong>dragging from an output port to an input
    port</strong>, which draws a line between them.</p>

    <p>Ports are <strong>color-coded by the kind of data they carry</strong>. A
    <strong>blue</strong> port carries a <strong>Message</strong> — plain text,
    the kind we use most. Langflow will only let you connect <strong>matching
    colors</strong>: if two ports refuse to link, it is telling you those boxes
    do not speak the same kind of data. That is a feature, not you doing
    something wrong.</p>

    <ol class="steps">
      <li>Make sure you have a <strong>Chat Input</strong> on the canvas. Search
      the sidebar for <strong>chat</strong> again and drag on a <strong>Chat
      Output</strong> too. Place it to the right of Chat Input.</li>
      <li>Drag from <strong>Chat Input's output port</strong> (right side) to
      <strong>Chat Output's input port</strong> (left side). A line connects
      them.</li>
      <li>Click <strong>Playground</strong> (toward the top-right). The
      Playground is where you chat with a flow.</li>
      <li>Type a short message and send it. It comes straight back out — because
      all this flow does is carry your words from one end to the other.</li>
    </ol>

    ${Toolkit.callout(
      `You just built and ran your first flow. There is no intelligence in it
       yet — it only passes text through. But notice the shape: something goes
       in, something comes out. That is the skeleton every chatbot starts from.
       We are about to put a box in the middle that actually changes the text.`,
      { type: "ai", label: "What you just did" }
    )}

    <h2>Activity 3 — change the text along the way</h2>

    <p>A pipe that hands back exactly what you put in is not very exciting. Now
    we add a box <em>between</em> the two ends that transforms the text. We will
    build this:</p>

    <div class="flow-wrap">
      <svg class="flowsvg" viewBox="0 0 560 150" role="img"
           aria-label="Chat Input connects to Prompt, which connects to Chat Output">
        <rect x="12" y="50" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="82" y="76" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2430">Chat Input</text>
        <text x="82" y="94" text-anchor="middle" font-size="11" fill="#8a93a6">text in</text>

        <rect x="210" y="50" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="280" y="76" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2430">Prompt</text>
        <text x="280" y="94" text-anchor="middle" font-size="11" fill="#8a93a6">transforms it</text>

        <rect x="408" y="50" width="140" height="56" rx="12" fill="#ffffff" stroke="#e6e8ef"/>
        <text x="478" y="76" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2430">Chat Output</text>
        <text x="478" y="94" text-anchor="middle" font-size="11" fill="#8a93a6">text out</text>

        <line x1="152" y1="78" x2="210" y2="78" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="350" y1="78" x2="408" y2="78" stroke="#3b82f6" stroke-width="2.5"/>
        <circle cx="152" cy="78" r="5" fill="#3b82f6"/>
        <circle cx="210" cy="78" r="5" fill="#3b82f6"/>
        <circle cx="350" cy="78" r="5" fill="#3b82f6"/>
        <circle cx="408" cy="78" r="5" fill="#3b82f6"/>
      </svg>
    </div>

    <p>The box in the middle is the <strong>Prompt Template</strong> component
    (in the sidebar you may just see it called <strong>Prompt</strong>). Despite
    the name, on its own it does not call any AI — it is a
    <strong>fill-in-the-blank template</strong>. You write a sentence and leave a
    blank by wrapping a name in curly braces, like <code>{user_text}</code>.
    Once you save the template, Langflow adds a <strong>new input port</strong> to
    the box for that blank, ready to receive whatever should go in it.</p>

    <ol class="steps">
      <li>If your Chat Input and Chat Output are still wired together, delete the
      line between them (click the line, press Delete) to make room.</li>
      <li>Search the sidebar for <strong>prompt</strong> and drag a
      <strong>Prompt Template</strong> box onto the canvas, between the other
      two.</li>
      <li>Click the box to open it. In its <strong>Template</strong> field, type
      exactly:
      <br /><code>You said: “{user_text}”. Thanks for the message!</code></li>
      <li>Click <strong>Check &amp; Save</strong>. Langflow reads your template
      and adds a new input named <strong>user_text</strong> to the box — one
      input for each blank you left. (The new port only appears after you save,
      so don't go hunting for it before this step.)</li>
      <li>Wire <strong>Chat Input's output</strong> → the Prompt Template's
      <strong>user_text</strong> input.</li>
      <li>Wire the <strong>Prompt Template's output</strong> →
      <strong>Chat Output's</strong> input.</li>
      <li>Open the <strong>Playground</strong> and send the message
      <strong>hello</strong>.</li>
    </ol>

    <p>Out comes: <strong>You said: “hello”. Thanks for the message!</strong>
    The text went in, the flow wrapped it in your sentence, and a new piece of
    text came back.</p>

    ${Toolkit.callout(
      `Be honest with yourself about what happened: <strong>no AI wrote that
       sentence — you did.</strong> The Prompt box only dropped your word into
       the blank you left for it. But hold tightly onto this box, because it is
       the most important one in the whole course. When we finally add a real
       model, this is exactly how we will hand it its instructions. A "prompt"
       is just a fill-in-the-blank template — you have now met it before it
       could intimidate you.`,
      { type: "note", label: "What really happened" }
    )}

    ${Toolkit.problem(
      `Suppose you left the same template in place and typed
       <strong>good morning</strong> into the Playground instead. Write down the
       exact text you expect to come back, then check.`,
      `<p>You said: “good morning”. Thanks for the message!</p>
       <p>The box does not understand the words — it just places whatever you
       sent into the blank and hands back the finished sentence.</p>`,
      { label: "Predict, then check" }
    )}

    <h3>Try it yourself</h3>
    <p>Once that works, experiment — you cannot break anything. A couple of
    other keyless transformer boxes to swap in where the Prompt was:</p>
    <ul>
      <li><strong>Combine Text</strong> — joins two pieces of text into one,
      with a delimiter you choose (a space, a dash, a new line). Feed it two
      texts and see them merge.</li>
      <li><strong>Split Text</strong> — does the opposite: chops one long piece
      of text into smaller <em>chunks</em>. Paste in a paragraph, run it, and
      <strong>Inspect</strong> the result to see the pieces. (File this away —
      chopping text into chunks turns out to matter a great deal in a tool we
      build later.)</li>
    </ul>

    <h2>Activity 4 — read a file</h2>

    <p>So far the text has come from you typing. Often we want a flow to read
    text from somewhere else — a document on your computer, for instance. The
    <strong>Read File</strong> component does exactly that: it loads a file and
    turns its contents into text a flow can use.</p>

    <p><a href="sections/sample-note.txt" download>Download the sample note
    (sample-note.txt)</a> — or use any short <code>.txt</code> file you already
    have.</p>

    <ol class="steps">
      <li>Search the sidebar for <strong>file</strong> and drag the
      <strong>Read File</strong> component onto a fresh canvas. (In older Langflow
      versions this box was simply called <strong>File</strong>.)</li>
      <li>Click the component's <strong>Files</strong> control to upload, and
      choose the sample note (or your own text file).</li>
      <li>Click <strong>Run component</strong> on the box to load it.</li>
      <li>Click <strong>Inspect</strong> on the box to see its output. The
      <strong>Raw Content</strong> output holds the file's text — the whole note
      is now text inside your flow.</li>
    </ol>

    ${Toolkit.callout(
      `Look at the shape one more time: a file went in, and text came out — the
       same "something in, something out" picture as everything else. Pulling
       outside information <em>into</em> a flow as text is a quiet superpower.
       It is the seed of one of the most useful things we will build in this
       course.`,
      { type: "ai", label: "Why this matters" }
    )}

    <h2>Check yourself</h2>
    <p>Tick these off before moving on:</p>
    <ul class="checklist">
      <li><input type="checkbox" id="c1" /><label for="c1">I can add a box from
        the sidebar, move it, and delete it.</label></li>
      <li><input type="checkbox" id="c2" /><label for="c2">I connected two boxes
        by dragging from an output port to an input port.</label></li>
      <li><input type="checkbox" id="c3" /><label for="c3">I ran a flow in the
        Playground and saw text come back.</label></li>
      <li><input type="checkbox" id="c4" /><label for="c4">I used a Prompt box to
        change the text, and I understand it just fills in a blank.</label></li>
      <li><input type="checkbox" id="c5" /><label for="c5">I loaded a file and
        inspected its text.</label></li>
    </ul>

    <h2>What you accomplished</h2>
    <ul>
      <li>You learned the canvas controls: <strong>add</strong> boxes from the
      sidebar, <strong>move</strong> and <strong>delete</strong> them, and
      <strong>pan and zoom</strong> the canvas.</li>
      <li>You <strong>wired</strong> boxes together by dragging
      <strong>output port → input port</strong>, and learned that
      <strong>port color is the data type</strong> (blue is a text Message) — so
      only matching colors connect.</li>
      <li>You <strong>ran</strong> flows two ways: the whole flow in the
      <strong>Playground</strong>, and a single box with <strong>Run
      component</strong> + <strong>Inspect</strong>.</li>
      <li>You met the <strong>Prompt</strong> box — a fill-in-the-blank template
      — and saw a flow genuinely <strong>transform</strong> text, all without a
      model or a key.</li>
      <li>You used the <strong>Read File</strong> box to pull a document's text
      into a flow.</li>
    </ul>
  `,
};
