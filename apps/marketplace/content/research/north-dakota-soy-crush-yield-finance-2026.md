# North Dakota Built the Soybean Crush. Then Yields Fell in the Same Year Acreage Hit a Record. Does the Local-Processing Bet Still Pay?

## Short Answer

Status: **investigating**. Here's what's actually verifiable: North Dakota's 2026 soybean crop is the smallest of the last four years in total bushels (203.7M) and the lowest-yielding (30 bu/acre) — even though growers planted more soybean acres than ever (6.85M). At the same time, the state's only soybean crush plant, Green Bison in Spiritwood, is getting a capacity upgrade, a federal tax-credit rule change just made its main product worth roughly twice as much per gallon, and the state pushed $500M into farm-finance backstops. Those are four real, independently documented facts. What nobody has published is whether they add up to a better year for an actual North Dakota soybean grower than the pre-Green-Bison version of this state would have delivered — the local-basis, procurement-radius, and plant-utilization numbers that would answer that don't exist publicly, and I'm not going to fill them in with a plausible-sounding guess.

![A detective examines a corkboard with four pinned photos of a soybean plant, a factory, a tax form, and a piggy bank, all connected by string to one giant question mark](/assets/meme/north-dakota-soy-crush-yield-finance-2026-01.jpg)

## From Wheat State to Crush State, in One Generation

North Dakota did not always grow soybeans. In 1990 the state had about 500,000 acres of them — a rounding error next to wheat, barley, and sunflowers. By 2000 that had nearly quadrupled to 1.9 million acres, and the expansion kept going: 2026's planted acreage is 6.85 million, roughly 13 times the 1990 total. The shift concentrated in the Red River Valley, where soil and rainfall finally started looking like classic Corn Belt row-crop ground instead of small-grain country. ([Agweek — How a region known for its wheat and grasslands turned toward corn and soybeans](https://www.agweek.com/crops/how-a-region-known-for-its-wheat-and-grasslands-turned-toward-corn-and-soybeans))

![A muscular soybean pod mascot flexes and shoves a shocked wheat stalk mascot off a field while a calendar flips from 1990 to 2026](/assets/meme/north-dakota-soy-crush-yield-finance-2026-02.jpg)

