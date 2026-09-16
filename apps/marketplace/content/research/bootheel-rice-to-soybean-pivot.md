# Bootheel Rice-to-Soybean Pivot

## Short Answer

Two months ago I could've handed you a clean headline — "water's drying up, rice is dying, soybeans are winning" — and it would've made a decent LinkedIn post. It's not true, or at least it's not the whole truth, and the whole truth is a better story. What I actually found chasing this question down is three different arms of the federal government pulling the same farmer in three different directions in the same calendar year, sitting on top of dirt that is, itself, artificial, over a water table that has never once cared about anyone's policy position. Status: still **investigating**, not because I came up empty, but because what I found deserves more than a yes-or-no.

## Ground I'm Standing On, Literally

Before there was a "Bootheel rice industry" to have an opinion about, there was a swamp. Nearly 2 million acres of it — the overflow basin for the Mississippi and Ohio rivers and every Ozark stream that ever ran out of hillside room. In 1907, a group of timber men who'd already logged the place out incorporated the Little River Drainage District and set out to turn what was left into farmland. Construction ran from 1914 to 1928. What they left behind — over 900 miles of ditches, 300 miles of levees, draining 1.2 million acres across Bollinger, Cape Girardeau, Dunklin, New Madrid, Pemiscot, Scott, and Stoddard counties — is still, functionally, the plumbing this entire regional economy sits on top of. Every acre of rice or soybeans anyone's arguing about today is farmable at all because a hundred-plus-year-old engineering project said so. That's not trivia. That's the reason this is delta-flat, ditch-veined, gravity-drained land instead of a bayou — and it's worth remembering before anyone treats "the way the Bootheel farms" as a law of nature instead of a very deliberate, very old decision. ([Little River Drainage District — official history](https://www.thelrdd.org/history/))

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "plc", "label": "Farm Bill PLC\nReference Price\n$14.00 → $16.90/cwt", "rank": 0, "detail": "The One Big Beautiful Bill Act (H.R. 1, enacted July 2025) raised the rice Price Loss Coverage reference price 20.7%, from $14.00 to $16.90 per hundredweight — the largest increase given to any covered commodity in that bill." },
    { "id": "rfs", "label": "EPA Renewable Fuel\nStandard\nSoybean oil biofuel use +17%", "rank": 0, "detail": "EPA's final 2026-2027 Renewable Fuel Standard rule (announced March 27, 2026) requires a 60% jump in biodiesel/renewable diesel production vs. 2025, with soybean oil use for biofuel projected up roughly 17% — worth an estimated $31 billion to corn and soybean oil producers in 2026." },
    { "id": "trade", "label": "China Trade Deal\n/ Tariff\n~14% below 5-yr average", "rank": 0, "detail": "China's negotiated soybean purchase commitment (25M metric tons/yr through 2028) still runs roughly 14% below the 2020-2024 five-year average, with a 13% tariff still standing." },
    { "id": "fc", "label": "Farm Credit SEMO\nOperating Loan", "rank": 0, "detail": "Finances the farm's crop-mix decision every season — collateral valuation and loan sizing depend on which crop is actually in the ground. See the companion investigation on Farm Credit SEMO's own 2026 credit-quality trend." },
    { "id": "farm", "label": "Bootheel Farm\n(the decision)", "rank": 1, "detail": "The actual decision point: how much rice-versus-soybean acreage to plant this season, weighing three federal policy signals moving in different directions at once." },
    { "id": "rice_infra", "label": "Rice Infrastructure\n(Levees / Wells / Dryer)", "rank": 2, "detail": "Rice requires flood-irrigation infrastructure — wells, levees, a dryer built for a different moisture curve — that soybeans never touch. A real pivot leaves this idle or repurposed." },
    { "id": "soy_equip", "label": "Standard Row-Crop\nEquipment", "rank": 2, "detail": "Soybean acreage uses the region's standard row-crop equipment — no rice-specific capital investment required." },
    { "id": "elevator", "label": "Regional Elevator", "rank": 3, "detail": "Where both rice and soybeans converge again after the field — a crop-mix shift changes what an elevator needs to be ready to handle and dry at harvest. Elevator/dryer throughput data doesn't exist publicly yet — see What We Still Need below." },
    { "id": "market", "label": "Buyer / Export\nMarket", "rank": 4, "detail": "The final destination — domestic biofuel crush for soybeans, or milling/export for rice, each shaped by the policy signals feeding in from the left." }
  ],
  "edges": [
    { "from": "plc", "to": "farm", "evidence": "verified", "label": "Reference price +20.7%" },
    { "from": "rfs", "to": "farm", "evidence": "verified", "label": "Pulls demand toward soybeans" },
    { "from": "trade", "to": "farm", "evidence": "verified", "label": "Caps soybean export upside" },
    { "from": "fc", "to": "farm", "evidence": "verified", "label": "Finances the decision" },
    { "from": "farm", "to": "rice_infra", "evidence": "estimated", "label": "If rice acreage holds/grows" },
    { "from": "farm", "to": "soy_equip", "evidence": "estimated", "label": "If soybean acreage grows" },
    { "from": "rice_infra", "to": "elevator", "evidence": "hypothesis", "label": "Drying/throughput shift not yet measured" },
    { "from": "soy_equip", "to": "elevator", "evidence": "hypothesis", "label": "Drying/throughput shift not yet measured" },
    { "from": "elevator", "to": "market", "evidence": "estimated", "label": "Domestic crush vs. export/milling" }
  ],
  "sourceLabel": "USA Rice Federation (H.R. 1 coverage, Jul 2025); EPA final RFS rule (Mar 27 2026); farmdoc daily U.S.-China soybean deal analysis (Nov 2025). Drag nodes to rearrange, pinch/scroll to zoom, tap a node for its source."
}
```

Rice and soybeans share a farm, and often a lender, and not much else once they leave the field. Rice needs the flood-irrigation infrastructure soybeans never touch — wells, levees, a dryer built for a different moisture curve. A real pivot doesn't just change what's planted; it changes what's sitting idle, what a loan officer is underwriting, and what an elevator needs to be ready to handle at harvest.

## Three Signals, One Farmer

Here's the part that made me stop writing the easy version of this piece. I went looking for "why would someone leave rice for soybeans" and found something more interesting: three separate federal policy levers, moving in the same season, pointing three different directions.

**Signal one — Congress just told rice growers to stay.** The One Big Beautiful Bill Act (H.R. 1, enacted July 2025) raised the Price Loss Coverage reference price for rice 20.7%, from $14.00 to $16.90 per hundredweight — the largest increase given to any covered commodity in that bill. That's not a subtle nudge. That's Congress rebuilding rice's safety net wider than it's been in years, right as the water underneath it gets more expensive to pull. ([USA Rice Federation: "Rice Wins with Enactment of the One Big Beautiful Bill Act"](https://www.usarice.com/news-and-events/publications/usa-rice-daily/article/usa-rice-daily/2025/07/07/rice-wins-with-enactment-of-the-one-big-beautiful-bill-act))

**Signal two — EPA just told soybeans to grow up.** On March 27, 2026, EPA finalized 2026-2027 Renewable Fuel Standard volumes requiring a 60% jump in biodiesel and renewable diesel production versus 2025, with soybean oil use for biofuel projected up roughly 17% — worth an estimated $31 billion to corn and soybean oil producers in 2026 alone, $2 billion more than 2025. That's real, durable, domestic demand pull that has nothing to do with anyone overseas buying a bushel. ([Holland & Knight: EPA Boosts Biofuel Mandates in Final RFS Rule for 2026-2027](https://www.hklaw.com/en/insights/publications/2026/04/epa-boosts-biofuel-mandates-in-final-renewable-fuel-standard-rule))

**Signal three — the export market soybeans actually need is still hurt.** China halted soybean purchases in May 2025 in retaliation for tariffs, pushing its total duty on U.S. soybeans to 34%. The negotiated fix — 12 million metric tons by the end of 2025, at least 25 million metric tons a year through 2028 — sounds like relief until you check it against history: the five-year average was closer to 29 million metric tons, so even the "deal" locks in a market roughly 14% below normal, with a 13% tariff still standing. ([farmdoc daily: U.S.-China Soybean Deal, comparing past export levels](https://farmdocdaily.illinois.edu/2025/11/us-china-soybean-deal-comparing-past-export-levels-and-global-market-impacts.html))

Put plainly: the same Congress that just made rice's price floor more attractive is a different branch of the same government making soybean demand more attractive for entirely different reasons — and a third arm, trade policy, is quietly capping how far that soybean demand story can actually run. Nobody wrote a memo reconciling these three. The farmer in the middle has to.

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Rice's safety net just got a lot wider",
  "labels": ["PLC reference price — before H.R. 1", "PLC reference price — after H.R. 1 (2025 crop year+)"],
  "series": [{ "name": "$ per hundredweight", "data": [14.00, 16.90], "color": "#7fbf7f" }],
  "sourceLabel": "USA Rice Federation, July 2025 — a 20.7% increase, the largest given to any covered commodity in the bill. This is the safety-net price, not the market price — it's what triggers a payment, not what a farmer sells at."
}
```

