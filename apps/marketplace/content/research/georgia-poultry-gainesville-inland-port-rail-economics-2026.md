# Georgia Built a $134M Inland Port. Will Poultry Actually Move From Truck to Rail?

## Short Answer

I went looking for the number that would settle this — how much frozen poultry has actually shifted from truck to rail since Gainesville's inland port opened — and it doesn't exist publicly yet. Georgia Ports Authority's own most recent release still describes frozen poultry moving to Savannah by truck. That's not a research failure; that's the honest state of the evidence four and a half months after opening day. But chasing that missing number turned up something more interesting than the number itself: run the math on the actual distance involved, and Gainesville-to-Savannah sits right at — maybe just under — the range where general freight-industry rules of thumb say intermodal rail stops obviously beating a direct truck on cost alone. If that generic pattern holds locally, the $134 million bet isn't really a bet on landed-cost savings. It's a bet on truck-driver capacity, service reliability, and Atlanta congestion relief being worth paying for in their own right — which is a very different pitch to a poultry shipper's CFO than "this will be cheaper." Status stays **investigating**.

## The Poultry Capital of the World Wasn't an Accident

Before there was a $134 million rail terminal to argue about, there was a feed salesman surviving the Great Depression by giving away chickens. Jesse Jewell took over his family's feed, seed, and fertilizer business in Gainesville in 1930, right as the Depression was gutting demand for all three. His fix: he'd supply cash-poor North Georgia farmers with baby chicks and feed on credit, then buy the grown birds back at a price that covered his costs and guaranteed the farmer a profit. Between 1940 and 1954 he built out his own hatchery, processing plant, feed mill, and rendering plant — the first fully vertically integrated poultry operation of its kind, and the direct template every major poultry integrator has run since. He's the reason Gainesville calls itself the Poultry Capital of the World, and he's the reason "poultry" and "Hall County" have been the same sentence for almost a century now. ([New Georgia Encyclopedia — Jesse Jewell](https://www.georgiaencyclopedia.org/articles/business-economy/jesse-jewell-1902-1975/))

![A Depression-era feed salesman hands a crate of cartoon baby chicks to an astonished farmer with IOU slips fluttering behind, captioned "THE ORIGINAL BUY NOW, PAY WITH CHICKENS"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-01.jpg)

That history matters for a reason that isn't sentimental: it's *why* $134 million in public port-authority capital landed specifically in Gainesville and not somewhere closer to Savannah. The freight isn't following the port. The port is chasing freight that's been concentrated in this one corner of North Georgia since the 1930s.

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "plant", "label": "N. Georgia Poultry\nPlants / Cold Stores", "rank": 0, "detail": "Concentrated in Hall County and neighboring counties — the legacy of Jesse Jewell's 1930s-50s vertical-integration build-out. This is the shipment origin for every scenario on this diagram." },
    { "id": "capital", "label": "$134M Gainesville\nInland Port", "rank": 0, "detail": "Public capital from Georgia Ports Authority. Opened May 4, 2026. 200,000-container annual capacity at full build-out, five-day-a-week Norfolk Southern rail service to Savannah." },
    { "id": "decision", "label": "Shipper's Mode\nDecision", "rank": 1, "detail": "The actual decision point this article is chasing: does a poultry integrator route a given shipment by direct truck or by rail through Gainesville? Public data doesn't yet show which way this is actually being decided at scale." },
    { "id": "truck", "label": "Direct Truck\n(~299 mi / ~600 mi round trip)", "rank": 2, "detail": "Georgia Ports Authority's own most recent frozen-poultry release still describes this as the current default mode — confirmed independently: driving distance Gainesville-to-Savannah is ~299 miles one-way." },
    { "id": "rail", "label": "Drayage + Norfolk\nSouthern Rail", "rank": 2, "detail": "Five-day-a-week intermodal service, opened May 4, 2026. Replaces the truck leg with a short drayage move plus a rail haul — but adds a drayage cost and a dwell-time variable that a direct truck route doesn't have." },
    { "id": "reefer", "label": "Savannah Reefer /\nCold Storage (3,600 slots)", "rank": 3, "detail": "Both paths converge here — roughly 3,600 powered refrigerated container slots at the Port of Savannah, the physical bottleneck either mode has to clear before export." },
    { "id": "export", "label": "Global Export Market\n(37% of U.S. frozen poultry)", "rank": 4, "detail": "Georgia ports handled 37% of all U.S. frozen poultry exports in 2025 — the demand pull that makes the whole system worth building infrastructure for in the first place." }
  ],
  "edges": [
    { "from": "plant", "to": "decision", "evidence": "verified", "label": "Shipment origin" },
    { "from": "capital", "to": "decision", "evidence": "verified", "label": "Rail option now exists" },
    { "from": "decision", "to": "truck", "evidence": "verified", "label": "GPA: current default mode" },
    { "from": "decision", "to": "rail", "evidence": "hypothesis", "label": "Adoption rate not yet public" },
    { "from": "truck", "to": "reefer", "evidence": "verified", "label": "Direct delivery" },
    { "from": "rail", "to": "reefer", "evidence": "verified", "label": "5-day/week NS service" },
    { "from": "reefer", "to": "export", "evidence": "verified", "label": "37% of U.S. frozen poultry exports" }
  ],
  "sourceLabel": "Georgia Ports Authority press releases (frozen-poultry export data, Gainesville Inland Port facility specs); Norfolk Southern (rail service). The truck-vs-rail split itself is not publicly measured — that gap is the point of this diagram. Drag nodes to rearrange, pinch/scroll to zoom, tap a node for its source."
}
```

A grower or plant manager in Hall County doesn't experience any of this as a diagram — they experience it as a phone call: does this week's frozen-poultry container go on a truck, like it always has, or does it go five miles down the road to the new rail yard instead? Everything downstream of that one call — cost, transit time, reliability, what a lender thinks about the plant's logistics risk — depends on an answer nobody outside Georgia Ports Authority and the shippers themselves can currently see.

![A stressed shipping manager holds a rotary phone while a cartoon truck and train both pose expectantly on either side of her, captioned "TRUCK OR TRAIN? NOBODY WILL SAY."](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-02.jpg)

## A $134 Million Bet on Traffic, Not Just Freight

Read Georgia Ports Authority's own language about why it built this thing, and the pitch is broader than poultry economics. GPA President and CEO Griff Lynch told the authority's board the Gainesville terminal would "significantly offset truck traffic congestion in Atlanta and improve air quality by replacing an estimated 26,000 truck roundtrips in the first year alone." The facility is built to serve roughly 330 manufacturers in the region — poultry, heavy equipment, and forest-products companies — not poultry alone. ([Georgia Ports Authority — Gainesville Inland Port Set for May Opening](https://gaports.com/press-releases/gpas-gainesville-inland-port-set-for-may-opening/))

![26,000 tiny identical truck icons crawl through Atlanta gridlock while a smug train zips past on an open rail line, captioned "26,000 TRUCK TRIPS, GONE (THEY HOPE)"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-03.jpg)

That's an important tell. A port authority selling a project on congestion relief and regional manufacturing capacity, rather than on a specific commodity's freight-cost savings, is a port authority that either doesn't have — or isn't leading with — a clean landed-cost case for poultry specifically. Hall County's own economic-development arm frames it the same way: the Greater Hall Chamber counts more than 330 manufacturing and processing concerns and 66 international-company locations in the county, and its 2025 year-end report credits ten new or expanding developments with 691 new jobs and $186.5 million in fresh capital investment — a general industrial-growth story the inland port is one piece of, not a poultry-logistics case study on its own. ([Greater Hall Chamber of Commerce — Economic Development](https://www.ghcc.com/economic-development/))

![A tiny press-release character holds a sign reading "STILL MOVES BY TRUCK" standing in front of a gleaming, mostly-empty rail terminal with a giant ribbon-cutting bow still on it, captioned "THE PORT'S OWN WEBSITE SAID IT FIRST"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-05.jpg)

AgGeorgia Farm Credit, the lender that finances new poultry-house construction, upgrades, and equipment across the state, doesn't publicly disclose anything about factoring logistics reliability into poultry-facility underwriting — which is itself notable. If a $134 million rail option started meaningfully changing a grower or integrator's shipping cost or reliability, you'd expect that to eventually show up somewhere in how a poultry-house loan gets sized or priced. As of this research pass, it hasn't shown up publicly at all. ([AgGeorgia — Poultry Financing](https://www.aggeorgia.com/loans/poultry))

![A cartoon loan officer checks boxes for "FEED COST" and "HOUSE AGE" while a giant question-mark shipping container labeled "LOGISTICS RISK???" sits unchecked in the corner, captioned "THE BOX NOBODY'S CHECKING YET"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-04.jpg)

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Savannah's frozen poultry exports are growing — but this is a port-wide number, not a Gainesville-rail number",
  "labels": ["12 mo. ending Feb 2025 (implied)", "12 mo. ending Feb 2026 (reported)"],
  "series": [{ "name": "TEUs of frozen poultry", "data": [51573, 55957], "color": "#c9a227" }],
  "sourceLabel": "Georgia Ports Authority: 55,957 TEUs for the 12 months ending February 2026, reported as an 8.5% increase. The prior-year figure (51,573) is back-calculated from that reported growth rate, not independently published by GPA — shown for scale, not as a second directly-reported data point. This is total port-wide frozen-poultry volume; it does not isolate what share moved through Gainesville specifically."
}
```

