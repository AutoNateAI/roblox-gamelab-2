export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Program", href: "/programs/ai-agent-systems", keys: ["programs"] },
  { label: "Live Builds", href: "/live-builds", keys: ["live-builds"] },
  { label: "Consulting", href: "/consulting", keys: ["consulting"] },
  { label: "Tutorials", href: "/tutorials", keys: ["tutorials"] },
  { label: "Community", href: "/community", keys: ["community"] },
  { label: "About", href: "/about", keys: ["about"] },
  { label: "Articles", href: "/articles", keys: ["articles"] },
];

// The 39 institutional affiliations behind MatrAIx (arXiv:2608.04205, Aug 2026) —
// 93 researchers simulating 8.3B AI personas — collapse to 36 distinct universities
// once you merge sub-schools (Harvard Business/Medical School, Wharton) into their
// parent university. Used on the program page as evidence that frontier agentic-AI
// research is already coming out of these schools' labs, faster than intro CS
// sequences can teach it. `featured` marks Nathan's alma mater.
export const targetUniversities = [
  { name: "University of Michigan", featured: true },
  { name: "Harvard University" },
  { name: "Massachusetts Institute of Technology" },
  { name: "Stanford University" },
  { name: "University of California, Berkeley" },
  { name: "Carnegie Mellon University" },
  { name: "Princeton University" },
  { name: "University of Pennsylvania" },
  { name: "Cornell University" },
  { name: "Columbia University" },
  { name: "University of Southern California" },
  { name: "Georgia Institute of Technology" },
  { name: "University of Texas at Austin" },
  { name: "University of Illinois Urbana-Champaign" },
  { name: "Johns Hopkins University" },
  { name: "University of Washington" },
  { name: "University of Wisconsin-Madison" },
  { name: "Purdue University" },
  { name: "University of Oxford" },
  { name: "New York University" },
  { name: "Brown University" },
  { name: "University of Toronto" },
  { name: "The Ohio State University" },
  { name: "Boston University" },
  { name: "Pennsylvania State University" },
  { name: "University of Maryland, College Park" },
  { name: "University of California, San Diego" },
  { name: "University of California, Irvine" },
  { name: "University of California, Riverside" },
  { name: "University of California, Santa Cruz" },
  { name: "University at Buffalo" },
  { name: "University of San Francisco" },
  { name: "University of North Carolina at Chapel Hill" },
  { name: "University of Pittsburgh" },
  { name: "Arizona State University" },
  { name: "Medical University of South Carolina" },
];

