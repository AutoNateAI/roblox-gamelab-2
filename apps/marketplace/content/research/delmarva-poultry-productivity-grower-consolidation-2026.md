# Delmarva Produces 40% More Chicken With 37% Fewer Growers Than 20 Years Ago. Who Captures the Productivity Gain?

## Short Answer

The Delmarva Chicken Association's own numbers say it plainly: the peninsula raised 628 million chickens and produced 4.7 billion pounds of chicken in 2025, up 40.5% from 20 years ago — while the number of contract growers fell 36.8% to 1,225 and the number of chicken houses fell 11.3% over the same stretch. Grower contract income, as a total pool, rose 27.4% in inflation-adjusted terms across those same 20 years. Put those two disclosed numbers next to each other and something interesting falls out: if you divide today's contract-income pool by today's much smaller grower count, the implied average per-grower share has roughly doubled in real terms since 2005 — a genuinely striking number, and one DCA doesn't publish directly, so treat it as a calculation, not an official finding. What the public data can't yet tell you is where that gain actually came from — bigger houses, more flock cycles per year, better genetics, tighter processor coordination, or some mix — or how much of it required capital most growers had to take on debt to access. Status: **investigating**.

![A single modern chicken house standing where three older, smaller chicken houses used to be, faint ghostly outlines of the two missing houses still visible on the ground, a small productivity arrow trending upward above the remaining house](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-01.jpg)

## The Industry That Started With One Woman's Accidental Order