```chart
{
  "type": "bar",
  "title": "Generic 2026 freight-industry cost benchmarks: intermodal rail vs. truckload",
  "labels": ["Typical truckload spot rate", "Typical intermodal rate (excl. drayage)"],
  "series": [{ "name": "$ per mile (midpoint of reported range)", "data": [2.80, 1.50] }],
  "sourceLabel": "National 2026 freight-industry benchmarks from general logistics-cost reporting (not Gainesville- or poultry-specific): truckload spot rates around $2.80/mile all-in; intermodal rail around $1.39-1.60/mile before drayage. Real intermodal savings also have to absorb $150-500 in per-container drayage fees on each end, which is why the comparison below (distance-vs-break-even) matters more than this chart alone."
}
```

```chart
{
  "type": "bar",
  "title": "Where Gainesville-to-Savannah actually falls against the industry's own rail break-even rule of thumb",
  "labels": ["Reported industry intermodal break-even distance", "Actual Gainesville-to-Savannah one-way distance"],
  "series": [{ "name": "Miles", "data": [500, 299], "color": "#7fbf7f" }],
  "sourceLabel": "The ~500-mile break-even figure is a generic freight-logistics rule of thumb reported across multiple industry cost-analysis sources in 2026, not a Gainesville-specific study — below that rough threshold, two drayage legs are generally reported to eat most of intermodal's per-mile savings. The 299-mile figure is an independently confirmed driving distance. This is a real, citable tension worth flagging, not proof the port is a bad bet — reliability, truck-driver capacity, and Atlanta congestion relief can still justify rail even where the pure cost math is closer than a longer-haul lane would show."
}
```