For almost the entire time North Dakota was becoming a serious soybean state, it had nowhere to process the crop. Roughly 95% of North Dakota soybeans left the state whole, by rail, mostly bound for export. That worked fine until it didn't: during the 2018-19 US-China trade war, North Dakota soybean farmers found themselves holding a crop with a shrinking export outlet and no local plant to sell into instead. Green Bison — a $350 million, 150,000-bushel-per-day joint venture between ADM (75%) and Marathon Petroleum (25%) — broke ground specifically to close that exposure, and started receiving soybeans for its first harvest in September 2023. ([North Dakota Monitor / Agweek reporting on Green Bison's opening](https://www.agweek.com/business/crushing-it-north-dakota-ready-to-ride-wave-of-demand-for-soybean-oil-and-meal); [Marathon Petroleum — Green Bison Production Facility begins operations](https://ir.marathonpetroleum.com/investor/news-releases/news-details/2023/ADM-Marathon-Petroleum-Corp.-take-next-step-in-meeting-demand-for-renewable-fuels-as-Green-Bison-Production-Facility-begins-operations-2023-LvBSQ0_bSM/default.aspx))

![A long train of soybean-shaped train cars approaches a border checkpoint gate slamming shut, while a shiny new factory pops up next to the tracks with sparkles](/assets/meme/north-dakota-soy-crush-yield-finance-2026-03.jpg)

So the actual question this article is testing isn't "is local processing good." It's "now that North Dakota has bet real capital on closing its export-dependency gap, does that bet pay off in a year where the crop itself came in smaller and lower-yielding than any of the last three."

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "history", "label": "Whole-Bean Export\nDependency (~95%)", "rank": 0, "detail": "Before Green Bison, roughly 95% of North Dakota's soybean crop left the state whole, by rail, mostly for export — exposed directly to trade-policy shocks like the 2018-19 US-China tariff dispute." },
    { "id": "yield", "label": "2026 Yield Shock\n(30 bu/ac, 4-yr low)", "rank": 0, "detail": "USDA NASS: North Dakota's 2026 soybean yield of 30 bu/acre and 203.7M bu total production are both the lowest of the last four years, despite record 6.85M planted acres." },
    { "id": "greenbison", "label": "Green Bison Crush\n(150,000 bu/day nameplate)", "rank": 1, "detail": "ADM (75%) / Marathon Petroleum (25%) joint venture in Spiritwood, ND — North Dakota's first and only dedicated soybean crush plant, opened for the 2023 harvest. No public data on actual throughput/utilization vs. this nameplate figure." },
    { "id": "canola", "label": "Record Canola Acres\n(2.35M, +30% YoY)", "rank": 1, "detail": "USDA: North Dakota planted a record 2.35 million acres of canola in 2026, up 30% from 2025 — partly driven by the same renewable-fuel demand pulling on soybean oil, competing for the same cropland." },
    { "id": "expansion", "label": "ADM Spiritwood\nOptimization (mid-2028)", "rank": 2, "detail": "ADM's July 30, 2026 announcement: equipment/operational upgrades at 4 US crush plants including Spiritwood, unlocking ~700,000 metric tons (25M+ bushels) of added demand nationally — Spiritwood's share targeted for completion mid-2028, not immediate." },
    { "id": "credit45z", "label": "45Z Credit Rule Change\n(soybean-oil RD value)", "rank": 2, "detail": "IRS/Treasury's 2026 45Z guidance removed a penalty that had suppressed soybean oil's renewable-diesel credit value — the credit for soybean-oil-based renewable diesel roughly doubled to about $0.50/gallon. The credit pays fuel producers like Marathon/Green Bison directly, not farmers." },
    { "id": "bnd", "label": "BND $500M Farm\nStability + Grain Loans", "rank": 2, "detail": "Bank of North Dakota / ND Industrial Commission: $100M added March 2026 to the Farm Financial Stability Loan Program, bringing combined 2026 stability + Grain Inventory Loan support to $500M, at a 3.75% BND-side fixed rate for 5 years — for producers with 2024-25 operating shortfalls." },
    { "id": "benefit", "label": "Realized Grower\nCash Benefit", "rank": 3, "detail": "The thing nobody has published: actual local basis before/after Green Bison, actual plant utilization, and actual farm-level cash-flow effect in a low-yield year. This is the open question the rest of this graph feeds into, not an answer." }
  ],
  "edges": [
    { "from": "history", "to": "greenbison", "evidence": "verified", "label": "Built specifically to reduce export/rail dependency" },
    { "from": "yield", "to": "greenbison", "evidence": "estimated", "label": "Fewer bushels available to feed the same nameplate capacity" },
    { "from": "canola", "to": "yield", "evidence": "hypothesis", "label": "Acreage competition for the same cropland, not yet quantified" },
    { "from": "greenbison", "to": "expansion", "evidence": "verified", "label": "ADM's own July 2026 release" },
    { "from": "credit45z", "to": "greenbison", "evidence": "verified", "label": "Doubles the credit value of Green Bison's core output" },
    { "from": "expansion", "to": "benefit", "evidence": "hypothesis", "label": "More capacity ≠ automatically more grower value" },
    { "from": "credit45z", "to": "benefit", "evidence": "hypothesis", "label": "Credit accrues to the fuel producer, pass-through to growers unmeasured" },
    { "from": "bnd", "to": "benefit", "evidence": "estimated", "label": "State finance backstop, independent of Green Bison's existence" }
  ],
  "sourceLabel": "USDA NASS North Dakota state overview pages (2023-2026); Agweek/North Dakota Monitor Green Bison reporting; ADM July 30, 2026 press release; IRS/Treasury 2026 45Z guidance coverage (American Farm Bureau, farmdoc daily); NDIC/BND March 2026 program announcement. No scenario slider — no clean two-point anchor for a realized grower-benefit driverGain exists in public data yet. Drag nodes, tap for sources."
}
```

## The Two Federal-and-State Levers Pointing the Same Direction (For Once) — and the One Still Missing

Most of these articles find a policy tension. This one mostly doesn't — which is itself worth noting. The 2026 revision to the Section 45Z Clean Fuel Production Credit removed an indirect-land-use-change penalty that had been suppressing soybean oil's value as a renewable-diesel feedstock; the practical effect is that generic soybean oil's renewable-diesel credit value roughly doubled, from about $0.21 to about $0.50 per gallon. That credit is paid to the fuel producer — Marathon/Green Bison, in this case — not to the farmer who grew the bean. Separately, North Dakota's own Bank of North Dakota expanded its Farm Financial Stability and Grain Inventory loan programs to a combined $500 million in March 2026, specifically for producers who had an operating shortfall in 2024 or 2025, at a fixed 3.75% rate on BND's share. Both levers point toward "make it easier to keep growing and selling soybeans in North Dakota in a stressed year." ([American Farm Bureau — 45Z Clean Fuel Production Credit](https://www.fb.org/market-intel/45z-clean-fuel-production-credit); [North Dakota Industrial Commission — $100M additional loan funding announcement](https://www.ndic.nd.gov/news/ndic-announces-100m-additional-loan-funding-bnd-2026-farm-financial-stability-program))

![A cheerful refinery worker celebrates a fuel barrel doubling from $0.21 to $0.50 with confetti while a confused farmer looks at her unchanged wallet](/assets/meme/north-dakota-soy-crush-yield-finance-2026-04.jpg)

What's missing is the connective tissue between them. A bigger federal credit for Green Bison's soybean oil doesn't automatically become a better cash basis for the grower delivering beans to that plant — that depends on whether Green Bison's procurement pricing actually passes any of that credit value upstream, which is a negotiated, plant-specific number nobody publishes. And the BND loan programs help a stressed producer regardless of whether Green Bison exists at all — they're a general farm-finance backstop, not a Green-Bison-specific one. Both are real. Neither one, by itself, answers whether the local-crush bet specifically is what's cushioning a North Dakota grower in 2026, versus just "North Dakota agriculture has more support this year than it otherwise would."

![Two jigsaw puzzle pieces labeled with a fuel icon and a bank icon float on opposite sides of a canyon gap with a signpost reading GROWER BASIS](/assets/meme/north-dakota-soy-crush-yield-finance-2026-05.jpg)

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "North Dakota soybean production, 2023-2026",
  "labels": ["2023", "2024", "2025", "2026"],
  "series": [
    { "name": "Yield (bu/acre)", "data": [35.5, 37.5, 34.5, 30.0], "color": "#f2b134" }
  ],
  "sourceLabel": "USDA NASS North Dakota state agriculture overview, each respective year. 2026 is a preliminary in-season figure, not a final annual summary. Planted acreage rose every year in this window (6.2M → 6.6M → 6.55M → 6.85M) even as 2026's yield fell to the four-year low — more acres, smaller average bushel-per-acre result."
}
```

