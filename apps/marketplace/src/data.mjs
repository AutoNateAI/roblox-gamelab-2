// AutoNateAI is an Agricultural Economic Systems Intelligence Lab —
// agriculture as the anchor for regional economic-development research
// across the U.S., with Southeast Missouri as the recurring home region
// Nathan can walk the ground on. See
// docs/marketplace/agricultural-intelligence-lab.md for the full contract
// (supersedes the general-lab framing in lab-operating-model.md as the
// current locked direction — that doc's private/public boundary rule and
// "never fabricate activity" rule still apply).
//
// SECOND PASS (nav simplification): Regions, Organizations, Systems, and
// The Lab are no longer primary-nav destinations — they're filters inside
// Research & Case Studies (/research-and-case-studies), which is where
// visitors are meant to browse and discover.
//
// FOURTH PASS (SEO path unification): every region/organization/system/
// investigation detail page now lives at /research-and-case-studies/:slug
// instead of scattered under /regions/:slug, /organizations/:slug, etc. —
// see renderArticles and the shared card helpers in src/pages.mjs. The
// bare listing pages (/regions, /organizations, /systems, /investigations)
// are unchanged. Old detail URLs 301-redirect via firebase.json.
export const navItems = [
  { label: "Intelligence", href: "/", keys: ["home"] },
  { label: "Research & Case Studies", href: "/research-and-case-studies", keys: ["articles", "investigations", "regions", "organizations", "systems"] },
  { label: "Work With Us", href: "/work-with-us", keys: ["work-with-us"] },
  { label: "About", href: "/about", keys: ["about"] },
];

// Tutorials, Consulting, Events, Community, For Organizations, and The Lab
// (the general research-methodology layer) are still real, working pages —
// reachable from the footer and in-page CTAs, not primary nav.

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
    thumbnail: "/assets/thumbnails/projects/inspectable-agent-systems.jpg",
    tagline: "How agentic software should represent memory, authority, state, provenance, and evaluation.",
    description:
      "The lab's current investigation. Three of the five daily research desks independently converged on the same underlying problem: as agents take on more autonomous work, memory, context, execution, evaluation, and authority all need to become explicit and inspectable — not implicit behavior buried inside a model. This project tracks the graph-native memory architectures, independent-evaluation harnesses, and MCP/authorization patterns that are emerging as the answer.",
    researchQuestion: "What architectures make agent memory, context, execution, evaluation, provenance, and authority boundaries observable and controllable without sacrificing adaptability?",
    desks: ["California Network Radar", "GitHub Open Source Radar", "Research Paper Radar", "Events & Build Radar"],
  },
  {
    slug: "human-systems",
    icon: "psychology",
    name: "Human Systems",
    status: "Watching",
    thumbnail: "/assets/thumbnails/projects/human-systems.jpg",
    tagline: "Contemplative practice, EEG/HRV, and neurotechnology, read through a strict evidence ladder.",
    description:
      "A distinct research vertical from the Mindfulness Tech desk: what consumer neurotechnology (Muse Athena, HRV sensors) can and cannot actually tell you about attention, meditation, and physiological state. Every source here gets ranked on the evidence ladder — peer-reviewed research is never presented next to a spiritual claim as if they carry equal weight. The eventual goal is a small set of safe, non-clinical, repeated-measures self-experiments.",
    researchQuestion: "Can consumer-grade EEG/HRV sensing support disciplined, repeated-measures self-observation without overclaiming what the data actually shows?",
    desks: ["Mindfulness Tech Radar"],
  },
  {
    slug: "spatial-simulation-systems",
    icon: "map",
    name: "Spatial & Simulation Systems",
    status: "Forming",
    thumbnail: "/assets/thumbnails/projects/spatial-simulation-systems.jpg",
    tagline: "Agentic scenario generation, GIS, and physical-world grounding — from autonomous driving benchmarks to logistics.",
    description:
      "A third thread distinct from pure agent-memory work: agents that generate, retrieve, mutate, and score scenarios against real geographic or physical constraints. Seeded by PlannerForge's scenario-testing pipeline for autonomous driving, Mireye's physical-world agent infrastructure, and two build opportunities on the calendar — NASA Space Apps and HackStorm's physical-AI hackathon. The bet is that the same generate→execute→score loop transfers cleanly from driving scenarios to logistics, GIS, and facility operations.",
    researchQuestion: "Does a generate → retrieve → mutate → execute → score scenario pipeline transfer from autonomous-driving benchmarks to logistics, GIS, and facility-operations domains?",
    desks: ["Research Paper Radar", "Events & Build Radar", "California Network Radar"],
  },
];

// Curated from the GitHub Open Source Radar (Sept 9) + Airtable Sources.
// Growth figures are the radar's own Trending-horizon counters, not lifetime
// totals. Stars/forks as captured on the run date. whatToStudy/whyItMatters/
// action are the radar's own per-repo fields, not paraphrased.
export const openSourceRepos = [
  {
    slug: "semantica",
    icon: "hub",
    name: "semantica-agi/semantica",
    status: "Queued to study",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/open-source/semantica.jpg",
    meta: "Python · MIT · 12,497 stars · +9,951/month",
    score: "98/100",
    hook: "Graph-native context, provenance, ontology, and accountable-AI layer for agents — the #1 repo out of the Sept 9 run.",
    activity: "Pushed Sep 9; temporal graph, vector-store, CI fixes today.",
    whatToStudy: "Temporal graphs, provenance, ontology boundaries, and accountable reasoning.",
    whyItMatters: "Graph-native context, provenance, ontology, and accountable AI maps directly to AutoNateAI's graph-first systems thinking.",
    action: "Run locally; map the data model; benchmark against a simpler vector-RAG baseline.",
    notes: ["Candidate for the Context Graph vs. Context Database benchmark", "Watching for architecture writeups and maintainer activity"],
    url: "https://github.com/semantica-agi/semantica",
  },
  {
    slug: "openviking",
    icon: "account_tree",
    name: "volcengine/OpenViking",
    status: "Queued to study",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/open-source/openviking.jpg",
    meta: "Python · AGPL-3.0 · 36,256 stars · +8,115/month",
    score: "97/100",
    hook: "A live context database unifying memory, RAG, and skills — a concrete agent-memory architecture to test against Semantica.",
    activity: "Pushed Sep 9; embedding cache, plugin filters, compile queue/security work today.",
    whatToStudy: "Context-database lifecycle, recall/capture filters, embeddings, skills/URI namespaces, and plugin integration.",
    whyItMatters: "A live context database that unifies memory, RAG, and skills gives a concrete agent-memory architecture to test.",
    action: "Run sandboxed; trace recall/capture; compare retrieval quality and cost with Semantica.",
    notes: ["Candidate for the Context Graph vs. Context Database benchmark", "Cross-referencing against Research Paper Radar's graph-memory findings"],
    url: "https://github.com/volcengine/OpenViking",
  },
  {
    slug: "browser-use-pi",
    icon: "travel_explore",
    name: "browser-use/browser-use-pi",
    status: "Queued to study",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/open-source/browser-use-pi.jpg",
    meta: "JavaScript · MIT · 142 stars · 4 forks · created Sep 5, 2026",
    score: "95/100",
    hook: "Four days old and already worth dissecting: a minimal, evaluation-driven browser agent — small enough to fully understand.",
    activity: "Pushed Sep 9; a 4-day-old repository.",
    whatToStudy: "The minimal browser control loop, eval-driven hill climbing, action representation, and failure recovery.",
    whyItMatters: "Small enough to fully dissect; its evaluation-driven design is more valuable than another giant framework.",
    action: "Fork; run browser evals; mutate one policy/tool boundary and measure task success.",
    notes: ["Study the minimal browser control loop and eval-driven hill climbing", "Candidate for the Eval-Hill-Climbed Browser Agent experiment"],
    url: "https://github.com/browser-use/browser-use-pi",
  },
  {
    slug: "hermes-agent",
    icon: "smart_toy",
    name: "NousResearch/hermes-agent",
    status: "Queued to study",
    thumbnail: "/assets/thumbnails/open-source/hermes-agent.jpg",
    meta: "Python · MIT · 243,749 stars · 50,283 forks · +4,221/week · v0.21.1",
    score: "93/100",
    hook: "A mature reference for orchestration, delegation, MCP auth, and desktop/browser control — a benchmark baseline, not something to adopt wholesale.",
    activity: "Pushed Sep 9; v0.21.1 (Sep 7) shipped broad platform changes.",
    whatToStudy: "Modular agent architecture, delegation, auth, scheduling, tool delivery, browser annotations, and failure isolation.",
    whyItMatters: "A mature reference for orchestration, delegation, MCP auth, desktop/browser controls, and scheduling reliability.",
    action: "Run a targeted teardown; benchmark selected orchestration primitives rather than adopting the platform wholesale.",
    notes: ["v0.21.1 (Sep 7) touched modularization, providers, scheduling, and delegation across the whole platform"],
    url: "https://github.com/NousResearch/hermes-agent",
  },
  {
    slug: "tradingagents",
    icon: "candlestick_chart",
    name: "TauricResearch/TradingAgents",
    status: "Queued to study",
    thumbnail: "/assets/thumbnails/open-source/tradingagents.jpg",
    meta: "Python · Apache-2.0 · 103,727 stars · 19,953 forks · +506/day",
    score: "90/100",
    hook: "Role-specialized multi-agent debate over financial data — direct overlap with agent-systems research, and linked to an arXiv paper.",
    activity: "Pushed Sep 7; daily Trending Sep 9.",
    whatToStudy: "Role-specialized multi-agent debate, financial data flow, decision aggregation, and backtest boundaries.",
    whyItMatters: "Direct overlap with agent-systems and financial-strategy research; also links to an arXiv paper.",
    action: "Reproduce on historical-only data; instrument agent disagreement and compare to a single-agent baseline.",
    notes: ["Candidate for the Multi-Agent Trading: Debate vs. Baseline experiment"],
    url: "https://github.com/TauricResearch/TradingAgents",
  },
  {
    slug: "pydantic-ai-harness",
    icon: "verified",
    name: "pydantic/pydantic-ai-harness",
    status: "Queued to study",
    thumbnail: "/assets/thumbnails/open-source/pydantic-ai-harness.jpg",
    meta: "Python · MIT · 873 stars · 130 forks · v0.30.0",
    score: "89/100",
    hook: "A compact, typed harness — a clean baseline for comparing ergonomics, correctness, and observability against heavier frameworks.",
    activity: "Pushed Sep 9; v0.30.0 in the current release window.",
    whatToStudy: "Typed tool boundaries, model/provider abstraction, validation, state, and harness extension points.",
    whyItMatters: "A compact, typed harness makes a clean baseline for comparing ergonomics, correctness, and observability.",
    action: "Build the identical task in this harness vs. Hermes vs. a minimal custom loop.",
    notes: ["Candidate for the Agent Harness Observability Bakeoff experiment"],
    url: "https://github.com/pydantic/pydantic-ai-harness",
  },
  {
    slug: "context-mode",
    icon: "compress",
    name: "mksglu/context-mode",
    status: "Queued to study",
    thumbnail: "/assets/thumbnails/open-source/context-mode.jpg",
    meta: "TypeScript · 21,606 stars · 1,555 forks · +935/week",
    score: "88/100",
    hook: "Context-window optimization — isolation, compression, tool-output shaping. Becoming a first-class agent-systems problem in its own right.",
    activity: "Weekly Trending Sep 9.",
    whatToStudy: "Context isolation, compression/selection, and tool-output shaping. Performance claims need independent benchmarking.",
    whyItMatters: "Context-window optimization is becoming a first-class agent-systems problem that fits AutoNateAI's workflow research.",
    action: "Benchmark token cost, latency, and task success on the same engineering workload.",
    notes: ["Candidate for the Context Compression Under Real Coding Load experiment"],
    url: "https://github.com/mksglu/context-mode",
  },
  {
    slug: "needle",
    icon: "memory",
    name: "cactus-compute/needle",
    status: "Queued to study",
    thumbnail: "/assets/thumbnails/open-source/needle.jpg",
    meta: "Python · 10,648 stars · 678 forks · +7,220/month",
    score: "85/100",
    hook: "Tiny local-model inference — a useful counterweight to cloud-agent hype for on-device experiments.",
    activity: "Monthly Trending Sep 9.",
    whatToStudy: "Model footprint, quantization/runtime assumptions, memory use, and the device-deployment path.",
    whyItMatters: "A useful counterweight to cloud-agent hype — tiny-device inference can support local/robotics experiments.",
    action: "Benchmark on available local hardware; report latency, RAM, and task quality.",
    notes: ["Candidate for the Tiny Model on Local Hardware experiment"],
    url: "https://github.com/cactus-compute/needle",
  },
  {
    slug: "plannerforge",
    icon: "map",
    name: "TUM-AVS/PlannerForge",
    status: "Queued to study",
    project: "spatial-simulation-systems",
    thumbnail: "/assets/thumbnails/open-source/plannerforge.jpg",
    meta: "Python · Official research repository · EMNLP 2026",
    score: "95/100",
    hook: "The official implementation behind the PlannerForge paper — an agent pipeline that generates, retrieves, mutates, and scores autonomous-driving scenarios.",
    activity: "Linked directly from the accepted EMNLP 2026 paper.",
    whatToStudy: "Scenario schema, tool adapters, retrieval/mutation strategy, and how planner benchmarking is scored.",
    whyItMatters: "Strong bridge to simulation, robotics, GIS, and testing interests — official code that enables real domain adaptation.",
    action: "Inspect the scenario schema; map a logistics or facility-operations domain transfer.",
    notes: ["Candidate for the Agentic Simulation Foundry experiment"],
    url: "https://github.com/TUM-AVS/PlannerForge",
  },
];

// Research Paper Radar's "Experiment Queue // candidates only" (page 13) +
// GitHub Open Source Radar's "Experiment and publication concepts" (page 18)
// — explicitly not Airtable Experiments records until Nathan starts one.
export const labExperiments = [
  {
    slug: "procedural-graph-runtime",
    icon: "account_tree",
    name: "Procedural Graph Runtime",
    status: "Proposed",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/experiments/procedural-graph-runtime.jpg",
    question: "Can a validation-gated, self-evolving execution graph improve long-horizon agent workflows without increasing unsafe tool use?",
    hypothesis: "Localizing the active graph node and translating its neighborhood into situational guidance beats flat memory or naive retrieval on completion and safety, at a comparable token cost.",
    background: "Seeded by Procedural Graphs (arXiv 2609.09153) and AgentGrad (arXiv 2609.08572) — the strongest architecture fit of the Sept 9 research run, though neither paper has a verified public repository yet.",
    method: "Build a small procedural-graph runtime; run the same multi-step workflow against a flat-memory baseline and the graph runtime; validate topology edits before committing them.",
    measurement: "Task completion rate, wrong-order tool calls, latency, and token cost.",
    artifact: "A graph runtime implementation plus a benchmark report comparing it to a flat-memory baseline.",
    limitations: "No public code was found for the source paper today — this starts as a clean-room prototype, not a reproduction.",
    sources: [{ label: "Procedural Graphs (arXiv)", url: "https://arxiv.org/abs/2609.09153" }, { label: "AgentGrad (arXiv)", url: "https://arxiv.org/abs/2609.08572" }],
  },
  {
    slug: "independent-test-agent",
    icon: "fact_check",
    name: "Independent Test Agent",
    status: "Proposed",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/experiments/independent-test-agent.jpg",
    question: "Does separating an independent Test agent from a Repair agent reduce false-confidence patches without hurting resolution rate?",
    hypothesis: "A fail-closed harness with independently-trained Test/Repair roles catches more false-confidence patches than a single agent that writes and grades its own tests, at acceptable compute cost.",
    background: "ExecCritic (arXiv 2609.09133) reports 72.6% on SWE-bench Verified with this split, +11.4 points over a no-test baseline — the strongest reproducible result in the Sept 9 run, with a verified open repository.",
    method: "Clone the ExecCritic repository; run one small repository task through the fail-closed harness; audit false positives and leaked test validity.",
    measurement: "Resolved tasks, false-confidence rate, test validity, and compute cost.",
    artifact: "A fail-closed repo-repair harness, adapted and benchmarked against the paper's own numbers.",
    limitations: "Reported results depend on isolated sandboxes and substantial compute — reproduction scope will start much smaller.",
    sources: [{ label: "ExecCritic (arXiv)", url: "https://arxiv.org/abs/2609.09133" }, { label: "ExecCritic (repo)", url: "https://github.com/MSR-Orchard/execcritic" }],
  },
  {
    slug: "revocable-memory-graph",
    icon: "shield",
    name: "Revocable Memory Graph",
    status: "Proposed",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/experiments/revocable-memory-graph.jpg",
    question: "Can a graph-based retriever enforce memory revocation structurally while still preserving useful personalized context?",
    hypothesis: "Combining MeClear's game-theoretic attribution with a revocation-aware graph retriever recovers more revoked facts than either paper's approach alone, without excessive collateral forgetting.",
    background: "MeClear (arXiv 2609.09115) reports 85.9% target recall clearing harmful/redundant memory; Revoked but Still Authoritative (arXiv 2609.08258) found no tested system enforces revocation by default across 5 systems and 9 policy scenarios — a direct adversarial complement.",
    method: "Combine soft-deletion, temporal-validity intervals, and authorization filters with MeClear-style attribution; test obsolete-policy retrieval and action recovery against both papers' test suites.",
    measurement: "Revoked-retrieval/action recovery rate and collateral forgetting of legitimate memory.",
    artifact: "A memory-governance test suite usable as a shared benchmark for both source papers.",
    limitations: "Game-theoretic estimation in MeClear adds cost; neither paper proves durable privacy guarantees under adaptive attacks.",
    sources: [{ label: "MeClear (arXiv)", url: "https://arxiv.org/abs/2609.09115" }, { label: "MeClear (repo)", url: "https://github.com/FudanSELab/MeClear" }, { label: "Revoked but Still Authoritative (arXiv)", url: "https://arxiv.org/abs/2609.08258" }],
  },
  {
    slug: "agentic-simulation-foundry",
    icon: "map",
    name: "Agentic Simulation Foundry",
    status: "Proposed",
    project: "spatial-simulation-systems",
    thumbnail: "/assets/thumbnails/experiments/agentic-simulation-foundry.jpg",
    question: "Does a generate → retrieve → mutate → execute → score pipeline transfer from autonomous driving to logistics, GIS, or facility-operations scenarios?",
    hypothesis: "PlannerForge's scenario-generation loop is domain-agnostic enough to swap driving scenarios for a logistics or GIS domain without redesigning the core pipeline.",
    background: "PlannerForge (arXiv 2609.08965, accepted EMNLP 2026) reports 193/200 executable scenarios vs. 144 for a baseline, and planner success rising from 50.4% to 70.2% with grounded scenario generation — with a verified official repository.",
    method: "Select a non-driving domain (logistics or facility operations); adapt PlannerForge's tool adapters; measure scenario validity and diversity against the original benchmark.",
    measurement: "Scenario validity, diversity, retrieval quality, and edit-success rate in the new domain.",
    artifact: "A domain-neutral simulation pipeline, demonstrated on at least one non-driving domain.",
    limitations: "The original paper is scoped to autonomous driving; domain transfer is an open research question, not a guaranteed result.",
    sources: [{ label: "PlannerForge (arXiv)", url: "https://arxiv.org/abs/2609.08965" }, { label: "PlannerForge (repo)", url: "https://github.com/TUM-AVS/PlannerForge" }],
  },
  {
    slug: "safety-judge-stress-lab",
    icon: "gavel",
    name: "Safety Judge Stress Lab",
    status: "Proposed",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/experiments/safety-judge-stress-lab.jpg",
    question: "Which content-invariant wrapper transformations produce the highest disagreement across automated safety judges, and can simple ensembles resist them?",
    hypothesis: "A small ensemble of judges resists content-invariant wrapper attacks meaningfully better than any single judge, but not completely — some wrappers should transfer across models.",
    background: "Style Over Substance (arXiv 2609.08236) reports up to a 19.9% unsafe-verdict flip rate for a GPT-4o-mini judge under a token refusal wrapper, vs. a 0.5% noise floor — with a verified open repository.",
    method: "Reproduce the flip-rate baseline; test single-judge vs. majority-vote vs. alternate-rubric ensembles against the same wrapper set.",
    measurement: "Flip rate, noise floor, and ensemble agreement across wrapper families.",
    artifact: "A judge-robustness dashboard comparing single-judge and ensemble resistance.",
    limitations: "Limited wrapper family and judge/dataset scope in the source paper; agent-trajectory judging (not just single replies) remains future work.",
    sources: [{ label: "Style Over Substance (arXiv)", url: "https://arxiv.org/abs/2609.08236" }, { label: "safety-judge-robustness (repo)", url: "https://github.com/Yongxi-Zhou/safety-judge-robustness" }],
  },
  {
    slug: "context-graph-vs-context-database",
    icon: "science",
    name: "Context Graph vs. Context Database",
    status: "Proposed",
    project: "inspectable-agent-systems",
    thumbnail: "/assets/thumbnails/experiments/context-graph-vs-context-database.jpg",
    question: "Does explicit graph structure improve retrieval traceability and multi-hop reasoning over a context-database approach, at the same token cost?",
    hypothesis: "Semantica's graph-native context wins on retrieval traceability and multi-hop correctness; OpenViking's context database wins on raw retrieval latency and cost — neither dominates on every axis.",
    background: "The two top-scoring repos out of the Sept 9 GitHub Open Source Radar run (98/100 and 97/100) are architecturally opposite answers to the same agent-memory problem.",
    method: "Same source corpus, same task set, same underlying model; build ingestion adapters for both Semantica and OpenViking; log every retrieval trace.",
    measurement: "Retrieval traceability, multi-hop correctness, latency, and token cost.",
    artifact: "A benchmark notebook plus architecture diagrams comparing both systems on identical tasks.",
    limitations: "Both repos are queued to study, not yet run locally — this experiment depends on that first pass completing.",
    sources: [{ label: "Semantica (repo)", url: "https://github.com/semantica-agi/semantica" }, { label: "OpenViking (repo)", url: "https://github.com/volcengine/OpenViking" }],
  },
  {
    slug: "temporal-gis-narratives",
    icon: "public",
    name: "Temporal GIS Narratives",
    status: "Proposed",
    project: "spatial-simulation-systems",
    thumbnail: "/assets/thumbnails/experiments/temporal-gis-narratives.jpg",
    question: "Can sheaf/narrative structure preserve provenance and consistency in evolving geographic knowledge graphs better than event logs?",
    hypothesis: "A narrative/sheaf representation of changing spatial relationships stays more consistent under repeated edits than a plain event-sourced log, at a reasonable query-complexity cost.",
    background: "Time-Varying Data as Sheaves (arXiv 2609.09056) proposes a unifying formal language for time-varying, switching-relationship data — highly mathematical, no public code or benchmark yet.",
    method: "Simulate a parcel, infrastructure, or logistics-network domain with repeated changes; compare event-sourcing, temporal property graphs, and a narrative/sheaf representation.",
    measurement: "Change consistency, provenance fidelity, and query complexity across representations.",
    artifact: "An interactive temporal map plus a query benchmark, built on NetworkX/Neo4j and a mapping layer.",
    limitations: "The source paper is exploratory and mathematical — no empirical benchmark or public implementation exists to build on directly.",
    sources: [{ label: "Time-Varying Data as Sheaves (arXiv)", url: "https://arxiv.org/abs/2609.09056" }, { label: "Graph-Based Personalized Memory survey (arXiv)", url: "https://arxiv.org/abs/2609.08599" }],
  },
];

