// AutoNateAI Operator OS — the 2026-09-28 repositioning. AutoNateAI now
// sells (and researches) a repeatable conversational operating system for
// contractors, operators, and small businesses: the owner talks to the
// business through ChatGPT/Claude, the state lives in a structured graph
// (Airtable today), a custom cockpit shows what the AI sees, and AutoNateAI
// architects + scales the features. Source of truth for the offer, pricing,
// and the 14-question content queue is the "AutoNateAI Operator OS
// Playbook" PDF (Google Drive, 2026-09-28).
//
// The earlier agricultural research articles (data.mjs `investigations`)
// were unpublished on 2026-09-28 so they stop competing in search.

// --- Research & Case Studies: the 14-day discovery-question queue --------
//
// Each record is one operator question from the playbook's "Questions that
// can create discovery calls" list. `status: "draft"` means the page is a
// scaffold: it renders the question, the hook, and the article outline, is
// served `noindex`, and is left out of the sitemap. When a skill fills in
// the Markdown at `sourcePath` with the real researched article, flip
// `status` to "published" and set `publishedDate` — the page becomes
// indexable and joins the sitemap automatically.
export const operatorArticles = [
  {
    n: 1,
    slug: "contractor-lead-capacity-follow-up-breaking-point",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "call_split",
    title: "How Many Leads Can a Contractor Realistically Manage Before Follow-Up Starts Breaking?",
    question: "How many leads can a contractor realistically manage before follow-up starts breaking?",
    hook: "For an owner-operator, follow-up starts breaking around 20\u201325 new leads a month. Not from lack of hustle, but because the clock and your working memory both hit their ceilings.",
    audience: ["Contractors & Trades"],
    queueDate: "2026-09-29",
    ogHeadline: "HOW MANY LEADS BEFORE FOLLOW-UP BREAKS?",
    ogScene: "a Latino contractor sitting in a work-truck cab at dusk, a phone buzzing with stacked unread text notifications, a clipboard of handwritten job leads on the dash",
  },
  {
    n: 2,
    slug: "cost-of-one-missed-estimate-hvac-electrical-contractor",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "request_quote",
    title: "What Does One Missed Estimate Actually Cost an HVAC or Electrical Contractor?",
    question: "What does one missed estimate actually cost an HVAC or electrical contractor?",
    hook: "A silent HVAC estimate costs about $2,900 in expected revenue: the install, the repairs, the plan, and the referral. It never shows up as a loss anywhere.",
    audience: ["Contractors & Trades"],
    queueDate: "2026-09-30",
    ogHeadline: "WHAT DOES ONE MISSED ESTIMATE ACTUALLY COST?",
    ogScene: "an HVAC technician's clipboard with an unsigned estimate form resting on top of an outdoor AC condenser unit beside a suburban home",
  },
  {
    n: 3,
    slug: "why-another-crm-increases-owner-cognitive-load",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "stacked_bar_chart",
    title: "Why Does Adding Another CRM Often Increase the Owner's Cognitive Load?",
    question: "Why does adding another CRM often increase the owner's cognitive load?",
    hook: "A CRM stores information. It doesn't carry it. Add one more tool that doesn't share memory and you've added pairs to reconcile, and the owner is still the integration layer.",
    audience: ["All Operators"],
    queueDate: "2026-10-01",
    ogHeadline: "WHY ANOTHER CRM MADE YOUR JOB HARDER",
    ogScene: "a Black woman small-business owner with her head in her hand at a cluttered desk with three laptops and a tablet each showing a different generic dashboard, sticky notes covering the monitor edges",
  },
  {
    n: 4,
    slug: "what-should-happen-after-a-new-prospect-enters-your-business",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "person_add",
    title: "What Should Happen Automatically After a New Prospect Enters Your Business?",
    question: "What should happen automatically after a new prospect enters your business?",
    hook: "Six things should happen automatically in the first 48 hours: capture, recognize, acknowledge, research, route, follow up. In most shops the owner does all six by hand, hours late.",
    audience: ["All Operators"],
    queueDate: "2026-10-02",
    ogHeadline: "A NEW PROSPECT JUST SHOWED UP. NOW WHAT?",
    ogScene: "a glowing network graph of connected contact nodes on a dark screen, one new bright node just appearing with lines branching to research, task, and follow-up nodes",
  },
  {
    n: 5,
    slug: "five-person-company-fifty-person-information-discipline",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "groups",
    title: "Can a 5-Person Company Operate With the Information Discipline of a 50-Person Company?",
    question: "Can a 5-person company operate with the information discipline of a 50-person company?",
    hook: "Big companies pay whole teams to keep information straight. Small ones pay with the owner's evenings. AI finally makes the clerical half of that discipline affordable.",
    audience: ["All Operators"],
    queueDate: "2026-10-03",
    ogHeadline: "5 PEOPLE. 50-PERSON DISCIPLINE.",
    ogScene: "a small team of five tradespeople and office staff gathered around a large wall monitor showing an organized operations dashboard in a modest workshop office",
  },
  {
    n: 6,
    slug: "what-your-ai-should-know-before-recommending-your-next-sales-action",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "psychology",
    title: "What Information Should Your AI Know Before It Recommends Your Next Sales Action?",
    question: "What information should your AI know before it recommends your next sales action?",
    hook: "ChatGPT gives confident advice about a business it has never seen. Seven layers of context turn a generic answer into a real sales recommendation.",
    audience: ["All Operators"],
    queueDate: "2026-10-04",
    ogHeadline: "YOUR AI DOESN'T KNOW YOUR BUSINESS. YET.",
    ogScene: "a laptop showing a chat conversation on the left and a structured relationship graph of customers and jobs on the right, lines connecting the two",
  },
  {
    n: 7,
    slug: "prospects-clients-partners-goals-tasks-one-relationship-graph",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "hub",
    title: "Why Should Prospects, Clients, Partners, Goals, and Tasks Live in One Relationship Graph?",
    question: "Why should prospects, clients, partners, goals, and tasks live in one relationship graph?",
    hook: "The same person moves from prospect to client to partner. Split them across lists and you can't see who actually feeds your business, or that referred customers are worth more.",
    audience: ["All Operators", "Real Estate"],
    queueDate: "2026-10-05",
    ogHeadline: "ONE GRAPH. EVERY RELATIONSHIP.",
    ogScene: "an elegant glowing relationship graph floating above a desk, nodes labeled only by simple icons for people, companies, goals and tasks, connected by emerald lines",
  },
  {
    n: 8,
    slug: "every-meeting-automatically-changes-the-operating-plan",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "event_repeat",
    title: "What Would Your Business Look Like if Every Meeting Automatically Changed the Operating Plan?",
    question: "What would your business look like if every meeting automatically changed the operating plan?",
    hook: "55% of workers say next steps after meetings are unclear, and memory fades fastest in the first hours. A 60-second capture can turn every meeting into a changed plan.",
    audience: ["Professional Services", "All Operators"],
    queueDate: "2026-10-06",
    ogHeadline: "EVERY MEETING SHOULD CHANGE THE PLAN",
    ogScene: "two people shaking hands after a meeting in a small office, a wall screen behind them updating a task board with new cards appearing",
  },
  {
    n: 9,
    slug: "rank-500-prospects-without-inspecting-500-rows",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "leaderboard",
    title: "How Do You Rank 500 Prospects Without Asking the Owner to Inspect 500 Rows?",
    question: "How do you rank 500 prospects without asking the owner to inspect 500 rows?",
    hook: "A licensing scrape hands you 500 names. De-duplicate, enrich, and score them transparently, and the owner reviews 15 with the reasons attached. That's a 16x cut in review time.",
    audience: ["Contractors & Trades", "Local B2B"],
    queueDate: "2026-10-07",
    ogHeadline: "500 PROSPECTS. LOOK AT 15.",
    ogScene: "a long spreadsheet of hundreds of rows fading into the distance, collapsing into a short ranked list of five glowing cards in the foreground",
  },
  {
    n: 10,
    slug: "what-should-a-contractor-automate-first",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "construction",
    title: "What Should a Contractor Automate First: Lead Generation, Quoting, Dispatch, or Follow-Up?",
    question: "What should a contractor automate first: lead generation, quoting, dispatch, or follow-up?",
    hook: "Follow-up first, then quoting, then dispatch, with lead gen last. At $128 a paid HVAC lead, fixing follow-up adds as many jobs as 25% more ads, and makes every lead cheaper.",
    audience: ["Contractors & Trades"],
    queueDate: "2026-10-08",
    ogHeadline: "LEADS, QUOTES, DISPATCH, OR FOLLOW-UP?",
    ogScene: "four tools laid out on a workbench — a phone, a quote clipboard, a truck key, and a calendar — under warm shop light, each with a small glowing tag",
  },
  {
    n: 11,
    slug: "what-a-useful-ai-dashboard-shows-that-chatgpt-alone-cannot",
    status: "published",
    publishedDate: "2026-09-28",
    icon: "dashboard",
    title: "What Does a Useful AI Dashboard Show That ChatGPT Alone Cannot?",
    question: "What does a useful AI dashboard show that ChatGPT alone cannot?",
    hook: "Chat is great for changing the business and a keyhole for seeing it. A cockpit shows state at a glance, including what your AI just did, so you catch what you didn't know to ask.",
    audience: ["All Operators"],
    queueDate: "2026-10-09",
    ogHeadline: "CHAT CHANGES IT. THE COCKPIT SHOWS IT.",
    ogScene: "a dual-monitor workstation: one screen a chat window, the other a clean operations cockpit with timeline, graph and task columns, both in dark mode",
  },
  {
    n: 12,
    slug: "can-your-business-get-easier-to-operate-as-it-gets-more-complex",
    icon: "trending_up",
    title: "Can Your Business Become Easier to Operate as It Becomes More Complex?",
    question: "Can your business become easier to operate as it becomes more complex?",
    hook: "Growth usually means more tools, more people, more things to remember. It doesn't have to mean more load on the owner.",
    audience: ["All Operators"],
    queueDate: "2026-10-10",
    ogHeadline: "MORE COMPLEX. EASIER TO RUN.",
    ogScene: "a small business owner calmly reviewing a tablet while behind them a busy operation of trucks, crews and an office runs in soft focus",
  },
  {
    n: 13,
    slug: "using-ai-vs-building-an-ai-operating-system",
    icon: "memory",
    title: "What Is the Difference Between Using AI and Building an AI Operating System?",
    question: "What is the difference between using AI and building an AI operating system?",
    hook: "58% of small businesses already use generative AI. Almost none of them are structured so the AI can operate inside the business.",
    audience: ["All Operators"],
    queueDate: "2026-10-11",
    ogHeadline: "USING AI VS. BUILDING AN AI OPERATING SYSTEM",
    ogScene: "a split image: on the left a lone chat window on a phone, on the right the same phone connected by glowing lines to a structured system of data, cockpit and agents",
  },
  {
    n: 14,
    slug: "how-much-owner-attention-your-software-stack-consumes-every-week",
    icon: "hourglass_bottom",
    title: "How Much Owner Attention Is Your Current Software Stack Consuming Every Week?",
    question: "How much owner attention is your current software stack consuming every week?",
    hook: "Nobody invoices you for the hours spent being the glue between your tools. That doesn't make them free.",
    audience: ["All Operators"],
    queueDate: "2026-10-12",
    ogHeadline: "YOUR SOFTWARE IS BILLING YOU IN HOURS",
    ogScene: "an hourglass on a small-business desk, its sand made of tiny app icons draining down, a tired middle-aged Asian American shop owner behind it beside a laptop",
  },
].map((article) => ({
  status: "draft",
  publishedDate: null,
  thumbnail: `/assets/og/${article.slug}.jpg`,
  sourcePath: `../content/operator-os/${article.slug}.md`,
  ...article,
}));

