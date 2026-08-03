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

export const badgeProgression = [
  "Explorer",
  "Builder",
  "Developer",
  "Studio Member",
  "Lead Developer",
  "Certificate",
];

// Real screenshots from Screeps (screeps.com), downloaded from the official
// Steam store page. Used editorially throughout the site to show the actual
// game participants build inside.
export const screepsScreenshots = [
  "/assets/screeps/screeps-01.jpg",
  "/assets/screeps/screeps-02.jpg",
  "/assets/screeps/screeps-03.jpg",
  "/assets/screeps/screeps-04.jpg",
  "/assets/screeps/screeps-05.jpg",
  "/assets/screeps/screeps-06.jpg",
  "/assets/screeps/screeps-07.jpg",
  "/assets/screeps/screeps-08.jpg",
  "/assets/screeps/screeps-09.jpg",
];

export const tutorialPacks = [
  {
    handle: "intro-to-javascript-for-beginners",
    title: "Intro to JavaScript for Beginners",
    tagline: "AutoNate's Origin Story",
    summary:
      "Follow AutoNate — 18 years old, hungry, dead set on becoming the sharpest systems builder in the game — from zero to ready for his first Screeps match. Six chapters. Real code, real diagrams, real screenshots, no fluff.",
    icon: "code",
    status: "Active",
    heroShotIndex: 3,
  },
  {
    handle: "getting-started-with-screeps",
    title: "Getting Started with Screeps",
    tagline: "AutoNate Steps Into the Arena",
    summary:
      "AutoNate bought the game. Now he has to prove the JavaScript actually works: claim a room, ship the harvest loop, split the colony into roles, scale the economy, and learn enough combat to survive first contact. Full technical guide — reads standalone, no prior chapters required.",
    icon: "rocket_launch",
    status: "Active",
    heroShotIndex: 0,
  },
  {
    handle: "prompt-and-context-engineering",
    title: "Prompt and Context Engineering",
    tagline: "AutoNate Learns to Talk to the Machine",
    summary:
      "AutoNate's colony works, but hand-coding every behavior himself doesn't scale. He starts directing an AI agent and gets garbage back, until he learns that prompting and context are real skills, not just typing a question.",
    icon: "psychology",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-prompt-and-context-engineering.jpg",
  },
  {
    handle: "relational-databases-and-graphs",
    title: "Relational Databases and Graphs",
    tagline: "AutoNate Builds the Scoreboard",
    summary:
      "Builds, matches, roles, and results are scattered across files and memory. AutoNate builds a real database to track them: tables, SQL, and a graph model for when the relationships get too tangled for rows and columns.",
    icon: "database",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-relational-databases-and-graphs.jpg",
  },
  {
    handle: "civics-and-agentic-ai",
    title: "Civics and Agentic AI",
    tagline: "AutoNate Looks Outside the Room",
    summary:
      "Prompting, context, and data — AutoNate has the skills now. This pack turns them outward: reading a real RFP, researching the organization behind it, and sketching a real system for a real civic problem with an AI agent's help.",
    icon: "account_balance",
    status: "Active",
    heroImage: "/assets/landing/tutorial-pack-civics-and-agentic-ai.jpg",
  },
];

