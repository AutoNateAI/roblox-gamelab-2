// AutoNateAI is Nathan Baker's independent AI, software, and human-systems
// research lab now — the site is a public projection of the lab's current
// research state, not a Southeast Missouri consulting brochure. See
// docs/marketplace/lab-operating-model.md for the full contract. Consulting
// and For Organizations are real, still-running services, but they're no
// longer the front door — they live under "Work With Me" on /about instead
// of primary nav. /consulting, /for-organizations, and /programs/:handle all
// still render unchanged for existing links/checkout references.
export const navItems = [
  { label: "Latest", href: "/", keys: ["home"] },
  { label: "Publications", href: "/articles", keys: ["articles"] },
  { label: "Experiments", href: "/experiments", keys: ["experiments"] },
  { label: "Projects", href: "/projects", keys: ["projects"] },
  { label: "Open Source", href: "/open-source", keys: ["open-source"] },
  { label: "Events", href: "/events", keys: ["events"] },
  { label: "Learn", href: "/tutorials", keys: ["tutorials"] },
  { label: "About", href: "/about", keys: ["about"] },
];

// Community is still a real, working page — reachable from the footer and
// in-page CTAs, not primary nav.

// ---------------------------------------------------------------------------
// THE LAB — current investigation, experiments, projects, open-source
// signals, research sources, and events. Grounded in the Sept 9, 2026
// inaugural run of the five daily research desks (California Network,
// GitHub Open Source, Research Paper, Events & Build, Mindfulness Tech):
// private source PDFs in apps/marketplace/Radar_Reports/09092026/, verified
// structured records in the "AutoNateAI California Technical Network Radar"
// Airtable base (appUHkTbaYBwqpQnA — Sources/Events/Daily Lab State tables).
// See docs/marketplace/lab-operating-model.md for the pipeline. Nothing here
// claims more activity than actually happened: the Airtable Projects and
// Experiments tables are still empty (0 records) as of this run, so those
// stay "Forming"/"Proposed" candidates, not "Running" — and every URL below
// is a real, verified link pulled from Airtable or a radar PDF, never
// invented. Once Nathan promotes a candidate into a real Airtable Project or
// Experiment, this block is the shape a live fetch should replace.
// ---------------------------------------------------------------------------

// Airtable "Daily Lab State" record 2026-09-09 — Inspectable Agent Systems
// (recWyzR95Gs8R3nui). Thesis/question/note text below is the record's
// actual Daily Thesis / Research Question / Lab Note fields, verbatim.
export const currentInvestigation = {
  slug: "inspectable-agent-systems",
  status: "Forming",
  title: "Inspectable Agent Systems",
  question:
    "What architectures make agent memory, context, execution, evaluation, provenance, and authority boundaries observable and controllable without sacrificing adaptability?",
  thesis:
    "Intelligence is becoming cheaper. Reliable structure around intelligence is becoming more valuable. Across current research, open source, technical companies, events, simulation, and human-systems work, the recurring problem is how to make intelligent systems inspectable, contextual, governable, measurable, and useful in the real world.",
  note:
    "Today's lab state converged around inspectable agent systems: graph-native context, governed memory, independent evaluation, explicit authority boundaries, and simulation-based testing. The immediate study path is to compare procedural graphs and context architectures, then connect those findings to build opportunities in MCP, spatial intelligence, and agent evaluation.",
  date: "2026-09-09",
};

export const labProjects = [
  {
    slug: "inspectable-agent-systems",
    icon: "hub",
    name: "Inspectable Agent Systems",
    status: "Forming",
    tagline: "How agentic software should represent memory, authority, state, provenance, and evaluation.",
    desks: ["California Network Radar", "GitHub Open Source Radar", "Research Paper Radar", "Events & Build Radar"],
  },
  {
    slug: "human-systems",
    icon: "psychology",
    name: "Human Systems",
    status: "Watching",
    tagline: "Contemplative practice, EEG/HRV, and neurotechnology, read through a strict evidence ladder.",
    desks: ["Mindfulness Tech Radar"],
  },
];

