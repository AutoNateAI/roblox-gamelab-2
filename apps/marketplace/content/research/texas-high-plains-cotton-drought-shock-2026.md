# Texas High Plains Cotton Yield Is Forecast Down 15.8%. Who Absorbs the Drought Shock?

## Short Answer

USDA's September WASDE puts Texas's 2026 cotton yield 15.8% below last year — nearly double the 9.0% national decline — and names High Plains drought as the main driver. That's a real, verified, state-level number. What it can't tell you is who actually eats that loss: a dryland grower who watched a field get declared a total failure and a grower on a center-pivot who spent real money pumping the Ogallala Aquifer harder to keep a crop alive are both counted in the same statewide average, but they're living through completely different years. Ninety-three percent of Texas is in some stage of drought right now, and roughly 10% of the state's 3.7 million reported dryland crop acres had already been declared failed as of September 11. What I don't have yet — because it isn't public at this resolution — is which of the Texas High Plains' 42 cotton counties are absorbing the worst of it, and how that maps onto gin throughput, cooperative marketing volume, and lender risk. Status: **investigating**.

![A cracked, sun-baked dryland cotton field on one side of a straight irrigation-pivot track and a lush green irrigated cotton field on the other side, a small thermometer icon reading 100°+ floating above both](/assets/meme/texas-high-plains-cotton-drought-shock-2026-01.jpg)

## Why Cotton Runs on Water Nobody Can See

The Texas High Plains wasn't always cotton country. For most of the 20th century's first half, this was semi-arid rangeland — until farmers discovered they were sitting on top of the Ogallala Aquifer, a massive underground water reserve stretching across eight states, and center-pivot and furrow irrigation turned dry range into the largest contiguous cotton-growing region in the country. By 2021, eight of the nation's top ten cotton-producing counties sat inside this same footprint, and Lynn County alone produced 425,200 bales. ([Plains Cotton Growers — Who We Are](https://www.plainscotton.org/who-we-are/)) Plains Cotton Growers, the 42-county producer organization serving this region, was itself founded in 1956 — organized around exactly this irrigation-fed boom. Today the High Plains Underground Water Conservation District, created in 1951 as the first groundwater district in Texas, oversees 15 of those counties: roughly 2 million irrigated acres draw on the Ogallala, and about 95% of the water pumped from it goes to irrigated agriculture. ([Texas State Historical Association — High Plains Underground Water Conservation District](https://www.tshaonline.org/handbook/entries/high-plains-underground-water-conservation-district)) The entire regional cotton economy — the gins, the co-op warehouses, the 42-county association itself — exists because of water that took thousands of years to accumulate underground and doesn't refill at anywhere near the rate it's being pumped out.