// Consulting offerings for AutoNateAI's community/regional banking vertical.
// Each maps a real daily workflow stress inside a bank to what AutoNateAI does
// about it, priced as fixed-scope engagements (not hourly), sized for a bank's
// budget rather than an enterprise vendor contract.
export const bankingOfferings = [
  {
    icon: "fact_check",
    name: "Bank AI & Workflow Assessment",
    hook: "Leadership knows AI probably matters. Nobody can point to where it actually pays off inside this bank.",
    capabilities: [
      "Interview lending, deposit, compliance, and ops teams",
      "Map the real systems, data, and manual handoffs in use today",
      "Model where AI and simulation create measurable ROI",
      "Deliver a ranked, priced roadmap — not a slide deck of buzzwords",
    ],
    transformation: "“We should probably use AI” becomes a ranked list of specific, priced opportunities.",
    priceLow: 7500,
    priceHigh: 15000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "account_balance",
    name: "Commercial Lending Intelligence",
    hook: "Loan officers dig through financials, collateral files, and relationship notes by hand on every deal and every renewal.",
    capabilities: [
      "Simulate the lending workflow end to end before touching production",
      "Build document extraction and portfolio-concentration dashboards",
      "Flag renewal and concentration risk before it's a surprise",
      "Decision-support tooling — the human still signs off",
    ],
    transformation: "Fragmented loan files become structured, searchable lending intelligence.",
    priceLow: 15000,
    priceHigh: 40000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "description",
    name: "Document & Call Intelligence",
    hook: "Employees read long loan packages, policy binders, and call notes that a machine could process in seconds.",
    capabilities: [
      "Classification and structured-extraction pipelines",
      "PII-aware redaction and controlled data handling by design",
      "Built on document/call-processing R&D from Veterans United's AI team",
      "Human review built into every workflow, never bypassed",
    ],
    transformation: "Hours of manual document handling become minutes of reviewed, machine-assisted processing.",
    priceLow: 12500,
    priceHigh: 35000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "groups",
    name: "Deposit & Customer Ops Intelligence",
    hook: "Front-line staff bounce between three systems to answer one customer question.",
    capabilities: [
      "Analyze service and account workflows",
      "Simulate customer journeys before you change anything live",
      "Build internal assistants that surface the right context fast",
      "Segment the accounts worth proactive outreach",
    ],
    transformation: "Reactive service becomes information-rich, faster service.",
    priceLow: 12500,
    priceHigh: 30000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "shield",
    name: "Fraud & Risk Simulation Lab",
    hook: "Your team finds out a workflow has a hole in it only after something has already slipped through.",
    capabilities: [
      "Build synthetic customer/employee scenarios and run them against real workflows",
      "Surface failure points before they hit production",
      "Anomaly and risk dashboards your team actually checks",
      "Test process changes safely, without touching live customers",
    ],
    transformation: "Reactive risk management becomes controlled, repeatable scenario testing.",
    priceLow: 15000,
    priceHigh: 40000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "policy",
    name: "Compliance & Policy Intelligence",
    hook: "Someone always has to go find where a rule lives, then prove why a decision followed it.",
    capabilities: [
      "Evidence-linked policy search employees can actually trust",
      "Controlled AI extraction that cites its source and abstains when unsure",
      "Audit trails built in, not bolted on after the fact",
      "Human approval stays in the loop on anything that matters",
    ],
    transformation: "“Where's that rule?” becomes traceable, defensible policy intelligence.",
    priceLow: 15000,
    priceHigh: 35000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "insights",
    name: "Executive & Market Intelligence",
    hook: "Leadership is reading a static quarterly report about a market that changes every week.",
    capabilities: [
      "Combine Census, economic, and local-industry data with your branch footprint",
      "Model which local industries and employers are actually expanding",
      "Simulate how a market or lending shift plays out before it happens",
      "Living dashboards instead of a report that's stale by the time it's printed",
    ],
    transformation: "Scattered external data becomes a continuously updated model of the markets you serve.",
    priceLow: 10000,
    priceHigh: 25000,
    priceUnit: "Fixed scope",
  },
  {
    icon: "code",
    name: "Custom Banking Software",
    hook: "Your core system doesn't do the one thing your bank actually needs, and no vendor sells that module.",
    capabilities: [
      "Full-stack build: data model, API, front end, integrations",
      "AI woven in where it earns its place, not everywhere",
      "Built and tested against your actual workflow, not a generic template",
      "Deployed, documented, and handed off cleanly",
    ],
    transformation: "A manual spreadsheet workaround becomes a purpose-built system your team actually trusts.",
    priceLow: 25000,
    priceHigh: 100000,
    priceUnit: "Fixed scope, scaled to build",
  },
  {
    icon: "handshake",
    name: "Ongoing AI & Data Partner",
    hook: "You don't need a full AI team on payroll. You do need someone who keeps finding what's next.",
    capabilities: [
      "Monthly research, simulation, and prototyping cycle",
      "Engineering and analytics on retainer, not per-ticket",
      "First look at everything AutoNateAI builds for other banks",
      "Advisory access for leadership, not just a support inbox",
    ],
    transformation: "Occasional one-off projects become an outsourced AI and data capability.",
    priceLow: 7500,
    priceHigh: 20000,
    priceUnit: "Per Month",
  },
];

// Four-step engagement ladder shown above the offer grid on /consulting.
export const bankEngagementLadder = [
  { step: "Step 1", label: "Assessment" },
  { step: "Step 2", label: "Pilot Engagement" },
  { step: "Step 3", label: "Production Build" },
  { step: "Step 4", label: "Ongoing Partner" },
];

// Limited-slot launch pricing on the Bank AI & Workflow Assessment. Update
// slotsFilled by hand as Founding Bank Pilot partners sign; once slotsFilled
// reaches slotsTotal, drop this section and the assessment card reverts to
// standard pricing everywhere on the page.
export const foundingBankPilot = {
  region: "Southeast Missouri",
  slotsTotal: 3,
  slotsFilled: 0,
  standardPrice: 12500,
  pilotPrice: 6500,
  offeringName: "Bank AI & Workflow Assessment",
};

