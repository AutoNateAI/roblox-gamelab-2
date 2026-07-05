export const navItems = [
  { label: "Marketplace", href: "/", keys: ["home", "marketplace"] },
  { label: "Experiences", href: "/marketplace", keys: ["experiences"] },
  { label: "Services", href: "/services", keys: ["services"] },
  { label: "Events", href: "/events", keys: ["events"] },
  { label: "Creators", href: "/marketplace#creators", keys: ["creators"] },
  { label: "Library", href: "/success", keys: ["library"] },
  { label: "Sell", href: "/services#retainers", keys: ["sell"] },
];

export const categories = [
  {
    title: "Experiences",
    subtitle: "Season-ready worlds",
    image: "/assets/eastbrook-dusk.jpg",
    stat: "12 Quest Concepts",
    size: "large",
  },
  {
    title: "Scripts & AI",
    subtitle: "Systems and automation",
    image: "/assets/title-screen.jpg",
    stat: "AI Frameworks",
  },
  {
    title: "Services",
    subtitle: "Done-for-you builds",
    image: "/assets/vendor-and-bags.jpg",
    stat: "Studio Packages",
  },
  {
    title: "Events",
    subtitle: "Workshops and launches",
    image: "/assets/party-questing.jpg",
    stat: "Live Sessions",
    size: "wide",
  },
];

export const services = [
  {
    title: "Custom Roblox Experience Design",
    description:
      "End-to-end development of immersive worlds with optimized performance, quests, and monetization loops.",
    price: "$4,500",
    meta: ["4-6 Weeks", "Unlimited revisions", "Lifetime asset support"],
    image: "/assets/eastbrook-dusk.jpg",
    featured: true,
  },
  {
    title: "Training & Education Simulations",
    description:
      "Luau-based interactive modules for organizations, schools, and workforce programs.",
    price: "$1,800",
    meta: ["3-week turnaround", "Facilitator notes", "Assessment loops"],
    image: "/assets/title-screen.jpg",
  },
  {
    title: "Experience Optimization",
    description:
      "Technical audit for draw calls, memory leaks, traversal, and player retention friction.",
    price: "$999",
    icon: "speed",
  },
  {
    title: "Economy Balancing",
    description:
      "Mathematical modeling for currencies, boosts, battle-pass paths, and item rarity.",
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
    type: "WORKSHOP",
    title: "Advanced Luau Scripting Optimization",
    date: "Sept 24, 2026",
    time: "18:00 UTC",
    host: "NexaDev Studios",
    seats: "12 / 50",
    description:
      "Deep dive into parallel Luau and memory management for massive-scale simulation games.",
    image: "/assets/title-screen.jpg",
    action: "Register Now",
  },
  {
    type: "TOURNAMENT",
    title: "Creator Series: Build-Off 2026",
    date: "Oct 02, 2026",
    time: "15:00 UTC",
    host: "Global GameJam Hub",
    seats: "FULL",
    description:
      "Watch top creators compete live for a development grant in a speed-building challenge.",
    image: "/assets/party-questing.jpg",
    action: "Join Waitlist",
    disabled: true,
  },
  {
    type: "LAUNCH",
    title: "Season 1 Quest Kit Launch Party",
    date: "Oct 05, 2026",
    time: "20:00 UTC",
    host: "AutoNate Core Team",
    seats: "154 / 200",
    description:
      "A guided walkthrough of the Season 1 quest structure and productized GameLab workflow.",
    image: "/assets/vendor-and-bags.jpg",
    action: "Register Now",
  },
];