![A cartoon cutaway cross-section of the ground showing a massive ancient underground lake labeled OGALLALA (10,000+ years old) with a thin modern-day straw labeled 2026 PUMPING drawing from it much faster than a tiny drip labeled NATURAL RECHARGE refills it](/assets/meme/texas-high-plains-cotton-drought-shock-2026-02.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "drought", "label": "2026 High Plains Drought\n93% of Texas in some drought", "rank": 0, "detail": "Texas A&M AgriLife, Sept 15 2026: 93% of the state had reached at least early drought stages, more than 35% in severe drought or worse — an 8-point jump in one week and 25 points above the same week last year." },
    { "id": "aquifer", "label": "Ogallala Aquifer /\nHPWD Conservation Mandate", "rank": 0, "detail": "The High Plains Water District's founding mission is to conserve the Ogallala for the long run — but aquifer withdrawals already exceed natural recharge region-wide, and a drought year raises the short-run pressure to pump harder against that same mandate." },
    { "id": "yield", "label": "Texas Cotton Yield\nForecast -15.8% YoY", "rank": 1, "detail": "USDA's September 2026 WASDE, as analyzed by Texas A&M's AFPC: Texas yield forecast 15.8% below 2025, nearly double the 9.0% national decline, with High Plains drought named as the primary driver." },
    { "id": "dryland", "label": "Dryland Abandonment\n~10% of 3.7M TX acres failed", "rank": 2, "detail": "USDA FSA acreage report, as of Sept 11 2026: roughly 10% of Texas's 3.7 million reported dryland crop acres had already been declared failed." },
    { "id": "irrigated", "label": "Irrigated Fields\nPumped harder to survive heat", "rank": 2, "detail": "AgriLife Extension reporting: daily water demand as high as half an inch per day during 100°+ stretches — irrigated fields saw sharply reduced yields even where they avoided outright failure." },
    { "id": "gins", "label": "Gins & Co-ops\n42-county PCG/PCCA throughput", "rank": 3, "detail": "Plains Cotton Growers (42 counties, ~66% of Texas cotton) and Plains Cotton Cooperative Association (farmer-owned, warehouses across TX/OK/KS) both depend on harvested volume actually reaching the gin — neither publishes a 2026 county-level throughput figure yet." },
    { "id": "fsa", "label": "USDA FSA Disaster\nDesignation, Sept 14 2026", "rank": 4, "detail": "Three Texas counties designated primary natural disaster areas under fast-track criteria (D2-Severe for 8+ consecutive weeks, or D3/D4), with additional contiguous counties made eligible for emergency FSA credit." }
  ],
  "edges": [
    { "from": "drought", "to": "yield", "evidence": "verified", "label": "Texas A&M AFPC analysis of USDA's Sept 2026 WASDE" },
    { "from": "drought", "to": "dryland", "evidence": "verified", "label": "USDA FSA acreage report via AgriLife, Sept 11 2026" },
    { "from": "drought", "to": "irrigated", "evidence": "verified", "label": "AgriLife Extension county reporting" },
    { "from": "drought", "to": "fsa", "evidence": "verified", "label": "FSA's own drought-intensity criteria trigger the designation directly" },
    { "from": "aquifer", "to": "irrigated", "evidence": "hypothesis", "label": "A real structural tension (conservation mandate vs. drought-year pumping pressure), not a specific verified 2026 HPWD action" },
    { "from": "dryland", "to": "gins", "evidence": "estimated", "label": "Lower harvested dryland volume plausibly reduces gin/warehouse throughput; no 2026 gin-level figure published yet" },
    { "from": "irrigated", "to": "gins", "evidence": "estimated", "label": "Reduced irrigated yields also lower per-acre volume reaching the gin, even without outright failure" }
  ],
  "sourceLabel": "Texas A&M AFPC/AgriLife (Sept 2026 WASDE analysis and drought reporting); USDA FSA (Sept 14 2026 disaster designation); Texas State Historical Association and Plains Cotton Growers (HPWD/PCG history and territory). Every edge is labeled by evidence class — two of seven are estimated or hypothesis, not measured fact."
}
```

Look at where the solid lines stop. Drought verifiably drives the state yield number, the dryland failure number, the irrigated-stress reporting, and the federal disaster designation — four separate, independently-sourced confirmations of the same underlying shock. What isn't yet verified is the next link in the chain: how much of that shock actually reaches a gin's throughput, a cooperative's marketing volume, or a lender's risk file. That's the gap this investigation exists to close.

## The Water District Whose Job Is to Slow Down the Thing Everyone Needs Right Now

Here's the tension that doesn't get said out loud often enough: the High Plains Underground Water Conservation District's entire reason for existing is to make the Ogallala last longer than it otherwise would — and a severe drought year is exactly when the short-run incentive to ignore that runs hardest against the long-run mandate to honor it. A grower staring at a cotton crop wilting under 100°+ heat and half-an-inch-a-day water demand isn't thinking about 2050 aquifer levels; they're thinking about this year's revenue. HPWD doesn't set a simple do-this-or-else rule that resolves that tension — it manages permits, spacing rules, and voluntary conservation programs (including a cloud-seeding effort aimed at boosting recharge) across a district whose own founding purpose is explicitly to slow a depletion trend that's been running since before most of today's growers started farming. ([Texas State Historical Association](https://www.tshaonline.org/handbook/entries/high-plains-underground-water-conservation-district)) That's not a contradiction anyone's hiding — it's the actual, structural hard part of managing a shared resource that doesn't refill on a human timescale, showing up hardest in exactly the years when growers need it most.

![A stressed cotton plant character sits on a therapist's couch talking to a water-drop-shaped therapist, a speech bubble from the plant reading I Just Need One More Inch, a wall calendar behind showing next year circled far in the future](/assets/meme/texas-high-plains-cotton-drought-shock-2026-03.jpg)

Meanwhile, the more immediate federal lever actually moved on September 14, 2026: USDA designated three Texas counties as primary natural disaster areas, triggering fast-track eligibility for FSA emergency loans, with additional contiguous counties made eligible for the same relief. ([USDA Farm Service Agency, Sept 14 2026](https://www.fsa.usda.gov/news-events/news/09-14-2026/usda-designates-three-texas-counties-natural-disaster-areas)) That's real, current, actionable relief — but it's a credit lifeline, not a water solution. A grower can borrow their way through one bad year; nothing in that designation touches the aquifer math underneath it.

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Texas cotton yield fell nearly twice as fast as the national average",
  "labels": ["National upland cotton yield", "Texas cotton yield"],
  "series": [{ "name": "YoY % change, 2026 vs 2025", "data": [-9.0, -15.8], "color": "#e07856" }],
  "sourceLabel": "USDA September 2026 WASDE, as reported via Texas A&M AFPC analysis. National figure reflects USDA's forecast of 766 lb/acre; Texas-specific figure is the state forecast, with High Plains drought named as the primary driver of both the state and national decline."
}
```