```chart
{
  "type": "bar",
  "title": "Biofuel policy is pulling soybean oil harder, not just export markets",
  "labels": ["2025 soybean oil use for biofuel (index)", "2026 soybean oil use for biofuel (index)"],
  "series": [{ "name": "Index, 2025 = 100", "data": [100, 117], "color": "#f2b134" }],
  "sourceLabel": "EPA final Renewable Fuel Standard rule, 2026-2027 (announced March 27, 2026) — roughly 17% more soybean oil pulled into biofuel, independent of anything happening at the export dock."
}
```

```chart
{
  "type": "bar",
  "title": "National acreage signals, most recent USDA release",
  "labels": ["Soybean planted acreage — 2026 (+5% YoY)", "Rice harvested area — 2025 (revised down)"],
  "series": [{ "name": "Million acres", "data": [85.4, 2.647] }],
  "sourceLabel": "USDA NASS — Acreage, June 30 2026 & Rice Outlook, July 2025. Different crops, different acreage concepts (planted vs. harvested), different years — shown together to illustrate relative national scale, not a trend line."
}
```

None of these three charts contradicts the others — that's exactly the point. Rice's safety net got stronger, soybean's demand story got stronger, and they're both true in the same season for different reasons that have nothing to do with each other.

## Where This Is Happening

