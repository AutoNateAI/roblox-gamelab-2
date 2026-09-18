# The High Plains Got One Wet Year. Did It Actually Buy Farmers Time?

## Short Answer

Kansas got genuinely good groundwater news this year — its first statewide High Plains aquifer increase since 2019. Nebraska, sharing the same aquifer system one state line north, got the opposite. Neither number means what a single headline would make it mean. A wet year that lets an irrigator pump less isn't the same thing as structural aquifer recovery, and a decline that looks alarming in isolation might be perfectly manageable if that acre's energy costs and crop economics still work. Status: **investigating** — the direction of the water is verified; the direction of the money isn't, yet.

## Two States, One Aquifer, Two Different Years

The High Plains (Ogallala) aquifer doesn't respect state lines, but state-level reporting does. In 2025, the Kansas Geological Survey measured the first overall statewide increase in the Kansas High Plains aquifer since 2019 — driven by wetter conditions that let farmers pump less. South-central Kansas, in the Great Bend Prairie and Equus Beds portions of the aquifer, saw water levels rise nearly 2.5 feet on average, helped by sandy soils and a shallow water table that recharges fast when the rain actually comes. Western Kansas wasn't uniform: west-central Kansas and Groundwater Management District 1 saw a slight rise, while northwest and southwest Kansas kept declining — just by less than the long-term average. ([Kansas Geological Survey — "Groundwater levels in the Kansas High Plains aquifer see first overall increase since 2019"](https://kgs.ku.edu/news/article/groundwater-levels-in-the-kansas-high-plains-aquifer-see-first-overall-increase-since-2019))

Nebraska's 2026 statewide report tells almost the opposite story. The University of Nebraska–Lincoln's Conservation and Survey Division measured nearly 5,000 wells between spring 2024 and spring 2025 and found groundwater levels declined on average by 0.29 feet, with 62% of measured wells showing a decline. The worst of it — declines exceeding 10 feet — sits in the Nebraska Panhandle, an area running through persistent multi-year drought. Nebraska manages this through 23 Natural Resources Districts, each running its own regional groundwater management plan; the state's monitoring itself calls the Panhandle trend "a persistent concern worthy of public awareness." ([University of Nebraska–Lincoln IANR — "Groundwater levels continue to decline amid persistent drought conditions"](https://ianrnews.unl.edu/article/groundwater-levels-continue-to-decline-amid-persistent-drought-conditions))

![A two-panel farm scene: a Kansas farmer relaxes as rain fills a well gauge, while a Nebraska farmer across the state line watches the same gauge drop, both looking at the same map of the Ogallala aquifer](/assets/meme/central-great-plains-water-energy-irrigation-resilience-2026-01.jpg)

## Why the Economic System Is Bigger Than the Aquifer Chart

Here's the trap in reading either number by itself: an acre's actual resilience depends on more than whether the water level moved up or down. Pumping lift — how far the water has to travel to reach the surface — determines how much energy it takes to irrigate that acre at all. Energy source (electric grid power versus a diesel-fired pump) determines how exposed that lift is to a fuel-price shock like the one we've documented in the Bootheel this same week. Crop choice determines how much revenue that water buys per unit pumped. And a lender's geography determines whether a physical water shock ever becomes a credit event, or just gets absorbed. A wet year can improve one edge of that system — recharge — while leaving every other edge exactly as fragile as it was.

![A four-legged table labeled "IRRIGATION RESILIENCE," with one leg (labeled "RAINFALL") freshly repaired and shiny, while the other three legs (PUMPING LIFT, ENERGY COST, CROP MARGIN) are still cracked and wobbly](/assets/meme/central-great-plains-water-energy-irrigation-resilience-2026-02.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "aquifer", "label": "Aquifer Trajectory\nKS: first rise since 2019\nNE: -0.29 ft avg, Panhandle worse", "rank": 0, "detail": "Kansas Geological Survey (2025 data) vs. University of Nebraska-Lincoln IANR (spring 2024-2025 measurement of ~5,000 wells) — same aquifer system, opposite direction this year." },
    { "id": "lift", "label": "Pumping Lift\n(depth to water)", "rank": 1, "detail": "How far water has to travel to the surface — not published at farm level for either state in this pass; district-level data exists but wasn't pulled yet." },
    { "id": "energy", "label": "Energy Cost Exposure\n(electric vs. diesel)", "rank": 2, "detail": "Center-pivot systems on grid power are exposed to electricity rates; diesel-fired pumps are directly exposed to the same national diesel shock (record $6.285/gal, week ending Sep 14 2026) documented in our Bootheel investigation. Which fuel type dominates in which district is not yet mapped." },
    { "id": "margin", "label": "Crop Margin\nper Irrigated Acre", "rank": 3, "detail": "Depends on crop choice, yield, and commodity price against the pumping-energy cost just upstream of it." },
    { "id": "credit", "label": "Lender / Land Value\nExposure", "rank": 4, "detail": "A physical water constraint only becomes a credit event once it changes what an acre can reliably produce — the step this research pass has not yet reached." }
  ],
  "edges": [
    { "from": "aquifer", "to": "lift", "evidence": "verified", "label": "KGS/UNL direct measurement" },
    { "from": "lift", "to": "energy", "evidence": "estimated", "label": "Deeper lift = more energy per acre-foot pumped" },
    { "from": "energy", "to": "margin", "evidence": "estimated", "label": "Energy cost is a direct input to irrigated-crop breakeven" },
    { "from": "margin", "to": "credit", "evidence": "hypothesis", "label": "Not yet measured at farm or district level" }
  ],
  "sourceLabel": "Kansas Geological Survey (2025 measurement year); University of Nebraska-Lincoln IANR (spring 2024-2025 measurement). No scenario slider — pumping-lift and energy-mix data at district level wasn't yet acquired in this pass. Drag nodes, tap for sources."
}
```

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Same aquifer system, opposite direction, same year",
  "labels": ["Kansas — south-central High Plains", "Nebraska — statewide average"],
  "series": [{ "name": "Groundwater level change (feet, + = rise)", "data": [2.5, -0.29], "color": "#7fbf7f" }],
  "sourceLabel": "Kansas Geological Survey (south-central Kansas, Great Bend Prairie / Equus Beds, 2025 data) vs. University of Nebraska-Lincoln IANR (statewide average, spring 2024-2025). Different sub-geographies within each state moved differently — these are each state's own headline figure, not a uniform statewide-to-statewide comparison."
}
```