// Evidence-ladder reading list — real papers and mindfulness sources pulled
// from the Sept 9 Sources table (Airtable). evidenceClass keys map to
// data-evidence values in public/styles.css (.evidence-badge). `project`
// links a source to a Project detail page's "Related Sources" list.
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
    slug: "procedural-graphs-paper",
    thumbnail: "/assets/thumbnails/sources/procedural-graphs-paper.jpg",
    title: "Procedural Graphs: Self-Evolving Execution Structures for LLM Agents",
    authors: "Yuxing Lu, Yicheng Chen, Shanchan Wu, Sercan Ö. Arık — Google / Georgia Tech / Peking University",
    evidenceClass: "preprint",
    topic: "Agentic AI · Software Architecture",
    project: "inspectable-agent-systems",
    insight: "A localized, editable execution graph that biases the next action and can self-evolve — the strongest architecture fit of the Sept 9 research run (98/100 fit).",
    supported: "Consistent gains over memory baselines across multiple datasets, tasks, and LLMs, per the paper; self-evolution further improves results and can repair flawed expert priors.",
    caveat: "No public code was found today. Guidance generation adds a model call; transfer and selective reuse of guidance are flagged as future work by the authors themselves.",
    url: "https://arxiv.org/abs/2609.09153",
  },
  {
    slug: "execcritic-paper",
    thumbnail: "/assets/thumbnails/sources/execcritic-paper.jpg",
    title: "ExecCritic: Learn to Test, Test to Improve for Coding Agents",
    authors: "Leitian Tao et al. — UW-Madison / Microsoft Research / Georgia Tech",
    evidenceClass: "preprint",
    topic: "Agentic AI · Evaluation",
    project: "inspectable-agent-systems",
    insight: "Independent Test/Repair agents in a fail-closed harness reach 72.6% on SWE-bench Verified, +11.4 points over a no-test baseline.",
    supported: "Independent, separately-trained Test and Repair agents materially improve resolution rate over a single self-testing agent, per SWE-bench Verified results.",
    caveat: "Depends on isolated sandboxes and substantial compute. A weak Test agent alone can reduce resolution — role separation, not just testing, is doing the work.",
    url: "https://arxiv.org/abs/2609.09133",
  },
  {
    slug: "plannerforge-paper",
    thumbnail: "/assets/thumbnails/sources/plannerforge-paper.jpg",
    title: "PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners",
    authors: "Yuan Gao et al. — TUM AVS/MIRMI · University College London",
    evidenceClass: "peer-reviewed",
    topic: "Simulation · Robotics",
    project: "spatial-simulation-systems",
    insight: "193/200 executable scenarios vs. 144 for a baseline; planner success rises from 50.4% to 70.2% with grounded scenario generation. Accepted at EMNLP 2026.",
    supported: "Agent-generated, retrieved, and mutated scenarios materially improve both scenario executability and downstream planner success, in the autonomous-driving domain tested.",
    caveat: "Scoped to an automotive stack; the authors themselves call for broader planners, simulators, and real-world validation before generalizing.",
    url: "https://arxiv.org/abs/2609.08965",
  },
  {
    slug: "meclear-paper",
    thumbnail: "/assets/thumbnails/sources/meclear-paper.jpg",
    title: "MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance",
    authors: "Boyu Yang, Jiazheng Sun, Zilong Lu, Zhi Qiu, Xin Peng, Jun Zheng — Fudan University · Beijing Institute of Technology",
    evidenceClass: "preprint",
    topic: "Agent Memory · Safety",
    project: "inspectable-agent-systems",
    insight: "Reports 85.9% target recall and 82.3% task recovery across long-dialogue pools when clearing harmful/redundant agent memory.",
    supported: "Shapley-style attribution can identify which memories to clear with high target recall, 25.5 points above a leave-one-out baseline, per the paper's own long-dialogue evaluations.",
    caveat: "Game-theoretic estimation adds real compute cost; evaluations use curated dialogue pools and don't prove durable privacy or revocation guarantees.",
    url: "https://arxiv.org/abs/2609.09115",
  },
  {
    slug: "consumer-neurofeedback-meta-analysis",
    thumbnail: "/assets/thumbnails/sources/consumer-neurofeedback-meta-analysis.jpg",
    title: "Consumer-Grade Neurofeedback With Mindfulness Meditation: A Meta-Analysis",
    authors: "Multiple authors — peer-reviewed meta-analysis",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · EEG",
    project: "human-systems",
    insight: "Modest distress benefits, but no convincing evidence that consumer neurofeedback teaches control of a specific brain state — the methodological baseline for any Muse experiment.",
    supported: "Pooled effects show a modest reduction in self-reported distress across consumer neurofeedback studies.",
    caveat: "No convincing evidence of target-specific neural modulation being learned — treat Muse's proprietary meditation score as an engagement signal, not a validated brain-state measurement.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12046271/",
  },
  {
    slug: "eeg-oscillatory-correlates-review",
    thumbnail: "/assets/thumbnails/sources/eeg-oscillatory-correlates-review.jpg",
    title: "EEG Oscillatory Correlates of Meditation Practice: Systematic Review & Meta-Analysis",
    authors: "Multiple authors — Neuroscience / Elsevier",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · EEG",
    project: "human-systems",
    insight: "Pooled alpha/beta/gamma effects during meditation are real, but measurement state materially changes effect sizes — 'one frequency = one mental state' is not supported.",
    supported: "Pooled meditation-related increases in alpha, beta, and gamma power are consistently reported across the reviewed literature.",
    caveat: "Heterogeneity remains high across practice types, outcomes, and feedback targets — frequency-band findings aren't universal biomarkers of mindfulness.",
    url: "https://www.sciencedirect.com/science/article/pii/S0306452226004422",
  },
  {
    slug: "hrv-coherence-frequencies-study",
    thumbnail: "/assets/thumbnails/sources/hrv-coherence-frequencies-study.jpg",
    title: "HRV Biofeedback in a Global Study of Common Coherence Frequencies and Emotional States",
    authors: "Sai Balaji et al. — Scientific Reports / HeartMath-linked dataset",
    evidenceClass: "peer-reviewed",
    topic: "Human Systems · HRV",
    project: "human-systems",
    insight: "1.8M app-derived sessions characterize common HRV-coherence frequencies and emotion-associated patterns — observational, not a validated individual-wellbeing metric.",
    supported: "A large app-derived dataset (1.8M sessions) characterizes common HRV-coherence frequencies and their association with reported emotional states.",
    caveat: "Observational, app-derived data — coherence metrics and emotional labels require care before generalizing to any one individual's wellbeing.",
    url: "https://www.heartmath.org/research/research-library/basic/hrv-biofeedback-coherence-frequencies-emotional-states/",
  },
  {
    slug: "writer-agent-memory",
    thumbnail: "/assets/thumbnails/sources/writer-agent-memory.jpg",
    title: "WRITER: Building Agent Memory (engineering blog)",
    authors: "WRITER Engineering",
    evidenceClass: "technical",
    topic: "Agentic AI · Memory",
    project: "inspectable-agent-systems",
    insight: "Task-, requirement-, and deliverable-oriented enterprise agent memory — the #1 California signal on Sept 9 (99/100), and the seed of the Context Graph vs. Context Database experiment.",
    caveat: "A single vendor's engineering account of their own architecture — useful as a design reference, not independent evidence of performance.",
    url: "https://writer.com/engineering/building-agent-memory/",
  },
  {
    slug: "langchain-multi-agent-context",
    thumbnail: "/assets/thumbnails/sources/langchain-multi-agent-context.jpg",
    title: "LangChain: Organizing Context in a Multi-Agent Harness",
    authors: "Thushanth Bengre, Chester Curme — LangChain",
    evidenceClass: "technical",
    topic: "Agentic AI · Context Engineering",
    project: "inspectable-agent-systems",
    insight: "Forked subagents inheriting supervisor context, compared against retrieval and graph-context strategies for reducing repeated lookups.",
    caveat: "A framework vendor's own design writeup, not an independent benchmark — treat the comparison as a hypothesis to test, not a settled result.",
    url: "https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness",
  },
  {
    slug: "arcade-skills-over-mcp",
    thumbnail: "/assets/thumbnails/sources/arcade-skills-over-mcp.jpg",
    title: "Arcade: Skills Over MCP",
    authors: "Mateo Torres — Arcade.dev",
    evidenceClass: "technical",
    topic: "Agentic AI · MCP",
    project: "inspectable-agent-systems",
    insight: "Runtime divergence around MCP is appearing before the spec fully lands — a live standards/governance conversation, not a settled protocol.",
    caveat: "One vendor's position in an active standards debate — worth tracking, not treating as the final word on MCP's direction.",
    url: "https://www.arcade.dev/blog/skills-over-mcp-explained/",
  },
  {
    slug: "muse-headband-review",
    thumbnail: "/assets/thumbnails/sources/muse-headband-review.jpg",
    title: "The Muse Headband Review: Meditation 2.0",
    authors: "The Medical Futurist — YouTube, 2026-06-11",
    evidenceClass: "practitioner",
    topic: "Human Systems · Neurotech",
    project: "human-systems",
    insight: "An independent reviewer's framing: Muse is a feedback aid, not a machine that produces mindfulness — useful for calibrating expectations, not evidence.",
    caveat: "One reviewer's usability impression, not a controlled study — useful for expectation-setting, not as evidence of any physiological or psychological effect.",
    url: "https://www.youtube.com/watch?v=YifvLHvLckA",
  },
  {
    slug: "brain-on-meditation-dispenza",
    thumbnail: "/assets/thumbnails/sources/brain-on-meditation-dispenza.jpg",
    title: "This Is Your Brain on Meditation",
    authors: "Joe Dispenza — Gaia",
    evidenceClass: "cultural",
    topic: "Human Systems · Contemplative",
    project: "human-systems",
    insight: "Presents meditation, neuroplasticity, and self-transformation claims in a spiritual frame — useful for generating falsifiable questions, not as scientific evidence.",
    caveat: "Presented in a spiritual/self-transformation frame with healing, energetic, and quantum-field claims that require independent testing — never treated as peer-reviewed evidence on this site.",
    url: "https://www.gaia.com/video/your-brain-meditation-joe-dispenza",
  },
];

// Real events from the Airtable Events table (Sept 9 Events & Build +
// Mindfulness Tech radar runs) — every url/date/location below is a verified
// field value, not a guess. `status` mirrors Airtable's own Status field
// (Discovered / Considering) rather than claiming registration/attendance.
// `actionPlan`/`costNotes` are Airtable's own "Action / Networking Plan" and
// "Cost / Prize Notes" field values.
export const labEvents = [
  { slug: "ccare-compassion-conversation", thumbnail: "/assets/thumbnails/events/ccare-compassion-conversation.jpg", name: "Stanford CCARE — Conversations on Compassion: Hidden Happiness with Venerable Ani Choyang", type: "Seminar / Talk", organizer: "Stanford CCARE", start: "2026-09-10", location: "Stanford University, Palo Alto, CA", virtual: false, status: "Considering", topics: ["Mindfulness", "Human Systems"], why: "Immediate California networking opportunity at the intersection of contemplative practice, neuroscience training, and compassion research.", actionPlan: "Review Ani Choyang's scientific/contemplative background before attending. Ask a narrow question about how contemplative hypotheses can be translated into measurable experimental variables without flattening lived experience.", url: "https://ccare.stanford.edu/events/conversations-on-compassion-hidden-happiness-with-venerable-ani-choyang/" },
  { slug: "berkeley-law-ai-institute", thumbnail: "/assets/thumbnails/events/berkeley-law-ai-institute.jpg", name: "UC Berkeley Law AI Institute 2026", type: "Conference", organizer: "UC Berkeley Center for Law & Technology", start: "2026-09-15", end: "2026-09-17", location: "Berkeley, CA — livestream available", virtual: false, status: "Discovered", topics: ["AI / ML", "Cybersecurity", "Human Systems"], why: "AI-governance and rollout network — how enterprise agent permissions, logging, and human signoff translate governance into software controls.", actionPlan: "Use the livestream unless a relationship target justifies travel. Study the legal-engineering and rollout sessions; create a one-page architecture showing how agent permissions, logging, and human signoff translate governance into software controls.", costNotes: "Three-day program, Sep 15–17, Berkeley and livestream. Registration open; current price wasn't reliably exposed in the public page.", url: "https://executive.law.berkeley.edu/programs/berkeley-law-ai-institute/" },
  { slug: "buddha-brain-bach", thumbnail: "/assets/thumbnails/events/buddha-brain-bach.jpg", name: "The Buddha, the Brain, and Bach: Exploring Practice in Mind, Music, and Life", type: "Workshop", organizer: "Esalen Institute", start: "2026-09-14", end: "2026-09-18", location: "Esalen Institute, Big Sur, CA", virtual: false, status: "Discovered", topics: ["Mindfulness", "Neurotech", "Human Systems"], why: "Meditation instruction paired with neuroscience and music, with Clifford Saron — a direct contemplative-neuroscience network node.", actionPlan: "If accessible, prioritize meeting Clifford Saron and asking about rigorous low-cost EEG study design for repeated meditation sessions; avoid presenting consumer Muse metrics as validated outcomes.", url: "https://www.esalen.org/workshops/the-buddha-the-brain-and-bach-exploring-practice-in-mind-music-and-life-09142026" },
  { slug: "microsoft-agent-a-thon", thumbnail: "/assets/thumbnails/events/microsoft-agent-a-thon.jpg", name: "Microsoft Agent-a-Thon — Architect Track", type: "Virtual Event", organizer: "Microsoft", start: "2026-09-17", location: "Virtual — Americas, 11 AM–2 PM ET", virtual: true, status: "Considering", topics: ["Agentic AI", "Software Architecture", "Developer Tools"], why: "Production-grade agent orchestration, multi-agent systems, and secure enterprise workflows in Microsoft Foundry.", actionPlan: "Register for Architect. Arrive with a one-page design for a procurement/event-intelligence agent that separates retrieval, verification, write authority, and audit trails. Ask how Foundry teams test cross-agent authorization failures.", costNotes: "Registration open on the official page. Cost and prizes are not stated — a learning/build event, not a cash competition.", url: "https://www.microsoft.com/en-us/events/local-events/microsoft-agent-a-thon" },
  { slug: "gsa-mcp-hackathon", thumbnail: "/assets/thumbnails/events/gsa-mcp-hackathon.jpg", name: "2026 Model Context Protocol Server and AI Agent Hackathon", type: "Hackathon", organizer: "U.S. General Services Administration", start: "2026-09-01", location: "Virtual · Sep–Nov window", virtual: true, status: "Considering", topics: ["Agentic AI", "Developer Tools", "Cybersecurity"], why: "Federal MCP/agent build pathway — a provenance-first public-procurement intelligence agent is the candidate concept.", actionPlan: "Register now — space is limited. Candidate concept: a read-only public-procurement MCP server with source provenance, explicit confidence labels, deduplication, and a separate human-approved write path.", costNotes: "Official page states virtual, September–November 2026, and limited space. Exact session dates, team size, judging, prizes, and eligibility not yet published.", url: "https://www.gsa.gov/artificial-intelligence/ai-community-of-practice/events-and-training/2026-ai-hackathon" },
  { slug: "stanford-hai-instacart", thumbnail: "/assets/thumbnails/events/stanford-hai-instacart.jpg", name: "Stanford HAI — Alexandr Lenk & Arvind Karunakaran: Industry Conversation with Instacart", type: "Seminar / Talk", organizer: "Stanford HAI", start: "2026-09-23", location: "Stanford, CA — Room 119; virtual available", virtual: true, status: "Considering", topics: ["AI / ML", "Human Systems"], why: "Real-world AI diffusion and organizational-design conversation — which work handoffs become more important after agent adoption.", actionPlan: "Attend virtually. Ask Arvind Karunakaran which work handoffs become more — not less — important after agent adoption, then publish a concise systems map linking AI diffusion to role redesign.", url: "https://hai.stanford.edu/events/alexandr-lenk-arvind-karunakaran-industry-conversation-with-instacart" },
  { slug: "the-ai-conference-2026", thumbnail: "/assets/thumbnails/events/the-ai-conference-2026.jpg", name: "The AI Conference 2026 (incl. Day ZERO)", type: "Conference", organizer: "The AI Conference", start: "2026-09-29", end: "2026-10-01", location: "San Francisco Bay Area, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Agentic AI", "Research"], why: "5,500+ builders/researchers, 120+ speakers; Day ZERO is capped at 350 and focused on RAG, evaluation, and deployment.", actionPlan: "Go only with meetings and a live demo planned. Target Peter Norvig and Emmanuel Ameisen with evaluation and interpretability questions; bring a live audit-trail demo.", costNotes: "Official site confirms Sep 29–Oct 1 and active ticket sales. A reliable live price wasn't exposed in the text reviewed.", url: "https://aiconference.com/" },
  { slug: "world-model-spatial-intelligence", thumbnail: "/assets/thumbnails/events/world-model-spatial-intelligence.jpg", name: "Stanford HAI — The World Model and Spatial Intelligence Era", type: "Seminar / Talk", organizer: "Stanford HAI", start: "2026-09-30", location: "Stanford, CA — Room 119; virtual available", virtual: true, status: "Considering", topics: ["AI / ML", "GIS / Spatial", "Simulation"], why: "World models, spatial intelligence, infrastructure planning, and embodied AI — the highest thematic fit on the calendar with GIS/simulation work. Speakers include Jiajun Wu and Daniel Zhang.", actionPlan: "Attend virtually with one map/simulation evaluation question prepared. Ask Jiajun Wu which evaluation separates scene reconstruction from decision-useful spatial understanding.", costNotes: "3:00–4:15 PM Pacific. In-person and virtual attendance; cost not stated.", url: "https://hai.stanford.edu/events/world-model-and-spatial-intelligence-era" },
  { slug: "empirical-methods-age-of-ai", thumbnail: "/assets/thumbnails/events/empirical-methods-age-of-ai.jpg", name: "Empirical Methods in the Age of AI Conference", type: "Conference", organizer: "Stanford Data Science / Stanford HAI", start: "2026-10-02", location: "Stanford, CA", virtual: false, status: "Discovered", topics: ["AI / ML", "Research", "Data / Graphs"], why: "How AI changes data collection, analysis, inference, and scientific decision-making — a bridge to defensible radar methodology.", actionPlan: "Track program and registration updates. Prepare an AutoNateAI radar-method card documenting source selection, verification, deduplication, uncertainty labels, and writeback provenance as a possible poster/demo.", url: "https://datascience.stanford.edu/events/conference/empirical-methods-age-ai" },
  { slug: "science-of-consciousness-2026", thumbnail: "/assets/thumbnails/events/science-of-consciousness-2026.jpg", name: "The Science of Consciousness 2026", type: "Conference", organizer: "The Science of Consciousness", start: "2026-10-11", end: "2026-10-16", location: "Paradise Point Resort & Spa, San Diego, CA", virtual: false, status: "Discovered", topics: ["Neurotech", "Research", "Human Systems"], why: "Major consciousness meeting spanning neuroscience, philosophy, physics, and technology.", actionPlan: "Review the program for EEG, BCI, meditation, interoception, AI-and-consciousness, and neurophenomenology speakers; target 3–5 researchers with directly testable sensor/experience questions.", url: "https://tsc2026.org/" },
  { slug: "odsc-west-2026", thumbnail: "/assets/thumbnails/events/odsc-west-2026.jpg", name: "ODSC West 2026", type: "Conference", organizer: "Open Data Science Conference (ODSC)", start: "2026-10-27", location: "Burlingame, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Data / Graphs", "Developer Tools"], why: "Recurring Bay Area open-data-science/AI community with production-AI and data-infrastructure sessions.", actionPlan: "Watch weekly speaker updates and decide travel around 3–5 targets. Track West agenda and target one workshop plus two speakers.", url: "https://odsc.ai/west/" },
  { slug: "berkeley-neuroscience-conference", thumbnail: "/assets/thumbnails/events/berkeley-neuroscience-conference.jpg", name: "2026 Berkeley Neuroscience Conference", type: "Conference", organizer: "Berkeley Neuroscience", start: "2026-10-23", location: "Berkeley, CA", virtual: false, status: "Considering", topics: ["Neurotech", "Research", "Human Systems"], why: "Brain rhythms, cognition, memory, sleep, and experimental methods — a bridge from consumer-sensor experiments to rigorous lab-method conversations.", actionPlan: "Track poster/session details when published. Use the conference as a bridge from Project Athena-style consumer-sensor experiments toward rigorous lab-method conversations.", url: "https://neuroscience.berkeley.edu/conference" },
  { slug: "nasa-space-apps-challenge", thumbnail: "/assets/thumbnails/events/nasa-space-apps-challenge.jpg", name: "NASA International Space Apps Challenge 2026 — California / Universal", type: "Hackathon", organizer: "NASA Science Mission Directorate", start: "2026-11-14", end: "2026-11-15", location: "Los Angeles or Irvine, CA — Universal virtual also open", virtual: true, status: "Considering", topics: ["GIS / Spatial", "Data / Graphs", "Simulation"], why: "Best broad build opportunity for GIS, maps, simulation, and agentic analysis — teams up to 6, submissions close Nov 15.", actionPlan: "Register now; team formation opens Sep 17. Wait for official challenge statements before locking a problem, then favor a map-first decision simulator with transparent uncertainty and evidence-grounded explanations.", costNotes: "Registration open; teams capped at 6. Submission closes Nov 15, 11:59 PM local time. Global winners selected; the official page doesn't state cash prizes.", url: "https://www.spaceappschallenge.org/2026/" },
  { slug: "hackstorm-physical-ai-hackathon", thumbnail: "/assets/thumbnails/events/hackstorm-physical-ai-hackathon.jpg", name: "HackStorm Physical AI Hackathon", type: "Hackathon", organizer: "HackStorm", start: "2026-11-06", end: "2026-11-08", location: "Bay Area, CA", virtual: false, status: "Considering", topics: ["AI / ML", "Robotics", "Simulation"], why: "Physical-AI build with AIoT/robotics tracks, supplied hardware, and cash/hardware awards. Registration opens Oct 1.", actionPlan: "Prepare a Project-Athena-adjacent or embodied-agent concept before registration opens Oct 1; use the build as an experiment, publication, and demo.", costNotes: "Registration opens Oct 1. Event lists cash prizes for top AIoT/robotics placements plus hardware/sponsor awards.", url: "https://www.hackstorm.ai/" },
];