That's the actual shape of the "stressed year" the dossier's question is testing against: not a collapse, but the lowest yield of a four-year run happening in the same season as the most acres ever planted — total production (203.7M bu) still comes in below all three prior years (218.7M, 245.6M, 223.9M) despite the extra acres.

```chart
{
  "type": "bar",
  "title": "Green Bison nameplate capacity vs. North Dakota's 2026 crop",
  "labels": ["Green Bison annual capacity (150k bu/day × ~330 days)", "2026 ND soybean production"],
  "series": [
    { "name": "Million bushels", "data": [49.5, 203.7], "color": "#7fbf7f" }
  ],
  "sourceLabel": "Green Bison nameplate capacity (Marathon Petroleum, ADM public materials) annualized at an illustrative ~330 operating days — actual annual throughput/utilization is not publicly disclosed, so this is nameplate math, not a measured figure. Shown for scale only: even at full nameplate operation, Green Bison alone could absorb roughly a quarter of North Dakota's 2026 soybean crop, which is why ADM's own July 2026 release frames Spiritwood's optimization as adding to, not replacing, the state's export/rail outlet."
}
```

## Where This Is Happening

```map
{
  "title": "North Dakota's soybean-crush and finance geography",
  "center": [46.9, -98.5],
  "zoom": 6,
  "markers": [
    { "lat": 46.8083, "lng": -98.5178, "label": "Spiritwood, ND — Green Bison Soy Processing (ADM/Marathon Petroleum joint venture)" },
    { "lat": 46.8772, "lng": -96.7898, "label": "Fargo / Red River Valley, ND — historic epicenter of North Dakota's 1990s–2000s soybean-acreage expansion" },
    { "lat": 46.8083, "lng": -100.7837, "label": "Bismarck, ND — Bank of North Dakota / ND Industrial Commission, source of the 2026 $500M farm-finance programs" },
    { "lat": 46.9, "lng": -98.7, "label": "Jamestown, ND — nearest city to Spiritwood, in Green Bison's likely soybean procurement radius" }
  ],
  "sourceLabel": "Facility and institutional locations only — Green Bison's actual soybean procurement radius (which counties, what distance) is not publicly disclosed, so no supply-shed boundary is drawn here."
}
```

## What NDSU's Own Extension Office Is Actually Telling Growers Right Now

