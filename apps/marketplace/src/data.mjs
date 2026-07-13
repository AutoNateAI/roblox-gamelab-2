export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Programs", href: "/programs", keys: ["programs"] },
  { label: "Articles", href: "/articles", keys: ["articles"] },
  { label: "League", href: "/league", keys: ["league"] },
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
// game students build inside.
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
    handle: "what-is-screeps",
    title: "What Is Screeps?",
    category: "Guide",
    audience: "Parents, students, and program partners",
    summary:
      "Screeps is a programming strategy world where students write JavaScript to control autonomous workers. It turns coding into a visible system students can inspect, debug, and improve.",
    body: [
      "Screeps looks like a strategy game, but underneath it is a live software system. Students write code that controls tiny worker units called creeps. Those creeps harvest resources, build structures, upgrade rooms, and eventually compete against other bots.",
      "That matters because the game makes invisible programming ideas visible. A loop becomes a worker repeating a job. Bad state management becomes a stuck colony. A vague instruction becomes a bot that wastes time. Students can see why systems thinking matters.",
      "In AutoNateAI, Screeps becomes the training environment for AI-assisted software architecture. Students are not only learning syntax. They are learning how to describe behavior, use AI carefully, test code against a real environment, and explain the system they built."
    ],
    tags: ["Screeps", "Youth Coding", "Systems Thinking"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-01.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    title: "Teaching Systems Thinking Through Code",
    category: "Strategy",
    audience: "Youth program leaders and educators",
    summary:
      "A good coding program should help students understand feedback loops, constraints, resources, and tradeoffs. Screeps gives those ideas a world students can actually operate.",
    body: [
      "Most students are told to learn coding as a list of concepts: variables, loops, functions, arrays. Those concepts matter, but they become powerful when students can see why they are needed.",
      "In Screeps, a loop is not abstract. It is the colony deciding what every worker should do each tick. A function is not only a syntax pattern. It is a reusable behavior. Memory is not just data. It is the colony remembering assignments and decisions.",
      "That is the bridge to real-world software architecture. Businesses, cities, classrooms, and teams all run on systems. Students learn to ask better questions: What is the bottleneck? What is the feedback signal? What state needs to persist? What should be automated next?"
    ],
    tags: ["Critical Thinking", "Software Architecture", "Education"],
    readingTime: "5 min read",
    image: "/assets/screeps/screeps-04.jpg",
  },
  {
    handle: "why-git-matters-for-students",
    title: "Why Students Learn Git in the AI Software Architect Path",
    category: "Tutorial",
    audience: "Students and parents",
    summary:
      "Git helps students save progress, share code, compare changes, and build confidence as their bot evolves from a first script into a real project.",
    body: [
      "When students build with AI, the code can change quickly. Git gives them a way to slow the process down and make the work understandable. Every commit becomes a checkpoint: what changed, why it changed, and whether it helped.",
      "That is especially important in Screeps because the bot is alive. A small code change can improve the colony or break it. Git gives students a path back to the last working version.",
      "By the end of the program, each student has more than a bot. They have a small software portfolio: commit history, notes, screenshots, and battle-day reflections that show how their thinking developed."
    ],
    tags: ["Git", "Portfolio", "AI Coding"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-06.jpg",
  }
];
