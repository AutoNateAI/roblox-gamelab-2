# Farm Credit SEMO's Crop Loan Stress Is Rising. What Is Driving It?

## Short Answer

Farm Credit Southeast Missouri's own numbers moved more this year than most quarterly reports ever admit to: adversely classified loans went from 4.7% of the portfolio at year-end 2025 to 6.3% in March to 7.3% by June — a real, quarter-by-quarter escalation, not a single bad print. The association's own management said why, in plain language, in the filings themselves: "continued adverse economic conditions within the crop sector," and — more specifically, in the March filing — the Iran conflict's energy and fertilizer volatility pushing some producers to reconsider corn and cotton acres in favor of soybeans. Pull the five-year picture and this year isn't even the start of the story: net income had already been sliding every year since 2021 before a single loan got reclassified in 2026. What public data still can't do is tell you which commodity, which county, or which specific cost is doing the most damage — that's not evasion, that's just what's actually disclosed right now. Status: **investigating**.

![A lender sits calmly at his desk with a forced smile while a wall chart behind him shows adversely classified loans rocketing from 4.7% to 7.3% with cartoon flames bursting from the edges](/assets/meme/farm-credit-semo-crop-credit-stress-2026-01.jpg)

## Why This Lender's Numbers Mean Something Different Than a Bank's

Before you can read "adversely classified loans up 55% in six months" correctly, it helps to know what kind of institution is reporting it. Farm Credit Southeast Missouri isn't a regional bank branch — it's a cooperative, part of a system Congress built on purpose. On July 17, 1916, President Wilson signed the Federal Farm Loan Act specifically because rural lenders kept avoiding agricultural loans as too risky, leaving farmers without credit at reasonable terms. The fix Congress landed on was a network of borrower-owned lending cooperatives: part of every farmer's loan bought stock in the association, making that farmer a part-owner of the institution lending to them. ([Farm Credit Administration — History of FCA](https://www.fca.gov/about/history-of-fca)) That structure is still exactly how Farm Credit SEMO runs today — which is why its board is stocked with actual producers, why it's paid out over $138.3 million in cash patronage to its member-owners over the past 32 years, why it just authorized a record $9.1 million patronage refund for 2025 even as its own earnings weakened, and why "credit quality declined" here isn't a story about a distant lender tightening the screws. It's a story about the lending cooperative's own farmer-owners collectively showing more stress than they were a year ago — while the cooperative keeps distributing more back to them anyway, not less.