Delmarva isn't just *a* place with a big chicken industry — it's arguably where the modern American broiler industry itself began. In 1923, in Ocean View, Delaware, a farmer named Cecile Steele reportedly received an order of 500 baby chicks instead of the 50 she'd meant to order for egg production, raised them for meat instead, and sold them at a healthy profit — a small accident credited as the spark that turned the peninsula's farmers toward chicken-for-meat production at scale, decades before "broiler" was a standard term. A century later, that same peninsula runs on a structure almost nobody in 1923 would recognize: three large, vertically integrated companies — Perdue Farms (Salisbury, Maryland, founded 1920), Mountaire Farms (Millsboro, Delaware, founded 1914, still family-owned), and Allen Harim — contract with a shrinking number of independent family farms to raise company-owned birds in company-specified houses, on a schedule and to specifications set well upstream of any individual grower. ([Perdue Farms corporate history](https://corporate.perduefarms.com/); [Mountaire Farms — About Us](https://www.mountaire.com/about-us/))

![A sepia-toned 1923 farmhouse scene with a surprised farmer character staring into an oversized delivery crate overflowing with baby chicks, a delivery slip visible reading 500, the number 50 crossed out beside it](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-02.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "history", "label": "1923 Origin\nOcean View, DE", "rank": 0, "detail": "The peninsula's shift toward chicken-for-meat production is credited to Cecile Steele's 1923 flock — widely cited as the origin point of the modern U.S. broiler industry." },
    { "id": "hpai", "label": "Recurring HPAI Detections\n'New Normal,' Feb 2026", "rank": 0, "detail": "Maryland confirmed two presumptive HPAI cases in Caroline County Feb 25-26, 2026, alongside a Kent County, DE detection — part of a pattern state officials and industry described as annual, recurring activity on the Eastern Shore." },
    { "id": "consolidation", "label": "20-Year Structural Shift\nGrowers -36.8%, Houses -11.3%", "rank": 1, "detail": "Delmarva Chicken Association's own 20-year comparison (2005-2025): grower count fell 36.8% to 1,225; chicken house count fell 11.3% to 4,814." },
    { "id": "capex", "label": "Processor Capital Investment\n$267M in 2025", "rank": 2, "detail": "Companies spent $267 million in 2025 on capital improvements to processing plants, hatcheries, and wastewater treatment systems, per DCA." },
    { "id": "output", "label": "Output Growth\nPounds +40.5% (20yr)", "rank": 2, "detail": "Total pounds of chicken produced rose 40.5% over the same 20-year window DCA measures grower/house decline against." },
    { "id": "income", "label": "Grower Contract Income Pool\n+27.4% real (20yr)", "rank": 3, "detail": "Total grower contract income rose 27.4% inflation-adjusted over 20 years — a pool total, not a stated per-grower average." },
    { "id": "pershare", "label": "Implied Per-Grower Share\nRoughly doubled, unverified by DCA", "rank": 4, "detail": "Dividing a 27.4%-larger real income pool across a 36.8%-smaller grower population implies each remaining grower's average real share is roughly double what it was 20 years ago — a derived calculation from two disclosed DCA figures, not a number DCA itself publishes or verifies." }
  ],
  "edges": [
    { "from": "history", "to": "consolidation", "evidence": "verified", "label": "A century of industry maturation from Steele's 1923 flock to today's structure" },
    { "from": "consolidation", "to": "output", "evidence": "verified", "label": "DCA discloses both figures over the same 20-year window" },
    { "from": "consolidation", "to": "capex", "evidence": "estimated", "label": "Fewer, larger operations plausibly concentrate capital investment per remaining house — not a stated causal claim by DCA" },
    { "from": "hpai", "to": "capex", "evidence": "hypothesis", "label": "Recurring biosecurity risk plausibly factors into ongoing facility/wastewater capital spending — not confirmed as a specific driver" },
    { "from": "capex", "to": "output", "evidence": "estimated", "label": "Higher capital investment plausibly supports higher output per house — not a directly measured causal link in public data" },
    { "from": "output", "to": "income", "evidence": "verified", "label": "DCA discloses both figures over the same 20-year window" },
    { "from": "income", "to": "pershare", "evidence": "hypothesis", "label": "Arithmetic implication of two disclosed numbers, not a DCA-published or independently verified figure" }
  ],
  "sourceLabel": "Delmarva Chicken Association 2025 Facts & Figures (20-year comparisons); Maryland Department of Agriculture and Delaware avian-influenza reporting (Feb 2026); Perdue Farms and Mountaire Farms corporate history pages. The final node is explicitly a derived calculation, not a DCA-reported statistic — flagged as hypothesis for exactly that reason."
}
```

That last dashed edge is the whole point of this diagram. DCA discloses the 20-year pool-income change and the 20-year grower-count change as two separate, real, verified facts — but nobody publishes the number you get from dividing one by the other, which is the number that would actually tell you whether the average remaining grower is meaningfully better off than their counterpart 20 years ago. I did that division in the Short Answer above and I'm showing my work here rather than passing it off as an official DCA statistic.

## The Federal Layer Most People Don't Connect to a Chicken Sandwich

Two federal-level forces touch this system in very different ways. First, USDA's Natural Resources Conservation Service runs cost-share programs — including active Maryland work demonstrating alternative containment structures for stockpiling poultry litter during the periodic whole-house cleanouts every Delmarva chicken house needs every two to three years — that help growers manage a genuine environmental cost of scale that predates and outlasts any single company's capital budget. ([USDA NRCS — Demonstration of Alternative Containment Structures for Stockpiling Poultry Litter](https://cig.sc.egov.usda.gov/projects/demonstration-alternative-containment-structures-stockpiling-poultry-litter)) Second, and much more immediate: state agriculture departments confirmed presumptive HPAI cases on two Caroline County, Maryland broiler farms on consecutive days in late February 2026, with a Kent County, Delaware case around the same window — and Maryland officials and industry voices were already describing this kind of recurring seasonal detection as a "new normal" for the Eastern Shore. ([Maryland Department of Agriculture, Feb 25-26 2026 press releases](https://news.maryland.gov/mda/press-release/2026/02/25/preliminary-testing-confirms-highly-pathogenic-avian-influenza-in-caroline-county-3/)) A disease risk that's shifted from occasional emergency to expected annual cost is exactly the kind of thing that plausibly favors whichever growers and companies have the capital to keep investing in biosecurity — though DCA's own figures don't break out how much of the $267 million in 2025 capital spending was HPAI-driven specifically.

![A grower character in protective biosecurity coveralls stands at the entrance of a chicken house next to a wall calendar with recurring HPAI outbreak icons circled every February, sighing while holding a checklist labeled Annual Now](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-03.jpg)

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Delmarva's 20-year structural shift, 2005-2025 (% change)",
  "labels": ["Pounds produced", "Number of growers", "Number of chicken houses", "Grower contract income (real)"],
  "series": [{ "name": "20-year % change", "data": [40.5, -36.8, -11.3, 27.4], "color": "#f2b134" }],
  "sourceLabel": "Delmarva Chicken Association, 2025 Facts & Figures — the association's own published 20-year comparisons. Grower contract income is inflation-adjusted; the other three are not currency figures."
}
```

```chart
{
  "type": "bar",
  "title": "Where 2025's dollars went — four disclosed categories, not a full P&L",
  "labels": ["Grower contract income", "Employee wages", "Feed purchases", "Capital improvements"],
  "series": [{ "name": "2025, $ millions", "data": [347, 999, 1200, 267], "color": "#e07856" }],
  "sourceLabel": "Delmarva Chicken Association, 2025 Facts & Figures. These are four disclosed spending/income categories DCA reports, not a complete profit-and-loss breakdown — company profit, land costs, and grower capital investment/debt service aren't included because DCA doesn't publish them."
}
```