export const tutorials = [
  {
    handle: "buy-download-and-launch",
    episode: "00",
    title: "Into the Arena: Buy, Download, and Launch Screeps on Steam",
    track: "Start Here",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/00-buy-download-and-launch.md",
    summary:
      "AutoNate finally buys the game he's been training for. Purchase Screeps: World on Steam, install the client, sign in, and land on the world map ready to claim your first room.",
    outcomes: ["Buy on Steam", "Install & launch", "Reach the world map"],
  },
  {
    handle: "quickstart",
    episode: "01",
    title: "First Contact: Playing in 15 Minutes",
    track: "Start Here",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/01-quickstart.md",
    summary:
      "Claim a room, place Spawn1, spawn the first worker, and get the harvest-deliver loop running — AutoNate's first line of code that keeps running whether he's watching or not.",
    outcomes: ["Claim a room", "Spawn Harvester1", "Run the first loop"],
  },
  {
    handle: "core-loop-and-roles",
    episode: "02",
    title: "Building the Squad: Core Loop and Roles",
    track: "Code Patterns",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/02-core-loop-and-roles.md",
    summary:
      "One creep breaks the moment you add a second. AutoNate learns source assignment, role modules, population-based spawning, and the first architecture that can actually scale.",
    outcomes: ["Assign sources", "Split role files", "Spawn by population"],
  },
  {
    handle: "infrastructure-and-scaling",
    episode: "03",
    title: "Building the Machine: Infrastructure and Scaling",
    track: "Systems",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/03-infrastructure-and-scaling.md",
    summary:
      "Roads, containers, static mining, haulers, CPU discipline, caching — AutoNate stops babysitting the colony and starts engineering it.",
    outcomes: ["Plan roads", "Split mining and hauling", "Manage CPU"],
  },
  {
    handle: "combat-and-competing",
    episode: "04",
    title: "Ready to Fight: Combat and Competing",
    track: "Competition",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/04-combat-and-competing.md",
    summary:
      "Towers, ramparts, real combat math, a working defender, and how to test it before it matters — AutoNate gets his colony ready for the pressure the League is going to bring.",
    outcomes: ["Run towers", "Build defenders", "Test pressure"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "The Notes on His Monitor: Cheatsheet",
    track: "Reference",
    pack: "getting-started-with-screeps",
    sourcePath: "../content/tutorials/getting-started-with-screeps/05-cheatsheet.md",
    summary:
      "The error codes, body costs, constants, and API one-liners AutoNate keeps taped to his monitor. You'll look them up until your colony stops embarrassing you.",
    outcomes: ["Read error codes", "Check body costs", "Use API one-liners"],
  },
  {
    handle: "setup-node-and-vscode",
    episode: "00",
    title: "Suit Up: Installing Node.js and VS Code",
    track: "Chapter 0",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/00-setup-node-and-vscode.md",
    summary:
      "Before AutoNate writes a single line, he needs his gear: Node.js to run JavaScript outside a browser, and VS Code to actually write it. The walkthrough, in the story and for real.",
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
      "AutoNate finds the Virtual Battle Bot League and realizes talent alone doesn't get you in the ring — you need to speak the language every bot runs on: JavaScript.",
    outcomes: ["Understand the language", "See where JS runs", "Meet the League"],
  },
  {
    handle: "variables-types-and-values",
    episode: "02",
    title: "Know Your Pockets: Variables, Types, and Values",
    track: "Chapter 2",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/02-variables-types-and-values.md",
    summary:
      "Before you build anything, you check your pockets. AutoNate learns to hold onto information with variables, and to recognize exactly what kind of information he's holding.",
    outcomes: ["Declare values", "Know the core types", "Read your own data"],
  },
  {
    handle: "control-flow",
    episode: "03",
    title: "Reading the Room: Conditionals and Loops",
    track: "Chapter 3",
    pack: "intro-to-javascript-for-beginners",
    sourcePath: "../content/tutorials/intro-to-javascript-for-beginners/03-control-flow.md",
    summary:
      "A fighter who can't read the room gets caught out. AutoNate learns to make decisions with if/else and drill the same move on repeat with loops.",
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
      "Every fighter needs a move they can throw the same way, every single time. AutoNate learns to package logic into functions he can reuse and trust.",
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
      "Before AutoNate can register for his first real match, he needs a playbook — a way to organize everything he knows. Objects, arrays, and the exact shape Screeps' Memory expects.",
    outcomes: ["Shape objects", "Use array methods", "Build a Memory-ready roster"],
  },
  {
    handle: "why-prompting-is-a-skill",
    episode: "00",
    title: "Garbage In, Garbage Out: Why Prompting Is a Skill",
    track: "Chapter 0",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/00-why-prompting-is-a-skill.md",
    summary:
      "AutoNate's hand-coded colony doesn't scale anymore. He turns to an AI agent for help, gets garbage back, and learns fast that garbage in still means garbage out, even when the machine is smart.",
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
      "Context isn't infinite. AutoNate learns what an agent actually sees, instructions, history, files, tool output, and why dumping everything on it backfires.",
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
      "Role, task, constraints, format, examples. AutoNate learns to structure a prompt instead of throwing a vague question at the wall and hoping.",
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
      "More files isn't more help. AutoNate practices handing an agent only what it actually needs to get a real change right.",
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
      "Agents hallucinate. AutoNate builds the habit that matters most: verify before you trust, every single time.",
    outcomes: ["Spot hallucinations", "Handle ambiguity", "Build a verify-first habit"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "Cheatsheet",
    track: "Reference",
    pack: "prompt-and-context-engineering",
    sourcePath: "../content/tutorials/prompt-and-context-engineering/05-cheatsheet.md",
    summary: "The prompt patterns and context-engineering checklist AutoNate actually keeps open in a tab.",
    outcomes: ["Reference prompt patterns", "Run the context checklist", "Catch common failures"],
  },
  {
    handle: "why-he-needs-a-scoreboard",
    episode: "00",
    title: "The Missing Ledger: Why He Needs a Scoreboard",
    track: "Chapter 0",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/00-why-he-needs-a-scoreboard.md",
    summary:
      "Builds, matches, roles, and results are scattered across files and AutoNate's own memory. He learns why a real database beats another folder of notes.",
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
      "Primary keys, foreign keys, one-to-many. AutoNate models his colonies and matches as real relational tables.",
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
      "SELECT, WHERE, JOIN, GROUP BY. AutoNate learns to ask his own data a real question and get a real answer back.",
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
      "Some relationships don't fit neatly in rows. AutoNate meets graphs: nodes, edges, and when a graph beats a table.",
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
      "Queries become a real tracker. AutoNate turns raw rows into a monitor that actually tells him what's working.",
    outcomes: ["Aggregate real data", "Build a simple monitor", "Turn queries into insight"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "Cheatsheet",
    track: "Reference",
    pack: "relational-databases-and-graphs",
    sourcePath: "../content/tutorials/relational-databases-and-graphs/05-cheatsheet.md",
    summary: "The SQL syntax and graph vocabulary AutoNate keeps looking up until it finally sticks.",
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
      "AutoNate realizes his skills don't stop at the game. He meets the RFP: a real problem a real city or foundation is asking someone to solve.",
    outcomes: ["Understand what an RFP is", "See where real problems get published", "Connect game skills to real ones"],
  },
  {
    handle: "what-is-an-agentic-system",
    episode: "01",
    title: "Not Just a Chatbot: What Is an Agentic System",
    track: "Chapter 1",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/01-what-is-an-agentic-system.md",
    summary:
      "An agent isn't a one-shot answer machine. AutoNate learns what makes a system agentic: planning, tool use, and taking real steps toward a goal.",
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
      "AutoNate points an agent at a real RFP and pulls out what actually matters: requirements, constraints, and stakes.",
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
      "Before you build for someone, you find out who they actually are. AutoNate uses AI to research the organization behind the ask.",
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
      "Research becomes architecture. AutoNate sketches a real system in response to a real civic problem, diagram and all.",
    outcomes: ["Sketch a system from research", "Diagram a real architecture", "Connect insight to design"],
  },
  {
    handle: "cheatsheet",
    episode: "05",
    title: "The Notes Before the Live Build: Cheatsheet",
    track: "Reference",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/05-cheatsheet.md",
    summary: "Agentic-AI vocabulary and the RFP research checklist AutoNate uses every time a new one drops.",
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
      "A lot of builders can write features. The harder skill is knowing how those features should behave inside a changing environment. That is the gap this program is built around: not more isolated syntax practice, but better engineering judgment.",
      "A real RFP or civic problem gives that judgment a place to show up. Your code has to model real requirements, real data, real constraints, and real tradeoffs. If the architecture is weak, the system stalls. If the data model is sloppy, decisions drift. If a change breaks something, Git shows what changed and gives you a way back.",
      "AI agents like Claude Code and Codex matter because modern builders will work alongside them. The point is not to let the agent think for you. The point is to ask sharper questions, review generated code, protect working versions, and stay responsible for how the system behaves once a real organization is depending on it."
    ],
    tags: ["System Design", "AI Agents", "Workforce Development"],
    readingTime: "4 min read",
    image: "/assets/landing/api-data-model.jpg",
  },
  {
    handle: "why-tournament-day-matters",
    title: "Why Live Build Week Makes the Learning Real",
    category: "Guide",
    audience: "Builders preparing to ship a real system",
    summary:
      "When your system has to work for a real organization, architecture stops being theory and starts becoming proof.",
    body: [
      "Live Build week changes the work because the code has consequences. You are not submitting a static project. You are shipping a system in response to an actual RFP, where a real organization is going to look at what you built and decide whether it's useful.",
      "That pressure makes the lessons click. Requirements matter because a real ask has rules. Debugging matters because a broken flow loses trust. Git matters because your branch needs a stable checkpoint. Data modeling matters because the system has to remember what's true. Architecture matters because the design should be changeable without rewriting everything.",
      "By the end, you can talk about your project like an engineer. You can explain the environment, the assumptions, the decisions, the failures, the fixes, and what happened when the system had to perform for someone other than you. AutoNateAI Live Builds turn that same format into an ongoing rhythm, giving serious builders a reason to keep shipping after the cohort ends."
    ],
    tags: ["Live Builds", "RFPs", "Shipping"],
    readingTime: "3 min read",
    image: "/assets/landing/rfp-document.jpg",
  },
  {
    handle: "screeps-as-a-systems-lab",
    title: "Why Real Systems Work Better Than a Systems Lab",
    category: "Guide",
    audience: "Builders learning system design with AI agents",
    summary:
      "A real RFP makes software architecture visible: your code controls real outcomes, real data exposes the world, and every design choice shows up in motion.",
    body: [
      "A real system is not a coding worksheet with a theme. It is the world your software actually has to operate inside. Your code reads requirements, models data, calls APIs, updates state, reacts to changing constraints, and decides what should happen next.",
      "That makes abstract engineering ideas easier to see. The RFP becomes an environment model. Data models become components with responsibilities. The database becomes persistent state. Deploys become a real pipeline. Real deadlines become a test of whether your system can keep making useful decisions.",
      "Adding AI agents raises the bar instead of lowering it. You can move faster, but you still have to understand the requirements, review the plan, test the change, commit the working version, and explain why the system behaves the way it does."
    ],
    tags: ["Real Systems", "AI Agents", "System Design"],
    readingTime: "4 min read",
    image: "/assets/landing/agent-review.jpg",
  },
  {
    handle: "what-is-screeps",
    title: "Why Build a Real System Instead of Another App Clone",
    category: "Guide",
    audience: "Programmers who want a more serious project",
    summary:
      "A real RFP gives every technical idea a job: APIs, automation, state, resource constraints, debugging, Git history, AI review, and strategy.",
    body: [
      "App clones can be useful, but they often hide the part of engineering that matters most: what should the system do when the environment changes? A real RFP keeps that question in front of you, because a real organization is depending on the system, spending time reviewing it, and exposing weak assumptions.",
      "That turns familiar tools into connected practice. Code controls behavior. APIs reveal the world. A database carries decisions forward. Git captures experiments. AI agents help plan and review changes. Real requirements force you to decide what matters first.",
      "The result is a project with a story. You can show the repo, explain the architecture, walk through the decisions, describe how AI helped, and point to what happened when your system shipped for a real organization."
    ],
    tags: ["Portfolio Project", "Automation", "Live Builds"],
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
      "The best part of building a real system is that the constraints are doing real teaching. A vague requirement is not just an annoyance. It is a communication problem. A broken data model is not just a bug. It is a component design problem. A tight deadline is not just stress. It is a test of how your system reacts under pressure.",
      "That is how code becomes architecture. A loop becomes the system's operating rhythm. A function becomes reusable behavior. A database becomes long-running state. A branch becomes a design experiment. An AI agent becomes a build partner that still needs direction, review, and constraints.",
      "This is the kind of practice builders need for a world shaped by data, automation, AI, real organizations, resources, and policy. The strongest people will not be the ones who memorize the most syntax. They will be the ones who can read the system, reason through the tradeoffs, and make better decisions."
    ],
    tags: ["Software Architecture", "Strategy", "AI Systems"],
    readingTime: "5 min read",
    image: "/assets/landing/hero-bg.jpg",
  },
  {
    handle: "why-git-matters-for-students",
    title: "Why Git Matters When AI Is Moving Fast",
    category: "Tutorial",
    audience: "Builders using AI agents on real code",
    summary:
      "AI can help you move faster, but Git keeps the work understandable, recoverable, and ready for real deadlines.",
    body: [
      "AI agents can help you change a system quickly. That is powerful, but it also means you need a way to keep the work grounded. Git gives every experiment a checkpoint: what changed, why it changed, and whether the system actually improved.",
      "On a real build, that matters immediately. A schema change can unlock growth or break your API. A new feature can make the system smarter or drain time on the wrong thing. A Live Build branch needs to be stable enough to demo, even while you keep testing better ideas.",
      "By the end of the cohort, Git is not just a tool you learned because engineers use it. It is the record of your thinking: commits, diffs, recovery moments, architecture notes, and the path from first working prototype to a system a real organization can use."
    ],
    tags: ["Git", "AI Agents", "Live Builds"],
    readingTime: "3 min read",
    image: "/assets/landing/agent-review.jpg",
  }
];
