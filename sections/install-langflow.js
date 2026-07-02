/* ============================================================
   Section: Installing Langflow Desktop
   A hands-on setup lab. Installation is the #1 place beginners
   stall, so this section is deliberately gentle, OS-aware, and
   heavy on "did it work?" checks and troubleshooting.

   Tool facts verified against docs.langflow.org/get-started-
   installation and langflow.org/desktop (June 2026):
     - Desktop is a standalone app; bundles its own Python runtime.
     - macOS 13+ → .dmg ; Windows 11 (23H2+) → .msi
     - Download is gated behind a short contact form.
     - Windows may show a "C++ Build Tools Required!" error.
   ============================================================ */

window.SectionContent["install-langflow"] = {
  title: "Installing Langflow Desktop",

  html: `
    <div class="eyebrow">Foundations · Section 2</div>
    <h1>Installing Langflow Desktop</h1>

    <p>Here is an honest truth about every hands-on computing course: the
    hardest part is often the very first one — getting the tool installed.
    People who would have loved the course sometimes give up here, before
    they have built anything at all. So we are going to slow down and do this
    one carefully, together. Once Langflow is on your machine, it stays there,
    and you never have to think about this step again.</p>

    <p>You do <strong>not</strong> need any programming experience for this.
    You will not open a terminal, type a command, or install Python. If you
    can download an app and drag it into a folder, you can do this.</p>

    <h2>What Langflow Desktop is (and why we use it)</h2>

    <p><strong>Langflow</strong> is the tool we will build everything in this
    semester. It is a <em>visual</em> AI builder: instead of writing code, you
    drag boxes onto a canvas and connect them with lines. If that sounds
    familiar, it should — it is the "function machine" from
    <a href="#talking-to-ai">Section 1</a> made real. Each box does one job;
    the lines carry text from one box to the next.</p>

    <p>Langflow comes in a few flavors. <strong>Langflow Desktop</strong> is a
    single application you download and install like any other app. We choose
    it for this course for one reason: it <strong>bundles everything it needs
    inside itself</strong> — including its own copy of Python — so there is
    nothing to configure and no command line to fight with.</p>

    ${Toolkit.callout(
      `If you go searching online you will find other ways to run Langflow
       (installing it with a tool called "pip", or running it in "Docker").
       Ignore those for this course. They are for people comfortable at a
       command line, and they are an easy way to get stuck. We use
       <strong>Langflow Desktop</strong>, full stop.`,
      { type: "note", label: "Heads up" }
    )}

    <h2>Before you start</h2>

    ${Toolkit.callout(
      `<strong>Check these first:</strong>
       <ul>
         <li><strong>Your operating system is new enough.</strong> Langflow
         Desktop needs <strong>macOS 13 (Ventura) or later</strong>, or
         <strong>Windows 11 (build 23H2 or later)</strong>.</li>
         <li><strong>A solid internet connection.</strong> The download is a
         few hundred megabytes.</li>
         <li><strong>A little free disk space</strong> — a couple of gigabytes
         is plenty.</li>
         <li><strong>Nothing else to install.</strong> No Python, no Node, no
         extra tools. Desktop includes what it needs.</li>
       </ul>`,
      { label: "Before you start" }
    )}

    <h2>Install it</h2>

    <p>The steps differ a little by operating system. Pick yours:</p>

    <div class="controls" id="os-switch">
      <button class="btn" id="os-mac">macOS</button>
      <button class="btn ghost" id="os-win">Windows</button>
    </div>

    <div id="install-mac">
      <h3>On a Mac</h3>
      <ol class="steps">
        <li>Go to the Langflow Desktop page:
          <a href="https://www.langflow.org/desktop" target="_blank" rel="noopener">langflow.org/desktop</a>.</li>
        <li>Click <strong>Download Langflow</strong>. You will be asked for a
          little contact information (name and email) — fill it in, then click
          <strong>Download</strong>. A file ending in <strong>.dmg</strong>
          will download.</li>
        <li>Open the downloaded <strong>.dmg</strong> file (it is in your
          Downloads). A small window appears showing the Langflow icon next to
          your <strong>Applications</strong> folder.</li>
        <li><strong>Drag the Langflow icon onto the Applications folder.</strong>
          That copies it in. You can then close the window and eject the disk
          image.</li>
        <li>Open your <strong>Applications</strong> folder and double-click
          <strong>Langflow</strong> to launch it. The very first launch can
          take a minute while it sets itself up — that is normal, not frozen.</li>
      </ol>
      ${Toolkit.callout(
        `If macOS pops up a warning that it "cannot verify the developer" or
         will not open the app, don't panic — see the troubleshooting box
         below for the one-time fix.`,
        { type: "note", label: "If macOS blocks it" }
      )}
    </div>

    <div id="install-win" hidden>
      <h3>On Windows</h3>
      <ol class="steps">
        <li>Go to the Langflow Desktop page:
          <a href="https://www.langflow.org/desktop" target="_blank" rel="noopener">langflow.org/desktop</a>.</li>
        <li>Click <strong>Download Langflow</strong>. You will be asked for a
          little contact information (name and email) — fill it in, then click
          <strong>Download</strong>. A file ending in <strong>.msi</strong>
          will download.</li>
        <li>Open <strong>File Explorer</strong>, go to your
          <strong>Downloads</strong> folder, and double-click the
          <strong>.msi</strong> file.</li>
        <li>Follow the install wizard — click <strong>Next</strong> through the
          prompts and then <strong>Install</strong>.</li>
        <li>Launch <strong>Langflow</strong> from the Start menu. The very
          first launch can take a minute while it sets itself up — that is
          normal, not frozen.</li>
      </ol>
      ${Toolkit.callout(
        `<strong>Watch for this one.</strong> On some Windows machines, the
         first launch shows a <strong>"C++ Build Tools Required!"</strong>
         error. This is the single most common Langflow snag on Windows. It
         means your PC is missing a small piece Langflow needs. Follow the
         on-screen prompt to install <strong>Microsoft C++ Build Tools</strong>
         (it is free), or install Microsoft Visual Studio, then reopen
         Langflow. The troubleshooting box below has more.`,
        { type: "warn", label: "Common mistake" }
      )}
    </div>

    <h2>Check it worked</h2>

    <p>You will know the install succeeded when Langflow opens to its own
    window — not a web browser — showing a workspace where you can start a new
    flow. Tick these off:</p>

    <ul class="checklist">
      <li><input type="checkbox" id="chk1" /><label for="chk1">The Langflow
        app opens in its own window (no command line, no setup needed).</label></li>
      <li><input type="checkbox" id="chk2" /><label for="chk2">You can see a
        workspace with an option to create a <strong>new flow</strong> (or a
        list of starter templates).</label></li>
      <li><input type="checkbox" id="chk3" /><label for="chk3">Clicking to
        start a blank flow shows you an empty <strong>canvas</strong> — the
        open space where we will drag boxes next time.</label></li>
    </ul>

    ${Toolkit.callout(
      `If all three boxes are ticked, you are done — your build tool is ready
       and you will not have to do this again. Take a moment to poke around the
       empty canvas; you don't need to understand anything on it yet.`,
      { type: "ai", label: "You're set up" }
    )}

    <h2>If something went wrong</h2>

    <p>Almost every install hiccup is one of these. Find your symptom and click
    to see the fix.</p>

    ${Toolkit.problem(
      `<strong>macOS:</strong> "Langflow can't be opened because Apple cannot
       check it for malicious software," or it just won't open.`,
      `<p>This is macOS being cautious about apps downloaded from the web, not
       a problem with Langflow. The one-time fix: in your
       <strong>Applications</strong> folder, <strong>right-click</strong> (or
       Control-click) the Langflow icon, choose <strong>Open</strong>, and then
       click <strong>Open</strong> again in the dialog. After you do this once,
       it opens normally forever after.</p>`,
      { label: "Mac won't open it" }
    )}

    ${Toolkit.problem(
      `<strong>Windows:</strong> a <strong>"C++ Build Tools Required!"</strong>
       error appears.`,
      `<p>Langflow needs a small standard component called a C++ compiler that
       isn't on every Windows machine. Follow the on-screen prompt to install
       <strong>Microsoft C++ Build Tools</strong> (free from Microsoft), or
       install Microsoft Visual Studio if you have it. When that finishes,
       reopen Langflow and it should start normally.</p>`,
      { label: "Windows C++ error" }
    )}

    ${Toolkit.problem(
      `It opened, but it seems <strong>stuck on a loading screen</strong> the
       first time.`,
      `<p>The first launch unpacks and starts Langflow's bundled engine, which
       can take a minute or two — longer on an older or slower machine. Give it
       a little time before deciding it is stuck. If it genuinely never
       finishes, quit the app completely and open it again.</p>`,
      { label: "Stuck loading" }
    )}

    ${Toolkit.problem(
      `Do I need to install <strong>Python</strong> (or anything else) first?`,
      `<p>No. This trips up people who have read other tutorials. Langflow
       Desktop carries its own copy of Python inside it. You install the one
       app and nothing else.</p>`,
      { label: "Need Python?" }
    )}

    ${Toolkit.problem(
      `The website offered me <strong>several options</strong> — which do I
       download?`,
      `<p>Always choose <strong>Langflow Desktop</strong> for your operating
       system: the <strong>.dmg</strong> on a Mac, the <strong>.msi</strong> on
       Windows. If a page is showing you commands to type, or mentions "pip" or
       "Docker," you are on the wrong path for this course — back up and look
       for the Desktop download.</p>`,
      { label: "Which download?" }
    )}

    <h2>What you accomplished</h2>
    <ul>
      <li>You installed <strong>Langflow Desktop</strong>, the no-code AI
      builder we will use for the rest of the course.</li>
      <li>You learned that Desktop is <strong>self-contained</strong> — it
      bundles its own Python, so there was nothing else to install and no
      command line involved.</li>
      <li>You know the two classic snags and their fixes: the macOS
      "unidentified developer" prompt (right-click → Open), and the Windows
      <strong>C++ Build Tools</strong> error (install the free tools, then
      relaunch).</li>
      <li>You confirmed it works by reaching an <strong>empty canvas</strong> —
      the blank space where we will build our first flow.</li>
    </ul>
  `,

  onMount(root) {
    /* ---- OS switcher: show the steps for the chosen platform ---- */
    const macBtn = root.querySelector("#os-mac");
    const winBtn = root.querySelector("#os-win");
    const macPanel = root.querySelector("#install-mac");
    const winPanel = root.querySelector("#install-win");

    function show(os) {
      const mac = os === "mac";
      macPanel.hidden = !mac;
      winPanel.hidden = mac;
      macBtn.classList.toggle("ghost", !mac);
      winBtn.classList.toggle("ghost", mac);
    }

    macBtn.addEventListener("click", () => show("mac"));
    winBtn.addEventListener("click", () => show("win"));

    // Default to the visitor's likely OS so the right steps show first.
    const ua = (navigator.userAgent || "") + " " + (navigator.platform || "");
    show(/Win/i.test(ua) ? "win" : "mac");
  },
};