Read the second chart carefully: grower contract income is the smallest of the four disclosed dollar figures, well behind even feed purchases — but that comparison alone doesn't tell you whether growers are underpaid, since it doesn't include what companies keep as profit (not disclosed) or what growers had to borrow to build the houses that let them participate at all (also not disclosed).

## Where This Is Happening

```map
{
  "title": "Where Delmarva's integrators are headquartered",
  "zoom": 8,
  "markers": [
    { "lat": 38.3658, "lng": -75.6003, "label": "Salisbury, MD — Perdue Farms headquarters, founded 1920" },
    { "lat": 38.5914, "lng": -75.2914, "label": "Millsboro, DE — Mountaire Farms headquarters, founded 1914" }
  ],
  "sourceLabel": "Public corporate headquarters locations, not a map of individual grower farms — the 1,225 contract growers themselves are spread across the Delmarva Peninsula's three states and aren't individually mapped here."
}
```

Both headquarters sit within about 25 miles of each other on the peninsula, which is itself a useful fact: the entire structure this article describes — the processing plants, the hatcheries, the feed mills, the 1,225 growers under contract to them — runs inside a genuinely small, dense geographic footprint, not a sprawling national supply chain.

![A simplified illustrated map of the Delmarva Peninsula with three glowing chicken-shaped icons representing the major companies clustered close together near the coast, tiny house icons scattered more sparsely across the rest of the peninsula](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-04.jpg)

## Methodology

This pass relied on the Delmarva Chicken Association's own 2025 Facts & Figures page (fetched directly, not summarized secondhand), Maryland Department of Agriculture press releases on the February 2026 HPAI detections, Perdue Farms' and Mountaire Farms' own corporate history/about pages, and USDA NRCS's public poultry-litter conservation program page. It does not include: grower-level capital cost or debt data for house construction/upgrades, any direct breakdown of the $267 million 2025 capital-improvement figure by purpose (biosecurity vs. capacity vs. routine maintenance), company-level profit or margin data for Perdue, Mountaire, or Allen Harim, feed-conversion or flock-cycle trend data that would explain the *mechanism* behind the 40.5% output increase, or a single direct conversation with DCA, a processor, or a Delmarva contract grower. The "per-grower share roughly doubled" figure in the Short Answer and the graph above is explicitly a derived calculation from two DCA-published aggregate numbers, not a DCA-verified statistic — treat it as a hypothesis worth testing against real grower-level data, not a finding.

![A detective character examines a large corkboard covered in DCA press-release printouts and red string, one string leading to a big box labeled Per-Grower Data still completely empty](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-05.jpg)

## Moral of the Story

The headline productivity numbers here are real, DCA-verified, and genuinely impressive — 40% more chicken from a peninsula with over a third fewer growers is a real efficiency story. What's still open is who actually captured that gain, and that question matters differently depending on where you sit:

- **If you're a current Delmarva contract grower**, the "per-grower share roughly doubled" calculation in this article is worth testing against your own numbers, not taking on faith — DCA's aggregate figures can't tell you whether *you* specifically are ahead of where a grower was 20 years ago, especially net of house-upgrade debt service.
- **If you're a grower considering entering or exiting the system**, the house count fell 11.3% while output rose 40.5% — that gap is almost certainly capital intensity (bigger, more efficient houses), which means the entry cost for a new grower today is very likely higher, in real terms, than it was 20 years ago, even though this article can't yet put a number on it.
- **If you're a lender financing grower operations**, HPAI has apparently moved from emergency to expected annual cost on the Eastern Shore — worth underwriting biosecurity capital needs as a recurring line item, not a one-time contingency.
- **If you're in economic development or policy**, USDA NRCS's poultry-litter cost-share work is a real, existing lever for managing the environmental side of this consolidation story — worth knowing about and pointing growers toward, rather than assuming environmental compliance costs fall on growers alone.

The honest bottom line: this article can tell you the system got dramatically more productive with far fewer growers holding it up. It can't yet tell you, with real data instead of arithmetic, whether the growers who remain are actually winning.

![A single confident chicken character standing proudly on a small pedestal labeled Survivor while a crowd of empty pedestals labeled Exited fade into the background, the confident chicken holding a sign reading Am I Actually Winning Though](/assets/meme/delmarva-poultry-productivity-grower-consolidation-2026-06.jpg)

## Related Research

This investigation is the first flagship piece on this site to examine the Delmarva Peninsula — the structured fields below (who we'd like to talk to, what we still need, our sources) carry the parts of this investigation that update independently of the write-up above.