export const operatorArticleStatusLabels = {
  draft: "In Research",
  published: "Published",
};

// --- Who it's for (playbook §03) -------------------------------------------
export const operatorSegments = [
  {
    icon: "construction",
    name: "Contractors & Trades",
    examples: "HVAC, electrical, plumbing, roofing, warranty contractors",
    uses: ["Lead intake and follow-up", "Quoting and dispatch", "Licensing and compliance", "Job history"],
  },
  {
    icon: "real_estate_agent",
    name: "Real-Estate Operators",
    examples: "Brokerages, investors, property managers, rehab operators",
    uses: ["Private-network deal graph", "Lead and property ranking", "Vendor and contractor graph", "Follow-up engine"],
  },
  {
    icon: "work",
    name: "Professional Services",
    examples: "Consultants, agencies, small firms",
    uses: ["Prospect research", "Proposal pipeline", "Project delivery", "Meeting memory"],
  },
  {
    icon: "volunteer_activism",
    name: "Nonprofits & Community Orgs",
    examples: "Small teams running grants, programs, and referrals",
    uses: ["Referral graph", "Program outcomes", "Grant intelligence", "Sponsor pipeline"],
  },
  {
    icon: "local_shipping",
    name: "Local B2B Operators",
    examples: "Distributors, service firms, niche operators",
    uses: ["Account intelligence", "Outreach", "Scheduling", "Operations dashboard"],
  },
];