Three honest numbers, three different jobs: the first says the underlying freight is genuinely growing. The second says intermodal has real, if unevenly reported, cost advantages nationally. The third is the one that should make a shipper actually pause — Gainesville-to-Savannah is short enough that the generic version of this math doesn't hand rail an obvious win the way a longer haul would.

## Where This Is Happening

```map
{
  "title": "The two ends of the shift being tested",
  "center": [33.19, -82.46],
  "zoom": 7,
  "markers": [
    { "lat": 34.2979, "lng": -83.8241, "label": "Gainesville, GA — Hall County, the historic 'Poultry Capital of the World' since Jesse Jewell's 1930s-50s build-out; site of the new $134M inland port" },
    { "lat": 32.0809, "lng": -81.0912, "label": "Port of Savannah, GA — Garden City Terminal; ~3,600 powered reefer slots; where both the truck and rail paths converge before export" }
  ],
  "sourceLabel": "Public facility locations only. The ~299-mile route between these two points is what every truck-vs-rail comparison in this article is measuring against."
}
```

## What Georgia Ports Is Actually Saying Right Now

This is the ground-truth check that kept this article honest. Georgia Ports Authority's own press release on the 8.5% frozen-poultry export growth — published well after the Gainesville terminal's May 4 opening — describes the current mode plainly: "frozen poultry exports move to the port by truck." Not "increasingly move by rail." Not "a growing share now moves by rail." Just: by truck, present tense, from the agency that operates the rail alternative and has every incentive to announce a mode-shift the moment it's real. ([Georgia Ports Authority — Frozen Poultry Exports Up 8.5 Percent](https://gaports.com/press-releases/frozen-poultry-exports-up-8-5-percent-at-georgia-ports/))