// Curated from the GitHub Open Source Radar (Sept 9) + Airtable Sources.
// Growth figures are the radar's own Trending-horizon counters, not lifetime
// totals. Stars/forks as captured on the run date.
export const openSourceRepos = [
  {
    slug: "semantica",
    icon: "hub",
    name: "semantica-agi/semantica",
    status: "Queued to study",
    project: "inspectable-agent-systems",
    meta: "Python · MIT · 12,497 stars · +9,951/month",
    hook: "Graph-native context, provenance, ontology, and accountable-AI layer for agents — the #1 repo out of the Sept 9 run (98/100).",
    notes: [
      "Study temporal graphs, provenance, ontology boundaries, accountable reasoning",
      "Candidate for the Context Graph vs. Context Database benchmark",
    ],
    url: "https://github.com/semantica-agi/semantica",
  },
  {
    slug: "openviking",
    icon: "account_tree",
    name: "volcengine/OpenViking",
    status: "Queued to study",
    project: "inspectable-agent-systems",
    meta: "Python · AGPL-3.0 · 36,256 stars · +8,115/month",
    hook: "A live context database unifying memory, RAG, and skills — a concrete agent-memory architecture to test against Semantica (97/100).",
    notes: [
      "Study context-database lifecycle, recall/capture filters, embeddings",
      "Run sandboxed; trace recall/capture; compare retrieval quality and cost",
    ],
    url: "https://github.com/volcengine/OpenViking",
  },
  {
    slug: "browser-use-pi",
    icon: "travel_explore",
    name: "browser-use/browser-use-pi",
    status: "Queued to study",
    meta: "JavaScript · MIT · 142 stars · created Sep 5, 2026",
    hook: "Four days old and already worth dissecting: a minimal, evaluation-driven browser agent — small enough to fully understand (95/100).",
    notes: ["Study the minimal browser control loop and eval-driven hill climbing", "Fork; mutate one policy/tool boundary; measure task success"],
    url: "https://github.com/browser-use/browser-use-pi",
  },
  {
    slug: "hermes-agent",
    icon: "smart_toy",
    name: "NousResearch/hermes-agent",
    status: "Queued to study",
    meta: "Python · MIT · 243,749 stars · +4,221/week · v0.21.1",
    hook: "A mature reference for orchestration, delegation, MCP auth, and desktop/browser control — useful as a benchmark baseline, not something to adopt wholesale (93/100).",
    notes: ["v0.21.1 (Sep 7) touched modularization, providers, scheduling, and delegation across the whole platform"],
    url: "https://github.com/NousResearch/hermes-agent",
  },
  {
    slug: "tradingagents",
    icon: "candlestick_chart",
    name: "TauricResearch/TradingAgents",
    status: "Queued to study",
    meta: "Python · Apache-2.0 · 103,727 stars · +506/day",
    hook: "Role-specialized multi-agent debate over financial data — direct overlap with agent-systems research, and linked to an arXiv paper (90/100).",
    notes: ["Reproduce on historical-only data; instrument agent disagreement vs. a single-agent baseline"],
    url: "https://github.com/TauricResearch/TradingAgents",
  },
  {
    slug: "pydantic-ai-harness",
    icon: "verified",
    name: "pydantic/pydantic-ai-harness",
    status: "Queued to study",
    meta: "Python · MIT · 873 stars · v0.30.0 current",
    hook: "A compact, typed harness — a clean baseline for comparing ergonomics, correctness, and observability against heavier frameworks (89/100).",
    notes: ["Build the same task in this harness vs. Hermes vs. a minimal custom loop"],
    url: "https://github.com/pydantic/pydantic-ai-harness",
  },
  {
    slug: "context-mode",
    icon: "compress",
    name: "mksglu/context-mode",
    status: "Queued to study",
    meta: "TypeScript · 21,606 stars · +935/week",
    hook: "Context-window optimization — isolation, compression, tool-output shaping. Becoming a first-class agent-systems problem in its own right (88/100).",
    notes: ["Benchmark token cost, latency, and task success on the same engineering workload"],
    url: "https://github.com/mksglu/context-mode",
  },
  {
    slug: "needle",
    icon: "memory",
    name: "cactus-compute/needle",
    status: "Queued to study",
    meta: "Python · 10,648 stars · +7,220/month",
    hook: "Tiny local-model inference — a useful counterweight to cloud-agent hype for on-device experiments (85/100).",
    notes: ["Benchmark on available local hardware; report latency, RAM, and task quality"],
    url: "https://github.com/cactus-compute/needle",
  },
];

// Research Paper Radar's "Experiment Queue // candidates only" (page 13) —
// explicitly not Airtable Experiments records until Nathan starts one.
export const labExperiments = [
  {
    slug: "procedural-graph-runtime",
    icon: "account_tree",
    name: "Procedural Graph Runtime",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Can a validation-gated, self-evolving execution graph (per Procedural Graphs) improve long-horizon agent workflows without increasing unsafe tool use?",
    notes: ["Sources: Procedural Graphs + AgentGrad", "Measure: completion, wrong-order tools, latency, token cost", "Artifact: graph runtime + benchmark report"],
  },
  {
    slug: "independent-test-agent",
    icon: "fact_check",
    name: "Independent Test Agent",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Does separating an independent Test agent from a Repair agent (per ExecCritic) reduce false-confidence patches without hurting resolution rate?",
    notes: ["Source: ExecCritic (open repo)", "Measure: resolved tasks, false confidence, test validity, compute", "Artifact: fail-closed repo-repair harness"],
  },
  {
    slug: "revocable-memory-graph",
    icon: "shield",
    name: "Revocable Memory Graph",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Can a graph-based retriever enforce memory revocation structurally while still preserving useful personalized context?",
    notes: ["Sources: MeClear + Revoked but Still Authoritative", "Measure: revoked-retrieval/action recovery, collateral forgetting", "Artifact: memory-governance test suite"],
  },
  {
    slug: "agentic-simulation-foundry",
    icon: "map",
    name: "Agentic Simulation Foundry",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Does a generate → retrieve → mutate → execute → score pipeline (per PlannerForge) transfer from autonomous driving to logistics, GIS, or facility-operations scenarios?",
    notes: ["Source: PlannerForge (open repo)", "Measure: scenario validity, diversity, retrieval, edit success", "Artifact: domain-neutral simulation pipeline"],
  },
  {
    slug: "safety-judge-stress-lab",
    icon: "gavel",
    name: "Safety Judge Stress Lab",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Which content-invariant wrapper transformations produce the highest disagreement across automated safety judges, and can simple ensembles resist them?",
    notes: ["Source: Style Over Substance (open repo)", "Measure: flip rate, noise floor, ensemble agreement", "Artifact: judge-robustness dashboard"],
  },
  {
    slug: "context-graph-vs-context-database",
    icon: "science",
    name: "Context Graph vs. Context Database",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Does explicit graph structure (Semantica/OpenViking) improve retrieval traceability and multi-hop reasoning over a context-database approach, at the same token cost?",
    notes: ["Repos: Semantica + OpenViking", "Same source corpus, same task set, same model", "Artifact: benchmark notebook + architecture diagrams"],
  },
  {
    slug: "temporal-gis-narratives",
    icon: "public",
    name: "Temporal GIS Narratives",
    status: "Proposed",
    project: "inspectable-agent-systems",
    question: "Can sheaf/narrative structure preserve provenance and consistency in evolving geographic knowledge graphs better than event logs?",
    notes: ["Sources: Time-Varying Data as Sheaves + graph-memory survey", "Stack: NetworkX/Neo4j + a mapping layer", "Artifact: interactive temporal map + query benchmark"],
  },
];

// Evidence-ladder reading list — real papers and mindfulness sources pulled
// from the Sept 9 Sources table (Airtable). evidenceClass keys map to
// data-evidence values in public/styles.css (.evidence-badge).
export const evidenceLabels = {
  "peer-reviewed": "Peer Reviewed",
  "preprint": "Preprint",
  "technical": "Technical Source",
  "institute-claim": "Institute Claim",
  "practitioner": "Practitioner",
  "cultural": "Cultural / Spiritual",
};