```map
{
  "title": "The Bootheel laboratory, and where the water story actually started",
  "zoom": 7,
  "markers": [
    { "lat": 34.4970, "lng": -91.5527, "label": "Stuttgart, AR — where large-scale Delta rice-irrigation groundwater pumping began, early 1900s" },
    { "lat": 36.8834, "lng": -89.5878, "label": "Sikeston, MO — regional hub in the Southeast Missouri profile" },
    { "lat": 36.5847, "lng": -89.5259, "label": "New Madrid, MO — Mississippi River port town" }
  ],
  "sourceLabel": "Public geographic reference points only. Groundwater pumping for rice and soybean irrigation in the Mississippi River Valley Alluvial Aquifer started in the Grand Prairie near Stuttgart in the early 1900s and spread north into the Bootheel — the aquifer under Sikeston and New Madrid is the same connected system, not a separate one."
}
```

The aquifer everyone in the Bootheel is drawing from doesn't start at the Missouri state line. It's one connected system stretching down through Arkansas, and the water use started there — pumping for rice and soybean irrigation in the alluvial aquifer began in the early 1900s Grand Prairie area and grew from there. By 2005, aquifer water use across the system had climbed 655% since 1965, with parts of it now declining roughly a foot a year. That's not a Bootheel problem or an Arkansas problem. It's one water table with several states' worth of straws in it. ([USGS/SIU: Aquifer Depletion in the Lower Mississippi River Basin](https://opensiuc.lib.siu.edu/jcwre/vol162/iss1/11/))