That's not a knock on the port. Five months is genuinely fast to expect a freight-mode change to show up in an authority's own boilerplate language, and shippers with existing trucking contracts don't tear them up the week a new option opens. But it does mean anyone telling you poultry has "moved to rail" at Gainesville is ahead of what Georgia Ports itself is willing to say in writing.

![A cartoon detective stakes out a port-authority press release from behind a bush, binoculars trained on the phrase "moves by truck," waiting for it to change, captioned "WATCHING FOR ONE WORD TO CHANGE"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-07.jpg)

## Methodology

This pass drew on Georgia Ports Authority's own press releases (frozen-poultry export volumes, the Gainesville facility's opening announcement and specs), Norfolk Southern's public intermodal service pages, the Greater Hall Chamber of Commerce's economic-development reporting, AgGeorgia's public poultry-financing pages, the New Georgia Encyclopedia's history of Jesse Jewell and Georgia's poultry industry, and multiple 2026 freight-logistics industry sources for generic intermodal-vs-truckload cost benchmarks. It does not include a single Gainesville- or poultry-specific rate quote, dwell-time figure, or adoption percentage — none of that is public. It also does not include a conversation with Georgia Ports Authority, Norfolk Southern, AgGeorgia, a North Georgia poultry integrator, or the Greater Hall Chamber — everything here is drawn from what each of those parties has already published, not from asking them directly. The industry-wide intermodal cost benchmarks used above are national generics, not verified against this specific lane; they're included because they're the best publicly available proxy for a genuine, sourced comparison, and every place they're used says so explicitly.

## Moral of the Story

**If you're a North Georgia poultry integrator or exporter**, the open question worth actually asking Georgia Ports Authority or Norfolk Southern isn't "what's the rate" in the abstract — it's whether your specific volume and lane clear the roughly 500-mile rule of thumb that generally makes intermodal pencil out, and if it doesn't on cost alone, whether reliability or driver-capacity relief closes the gap for you specifically. That's a very different conversation than assuming a new rail option is automatically cheaper.

**If you're AgGeorgia or another poultry-facility lender**, this is a logistics-risk variable that isn't in your underwriting yet, as far as public information shows — worth a real internal conversation about whether a borrower's mode flexibility (can they use either truck or rail, or are they locked into one) should factor into how you price expansion risk.

![A lender holds up two report cards, "FEED COST: A+" and "CAN THEY SHIP EITHER WAY: INCOMPLETE," looking exasperated, captioned "GRADE THE FLEXIBILITY TOO"](/assets/meme/georgia-poultry-gainesville-inland-port-rail-economics-2026-06.jpg)

**If you're the Greater Hall Chamber or another regional economic-development office**, the honest sell to a prospective poultry-adjacent manufacturer isn't "rail will cut your freight bill" until someone actually publishes that number — it's congestion relief, capacity, and optionality, which is exactly what Georgia Ports Authority itself is leading with.

**If you're just trying to figure out whether $134 million in public infrastructure money was well spent**, don't wait for a poultry-specific savings number that may never get published — watch instead for GPA's own language to change from "frozen poultry exports move to the port by truck" to anything else. That's the tell, and it's free to watch for.

## Related Research

The structured fields below this narrative — what got us asking this, who we'd like to talk to, what we still need, and our sources — carry the parts of this investigation that update independently of the write-up above.