// --- The repeatable stack (playbook §02) -----------------------------------
export const operatorStack = [
  { icon: "forum", layer: "Conversation", role: "Natural-language command and reasoning surface", tools: "ChatGPT, Claude" },
  { icon: "database", layer: "Structured memory", role: "Canonical business state and relationships", tools: "Airtable" },
  { icon: "travel_explore", layer: "Research", role: "Investigation, synthesis, enrichment, ranking", tools: "ChatGPT + web/data agents" },
  { icon: "terminal", layer: "Build / scale", role: "Low-level implementation and feature growth", tools: "Codex, Claude Code, local coding agents" },
  { icon: "mail", layer: "Communication", role: "Inbound and outbound operational channel", tools: "Gmail" },
  { icon: "event", layer: "Meetings", role: "Scheduled human interaction", tools: "Google Calendar" },
  { icon: "folder_open", layer: "Assets", role: "Documents, reports, shared artifacts", tools: "Google Drive" },
  { icon: "monitoring", layer: "Interface", role: "Visual operational context and controls", tools: "Custom web cockpit" },
  { icon: "radar", layer: "Custom intelligence", role: "Business-specific acquisition and decision systems", tools: "Scrapers, rankers, alerts, automations" },
];

// --- The operating graph underneath every install --------------------------
export const operatorGraphEntities = [
  { icon: "apartment", name: "Organizations", note: "The companies in your world — customers, vendors, partners, prospects." },
  { icon: "person", name: "People", note: "Everyone you know, with or without an organization attached." },
  { icon: "handshake", name: "Relationships", note: "Prospect, client, partner — a role that changes over time, not a separate database." },
  { icon: "flag", name: "Goals", note: "A specific outcome with a target and a date, created once the research says it's real." },
  { icon: "folder_special", name: "Projects", note: "Agreed work for a client, carrying its own goals, touchpoints and evidence." },
  { icon: "event_available", name: "Touchpoints", note: "Every call, meeting, and message — attached to the relationship it moved." },
  { icon: "task_alt", name: "Tasks", note: "Global execution nodes that flow into the daily timebox, wherever they were created." },
  { icon: "forum", name: "Research Memory", note: "Nested comment threads written by you, your AI, your agents, and your scrapers." },
];

