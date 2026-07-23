export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Program", href: "/programs/ai-software-architect", keys: ["programs"] },
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

export const articles = [
  {
    handle: "coding-as-workforce-development",
    title: "Coding as Workforce Development for Strategic Builders",
    category: "Strategy",
    audience: "High school programmers, college CS students, junior SWEs, and technical builders",
    summary:
      "The strongest technology training does more than introduce tools or syntax. It helps builders practice system design, communication, version control, and strategic follow-through.",
    body: [
      "If you are preparing for the future of technical work, knowing code is only the starting point. You need a structured environment where you can practice the habits that show up later in real work: reading unfamiliar systems, testing strategy, recovering from mistakes, and explaining decisions.",
      "The AI Systems Programming Lab uses Screeps because it makes those habits visible. If you model the environment poorly, the colony stalls. If you commit working code before experimenting, you can recover. If you use Codex without understanding the architecture, the room eventually exposes the gap.",
      "That is why the program fits workforce development for developers and technical builders. You get a competitive shared challenge, but underneath that challenge you are practicing collaboration, technical communication, persistence, and systems thinking."
    ],
    tags: ["Workforce Development", "Systems Thinking", "Tech Careers"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-05.jpg",
  },
  {
    handle: "why-tournament-day-matters",
    title: "Why Tournament Day Changes the Energy",
    category: "Guide",
    audience: "Builders preparing for competitive systems work",
    summary:
      "Tournament week gives builders a real reason to care about mechanics, debugging, architecture, and strategy. Your code has to compete against someone else's code.",
    body: [
      "Tournament week changes the tone of the program because the work becomes public, playful, and real. You are not just turning in an assignment. You are preparing a colony to compete against another colony under AutoNateAI capture-the-flag rules.",
      "That pressure makes the technical lessons matter. Git protects the battle branch. Debugging keeps the bot from freezing. Component design makes strategy easier to change. Memory helps the colony act with consistency. Automation determines whether the bot can keep moving when the match gets messy.",
      "The result is a capstone you can talk about with substance. You can explain how you read the environment, what mechanics shaped your strategy, what broke, what worked, and what you would build next. Phase 2 extends this format into a league, giving serious builders a reason to keep iterating."
    ],
    tags: ["Tournament Day", "Screeps", "Competition"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-08.jpg",
  },
  {
    handle: "screeps-as-a-systems-lab",
    title: "Why Screeps Works as a Systems Lab",
    category: "Guide",
    audience: "Tech-minded builders",
    summary:
      "Screeps lets you see software architecture in motion. Your JavaScript controls a live colony, so system-design choices become visible decisions, failures, and improvements.",
    body: [
      "Screeps is not just a game added onto a coding class. It is the environment where the software system lives. You write JavaScript that controls workers, manages energy, upgrades rooms, responds to threats, and decides what the colony should do next.",
      "That makes architecture easier to inspect. Environment values become state. Game objects become components. Roles become a division of labor. Memory stores strategy across ticks. Git protects the last working version before you try a new approach.",
      "The value is that you practice production-style thinking in a contained environment. You learn to explain what the system does, inspect failures, ask Codex better questions, commit changes, and improve the architecture before testing it during tournament week."
    ],
    tags: ["Screeps", "Software Systems", "Youth Programming"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-03.jpg",
  },
  {
    handle: "what-is-screeps",
    title: "Why Students Build a Real System",
    category: "Guide",
    audience: "High school, college, and early-career builders",
    summary:
      "You become more sophisticated when code connects to one working system. Screeps gives data, APIs, automation, Git, mechanics, and strategy a reason to exist.",
    body: [
      "Many people can write code but have not practiced designing a system inside someone else's environment. Screeps forces that next step: you have to understand the available components, the rules, the state, the resources, and the feedback loops before your code can make good decisions.",
      "The AutoNateAI lab is built around that idea. You do not complete disconnected exercises. You build a project with inputs, decisions, outputs, data, version history, hostile pressure, resource constraints, automation opportunities, and tournament consequences.",
      "That gives you a clearer outcome to show. At the end, you can show the code, explain the architecture, walk through Git history, describe how AI helped, and talk through what happened when your system battled someone else's."
    ],
    tags: ["Youth Programming", "Systems Thinking", "Project-Based Learning"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-01.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    title: "Learning Systems Thinking Through Code",
    category: "Strategy",
    audience: "Future software, AI, automation, and data builders",
    summary:
      "A good coding program should help you understand feedback loops, constraints, resources, policies, hostile pressure, and tradeoffs. A real project gives those ideas something you can operate.",
    body: [
      "Most people are told to learn coding as a list of concepts: variables, loops, functions, arrays. Those concepts matter, but the next level is learning how those pieces become architecture inside a real environment.",
      "In the lab, a loop is not abstract. It is the colony checking for new work. A function is not only a syntax pattern. It is a reusable behavior. Data is not just a value. It is what the system remembers and acts on.",
      "That is the bridge to real-world software architecture. Future jobs will be shaped by data, automations, AI, hostile actors, resources, policies, and economies. Builders who can ask better systems questions will be the ones trusted to run and improve them."
    ],
    tags: ["Critical Thinking", "Software Architecture", "Education"],
    readingTime: "5 min read",
    image: "/assets/screeps/screeps-04.jpg",
  },
  {
    handle: "why-git-matters-for-students",
    title: "Why You Learn Git in the AI Systems Programming Lab",
    category: "Tutorial",
    audience: "Tech-minded builders",
    summary:
      "Git helps you save progress, share code, compare changes, and build confidence as your idea evolves from a first script into a real project.",
    body: [
      "When you build with AI, the code can change quickly. Git gives you a way to slow the process down and make the work understandable. Every commit becomes a checkpoint: what changed, why it changed, and whether it helped.",
      "That is especially important when you use Codex. A small code change can fix a feature or break behavior somewhere else. Git gives you a path back to the last working version.",
      "By the end of the program, you have more than a project. You have a small software portfolio: commit history, notes, screenshots or match clips, architecture notes, and tournament reflections that show how your thinking developed."
    ],
    tags: ["Git", "Portfolio", "Codex"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-06.jpg",
  }
];