## It's Already Showing Up This Year

This is the part I didn't expect to find so directly. Missouri's 2026 rice acreage came in below average — and when Brownfield Ag News asked USA Rice's Mollie Buckler why, she didn't point to weather. She pointed to money: "We have some farmers to the west in our region and deep south in the Bootheel starting to cut rice... We're definitely dealing with some market issues that contributed to that low acreage number that we saw this year." That's a real, current, on-the-record signal that some version of this pivot is already underway — not a hypothesis about what might happen, a trade association's own read on what's happening right now. It just doesn't come with county-level numbers attached yet, which is exactly the gap this investigation still needs to close. ([Brownfield Ag News: Missouri Celebrates Rice Month as Harvest Gets Underway](https://www.brownfieldagnews.com/news/missouri-celebrates-rice-month-as-harvest-gets-underway/))

## Methodology

This round pulled from USDA NASS (Acreage, Rice Outlook), the Farm Service Agency and Congressional Research Service (PLC/ARC reference prices), EPA's final Renewable Fuel Standard rule and legal-industry summaries of it, farmdoc daily's trade-data analysis of the U.S.-China soybean agreement, USA Rice Federation's own statement on H.R. 1, Brownfield Ag News' on-the-ground reporting, USGS/academic groundwater research on the Mississippi River Valley Alluvial Aquifer, and the Little River Drainage District's own historical record. It still does not include county-level USDA QuickStats data for the 12 Farm Credit SEMO counties specifically, Farm Credit Southeast Missouri's own current commodity-concentration figures, a Missouri-specific accounting of EQIP/on-farm-reservoir cost-share uptake (the strongest public data I found on that program is Arkansas-specific, via the Arkansas Groundwater Initiative), or a single direct conversation with a Bootheel grower, loan officer, or elevator manager. Those four gaps are the actual next phase of this investigation, not an afterthought.

## Moral of the Story

If you take one thing from this, take this: **the crop-mix decision in front of Bootheel farmers right now isn't a weather story or a water story alone — it's a bet on which federal policy lever holds up longer, and almost nobody is framing it that way.** A few concrete moves that fall out of that:

- **If you grow rice**, the new $16.90/cwt reference price is real money worth re-running your numbers against before you assume a pivot is your only move — but it does nothing for your water bill. Pair it with a real look at cost-share water infrastructure (the Arkansas Groundwater Initiative's on-farm reservoir/tailwater-recovery model is the closest documented template; ask your local NRCS office whether an equivalent exists on the Missouri side before assuming it doesn't) before you commit capital in either direction.
- **If you grow soybeans, or you're leaning that way**, don't treat the biofuel-demand story as a permanent floor under the export story's problems. The China deal locks in volume that's still roughly 14% below the five-year average, with a 13% tariff still standing — model what your plan looks like if that number doesn't hold through 2028, not just if it does.
- **If you're a lender**, the more useful conversation with a borrower this cycle isn't "what did you plant" — it's "which of these three signals are you actually betting on, and have you sized the collateral and the loan for what happens if that bet is wrong." That's a materially different renewal conversation than the one a generic crop budget gets you to.
- **If you're an elevator or infrastructure operator**, the swing to watch isn't rice-versus-soybean acreage in isolation — it's whether a real pivot shows up as reduced dryer utilization before it shows up in any published county number, because Buckler's on-the-record read says growers are already moving ahead of the data.

None of this is instructions. It's a map of exactly which questions are worth asking before the next planting decision, instead of after.

## Related Research

The structured fields below this narrative — what got us asking this, who we'd like to talk to, what we still need, and our sources — carry the parts of this investigation that update independently of the write-up above.