export const labSources = [
  {
    title: "Procedural Graphs: Self-Evolving Execution Structures for LLM Agents",
    authors: "Yuxing Lu, Yicheng Chen, Shanchan Wu, Sercan Ö. Arık — Google / Georgia Tech / Peking University",
    evidenceClass: "preprint",
    topic: "Agentic AI · Software Architecture",
    insight: "A localized, editable execution graph that biases the next action and can self-evolve — the strongest architecture fit of the Sept 9 research run (98/100 fit).",
    url: "https://arxiv.org/abs/2609.09153",
  },
  {
    title: "ExecCritic: Learn to Test, Test to Improve for Coding Agents",
    authors: "Leitian Tao et al. — UW-Madison / Microsoft Research / Georgia Tech",
    evidenceClass: "preprint",
    topic: "Agentic AI · Evaluation",
    insight: "Independent Test/Repair agents in a fail-closed harness reach 72.6% on SWE-bench Verified, +11.4 points over a no-test baseline.",
    url: "https://arxiv.org/abs/2609.09133",
  },
  {
    title: "PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners",
    authors: "Yuan Gao et al. — TUM AVS/MIRMI · University College London",
    evidenceClass: "peer-reviewed",
    topic: "Simulation · Robotics",
    insight: "193/200 executable scenarios vs. 144 for a baseline; planner success rises from 50.4% to 70.2% with grounded scenario generation. Accepted at EMNLP 2026.",
    url: "https://arxiv.org/abs/2609.08965",
  },
  {
    title: "MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance",
    authors: "Boyu Yang, Jiazheng Sun, Zilong Lu, Zhi Qiu, Xin Peng, Jun Zheng — Fudan University · Beijing Institute of Technology",
    evidenceClass: "preprint",
    topic: "Agent Memory · Safety",
    insight: "Reports 85.9% target recall and 82.3% task recovery across long-dialogue pools when clearing harmful/redundant agent memory.",
    url: "https://arxiv.org/abs/2609.09115",
  },
  {
    title: "Consumer-Grade Neurofeedback With Mindfulness Meditation: A Meta-Analysis",
    authors: "Multiple authors — peer-reviewed meta-analysis",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · EEG",
    insight: "Modest distress benefits, but no convincing evidence that consumer neurofeedback teaches control of a specific brain state — the methodological baseline for any Muse experiment.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12046271/",
  },
  {
    title: "EEG Oscillatory Correlates of Meditation Practice: Systematic Review & Meta-Analysis",
    authors: "Multiple authors — Neuroscience / Elsevier",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · EEG",
    insight: "Pooled alpha/beta/gamma effects during meditation are real, but measurement state materially changes effect sizes — 'one frequency = one mental state' is not supported.",
    url: "https://www.sciencedirect.com/science/article/pii/S0306452226004422",
  },
  {
    title: "HRV Biofeedback in a Global Study of Common Coherence Frequencies and Emotional States",
    authors: "Sai Balaji et al. — Scientific Reports / HeartMath-linked dataset",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · HRV",
    insight: "1.8M app-derived sessions characterize common HRV-coherence frequencies and emotion-associated patterns — observational, not a validated individual-wellbeing metric.",
    url: "https://www.heartmath.org/research/research-library/basic/hrv-biofeedback-coherence-frequencies-emotional-states/",
  },
  {
    title: "WRITER: Building Agent Memory (engineering blog)",
    authors: "WRITER Engineering",
    evidenceClass: "technical",
    topic: "Agentic AI · Memory",
    insight: "Task-, requirement-, and deliverable-oriented enterprise agent memory — the #1 California signal on Sept 9 (99/100), and the seed of the Context Graph vs. Context Database experiment.",
    url: "https://writer.com/engineering/building-agent-memory/",
  },
  {
    title: "LangChain: Organizing Context in a Multi-Agent Harness",
    authors: "Thushanth Bengre, Chester Curme — LangChain",
    evidenceClass: "technical",
    topic: "Agentic AI · Context Engineering",
    insight: "Forked subagents inheriting supervisor context, compared against retrieval and graph-context strategies for reducing repeated lookups.",
    url: "https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness",
  },
  {
    title: "Arcade: Skills Over MCP",
    authors: "Mateo Torres — Arcade.dev",
    evidenceClass: "technical",
    topic: "Agentic AI · MCP",
    insight: "Runtime divergence around MCP is appearing before the spec fully lands — a live standards/governance conversation, not a settled protocol.",
    url: "https://www.arcade.dev/blog/skills-over-mcp-explained/",
  },
  {
    title: "The Muse Headband Review: Meditation 2.0",
    authors: "The Medical Futurist — YouTube, 2026-06-11",
    evidenceClass: "practitioner",
    topic: "Human Systems · Neurotech",
    insight: "An independent reviewer's framing: Muse is a feedback aid, not a machine that produces mindfulness — useful for calibrating expectations, not evidence.",
    url: "https://www.youtube.com/watch?v=YifvLHvLckA",
  },
  {
    title: "This Is Your Brain on Meditation",
    authors: "Joe Dispenza — Gaia",
    evidenceClass: "cultural",
    topic: "Human Systems · Contemplative",
    insight: "Presents meditation, neuroplasticity, and self-transformation claims in a spiritual frame — useful for generating falsifiable questions, not as scientific evidence.",
    url: "https://www.gaia.com/video/your-brain-meditation-joe-dispenza",
  },
];