// ---------------------------------------------------------------------------
// AGRICULTURAL ECONOMIC SYSTEMS INTELLIGENCE — Regions, Organizations,
// Systems, and Investigations (Open Questions). This is the lab's primary
// content model: agriculture as the anchor for regional
// economic-development research. All four types are surfaced as filters on
// the Research & Case Studies hub (/research-and-case-studies, see renderArticles in
// src/pages.mjs) rather than as separate primary-nav destinations — see
// docs/marketplace/agricultural-intelligence-lab.md for the operating
// contract this narrows down from.
//
// Each array holds one fully-researched flagship entry (grounded in real,
// cited public sources — Farm Credit Southeast Missouri's own annual
// reports, the Farm Credit Administration public directory, and USDA NASS
// acreage reports) plus one honest "Coming Soon" placeholder proving the
// list/detail pattern before real research fills it in. No daily
// agricultural radar has landed in this repo yet — Radar_Reports/ still
// only has the Sept 9 general-lab desks — so nothing here claims a "live"
// automated pipeline. Every fact carries its source; every open question
// stays genuinely open (status: "open", not a fabricated finding).
// ---------------------------------------------------------------------------

export const regionStatusLabels = {
  laboratory: "In-Depth Profile",
  watchlist: "Coming Soon",
};

// Emptied 2026-09-17 — the site had never published a real region profile
// (both entries were "Coming Soon" stubs); with 3 real investigation
// articles now live, a stub category page is worse than no category page.
// investigations[] no longer sets a `region` slug pointing here — repopulate
// this array (and re-link investigations to a real slug) once an actual
// region profile gets written.
export const regions = [];

export const organizationTypeLabels = {
  lender: "Agricultural Lender",
  elevator: "Grain Elevator / Cooperative",
};

export const organizationStatusLabels = {
  profiled: "In-Depth Profile",
  watchlist: "Coming Soon",
};

// Emptied 2026-09-17 — same reason as regions[] above: both entries were
// "Coming Soon" stubs with no real profile written. Repopulate once a real
// organization profile exists.
export const organizations = [];

export const systemCategoryLabels = {
  "production-food": "Production & Food Systems",
  "finance-capital": "Agricultural Finance & Capital",
  "freight-infrastructure": "Freight / Infrastructure / Storage",
  "processing-market": "Processing & Market Access",
};

export const systemStatusLabels = {
  published: "In-Depth Profile",
  planned: "Coming Soon",
};

// The Four Pillars applied consistently across every system deep dive —
// Business Analysis, Data Intelligence, Systems Mapping, AI & Automation.
export const pillarLabels = ["Business Analysis", "Data Intelligence", "Systems Mapping", "AI & Automation"];

// Emptied 2026-09-17 — same reason as regions[]/organizations[] above: both
// entries were "Coming Soon" stubs with no real deep dive written.
// Repopulate once a real system deep dive exists.
export const systems = [];

export const investigationStatusLabels = {
  open: "Open Question",
  investigating: "Investigating",
  published: "Answered",
};