![A farmer proudly holds an oversized novelty check for a $9.1 million patronage refund with confetti falling, while a small inset chart floating behind her shows a sad downward-trending earnings line](/assets/meme/farm-credit-semo-crop-credit-stress-2026-02.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "cost", "label": "Input Costs\n(fuel + fertilizer + Iran-conflict volatility)", "rank": 0, "detail": "USDA ERS forecasts 2026 fuel/oil expenses up 28.8% and fertilizer/lime/soil-conditioner expenses up 15.3% nationally. Farm Credit SEMO's own March 2026 filing adds a specific driver: Iran-conflict energy/fertilizer volatility pushing some producers to shift corn/cotton acres toward soybeans." },
    { "id": "gov", "label": "Direct Gov't Payments\n$47.4B, +69.8% YoY", "rank": 0, "detail": "USDA ERS forecasts $47.4B in 2026 direct government farm payments — a 69.8% increase over 2025's $27.9B, one of the largest year-over-year jumps in the forecast's history." },
    { "id": "land", "label": "Farmland Value Growth\n0.6% in 2025, was 15.4% in 2023", "rank": 0, "detail": "Farm Credit SEMO's own disclosure: average 2025 benchmark farmland value rose just 0.6%, down sharply from 4.3% in 2024 and 15.4% in 2023 — the collateral cushion that normally absorbs a bad year is thinning." },
    { "id": "margin", "label": "Producer Cash Margin\n& Collateral Cushion", "rank": 1, "detail": "Not separately disclosed anywhere — this is the node where the three verified inputs (cost, government support, collateral growth) combine into an estimate of what's actually left for a producer to service debt with." },
    { "id": "repay", "label": "Repayment Capacity", "rank": 2, "detail": "Estimated, not measured: whether cash margin actually translates into on-time debt service depends on things public data doesn't show, like existing debt load and off-farm income." },
    { "id": "class", "label": "Adversely Classified\nLoans", "rank": 3, "output": true, "baseline": 4.7, "format": "percent", "driverInput": "cost", "driverGain": 0.026, "detail": "Farm Credit Southeast Missouri's own disclosed adversely classified loan percentage: 4.7% (12/31/25) → 6.3% (3/31/26) → 7.3% (6/30/26). The slider above shows an illustrative extrapolation anchored to this real number, not a prediction." }
  ],
  "edges": [
    { "from": "cost", "to": "margin", "evidence": "verified", "label": "ERS: fuel +28.8%, fertilizer +15.3%" },
    { "from": "gov", "to": "margin", "evidence": "verified", "label": "ERS: $47.4B direct payments" },
    { "from": "land", "to": "margin", "evidence": "verified", "label": "FC SEMO: collateral cushion thinning" },
    { "from": "margin", "to": "repay", "evidence": "estimated", "label": "Cash margin funds debt service" },
    { "from": "repay", "to": "class", "evidence": "hypothesis", "label": "Commodity-level causation not yet provable" }
  ],
  "inputs": [
    { "id": "cost", "label": "Cost/margin pressure, indexed to the disclosed Dec'25→Jun'26 move", "min": 0, "max": 150, "step": 5, "default": 100, "unit": "", "verifiedAt": 100, "verifiedNote": "100 = the actual six-month move Farm Credit SEMO disclosed" }
  ],
  "sourceLabel": "Farm Credit SEMO Q1/Q2 2026 Stockholder Reports; USDA ERS Sep 3 2026 forecast. The slider is a linear extrapolation anchored to two real disclosed numbers (4.7% → 7.3%), not a fitted or predictive model — push it past 100 and the estimate is explicitly flagged as extrapolation. Every edge is labeled by evidence class; only the cost/margin edge actually drives the output node's live number."
}
```

Drag the slider and watch the last box move — but read the fine print on it honestly. That number is a straight line drawn between two real, disclosed points (4.7% in December, 7.3% in June), not a model anyone fit to data. What the diagram *does* show accurately is the shape of the argument: three real, disclosed forces (input costs, a large direct-payment injection, and a decelerating collateral cushion) feed into a producer's cash margin, which — this is the honest part — is only an **estimated**, not verified, link to actual repayment capacity, which is only a **hypothesis**, not yet provable from public data, as the specific thing driving a specific lender's classification decisions. Two of five edges are solid for a reason; the third is dashed for the same reason.

## The Policy Signal That's Supposed to Be Helping — and the War That Wasn't in Anyone's Forecast

USDA's Economic Research Service forecasts $47.4 billion in direct government farm payments for 2026 — a 69.8% jump from 2025's $27.9 billion, one of the largest year-over-year increases in the forecast's history. ([USDA ERS — Farm Sector Income Forecast, updated Sep 3 2026](https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast)) That's real, and it shows up on the ground: the Federal Reserve's own Eighth District survey — the correct district for Southeast Missouri, more on that below — reports a Mississippi farm-equipment supplier saying sentiment has improved specifically because of "higher crop prices and additional government support." So the policy lever is working, in the sense that real money is reaching real producers.

![A frazzled farmer caught in a tug-of-war, one hand receiving a giant check labeled $47.4B Direct Payments, the other hand grabbing a huge overflowing invoice labeled Fuel + Fertilizer: Iran Conflict Surcharge](/assets/meme/farm-credit-semo-crop-credit-stress-2026-03.jpg)

It's just landing in the same season as something nobody's 2026 farm budget had a line item for. Farm Credit SEMO's own March 2026 filing says it plainly: "The war with Iran has created upward volatility in energy and fertilizer markets that will likely offset any anticipated higher gross income and have a direct impact on 2026 crop margins. Many producers are reassessing their plans for the year and may be looking to shift some of their intended higher input cost crops, such as corn and cotton, over to soybean acres instead." ([Farm Credit Southeast Missouri — Q1 2026 Stockholder Report](https://farmcreditsemo.com/sites/default/files/2026-05/Q1_2026_SH_Report.pdf)) That's a lender naming a geopolitical shock, in writing, as a reason its own borrowers are reconsidering what to plant — a genuinely different, and more current, mechanism than the rice-versus-soybean policy tension the Bootheel pivot investigation on this site already tracks. Read together: one federal lever is pushing liquidity in, a foreign war is pushing costs up in a way that specifically favors soybeans over corn and cotton, and Farm Credit SEMO's own portfolio is the first place all of that nets out into a number.

## The Numbers So Far

```chart
{
  "type": "line",
  "title": "Farm Credit SEMO's credit-quality trend, quarter by quarter in 2026",
  "labels": ["12/31/25", "3/31/26", "6/30/26"],
  "series": [
    { "name": "Adversely classified (%)", "data": [4.7, 6.3, 7.3], "color": "#e07856" },
    { "name": "Nonperforming (%)", "data": [1.3, 2.3, 2.3], "color": "#c9302c" },
    { "name": "Total delinquencies (%)", "data": [0.9, 1.7, 2.3] }
  ],
  "sourceLabel": "Farm Credit Southeast Missouri, Q1 2026 and Q2 2026 Stockholder Reports (period ends shown). Every point is a disclosed figure from the association's own filings, not an interpolation — three consecutive quarters, all moving the same direction."
}
```

```chart
{
  "type": "line",
  "title": "The stress predates 2026 — five years of declining earnings power",
  "labels": ["2021", "2022", "2023", "2024", "2025"],
  "series": [
    { "name": "Return on average assets (%)", "data": [2.3, 2.1, 2.1, 1.9, 1.1], "color": "#f2b134" },
    { "name": "Return on average members' equity (%)", "data": [11.2, 10.3, 10.0, 8.9, 5.1] }
  ],
  "sourceLabel": "Farm Credit Southeast Missouri, 2025 Annual Report — Consolidated Five-Year Summary of Selected Financial Data. Net income itself fell from $20.2M (2021) to $11.3M (2025), and the loan-loss provision jumped from a net recovery in 2022-2023 to $4.2M in 2025 — the credit stress visible in 2026's classification numbers was building for years before it became a headline ratio."
}
```

```chart
{
  "type": "bar",
  "title": "National cost pressure vs. the liquidity offsetting it, 2026 forecast",
  "labels": ["Fuel/oil expenses", "Fertilizer/lime/soil-conditioner", "Real net farm income", "Direct government payments"],
  "series": [{ "name": "YoY % change, 2026 vs 2025", "data": [28.8, 15.3, -5.5, 69.8], "color": "#f2b134" }],
  "sourceLabel": "USDA ERS Farm Sector Income Forecast, updated Sep 3 2026 — national figures, not Southeast Missouri-specific. Shown together to illustrate the scale of the offsetting forces, not a single trend."
}
```

Read together, these three charts are the actual case: the credit deterioration is a real, multi-quarter, disclosed trend sitting on top of a five-year earnings decline that already had this cooperative's return on equity cut in less than half before 2026 even started. The national cost/liquidity numbers plausibly explain the *direction* of it. None of that proves which crop or which county is driving it — that's the gap the next phase of this investigation still has to close.

## Where This Is Happening

```map
{
  "title": "Farm Credit SEMO's territory and the freight backbone it depends on",
  "zoom": 8,
  "markers": [
    { "lat": 36.8834, "lng": -89.5878, "label": "Sikeston, MO — Farm Credit Southeast Missouri headquarters" },
    { "lat": 36.5847, "lng": -89.5259, "label": "New Madrid, MO — Mississippi River port county" },
    { "lat": 36.0362, "lng": -89.4515, "label": "Pemiscot County, MO — Mississippi River port county" },
    { "lat": 37.0509, "lng": -89.4487, "label": "Mississippi County, MO — Mississippi River port county, home to SEMO Port" }
  ],
  "sourceLabel": "Public geographic reference points — Farm Credit SEMO's headquarters city and the three river-port counties MoDOT's Southeast District Freight Plan identifies as the region's Mississippi River terminal points. Not a map of individual farms, loans, or borrowers."
}
```

Every one of these points sits inside the 12-county SEMO territory this lender serves — a region MoDOT's own freight plan describes as running on I-55, I-57, and I-155, BNSF and Union Pacific rail, and river terminals at SEMO Port and the New Madrid, Mississippi, and Pemiscot County ports. ([MoDOT — Southeast District Freight Plan](https://www.modot.org/southeast-district-freight-plan)) Harvest is a physical-flow event before it's a financial one — how fast a crop actually gets off the field and onto one of these routes affects when a producer actually gets paid, which affects repayment timing in ways a quarterly credit-quality number can't distinguish from a genuine income problem.

## What's Actually Happening on the Ground Right Now

The dossier that started this investigation cited a Kansas City Fed survey as a regional comparison point — worth correcting directly, because it's not the right district. Southeast Missouri sits in the Federal Reserve Bank of St. Louis's Eighth District, not Kansas City's Tenth (which covers the western third of the state, around Kansas City itself, plus Kansas, Nebraska, Oklahoma, and Wyoming). Once you pull the actual Eighth District source — the Federal Reserve's Beige Book released September 2, 2026 — the finding gets sharper, not softer: "Agriculture conditions remain stressed but have slightly improved since our previous report." A Mississippi farm-equipment supplier said new-machinery sales are "still weak, but farmer sentiment has improved, driven by higher crop prices and additional government support" — the same liquidity effect the ERS numbers predict. And specifically on rice: an Arkansas rice processor "observed decreased rice demand due to increased imports," while a soy processor in the same district reported "continuous crushing and refining operations fueled by strong demand" — a live, on-the-record echo of the same rice-versus-soybean demand asymmetry the Bootheel rice-to-soybean pivot investigation on this site is tracking from the policy side. The same report's Prices section adds one more forward-looking flag: agriculture contacts "anticipate record-high input costs for 2027," meaning whatever's driving this year's classified-loan increase isn't obviously a one-year event. ([Federal Reserve Beige Book, released Sep 2 2026 — St. Louis / Eighth District](https://www.federalreserve.gov/monetarypolicy/files/BeigeBook_20260902.pdf))

![A personified sad burlap rice sack sits low on one side of a see-saw while a cheerful personified soybean sack sits high on the other, a grain elevator silhouette at golden hour behind them](/assets/meme/farm-credit-semo-crop-credit-stress-2026-04.jpg)

## Methodology

This pass pulled directly from Farm Credit Southeast Missouri's own Q1 2026, Q2 2026, and 2025 Annual Report filings (fetched and read in full, not summarized secondhand), USDA ERS's September 2026 Farm Sector Income Forecast, the Farm Credit Administration's September 10, 2026 systemwide quarterly conditions report, the Federal Reserve's September 2, 2026 Beige Book (St. Louis/Eighth District specifically — the Kansas City/Tenth District source in the originating dossier was geographically mismatched and replaced here), MoDOT's Southeast District Freight Plan, and the Farm Credit Administration's own history page. It does not yet include: Farm Credit SEMO's loan exposure broken out by commodity (rice vs. soybeans vs. corn vs. cotton isn't publicly disclosed anywhere found), county-level 2025-26 crop acreage or yield estimates for the 12-county territory, any elevator or dryer throughput/utilization data, crop-insurance indemnity data by geography, or a single direct conversation with a SEMO grower, loan officer, or elevator manager. Every one of those is a real, named next step, not an afterthought. The slider in the "How This Connects" diagram is a linear extrapolation anchored to two real disclosed numbers, not a fitted statistical model — treat any estimate past its "disclosed value" marker as a scenario, not a forecast.

![A detective in a trench coat with a magnifying glass stands before a corkboard of pinned PDF pages connected by red string, several strings dangling loose into a big question-mark cloud labeled Commodity-Level Data](/assets/meme/farm-credit-semo-crop-credit-stress-2026-05.jpg)

## Moral of the Story

The headline number here — adversely classified loans up more than half in six months, across three consecutive disclosed quarters — is real, not in dispute, and sitting on top of a five-year earnings decline most people watching this sector haven't connected to it yet. What's still a hypothesis is the *why*, at any resolution finer than "the crop sector broadly." A few concrete things that fall out of that:

![A confident man holds up a bold sign reading We Know What Happened with a proud grin, while a second sign strapped to his back, visible in a small mirror beside him, reads Why: TBD in shakier handwriting](/assets/meme/farm-credit-semo-crop-credit-stress-2026-06.jpg)

- **If you're a Farm Credit SEMO borrower**, the association's own capital ratios (total capital ratio 19.2% against an 8% regulatory minimum, members' equity actually *up* as a share of assets over the past five years even as earnings fell) mean this isn't a lender in trouble — it's a cooperative watching its own farmer-owners absorb a margin squeeze. That changes the renewal conversation from "is my lender stable" to "how do I show I'm not the borrower driving the trend."
- **If you're a lender or loan officer anywhere in the region**, the Iran-conflict input-cost shock is worth asking about directly and by name — Farm Credit SEMO's own March filing already flags it as a reason growers are reconsidering corn and cotton for soybeans. That's a more current, more specific question than a generic "how's the crop budget looking."
- **If you grow rice specifically**, the Eighth District's own on-the-record finding — decreased rice demand from increased imports, reported by an actual Arkansas rice processor — is a second, independent signal pointing the same direction as the PLC-vs-RFS tension the Bootheel pivot investigation already surfaced. Two unrelated sources landing on the same conclusion is worth more than either alone.
- **If you're in economic development or policy**, the $47.4 billion direct-payment figure is genuinely large, but it's arriving into a cost environment large enough — and now with a geopolitical shock layered on top of it — to eat a meaningful share of it before it ever reaches a lender's risk classification. A program that looks generous in isolation may still net out as merely stabilizing.

None of this is a commodity-level verdict — that's exactly what the data doesn't support yet. Move the slider above, read the dashed edge, and you're looking at exactly where this investigation stops being able to tell you more.

![A small personified node-and-edge diagram character with a smiling face stands on wobbly dashed-line legs, arms raised in an enthusiastic thumbs-up despite looking unsteady](/assets/meme/farm-credit-semo-crop-credit-stress-2026-07.jpg)

## Related Research

This investigation shares a region, a lender, and half its policy tension with [Congress Just Made Rice More Profitable. So Why Are Bootheel Farmers Planting Less of It?](/research-and-case-studies/bootheel-rice-to-soybean-pivot) — the structured fields below (who we'd like to talk to, what we still need, our sources) carry the parts of this investigation that update independently of the write-up above.
