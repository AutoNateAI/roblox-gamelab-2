export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Consulting", href: "/consulting", keys: ["consulting"] },
  { label: "For Organizations", href: "/for-organizations", keys: ["for-organizations", "programs"] },
  { label: "Courses", href: "/tutorials", keys: ["tutorials"] },
  { label: "Events", href: "/events", keys: ["events"] },
  { label: "Articles", href: "/articles", keys: ["articles"] },
  { label: "About", href: "/about", keys: ["about"] },
];

// AutoNateAI leads with Consulting & development services now, not a public
// individually-enrolled cohort — Consulting sits right after Home. "Program" and
// "For Organizations" are now the same offering (custom, business-requested team
// training) and share one nav entry/page at /for-organizations; /programs/:handle
// still renders (old links, checkout references) with matching updated copy, it's
// just not in primary nav. Community is still a real, working page — reachable from
// the footer and in-page CTAs, not primary nav.
// Live Builds (the old weekly Saturday event) has been decommissioned entirely in
// favor of the always-on Discord + the free course library + the weekly Industry
// Build Lab events (see /events) + requested team training (see /for-organizations).

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

// Five-year regional vision shown on the About page.
export const regionalVision = [
  { period: "2026-27", text: "Prove the model in Sikeston: real internal tools, built for real local businesses, at prices only agentic AI makes possible." },
  { period: "Next", text: "Expand consulting, requested team training, and the Industry Build Labs across Southeast Missouri as demand grows." },
  { period: "Long term", text: "Become the region's standing AI and development partner — the first call when a local business needs a real system built." },
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
    handle: "why-southeast-missouri-businesses-need-internal-ai-capability",
    datePublished: "2026-08-21",
    dateModified: "2026-08-29",
    title: "Why Southeast Missouri Businesses Need Internal AI Capability, Not Just AI Vendors",
    category: "AI Workforce",
    audience: "Business owners, bank leadership, and school and nonprofit administrators in Southeast Missouri",
    summary:
      "Missouri's 2026 Technology2030 report says technology talent is needed across every industry, not just tech companies. The fastest way to act on that locally is to build the capability inside your own team.",
    body: [
      "Missouri's Technology2030 report puts a number on something a lot of Southeast Missouri employers already sense: over 223,000 Missourians work in technology occupations, and a growing share of them work outside traditional tech companies. AI skills aren't a specialty department anymore. They're becoming a baseline capability, the same way spreadsheets did twenty years ago.",
      "Buying a vendor platform solves a narrow problem for a while. It doesn't leave your organization with anyone who understands your own workflows well enough to extend, fix, or replace that tool when your needs change. The alternative is training people already inside your organization to build and maintain the internal tools themselves: a customer follow-up system, a reporting dashboard, a document workflow, an internal knowledge assistant.",
      "That's the premise behind AutoNateAI's in-person cohort in Sikeston: bring an employee (or sponsor a few), and they leave with a real internal tool built for your organization, not a generic certificate. The capability stays local, and it stays with the people who already know how your business actually runs."
    ],
    tags: ["Workforce Development", "Southeast Missouri", "Employers"],
    readingTime: "3 min read",
    image: "/assets/landing/sikeston-article-internal-ai-capability.jpg",
  },
  {
    handle: "what-ai-workforce-readiness-looks-like-for-sikeston-students",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    title: "What AI Workforce Readiness Could Look Like for Sikeston Students",
    category: "Local Economy",
    audience: "Parents, students, and educators in Sikeston and Southeast Missouri",
    summary:
      "Sikeston already has a workforce-development ecosystem connecting the Chamber, schools, SEMO, Three Rivers, and programs like SOAR. AI-agent systems training is a natural next rung on that same ladder.",
    body: [
      "Sikeston's Chamber of Commerce already treats workforce development as an economic-development priority, with existing relationships across local schools, SEMO, Three Rivers, and programs like SOAR. What's been missing locally is a hands-on, in-person path into AI and software systems work that doesn't require leaving the region or waiting for a college curriculum to catch up.",
      "AutoNateAI's youth pathway is built for students who already have some coding experience and want to go further: designing data models and APIs, directing AI coding agents responsibly, and building a real system for a real local organization instead of another isolated class project. It's a two-week, in-person cohort, not a semester-long commitment, so it fits alongside school.",
      "The bar for entry is a free on-ramp: four self-paced digital courses that teach JavaScript fundamentals, prompt and context engineering, and databases before a student ever sets foot in the cohort. A student, or a parent asking on their behalf, can try the material for free first and see if it's a fit before paying anything."
    ],
    tags: ["Youth Programming", "Sikeston", "Workforce Development"],
    readingTime: "3 min read",
    image: "/assets/landing/sikeston-article-workforce-readiness.jpg",
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
    image: "/assets/landing/sikeston-article-system-design.jpg",
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