// Real events from the Airtable Events table (Sept 9 Events & Build +
// Mindfulness Tech radar runs) — every url/date/location below is a verified
// field value, not a guess. `status` mirrors Airtable's own Status field
// (Discovered / Considering) rather than claiming registration/attendance.
export const labEvents = [
  { name: "Stanford CCARE — Conversations on Compassion: Hidden Happiness with Venerable Ani Choyang", type: "Seminar / Talk", start: "2026-09-10", location: "Stanford University, Palo Alto, CA", virtual: false, status: "Considering", topics: ["Mindfulness", "Human Systems"], why: "Immediate California networking opportunity at the intersection of contemplative practice, neuroscience training, and compassion research.", url: "https://ccare.stanford.edu/events/conversations-on-compassion-hidden-happiness-with-venerable-ani-choyang/" },
  { name: "UC Berkeley Law AI Institute 2026", type: "Conference", start: "2026-09-15", end: "2026-09-17", location: "Berkeley, CA — livestream available", virtual: false, status: "Discovered", topics: ["AI / ML", "Cybersecurity", "Human Systems"], why: "AI-governance and rollout network — how enterprise agent permissions, logging, and human signoff translate governance into software controls.", url: "https://executive.law.berkeley.edu/programs/berkeley-law-ai-institute/" },
  { name: "The Buddha, the Brain, and Bach: Exploring Practice in Mind, Music, and Life", type: "Workshop", start: "2026-09-14", end: "2026-09-18", location: "Esalen Institute, Big Sur, CA", virtual: false, status: "Discovered", topics: ["Mindfulness", "Neurotech", "Human Systems"], why: "Meditation instruction paired with neuroscience and music, with Clifford Saron — a direct contemplative-neuroscience network node.", url: "https://www.esalen.org/workshops/the-buddha-the-brain-and-bach-exploring-practice-in-mind-music-and-life-09142026" },
  { name: "Microsoft Agent-a-Thon — Architect Track", type: "Virtual Event", start: "2026-09-17", location: "Virtual — Americas, 11 AM–2 PM ET", virtual: true, status: "Considering", topics: ["Agentic AI", "Software Architecture", "Developer Tools"], why: "Production-grade agent orchestration, multi-agent systems, and secure enterprise workflows in Microsoft Foundry.", url: "https://www.microsoft.com/en-us/events/local-events/microsoft-agent-a-thon" },
  { name: "2026 Model Context Protocol Server and AI Agent Hackathon", type: "Hackathon", start: "2026-09-01", location: "Virtual · Sep–Nov window", virtual: true, status: "Considering", topics: ["Agentic AI", "Developer Tools", "Cybersecurity"], why: "Federal MCP/agent build pathway — a provenance-first public-procurement intelligence agent is the candidate concept.", url: "https://www.gsa.gov/artificial-intelligence/ai-community-of-practice/events-and-training/2026-ai-hackathon" },
  { name: "Stanford HAI — Alexandr Lenk & Arvind Karunakaran: Industry Conversation with Instacart", type: "Seminar / Talk", start: "2026-09-23", location: "Stanford, CA — Room 119; virtual available", virtual: true, status: "Considering", topics: ["AI / ML", "Human Systems"], why: "Real-world AI diffusion and organizational-design conversation — which work handoffs become more important after agent adoption.", url: "https://hai.stanford.edu/events/alexandr-lenk-arvind-karunakaran-industry-conversation-with-instacart" },
  { name: "The AI Conference 2026 (incl. Day ZERO)", type: "Conference", start: "2026-09-29", end: "2026-10-01", location: "San Francisco Bay Area, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Agentic AI", "Research"], why: "5,500+ builders/researchers, 120+ speakers; Day ZERO is capped at 350 and focused on RAG, evaluation, and deployment.", url: "https://aiconference.com/" },
  { name: "Stanford HAI — The World Model and Spatial Intelligence Era", type: "Seminar / Talk", start: "2026-09-30", location: "Stanford, CA — Room 119; virtual available", virtual: true, status: "Considering", topics: ["AI / ML", "GIS / Spatial", "Simulation"], why: "World models, spatial intelligence, infrastructure planning, and embodied AI — the highest thematic fit on the calendar with GIS/simulation work. Speakers include Jiajun Wu and Daniel Zhang.", url: "https://hai.stanford.edu/events/world-model-and-spatial-intelligence-era" },
  { name: "Empirical Methods in the Age of AI Conference", type: "Conference", start: "2026-10-02", location: "Stanford, CA", virtual: false, status: "Discovered", topics: ["AI / ML", "Research", "Data / Graphs"], why: "How AI changes data collection, analysis, inference, and scientific decision-making — a bridge to defensible radar methodology.", url: "https://datascience.stanford.edu/events/conference/empirical-methods-age-ai" },
  { name: "The Science of Consciousness 2026", type: "Conference", start: "2026-10-11", end: "2026-10-16", location: "San Diego, CA", virtual: false, status: "Discovered", topics: ["Neurotech", "Research", "Human Systems"], why: "Major consciousness meeting spanning neuroscience, philosophy, physics, and technology.", url: "https://tsc2026.org/" },
  { name: "ODSC West 2026", type: "Conference", start: "2026-10-27", location: "Burlingame, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Data / Graphs", "Developer Tools"], why: "Recurring Bay Area open-data-science/AI community with production-AI and data-infrastructure sessions.", url: "https://odsc.ai/west/" },
  { name: "2026 Berkeley Neuroscience Conference", type: "Conference", start: "2026-10-23", location: "Berkeley, CA", virtual: false, status: "Considering", topics: ["Neurotech", "Research", "Human Systems"], why: "Brain rhythms, cognition, memory, sleep, and experimental methods — a bridge from consumer-sensor experiments to rigorous lab-method conversations.", url: "https://neuroscience.berkeley.edu/conference" },
  { name: "NASA International Space Apps Challenge 2026 — California / Universal", type: "Hackathon", start: "2026-11-14", end: "2026-11-15", location: "Los Angeles or Irvine, CA — Universal virtual also open", virtual: true, status: "Considering", topics: ["GIS / Spatial", "Data / Graphs", "Simulation"], why: "Best broad build opportunity for GIS, maps, simulation, and agentic analysis — teams up to 6, submissions close Nov 15.", url: "https://www.spaceappschallenge.org/2026/" },
  { name: "HackStorm Physical AI Hackathon", type: "Hackathon", start: "2026-11-06", end: "2026-11-08", location: "Bay Area, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Robotics", "Simulation"], why: "Physical-AI build with AIoT/robotics tracks, supplied hardware, and cash/hardware awards. Registration opens Oct 1.", url: "https://www.hackstorm.ai/" },
];