Nebraska's Panhandle, specifically, is the outlier worth watching: declines there exceeded 10 feet, more than 30 times the statewide average decline. That's the kind of number that changes what a specific district's producers, lenders, and processors should actually be modeling — not the tamer statewide 0.29-foot figure.

## Where This Is Happening

```map
{
  "title": "Central Great Plains — divergent aquifer trajectories",
  "center": [39.5, -99.5],
  "zoom": 6,
  "markers": [
    { "lat": 37.8, "lng": -97.6, "label": "South-central Kansas (Great Bend Prairie / Equus Beds) — aquifer rose ~2.5 ft" },
    { "lat": 38.9, "lng": -101.8, "label": "Southwest Kansas — aquifer still declining, but less than average" },
    { "lat": 41.9, "lng": -103.4, "label": "Nebraska Panhandle — declines exceeding 10 feet, worst in the state" }
  ],
  "sourceLabel": "Approximate regional centroids from Kansas Geological Survey and University of Nebraska-Lincoln IANR reporting — not precise well locations."
}
```

## Methodology

This pass relied on two university/state geological-survey primary sources — the Kansas Geological Survey's 2025 High Plains aquifer measurement and the University of Nebraska-Lincoln's spring 2024–2025 statewide well survey — cross-referenced against the same national diesel-price shock documented in our companion Bootheel investigation. It explicitly did not yet acquire: farm- or district-level pumping-lift data, the electric-versus-diesel energy mix by irrigation district, enterprise-budget crop margins under this year's specific energy prices, or any lender/processor interview. Those are exactly the inputs the planned Water-Energy-Agriculture Resilience GIS artifact needs before this becomes more than a directional finding.

## Moral of the Story

**If you're a Kansas irrigator in a recovering district:** don't read one wet year as permission to expand pumping back to pre-drought levels — ask your Groundwater Management District whether this year's rise reflects real recharge or just reduced pumping, because those have very different implications for next year.

**If you're a Nebraska producer in the Panhandle:** the >10-foot decline in your district is a genuinely different risk category than the statewide 0.29-foot average — don't let a statewide headline undersell what your specific Natural Resources District is already tracking.

**If you're a lender covering either state:** pumping lift and energy-mix data don't currently sit next to your crop-collateral models in one place. That's a real, buildable gap, and the region that closes it first gets a genuine underwriting edge.

![Two neighboring farm silos on either side of a state-line fence post, one labeled KANSAS glowing green and thriving, the other labeled NEBRASKA looking parched, both drawing from the same underground aquifer pipe](/assets/meme/central-great-plains-water-energy-irrigation-resilience-2026-03.jpg)

## Related Research

This connects to our investigation into [what the September 2026 diesel shock costs a Bootheel farm](/research-and-case-studies/bootheel-diesel-harvest-cost-2026) — the same energy-price event, a completely different water-and-pumping context.
