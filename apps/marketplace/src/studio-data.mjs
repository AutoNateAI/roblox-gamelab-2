// AutoNateAI as a research and educational media company (2026-10-18 repositioning).
// AutoNateAI = the research + commercial side (independent investigations, commissioned series, partnerships).
// Bot That Lyfe (botthatlyfe.com) = our original computer-science series. The Operator OS pages are archived
// (operator-os-data.mjs / operator-os-pages.mjs stay in the repo, unpublished).

export const studioPillars = [
  {
    icon: "travel_explore",
    title: "Original Research",
    text: "Every series starts as an investigation: the subject, the audience, the evidence, the people and places that make it real. Sources are cited and claims are checked before a single line is written.",
  },
  {
    icon: "movie",
    title: "Animated Productions",
    text: "Original characters, story arcs with real stakes, voice, music and 3Blue1Brown-style teaching visuals, produced end to end and delivered for YouTube, social and the classroom.",
  },
  {
    icon: "handshake",
    title: "Custom Series",
    text: "Commissioned storytelling for schools, nonprofits, programs and startups: your mission, your audience and your subject turned into a series people actually finish.",
  },
  {
    icon: "school",
    title: "Learning Materials",
    text: "One investigation, many assets: workbooks with homework and answer keys, instructor guides, course pages, reels and share cards come with the series.",
  },
];

export const studioProcess = [
  ["travel_explore", "Research", "We investigate the subject and your audience: curriculum, field research, sources, interviews, the real names and places your people know."],
  ["edit_note", "Story", "We build the spine: a human story where the concept is the way out, a diverse cast with backstories, an arc that pays off across episodes."],
  ["movie", "Production", "Script, voice, music and animation. Lessons become full-screen visual explanations; drama and comedy carry the viewer between them."],
  ["rate_review", "Review", "You watch every cut on a private review link and sign off before anything goes public. Edits re-render scene by scene."],
  ["rocket_launch", "Deliver", "Published to your channel or ours: playlists, SEO descriptions with chapters, thumbnails, reels, PDFs, a landing page."],
];

// The work. `kind`: original (Bot That Lyfe) or commissioned.
export const studioSeries = [
  {
    handle: "the-curve",
    title: "The Curve",
    kind: "Original · Bot That Lyfe",
    subject: "Discrete mathematics & proofs (EECS 203)",
    logline: "Most of the class is failing discrete math. Five strangers have to learn logic, proofs, infinity, induction, counting and graphs together, and find out the curve was never the real test.",
    image: "/assets/studio/series/the-curve-key-art.jpg",
    episodes: 6,
    playlist: "https://www.youtube.com/playlist?list=PLA7Y3OruxDgg",
    page: "https://botthatlyfe.com/courses/the-curve/",
    extras: ["6 episodes", "6 reels", "Workbook + homework", "Instructor guide"],
    research: "Mapped the EECS 203 syllabus (logic, proofs, sets & functions, induction, counting, graphs) to six episodes; 18 proofs worked and checked; every problem in the style of the course text.",
    sources: ["Rosen, Discrete Mathematics and Its Applications", "Wason (1968), the selection task", "Cantor (1891), the diagonal argument", "Euler (1736), the bridges of Königsberg", "Golomb (1954), tromino tilings"],
    featured: "KGQg46E-7QA",
  },
  {
    handle: "the-next-step",
    title: "The Next Step",
    kind: "Commissioned · STEM Innovation Network",
    subject: "A STEM expo, financial literacy, AI and community health",
    logline: "Two seasons built around the STEMNet Blue Zone Innovation Expo at Virginia State University: a mentor's stroke, an AI voice-clone scam on a grandmother's rent money, and the kids who show up for each other.",
    image: "/assets/studio/series/the-next-step-s2.jpg",
    episodes: 6,
    playlist: "https://www.youtube.com/playlist?list=PLDnaAMb78x3Q",
    playlists: [
      ["Season 1", "https://www.youtube.com/playlist?list=PLetJmFUPZMNI"],
      ["Season 2", "https://www.youtube.com/playlist?list=PLDnaAMb78x3Q"],
    ],
    extras: ["2 seasons", "Event guide PDF", "Real partners named, never portrayed"],
    research: "Researched the expo program, the partner organizations and the community the students come from (housing authority programs, Blue Zones, financial-literacy expos, AI for seniors), then wrote real names and places into the dialogue so the audience hears what they know.",
    sources: ["Client program materials and agenda", "Partner organization public materials", "Local news coverage of prior events"],
  },
  {
    handle: "the-context-window",
    title: "The Context Window",
    kind: "Original · Bot That Lyfe",
    subject: "Prompt engineering, context, hallucinations, SQL & graphs",
    logline: "A sitcom about a startup team learning to work with AI: why bad prompts get bad answers, why more context can make it worse, fake packages, the JOIN that lies, and graph memory.",
    image: "/assets/studio/series/the-context-window.jpg",
    episodes: 6,
    playlist: "https://www.youtube.com/playlist?list=PLVomZxd75ZEs",
    page: "https://botthatlyfe.com/courses/the-context-window/",
    extras: ["6 episodes", "Course workbook", "Program brief"],
    research: "Built from written lessons on prompt and context engineering and relational and graph databases; each episode ties the skill to a cognitive-science finding with primary sources.",
    sources: ["Working-memory and priming research", "Reconstructive memory and confabulation research", "Hebbian learning"],
  },
  {
    handle: "search-party",
    title: "Search Party",
    kind: "Original · Bot That Lyfe",
    subject: "Faith, identity, AI and graph search",
    logline: "Three college students in an Agentic AI class search for God three different ways (wide, deep and not at all) while their class teaches graph search. A comedy with scripture read in context.",
    image: "/assets/studio/series/search-party.jpg",
    episodes: 6,
    playlist: "https://www.youtube.com/playlist?list=PLe6cqqmeTKuo",
    page: "https://botthatlyfe.com/courses/search-party/",
    extras: ["6 episodes", "Viewer study guide", "Group leader guide"],
    research: "Scripture read in context, the history of how images of Christ were painted, and the science of meditation, tied to breadth-first, depth-first and A* search.",
    sources: ["Blum & Harvey, The Color of Christ (2012)", "King James Version", "Graph search (BFS, DFS, A*)"],
  },
];