This is the closest thing to a ground-truth data point this pass found, and it cuts against reading Green Bison and the 45Z credit as the headline story for an actual North Dakota grower's 2026 bottom line. NDSU Extension's own February 2026 crop budget release led with a blunt diagnosis from farm management specialist Ron Haugen: "Inputs and ownership costs are flat to somewhat higher, but lower commodity prices are the main contributor to the lower profitability. It's a revenue problem." That's a state Extension office naming price, not processing capacity or tax credits, as the thing actually squeezing growers this year. ([NDSU Extension and Ag Research News — Crop budget projections show low returns for 2026](https://www.ag.ndsu.edu/news/newsreleases/2026/february/ndsu-crop-budget-projections-show-low-returns-for-2026))

![A doctor presses a stethoscope against a sad deflated wallet on an exam table, a clipboard checklist circling commodity prices in red](/assets/meme/north-dakota-soy-crush-yield-finance-2026-06.jpg)

That doesn't mean Green Bison and the 45Z credit are irrelevant — it means they're operating on a different part of the system (basis, demand, and processor economics) than the part NDSU is flagging as the acute 2026 pain point (price). Whether a stronger local basis is actually offsetting some of that price pain is exactly the unmeasured question this article keeps running into.

## Methodology

This pass combined USDA NASS's North Dakota state agriculture overview pages for 2023 through 2026, ADM's and Marathon Petroleum's own Green Bison facility disclosures and July 2026 expansion announcement, North Dakota Industrial Commission / Bank of North Dakota program announcements, USDA's 2026 canola acreage reporting, American Farm Bureau and farmdoc daily coverage of the 2026 Section 45Z guidance, and NDSU Extension's own February 2026 crop budget release. It explicitly did not do: obtain Green Bison's actual annual throughput or utilization rate (only nameplate capacity is public), pull a historical local soybean basis series for the Spiritwood/Jamestown area before and after 2023, determine Green Bison's real procurement radius, or interview a North Dakota Soybean Council representative, an ADM/Green Bison operator, a Bank of North Dakota loan officer, or a producer directly. Those are exactly the inputs the "North Dakota Crush + Finance Resilience Graph" described in this investigation's artifacts would need to move from a structural comparison to a real answer.

![A researcher with a halo hovers next to a giant clipboard titled WHAT WE DIDN'T DO with a long list of glowing red unchecked boxes](/assets/meme/north-dakota-soy-crush-yield-finance-2026-07.jpg)

## Moral of the Story

**If you're a North Dakota soybean grower:** the loudest 2026 signals (a tax-credit rule change, a plant expansion announcement, a $500M state finance program) are all real, but none of them is a substitute for knowing your own local cash basis this fall versus the last few years. That's the one number that would actually tell you whether the local-crush bet is showing up in your price, and it's worth asking your elevator directly rather than assuming a national headline answers it for you.

![A determined grower bangs on a giant grain elevator price board with a wrench while the flip-numbers spin in confusion](/assets/meme/north-dakota-soy-crush-yield-finance-2026-08.jpg)

**If you're a lender (Bank of North Dakota or a local ag lender):** the Farm Financial Stability and Grain Inventory programs exist because NDSU's own Extension office is calling this a revenue problem, not an input-cost or processing-capacity problem — worth confirming a borrower's stress is actually price-driven before assuming a local-basis story explains it away.

![A rusty steel filing cabinet drawer labeled LOCAL BASIS DATA is wrapped in chains and a padlock, a tiny key dangling just out of reach](/assets/meme/north-dakota-soy-crush-yield-finance-2026-09.jpg)

**If you're North Dakota Soybean Council, Northern Canola Growers, or ADM/Green Bison:** the single most useful public dataset that doesn't exist yet is a local basis series for the Spiritwood/Jamestown corridor spanning before and after 2023 — that's the one number that would let anyone outside the plant's own books actually test whether local crush capacity changed grower economics, instead of just changing where the trucks go.

## Related Research

This connects to the same "does the announced fix actually reach the grower" question running through today's other two flagship pieces — [the Bootheel's irrigation-economics decision](/research-and-case-studies/bootheel-irrigation-groundwater-energy-economics-2026) and [Central Valley dairy's compliance-capital gap](/research-and-case-studies/central-valley-dairy-nitrogen-compliance-capital-2026) — all three are the same underlying pattern: a real structural event or investment, and an unmeasured question about who actually captures the value or bears the cost at the farm level.