```chart
{
  "type": "bar",
  "title": "Two drought metrics, not directly comparable — shown together only for scale",
  "labels": ["Texas land area in some stage of drought", "Reported TX dryland crop acres declared failed"],
  "series": [{ "name": "Percent", "data": [93, 10], "color": "#f2b134" }],
  "sourceLabel": "Texas A&M AgriLife Extension (Sept 15 2026, Texas Drought Monitor) and USDA FSA acreage report as of Sept 11 2026. These are different denominators — total state land area vs. reported dryland crop acreage — and are not a before/after or cause/effect pair; shown side by side only to illustrate that drought coverage is far broader than the crop-failure rate so far."
}
```

Both numbers are real and both are limited in the same way: they're state-level. Neither tells you whether Hockley County — one of the counties USDA's September designation made newly eligible for emergency FSA credit, and squarely inside Plains Cotton Growers' 42-county territory — lost 5% of its cotton or 50% of it. That county-level resolution is exactly what this investigation still needs.

## Where This Is Happening

```map
{
  "title": "Where the High Plains cotton system is centered",
  "zoom": 8,
  "markers": [
    { "lat": 33.5779, "lng": -101.8552, "label": "Lubbock, TX — Plains Cotton Growers, Plains Cotton Cooperative Association, and Texas Tech FBRI headquarters" },
    { "lat": 33.5842, "lng": -102.3700, "label": "Levelland, TX (Hockley County) — a county made newly eligible for FSA emergency drought credit, Sept 2026" }
  ],
  "sourceLabel": "Public headquarters and county-seat locations, not a boundary of the drought's actual extent — the affected footprint spans PCG's full 42-county territory, not just these two points."
}
```

Lubbock sits at the institutional center of this system — the growers' association, the marketing cooperative, and the university fiber-research institute are all headquartered within a few miles of each other — while the actual drought damage is distributed across 42 surrounding counties at wildly different severities that this article can't yet resolve county by county.

![A researcher character stands in front of a giant blank county-outline map of the Texas High Plains holding a single red pushpin, visibly unsure where to place it, a thought bubble reading 42 Counties, 1 Pin](/assets/meme/texas-high-plains-cotton-drought-shock-2026-04.jpg)

## What's Actually Happening on the Ground Right Now