export const studioMarkets = [
  {
    icon: "school",
    title: "Education & EdTech",
    text: "Animated lessons, curriculum-aligned series, STEM explainers and student-engagement content, with workbooks and instructor guides.",
    example: "The Curve: a six-episode discrete math course with homework and answer keys.",
  },
  {
    icon: "diversity_3",
    title: "Nonprofits & Community Programs",
    text: "Turn your mission, research and public information into stories your community recognizes itself in, and shares.",
    example: "The Next Step: two seasons for a STEM expo and its partners.",
  },
  {
    icon: "rocket",
    title: "Funded Startups",
    text: "Explain a technical product, educate customers and show the problem your innovation solves, with research behind every claim.",
    example: "A research-backed three-episode product education series.",
  },
];

// Packages: character drama episodes plus reels; scope is confirmed on a call.
export const studioPackages = [
  {
    name: "Character Drama Explainer",
    price: "$750",
    unit: "1 episode + 3 reels",
    text: "One research-backed character drama, 3–6 minutes: a single idea told through a story and a cast, with a clear payoff.",
    includes: ["Topic research + script", "Original characters", "1 episode, 3–6 minutes", "3 reels for social (9:16)", "Voice, music, captions"],
  },
  {
    name: "Mini-Series",
    price: "$2,500",
    unit: "3 episodes + 3 reels",
    text: "The same character drama format across a short arc that teaches one subject in depth, building from episode to episode.",
    includes: ["Research brief + sources", "Story arc + cast", "3 episodes, 3–6 minutes each", "3 reels for social (9:16)", "Thumbnails + descriptions"],
  },
  {
    name: "Research Series",
    price: "$7,500",
    unit: "6 episodes + 6 reels",
    featured: true,
    text: "Our flagship: a full season of character drama with a real story arc, teaching visuals, reels and learning materials, like The Curve.",
    includes: ["Deep research + source library", "6 episodes, 5–8 minutes each", "6 reels for social (9:16)", "Workbook / guide PDF + landing page"],
  },
  {
    name: "Institutional Series",
    price: "Quoted",
    unit: "multi-season, multi-audience",
    text: "Curriculum programs, multi-season series, partner networks and co-branded courses.",
    includes: ["Curriculum or program alignment", "Multiple seasons", "Partner and stakeholder review", "Distribution plan"],
  },
];

export const studioFaqs = [
  ["What does AutoNateAI actually make?", "Animated series built on real research. We investigate a subject, build a story and a cast around it, and produce finished episodes with the teaching visuals, reels and learning materials that go with them."],
  ["How is AutoNateAI related to Bot That Lyfe?", "Bot That Lyfe (botthatlyfe.com) is where we publish our original computer-science series and free courses. AutoNateAI is the research and commercial side: independent investigations, commissioned series and partnerships. Bot That Lyfe is the proof of what the studio makes."],
  ["Do you use AI?", "Yes, behind the scenes: research tooling, voice, and a production engine we built ourselves. The stories, the research checks and the final cut are human decisions, and every series is reviewed before it's published."],
  ["How long does a series take?", "A single explainer can turn around in days. A six-episode series typically takes a few weeks from research to final delivery, with review links along the way."],
  ["Who owns the series?", "Commissioned work is delivered for your channels and use. Rights, branding and co-branding are agreed up front for every project."],
  ["Can you feature our real partners and places?", "Yes. We name real organizations, programs and places in dialogue so your audience hears what they know, without portraying real people or putting words in their mouths."],
];