export const investigations = [
  {
    slug: "wallula-pnw-ag-export-container-economics-2026",
    icon: "help_center",
    status: "investigating",
    name: "Wallula Is Pulling the Export Ramp Inland. Which PNW Crops Actually Gain From Containerizing Closer to the Farm?",
    question:
      "Tri-Cities Intermodal and MAC Container Line's Sep 10, 2026 partnership adds 75,000 lifts/year of agricultural transload capacity at Wallula, WA, built specifically for McKay Seed's food-grade barley exports to Japan. Does moving the container transload step inland to Wallula actually beat a direct truck haul over the Cascades on landed cost, or does the real value case rest on capacity and reliability instead — and for which commodities and origin points does that distinction actually matter?",
    tagline: "The actual Pasco-to-coast distance is well short of the freight industry's own intermodal break-even rule of thumb. The partnership's own public language leans on driver capacity and reliability, not a cost number — and no one's published a real landed-cost figure yet.",
    thumbnail: "/assets/og/wallula-pnw-ag-export-container-economics-2026.jpg",
    sourcePath: "../content/research/wallula-pnw-ag-export-container-economics-2026.md",
    region: "",
    publishedDate: "2026-09-22",
    commodity: "Barley (Food-Grade) / Specialty Grain Exports",
    evidence: [
      { label: "Truck News — Tri-Cities Intermodal expands agricultural transload capacity (Sep 10, 2026)", note: "TCI and MAC Container Line partnership: MAC as preferred ag-export logistics provider, initial 75,000 lifts/year, dedicated McKay Seed storage/transload bins, Union Pacific + Columbia Rail service. Brad Heier (MAC President): 'Wallula offers a unique opportunity to bring the agricultural supply chain closer to the producer.'", url: "https://www.trucknews.com/transportation/tri-cities-intermodal-expands-agricultural-transload-capacity/1003221433/" },
      { label: "PNW Ag Network — Tri-Cities Intermodal Offers Wallula Facility Update (Feb 6, 2024)", note: "Facility's first shipment: 300 tons of hay moved via ten 50-mile round trips (Pasco-Wallula) instead of a 450-mile round trip (Pasco-Port of Tacoma) — an 89% cut in highway miles for that load.", url: "https://pnwag.net/tricities-intermodal-wallula/" },
      { label: "Port of Pasco — Interlocal Agreement, Inland Logistics Hub (filed Jan 6, 2026)", note: "Northwest Seaport Alliance, Port of Benton, Port of Pasco, and Port of Walla Walla signed an interlocal agreement to jointly develop the Tri-Cities inland logistics hub; signing ceremony Feb 5, 2026.", url: "https://www.portofpasco.org/uploads/agreements/20260106-ILA-Inland-Logistics-Hub-NWSA-and-Tri-Cities-Ports-part-1-signed.pdf" },
      { label: "U.S. Grains & BioProducts Council — USGC Welcomes New Member McKay Seed Company", note: "McKay Seed is the #1 U.S. exporter of commercial food-grade barley to Japan, specializing in waxy, high-Beta-Glucan varieties.", url: "https://grains.org/usgc-welcomes-new-member-mckay-seed-company/" },
    ],
    stakeholders: ["Theodore Prince, CEO/Founder, Tri-Cities Intermodal", "Brad Heier, President, MAC Container Line", "Dan W. McKay, McKay Seed Company", "AgWest Farm Credit", "Port of Walla Walla / Port of Benton / Port of Pasco / Northwest Seaport Alliance", "Washington Grain Commission and other PNW grain exporters"],
    hypothesis:
      "The generic 2026 freight-industry intermodal break-even distance is roughly 750 miles one-way; the actual Pasco-to-Port of Tacoma distance (the pre-Wallula default route) is roughly 225 miles one-way. If that generic pattern holds on this specific lane, the primary value case for routing agricultural exports through Wallula likely isn't landed-cost savings — it's more probably driver capacity, reduced Cascade mountain-pass exposure, and service reliability, which matches the language the partnership's own principals have used publicly. This is a hypothesis built from one dated, non-commodity-specific mileage data point (a 2024 hay shipment) plus a generic national freight benchmark, not a McKay Seed-specific cost or dwell-time figure — nobody has published one of those yet.",
    graphLayers: {
      physical: "Eastern Washington grain/barley origin → short local drayage to Wallula (Port of Walla Walla's Dodd Road Industrial Park) → Union Pacific/Columbia Rail → coastal container port → ocean export to Japan. The competing physical path is a direct ~225-mile truck haul over the Cascades to a coastal transload yard.",
      capital: "TCI and MAC Container Line built the Wallula transload/storage capacity as a private partnership; four public port/seaport entities co-fund the broader inland logistics hub under a Jan 2026 interlocal agreement; McKay Seed's own export financing and AgWest Farm Credit sit downstream of whichever mode ends up cheaper or more reliable.",
      business: "McKay Seed and other PNW grain exporters choose the mode; TCI and MAC Container Line operate the Wallula rail-drayage alternative; the four-port interlocal agreement provides the public infrastructure layer around it.",
      information: "The Sep 2026 partnership terms, the Jan 2026 interlocal agreement, and one 2024 non-commodity-specific mileage data point are public. Actual McKay Seed-specific landed-cost, dwell-time, or adoption-share data is not.",
    },
    dataNeeds: [
      "A real before/after landed-cost or transit-time figure for McKay Seed (or another exporter) freight actually moving through the new Wallula capacity",
      "What share of the 75,000-lift annual capacity is being used as of this research pass",
      "A statement from Theodore Prince, Dan McKay, or the Washington Grain Commission on adoption drivers (cost vs. reliability vs. driver capacity)",
      "AgWest Farm Credit's or another PNW ag lender's view on whether logistics-mode flexibility factors into export-financing underwriting",
      "County/origin-level GIS data on which crop-origin pairs are geographically closest to Wallula vs. a traditional coastal transload point",
    ],
    artifacts: [
      "A commodity-by-origin landed-cost comparison (Wallula-rail vs. direct truck) once real shipper rate/dwell data exists",
      "A tracker for the Wallula facility's disclosed lift-capacity utilization over time, as a proxy signal while direct adoption data is unavailable",
    ],
    findings:
      "The infrastructure and partnership facts are fully verified: a real Sep 10, 2026 TCI-MAC Container Line partnership, a real Jan 2026 four-port interlocal agreement, and a real, named exporter (McKay Seed, the #1 U.S. food-grade barley exporter to Japan) whose specialty barley the new capacity was built to support. What isn't yet verified is the actual cost or reliability case: the only real before/after mileage data point this facility has published (an 89% highway-mile cut) is from a 2024 hay shipment, not McKay Seed's barley, and the actual Pasco-to-coast distance (~225 miles one-way) sits well short of the freight industry's own ~750-mile generic intermodal break-even distance — suggesting the real value case is more likely driver capacity and reliability than landed-cost savings, which matches the language the partnership's own principals have used publicly. No McKay Seed-specific landed-cost or dwell-time figure is public yet. Status stays investigating.",
    sources: [
      { label: "Truck News — Tri-Cities Intermodal expands agricultural transload capacity", url: "https://www.trucknews.com/transportation/tri-cities-intermodal-expands-agricultural-transload-capacity/1003221433/" },
      { label: "PNW Ag Network — Tri-Cities Intermodal Offers Wallula Facility Update", url: "https://pnwag.net/tricities-intermodal-wallula/" },
      { label: "Port of Pasco — Interlocal Agreement, Inland Logistics Hub", url: "https://www.portofpasco.org/uploads/agreements/20260106-ILA-Inland-Logistics-Hub-NWSA-and-Tri-Cities-Ports-part-1-signed.pdf" },
      { label: "Northwest Seaport Alliance — Interlocal Agreement press release", url: "https://www.nwseaportalliance.com/newsroom/northwest-seaport-alliance-port-benton-port-pasco-and-port-walla-walla-sign-interlocal" },
      { label: "U.S. Grains & BioProducts Council — USGC Welcomes New Member McKay Seed Company", url: "https://grains.org/usgc-welcomes-new-member-mckay-seed-company/" },
    ],
  },
  {
    slug: "wisconsin-dairy-processing-capital-export-margin-2026",
    icon: "help_center",
    status: "investigating",
    name: "Wisconsin Makes 25% of U.S. Cheese. Where Does the Next Dollar of Dairy Processing Capital Earn the Most?",
    question:
      "Wisconsin dairy processors have committed $1.13 billion across 15 capacity projects through 2028, concentrated in cheese/cut-and-wrap rather than whey/ingredients — and Canada's new retaliatory tariff schedule taxes those two categories at different rates (25% cheese vs. 50% whey/powder). Does that capital allocation reflect deliberate risk positioning, and which investment category actually produces the strongest processor and farm resilience per dollar?",
    tagline: "$1.13B in private capex is betting on cheese over whey. Canada's new tariff happens to go easier on cheese too. Nobody's published whether that's strategy or coincidence.",
    thumbnail: "/assets/og/wisconsin-dairy-processing-capital-export-margin-2026.jpg",
    sourcePath: "../content/research/wisconsin-dairy-processing-capital-export-margin-2026.md",
    region: "",
    publishedDate: "2026-09-22",
    commodity: "Dairy (Cheese / Whey / Milk Ingredients)",
    evidence: [
      { label: "Wisconsin DATCP — 2025 dairy statistics", note: "Wisconsin produced 3.64 billion pounds of cheese in 2025 — 25% of U.S. cheese production — and exported $3.99B in agricultural/food products to 148 countries, the third-highest total on record.", url: "https://datcp.wi.gov/Pages/AgDevelopment/ExportStatistics.aspx" },
      { label: "Wisconsin Farmer — Wisconsin dairy processors investing $1.1B in 15 projects (Oct 22, 2025)", note: "$1.13B across 15 capacity projects, 2025-2028: $950M+ cheese/cut-and-wrap, $151M whey/dairy-ingredients, $23M condensed milk.", url: "https://www.wisfarmer.com/story/money/2025/10/22/wisconsin-dairy-processors-investing-over-1b-to-increase-production-capacity-across-state/86807412007/" },
      { label: "UW-Madison Extension Farm Management — Canada's 2026 Retaliatory Dairy Tariffs", note: "Canada's Sep 8, 2026 retaliatory tariffs: 25% on U.S. cheese, 50% on U.S. milk powders/whey/casein/MPC. Anchor estimate: $0.20-$0.35/cwt Wisconsin milk-price reduction, $65-$113M/year statewide, $51-$90/cow.", url: "https://farms.extension.wisc.edu/articles/canadas-2026-retaliatory-dairy-tariffs/" },
      { label: "DATCP — 2026 Dairy Processor Grant Applications", note: "Grants up to $50,000/project, 20% match required; since 2014, 135 of 267 proposals funded, totaling $3.2M.", url: "https://datcp.wi.gov/Pages/News_Media/2026DairyProcessorGrantApplicationsOpenUntilSeptember1.aspx" },
      { label: "Dairy Business Innovation Alliance", note: "Nearly $24M across 300+ grants to Midwest dairy businesses since the 2018 Farm Bill created the program; $1.7M 'Business Builder' pool in 2026.", url: "https://dbia.wisc.edu/" },
      { label: "Wisconsin Cheese Makers Association — Membership", note: "900+ member organizations, including 62 dairy manufacturers operating 82 cheese/butter plants plus 25 further-processors.", url: "https://www.wischeesemakersassn.org/membership-information" },
    ],
    stakeholders: ["Wisconsin Cheese Makers Association (John Umhoefer, Executive Director)", "Compeer Financial", "BMO / Betsy Erdelyi", "DATCP Dairy Processor Grant program staff", "Dairy Business Innovation Alliance", "Dairy Farmers of Wisconsin", "Center for Dairy Research"],
    hypothesis:
      "Wisconsin's $1.13B private capex wave is concentrated in cheese/cut-and-wrap capacity ($950M+) over whey/ingredients capacity ($151M). Canada's new retaliatory tariff schedule taxes cheese at 25% and whey/milk-powder/protein products at 50% — meaning the category holding the large majority of new capital investment also happens to face the lighter tariff. If this is deliberate risk positioning by processors, it would be a genuinely sophisticated read of trade risk made well before the tariff was announced; if it's coincidental (cheese capacity simply being the larger, more established category processors default to expanding), that's a different and less flattering story. Public data can't yet distinguish the two — that's a hypothesis, not a finding.",
    graphLayers: {
      physical: "Milk from Wisconsin dairy farms → cheese/cut-and-wrap plants (the $950M+ capex slice) and whey/ingredients plants (the $151M slice) → domestic and export markets, ~90% of state milk becoming cheese.",
      capital: "$1.13B in private processor capex (2025-2028) dwarfs $3.2M in cumulative DATCP Dairy Processor Grants (since 2014) and ~$24M in cumulative DBIA grants — public capital functions as a small match-funding layer, not the primary driver of the capacity wave.",
      business: "Processors (WCMA's 900+ member network) make the capex decisions; Compeer Financial and BMO underwrite processor capital; DATCP and DBIA administer the grant layer; Canada's government sets the new tariff schedule these decisions now sit inside.",
      information: "Public data covers aggregate capex-by-category, aggregate grant totals, and a statewide farm-level tariff-impact model. It does not cover plant-level ROI, processor-specific Canada-export exposure, or a WCMA/DBIA statement connecting the two.",
    },
    dataNeeds: [
      "Plant-level capital expenditure and cash-return data by investment category (throughput, automation, wastewater/energy, value-added conversion, cold storage, export enablement)",
      "A WCMA or DBIA member survey connecting capex category to Canada-export revenue share",
      "Compeer Financial's or BMO's underwriting criteria for dairy-processor capex loans, and whether tariff exposure by product category factors in",
      "Confirmation of how much of the announced $1.13B has actually been spent vs. merely committed",
      "A processor-margin or plant-cash-flow model translating UW Extension's farm-gate milk-price impact into processor-level terms",
    ],
    artifacts: [
      "A capex-category-by-tariff-exposure matrix once plant-level export-destination data exists",
      "A tracker comparing DATCP/DBIA grant recipients' project categories against the private capex wave's category mix",
    ],
    findings:
      "The capital-allocation pattern is real and verified: Wisconsin processors have committed $950M+ of a $1.13B capex wave to cheese/cut-and-wrap capacity versus $151M to whey/ingredients, and Canada's Sep 8, 2026 retaliatory tariff schedule taxes those two categories at 25% and 50% respectively — meaning the larger capital bet sits behind the lighter tariff wall. What's not yet verified is whether that's deliberate risk positioning or coincidence, because no processor, WCMA, or DBIA statement has connected the two publicly, and plant-level ROI/export-exposure data isn't public. Also verified: public grant capital (DATCP + DBIA, roughly $27M combined since program inception) is a small fraction of the private capex wave and an even smaller fraction of UW Extension's own $65-$113M/year anchor estimate for the tariff's annual cost to Wisconsin dairy farmers. Status stays investigating.",
    sources: [
      { label: "Wisconsin DATCP — Export Statistics", url: "https://datcp.wi.gov/Pages/AgDevelopment/ExportStatistics.aspx" },
      { label: "Wisconsin Farmer — Wisconsin dairy processors investing $1.1B in 15 projects", url: "https://www.wisfarmer.com/story/money/2025/10/22/wisconsin-dairy-processors-investing-over-1b-to-increase-production-capacity-across-state/86807412007/" },
      { label: "UW-Madison Extension Farm Management — Canada's 2026 Retaliatory Dairy Tariffs", url: "https://farms.extension.wisc.edu/articles/canadas-2026-retaliatory-dairy-tariffs/" },
      { label: "DATCP — 2026 Dairy Processor Grant Applications", url: "https://datcp.wi.gov/Pages/News_Media/2026DairyProcessorGrantApplicationsOpenUntilSeptember1.aspx" },
      { label: "Dairy Business Innovation Alliance", url: "https://dbia.wisc.edu/" },
      { label: "Wisconsin Cheese Makers Association — Membership Information", url: "https://www.wischeesemakersassn.org/membership-information" },
    ],
  },
  {
    slug: "bootheel-harvest-margin-input-fuel-2027-crop-2026",
    icon: "help_center",
    status: "investigating",
    name: "Bootheel Harvest Margin Squeeze: Can Input and Fuel Shock Change the 2027 Crop Before 2026 Harvest Is Finished?",
    question:
      "With national diesel at a record $6.285/gal and fall 2026 fertilizer benchmarks up double digits year-over-year, is the cost of finishing the 2026 Bootheel harvest and prepaying 2027 inputs at the same time material enough to change 2027 crop mix and lender exposure — and can that be shown at the county level, not just nationally?",
    tagline: "A named Dunklin County rice grower already lived through this math once in 2026 and switched crops because of it. The 2027 fall prepay version of that same math is pricing worse, not better.",
    thumbnail: "/assets/og/bootheel-harvest-margin-input-fuel-2027-crop-2026.jpg",
    sourcePath: "../content/research/bootheel-harvest-margin-input-fuel-2027-crop-2026.md",
    region: "",
    publishedDate: "2026-09-22",
    commodity: "Rice / Soybeans / Corn / Cotton",
    evidence: [
      { label: "USDA AMS — Grain Transportation Report, Sep 17, 2026", note: "National diesel hit a record $6.285/gal for the week ending Sep 14, 2026 — 254.6 cents above the same week in 2025.", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
      { label: "farmdoc daily — Fertilizer and Fuel Prices Higher Heading into Fall 2026", note: "Aug 7, 2026 national/Midwest benchmarks: anhydrous ammonia $915.50/ton (+16% YoY), DAP $912.22/ton (+7% YoY), potash ~$500/ton (+2.5% YoY); diesel $4.65/gal that week.", url: "https://farmdocdaily.illinois.edu/2026/08/fertilizer-and-fuel-prices-higher-heading-into-fall-2026.html" },
      { label: "Brownfield Ag News — SEMO farmer cuts rice acres as fuel, fertilizer costs surge (Apr 7, 2026)", note: "Rance Daniels, Dunklin County: urea up $250-300/ton, fuel up $1.50/gallon, 'it really puts it in the red' — shifted acres to soybeans.", url: "https://www.brownfieldagnews.com/news/semo-farmer-cuts-rice-acres-as-fuel-fertilizer-costs-surge/" },
      { label: "Brownfield Ag News — Missouri rice farmer: higher fertilizer costs outpace gains in rice prices (Jul 31, 2026)", note: "Rance Daniels, Chairman of the Missouri Rice Council: urea up $300-350/ton vs. 2025; rice price up only about $1/bu.", url: "https://www.brownfieldagnews.com/news/missouri-rice-farmer-higher-fertilizer-costs-outpace-gains-in-rice-prices/" },
      { label: "USDA NASS — Crop Production, Sep 11, 2026", note: "Missouri all-rice planted acreage fell from 213,000 (2025) to 118,000 (2026), -44.6%; soybean acreage rose from 5.6M to 5.95M acres.", url: "https://www.nass.usda.gov/Publications/Todays_Reports/reports/crop0926.pdf" },
      { label: "USDA ERS — Farm Sector Income Forecast, Sep 3, 2026", note: "2026 net farm income forecast $158.4B (+$5B vs. February); total production expenses $492.8B (+4.5%); fertilizer/lime/soil-conditioner +15.3% to $39.6B; fuel/oil +28.8% to $21.6B; direct government payments $47.4B (+70%).", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
    ],
    stakeholders: ["Bootheel rice/soybean/corn/cotton producers", "Farm Credit Southeast Missouri (Greg Cunningham, President & CEO)", "Missouri Rice Council (Rance Daniels, Chairman)", "Local fertilizer dealers and input co-ops", "MU Extension agricultural economists"],
    hypothesis:
      "A Dunklin County rice grower's own on-record account shows fuel and fertilizer cost increases in 2026 large enough to force a real crop-mix shift toward soybeans. National fall-2026 fertilizer benchmarks (anhydrous, DAP, potash) are elevated year-over-year heading into the fall prepay window for the 2027 crop, and national diesel just set a record mid-harvest. If those two facts compound at the local level the way the Dunklin County account suggests they already have once, fall 2027 prepay decisions could push further acreage shifts and show up in Farm Credit SEMO's next disclosed credit-quality numbers — but that's a hypothesis built from one named grower's account plus national benchmarks, not yet a county-verified prepay quote or a lender disclosure that actually covers this window.",
    graphLayers: {
      physical: "Flood-irrigated rice, furrow-irrigated soybeans, grain dryers, and gravel-road hauling — all fuel-intensive — plus fall fertilizer application/prepay for the 2027 crop, overlapping the same six-to-eight-week window as 2026 harvest completion.",
      capital: "2026 harvest operating costs (diesel, drying) and 2027 prepay input commitments draw on the same working-capital line at the same time; Farm Credit SEMO's disclosed credit-quality trend is the one public proxy for how that's landing.",
      business: "Growers, input dealers/co-ops, Farm Credit SEMO, and the Missouri Rice Council sit at the center; national USDA and industry price reporting sets the backdrop each local decision gets made against.",
      information: "National diesel and fertilizer benchmarks are public and current; actual local fall prepay quotes, county-level working-capital figures, and the next Farm Credit SEMO disclosed quarter are not yet public.",
    },
    dataNeeds: [
      "An actual local fall 2026 fertilizer prepay quote from a Bootheel co-op or input dealer, by crop",
      "Producer-level working-capital or operating-line data for the two-season window",
      "A crop-specific breakeven or switch-threshold calculation (rice vs. soybeans vs. cotton vs. corn) built on real local input costs",
      "Farm Credit SEMO's next disclosed quarter (current filings end June 30, 2026 — before the September diesel record)",
      "MU Extension's Southeast Missouri irrigated soybean planning budget (G659) per-acre cost tables — not extractable from the source PDF this pass",
    ],
    artifacts: [
      "A two-season crop budget calculator once local fall prepay quotes exist",
      "A tracker for Farm Credit SEMO's quarterly classification rate against the fall prepay window, to see when (or if) this shows up in disclosed credit data",
    ],
    findings:
      "The mechanism is real and partially county-verified, not just national: a named Dunklin County rice grower (Rance Daniels, Chairman of the Missouri Rice Council) is on the record twice in 2026 describing fuel and fertilizer cost increases large enough that he shifted acres from rice to soybeans, and Missouri's state-level rice acreage fell 44.6% year-over-year in the same period. National diesel just set a record mid-harvest ($6.285/gal), and national fall-2026 fertilizer benchmarks are elevated double digits year-over-year on nitrogen specifically — the same input Daniels named. What isn't yet verified is whether the 2027 fall prepay version of this math is worse, the same, or better than what Daniels already lived through, because no local fall 2027 prepay quote is public, and Farm Credit SEMO's most recent disclosed credit quarter ends before this window even opens. Status stays investigating.",
    sources: [
      { label: "USDA AMS — Grain Transportation Report, Sep 17, 2026", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
      { label: "farmdoc daily — Fertilizer and Fuel Prices Higher Heading into Fall 2026", url: "https://farmdocdaily.illinois.edu/2026/08/fertilizer-and-fuel-prices-higher-heading-into-fall-2026.html" },
      { label: "Brownfield Ag News — SEMO farmer cuts rice acres as fuel, fertilizer costs surge", url: "https://www.brownfieldagnews.com/news/semo-farmer-cuts-rice-acres-as-fuel-fertilizer-costs-surge/" },
      { label: "Brownfield Ag News — Missouri rice farmer: higher fertilizer costs outpace gains in rice prices", url: "https://www.brownfieldagnews.com/news/missouri-rice-farmer-higher-fertilizer-costs-outpace-gains-in-rice-prices/" },
      { label: "USDA NASS — Crop Production, Sep 11, 2026", url: "https://www.nass.usda.gov/Publications/Todays_Reports/reports/crop0926.pdf" },
      { label: "USDA ERS — Farm Sector Income Forecast, Sep 3, 2026", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "MU Extension — Missouri Soybean Growth and Yield Report coverage (Grain Journal, Aug 19, 2026)", url: "https://www.grainjournal.com/article/1152847/missouri-soybean-yield-projections-decline-amid-heat-and-drought" },
    ],
  },
  {
    slug: "bootheel-rice-to-soybean-pivot",
    icon: "help_center",
    status: "investigating",
    name: "Congress Just Made Rice More Profitable. So Why Are Bootheel Farmers Planting Less of It?",
    question:
      "As Missouri rice acreage comes under water- and weather-driven pressure while national soybean acreage expands, how would a continued Bootheel-level shift from rice toward soybeans change grower cash flow, Farm Credit lending exposure, and regional elevator/freight demand?",
    tagline: "Rice just got a bigger federal safety net and a shrinking water table at the same time — here's the three-way policy tug-of-war behind that, and what's still missing to call it county-level.",
    thumbnail: "/assets/og/bootheel-rice-to-soybean-pivot.jpg",
    // Long-form narrative (short answer, system diagram, chart, methodology,
    // implications) lives in its own file instead of an inline string here —
    // same pattern as the tutorial content in content/tutorials/. See
    // apps/marketplace/.claude/skills/research-brief/.
    sourcePath: "../content/research/bootheel-rice-to-soybean-pivot.md",
    // Site no longer carries standalone Region/Organization/System profile
    // stubs (removed 2026-09-17 — see git history) — this stays "" until a
    // real region profile page exists to point at.
    region: "",
    publishedDate: "2026-09-15",
    commodity: "Rice / Soybeans",
    evidence: [
      { label: "USDA NASS — national Acreage report, Jun 30 2026", note: "Soybean planted acreage up 5% from 2025 (85.4M acres); corn planted acreage down 3% from 2025 — national row-crop acreage is actively reallocating.", url: "https://www.nass.usda.gov/Newsroom/2026/06-30-2026.php" },
      { label: "USDA NASS — Rice Outlook, Jul 2025", note: "Missouri's 2025 rice planting estimate was lowered ~20,000 acres from March intentions after May weather prevented planting; national rice harvested area was lowered 121,000 acres to 2.647M acres.", url: "https://esmis.nal.usda.gov/sites/default/release-files/dn39x152w/5h73rv009/707976158/RCS-25F.pdf" },
      { label: "USA Rice Federation — H.R. 1 coverage, Jul 2025", note: "The One Big Beautiful Bill Act raised the rice PLC reference price 20.7%, from $14.00 to $16.90/cwt — the largest increase of any covered commodity.", url: "https://www.usarice.com/news-and-events/publications/usa-rice-daily/article/usa-rice-daily/2025/07/07/rice-wins-with-enactment-of-the-one-big-beautiful-bill-act" },
      { label: "EPA — final Renewable Fuel Standard rule, Mar 27 2026", note: "2026-2027 RFS volumes require a 60% jump in biodiesel/renewable diesel production vs. 2025, with soybean oil use for biofuel up ~17% — a $31B value to corn/soybean-oil producers in 2026.", url: "https://www.hklaw.com/en/insights/publications/2026/04/epa-boosts-biofuel-mandates-in-final-renewable-fuel-standard-rule" },
      { label: "farmdoc daily — U.S.-China soybean deal, Nov 2025", note: "China's negotiated purchase commitment (25M metric tons/yr through 2028) still runs ~14% below the 2020-2024 five-year average, with a 13% tariff still standing.", url: "https://farmdocdaily.illinois.edu/2025/11/us-china-soybean-deal-comparing-past-export-levels-and-global-market-impacts.html" },
      { label: "Brownfield Ag News — Missouri Rice Month, 2026", note: "USA Rice's Mollie Buckler, on the record: Missouri growers 'starting to cut rice' this year over 'market issues,' not weather.", url: "https://www.brownfieldagnews.com/news/missouri-celebrates-rice-month-as-harvest-gets-underway/" },
    ],
    stakeholders: ["Farm Credit Southeast Missouri loan officers", "Bootheel rice producers considering a crop-mix change", "Regional grain elevators with rice-drying capacity", "University of Missouri Extension — Fisher Delta Research Center agronomists", "USA Rice Federation regional staff", "NRCS Missouri/Arkansas conservation planners (EQIP, on-farm reservoir cost-share)"],
    hypothesis:
      "Rice requires flood-irrigation infrastructure (levees, wells, dryers) that soybeans don't — a sustained pivot would idle rice-specific capital assets, change loan collateral/valuation profiles for affected acreage, and shift elevator/dryer throughput toward soybean handling. That basic mechanics story is complicated by three federal policy levers moving in different directions at once (a bigger rice price floor, stronger soybean biofuel demand, a still-weak soybean export market) — the actual pivot decision is as much a bet on which lever holds as it is a response to the water table. This is a hypothesis to test against county-level data, not a conclusion.",
    graphLayers: {
      physical: "Rice-specific infrastructure (levees, wells, dryers) sits idle or gets repurposed as acreage shifts; elevator/dryer throughput mix changes. All of it sits on land the Little River Drainage District engineered out of swamp between 1914-1928, over an alluvial aquifer shared with Arkansas that's been declining since large-scale pumping began near Stuttgart, AR in the early 1900s.",
      capital: "Rice ground and soybean ground carry different collateral valuation and different operating-loan sizing — a crop-mix shift changes a lender's commodity concentration. The 2025 farm bill (H.R. 1) just raised rice's PLC reference price 20.7%, which changes that collateral math again.",
      business: "A loan officer's operating-loan renewal workflow changes inputs: a different crop budget, different insurance product, different collateral review — and now a real question of which federal signal (rice price floor vs. soybean biofuel demand vs. capped soybean export demand) the borrower is actually betting on.",
      information: "A lender's CRM/origination intake and portfolio dashboards would need a commodity-mix-change flag to surface this as a portfolio trend, not just one loan file.",
    },
    dataNeeds: [
      "County-level USDA NASS QuickStats pull for the 12 Farm Credit SEMO counties: rice vs. soybean planted acres, 2019–2026",
      "Farm Credit Southeast Missouri's own commodity concentration by year, if published publicly",
      "Regional elevator/dryer capacity utilization — public data doesn't cover this; needs interviews",
      "Missouri-specific EQIP/on-farm-reservoir cost-share uptake — the only public program detail found so far is Arkansas' Groundwater Initiative; unclear if an equivalent exists on the Missouri side",
      "A direct conversation with a Bootheel grower, loan officer, or elevator manager — everything so far is public data and trade-press reporting, zero interviews",
    ],
    artifacts: [
      "County-level rice vs. soybean acreage dashboard (Power BI) for the 12 SEMO counties",
      "SQL model comparing hypothetical operating-loan sizing for a rice budget vs. a soybean budget on the same acreage",
    ],
    findings:
      "Missouri's 2026 rice acreage came in below its typical ~200,000-acre, seven-county norm, and USA Rice's own regional contact attributes it to \"market issues,\" not weather — real, current, on-the-record evidence that some version of this pivot is already underway. What's not yet established is the county-level magnitude, or how much of it is being driven by the water table versus the new rice PLC reference price versus soybean demand policy — those three forces point in different directions, which is why this stays \"investigating\" rather than \"answered.\"",
    sources: [
      { label: "USDA NASS — Acreage, June 30 2026", url: "https://www.nass.usda.gov/Newsroom/2026/06-30-2026.php" },
      { label: "USDA NASS — Rice Outlook, July 2025", url: "https://esmis.nal.usda.gov/sites/default/release-files/dn39x152w/5h73rv009/707976158/RCS-25F.pdf" },
      { label: "Little River Drainage District — official history", url: "https://www.thelrdd.org/history/" },
      { label: "USGS/SIU — Aquifer Depletion in the Lower Mississippi River Basin", url: "https://opensiuc.lib.siu.edu/jcwre/vol162/iss1/11/" },
      { label: "USA Rice Federation — Rice Wins with Enactment of the One Big Beautiful Bill Act", url: "https://www.usarice.com/news-and-events/publications/usa-rice-daily/article/usa-rice-daily/2025/07/07/rice-wins-with-enactment-of-the-one-big-beautiful-bill-act" },
      { label: "American Farm Bureau Federation — Risk Management Options for 2026", url: "https://www.fb.org/market-intel/risk-management-options-for-2026-corn-soybeans-and-wheat" },
      { label: "Holland & Knight — EPA Final RFS Rule for 2026-2027", url: "https://www.hklaw.com/en/insights/publications/2026/04/epa-boosts-biofuel-mandates-in-final-renewable-fuel-standard-rule" },
      { label: "farmdoc daily — U.S.-China Soybean Deal comparison", url: "https://farmdocdaily.illinois.edu/2025/11/us-china-soybean-deal-comparing-past-export-levels-and-global-market-impacts.html" },
      { label: "Brownfield Ag News — Missouri Celebrates Rice Month", url: "https://www.brownfieldagnews.com/news/missouri-celebrates-rice-month-as-harvest-gets-underway/" },
      { label: "NRCS Arkansas — Reducing Groundwater to Increase Sustainable Agriculture", url: "https://www.nrcs.usda.gov/state-offices/arkansas/news/reducing-groundwater-to-increase-sustainable-agriculture" },
    ],
  },
  {
    slug: "bootheel-rice-basis-storage-marketing-loan-2026",
    icon: "help_center",
    status: "investigating",
    name: "Missouri Rice Is Harvested. Should Bootheel Farmers Sell Now or Finance Time?",
    question:
      "With Missouri's 2026 rough-rice Marketing Assistance Loan rate set at $7.70/cwt and Dunklin County cash bids reported in the low-$6/bushel range, how much basis improvement — and by when — is actually required for storage or MAL-supported financing to beat a harvest-time sale once financing interest, storage, shrink and quality risk are counted?",
    tagline: "A Dunklin County grower says he needs another 75 cents to feel good about selling. Converted into the loan rate's own units, his price is already above the government floor — the real math is somewhere else entirely.",
    thumbnail: "/assets/og/bootheel-rice-basis-storage-marketing-loan-2026.jpg",
    sourcePath: "../content/research/bootheel-rice-basis-storage-marketing-loan-2026.md",
    region: "",
    publishedDate: "2026-09-21",
    commodity: "Rice",
    evidence: [
      { label: "Brownfield Ag News — Missouri rice farmer interview, Sep 2026", note: "Dunklin County producer and Missouri Rice Council chair Rance Daniels: average yields, only ~20% of his crop marketed, cash prices in the low $6/bu range, ~$6.75/bu as a more comfortable selling level; basis widened because 'the futures had outrun the mill market price.'", url: "https://www.brownfieldagnews.com/news/missouri-rice-farmer-holds-off-on-sales-as-basis-remains-wide/" },
      { label: "USDA FSA — 2026 Marketing Assistance Loan Rates, Apr 2026", note: "Missouri's 2026 rough-rice MAL rate set at $7.70/cwt (long grain and medium/short grain), available through May 31, 2027.", url: "https://www.fsa.usda.gov/news-events/news/04-08-2026/usda-announces-2026-marketing-assistance-loan-rates-wheat-feed-grains" },
      { label: "USDA FSA — September 2026 Lending Rates", note: "Direct operating loan rate 5.25%, direct ownership loan rate 6.00%, commodity loan rate 5.00%, effective Sep. 1, 2026.", url: "https://www.fsa.usda.gov/news-events/news/09-01-2026/usda-announces-september-2026-lending-rates-agricultural-producers" },
      { label: "USDA ERS — Farm Sector Income Forecast, Sep 2026", note: "2026 farm sector debt forecast at $605.1B (+4.6%); production expenses at $492.8B (+4.5%); marketing/storage/transportation expenses up 12% YoY nationally.", url: "https://ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "Arkansas Farm Bureau — Market Briefs, Sep 18 2026", note: "Mid-South rice basis 'near $1/cwt under the board' against November futures pushing toward $16/cwt — an independent cross-check that lands within cents of Daniels' own converted comfort price.", url: "https://www.arfb.com/news/2026/sep/18/market-briefs-september-18-2026/" },
    ],
    stakeholders: ["Rance Daniels / Missouri Rice Council", "Farm Credit Southeast Missouri loan officers", "County FSA offices administering the MAL", "USA Rice Federation (Mollie Buckler, Missouri liaison)", "Local rice mills and elevators setting Bootheel basis"],
    hypothesis:
      "If a grower's real cost of waiting is dominated by MAL/operating-credit interest rather than storage, shrink or quality risk, the Marketing Assistance Loan's actual value this year is cheap time to let basis narrow — not price support, since cash already appears to trade above the loan rate once converted to matching units. This is a hypothesis built from the FSA's actual September 2026 lending rate and the published MAL rate, not a locally verified Bootheel carry-cost figure — the real storage/shrink numbers that would fully settle it aren't public.",
    graphLayers: {
      physical: "Harvested rough rice moves from field to on-farm bin or elevator storage, then to a local mill for milling into the rice that actually sells — the same physical path the Commodity Credit Corporation's nonrecourse loan program was built around in 1933 to make viable at all.",
      capital: "A grower chooses between a harvest-time cash bid (~$6.00-$6.75/bu per Daniels, ≈$13.3-$15.0/cwt converted), self-financed storage, an operating line at FSA's 5.25% September rate, or a $7.70/cwt Marketing Assistance Loan available through May 31, 2027 — each a different cost of waiting.",
      business: "Growers, Farm Credit Southeast Missouri and other ag lenders, county FSA offices administering the MAL, the Missouri Rice Council, and the mills whose bids actually set the local basis that determines whether waiting pays.",
      information: "Daily local mill bids, the widening/narrowing basis gap against futures, storage/drying/shrink costs, and MAL mechanics — several of which (a Bootheel-specific mill bid sheet, a local storage rate) simply aren't published anywhere public yet.",
    },
    dataNeeds: [
      "A real, current Bootheel mill bid sheet by grade, in both $/bu and $/cwt",
      "A documented local storage/drying/shrink cost figure — not a national or Iowa/Mississippi State benchmark",
      "A forward basis curve by month for Missouri long-grain rice",
      "Farm Credit Southeast Missouri's own rice-specific loan/collateral practices for the 2026 crop",
      "A direct conversation with a Bootheel grower or lender beyond the one interview Brownfield already published",
    ],
    artifacts: [
      "A weekly, plain-language Bootheel mill-bid and basis tracker published in both $/bu and $/cwt",
      "A break-even carry calculator by days-in-storage once a real local storage-cost figure exists",
    ],
    findings:
      "Converting Rance Daniels' publicly quoted cash price and comfort level from dollars-per-bushel into dollars-per-hundredweight — the units USDA's MAL rate and season-average price forecast are quoted in — shows his price is already running above, not below, both the $7.70/cwt MAL rate and close to USDA's own $14.90/cwt 2026/27 season-average forecast. The financing-interest cost of waiting out the MAL's full availability window, at FSA's actual 5.25% September rate, comes to roughly $0.27/cwt — a small fraction of the ~$1.7/cwt gap between his current price and his stated comfort level. That means the loan isn't functioning as price support this year; it's functioning as cheap time while basis narrows. What's still missing — a real Bootheel mill bid sheet and a documented local storage cost — is exactly what would tell a grower whether that basis gap is actually likely to close, which is why this stays \"investigating.\"",
    sources: [
      { label: "Brownfield Ag News — Missouri rice farmer holds off on sales as basis remains wide", url: "https://www.brownfieldagnews.com/news/missouri-rice-farmer-holds-off-on-sales-as-basis-remains-wide/" },
      { label: "USDA FSA — 2026 Marketing Assistance Loan Rates for Wheat, Feed Grains, Oilseeds and Rice", url: "https://www.fsa.usda.gov/news-events/news/04-08-2026/usda-announces-2026-marketing-assistance-loan-rates-wheat-feed-grains" },
      { label: "USDA FSA — USDA Announces September 2026 Lending Rates for Agricultural Producers", url: "https://www.fsa.usda.gov/news-events/news/09-01-2026/usda-announces-september-2026-lending-rates-agricultural-producers" },
      { label: "USDA ERS — Farm Sector Income Forecast", url: "https://ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "Arkansas Farm Bureau — Market Briefs, September 18, 2026", url: "https://www.arfb.com/news/2026/sep/18/market-briefs-september-18-2026/" },
      { label: "Missouri Rice Research and Merchandising Council — About", url: "https://missouririce.com/about/" },
      { label: "University of Arkansas Extension — On-Farm Rice Drying and Storage", url: "https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/Grain_drying_and_storage/rice_drying_and_storage.aspx" },
      { label: "EBSCO Research Starters — Roosevelt Creates the Commodity Credit Corporation", url: "https://www.ebsco.com/research-starters/history/roosevelt-creates-commodity-credit-corporation/" },
      { label: "farmdoc daily — Farm Bill Review: Historical Background on Marketing Assistance Loans", url: "https://farmdocdaily.illinois.edu/2017/06/farm-bill-review-historical-background-marketing.html" },
    ],
  },
  {
    slug: "michigan-apple-storage-ai-packing-margin-2026",
    icon: "help_center",
    status: "investigating",
    // Today's Question of the Day (daily-dossier, 2026-09-21) — holds the
    // home hero + research-hub featured slot + first-in-grid position.
    // Only one investigation should carry this at a time; the next
    // daily-dossier run moves it here and clears it from whichever
    // investigation held it before. Same-day follow-on articles (via
    // dossier-second-look) must NOT set this.
    featured: true,
    name: "Michigan Has a Billion-Pound Apple Crop. Can Storage and AI Protect Grower Margin?",
    question:
      "With Michigan's 2026 apple crop running near its historical average in size but national wholesale box prices down roughly 28-36% over three years while H-2A labor costs have grown to 60-70% of that same wholesale price, how much of a Michigan grower's margin can controlled-atmosphere storage and AI-enabled packing routing actually protect — and how much sits upstream of anything a packing line can touch?",
    tagline: "The crop is big and high-quality. A 45-acre farm is still projected to lose over $135,000 this season — the real problem is what's left of the box price after labor, not the size of the harvest.",
    thumbnail: "/assets/og/michigan-apple-storage-ai-packing-margin-2026.jpg",
    sourcePath: "../content/research/michigan-apple-storage-ai-packing-margin-2026.md",
    region: "",
    publishedDate: "2026-09-21",
    commodity: "Apples",
    evidence: [
      { label: "USDA/NASS — Michigan 2026 State Overview", note: "Lists Michigan's 2026 apple crop at 1.05 billion lbs (≈25M bushels).", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Michigan&year=2026" },
      { label: "Michigan Apple Committee — 2026 crop-quality release, Aug 24 2026", note: "Executive director Diane Smith: crop expected above the USDA 25M-bushel estimate, exceptional size/color; Michigan's own historical average is 27.2M bushels/year.", url: "https://www.michiganapples.com/press-room/news-releases/michigan-apple-crop-expected-to-be-high-quality/" },
      { label: "MSU Extension — Statewide Apple Maturity Report, Sep 10 2026", note: "Variety-level starch/firmness/Brix/color data across four regions; McIntosh running up to 18 days ahead of normal harvest timing, most varieties 11-24 days early.", url: "https://msu-prod.dotcms.cloud/news/michigan-statewide-apple-maturity-report-september-10-2026" },
      { label: "FreshFruitPortal — USApple labor-cost-share report, May 28 2026", note: "USApple VP of Insights Chris Gerlach: H-2A-related expenses now run 60-70% of average wholesale price/box, up from ~40% in 2013; wholesale prices down ~23% from the 2023/24 peak.", url: "https://www.freshfruitportal.com/news/2026/05/28/aapple-growers-us/" },
      { label: "Farm Credit East — 2026 Apple Outlook, May 19 2026", note: "National apple supply (263-275M bushels) growing faster than profitable-price demand; labor now \"the number one cost of production\"; current pricing \"not sustainable without changes in costs, pack-out, demand or supply.\"", url: "https://www.farmcrediteast.com/en/resources/todays-harvest-Blog/260519AppleOutlookHighSupplyTightMargins" },
      { label: "Crain's Grand Rapids Business — Michigan apple growers face mounting losses, 2026", note: "A 45-acre Michigan apple farm projected to lose $135,495 this season; Michigan Apple Committee retail-split example: retailer earns $1.06, grower earns $0.19, on a $2.99 3-lb bag.", url: "https://www.crainsgrandrapids.com/news/agriculture/michigan-apple-growers-face-mounting-losses-despite-bumper-crop/" },
    ],
    stakeholders: ["Michigan apple growers deciding storage vs. fresh-pack vs. processing routing", "Riveridge Packing operations team", "Michigan Apple Committee (Diane Smith)", "GreenStone Farm Credit Services credit officers", "MSU Extension fruit/storage research team"],
    hypothesis:
      "If controlled-atmosphere storage and AI-enabled sorting mainly affect which share of a grower's crop reaches the fresh-market packout versus the processing channel, they can meaningfully improve a grower's return at the margin — but they can't reverse a structural shift in which labor cost, not storage cost, now consumes 60-70% of the wholesale price per box. This is a hypothesis built from national USApple/Farm Credit East reporting and one Michigan-specific loss example, not a verified Michigan-specific packout-to-margin figure.",
    graphLayers: {
      physical: "Orchards → harvest crews → bins → CA storage rooms → pre-sort/pack → fresh-pack or processing → retail — all sitting on Fruit Ridge and Michigan's other lake-effect growing districts, whose climate (not policy or capital) is why apples grow here at all.",
      capital: "Harvest labor (increasingly the largest single cost), storage energy, inventory financing through lenders like GreenStone, and the packout split between fresh-pack and processing salvage value all compete for the same box-price dollar — a dollar that's fallen ~28-36% over three seasons.",
      business: "Growers, Riveridge and other Fruit Ridge packers, the Michigan Apple Committee, GreenStone Farm Credit Services, and the retailers who capture over 5x the grower's own margin on a bag of apples per the Michigan Apple Committee's own cited example.",
      information: "MSU Extension's variety-by-variety maturity/storage data is genuinely public and detailed — what's missing is the next layer down: 2026 CA-storage occupancy, packout percentage by grade/variety, and any measured AI-sorting ROI, none of which is published yet.",
    },
    dataNeeds: [
      "2026 CA-storage occupancy by facility or region",
      "Packout percentage by grade/variety for the actual 2026 crop, not a maturity-report proxy",
      "Riveridge's own throughput or AI-sorting-ROI figures, if the company will share any",
      "A Michigan-specific version of the Crain's $135,495 loss example — different farm sizes, different storage-access archetypes",
      "A direct conversation with a Fruit Ridge grower, GreenStone loan officer, or Michigan Apple Committee staff",
    ],
    artifacts: [
      "A variety-by-variety fresh-pack vs. CA-storage vs. processing margin comparison, once real 2026 packout data exists",
      "A grower-facing break-even calculator for CA storage cost against the current wholesale price trend",
    ],
    findings:
      "Michigan's 2026 crop is, by the state's own historical average, an ordinary-to-slightly-below-average year in size — not the record the 'billion-pound crop' framing implies — and the real margin threat isn't crop size at all. National USApple reporting shows H-2A-related labor expense has grown from roughly 40% of the average wholesale price per box in 2013 to 60-70% of it in 2026, while that box price itself has fallen roughly 28-36% over three seasons on national oversupply. A October 2025 DOL rule change that lowers the rate of Michigan's H-2A wage growth is real relief, but it doesn't reverse that cost-share climb. Crain's Grand Rapids Business's real farm example — a 45-acre operation projected to lose $135,495 this season, against a retail-vs-grower margin split of $1.06 to $0.19 on a bag of apples — shows the mechanism playing out in real numbers. Storage and AI sorting can shift packout mix at the margin, but the 2026 CA-occupancy and packout data that would show exactly how much margin they're actually protecting isn't public yet, which is why this stays \"investigating.\"",
    sources: [
      { label: "USDA/NASS — Michigan 2026 State Overview", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Michigan&year=2026" },
      { label: "Michigan Apple Committee — Michigan Apple Crop Expected to Be High Quality", url: "https://www.michiganapples.com/press-room/news-releases/michigan-apple-crop-expected-to-be-high-quality/" },
      { label: "Michigan Apple Committee — Current Michigan Apple Industry Issues", url: "https://www.michiganapples.com/about/issues/" },
      { label: "MSU Extension — Michigan Statewide Apple Maturity Report, September 2, 2026", url: "https://msu-prod.dotcms.cloud/news/michigan-statewide-apple-maturity-report-september-2-2026" },
      { label: "MSU Extension — Michigan Statewide Apple Maturity Report, September 10, 2026", url: "https://msu-prod.dotcms.cloud/news/michigan-statewide-apple-maturity-report-september-10-2026" },
      { label: "MSU Extension — Michigan's H-2A Wage Offers in First Half of Fiscal Year 2026", url: "https://www.canr.msu.edu/news/michigan-s-h-2a-wage-offers-in-first-half-of-fiscal-year-2026" },
      { label: "FreshFruitPortal — Labor consumes excessive 60-70% of US apple growers' wholesale price", url: "https://www.freshfruitportal.com/news/2026/05/28/aapple-growers-us/" },
      { label: "FreshFruitPortal — USApple reports 2026 national crop and margin data", url: "https://www.freshfruitportal.com/news/2026/08/24/usapple-report/" },
      { label: "Farm Credit East — 2026 Apple Outlook: High Supply with Tight Margins", url: "https://www.farmcrediteast.com/en/resources/todays-harvest-Blog/260519AppleOutlookHighSupplyTightMargins" },
      { label: "GreenStone Farm Credit Services — Financial Performance", url: "https://www.greenstonefcs.com/about-us/financial-performance/" },
      { label: "GreenStone Farm Credit Services — Strong Apple Harvest Expected in Michigan (2025 context)", url: "https://www.greenstonefcs.com/resources/strong-apple-harvest-expected-in-michigan/" },
      { label: "Crain's Grand Rapids Business — Michigan apple growers face mounting losses despite bumper crop", url: "https://www.crainsgrandrapids.com/news/agriculture/michigan-apple-growers-face-mounting-losses-despite-bumper-crop/" },
      { label: "Riveridge Packing", url: "https://riveridgepacking.com/" },
    ],
  },
  {
    slug: "georgia-poultry-gainesville-inland-port-rail-economics-2026",
    icon: "help_center",
    status: "investigating",
    name: "Georgia Built a $134M Inland Port. Will Poultry Actually Move From Truck to Rail?",
    question:
      "Five months after the Gainesville Inland Port opened, has North Georgia's frozen-poultry export freight actually shifted from direct truck to Norfolk Southern rail, and does the distance/cost math even favor that shift at this lane length?",
    tagline: "Georgia Ports itself still says frozen poultry moves by truck. Run the freight-industry math on the actual distance, and it's not obviously a cost story at all — it may be a congestion story wearing a cost story's clothes.",
    thumbnail: "/assets/og/georgia-poultry-gainesville-inland-port-rail-economics-2026.jpg",
    sourcePath: "../content/research/georgia-poultry-gainesville-inland-port-rail-economics-2026.md",
    region: "",
    publishedDate: "2026-09-21",
    commodity: "Poultry (Frozen, Export)",
    evidence: [
      { label: "Georgia Ports Authority — Frozen Poultry Exports Up 8.5 Percent", note: "Savannah handled 55,957 TEUs of frozen poultry in the 12 months ending February 2026 (+8.5%); Georgia handled 37% of all U.S. frozen poultry exports in 2025. States plainly that frozen poultry currently 'moves to the port by truck.'", url: "https://gaports.com/press-releases/frozen-poultry-exports-up-8-5-percent-at-georgia-ports/" },
      { label: "Georgia Ports Authority — Gainesville Inland Port facility page", note: "$134M facility, 200,000-container annual capacity at full build-out, five-day/week Norfolk Southern rail service, opened May 4, 2026.", url: "https://gaports.com/facilities/inland-ports/gainesville-inland-port/" },
      { label: "Georgia Ports Authority — Gainesville Inland Port Set for May Opening", note: "CEO Griff Lynch: projected to replace 26,000 truck roundtrips in year one; serves ~330 regional manufacturers (poultry, heavy equipment, forest products), not poultry alone.", url: "https://gaports.com/press-releases/gpas-gainesville-inland-port-set-for-may-opening/" },
      { label: "Greater Hall Chamber of Commerce — Economic Development", note: "330+ manufacturing/processing concerns in Hall County; 2025 year-end report: 10 new/expanding developments, 691 new jobs, $186.5M new capital investment.", url: "https://www.ghcc.com/economic-development/" },
      { label: "AgGeorgia — Poultry Financing", note: "Finances poultry-house construction, upgrades, and equipment; no public mention of logistics/mode risk in underwriting.", url: "https://www.aggeorgia.com/loans/poultry" },
      { label: "New Georgia Encyclopedia — Jesse Jewell", note: "Jewell built the first fully vertically-integrated poultry operation in Gainesville, 1930-1954 (hatchery, processing plant, feed mill, rendering plant) — the reason poultry freight is concentrated here at all.", url: "https://www.georgiaencyclopedia.org/articles/business-economy/jesse-jewell-1902-1975/" },
    ],
    stakeholders: ["North Georgia poultry integrators and exporters (e.g. Fieldale Farms)", "Georgia Ports Authority operations/planning staff", "Norfolk Southern intermodal service team", "AgGeorgia Farm Credit poultry-lending staff", "Greater Hall Chamber of Commerce economic-development staff", "Georgia Poultry Federation / USPOULTRY"],
    hypothesis:
      "Generic 2026 freight-industry cost benchmarks put the intermodal-vs-truck break-even around 500 miles one-way (below that, two drayage legs erode most of rail's per-mile savings); the Gainesville-to-Savannah lane is roughly 299 miles one-way. If that generic pattern holds on this specific lane, direct-cost savings alone may not be the main driver of any real mode shift — the more likely value driver is truck-driver capacity, service reliability, and Atlanta-area congestion relief, which is also exactly the rationale Georgia Ports Authority itself leads with publicly. This is a hypothesis built from generic national freight data applied to a specific real distance, not a Gainesville-specific study — it needs actual shipper rate quotes and dwell data to confirm or falsify.",
    graphLayers: {
      physical: "Poultry plants/cold stores (concentrated in Hall County since Jesse Jewell's 1930s-50s vertical-integration build-out) → drayage → Gainesville inland port → Norfolk Southern rail → Savannah reefer/cold storage (~3,600 powered slots) → vessel. The competing physical path is a direct ~299-mile truck haul.",
      capital: "$134M in public Georgia Ports Authority capital built the rail option; AgGeorgia finances the poultry-house assets on the origin end; truck vs. rail carries different fuel, drayage, dwell, and working-capital-in-transit costs that aren't yet publicly measured for this specific lane.",
      business: "Integrators/exporters choose the mode; Georgia Ports Authority and Norfolk Southern operate the rail alternative; the Greater Hall Chamber and regional economic-development offices use the port as a broader manufacturing-attraction asset, not a poultry-specific pitch.",
      information: "Bookings, dwell time, container utilization, and reliability data exist inside GPA/Norfolk Southern systems but aren't public; the only public signal so far is GPA's own boilerplate language, which as of this research pass still describes poultry moving by truck.",
    },
    dataNeeds: [
      "Actual poultry-specific container counts or share moving through Gainesville vs. direct-to-Savannah truck",
      "Real Norfolk Southern intermodal rate quotes and drayage costs for this specific lane, not national generic benchmarks",
      "Dwell-time and service-reliability data for the Gainesville-Savannah rail leg",
      "A statement from a North Georgia poultry integrator (e.g. Fieldale Farms) or the Georgia Poultry Federation on whether/why they are or aren't using the rail option",
      "AgGeorgia or another poultry lender's view on whether logistics-mode flexibility factors into underwriting",
    ],
    artifacts: [
      "A lane-specific truck-vs-rail landed-cost comparison once real drayage/rail rate quotes exist",
      "A tracker for Georgia Ports Authority's own public language about poultry mode share over time, as a proxy signal while direct data is unavailable",
    ],
    findings:
      "The core adoption question — how much frozen poultry has actually shifted from truck to rail — remains genuinely unanswered in public data; Georgia Ports Authority's own most recent release, published well after the port's May 2026 opening, still describes frozen poultry moving to Savannah by truck. What this pass did surface: generic 2026 freight-industry cost benchmarks put the intermodal break-even around 500 miles one-way, and the actual Gainesville-to-Savannah distance is roughly 299 miles — short enough that the generic math doesn't hand rail an obvious cost win. That, plus Georgia Ports Authority's own public rationale (congestion relief and regional manufacturing capacity, not a poultry-specific savings figure), suggests the real value case for this $134M investment may be reliability and capacity rather than direct freight-cost savings — a real, sourced tension, not a settled answer, which is why this stays \"investigating.\"",
    sources: [
      { label: "Georgia Ports Authority — Frozen Poultry Exports Up 8.5 Percent", url: "https://gaports.com/press-releases/frozen-poultry-exports-up-8-5-percent-at-georgia-ports/" },
      { label: "Georgia Ports Authority — Gainesville Inland Port facility page", url: "https://gaports.com/facilities/inland-ports/gainesville-inland-port/" },
      { label: "Georgia Ports Authority — Gainesville Inland Port Set for May Opening", url: "https://gaports.com/press-releases/gpas-gainesville-inland-port-set-for-may-opening/" },
      { label: "Norfolk Southern — Ship By Rail / Intermodal", url: "https://www.norfolksouthern.com/en/ship-by-rail/industry/intermodal" },
      { label: "Greater Hall Chamber of Commerce — Economic Development", url: "https://www.ghcc.com/economic-development/" },
      { label: "AgGeorgia — Poultry Financing", url: "https://www.aggeorgia.com/loans/poultry" },
      { label: "New Georgia Encyclopedia — Jesse Jewell", url: "https://www.georgiaencyclopedia.org/articles/business-economy/jesse-jewell-1902-1975/" },
      { label: "New Georgia Encyclopedia — Poultry Industry", url: "https://www.georgiaencyclopedia.org/articles/business-economy/poultry" },
    ],
  },
  {
    slug: "farm-credit-semo-crop-credit-stress-2026",
    icon: "help_center",
    status: "investigating",
    name: "Farm Credit SEMO's Crop Loan Stress Is Rising. What Is Driving It?",
    question:
      "Can public crop, input-cost, freight, and lender disclosures explain the rise in Farm Credit Southeast Missouri's adversely classified and nonperforming loans without using confidential borrower data?",
    tagline: "Adversely classified loans went 4.7% → 6.3% → 7.3% across three straight quarters — here's what public data can and can't confirm about why, including a driver nobody's dossier had yet.",
    thumbnail: "/assets/og/farm-credit-semo-crop-credit-stress-2026.jpg",
    sourcePath: "../content/research/farm-credit-semo-crop-credit-stress-2026.md",
    region: "",
    publishedDate: "2026-09-16",
    commodity: "Rice / Soybeans / Corn / Cotton",
    evidence: [
      { label: "Farm Credit Southeast Missouri — Q2 2026 Stockholder Report", note: "Adversely classified loans rose from 4.7% (12/31/25) to 7.3% (6/30/26) of the portfolio; nonperforming loans rose from 1.3% to 2.3%. Management explicitly attributes the rise to \"continued adverse economic conditions within the crop sector.\"", url: "https://farmcreditsemo.com/sites/default/files/2026-08/Q2_2026_SH_Report.pdf" },
      { label: "Farm Credit Southeast Missouri — Q1 2026 Stockholder Report", note: "Names a specific new driver: \"The war with Iran has created upward volatility in energy and fertilizer markets... producers... may be looking to shift some of their intended higher input cost crops, such as corn and cotton, over to soybean acres instead.\"", url: "https://farmcreditsemo.com/sites/default/files/2026-05/Q1_2026_SH_Report.pdf" },
      { label: "USDA ERS — Farm Sector Income Forecast, Sep 3 2026", note: "2026 real net farm income forecast down 5.5%; fuel/oil expenses +28.8%, fertilizer/lime/soil-conditioner expenses +15.3%; direct government payments forecast $47.4B, +69.8% YoY.", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
    ],
    stakeholders: ["Farm Credit Southeast Missouri credit/portfolio leadership", "Row-crop producers in its 12-county SEMO territory", "USDA FSA/NRCS/FCA staff", "Grain elevator and freight operators", "Crop-insurance agents and agricultural-finance advisers", "University of Missouri Extension — Fisher Delta Research Center"],
    hypothesis:
      "A public-data propagation model combining crop mix, input costs, freight/basis, government support, and a newly-identified geopolitical cost shock (the Iran conflict's energy/fertilizer volatility) will explain a meaningful share of the direction of local agricultural credit stress, while borrower-level and commodity-level causation remain unobservable from public data alone. This is a hypothesis to test against county-level and interview data, not a conclusion.",
    graphLayers: {
      physical: "Harvest moves fast across SEMO's 12 counties on I-55/57/155, BNSF/UP rail, and Mississippi River terminals at SEMO Port, New Madrid, Mississippi, and Pemiscot counties — freight/basis friction shows up as cash-flow timing before it shows up in a credit file.",
      capital: "Farm Credit SEMO's own portfolio: $946.9M in loans, adversely classified loans up from 4.7% to 7.3% across three straight quarters, even as capital ratios stayed roughly 2-3x regulatory minimums and a five-year earnings decline (ROE 11.2%→5.1%, 2021→2025) predates all of it.",
      business: "A loan officer's renewal workflow now weighs input-cost inflation, a newly-disclosed Iran-conflict cost shock pushing corn/cotton acres toward soybeans, a $47.4B national liquidity injection, and decelerating farmland-value appreciation against the same crop-mix questions the Bootheel rice-to-soybean pivot investigation is tracking.",
      information: "No public dataset currently joins county-level crop mix, input costs, freight/basis, and lender credit-quality metrics into one place — that join is exactly what the graph this site is building is for.",
    },
    dataNeeds: [
      "Farm Credit SEMO's loan exposure broken out by commodity — not publicly disclosed",
      "County-level 2025-26 crop acreage/yield estimates for the 12-county territory",
      "Elevator/dryer throughput or utilization data",
      "Crop-insurance indemnity data by geography",
      "A direct conversation with a SEMO grower, loan officer, or elevator manager — zero interviews conducted so far",
    ],
    artifacts: [
      "Public-data SEMO Crop-Credit Stress Dashboard (quarterly lender metrics × county crop mix × input-cost indices)",
      "12-county crop-pivot GIS layer feeding the same model the Bootheel rice/soybean investigation needs",
    ],
    findings:
      "Farm Credit Southeast Missouri's own filings show a real, multi-quarter credit-quality deterioration (adversely classified loans 4.7% → 6.3% → 7.3% across three consecutive disclosed quarters in 2026) sitting on top of a five-year earnings decline (return on equity 11.2% in 2021 down to 5.1% in 2025) that predates this year's classification spike entirely. Public national data (rising fuel/fertilizer costs, a large direct-payment increase, decelerating farmland-value growth) plausibly explains the direction of the stress, and Farm Credit SEMO's own March 2026 filing names a specific, previously-unreported driver: Iran-conflict-driven energy/fertilizer volatility pushing some producers to shift corn and cotton acres toward soybeans. None of this yet establishes which commodity, county, or cost is doing the most damage — that requires data and interviews this investigation doesn't have yet, which is why status stays \"investigating.\"",
    sources: [
      { label: "Farm Credit Southeast Missouri — Q2 2026 Stockholder Report", url: "https://farmcreditsemo.com/sites/default/files/2026-08/Q2_2026_SH_Report.pdf" },
      { label: "Farm Credit Southeast Missouri — Q1 2026 Stockholder Report", url: "https://farmcreditsemo.com/sites/default/files/2026-05/Q1_2026_SH_Report.pdf" },
      { label: "Farm Credit Southeast Missouri — 2025 Annual Report", url: "https://farmcreditsemo.com/sites/default/files/2026-03/2025AnnualReport_0.pdf" },
      { label: "Farm Credit Southeast Missouri — 2025 patronage refund announcement", url: "https://farmcreditsemo.com/news/farm-credit-semo-board-directors-authorizes-9-1-million-patronage-refund-2025" },
      { label: "USDA ERS — Farm Sector Income Forecast, updated Sep 3 2026", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "Farm Credit Administration — quarterly conditions report, Sep 10 2026", url: "https://www.fca.gov/newsroom/pr_detail/fca-board-receives-quarterly-report-on-conditions-in-agriculture-and-the-farm-credit-system-acknowledges-25th-anniversary-of-9-11-attacks" },
      { label: "Farm Credit Administration — History of FCA", url: "https://www.fca.gov/about/history-of-fca" },
      { label: "Federal Reserve Beige Book, released Sep 2 2026 (St. Louis / Eighth District)", url: "https://www.federalreserve.gov/monetarypolicy/files/BeigeBook_20260902.pdf" },
      { label: "MoDOT — Southeast District Freight Plan", url: "https://www.modot.org/southeast-district-freight-plan" },
      { label: "USDA NASS — Missouri 2026 State Agriculture Overview", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Missouri&year=2026" },
    ],
  },
  {
    slug: "southeast-missouri-biomanufacturing-feasibility",
    icon: "biotech",
    status: "investigating",
    name: "Could Southeast Missouri Become a Biomanufacturing Region — Or Is Feedstock Abundance Not Enough?",
    question:
      "What feedstock, utility, fermentation-scale, and offtake thresholds distinguish a plausible Southeast Missouri biomanufacturing site from a commodity-rich but nonviable location?",
    tagline: "Clinton, Iowa turned a 40-year-old wet mill into a commercial-scale protein factory this year. The Bootheel has the corn. Here's everything else a region would need before it could try.",
    thumbnail: "/assets/og/southeast-missouri-biomanufacturing-feasibility.jpg",
    sourcePath: "../content/research/southeast-missouri-biomanufacturing-feasibility.md",
    region: "",
    publishedDate: "2026-09-17",
    commodity: "Corn / Soybeans / Rice / Crop Residues",
    evidence: [
      { label: "ADM — Clinton, Iowa facility investment announcement, May 7 2026", note: "Two new high-speed corn receiving pits (25,000 bushels/hour each, completing by end of 2026) added to an existing 40+-year corn wet mill, grain elevator, and barge-loading complex.", url: "https://www.adm.com/en-us/news/news-releases/2026/5/adm-announces-investment-to-upgrade-clinton-iowa-corn-processing-facility/" },
      { label: "ADM + The EVERY Company — OvoPro partnership announcement, Jul 14 2026", note: "Commercial-scale production of EVERY's precision-fermented OvoPro egg-white protein, sited at ADM's Clinton, Iowa facility using ADM's precision-fermentation capability.", url: "https://www.adm.com/fr-ca/news/news-releases/2026/7/adm-every-company-partner-to-deliver-us-based-commercial-scale-production-of-ovopro-egg-white-protein/" },
      { label: "University of Minnesota — Minnesota Biomanufacturing Services expansion, Aug 14 2026", note: "New St. Paul CDMO facility five times larger with quadrupled fermentation capacity, full operations beginning spring 2026 — explicitly built to bridge lab-scale discovery and commercial-ready manufacturing.", url: "https://twin-cities.umn.edu/news-events/university-minnesota-quadruples-biomanufacturing-capability-fast-track-innovations-new" },
      { label: "Northwestern University — DREAM Cloud Lab, $20M NSF award, Jul 2026", note: "AI-powered cloud lab for protein engineering; plans to synthesize/characterize 300,000+ proteins and generate up to 30M data points over four years, housed adjacent to a startup incubator.", url: "https://www.mccormick.northwestern.edu/news/articles/2026/07/ai-directed-protein-engineering-cloud-lab-receives-20-million-from-nsf/" },
      { label: "DOE — ASPECT funding opportunity, released Sep 4 2026", note: "Up to $58M for bench and pre-pilot chemical technologies using alternative/waste feedstocks; concept papers due Oct 9 2026.", url: "https://www.energy.gov/cmei/fuels/funding-notice-accelerating-scale-and-pre-piloting-emerging-chemical-technologies-aspect" },
      { label: "USDA Rural Development — Section 9003 biorefinery loan guarantee program", note: "Loan guarantees up to $250M for biorefineries, renewable chemicals, and biobased-product manufacturing; two Phase I application windows a year.", url: "https://www.rd.usda.gov/programs-services/energy-programs/biorefinery-renewable-chemical-and-biobased-product-manufacturing-program" },
      { label: "MoDOT — Southeast District Freight Plan", note: "I-55, I-57, I-155 interstates; BNSF and Union Pacific rail; Mississippi River port facilities at SEMO Port, Mississippi, New Madrid, Pemiscot, and Ste. Genevieve Counties.", url: "https://www.modot.org/southeast-district-freight-plan" },
    ],
    stakeholders: ["Fisher Delta Research, Extension and Education Center applied-research staff", "Missouri Bootheel regional economic-development and utility staff", "Minnesota Biomanufacturing Services scale-up/CDMO staff", "ADM Clinton facility and precision-fermentation team", "DOE Alternative Fuels and Feedstocks Office (ASPECT program)", "USDA Rural Development Section 9003 program staff", "USDA APHIS Biotechnology Regulatory Services"],
    hypothesis:
      "Southeast Missouri satisfies the feedstock and freight layer of a biomanufacturing site but not yet the fermentation-capacity, scale-up-partner, industrial-utility, workforce, or offtake layers that Clinton, Iowa and the Twin Cities can currently document — meaning the opportunity is plausible on paper but unproven until site-level utility, workforce, and buyer data exist. This is a hypothesis to test against direct site and stakeholder data, not a conclusion.",
    graphLayers: {
      physical: "Corn/soybean/rice feedstock and I-55/57/155-BNSF/UP-Mississippi River freight are verified in SEMO; receiving/wet-mill/fermentation/purification infrastructure is verified only at benchmark sites (Clinton, IA; St. Paul, MN) and absent from SEMO's public record.",
      capital: "Producer credit remains the local capital story; biomanufacturing adds DOE ASPECT (up to $58M) and USDA Section 9003 (up to $250M in guarantees) as open, national, project-conditional funding — not SEMO-specific commitments.",
      business: "Farmer/elevator relationships stay unchanged; a biomanufacturing project would add a fermentation operator, a CDMO or scale-up partner, a regulatory-compliance function (USDA APHIS BRS), and a committed offtake buyer — none of which SEMO currently has a documented local relationship with.",
      information: "No public dataset yet joins SEMO facility-level utility capacity, workforce availability, and offtake demand into a site-readiness model — that gap is this investigation's own headline finding.",
    },
    dataNeeds: [
      "SEMO industrial water, power, and wastewater capacity by site — not publicly documented",
      "Facility-level Bootheel elevator/dryer throughput and spare capacity",
      "Crop-residue quantity and collection economics for a hypothetical feedstock-aggregation model",
      "A qualified-bioprocess-workforce assessment for the region",
      "A direct conversation with Fisher Delta, a Missouri economic-development office, a regional utility, or DOE/USDA program staff — zero interviews conducted so far",
    ],
    artifacts: [
      "SEMO Biomanufacturing Feasibility Map (feedstock + utilities + freight + incentives, GIS-based)",
      "Reusable Midwest feedstock-to-product capability matrix (commodity/residue → fermentation → scale-up → offtake)",
      "Funding-stage matcher: lab → pilot → pre-pilot → commercial financing pathways",
    ],
    findings:
      "Southeast Missouri clears one of six benchmarked biomanufacturing capabilities outright (agricultural feedstock plus multimodal freight) and shares a second (applied agricultural research, via Fisher Delta) — but has no verified fermentation asset, scale-up/CDMO partner, documented industrial utility capacity, trained bioprocess workforce, or committed offtake buyer anywhere in the public record. Clinton, Iowa (ADM's precision-fermentation retrofit of a 40-year-old wet mill) and the Twin Cities (Minnesota Biomanufacturing Services' 2026 scale-up expansion) currently hold those capabilities instead. More than $300M in federal capital (DOE ASPECT, USDA Section 9003) is genuinely open to a qualifying project right now, but qualifying requires exactly the site-readiness and bench-validated-technology evidence this research pass could not find for Southeast Missouri. The opportunity is plausible, not proven — which is why status stays \"investigating.\"",
    sources: [
      { label: "ADM — Clinton, Iowa facility investment announcement, May 2026", url: "https://www.adm.com/en-us/news/news-releases/2026/5/adm-announces-investment-to-upgrade-clinton-iowa-corn-processing-facility/" },
      { label: "ADM + The EVERY Company — OvoPro commercial-scale partnership, Jul 2026", url: "https://www.adm.com/fr-ca/news/news-releases/2026/7/adm-every-company-partner-to-deliver-us-based-commercial-scale-production-of-ovopro-egg-white-protein/" },
      { label: "Minnesota Biomanufacturing Services (University of Minnesota)", url: "https://mbs.umn.edu/" },
      { label: "University of Minnesota — biomanufacturing capability expansion announcement", url: "https://twin-cities.umn.edu/news-events/university-minnesota-quadruples-biomanufacturing-capability-fast-track-innovations-new" },
      { label: "Northwestern University — DREAM Cloud Lab", url: "https://syntheticbiology.northwestern.edu/research/biofoundry/dream/" },
      { label: "Northwestern McCormick — DREAM Cloud Lab $20M NSF award", url: "https://www.mccormick.northwestern.edu/news/articles/2026/07/ai-directed-protein-engineering-cloud-lab-receives-20-million-from-nsf/" },
      { label: "NSF iBioFoundry — University of Illinois", url: "https://ibiofoundry.illinois.edu/" },
      { label: "Global Center for Biofoundry Applications", url: "https://gcba.illinois.edu/" },
      { label: "DOE — ASPECT funding opportunity", url: "https://www.energy.gov/cmei/fuels/funding-notice-accelerating-scale-and-pre-piloting-emerging-chemical-technologies-aspect" },
      { label: "USDA Rural Development — Section 9003 program", url: "https://www.rd.usda.gov/programs-services/energy-programs/biorefinery-renewable-chemical-and-biobased-product-manufacturing-program" },
      { label: "Federal Register — Section 9003 final rule, Jul 9 2026", url: "https://www.federalregister.gov/documents/2026/07/09/2026-13841/revisions-to-the-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-loan" },
      { label: "USDA APHIS — Biotechnology Regulatory Services", url: "https://direct.aphis.usda.gov/biotechnology" },
      { label: "MoDOT — Southeast District Freight Plan", url: "https://www.modot.org/southeast-district-freight-plan" },
      { label: "University of Missouri Extension — Rice Extension", url: "https://extension.missouri.edu/programs/rice-extension" },
      { label: "MU CAFNR — Fisher Delta 2026 Field Day", url: "https://cafnr.missouri.edu/stories/t-e-jake-fisher-delta-research-extension-and-education-center-hosts-2026-field-day/" },
    ],
  },
  {
    slug: "bootheel-diesel-harvest-cost-2026",
    icon: "local_gas_station",
    status: "investigating",
    name: "Diesel Just Hit $6.285. What Does That Actually Cost a Bootheel Farm?",
    question:
      "How much does the September 2026 diesel shock change per-acre and per-bushel economics for rice, corn, soybeans, and cotton across field operations, irrigation, drying, and hauling in Southeast Missouri — and which stakeholder in the value chain actually bears the cost?",
    tagline: "USDA just named harvest, drying, and hauling as directly exposed to a record diesel price. Here's what's verified, what's still a real unknown, and why I won't hand you a made-up per-acre number.",
    thumbnail: "/assets/og/bootheel-diesel-harvest-cost-2026.jpg",
    sourcePath: "../content/research/bootheel-diesel-harvest-cost-2026.md",
    region: "",
    publishedDate: "2026-09-18",
    commodity: "Rice / Corn / Soybeans / Cotton",
    evidence: [
      { label: "USDA AMS — Grain Transportation Report, Sep 17 2026", note: "National average diesel hit a record $6.285/gal for the week ending Sep 14, up 31.8¢ week-over-week and 254.6¢ above the same week last year; USDA explicitly names harvest, drying, and hauling as exposed activities, and links reduced Strait of Hormuz shipping (U.S.-Iran conflict) to the fuel-price pressure.", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
      { label: "USDA NASS — Crop Production, Sep 11 2026", note: "Missouri rice planted acreage fell from 213,000 (2025) to 118,000 (2026), a 44.6% decline; soybean planted acreage rose from 5.6M to 5.95M acres.", url: "https://www.nass.usda.gov/Publications/Todays_Reports/reports/crop0926.pdf" },
      { label: "USDA AMS GTR — Iowa harvest weight exemptions", note: "Iowa issued weight-limit exemptions up to 90,000 lb gross through Oct 10, 2026 to cut truckloads needed during harvest amid high fuel prices — a real, contemporary state-level policy response to the same shock.", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
    ],
    stakeholders: ["Bootheel rice, corn, soybean, and cotton producers", "Farm Credit Southeast Missouri loan officers", "Regional grain elevators, dryers, and custom trucking operators", "Missouri Department of Transportation freight policy staff", "University of Missouri Extension — Fisher Delta Research Center"],
    hypothesis:
      "The diesel shock is real and verified at the national/workflow level, and Bootheel rice's flood-irrigation requirement makes this region more fuel-exposed than most U.S. row-crop geographies — but the actual per-acre and per-bushel dollar incidence, and which stakeholder in the value chain absorbs it, cannot be determined from public data alone. This is a hypothesis to test against local fuel-use, custom-rate, and contract-incidence data, not a conclusion.",
    graphLayers: {
      physical: "Flood-irrigated rice, drying, and hauling all run on diesel or diesel-priced energy; the Bootheel's drained-swamp geography (Little River Drainage District, 1914-1928) makes flood irrigation a routine input soybeans and dryland crops elsewhere don't share.",
      capital: "Feeds directly into the same Farm Credit Southeast Missouri credit-classification trend our companion investigation is tracking — adversely classified loans already rose from 4.7% to 7.3% across three straight 2026 quarters before this specific shock is even accounted for.",
      business: "Growers, custom operators, elevators, dryers, and truckers each sit on a different side of who actually pays for the extra fuel — public data cannot show contract-level incidence.",
      information: "USDA's weekly Grain Transportation Report and monthly Crop Production report supply the national/state-level signal on a fast cadence; local fuel-use, custom-rate, and dryer-tariff data doesn't exist publicly and would require direct outreach.",
    },
    dataNeeds: [
      "MU/USDA enterprise-budget diesel-use-per-acre figures by crop for Southeast Missouri",
      "Local custom trucking, drying, and irrigation-pumping rates and how fast they're moving with the fuel price",
      "Representative Bootheel haul distances to elevators and river terminals",
      "Contract-level pass-through terms between growers, elevators, and buyers",
      "A direct conversation with a Bootheel grower, custom operator, or elevator manager — zero interviews conducted so far",
    ],
    artifacts: [
      "Bootheel Harvest Cost Propagation Engine — a transparent, low/base/high sensitivity model translating the national diesel price into per-acre and per-bushel cost ranges by crop, with an evidence-labeled stakeholder-incidence waterfall",
    ],
    findings:
      "The diesel shock and its exposed workflows (harvest, drying, hauling) are fully verified at the national level via USDA's own transportation desk, and Missouri's rice acreage has genuinely contracted 44.6% while soybean acreage held roughly flat to slightly up — two real, sourced, state-level facts. What remains unverified is the actual dollar incidence per acre and per bushel locally, and which stakeholder in the SEMO value chain bears it; that requires local budget data and interviews this pass did not have access to, which is why status stays \"investigating.\"",
    sources: [
      { label: "USDA AMS — Grain Transportation Report, Sep 17 2026", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
      { label: "USDA NASS — Crop Production, Sep 11 2026", url: "https://www.nass.usda.gov/Publications/Todays_Reports/reports/crop0926.pdf" },
      { label: "Little River Drainage District — official history", url: "https://www.thelrdd.org/history/" },
    ],
  },
  {
    slug: "central-great-plains-water-energy-irrigation-resilience-2026",
    icon: "water_drop",
    status: "investigating",
    name: "The High Plains Got One Wet Year. Did It Actually Buy Farmers Time?",
    question:
      "After Kansas groundwater improved while Nebraska groundwater broadly declined, how should producers, lenders, and processors value irrigation resilience when diesel, electricity, and crop margins are volatile?",
    tagline: "Kansas got its first statewide High Plains aquifer increase since 2019. Nebraska, sharing the same aquifer, got the opposite. Neither number means what a headline would make it mean.",
    thumbnail: "/assets/og/central-great-plains-water-energy-irrigation-resilience-2026.jpg",
    sourcePath: "../content/research/central-great-plains-water-energy-irrigation-resilience-2026.md",
    region: "",
    publishedDate: "2026-09-18",
    commodity: "Corn / Soybeans / Irrigated Row Crops",
    evidence: [
      { label: "Kansas Geological Survey — 2025 High Plains aquifer report", note: "First overall statewide increase in the Kansas High Plains aquifer since 2019; south-central Kansas (Great Bend Prairie / Equus Beds) rose ~2.5 ft on average, driven by wetter conditions reducing pumping. Northwest/southwest Kansas kept declining, but less than the long-term average.", url: "https://kgs.ku.edu/news/article/groundwater-levels-in-the-kansas-high-plains-aquifer-see-first-overall-increase-since-2019" },
      { label: "University of Nebraska-Lincoln IANR — 2026 statewide groundwater report", note: "Nearly 5,000 wells measured spring 2024-2025; statewide average decline of 0.29 ft, 62% of wells declined; Nebraska Panhandle saw declines exceeding 10 ft, the worst in the state.", url: "https://ianrnews.unl.edu/article/groundwater-levels-continue-to-decline-amid-persistent-drought-conditions" },
    ],
    stakeholders: ["Kansas and Nebraska irrigated-row-crop producers", "Kansas Groundwater Management Districts", "Nebraska Natural Resources Districts", "Agricultural lenders covering irrigated ground in both states", "K-State/UNL farm-management economists", "Ethanol, feedlot, and elevator operators in the region"],
    hypothesis:
      "Recent groundwater improvement buys meaningful economic resilience only where pumping lift, energy exposure, and crop-market economics also remain favorable — a regional-average water-level change alone will overstate resilience in some places and understate it in others. This is a hypothesis to test against district-level pumping-lift and energy-mix data, not a conclusion.",
    graphLayers: {
      physical: "Aquifer/well/pump/irrigated-field/crop/processor chain — Kansas and Nebraska moved in opposite directions in the same reporting year, within the same broader High Plains aquifer system.",
      capital: "Water-energy cost feeds farm operating margin, asset value, and ultimately lender credit risk — the same mechanism our Bootheel diesel investigation traces for a different commodity and a different water context.",
      business: "Producers, Groundwater Management Districts / Natural Resources Districts, utilities, and ethanol/feedlot/elevator operators all set the rules, demand, and contracts that turn a water-level number into a production decision.",
      information: "Kansas Geological Survey, University of Nebraska-Lincoln, USDA NASS, and Extension enterprise budgets each publish on different cadences and geographies — no single source currently joins water trajectory, energy exposure, and crop economics into one model.",
    },
    dataNeeds: [
      "Farm- or district-level pumping lift (depth to water) for both states",
      "Electric-versus-diesel energy mix by irrigation district",
      "Enterprise-budget crop margins under this year's specific energy prices",
      "Processor/ethanol/feedlot throughput and demand data by district",
      "A direct conversation with a Kansas GMD, Nebraska NRD, or regional lender — zero interviews conducted so far",
    ],
    artifacts: [
      "Water-Energy-Agriculture Resilience GIS — a resilience quintile map, county/district scorecards, and sensitivity curves joining groundwater trajectory, pumping-energy sensitivity, and crop-market access into one evidence-labeled graph",
    ],
    findings:
      "Kansas and Nebraska's 2026 groundwater trajectories are fully verified and genuinely opposite — a real, sourced divergence within the same High Plains aquifer system in the same reporting year. What isn't yet established is how that translates into farm-level economic resilience once pumping lift, energy source, and crop-market conditions are actually factored in; that requires district-level data this pass did not acquire, which is why status stays \"investigating.\"",
    sources: [
      { label: "Kansas Geological Survey — High Plains aquifer report, 2025 data", url: "https://kgs.ku.edu/news/article/groundwater-levels-in-the-kansas-high-plains-aquifer-see-first-overall-increase-since-2019" },
      { label: "University of Nebraska-Lincoln IANR — statewide groundwater report", url: "https://ianrnews.unl.edu/article/groundwater-levels-continue-to-decline-amid-persistent-drought-conditions" },
      { label: "USDA AMS — Grain Transportation Report, Sep 17 2026 (diesel price context)", url: "https://www.ams.usda.gov/sites/default/files/media/GTR09172026.pdf" },
    ],
  },
  {
    slug: "florida-crispr-citrus-recovery-economics-2026",
    icon: "eco",
    status: "investigating",
    name: "Florida Finally Has a CRISPR Citrus Product. Can Biology Reverse the Economics of Greening?",
    question:
      "Under what survival, yield, tree-price, adoption, and time-to-bearing assumptions does HLB-resistant CarriCea T1 make citrus replanting financially attractive for a Florida grower?",
    tagline: "EPA cleared a CRISPR-edited citrus rootstock and growers already ordered 300,000+ trees. That proves the technology cleared a regulatory gate — not that replanting with it pencils out yet.",
    thumbnail: "/assets/og/florida-crispr-citrus-recovery-economics-2026.jpg",
    sourcePath: "../content/research/florida-crispr-citrus-recovery-economics-2026.md",
    region: "",
    publishedDate: "2026-09-18",
    commodity: "Citrus",
    evidence: [
      { label: "University of Florida News, Aug 2026", note: "EPA approved commercial supply of CarriCea T1, a CRISPR-edited HLB-resistant rootstock developed from UF research and commercialized by Soilcea; growers have ordered 300,000+ trees; Florida's citrus industry has lost roughly 95% of production since HLB was detected in 2005.", url: "https://news.ufl.edu/2026/08/hlb-resistant-citrus-rootstock/" },
      { label: "EPA newsroom, 2026", note: "Regulator's own framing: a tool 'to help prevent widespread loss of citrus crops and support America's food supply.' USDA considers fruit from this rootstock non-bioengineered.", url: "https://www.epa.gov/newsreleases/new-citrus-tool-help-prevent-widespread-loss-citrus-crops-and-support-americas-food" },
      { label: "UF/IFAS EDIS — Florida Citrus Rootstock Selection Guide, 4th Edition", note: "The newest wave of released rootstocks (the group CarriCea T1 belongs to) has limited long-term commercial experience; performance depends on soil, disease pressure, climate, and management.", url: "https://edis.ifas.ufl.edu/publication/HS1260" },
      { label: "Citrus Industry Magazine, Apr 2026", note: "Trade-press framing: CarriCea's registration called \"a major milestone\" for HLB-resistance technology reaching this stage at all.", url: "https://citrusindustry.net/2026/04/29/carricea-rootstock-registration-major-milestone/" },
    ],
    stakeholders: ["Florida citrus growers evaluating replant decisions", "UF/IFAS Citrus Research and Education Center", "Soilcea and citrus nurseries", "Citrus processors and packinghouses", "Agricultural lenders and crop-insurance providers covering Florida citrus"],
    hypothesis:
      "CarriCea T1's EPA approval and commercial order volume prove the technology cleared a real regulatory and commercial-availability gate, but not that a typical Florida grower earns a positive return from replanting with it — that depends on survival, yield, and time-to-bearing evidence that hasn't accumulated at commercial field scale yet. This is a hypothesis to test against multi-year field-performance and cohort cash-flow data, not a conclusion.",
    graphLayers: {
      physical: "UF discovery → Soilcea/CarriCea T1 → nursery propagation → grower replant → juvenile pre-bearing years → disease environment → fruit yield/quality → packinghouse/processor throughput.",
      capital: "Replant is a multi-year capital commitment with foregone cash flow before any return — the same kind of capital-vs-evidence question our Bootheel and Central Great Plains investigations trace in different commodities.",
      business: "Growers, nurseries, Soilcea, processors, and lenders each hold a different piece of the adoption-to-recovery chain; nursery fulfillment timing and regional distribution capacity for 300,000+ ordered trees is not yet publicly documented.",
      information: "UF, EPA, and UF/IFAS extension guidance each publish at a different point in the technology's lifecycle — regulatory/commercialization evidence is strong; multi-year field-performance and economic evidence doesn't exist publicly yet.",
    },
    dataNeeds: [
      "Multi-year commercial field survival and yield data for CarriCea T1 across Florida production environments",
      "Nursery fulfillment timing and regional distribution for the 300,000+ ordered trees",
      "County-level citrus acreage and disease/quarantine GIS data",
      "Cohort cash-flow assumptions (tree cost, establishment cost, time-to-bearing, discount rate) from growers or lenders actually underwriting a replant",
      "A direct conversation with UF/IFAS, a grower, a nursery, or a citrus lender — zero interviews conducted so far",
    ],
    artifacts: [
      "Citrus Biological Recovery Scenario Engine — a cohort cash-flow model producing county/grove scenario cards, a disease/quarantine map, and an NPV/breakeven sensitivity surface across survival, yield, and time-to-bearing assumptions",
    ],
    findings:
      "CarriCea T1's EPA approval and 300,000+-tree commercial order volume are fully verified — a genuine milestone for HLB-resistance technology reaching commercial availability at all, after a 95% industry production decline since 2005. What remains unverified is whether replanting with it is actually a positive-return decision for a typical grower: that depends on multi-year field survival/yield data and nursery fulfillment capacity that don't exist publicly yet, which is why status stays \"investigating.\"",
    sources: [
      { label: "University of Florida News — EPA Approves HLB-Resistant Citrus Rootstock", url: "https://news.ufl.edu/2026/08/hlb-resistant-citrus-rootstock/" },
      { label: "EPA — New Citrus Tool press release", url: "https://www.epa.gov/newsreleases/new-citrus-tool-help-prevent-widespread-loss-citrus-crops-and-support-americas-food" },
      { label: "UF/IFAS EDIS — Florida Citrus Rootstock Selection Guide, 4th Edition", url: "https://edis.ifas.ufl.edu/publication/HS1260" },
      { label: "Citrus Industry Magazine — CarriCea Rootstock Registration coverage", url: "https://citrusindustry.net/2026/04/29/carricea-rootstock-registration-major-milestone/" },
    ],
  },
  {
    slug: "bootheel-cargill-soy-crush-status-market-impact-2026",
    icon: "help_center",
    status: "investigating",
    name: "The Bootheel Was Promised a 62M-Bushel Soybean Crush Plant. What Happened — and What Would It Change If It Returns?",
    question:
      "What is the verified 2026 status of Cargill's paused 62-million-bushel Pemiscot County soybean crush project, what public infrastructure already exists around it, and how would an operating plant change Bootheel basis, freight, crop mix, processor access, and lender risk?",
    tagline: "Cargill announced it in 2022, paused it in 2023, and hasn't said a public word about it since — meanwhile the federal policy lever that shaped both decisions just swung the other way.",
    thumbnail: "/assets/og/bootheel-cargill-soy-crush-status-market-impact-2026.jpg",
    sourcePath: "../content/research/bootheel-cargill-soy-crush-status-market-impact-2026.md",
    region: "",
    publishedDate: "2026-09-19",
    commodity: "Soybeans / Soymeal / Soy Oil",
    evidence: [
      { label: "Missouri Department of Economic Development — Caruthersville selected for new Cargill soybean processing facility", note: "May 17, 2022 announcement: 62 million bushels/year capacity, 45 full-time jobs paying more than double the county average, groundbreaking targeted early 2023, operations targeted 2026.", url: "https://ded.mo.gov/press-room/caruthersville-selected-new-cargill-soybean-processing-facility-bringing-new-market" },
      { label: "Feed & Grain — Cargill soybean processing project on hold", note: "June 8, 2023: a Cargill spokesperson attributed the pause to \"many shifting market dynamics,\" with no updated completion timeline given.", url: "https://www.feedandgrain.com/grain-handling-processing/grain-facility-renovations-builds/news/15540267/cargill-soybean-processing-project-on-hold" },
      { label: "DTN/Progressive Farmer — Soaring Soy Crush Spawns Opposition and Benefits", note: "May 2022: Cargill's plant was one of three announced within months of each other (alongside North Dakota Soybean Processors and Shell Rock Soy Processing, IA) in a renewable-diesel-driven capacity wave totaling roughly 143 million new bushels/year.", url: "https://www.dtnpf.com/agriculture/web/ag/news/business-inputs/article/2022/05/20/soaring-soy-crush-spawns-opposition" },
      { label: "Holland & Knight — EPA Boosts Biofuel Mandates in Final RFS Rule for 2026-2027", note: "EPA finalized biomass-based diesel volumes of 5.33B gallons (2026) and 5.75B gallons (2027), up from 3.35B gallons in 2025 (~60% increase), published April 1, 2026, citing \"renewed demand for domestic soybean production.\"", url: "https://www.hklaw.com/en/insights/publications/2026/04/epa-boosts-biofuel-mandates-in-final-renewable-fuel-standard-rule" },
    ],
    stakeholders: ["Bootheel soybean growers", "Cargill", "Missouri Soybeans", "Pemiscot County Port Authority", "CGB (Consolidated Grain & Barge)", "Farm Credit Southeast Missouri", "local economic development organizations"],
    hypothesis:
      "If the plant remains paused, the Bootheel still has a measurable infrastructure-and-market-access gap that existing port capacity alone doesn't close; if it restarts, local crush demand could meaningfully alter soybean basis, barge/rail flows, crop incentives, and working-capital risk — but direction and magnitude both require a current status update and throughput evidence this pass doesn't have. This is a hypothesis to test against direct confirmation from Cargill or Missouri Soybeans, not a conclusion.",
    graphLayers: {
      physical: "Pemiscot County Port's existing slackwater harbor, 5-mile BNSF rail spur, 3-phase power, natural gas, water/sewer, and broadband sit ready in Caruthersville today, independent of whether Cargill's plant ever opens.",
      capital: "Cargill never disclosed a project investment figure; a widely-repeated ~$4M Missouri ARPA rail/electric claim could not be independently verified this pass and is deliberately left out of the article rather than repeated as fact.",
      business: "Cargill, Missouri Soybeans, the Pemiscot County Port Authority, CGB, and Bootheel growers/lenders all sit on different sides of one unresolved status question that a single phone call could likely answer.",
      information: "No public dataset tracks this project's live status — the last public statement is from June 2023. This site's own periodic check is effectively the only public tracker right now.",
    },
    dataNeeds: [
      "Any 2024-2026 public statement from Cargill or Missouri Soybeans on the project's current status",
      "A verified public-infrastructure dollar figure tied specifically to this project, if one exists",
      "Current local soybean basis data for the Caruthersville/Hayti area",
      "Pemiscot County Port throughput and CGB grain-handling volume",
      "A direct conversation with Cargill, Missouri Soybeans, the Port Authority, or a Bootheel grower or lender — zero interviews conducted so far",
    ],
    artifacts: [
      "Bootheel Market Geometry Explorer — an OFF/ON processor-status scenario model showing how local soybean basis, freight routing, and procurement radius would change if the plant activates",
    ],
    findings: null,
    sources: [
      { label: "Missouri Department of Economic Development — Cargill announcement", url: "https://ded.mo.gov/press-room/caruthersville-selected-new-cargill-soybean-processing-facility-bringing-new-market" },
      { label: "Feed & Grain — Cargill soybean processing project on hold", url: "https://www.feedandgrain.com/grain-handling-processing/grain-facility-renovations-builds/news/15540267/cargill-soybean-processing-project-on-hold" },
      { label: "Brownfield Ag News — MO soy crush plant project is on hold", url: "https://www.brownfieldagnews.com/news/mo-soy-crush-plant-project-is-on-hold/" },
      { label: "DTN/Progressive Farmer — Soaring Soy Crush Spawns Opposition and Benefits", url: "https://www.dtnpf.com/agriculture/web/ag/news/business-inputs/article/2022/05/20/soaring-soy-crush-spawns-opposition" },
      { label: "Missouri Port Authorities — Pemiscot County port profile", url: "https://missouriports.org/missouris-ports/pemiscot-county/" },
      { label: "Missouri Department of Agriculture — Grain Regulatory Services / licensed dealer database", url: "https://agriculture.mo.gov/grains/grainsearch.php" },
      { label: "American Farm Bureau Federation — RFS Final Rule 2023-2024-2025 Analysis", url: "https://www.fb.org/market-intel/renewable-fuel-standard-final-rule-2023-2024-2025-increases-short-of-expectations" },
      { label: "Holland & Knight — EPA Boosts Biofuel Mandates in Final RFS Rule for 2026-2027", url: "https://www.hklaw.com/en/insights/publications/2026/04/epa-boosts-biofuel-mandates-in-final-renewable-fuel-standard-rule" },
      { label: "Little River Drainage District — official history", url: "https://www.thelrdd.org/history/" },
    ],
  },
  {
    slug: "texas-high-plains-cotton-drought-shock-2026",
    icon: "help_center",
    status: "investigating",
    name: "Texas High Plains Cotton Yield Is Forecast Down 15.8%. Who Absorbs the Drought Shock?",
    question:
      "With Texas cotton yield forecast 15.8% below 2025 and High Plains drought driving the decline, how does lost production propagate through growers, gins, cooperatives, warehouses, lenders, groundwater systems, and value-added cotton research?",
    tagline: "The state number is real and worse than the national average. What it can't tell you yet is which of the High Plains' 42 counties are actually absorbing the loss.",
    thumbnail: "/assets/og/texas-high-plains-cotton-drought-shock-2026.jpg",
    sourcePath: "../content/research/texas-high-plains-cotton-drought-shock-2026.md",
    region: "",
    publishedDate: "2026-09-19",
    commodity: "Upland Cotton / Cottonseed / Fiber",
    evidence: [
      { label: "Texas A&M AFPC / AgriLife — September 2026 WASDE analysis", note: "Texas cotton yield forecast 15.8% below 2025, nearly double the 9.0% national decline, with High Plains drought named as the primary driver.", url: "https://agrilifetoday.tamu.edu/2026/09/15/tough-year-for-texas-summer-crops-due-to-drought-extreme-temperatures/" },
      { label: "USDA Farm Service Agency — Three Texas Counties Natural Disaster Designation", note: "September 14, 2026: three Texas counties designated primary natural disaster areas under fast-track drought criteria, with additional contiguous counties made eligible for emergency credit.", url: "https://www.fsa.usda.gov/news-events/news/09-14-2026/usda-designates-three-texas-counties-natural-disaster-areas" },
      { label: "Plains Cotton Growers — Who We Are", note: "42-county Texas High Plains producer organization; the region produces 66% of Texas cotton and cottonseed and roughly 30% of the nation's; 8 of the top 10 U.S. cotton counties sit inside this footprint.", url: "https://www.plainscotton.org/who-we-are/" },
    ],
    stakeholders: ["Texas High Plains cotton growers", "Plains Cotton Growers", "Plains Cotton Cooperative Association", "regional cotton gins", "High Plains Underground Water Conservation District", "Texas Tech Fiber and Biopolymer Research Institute", "agricultural lenders", "crop insurers"],
    hypothesis:
      "The drought shock is not evenly distributed across the High Plains: dryland abandonment, irrigated pumping cost, gin utilization, and cooperative marketing volume likely create distinct county-level incidence paths that a state-level yield number can't reveal. This is a hypothesis to test against county-level acreage, gin-throughput, and lender data, not a conclusion.",
    graphLayers: {
      physical: "Drought propagates through dryland abandonment (~10% of 3.7M TX acres already failed) and harder irrigated pumping from the Ogallala Aquifer, then downstream into 42 counties' worth of gin and cooperative-warehouse throughput that isn't yet publicly quantified at that resolution.",
      capital: "USDA FSA's September 14 disaster designation opens fast-track emergency credit for affected counties; the deeper capital question — how this year's volume shock hits gin/co-op working capital and lender risk — remains unmeasured publicly.",
      business: "Plains Cotton Growers (42 counties), Plains Cotton Cooperative Association (farmer-owned marketing/warehousing), and Texas Tech's FBRI (fiber/biopolymer research) all sit on different sides of the same regional cotton system.",
      information: "No public dataset yet joins 2026 county-level failed/harvested acreage, gin throughput, and HPWD pumping data for the High Plains — that join is exactly what this investigation is built toward.",
    },
    dataNeeds: [
      "County-level 2026 failed/harvested cotton acreage across Plains Cotton Growers' 42 counties",
      "Gin-level throughput and utilization figures",
      "Crop-insurance indemnity data by county",
      "HPWD's 2026 permitting/pumping data",
      "A direct conversation with a High Plains grower, gin manager, PCG/PCCA staff member, or HPWD official — zero interviews conducted so far",
    ],
    artifacts: [
      "Texas Cotton Shock Propagation GIS — a county-level failed-acreage and gin-catchment model with a water-risk overlay",
    ],
    findings: null,
    sources: [
      { label: "Texas A&M AgriLife Today — Tough Year for Texas Summer Crops", url: "https://agrilifetoday.tamu.edu/2026/09/15/tough-year-for-texas-summer-crops-due-to-drought-extreme-temperatures/" },
      { label: "Oklahoma Farm Report — September WASDE cotton yield figures", url: "https://www.oklahomafarmreport.com/2026/09/16/september-wasde-forecasts-lower-production-higher-prices-for-most-crops/" },
      { label: "USDA Farm Service Agency — Three Texas Counties Natural Disaster Designation", url: "https://www.fsa.usda.gov/news-events/news/09-14-2026/usda-designates-three-texas-counties-natural-disaster-areas" },
      { label: "Plains Cotton Growers — Who We Are", url: "https://www.plainscotton.org/who-we-are/" },
      { label: "Plains Cotton Cooperative Association — About PCCA", url: "https://pcca.com/who-we-are/about-pcca/" },
      { label: "Texas State Historical Association — High Plains Underground Water Conservation District", url: "https://www.tshaonline.org/handbook/entries/high-plains-underground-water-conservation-district" },
      { label: "Texas Tech Fiber and Biopolymer Research Institute", url: "https://www.depts.ttu.edu/fbri/" },
    ],
  },
  {
    slug: "delmarva-poultry-productivity-grower-consolidation-2026",
    icon: "help_center",
    status: "investigating",
    name: "Delmarva Produces 40% More Chicken With 37% Fewer Growers Than 20 Years Ago. Who Captures the Productivity Gain?",
    question:
      "How has Delmarva increased chicken output while the number of growers fell sharply over two decades, and how are productivity gains, contract income, processing capital, feed demand, disease risk, and bargaining power distributed across growers and integrated poultry companies?",
    tagline: "DCA's own 20-year numbers imply the average remaining grower's real income share roughly doubled — a calculation DCA doesn't publish, and this article shows the math instead of hiding it.",
    thumbnail: "/assets/og/delmarva-poultry-productivity-grower-consolidation-2026.jpg",
    sourcePath: "../content/research/delmarva-poultry-productivity-grower-consolidation-2026.md",
    region: "",
    publishedDate: "2026-09-19",
    commodity: "Broilers / Corn / Soybeans / Feed / Poultry Litter",
    evidence: [
      { label: "Delmarva Chicken Association — 2025 Facts & Figures", note: "628M chickens, 4.7B pounds, $4.6B sales, 1,225 growers, 4,814 houses, $347M grower contract income, $999M employee wages, $1.2B feed purchases, $267M capital improvements. 20-year change: pounds +40.5%, growers -36.8%, houses -11.3%, grower contract income +27.4% inflation-adjusted.", url: "https://www.dcachicken.com/facts/facts-figures.cfm" },
      { label: "Maryland Department of Agriculture — HPAI Caroline County press releases, Feb 25-26 2026", note: "Two presumptive HPAI cases confirmed on Caroline County, MD broiler farms on consecutive days, alongside a Kent County, DE detection — described by officials/industry as a recurring 'new normal' for the Eastern Shore.", url: "https://news.maryland.gov/mda/press-release/2026/02/25/preliminary-testing-confirms-highly-pathogenic-avian-influenza-in-caroline-county-3/" },
      { label: "Perdue Farms and Mountaire Farms corporate history", note: "Perdue (Salisbury, MD, founded 1920) and Mountaire (Millsboro, DE, founded 1914, still family-owned) are two of the peninsula's major vertically integrated processors alongside Allen Harim.", url: "https://corporate.perduefarms.com/" },
    ],
    stakeholders: ["Independent contract growers", "Perdue Farms", "Mountaire Farms", "Allen Harim", "Delmarva Chicken Association", "agricultural lenders", "feed/grain suppliers", "conservation agencies (USDA NRCS)"],
    hypothesis:
      "Output growth with fewer growers/houses likely reflects higher house capacity, bird cycles, genetics, feed conversion, and processor coordination, but public aggregate data cannot assign causality or confirm whether the average remaining grower's real economic position actually improved as much as a naive pool-income/headcount calculation implies. This is a hypothesis to test against grower-level capital, debt, and income data, not a conclusion.",
    graphLayers: {
      physical: "Fewer, larger, more capital-intensive chicken houses (down 11.3% in count, up 40.5% in total output over 20 years) run under contract to three integrated processors clustered within ~25 miles of each other on the peninsula.",
      capital: "Processors invested $267M in 2025 capital improvements; growers' own house-construction/upgrade capital and debt levels aren't publicly disclosed anywhere found this pass.",
      business: "DCA, Perdue, Mountaire, Allen Harim, and 1,225 independent grower-businesses each hold a different piece of a system where recurring HPAI risk (Feb 2026 Caroline/Kent County detections) is becoming an annual cost of doing business.",
      information: "DCA publishes strong aggregate 20-year figures but no per-grower average — the arithmetic implication (roughly doubled real per-grower share) in this article is a derived calculation, not a DCA-verified statistic.",
    },
    dataNeeds: [
      "Grower-level house-construction/upgrade capital and debt data",
      "A breakdown of the $267M 2025 capital-improvement figure by purpose (biosecurity vs. capacity vs. maintenance)",
      "Company-level profit/margin data for Perdue, Mountaire, and Allen Harim",
      "Feed-conversion and flock-cycle trend data explaining the mechanism behind the output increase",
      "A direct conversation with DCA, a processor, or a Delmarva contract grower — zero interviews conducted so far",
    ],
    artifacts: [
      "Delmarva Grower-Processor Dependency Network — a 20-year structural-trend dashboard with a capex/grower-income scenario model",
    ],
    findings: null,
    sources: [
      { label: "Delmarva Chicken Association — 2025 Facts & Figures", url: "https://www.dcachicken.com/facts/facts-figures.cfm" },
      { label: "Maryland Department of Agriculture — Caroline County HPAI press release", url: "https://news.maryland.gov/mda/press-release/2026/02/25/preliminary-testing-confirms-highly-pathogenic-avian-influenza-in-caroline-county-3/" },
      { label: "Perdue Farms — corporate history", url: "https://corporate.perduefarms.com/" },
      { label: "Mountaire Farms — About Us", url: "https://www.mountaire.com/about-us/" },
      { label: "USDA NRCS — Demonstration of Alternative Containment Structures for Stockpiling Poultry Litter", url: "https://cig.sc.egov.usda.gov/projects/demonstration-alternative-containment-structures-stockpiling-poultry-litter" },
    ],
  },
  {
    slug: "bootheel-irrigation-groundwater-energy-economics-2026",
    icon: "water_drop",
    status: "investigating",
    name: "The Bootheel Is Built on Groundwater. What Is One More Irrigation Pass Actually Worth in 2026?",
    question:
      "With persistent Southeast Missouri dryness, late-season soybean/cotton decisions, and elevated energy costs, when does another irrigation pass protect enough yield and quality to justify pumping cost and aquifer draw?",
    tagline: "Groundwater dependence is real and well-documented. The correct next irrigation decision is field-specific, and no public source hands you that answer for free.",
    thumbnail: "/assets/og/bootheel-irrigation-groundwater-energy-economics-2026.jpg",
    sourcePath: "../content/research/bootheel-irrigation-groundwater-energy-economics-2026.md",
    region: "",
    publishedDate: "2026-09-20",
    commodity: "Soybeans / Cotton / Corn",
    evidence: [
      { label: "Missouri DNR — Southeastern Lowlands Groundwater Province", note: "The Bootheel's shallow Southeast Lowlands Alluvial Aquifer holds up to 21 trillion gallons and supports irrigation wells pumping up to 3,000 gallons per minute; deeper McNairy/Wilcox formations hold ~44 trillion gallons combined, many artesian.", url: "https://dnr.mo.gov/document-search/groundwater-provinces-missouri-southeastern-lowlands-groundwater-province-pub3001/pub3001" },
      { label: "MU Extension — Irrigating Soybeans (G4420)", note: "A single well-timed late pod-development/early seed-fill irrigation pass added 6.7 bu/ac (short-season), 3.7 bu/ac (medium-season), and 0.8 bu/ac (full-season) in SE Missouri trials; irrigating at flowering alone is largely wasted water.", url: "https://extension.missouri.edu/publications/g4420" },
      { label: "MU Extension — Scott County irrigated soybean crop budget", note: "Representative SE Missouri cost structure: irrigation fuel ~$16.80/acre for 8 acre-inches (~$2.10/acre-inch), fixed irrigation cost ~$82/acre, repairs ~$12/acre, labor ~$5/acre.", url: "https://extension.missouri.edu/media/wysiwyg/Extensiondata/CountyPages/Scott/CropBudgets/Soybeans-RR-Extend-Irrigated.pdf" },
      { label: "USDA ERS — Farm Sector Income Forecast, September 2026", note: "2026 net farm income forecast at $158.4B, down 5.5% real vs. 2025; production expenses $492.8B (+4.5%); fuel & oil expense forecast up 28.8% vs. the February 2026 estimate.", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "USDA FSA — September 2026 Lending Rates for Agricultural Producers", note: "Direct operating loan rate 5.250%, farm ownership 6.000%, emergency loan (actual loss) 3.750%, effective Sept. 1, 2026.", url: "https://www.fsa.usda.gov/news-events/news/09-01-2026/usda-announces-september-2026-lending-rates-agricultural-producers" },
    ],
    stakeholders: ["Bootheel soybean and cotton growers", "Farm Credit Southeast Missouri", "Missouri Soybeans", "MU Extension / Fisher Delta Research Center", "NRCS / Missouri DNR", "regional grain and cotton buyers"],
    hypothesis:
      "Southeast Missouri is unusually irrigation-dependent and groundwater-rich, but the correct late-season irrigation decision is field-specific — a water-energy decision model joining crop stage, soil moisture, pump lift/efficiency, energy price, and expected yield response is the defensible product, not a single Bootheel-wide answer. This is a hypothesis to test against real field-level pump, moisture, and yield-response data, not a conclusion.",
    graphLayers: {
      physical: "Wells, pumps, and the Southeast Lowlands Alluvial Aquifer sit under a 12-county river-bottom soybean/cotton/corn/rice economy; fields, crop stage, and soil moisture determine what one more pass is actually worth.",
      capital: "FSA's September 2026 lending rates (5.25% operating) and USDA's national fuel-cost/farm-income squeeze (fuel +28.8%, net farm income -5.5% real) set the financing and cost backdrop against which any marginal irrigation dollar gets judged this season.",
      business: "Farm Credit Southeast Missouri, Missouri Soybeans, MU Extension/Fisher Delta, NRCS/Missouri DNR, and regional grain/cotton buyers all touch this decision from a different angle — credit exposure, agronomy, water policy, and market access respectively.",
      information: "MU Extension and Missouri DNR supply strong regional/program-level evidence; no public source yet joins field-level pump lift, soil moisture, crop stage, and yield response into one current-season Bootheel dataset.",
    },
    dataNeeds: [
      "Field-level pump lift, flow rate, and efficiency for representative Bootheel wells",
      "Current-season (not representative/vintage) local diesel and electricity pricing",
      "Real-time soil-moisture and crop-stage data tied to specific fields",
      "Local yield/quality response to the last irrigation pass, by field and variety",
      "A direct conversation with a Bootheel grower, Farm Credit SEMO loan officer, or MU Extension/Fisher Delta agronomist — zero interviews conducted so far",
    ],
    artifacts: [
      "Bootheel Water-Energy Decision Engine — inputs field/crop/stage, soil moisture, forecast ET/rain, pump lift/flow/efficiency, energy price, and expected yield/quality response; outputs $/acre irrigation cost, break-even bushels/lint, sensitivity bands, and a stop/go 'measure more' state",
    ],
    findings:
      "The Bootheel's groundwater dependence and the general shape of the irrigation cost structure are both well-documented: the marginal cost of one more pass (roughly $2/acre-inch in fuel) is far smaller than the average per-acre irrigation budget line suggests, and MU Extension's own agronomic guidance shows timing — not water volume — is what drives most of the yield-response variance. What remains unverified is the field-specific answer for any given 2026 Bootheel field, which requires current pump, moisture, and yield data this pass did not have access to, which is why status stays \"investigating.\"",
    sources: [
      { label: "Missouri DNR — Southeastern Lowlands Groundwater Province", url: "https://dnr.mo.gov/document-search/groundwater-provinces-missouri-southeastern-lowlands-groundwater-province-pub3001/pub3001" },
      { label: "MU Extension — Irrigation Programs", url: "https://extension.missouri.edu/programs/irrigation" },
      { label: "MU Extension — Irrigating Soybeans (G4420)", url: "https://extension.missouri.edu/publications/g4420" },
      { label: "MU Extension — Scott County irrigated soybean crop budget", url: "https://extension.missouri.edu/media/wysiwyg/Extensiondata/CountyPages/Scott/CropBudgets/Soybeans-RR-Extend-Irrigated.pdf" },
      { label: "Southern Ag Today — Irrigation Water Pumping Costs in the Mid-South", url: "https://southernagtoday.org/2024/09/04/irrigation-water-pumping-costs-in-the-mid-south/" },
      { label: "USDA ERS — Farm Sector Income Forecast, September 2026", url: "https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast" },
      { label: "USDA FSA — September 2026 Lending Rates for Agricultural Producers", url: "https://www.fsa.usda.gov/news-events/news/09-01-2026/usda-announces-september-2026-lending-rates-agricultural-producers" },
      { label: "Brownfield Ag News — Early soybean yields look good as harvest advances in Missouri Bootheel", url: "https://www.brownfieldagnews.com/news/early-soybean-yields-look-good-as-harvest-advances-in-missouri-bootheel/" },
    ],
  },
  {
    slug: "central-valley-dairy-nitrogen-compliance-capital-2026",
    icon: "policy",
    status: "investigating",
    name: "California Just Rewrote the Dairy Nitrogen Rulebook. What Will Compliance Actually Cost — and Who Pays?",
    question:
      "After California adopted WQ-2026-0028, what will dairy nitrogen/groundwater compliance actually cost at the farm level — and who bears the capital?",
    tagline: "The regulation is real and dated. The farm-level compliance-capital number nobody has published yet is the actual story.",
    thumbnail: "/assets/og/central-valley-dairy-nitrogen-compliance-capital-2026.jpg",
    sourcePath: "../content/research/central-valley-dairy-nitrogen-compliance-capital-2026.md",
    region: "",
    publishedDate: "2026-09-20",
    commodity: "Milk / Dairy",
    evidence: [
      { label: "State Water Resources Control Board — Order WQO 2026-0028", note: "Adopted September 15, 2026: requires affected dairies to supply alternative drinking water to nitrate-impacted households, stricter nitrogen monitoring, manure-pond leak prevention, and phased manure-application reduction on a schedule up to 35 years; Central Valley Regional Board must adopt final implementing regs within 5 years.", url: "https://www.waterboards.ca.gov/water_issues/programs/enforcement/dairy_general_order.shtml" },
      { label: "Recorder (local reporting) — State Water Board dairy order coverage", note: "The Board's own spatial analysis found roughly 94% of dairies within one mile of the state's highest-risk nitrate groundwater areas are located in the Central Valley.", url: "https://www.recorderonline.com/news/state-water-board-releases-dairies-order-to-protect-water/article_4125ff2a-0c83-4f3e-b0be-1fc5c63a2dc0.html" },
      { label: "CDFA / CDRF — 2026 Dairy Plus Program", note: "2026 (final) round: $34M available, capped at $750/cow up to $1.25M/project; applications due Sept. 14, 2026. Prior rounds 1+2 combined awarded $43.6M across 37 projects.", url: "https://www.grants.ca.gov/grants/2026-dairy-plus-program/" },
      { label: "USDA NASS — Milk Production, January 2025", note: "California milk-cow inventory: 1.71 million head, roughly 18% of the ~9.45 million US milk-cow herd.", url: "https://www.nass.usda.gov/Statistics_by_State/California/Publications/Livestock_Releases/Milk_Production/2025/202501MILKPROD.pdf" },
      { label: "California Dairies, Inc. — About", note: "Owned by nearly 300 independent family-owned dairy farms; the state's largest dairy cooperative.", url: "https://www.californiadairies.com/about/" },
    ],
    stakeholders: ["Central Valley dairy operators", "Western United Dairies", "California Dairies, Inc.", "State/Regional Water Boards", "CDFA / CDRF Dairy Plus Program", "agricultural lenders financing dairy capex"],
    hypothesis:
      "The new order concentrates real compliance-capital demand on a geographically narrow slice of California (the Central Valley, ~94% of at-risk dairies) at the same moment the state's primary compliance-grant pool (Dairy Plus) is in its smaller, final funding round — meaning a meaningful share of the capital gap likely falls to dairy balance sheets, cooperative-level financing, or ag lenders rather than grants. This is a hypothesis to test against real farm-level compliance-cost and grant-award data, not a conclusion.",
    graphLayers: {
      physical: "Central Valley dairies, manure lagoons/ponds, and groundwater wells sit atop the state's most nitrate-impacted aquifer zones — the same geography the Water Board's own spatial analysis flags as ~94% of the statewide at-risk total.",
      capital: "A shrinking Dairy Plus grant pool ($34M in its final 2026 round, down from $43.6M combined in rounds 1+2) meets real per-cow technology costs ($850-950/cow for a lagoon system, $300k+ upfront for a liner retrofit) with no published farm-level compliance-cost total yet.",
      business: "Western United Dairies and California Dairies, Inc. sit between individual dairies and processors; neither has yet published a compliance-capital position. Ag lenders are the likely backstop once grant capital runs out.",
      information: "The regulatory event, the funding-program numbers, and generic technology costs are all well-documented. What's missing is a farm-archetype-level compliance-cost model and any real interview with an operator, cooperative, or lender.",
    },
    dataNeeds: [
      "Round 3 (2026) Dairy Plus application/award data once CDFA publishes it — not yet public as of Sept. 20, 2026",
      "Farm-level compliance-cost estimates broken out by dairy archetype (herd size, existing manure system, distance to a high-risk nitrate zone)",
      "County/facility-level nitrate well-testing data tied to specific dairies",
      "A direct conversation with a Central Valley dairy operator, Western United Dairies, California Dairies Inc., or an ag lender financing compliance capex — zero interviews conducted so far",
    ],
    artifacts: [
      "Central Valley Dairy Compliance Capital GIS — classify dairy archetypes by geography/risk/manure workflow/existing technology; layer regulatory obligations, grant eligibility windows, and capital-cost ranges to produce a compliance timeline, facility-risk map, capex waterfall, technology matrix, and funding gap by archetype",
    ],
    findings: null,
    sources: [
      { label: "State Water Resources Control Board — Dairy General Order program page", url: "https://www.waterboards.ca.gov/water_issues/programs/enforcement/dairy_general_order.shtml" },
      { label: "Maven's Notebook — State Water Board adopts order to protect groundwater from overapplication of manure at dairies", url: "https://mavensnotebook.com/2026/09/17/press-release-state-water-board-adopts-order-to-protect-groundwater-from-overapplication-of-manure-at-dairies/" },
      { label: "Western Water — Groundwater Regs: California Orders New Dairy Nitrate Rules", url: "https://www.western-water.com/2026/09/18/groundwater-regs-california-orders-new-dairy-nitrate-rules/" },
      { label: "Recorder — State Water Board releases dairies order to protect water", url: "https://www.recorderonline.com/news/state-water-board-releases-dairies-order-to-protect-water/article_4125ff2a-0c83-4f3e-b0be-1fc5c63a2dc0.html" },
      { label: "CDFA / Grants Portal — 2026 Dairy Plus Program", url: "https://www.grants.ca.gov/grants/2026-dairy-plus-program/" },
      { label: "PR Newswire — Dairy Plus Program Makes $34 Million Available for Advanced Manure Management Projects on California Farms", url: "https://www.prnewswire.com/news-releases/dairy-plus-program-makes-34-million-available-for-advanced-manure-management-projects-on-california-farms-302802599.html" },
      { label: "USDA NASS — Milk Production, January 2025", url: "https://www.nass.usda.gov/Statistics_by_State/California/Publications/Livestock_Releases/Milk_Production/2025/202501MILKPROD.pdf" },
      { label: "California Dairies, Inc. — About", url: "https://www.californiadairies.com/about/" },
      { label: "CDFA — Manure Nutrient Recovery, Removal, and Reuse on California Dairies", url: "https://www.cdfa.ca.gov/oefi/research/docs/cbc_manure_nutrient_report.pdf" },
    ],
  },
  {
    slug: "north-dakota-soy-crush-yield-finance-2026",
    icon: "factory",
    status: "investigating",
    name: "North Dakota Built the Soybean Crush. Then Yields Fell in the Same Year Acreage Hit a Record. Does the Local-Processing Bet Still Pay?",
    question:
      "North Dakota built local soybean crush capacity; now soybean yields are near 30 bu/acre while processing capacity is being optimized. Does local processing still improve grower and regional resilience in a stressed year?",
    tagline: "Green Bison, a tax-credit rule change, and a $500M state finance program are all real. Whether any of it reaches the grower's basis is the part nobody's published.",
    thumbnail: "/assets/og/north-dakota-soy-crush-yield-finance-2026.jpg",
    sourcePath: "../content/research/north-dakota-soy-crush-yield-finance-2026.md",
    region: "",
    publishedDate: "2026-09-20",
    commodity: "Soybeans / Canola",
    evidence: [
      { label: "USDA NASS — North Dakota State Agriculture Overview, 2023-2026", note: "Soybean yield fell from 35.5 bu/ac (2023) to 37.5 (2024) to 34.5 (2025) to 30.0 bu/ac (2026), a four-year low, even as planted acreage rose to a record 6.85M acres; 2026 total production (203.7M bu) is the lowest of the four years.", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=North+Dakota&year=2026" },
      { label: "Marathon Petroleum / ADM — Green Bison Soy Processing", note: "$350M joint venture (ADM 75%, Marathon Petroleum 25%) in Spiritwood, ND — North Dakota's first dedicated soybean crush plant, 150,000 bu/day nameplate capacity, ~600M lb refined soybean oil/year, opened for the 2023 harvest. No public throughput/utilization data.", url: "https://www.greenbisonsoy.com/" },
      { label: "ADM — July 30, 2026 crush-capacity expansion release", note: "Investments at 4 US plants including Spiritwood unlock ~700,000 metric tons (25M+ bushels) of added annual crush demand; Spiritwood's operational-optimization work targeted for completion mid-2028, not immediate.", url: "https://www.adm.com/en-us/news/news-releases/2026/7/adm-to-expand-north-america-crush-capacity-amid-strong-biofuel-demand/" },
      { label: "North Dakota Industrial Commission — 2026 Farm Financial Stability Program expansion", note: "$100M added March 2026, bringing combined 2026 Farm Financial Stability + Grain Inventory Loan support to $500M at a 3.75% fixed BND-side rate for producers with 2024-25 operating shortfalls.", url: "https://www.ndic.nd.gov/news/ndic-announces-100m-additional-loan-funding-bnd-2026-farm-financial-stability-program" },
      { label: "NDSU Extension and Ag Research News — 2026 crop budget projections", note: "\"It's a revenue problem\" — NDSU's Ron Haugen attributes 2026's low projected crop returns to lower commodity prices, not input costs, which were flat to only modestly higher.", url: "https://www.ag.ndsu.edu/news/newsreleases/2026/february/ndsu-crop-budget-projections-show-low-returns-for-2026" },
    ],
    stakeholders: ["North Dakota soybean growers", "North Dakota Soybean Council", "Green Bison / ADM / Marathon Petroleum", "Northern Canola Growers Association", "Bank of North Dakota / local ag lenders", "NDSU Extension"],
    hypothesis:
      "North Dakota's local soybean-crush investment, a 2026 federal tax-credit rule change favoring soybean oil, and a $500M state farm-finance backstop are all real and mostly pulling in the same direction — but none of the public data yet shows whether any of that value actually reaches a grower's local cash basis in a lower-yield year, versus simply cushioning the state's agricultural economy in general. This is a hypothesis to test against real local-basis, plant-utilization, and lender data, not a conclusion.",
    graphLayers: {
      physical: "Green Bison's Spiritwood, ND crush plant (150,000 bu/day nameplate) sits inside a soybean-growing region that grew from 500,000 acres (1990) to 6.85M acres (2026) but historically exported ~95% of its crop whole, by rail.",
      capital: "A 2026 Section 45Z guidance change roughly doubled the renewable-diesel credit value of Green Bison's soybean oil output; separately, BND/NDIC pushed $500M into farm-finance backstops for 2024-25 shortfalls — two real capital levers, neither one yet shown to connect to grower-level basis.",
      business: "ADM (75%) and Marathon Petroleum (25%) own Green Bison; North Dakota Soybean Council and Northern Canola Growers Association sit as connector/advocacy organizations; Bank of North Dakota and local ag lenders hold the finance relationship with growers.",
      information: "Production, plant nameplate capacity, the tax-credit change, and the state finance program are all well-documented. What's missing: actual plant utilization, historical/current local basis, procurement radius, and canola-vs-soybean acreage economics for an individual grower.",
    },
    dataNeeds: [
      "Green Bison's actual annual throughput/utilization vs. its 150,000 bu/day nameplate capacity — not publicly disclosed",
      "A historical local soybean basis series for the Spiritwood/Jamestown corridor, before and after the 2023 plant opening",
      "Green Bison's real procurement radius and how it's shifted since the July 2026 expansion announcement",
      "Canola-vs-soybean acreage economics for a representative eastern North Dakota grower in 2026",
      "A direct conversation with a North Dakota Soybean Council representative, an ADM/Green Bison operator, a Bank of North Dakota loan officer, or a producer — zero interviews conducted so far",
    ],
    artifacts: [
      "North Dakota Crush + Finance Resilience Graph — nodes for counties, soybean/canola acres and yield, elevators, Green Bison, canola processors, renewable-diesel offtake, meal buyers, rail, and BND/local lenders; scenarios comparing no-local-crush vs. operating/expanded crush under normal and low-yield production years",
    ],
    findings: null,
    sources: [
      { label: "USDA NASS — North Dakota State Agriculture Overview, 2026", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=North+Dakota&year=2026" },
      { label: "USDA NASS — North Dakota State Agriculture Overview, 2025", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=North+Dakota&year=2025" },
      { label: "USDA NASS — North Dakota State Agriculture Overview, 2024", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=North+Dakota&year=2024" },
      { label: "USDA NASS — North Dakota State Agriculture Overview, 2023", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=North+Dakota&year=2023" },
      { label: "Green Bison Soybean Processing — official site", url: "https://www.greenbisonsoy.com/" },
      { label: "ADM — To Expand North America Crush Capacity Amid Strong Biofuel Demand (July 30, 2026)", url: "https://www.adm.com/en-us/news/news-releases/2026/7/adm-to-expand-north-america-crush-capacity-amid-strong-biofuel-demand/" },
      { label: "North Dakota Industrial Commission — NDIC announces $100M additional loan funding for BND 2026 Farm Financial Stability Program", url: "https://www.ndic.nd.gov/news/ndic-announces-100m-additional-loan-funding-bnd-2026-farm-financial-stability-program" },
      { label: "Agweek — How a region known for its wheat and grasslands turned toward corn and soybeans", url: "https://www.agweek.com/crops/how-a-region-known-for-its-wheat-and-grasslands-turned-toward-corn-and-soybeans" },
      { label: "Agweek — Crushing it: North Dakota ready to ride wave of demand for soybean oil and meal", url: "https://www.agweek.com/business/crushing-it-north-dakota-ready-to-ride-wave-of-demand-for-soybean-oil-and-meal" },
      { label: "American Farm Bureau Federation — 45Z Clean Fuel Production Credit", url: "https://www.fb.org/market-intel/45z-clean-fuel-production-credit" },
      { label: "NDSU Extension and Ag Research News — NDSU crop budget projections show low returns for 2026", url: "https://www.ag.ndsu.edu/news/newsreleases/2026/february/ndsu-crop-budget-projections-show-low-returns-for-2026" },
    ],
  },
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
    question: "Should your organization buy an AI vendor platform, or train your own people to build the tool instead?",
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
    question: "Can a student build real AI-agent skills without waiting for a college curriculum to catch up?",
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
    question: "Why do some builders who can write working code still make bad system-design decisions?",
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
    question: "What happens to a builder's momentum the day a course or cohort session ends?",
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
    question: "Are engineers actually ready for the AI-automation questions now showing up inside real city RFPs?",
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
    question: "What can a real RFP teach a programmer that another app clone never will?",
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
    question: "How do real-world constraints actually turn someone who writes code into someone who designs systems?",
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
    question: "If an AI agent can rewrite your code in seconds, what keeps that work trustworthy?",
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