// --- Commercial model (playbook §04) ---------------------------------------
export const operatorPackages = [
  {
    id: "foundation",
    name: "Foundation",
    price: "$3,500–$5,000",
    unit: "one-time build",
    summary: "The core operating system around one part of your business.",
    includes: ["Core data model for your operation", "One live cockpit", "ChatGPT / Claude conversation layer", "Email, calendar, and file integration", "1–2 workflows mapped and running", "Onboarding"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$6,500–$10,000",
    unit: "one-time build",
    featured: true,
    summary: "The full relationship graph — prospects, clients, partners — with research memory and automations.",
    includes: ["Multiple workflows", "Prospect / client / partner graph", "Richer cockpit views", "Nested research memory", "Automations and reports", "2–4 integrations"],
  },
  {
    id: "operational",
    name: "Operational",
    price: "$12,000–$20,000+",
    unit: "one-time build",
    summary: "Multi-role teams, permissions, custom intelligence, and production hardening.",
    includes: ["Multi-role workflows", "Permissions", "Custom intelligence modules", "Deeper integrations", "Production hardening and analytics", "Deployment support"],
  },
  {
    id: "care",
    name: "Care + Evolution",
    price: "$500–$2,000",
    unit: "per month",
    summary: "We keep it healthy and keep it growing as the business does.",
    includes: ["Monitoring", "Prompt and workflow tuning", "Schema evolution", "Minor features", "Agent and integration maintenance", "Advisory"],
  },
];

export const operatorModules = [
  { icon: "travel_explore", name: "Prospect scraper / enrichment", price: "$1,500–$4,000", note: "Licensing boards, county records, directories, and websites turned into profiles in your graph." },
  { icon: "leaderboard", name: "Prospect ranker / scoring model", price: "$1,000–$3,000", note: "So you review the 15 that matter instead of the 500 that exist." },
  { icon: "cable", name: "New API integration", price: "$750–$2,500", note: "Connect the tool you already pay for into the same memory." },
  { icon: "dashboard_customize", name: "Custom dashboard / module", price: "$1,000–$3,500", note: "A new view in the cockpit for a workflow that deserves one." },
  { icon: "description", name: "Document / report generator", price: "$750–$2,000", note: "Proposals, briefs, and reports drafted from the graph." },
  { icon: "notifications_active", name: "Monitoring / alert agent", price: "$750–$2,500", note: "Watches a source or a threshold and routes what changed to you." },
];

export const operatorFaqs = [
  ["Do I need to be technical to run this?", "No. You operate it by talking to ChatGPT or Claude and looking at your cockpit. AutoNateAI designs the architecture, builds the interface, and handles feature growth. If you ever want to go lower-level with a local coding agent, you can — but you never have to."],
  ["What does \"operating it through conversation\" actually mean?", "You tell your AI what happened — \"met Dana at the chamber mixer, she runs a brokerage, follow up Thursday\" — and it writes to your structured business memory: the person, the organization, the relationship, the task. The cockpit updates live so you can see what the AI saw and verify it."],
  ["Is this just a CRM?", "No. A CRM stores contacts. The Operator OS connects relationships to goals, goals to tasks, and tasks to your actual daily attention — and gives your AI the full context to reason about all of it. Prospects, clients, and partners are roles in one graph, not three databases."],
  ["What tools does it run on?", "Typically ChatGPT or Claude for conversation, Airtable for the structured memory, Gmail, Google Calendar, and Google Drive for communication and files, and a custom web cockpit we build for you. We work with what you already use where it makes sense."],
  ["How long does a Foundation build take?", "Most Foundation installs run two to four weeks from discovery to a working cockpit, depending on how many workflows we're mapping and how quickly we can get access to the tools involved."],
  ["Why is a scraper or ranker priced separately?", "Because it's real engineering with real running costs — data sources, anti-bot measures, enrichment, and ongoing maintenance. The value isn't the button; it's a reliable pipeline that keeps putting qualified names in front of you."],
  ["Who owns the data?", "You do. Your business memory lives in accounts you own. We architect and maintain the system; we don't hold your data hostage."],
  ["Can I see it working before I buy?", "Yes — that's what the discovery call is for. We show you AutoNateAI's own operating cockpit running live, then a simulated version modeled on your business from information we can already observe."],
  ["What happens after the build?", "Care + Evolution keeps it healthy: monitoring, workflow tuning, schema changes as your business changes, and small features. Bigger additions — a scraper, a ranker, a new module — are scoped and priced individually."],
  ["What's the discovery call?", "A 20–30 minute conversation about where your business is carrying too much in the owner's head. We'll tell you straight whether the Operator OS is a fit, and which package — if any — makes sense."],
];

// U.S. Chamber of Commerce, "Empowering Small Business" (2025).
export const operatorResearchSignal = {
  stat: "58%",
  was: "23%",
  label: "of U.S. small businesses reported using generative AI in 2025, up from 23% in 2023.",
  source: "U.S. Chamber of Commerce, Empowering Small Business (2025)",
  url: "https://www.uschamber.com/technology/empowering-small-business-the-impact-of-technology-on-u-s-small-business",
};