export const badgeProgression = [
  "Explorer",
  "Builder",
  "Developer",
  "Studio Member",
  "Lead Developer",
  "Certificate",
];

// Wide, dark, cinematic scene images generated with gpt-image-2 (see
// scripts/generate-scene-images.mjs). Used editorially wherever a pack or
// tutorial has no dedicated hero image, and as the background layer for
// every OG image sitewide (see scripts/generate-og-images.mjs).
export const sceneShots = [
  "/assets/scenes/scene-01.jpg",
  "/assets/scenes/scene-02.jpg",
  "/assets/scenes/scene-03.jpg",
  "/assets/scenes/scene-04.jpg",
  "/assets/scenes/scene-05.jpg",
  "/assets/scenes/scene-06.jpg",
  "/assets/scenes/scene-07.jpg",
  "/assets/scenes/scene-08.jpg",
];

export const tutorialPacks = [
  {
    handle: "intro-to-javascript-for-beginners",
    title: "Intro to JavaScript for Beginners",
    tagline: "How Nate and Kai Started AutoNateAI",
    summary:
      "Follow Nate and Kai — one self-taught builder, one civic-tech idea with nowhere to go — from a meetup back room to their first working JavaScript. Six chapters. Real code, real diagrams, real banter, no fluff.",
    icon: "code",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-intro-to-javascript-for-beginners.jpg",
  },
  {
    handle: "prompt-and-context-engineering",
    title: "Prompt and Context Engineering",
    tagline: "Nate and Kai Learn to Talk to the Machine",
    summary:
      "Hand-coding everything doesn't scale for two people building a studio. Nate and Kai start directing an AI agent and both get burned in different ways, until they learn that prompting and context are real skills, not just typing a question.",
    icon: "psychology",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-prompt-and-context-engineering.jpg",
  },
  {
    handle: "relational-databases-and-graphs",
    title: "Relational Databases and Graphs",
    tagline: "Nate and Kai Build the System of Record",
    summary:
      "Contacts, ideas, and feedback from every meetup are scattered across notes and memory. Nate and Kai build a real database to track them: tables, SQL, and a graph model for when the relationships get too tangled for rows and columns.",
    icon: "database",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-relational-databases-and-graphs.jpg",
  },
  {
    handle: "civics-and-agentic-ai",
    title: "Civics and Agentic AI",
    tagline: "Nate and Kai Take Their First Real Ask",
    summary:
      "Prompting, context, and data — the studio has the skills now. This pack turns them outward: reading a real RFP, researching the organization behind it, and sketching a real system for the exact civic problem that started it all.",
    icon: "account_balance",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-civics-and-agentic-ai.jpg",
  },
];