// The nine regional industries AutoNateAI Consulting builds internal AI tooling
// for, and the weekly free live-build sessions organized around them (see
// buildLabSchedule below). Workflows are real patterns already in production
// elsewhere (Cox Automotive's FleetMate estimator, hospital administrative-agent
// deployments, construction takeoff/estimate agents, etc.) — the point on each
// live build is to reverse-engineer or reimagine one for a Southeast Missouri
// organization, live, in front of the audience.
export const industries = [
  {
    slug: "government-economic-development",
    icon: "account_balance",
    name: "Government & Economic Development",
    tagline: "Grants, RFPs, and constituent research that used to take a week.",
    workflows: [
      "Grant opportunity intelligence: match funding sources to strategic goals automatically",
      "RFP-to-project-plan agents that turn a scope of work into requirements and a build plan",
      "Economic-development research briefs assembled from public data in minutes, not days",
    ],
  },
  {
    slug: "agriculture",
    icon: "agriculture",
    name: "Agriculture",
    tagline: "Equipment data and field records, turned into decisions.",
    workflows: [
      "Sensor and equipment anomaly detection with plain-language recommendations",
      "Agronomic knowledge agents that answer questions against your own field history",
      "Service and maintenance record intelligence for machinery and inventory",
    ],
  },
  {
    slug: "automotive",
    icon: "directions_car",
    name: "Automotive",
    tagline: "From intake to estimate, without the manual lookup.",
    workflows: [
      "AI service advisor: symptoms in, structured repair-order draft out",
      "Diagnostic and service-manual research agents technicians actually trust",
      "Shop operations dashboards pulling scheduling, parts, and status into one view",
    ],
  },
  {
    slug: "construction",
    icon: "construction",
    name: "Construction",
    tagline: "Estimating and bid intelligence, built on your own historical data.",
    workflows: [
      "RFP and bid-package analysis: requirements, risks, and deadlines extracted automatically",
      "Estimate copilots that reference past jobs, change orders, and actual costs",
      "Project document agents that keep specs, drawings, and submittals searchable",
    ],
  },
  {
    slug: "finance",
    icon: "payments",
    name: "Finance & Banking",
    tagline: "AutoNateAI's most fully scoped vertical — see the full offer lineup below.",
    workflows: [
      "Commercial loan intake copilots that extract, flag, and draft the analyst memo",
      "Document and call intelligence for compliance, underwriting, and servicing",
      "Fraud and risk scenario simulation before a workflow change ever touches production",
    ],
  },
  {
    slug: "graphic-arts",
    icon: "palette",
    name: "Graphic Arts & Printing",
    tagline: "Quoting, intake, and production scheduling that used to eat a whole afternoon.",
    workflows: [
      "Print quote and job-intake agents: artwork in, structured job and estimate out",
      "File preflight and production-scheduling assistants",
      "Customer communication and proof-approval workflow automation",
    ],
  },
  {
    slug: "healthcare",
    icon: "local_hospital",
    name: "Healthcare",
    tagline: "Administrative workflows, not clinical decisions.",
    workflows: [
      "Administrative intake agents: referrals and paperwork routed to the right department",
      "Policy and scheduling knowledge systems staff can actually query",
      "Reporting automation that turns fragmented data into a real-time view",
    ],
  },
  {
    slug: "manufacturing",
    icon: "precision_manufacturing",
    name: "Manufacturing",
    tagline: "Maintenance, SOPs, and production data, connected instead of siloed.",
    workflows: [
      "Maintenance intelligence agents: symptom in, relevant SOP and history out",
      "SOP troubleshooting assistants built from your own manuals and tickets",
      "Production/operations dashboards spanning otherwise-disconnected systems",
    ],
  },
  {
    slug: "tourism-hospitality",
    icon: "explore",
    name: "Tourism & Hospitality",
    tagline: "Visitor experience and event intelligence for a growing tourism economy.",
    workflows: [
      "Visitor concierge agents: itineraries built from real local events and hours",
      "Guest messaging and reservation-support automation",
      "Event and attraction intelligence dashboards for planning and staffing",
    ],
  },
];

