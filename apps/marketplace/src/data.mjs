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
    title: "Why System Design Practice Beats Another Syntax Course",
    category: "Strategy",
    audience: "Developers, CS students, junior SWEs, and technical builders",
    summary:
      "The next step after writing code is learning how to design systems that make decisions, recover from failures, and explain their behavior under pressure.",
    body: [
      "A lot of builders can write features. The harder skill is knowing how those features should behave inside a changing environment. That is the gap this program is built around: not more isolated syntax practice, but better engineering judgment.",
      "Screeps gives that judgment a place to show up. Your JavaScript controls a live colony with resources, roles, APIs, memory, hostile pressure, and tradeoffs. If the architecture is weak, the colony stalls. If the state model is sloppy, decisions drift. If a change breaks something, Git shows what changed and gives you a way back.",
      "Codex matters because modern builders will work with AI. The point is not to let AI think for you. The point is to ask sharper questions, review generated code, protect working versions, and stay responsible for how the system behaves when the match starts."
    ],
    tags: ["System Design", "Codex", "Workforce Development"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-05.jpg",
  },
  {
    handle: "why-tournament-day-matters",
    title: "Why Tournament Week Makes the Learning Real",
    category: "Guide",
    audience: "Builders preparing for capture-the-flag competition",
    summary:
      "When your colony has to compete against someone else's code, architecture stops being theory and starts becoming proof.",
    body: [
      "Tournament week changes the work because the code has consequences. You are not submitting a static project. You are preparing a colony branch for capture-the-flag, where another coded system is trying to outbuild, outmaneuver, and outlast yours.",
      "That pressure makes the lessons click. Mechanics matter because the match has rules. Debugging matters because frozen logic loses time. Git matters because your battle branch needs a stable checkpoint. Memory matters because the colony has to remember priorities. Architecture matters because strategy should be changeable without rewriting everything.",
      "By the end, you can talk about your project like an engineer. You can explain the environment, the assumptions, the decisions, the failures, the fixes, and what happened when the system had to perform. Phase 2 turns that same format into league play, giving serious builders a reason to keep improving after the cohort ends."
    ],
    tags: ["Tournament Week", "Capture the Flag", "Screeps"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-08.jpg",
  },
  {
    handle: "screeps-as-a-systems-lab",
    title: "Why Screeps Works as an AI Systems Lab",
    category: "Guide",
    audience: "JavaScript builders learning system design",
    summary:
      "Screeps makes software architecture visible: JavaScript controls the colony, APIs expose the world, and every design choice shows up in motion.",
    body: [
      "Screeps is not a coding worksheet with a game theme. It is the world your software has to operate inside. Your code reads room objects, controls creeps, gathers energy, upgrades controllers, builds structures, reacts to threats, and decides what should happen next.",
      "That makes abstract engineering ideas easier to see. The room becomes an environment model. Creeps become components with roles. Memory becomes persistent state. Spawn logic becomes a production pipeline. Hostile pressure becomes a test of whether your system can keep making useful decisions.",
      "Adding Codex raises the bar instead of lowering it. You can move faster, but you still have to understand the APIs, review the plan, test the change, commit the working version, and explain why the colony behaves the way it does."
    ],
    tags: ["Screeps", "AI Systems", "JavaScript"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-03.jpg",
  },
  {
    handle: "what-is-screeps",
    title: "Why Build a Colony Instead of Another App Clone",
    category: "Guide",
    audience: "Programmers who want a more serious project",
    summary:
      "A colony gives every technical idea a job: APIs, automation, state, resource constraints, debugging, Git history, AI review, and strategy.",
    body: [
      "App clones can be useful, but they often hide the part of engineering that matters most: what should the system do when the environment changes? Screeps keeps that question in front of you because the colony is always running, spending resources, taking damage, filling jobs, and exposing weak assumptions.",
      "That turns familiar tools into connected practice. JavaScript controls behavior. APIs reveal the world. Memory carries decisions forward. Git captures experiments. Codex helps plan and review changes. The game mechanics force you to decide what matters first.",
      "The result is a project with a story. You can show the repo, explain the architecture, walk through the decisions, describe how AI helped, and point to what happened when your colony entered competition."
    ],
    tags: ["Portfolio Project", "Automation", "Screeps"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-01.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    title: "How Game Mechanics Become Software Architecture",
    category: "Strategy",
    audience: "Builders training for AI, automation, and software roles",
    summary:
      "The mechanics are not decoration. They are the reason builders learn to model environments, design components, manage state, and make tradeoffs.",
    body: [
      "The best part of Screeps is that the mechanics are doing real teaching. A resource shortage is not just a game problem. It is a capacity planning problem. A broken creep role is not just a bug. It is a component design problem. A hostile room is not just danger. It is a test of how your system reacts under pressure.",
      "That is how code becomes architecture. A loop becomes the colony's operating rhythm. A function becomes reusable behavior. Memory becomes long-running state. A branch becomes a strategy experiment. Codex becomes a build partner that still needs direction, review, and constraints.",
      "This is the kind of practice builders need for a world shaped by data, automations, AI, hostile actors, resources, policies, and economies. The strongest people will not be the ones who memorize the most syntax. They will be the ones who can read the system, reason through the tradeoffs, and make better decisions."
    ],
    tags: ["Software Architecture", "Strategy", "AI Systems"],
    readingTime: "5 min read",
    image: "/assets/screeps/screeps-04.jpg",
  },
  {
    handle: "why-git-matters-for-students",
    title: "Why Git Matters When AI Is Moving Fast",
    category: "Tutorial",
    audience: "Builders using Codex on real code",
    summary:
      "AI can help you move faster, but Git keeps the work understandable, recoverable, and ready for tournament pressure.",
    body: [
      "Codex can help you change a system quickly. That is powerful, but it also means you need a way to keep the work grounded. Git gives every experiment a checkpoint: what changed, why it changed, and whether the colony improved.",
      "In Screeps, that matters immediately. A spawn change can unlock growth or break your worker pipeline. A new role can make the colony smarter or drain energy at the wrong time. A tournament branch needs to be stable enough to battle, even while you keep testing better ideas.",
      "By the end of the cohort, Git is not just a tool you learned because engineers use it. It is the record of your thinking: commits, diffs, recovery moments, architecture notes, and the path from first working colony to battle-ready system."
    ],
    tags: ["Git", "Codex", "Tournament Branch"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-06.jpg",
  }
];