Texas A&M AgriLife's own county reporting gives one specific, human-scale data point worth sitting with: extension agronomist Kevin Heflin, describing this year's High Plains stretch, said "daily water demand has been as high as half an inch per day during 100-plus degree stretches" — a rate that leaves, in his words, little hope for drought-stressed summer forage crops. ([Texas A&M AgriLife Today, Sept 15 2026](https://agrilifetoday.tamu.edu/2026/09/15/tough-year-for-texas-summer-crops-due-to-drought-extreme-temperatures/)) Half an inch of water a day, every day, through a heat stretch, is not a number a center-pivot system built for a normal year was necessarily sized to deliver sustainably — which is exactly the kind of on-the-ground detail a statewide yield percentage can't carry on its own.

## Methodology

This pass relied on Texas A&M AFPC's analysis of USDA's September 2026 WASDE (via reporting, since AFPC's own site wasn't directly pulled this round), Texas A&M AgriLife Today's September 15, 2026 drought reporting, USDA's Farm Service Agency September 14, 2026 disaster designation announcement, Plains Cotton Growers' and Plains Cotton Cooperative Association's own "who we are" pages, the Texas State Historical Association's history of the High Plains Underground Water Conservation District, and Texas Tech's Fiber and Biopolymer Research Institute's public pages. It does not include: county-level 2026 failed-acreage or harvested-yield data for any of Plains Cotton Growers' 42 counties, gin-level throughput or utilization figures, crop-insurance indemnity data, HPWD's own 2026 permitting or pumping data, or a single direct conversation with a High Plains grower, gin manager, PCG/PCCA staff member, or HPWD official. The full list of counties covered by the September 14 FSA designation and its contiguous-eligibility list wasn't fully confirmed against a primary source this pass — worth a direct pull from FSA's Texas state office before this investigation goes further.

![A grain-and-cotton version of a weather map with swirling drought icons over a Texas High Plains outline, a tiny cartoon meteorologist character shrugging at a blank county-data table below the map](/assets/meme/texas-high-plains-cotton-drought-shock-2026-05.jpg)

## Moral of the Story

The state number is real, and it's worse than the national one — that much is settled. What isn't settled yet is where, specifically, in the 42-county High Plains footprint the loss is landing hardest, and that gap matters differently depending on who's reading this:

- **If you're a High Plains cotton grower**, the FSA's September 14 disaster designation and its contiguous-county eligibility list is worth checking directly and by name for your county — fast-track emergency credit access is exactly the kind of relief that's easy to miss if you're not watching for it.
- **If you're a gin manager or PCCA member**, this is the year to actually track and report your own throughput numbers somewhere public or semi-public — right now, nobody outside your own operation can see whether your county is a 5% year or a 50% year, and that data gap is exactly what turns a real regional story into a vague statewide one.
- **If you're a lender financing High Plains cotton operations**, "state yield down 15.8%" is not a county-level underwriting number — ask growers directly whether they were dryland or irrigated this year, and whether they fall inside the newly-designated disaster counties.
- **If you're thinking about water policy**, this year is a live example of the exact tension HPWD was built to manage: short-run survival pressure against a long-run resource that doesn't forgive overdraft. That tension isn't going away because one drought year ends.

None of that is a conclusion this investigation can hand you yet — it's the map of exactly where the next round of research needs to go.

![A single cotton boll character wearing a tiny life jacket floats in a shrinking puddle on a cracked field, giving a determined thumbs-up despite the situation, a small sign nearby reading Status: Investigating](/assets/meme/texas-high-plains-cotton-drought-shock-2026-06.jpg)

## Related Research

This investigation sits alongside [The High Plains Got One Wet Year. Did It Actually Buy Farmers Time?](/research-and-case-studies/central-great-plains-water-energy-irrigation-resilience-2026) in tracking the same Ogallala-dependent water system from a different angle and a different year's conditions — the structured fields below (who we'd like to talk to, what we still need, our sources) carry the parts of this investigation that update independently of the write-up above.