// AutoNateAI Industry Build Labs: one industry "week" at a time. Three free, live,
// 60-minute sessions — Tuesday, Wednesday, Thursday, 11:30 AM CST — all building
// toward internal tools for that week's industry, then the spotlight rotates to the
// next industry. Real Google Calendar events on autonate.ai@gmail.com (public, each
// with its own Google Meet link). Week placement is chosen so each industry's spotlight
// week lands near a major trade event in that field — no need to say so on the site,
// it's just why these particular weeks were picked. Cycle repeats/extends over time;
// this is the first pass through all nine.
export const industryWeeks = [
  {
    industry: "graphic-arts",
    days: [
      { date: "2026-09-15", topic: "Print Quote & Job-Intake Agent", meetUrl: "https://meet.google.com/nyw-iifi-zdb", calendarUrl: "https://www.google.com/calendar/event?eid=Njl0aTgyNmI5cGJkOWFybnQ4M291MmhmbTggYXV0b25hdGUuYWlAbQ" },
      { date: "2026-09-16", topic: "File Preflight & Production-Scheduling Assistant", meetUrl: "https://meet.google.com/oge-mmeg-ftr", calendarUrl: "https://www.google.com/calendar/event?eid=NmFjaTczcmdwbmZ1dTE1YW9lY2Jkc212aW8gYXV0b25hdGUuYWlAbQ" },
      { date: "2026-09-17", topic: "Customer Communication & Proof-Approval Workflow", meetUrl: "https://meet.google.com/dsu-eteo-gwd", calendarUrl: "https://www.google.com/calendar/event?eid=OHJrYmdoOTBzcTM4cDVoNHE3NTBoYmRyMGsgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "automotive",
    days: [
      { date: "2026-09-29", topic: "AI Service Advisor", meetUrl: "https://meet.google.com/vkj-nyui-kuq", calendarUrl: "https://www.google.com/calendar/event?eid=bTczbGwwNTVwYmo0Z2dzbTh1OXRhaG1uNGsgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-09-30", topic: "Diagnostic & Service-Manual Research Agent", meetUrl: "https://meet.google.com/yen-owjd-dzh", calendarUrl: "https://www.google.com/calendar/event?eid=b2ZyMzVxdXB1OGFiZWsxY3ZuOWUyOXFjamcgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-01", topic: "Shop Operations Dashboard", meetUrl: "https://meet.google.com/cow-tesb-yrb", calendarUrl: "https://www.google.com/calendar/event?eid=YWRlNnJjZnYzNWticTFpNmlrbGI1bzlyNTQgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "agriculture",
    days: [
      { date: "2026-10-06", topic: "Sensor & Equipment Anomaly Detection", meetUrl: "https://meet.google.com/hhz-iadb-msd", calendarUrl: "https://www.google.com/calendar/event?eid=N29iZjI3MjBxYWpiNGdvaGJmbzZkdWpqcTggYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-07", topic: "Agronomic Knowledge Agent", meetUrl: "https://meet.google.com/nwv-kajm-mos", calendarUrl: "https://www.google.com/calendar/event?eid=b2QwdmZqamc5NWE3aGdvbHZvbTJmaW5rNmcgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-08", topic: "Service & Maintenance Record Intelligence", meetUrl: "https://meet.google.com/nuw-nnec-ccf", calendarUrl: "https://www.google.com/calendar/event?eid=djc3cTEzaDhhYjl1ZW1wcGs1YmJla3M1bmcgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "construction",
    days: [
      { date: "2026-10-13", topic: "RFP & Bid-Package Analysis Agent", meetUrl: "https://meet.google.com/tac-vkyc-pkf", calendarUrl: "https://www.google.com/calendar/event?eid=YWgwbjkyZW81ZDJocW1xb21qamU0ajVmMG8gYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-14", topic: "Estimate Copilot", meetUrl: "https://meet.google.com/qnc-hrvc-voc", calendarUrl: "https://www.google.com/calendar/event?eid=YWduMWpxY2gxdmFlaDRvczUwNThkcjE3bjQgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-15", topic: "Project Document Agent", meetUrl: "https://meet.google.com/rqk-tssj-spf", calendarUrl: "https://www.google.com/calendar/event?eid=djFybWlmYmphZGw0ZmN0cnA2OWYzZmFwdWMgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "finance",
    days: [
      { date: "2026-10-20", topic: "Commercial Loan Intake Copilot", meetUrl: "https://meet.google.com/fpx-jmpd-cah", calendarUrl: "https://www.google.com/calendar/event?eid=N2dtcTF2cjc3bXZnajVra29jcWlhMDNwMjggYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-21", topic: "Document & Call Intelligence", meetUrl: "https://meet.google.com/tph-srav-gct", calendarUrl: "https://www.google.com/calendar/event?eid=Ym5wNmJxM2RudXMxbTE5ZXEzOGFwaDcwOTggYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-22", topic: "Fraud & Risk Scenario Simulation", meetUrl: "https://meet.google.com/yqi-abin-wbu", calendarUrl: "https://www.google.com/calendar/event?eid=M3FjaG5wbzAyNjRjMGt0MHQzbDc5YTZhZTAgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "manufacturing",
    days: [
      { date: "2026-10-27", topic: "Maintenance Intelligence Agent", meetUrl: "https://meet.google.com/cwr-yzss-bqk", calendarUrl: "https://www.google.com/calendar/event?eid=ZW04c3RkZjFzdmtlcmY5ZjJycWNsZXE5MmMgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-28", topic: "SOP Troubleshooting Assistant", meetUrl: "https://meet.google.com/vkq-cesq-puk", calendarUrl: "https://www.google.com/calendar/event?eid=N29ocjZ2MWkzNnA1dHRtNDBlOHFucjh1YmsgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-10-29", topic: "Production/Ops Dashboard", meetUrl: "https://meet.google.com/kbe-mxnj-wuh", calendarUrl: "https://www.google.com/calendar/event?eid=aXBqdGYwMThjOHZmYzlhMzl2NTI1aTJwdDggYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "government-economic-development",
    days: [
      { date: "2026-11-03", topic: "Grant Opportunity Intelligence", meetUrl: "https://meet.google.com/gyx-wydy-zhw", calendarUrl: "https://www.google.com/calendar/event?eid=ZGZkN2JpdTZjdnBzdDJja282dWI4a2dpcW8gYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-04", topic: "RFP-to-Project-Plan Agent", meetUrl: "https://meet.google.com/vio-fmnw-jiv", calendarUrl: "https://www.google.com/calendar/event?eid=cmdpcWkxdGpmM284bTBiZjQ1N2xwMm4zN2MgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-05", topic: "Economic-Development Research Briefing Agent", meetUrl: "https://meet.google.com/ktb-bgqf-rzm", calendarUrl: "https://www.google.com/calendar/event?eid=bzg3OG01NzgxbWhza2xjbWVtMzN0cXZzb3MgYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "healthcare",
    days: [
      { date: "2026-11-10", topic: "Administrative Intake Agent", meetUrl: "https://meet.google.com/coa-rmju-kod", calendarUrl: "https://www.google.com/calendar/event?eid=aGJ1NG10cm03bWVtbzBjYmx1aGxqMnVzNDggYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-11", topic: "Policy & Scheduling Knowledge System", meetUrl: "https://meet.google.com/mxx-qbib-anq", calendarUrl: "https://www.google.com/calendar/event?eid=ZWYyNWFyaThnajdiYzlodTc4aTRkaG5sczAgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-12", topic: "Reporting Automation", meetUrl: "https://meet.google.com/sdo-euvb-not", calendarUrl: "https://www.google.com/calendar/event?eid=MGRmYTM3cDE1aThhaDA2aGo2ZjNzYWE3Ym8gYXV0b25hdGUuYWlAbQ" },
    ],
  },
  {
    industry: "tourism-hospitality",
    days: [
      { date: "2026-11-17", topic: "Visitor Concierge Agent", meetUrl: "https://meet.google.com/zti-nbav-icr", calendarUrl: "https://www.google.com/calendar/event?eid=aGk1ZjBkOXRoaWYzODZobDMyMzE1MG5pZmcgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-18", topic: "Guest Messaging & Reservation Support", meetUrl: "https://meet.google.com/gvv-jzav-yoe", calendarUrl: "https://www.google.com/calendar/event?eid=NmpmdG9vM2V2ZWF2dGRybW81aG5ibWtwcWMgYXV0b25hdGUuYWlAbQ" },
      { date: "2026-11-19", topic: "Event & Attraction Intelligence Dashboard", meetUrl: "https://meet.google.com/mfb-qmdu-ixt", calendarUrl: "https://www.google.com/calendar/event?eid=cjJmdWw3YzE4MjAzNm0ycDNuYm04c2tpOWcgYXV0b25hdGUuYWlAbQ" },
    ],
  },
];

export const buildLabInfo = {
  format: "Three live sessions a week — Tuesday, Wednesday, Thursday, 11:30 AM Central — all building toward internal tools for that week's featured industry.",
};

// One-off standalone launch session, ahead of the industry rotation (which starts
// with Graphic Arts & Printing on 2026-09-15 — see industryWeeks). Not tied to any
// single industry: introduces the Build Lab format itself, live. Real Google
// Calendar event on autonate.ai@gmail.com (public, own Google Meet link).
export const kickoffSession = {
  date: "2026-09-01",
  topic: "Customer Follow-Up & Intake Agent",
  meetUrl: "https://meet.google.com/ufv-uwji-dxn",
  calendarUrl: "https://www.google.com/calendar/event?eid=OHVkNXFkOTVnM3F1bHU2Zml0OWlwM2dvbW8gYXV0b25hdGUuYWlAbQ",
};

// The nine-tool menu offered inside a requested business-training engagement (see
// businessTrainingCurriculum below). Generic on purpose — customized to the specific
// requesting business's real workflows during the engagement. Each business picks 3.
export const toolsMenu = [
  { icon: "support_agent", name: "Customer / Client Intake Agent", description: "Turns a new inquiry into structured, routed, ready-to-work information." },
  { icon: "search", name: "Internal Knowledge & Document Search Assistant", description: "Ask a question, get an answer pulled straight from your own files." },
  { icon: "bar_chart", name: "Reporting & Analytics Dashboard", description: "Turns scattered data into a live view leadership actually checks." },
  { icon: "calculate", name: "Quote / Estimate Generator", description: "Structured pricing output from a job's real details, in minutes." },
  { icon: "calendar_month", name: "Scheduling & Operations Coordinator", description: "Keeps jobs, staff, and resources lined up without the manual juggling." },
  { icon: "fact_check", name: "Document & Compliance Intelligence Tool", description: "Extracts, flags, and organizes what's buried in paperwork and policy." },
  { icon: "inventory_2", name: "Inventory & Resource Tracker", description: "Real-time visibility into what you have, what's low, and what's next." },
  { icon: "forward_to_inbox", name: "Follow-Up & Outreach Automator", description: "Nothing falls through the cracks after the first conversation." },
  { icon: "rule", name: "Workflow & Approval Automation Agent", description: "Routes a request through the right steps and the right people, automatically." },
];

// The 4-day (Monday-Thursday, 4 hours/day) requested business-training curriculum.
// Days 1-2 are shared foundations; Days 3-4 are hands-on build time on the business's
// own chosen tools (see toolsMenu). Emphasis throughout is prompt/context engineering —
// participants become the people who can direct and judge an AI coding agent's output,
// not necessarily write the code by hand.
export const businessTrainingCurriculum = [
  {
    day: "Day 1",
    title: "Research & Context",
    hours: "4 hours",
    items: [
      "Research principles with ChatGPT — turning an ambiguous business problem into a clear, structured ask",
      "Prompt engineering and context engineering fundamentals — the core skill of the whole week",
      "Turning research into a structured PDF asset that Claude (and any AI) can read and build from",
      "Terminal basics and VS Code with the Claude Code and Codex extensions — both interfaces, participants choose",
      "Quick file-system navigation dive, terminal and OS folder view alike",
      "Tool #1 selected and kicked off",
    ],
  },
  {
    day: "Day 2",
    title: "Build & Review",
    hours: "4 hours",
    items: [
      "Scaffolding backend architecture with Codex — data model, API, and what's actually happening under the hood, explained",
      "Crafting a professional, well-designed interface with Claude Code",
      "Reviewing AI-generated code like a junior engineering manager: judging quality and fit, not necessarily writing it by hand",
      "Tool #1 working end to end",
    ],
  },
  {
    day: "Day 3",
    title: "Parallel Build",
    hours: "4 hours",
    items: [
      "Tools #2 and #3 kicked off at the same time",
      "Directing multiple agent workflows in parallel — vibe coding with proper management",
      "Running the same research → context → scaffold → refine flow independently",
    ],
  },
  {
    day: "Day 4",
    title: "Refinement & Fun",
    hours: "4 hours",
    items: [
      "Refining and polishing all 3 tools",
      "A capstone build: a simple web game using the same systems-architecture thinking — scenes, state, entities, events",
      "Wrap-up — everyone leaves with 3 real internal tools, ready for work or home",
    ],
  },
];

// What a participant could build for their organizational project track, by org
// type. Used on the Program page ("What could you build for your organization?")
// and on the For Organizations page.
export const organizationExamples = [
  {
    icon: "storefront",
    org: "Small business",
    chain: ["Customer follow-up system", "Reporting dashboard", "Internal knowledge assistant", "Workflow automation"],
  },
  {
    icon: "account_balance",
    org: "Bank",
    chain: ["Internal research tool", "Document workflow", "Operational dashboard", "Customer-service prototype"],
  },
  {
    icon: "school",
    org: "School",
    chain: ["Teacher resource system", "Student resource finder", "Administrative workflow prototype", "Approved-data dashboard"],
  },
  {
    icon: "volunteer_activism",
    org: "Nonprofit",
    chain: ["Volunteer management", "Program tracking", "Reporting automation", "Resource navigation"],
  },
];

// Sponsorship pricing for employers/schools sending more than one seat. Flat
// $499/seat (SPONSORSHIP_UNIT_PRICE_CENTS in server.mjs / functions/index.js
// is the source of truth the payment endpoint actually charges — keep both
// in sync if this ever changes). Easy to edit — launch-pricing defaults, not
// fixed forever.
export const sponsorshipTiers = [
  { seats: 1, price: 499, label: "Sponsor 1 seat" },
  { seats: 3, price: 1497, label: "Sponsor 3 seats" },
  { seats: 5, price: 2495, label: "Sponsor 5 seats" },
  { seats: 10, price: 4990, label: "Sponsor 10 seats" },
  { seats: 15, price: 7485, label: "Sponsor 15 seats" },
  { seats: 20, price: 9980, label: "Sponsor 20 seats" },
];

// Multi-year lab roadmap shown on the About page.
export const regionalVision = [
  { period: "2026-27", text: "Run the daily research cycle: observe, question, build, measure, publish, connect — turning five research desks into real experiments and publications." },
  { period: "Next", text: "Grow Active Projects out of the strongest recurring signals, and keep architecture, AI engineering, and requested team training open alongside the research." },
  { period: "Long term", text: "Become the standing independent research lab people check before building the next agentic system — public evidence, not a pitch deck." },
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
    title: "The Notes Before the Real Build: Cheatsheet",
    track: "Reference",
    pack: "civics-and-agentic-ai",
    sourcePath: "../content/tutorials/civics-and-agentic-ai/05-cheatsheet.md",
    summary: "Agentic-AI vocabulary and the RFP research checklist Nate and Kai use every time a new one drops — right before their first real system for a real organization.",
    outcomes: ["Reference agentic-AI terms", "Run the RFP checklist", "Get ready for the program"],
  },
];

export const articles = [
  {
    handle: "why-organizations-need-internal-ai-capability",
    datePublished: "2026-08-21",
    dateModified: "2026-08-29",
    title: "Why Organizations Need Internal AI Capability, Not Just AI Vendors",
    category: "AI Workforce",
    audience: "Business owners, technical leadership, and administrators evaluating AI adoption",
    summary:
      "AI skills aren't a specialty department anymore — they're becoming a baseline capability. The fastest way to act on that is to build the capability inside your own team, not rent it from a vendor platform.",
    body: [
      "AI skills aren't a specialty department anymore. They're becoming a baseline capability, the same way spreadsheets did twenty years ago — and that shift is happening across every industry, not just technology companies.",
      "Buying a vendor platform solves a narrow problem for a while. It doesn't leave your organization with anyone who understands your own workflows well enough to extend, fix, or replace that tool when your needs change. The alternative is training people already inside your organization to build and maintain the internal tools themselves: a customer follow-up system, a reporting dashboard, a document workflow, an internal knowledge assistant.",
      "That's the premise behind AutoNateAI's requested team-training engagements: bring an employee (or a few), and they leave with a real internal tool built for your organization, not a generic certificate. The capability stays inside the team that already knows how the business actually runs."
    ],
    tags: ["Workforce Development", "AI Adoption", "Employers"],
    readingTime: "3 min read",
    image: "/assets/landing/learning-path.jpg",
  },
  {
    handle: "what-ai-workforce-readiness-looks-like-for-students",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    title: "What AI Workforce Readiness Could Look Like for Students",
    category: "Education",
    audience: "Students, parents, and educators evaluating a hands-on path into AI and software",
    summary:
      "A hands-on, project-based path into AI-agent systems doesn't require waiting for a college curriculum to catch up. Four free self-paced courses are the on-ramp.",
    body: [
      "Most students learning to code hit a ceiling: syntax practice without a real system to build for. What's missing is a hands-on path into AI and software-systems work that starts with something a real organization actually needs, not another isolated class project.",
      "AutoNateAI's approach is built for students who already have some coding experience and want to go further: designing data models and APIs, directing AI coding agents responsibly, and building a real system in response to a real ask — the same civic-RFP model the free courses teach.",
      "The bar for entry is a free on-ramp: four self-paced digital courses that teach JavaScript fundamentals, prompt and context engineering, and databases. A student, or a parent asking on their behalf, can try the material for free first and see if it's a fit before committing to anything further."
    ],
    tags: ["Youth Programming", "Education", "Workforce Development"],
    readingTime: "3 min read",
    image: "/assets/landing/tutorial-pack-civics-and-agentic-ai.jpg",
  },
  {
    handle: "coding-as-workforce-development",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
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
    image: "/assets/landing/design-build-ship.jpg",
  },
  {
    handle: "why-live-builds-make-it-real",
    datePublished: "2026-08-02",
    dateModified: "2026-08-21",
    title: "Why the Discord Doesn't Close When Class Does",
    category: "Guide",
    audience: "Builders preparing to ship a real system",
    summary:
      "The four free courses and the in-person program are the structured path. The Discord is where the learning keeps going every day in between.",
    body: [
      "A course or a cohort session ends. The problem you're actually trying to solve for your employer, your school, or the idea you brought in yourself doesn't wait for the next one. That's the gap the AutoNateAI Discord is built to close: it's open all day, every day, not just during the two weeks you're enrolled.",
      "It covers three things at once. Setup and concept help for anyone working through the four free courses. Architecture reviews, agent workflow coaching, and build support for people currently in the live program. And project help for builders who already know the four pillars, or have been through the program, and are stuck designing or building a real system they came up with on their own.",
      "That's the actual shape of the learning: requirements matter because a real ask has rules, debugging matters because a broken flow loses trust, Git matters because the work needs a stable checkpoint mid-build. None of that has to wait for a scheduled session — it gets worked through live, in the Discord, whenever a builder actually hits the wall."
    ],
    tags: ["Discord", "Community", "Support"],
    readingTime: "3 min read",
    image: "/assets/landing/rfp-document.jpg",
  },
  {
    handle: "ai-agents-are-showing-up-in-civic-tech",
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
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
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
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
    tags: ["Portfolio Project", "RFPs", "Systems Design"],
    readingTime: "4 min read",
    image: "/assets/landing/what-they-build.jpg",
  },
  {
    handle: "systems-thinking-through-code",
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
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
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
    title: "Why Git Matters When AI Is Moving Fast",
    category: "Tutorial",
    audience: "Builders using AI agents on real code",
    summary:
      "AI can help you move faster, but Git keeps the work understandable, recoverable, and ready for real deadlines.",
    body: [
      "AI agents can change a system quickly. That is powerful, but it also means a builder needs a way to keep the work grounded. Git gives every experiment a checkpoint: what changed, why it changed, and whether the system actually improved once you look at the diff instead of trusting the summary.",
      "On a real build, that matters immediately. A schema change can unlock growth or break your API. A new feature can make the system smarter or drain time on the wrong thing. A build branch needs to be stable enough to demo live, even while you keep testing better ideas on the side.",
      "By the time a builder has shipped a real system this way, Git isn't just a tool they learned because engineers use it. It's the record of their thinking: commits, diffs, recovery moments, architecture notes, and the path from first working prototype to a system a real organization can actually use."
    ],
    tags: ["Git", "AI Agents", "Systems Design"],
    readingTime: "3 min read",
    image: "/assets/landing/agent-review.jpg",
  }
];