export const tutorials = [
  {
    handle: "setup-node-and-vscode",
    episode: "00",
    title: "The Deal: Installing Node.js and VS Code",
    track: "Chapter 0",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/00-setup-node-and-vscode.md",
    summary:
      "Nate and Kai make the deal that becomes AutoNateAI at the Fairview Founders Table. Before either of them writes a line of code, they need their gear: Node.js to run JavaScript outside a browser, and VS Code to actually write it.",
    outcomes: ["Install Node.js", "Install VS Code", "Run your first script"],
  },
  {
    handle: "why-javascript",
    episode: "01",
    title: "The Vision: Why JavaScript (and Where It Runs)",
    track: "Chapter 1",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/01-why-javascript.md",
    summary:
      "Kai has an idea and no way to build it. Nate can build things but has never had a reason that mattered. They pick a language and a deadline: next month's Founders Table Demo Night.",
    outcomes: ["Understand the language", "See where JS runs", "Set a real deadline"],
  },
  {
    handle: "variables-types-and-values",
    episode: "02",
    title: "Know Your Pockets: Variables, Types, and Values",
    track: "Chapter 2",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/02-variables-types-and-values.md",
    summary:
      "Before you build anything, you check your pockets. Kai learns to hold onto information with variables — and catches Nate's own casual code assuming \"42\" and 42 are the same thing.",
    outcomes: ["Declare values", "Know the core types", "Catch a type bug before it ships"],
  },
  {
    handle: "control-flow",
    episode: "03",
    title: "Reading the Room: Conditionals and Loops",
    track: "Chapter 3",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/03-control-flow.md",
    summary:
      "Their idea list from Founders Table is a mess of sticky notes. Nate and Kai learn to make decisions with if/else and drill the same move on repeat with loops, sorting the list for real.",
    outcomes: ["Branch with if/else", "Loop with for", "Avoid infinite loops"],
  },
  {
    handle: "functions-and-scope",
    episode: "04",
    title: "Signature Moves: Functions and Scope",
    track: "Chapter 4",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/04-functions-and-scope.md",
    summary:
      "Nate keeps copy-pasting the same five lines. Kai's process instincts finally win the argument: package logic into a function you can reuse and trust, a signature move you can throw the same way every time.",
    outcomes: ["Write functions", "Pass parameters", "Understand scope"],
  },
  {
    handle: "objects-arrays-and-data-shapes",
    episode: "05",
    title: "The Playbook: Objects, Arrays, and Data Shapes",
    track: "Chapter 5",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/05-objects-arrays-and-data-shapes.md",
    summary:
      "Before Demo Night, Nate and Kai need a playbook: a way to organize everything they've built. Objects, arrays, real data shapes — and the name their studio finally lands on.",
    outcomes: ["Shape objects", "Use array methods", "Build a real data-backed roster"],
  },
  {
    handle: "why-prompting-is-a-skill",
    episode: "00",
    title: "Garbage In, Garbage Out: Why Prompting Is a Skill",
    track: "Chapter 0",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/00-why-prompting-is-a-skill.md",
    summary:
      "Hand-coding everything doesn't scale for two people building a studio. Kai over-trusts the first AI agent output; Nate refuses to use it out of pride. They both get burned before the real lesson lands.",
    outcomes: ["See why prompting is a skill", "Spot garbage-in, garbage-out", "Set real expectations for agents"],
  },
  {
    handle: "give-it-the-room-not-just-the-ask",
    episode: "01",
    title: "Give It the Room, Not Just the Ask: What Context Really Means",
    track: "Chapter 1",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/01-give-it-the-room-not-just-the-ask.md",
    summary:
      "Context isn't infinite. Nate and Kai learn what an agent actually sees — instructions, history, files, tool output — the hard way, when it confidently answers about a file it was never shown.",
    outcomes: ["Understand agent context", "Know what's finite", "Avoid context overload"],
  },
  {
    handle: "structuring-the-ask",
    episode: "02",
    title: "Structuring the Ask: Role, Task, Constraints, Format",
    track: "Chapter 2",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/02-structuring-the-ask.md",
    summary:
      "Turns out Kai's old memo-writing instincts transfer directly. She teaches Nate to structure a prompt with role, task, constraints, and format instead of throwing a vague question at the wall.",
    outcomes: ["Structure a real prompt", "Use constraints and examples", "Iterate instead of settling"],
  },
  {
    handle: "feeding-it-the-right-files",
    episode: "03",
    title: "Feeding It the Right Files: Practical Context Engineering",
    track: "Chapter 3",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/03-feeding-it-the-right-files.md",
    summary:
      "More files isn't more help. Nate and Kai practice handing an agent only what it actually needs to get a real change right.",
    outcomes: ["Select relevant context", "Avoid overload", "Summarize instead of dumping"],
  },
  {
    handle: "when-it-gets-it-wrong",
    episode: "04",
    title: "When It Gets It Wrong: Hallucination, Ambiguity, and Trusting Nothing You Haven't Checked",
    track: "Chapter 4",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/04-when-it-gets-it-wrong.md",
    summary:
      "Agents hallucinate. Nate almost ships a fix built on an API that doesn't exist — until Kai's \"where's that from?\" catches it. The habit that matters most: verify before you trust, every single time.",
    outcomes: ["Spot hallucinations", "Handle ambiguity", "Build a verify-first habit"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "Cheatsheet",
    track: "Reference",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/05-cheatsheet.md",
    summary: "The prompt patterns and context-engineering checklist Nate and Kai actually keep open in a tab.",
    outcomes: ["Reference prompt patterns", "Run the context checklist", "Catch common failures"],
  },
  {
    handle: "why-he-needs-a-scoreboard",
    episode: "00",
    title: "The Missing Ledger: Why They Need a Scoreboard",
    track: "Chapter 0",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/00-why-he-needs-a-scoreboard.md",
    summary:
      "Contacts, ideas, and feedback from every Founders Table are scattered across notes, DMs, and memory. Nate and Kai learn why a real database beats another folder of notes.",
    outcomes: ["See why a database beats files", "Compare memory vs storage", "Frame the tracking problem"],
  },
  {
    handle: "tables-rows-and-relationships",
    episode: "01",
    title: "The Blueprint: Tables, Rows, and Relationships",
    track: "Chapter 1",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/01-tables-rows-and-relationships.md",
    summary:
      "Primary keys, foreign keys, one-to-many. Nate and Kai model their contacts, ideas, and feedback as real relational tables.",
    outcomes: ["Design tables and keys", "Model one-to-many relationships", "Think in rows, not files"],
  },
  {
    handle: "asking-questions-with-sql",
    episode: "02",
    title: "Talking to the Data: Asking Questions with SQL",
    track: "Chapter 2",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/02-asking-questions-with-sql.md",
    summary:
      "SELECT, WHERE, JOIN, GROUP BY. Nate and Kai learn to ask their own data a real question and get a real answer back.",
    outcomes: ["Write SELECT and WHERE", "Join related tables", "Group data into answers"],
  },
  {
    handle: "when-relationships-get-tangled",
    episode: "03",
    title: "The Web Under the Table: When Relationships Get Tangled",
    track: "Chapter 3",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/03-when-relationships-get-tangled.md",
    summary:
      "Who-introduced-who at Founders Table doesn't fit neatly in rows. Nate and Kai meet graphs: nodes, edges, and when a graph beats a table.",
    outcomes: ["Understand nodes and edges", "Know when to reach for a graph", "Traverse a simple graph"],
  },
  {
    handle: "building-the-monitor",
    episode: "04",
    title: "The Scoreboard Comes Alive: Building the Monitor",
    track: "Chapter 4",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/04-building-the-monitor.md",
    summary:
      "Queries become a real tracker. Nate and Kai turn raw rows into a small studio dashboard that actually tells them what's working.",
    outcomes: ["Aggregate real data", "Build a simple monitor", "Turn queries into insight"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "Cheatsheet",
    track: "Reference",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/05-cheatsheet.md",
    summary: "The SQL syntax and graph vocabulary Nate and Kai keep looking up until it finally sticks.",
    outcomes: ["Reference SQL syntax", "Know core graph terms", "Query with confidence"],
  },
  {
    handle: "zooming-out-to-the-city",
    episode: "00",
    title: "Past the Walls: Zooming Out to the City",
    track: "Chapter 0",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/00-zooming-out-to-the-city.md",
    summary:
      "Kai finds a live Fairview RFP that's unmistakably the exact problem she couldn't build back at the very first Founders Table. Nate and Kai meet the RFP: a real problem a real city is asking someone to solve.",
    outcomes: ["Understand what an RFP is", "See where real problems get published", "Close the loop on where this started"],
  },
  {
    handle: "what-is-an-agentic-system",
    episode: "01",
    title: "Not Just a Chatbot: What Is an Agentic System",
    track: "Chapter 1",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/01-what-is-an-agentic-system.md",
    summary:
      "An agent isn't a one-shot answer machine. Nate and Kai learn what makes a system agentic: planning, tool use, and taking real steps toward a goal, for something with real stakes for the first time.",
    outcomes: ["Define agentic vs single-shot", "Understand planning and tool use", "Recognize multi-step autonomy"],
  },
  {
    handle: "reading-an-rfp-with-ai",
    episode: "02",
    title: "The Fine Print: Reading an RFP with AI",
    track: "Chapter 2",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/02-reading-an-rfp-with-ai.md",
    summary:
      "Kai is fluent in bureaucratic language and finally gets to translate for Nate, the way he once translated code for her. Together with an agent they pull out what actually matters: requirements, constraints, stakes.",
    outcomes: ["Summarize a real RFP", "Extract requirements", "Identify constraints"],
  },
  {
    handle: "researching-the-room",
    episode: "03",
    title: "Know Who You're Talking To: Researching the Room",
    track: "Chapter 3",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/03-researching-the-room.md",
    summary:
      "Before you build for someone, you find out who they actually are. Nate and Kai use AI to research the organization behind the ask.",
    outcomes: ["Research a real organization", "Find who's behind an RFP", "Frame who the system serves"],
  },
  {
    handle: "from-insight-to-system",
    episode: "04",
    title: "The Sketch on the Napkin: From Insight to System",
    track: "Chapter 4",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/04-from-insight-to-system.md",
    summary:
      "Research becomes architecture. Nate and Kai sketch a real system in response to a real civic problem, diagram and all — the studio's first real build.",
    outcomes: ["Sketch a system from research", "Diagram a real architecture", "Connect insight to design"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "The Notes Before the Live Build: Cheatsheet",
    track: "Reference",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/05-cheatsheet.md",
    summary: "Agentic-AI vocabulary and the RFP research checklist Nate and Kai use every time a new one drops — right before their first real Live Build.",
    outcomes: ["Reference agentic-AI terms", "Run the RFP checklist", "Get ready for Live Builds"],
  },
];

export const articles = [
  {
    handle: "coding-as-workforce-development",
    title: "Why System Design Practice Beats Another Syntax Course",
    category: "Strategy",
    audience: "Developers, CS students, junior SWEs, and technical builders",
    summary:
      "The next step after writing code is learning how to design systems that make decisions, recover from failures, and explain their behavior under pressure.",
    body: [
      "A lot of builders can write features. The harder skill is knowing how those features should behave inside a changing environment. That is the gap AutoNateAI is built around: not more isolated syntax practice, but better engineering judgment.",
      "A real RFP or civic problem gives that judgment a place to show up. Your code has to model real requirements, real data, real constraints, and real tradeoffs. If the architecture is weak, the system stalls. If the data model is sloppy, decisions drift. If a change breaks something, Git shows what changed and gives you a way back.",
      "AI agents like Claude Code and Codex matter because modern builders will work alongside them. The point is not to let the agent think for you. The point is to ask sharper questions, review generated code, protect working versions, and stay responsible for how the system behaves once a real organization is depending on it."
    ],
    tags: ["System Design", "AI Agents", "Workforce Development"],
    readingTime: "4 min read",
    image: "/assets/landing/api-data-model.jpg",
  },
  {
    handle: "why-live-builds-make-it-real",
    title: "Why Saturday Live Builds Make the Learning Real",
    category: "Guide",
    audience: "Builders preparing to ship a real system",
    summary:
      "When your system has to work for a real organization, architecture stops being theory and starts becoming proof.",
    body: [
      "A Live Build changes the work because the code has consequences. Nobody is submitting a static project. The team is shipping a system in response to an actual RFP, live, where the reasoning is visible the whole way and a real organization is going to look at what got built and decide whether it's useful.",
      "That pressure makes the lessons click. Requirements matter because a real ask has rules. Debugging matters because a broken flow loses trust in front of everyone watching. Git matters because the branch needs a stable checkpoint mid-build. Data modeling matters because the system has to remember what's true. Architecture matters because the design should be changeable without rewriting everything two weeks in.",
      "By the end, a builder can talk about the project like an engineer: the environment, the assumptions, the decisions, the failures, the fixes, and what happened when the system had to perform for someone other than them. That's why AutoNateAI Live Builds run every Saturday, 10:00 AM-12:00 PM Central, live in the Discord — not as a one-time capstone, but as an ongoing rhythm that gives serious builders a reason to keep shipping."
    ],
    tags: ["Live Builds", "RFPs", "Shipping"],
    readingTime: "3 min read",
    image: "/assets/landing/rfp-document.jpg",
  },
  {
    handle: "ai-agents-are-showing-up-in-civic-tech",
    title: "AI Agents Are Already Showing Up in Civic Tech. Most Engineers Aren't Ready.",
    category: "Trend",
    audience: "Engineers curious about public-sector and civic-tech work",
    summary:
      "Cities and public-interest organizations are starting to ask vendors how AI agents factor into a proposal. Most engineers have never opened an RFP, let alone answered one.",
    body: [
      "Civic technology moves slower than the rest of software, on purpose — public money, public accountability, procurement rules that exist so nobody can quietly play favorites. That caution used to mean AI adoption lagged years behind the private sector. It's catching up faster than most engineers assume, and the RFPs prove it: more of them now ask directly how a proposal would use automation or AI-assisted development to control cost and timeline, not as a footnote but as a real evaluation criterion.",
      "The gap isn't tooling, it's fluency. Most engineers who are strong with AI agents have never read a real RFP, and most people who read RFPs for a living aren't engineers. Reading a scope of work, translating it into a data model and an API surface, and using an agent to accelerate the build without hiding how it works — that's a specific, learnable skill, and almost nobody is deliberately practicing it.",
      "That's the actual opportunity. A civic RFP is public by law, the stakes are real, and the organization on the other end genuinely needs the thing built. Engineers who get comfortable in that room early, reading the document, respecting the procurement process, and using agents responsibly instead of trying to hide the seams, are going to be the ones public-interest work turns to first."
    ],
    tags: ["Civic Tech", "AI Trends", "RFPs"],
    readingTime: "4 min read",
    image: "/assets/scenes/scene-06.jpg",
  },
  {
    handle: "the-rfp-is-an-underrated-proving-ground",
    title: "The RFP Is an Underrated Proving Ground for Engineers",
    category: "Guide",
    audience: "Programmers who want a more serious project than another app clone",
    summary:
      "A real RFP gives every technical idea a job: APIs, automation, state, real constraints, debugging, Git history, AI review, and strategy, all at once.",
    body: [
      "App clones can be useful, but they often hide the part of engineering that matters most: what should the system do when the environment changes? A real RFP keeps that question in front of you, because a real organization is depending on the system, spending time reviewing it, and exposing weak assumptions you'd never find in a solo side project.",
      "That turns familiar tools into connected practice. Code controls behavior. APIs reveal the world. A database carries decisions forward. Git captures experiments. AI agents help plan and review changes. Real requirements force a builder to decide what matters first, instead of building whatever's fun that week.",
      "The result is a project with a story, not just a repo. You can show the RFP, explain the architecture, walk through the decisions, describe how the agent helped and where it got something wrong, and point to what happened when the system shipped for a real organization. That's a very different conversation than \"here's another to-do app.\""
    ],
    tags: ["Portfolio Project", "RFPs", "Live Builds"],
    readingTime: "4 min read",
    image: "/assets/landing/what-they-build.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    title: "How Real Constraints Become Software Architecture",
    category: "Strategy",
    audience: "Builders training for AI, automation, and software roles",
    summary:
      "The constraints are not decoration. They are the reason builders learn to model environments, design components, manage state, and make tradeoffs.",
    body: [
      "The best part of building a real system is that the constraints are doing real teaching. A vague requirement is not just an annoyance. It is a communication problem. A broken data model is not just a bug. It is a component design problem. A tight deadline is not just stress. It is a test of how the system reacts under pressure.",
      "That is how code becomes architecture. A loop becomes the system's operating rhythm. A function becomes reusable behavior. A database becomes long-running state. A branch becomes a design experiment. An AI agent becomes a build partner that still needs direction, review, and constraints, not a black box you point at a problem and walk away from.",
      "This is the kind of practice builders need for a world shaped by data, automation, AI, real organizations, resources, and policy. The strongest people won't be the ones who memorize the most syntax. They'll be the ones who can read the system, reason through the tradeoffs, and make better decisions than the agent would on its own."
    ],
    tags: ["Software Architecture", "Strategy", "AI Systems"],
    readingTime: "5 min read",
    image: "/assets/landing/hero-bg.jpg",
  },
  {
    handle: "why-git-matters-for-builders",
    title: "Why Git Matters When AI Is Moving Fast",
    category: "Tutorial",
    audience: "Builders using AI agents on real code",
    summary:
      "AI can help you move faster, but Git keeps the work understandable, recoverable, and ready for real deadlines.",
    body: [
      "AI agents can change a system quickly. That is powerful, but it also means a builder needs a way to keep the work grounded. Git gives every experiment a checkpoint: what changed, why it changed, and whether the system actually improved once you look at the diff instead of trusting the summary.",
      "On a real build, that matters immediately. A schema change can unlock growth or break your API. A new feature can make the system smarter or drain time on the wrong thing. A Live Build branch needs to be stable enough to demo live, even while you keep testing better ideas on the side.",
      "By the time a builder has shipped a real system this way, Git isn't just a tool they learned because engineers use it. It's the record of their thinking: commits, diffs, recovery moments, architecture notes, and the path from first working prototype to a system a real organization can actually use."
    ],
    tags: ["Git", "AI Agents", "Live Builds"],
    readingTime: "3 min read",
    image: "/assets/landing/agent-review.jpg",
  }
];
