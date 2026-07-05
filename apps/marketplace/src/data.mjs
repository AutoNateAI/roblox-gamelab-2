export const navItems = [
  { label: "Home", href: "/", keys: ["home"] },
  { label: "Marketplace", href: "/marketplace", keys: ["marketplace"] },
  { label: "Services", href: "/services", keys: ["services"] },
  { label: "Events", href: "/events", keys: ["events"] },
];

export const categories = [
  {
    title: "Quest Packs",
    subtitle: "Self-serve skill missions",
    image: "/assets/eastbrook-dusk.jpg",
    stat: "$25-$50 Packs",
    size: "large",
  },
  {
    title: "Team Training",
    subtitle: "Practice with friends",
    image: "/assets/title-screen.jpg",
    stat: "Invite-only runs",
  },
  {
    title: "Organization Builds",
    subtitle: "Program initiatives",
    image: "/assets/vendor-and-bags.jpg",
    stat: "Custom games",
  },
  {
    title: "CTF Events",
    subtitle: "Paid team campaigns",
    image: "/assets/party-questing.jpg",
    stat: "$35 Entries",
    size: "wide",
  },
];

export const services = [
  {
    title: "Custom Program Game Build",
    description:
      "Turn an organization initiative, curriculum, or youth program into a branded Roblox quest world with measurable outcomes.",
    price: "$4,500",
    meta: ["4-6 Weeks", "Unlimited revisions", "Lifetime asset support"],
    image: "/assets/eastbrook-dusk.jpg",
    featured: true,
  },
  {
    title: "Campaign Learning System",
    description:
      "Team-based multi-quest campaigns that help students practice concepts, build confidence, and leave closer to their teammates.",
    price: "$1,800",
    meta: ["3-week turnaround", "Facilitator notes", "Assessment loops"],
    image: "/assets/title-screen.jpg",
  },
  {
    title: "Quest Mechanics Audit",
    description:
      "Tune unlocks, power-ups, capture points, scoring, and friction so learning mechanics create real team advantage.",
    price: "$999",
    icon: "speed",
  },
  {
    title: "Prize Pool Event Design",
    description:
      "Model competition entries, team incentives, pot splits, and grand-prize moments for paid Roblox campaigns.",
    price: "$1,500",
    icon: "monetization_on",
  },
];

export const retainers = [
  {
    name: "Core Support",
    price: "$999",
    cadence: "/mo",
    benefits: ["10 hours of scripting", "24h emergency support", "Monthly health check"],
  },
  {
    name: "Pro Studio",
    price: "$2,499",
    cadence: "/mo",
    benefits: ["30 hours of scripting", "Dedicated project manager", "Custom API development"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    benefits: ["Full outsourced studio", "IP guardrails", "On-site training available"],
  },
];

export const events = [
  {
    type: "OPEN QUEST",
    title: "Thursday Open Quest: Capture the Signal",
    date: "Sept 24, 2026",
    time: "6:00 PM ET",
    host: "AutoNateAI GameLab",
    seats: "18 / 48",
    description:
      "A weekly open CTF-style Roblox quest where teams unlock powers by completing learning mechanics before the final capture round.",
    image: "/assets/title-screen.jpg",
    action: "Join Thursday",
    price: "$35 / player",
    prize: "25% pot grand prize",
    calendarDay: "Thu",
    calendarDate: "24",
  },
  {
    type: "TEAM CAMPAIGN",
    title: "Neon Vanguard Team Campaign",
    date: "Sept 29, 2026",
    time: "6:00 PM ET",
    host: "AutoNateAI GameLab",
    seats: "24 / 64",
    description:
      "A paid multi-quest campaign where participants practice strategy, communication, and applied concepts across several team rounds.",
    image: "/assets/party-questing.jpg",
    action: "Reserve Team",
    price: "$35 / player",
    prize: "Team pot active",
    calendarDay: "Tue",
    calendarDate: "29",
  },
  {
    type: "OPEN QUEST",
    title: "Thursday Open Quest: Power Unlock Arena",
    date: "Oct 01, 2026",
    time: "6:00 PM ET",
    host: "AutoNateAI GameLab",
    seats: "31 / 48",
    description:
      "Teams compete for map control while unlocking movement boosts, shields, and score multipliers through concept-practice mechanics.",
    image: "/assets/vendor-and-bags.jpg",
    action: "Join Thursday",
    price: "$35 / player",
    prize: "25% pot grand prize",
    calendarDay: "Thu",
    calendarDate: "01",
  },
];

export const eventCalendar = [
  {
    weekday: "Tue",
    date: "22",
    title: "Quest Pack Practice",
    description: "Self-serve marketplace pack for solo players or invited friends.",
    mode: "Training",
  },
  {
    weekday: "Thu",
    date: "24",
    title: "Open CTF Quest",
    description: "$35 entry, team powers, 25% prize-pot grand prize.",
    mode: "Open Event",
    active: true,
  },
  {
    weekday: "Tue",
    date: "29",
    title: "Paid Team Campaign",
    description: "Multi-quest cohort campaign with skill leveling and team outcomes.",
    mode: "Campaign",
  },
  {
    weekday: "Thu",
    date: "01",
    title: "Open CTF Quest",
    description: "Thursday competition night for new players and returning teams.",
    mode: "Open Event",
  },
];
