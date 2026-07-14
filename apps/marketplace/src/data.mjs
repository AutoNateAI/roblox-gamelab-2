export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Program", href: "/programs", keys: ["programs"] },
  { label: "Articles", href: "/articles", keys: ["articles"] },
  { label: "Demo Day", href: "/league", keys: ["league"] },
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
    handle: "screeps-as-a-systems-lab",
    title: "Why Screeps Works as a Systems Lab",
    category: "Guide",
    audience: "Parents, schools, churches, and youth program partners",
    summary:
      "Screeps lets students see software architecture in motion. Their JavaScript controls a live colony, so programming concepts become visible decisions, failures, and improvements.",
    body: [
      "Screeps is not just a game added onto a coding class. It is the environment where the software system lives. Students write JavaScript that controls workers, manages energy, upgrades rooms, and decides what the colony should do next.",
      "That makes abstract programming easier to understand. A variable can track state. A function can become a reusable creep behavior. A conditional can decide whether to harvest or transfer energy. Memory can store assignments across game ticks. Git can protect the last working version before a student tries a new strategy.",
      "For buyers, the value is that students are practicing production-style thinking in a contained environment. They learn to explain what the system does, inspect failures, ask Codex better questions, commit changes, and improve the architecture instead of only chasing syntax."
    ],
    tags: ["Screeps", "Software Systems", "Youth Programming"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-03.jpg",
  },
  {
    handle: "what-is-screeps",
    title: "Why Students Build a Real System",
    category: "Guide",
    audience: "Parents, schools, churches, and youth program partners",
    summary:
      "Students learn faster when programming concepts connect to one working project. A real system gives variables, functions, data, APIs, automation, and Git a reason to exist.",
    body: [
      "Many students are introduced to coding as a list of topics: variables, functions, conditionals, loops, and syntax. Those topics matter, but they become easier to retain when students can see how each piece helps a larger system work.",
      "The AutoNateAI lab is built around that idea. Students do not only complete disconnected exercises. They build a project with inputs, decisions, outputs, data, version history, and automation opportunities.",
      "That gives buyers a clearer outcome to evaluate. At the end, students can show the code, explain the architecture, walk through Git history, and describe how AI helped without pretending the AI did all the thinking."
    ],
    tags: ["Youth Programming", "Systems Thinking", "Project-Based Learning"],
    readingTime: "4 min read",
    image: "/assets/screeps/screeps-01.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    title: "Teaching Systems Thinking Through Code",
    category: "Strategy",
    audience: "Youth program leaders and educators",
    summary:
      "A good coding program should help students understand feedback loops, constraints, resources, and tradeoffs. A real project gives those ideas something students can operate.",
    body: [
      "Most students are told to learn coding as a list of concepts: variables, loops, functions, arrays. Those concepts matter, but they become powerful when students can see why they are needed.",
      "In the lab, a loop is not abstract. It is the system checking for new work. A function is not only a syntax pattern. It is a reusable behavior. Data is not just a value. It is what the system remembers and acts on.",
      "That is the bridge to real-world software architecture. Businesses, cities, classrooms, and teams all run on systems. Students learn to ask better questions: What is the bottleneck? What is the feedback signal? What state needs to persist? What should be automated next?"
    ],
    tags: ["Critical Thinking", "Software Architecture", "Education"],
    readingTime: "5 min read",
    image: "/assets/screeps/screeps-04.jpg",
  },
  {
    handle: "why-git-matters-for-students",
    title: "Why Students Learn Git in the AI Systems Programming Lab",
    category: "Tutorial",
    audience: "Students and parents",
    summary:
      "Git helps students save progress, share code, compare changes, and build confidence as their idea evolves from a first script into a real project.",
    body: [
      "When students build with AI, the code can change quickly. Git gives them a way to slow the process down and make the work understandable. Every commit becomes a checkpoint: what changed, why it changed, and whether it helped.",
      "That is especially important when students use Codex. A small code change can fix a feature or break behavior somewhere else. Git gives students a path back to the last working version.",
      "By the end of the program, each student has more than a project. They have a small software portfolio: commit history, notes, screenshots or demo clips, architecture notes, and final reflections that show how their thinking developed."
    ],
    tags: ["Git", "Portfolio", "Codex"],
    readingTime: "3 min read",
    image: "/assets/screeps/screeps-06.jpg",
  }
];
