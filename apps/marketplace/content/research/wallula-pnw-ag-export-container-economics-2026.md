# Wallula Is Pulling the Export Ramp Inland. Which PNW Crops Actually Gain From Containerizing Closer to the Farm?

## Short Answer

The pitch behind Wallula is simple enough to fit on a slide: instead of trucking grain over the Cascades to a coastal port, you containerize it 200-plus miles closer to the farm and let rail carry it the rest of the way. What the pitch doesn't settle is whether that actually beats a direct truck haul on landed cost — and when I ran the only real distance number publicly available against the freight industry's own generic break-even rule of thumb, the lane looked short enough that cost alone probably isn't the whole story. What is real: a named specialty exporter, a named rail-drayage partnership, an actual government interlocal agreement, and one honest, if small and dated, before-and-after mileage data point from the facility's own 2024 launch. Status: **investigating**.

## Grain Has Always Had to Cross a Mountain Range to Leave Washington

Eastern Washington's wheat and barley country sits on the wrong side of the Cascades from every major container port the state has. That's not a new problem — it's the reason the Columbia-Snake River barge system exists at all, moving bulk grain by water past the mountains rather than by truck over them. Containerized agricultural exports, though, have mostly stayed a truck-and-highway story: a hopper truck hauls to a coastal transload yard, gets loaded into a container, and only then does the cargo touch rail or ocean freight. Wallula's bet is that the transload step itself — not just the bulk-barge alternative — can move inland, closer to where the grain is actually grown.

![A grain truck stands at the base of a cartoon Cascade mountain range wearing a tiny worried expression, while a train track politely offers a shortcut tunnel, captioned "OR YOU COULD JUST NOT"](/assets/meme/wallula-pnw-ag-export-container-economics-2026-01.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "partnership", "label": "TCI + MAC Container Line\nPartnership, Sep 10 2026", "rank": 0, "detail": "Tri-Cities Intermodal (Theodore Prince, CEO/Founder — 40+ years in intermodal, former VP Intermodal & International at Kansas City Southern, co-founder of Tiger Cool Express) and MAC Container Line (Brad Heier, President) announced a partnership Sep 10, 2026: MAC becomes preferred logistics provider for agricultural exports moving through Wallula, with an initial 75,000 lifts/year capacity and dedicated storage/transload bins for McKay Seed, served by Union Pacific and Columbia Rail." },
    { "id": "hub", "label": "Tri-Cities Inland Logistics\nHub Interlocal Agreement", "rank": 0, "detail": "Northwest Seaport Alliance, Port of Benton, Port of Pasco, and Port of Walla Walla signed an interlocal agreement (dated Jan 6, 2026, signing ceremony Feb 5, 2026) to jointly develop an inland logistics hub in the Tri-Cities region. The Tri-Cities Intermodal facility sits inside the Port of Walla Walla's Dodd Road Industrial Park in Wallula." },
    { "id": "mckay", "label": "McKay Seed Company —\n#1 U.S. Food-Barley Exporter to Japan", "rank": 1, "detail": "McKay Seed (Dan W. McKay) exports specialty waxy, high-Beta-Glucan food-grade barley to Japan — the specific commodity the new Wallula storage/transload capacity was built to support. A new member of the U.S. Grains & BioProducts Council." },
    { "id": "decision", "label": "Shipper's Mode Decision", "rank": 1, "detail": "The real decision this article is chasing: does a Wallula-area agricultural exporter route product by direct truck over the Cascades, or by short drayage into Wallula plus rail? Public data doesn't yet show the split at scale for the 2026 McKay Seed partnership specifically." },
    { "id": "truck", "label": "Direct Truck Over Cascades\n(~225 mi one-way to Tacoma)", "rank": 2, "detail": "Derived from a reported 450-mile round trip, Pasco to the Port of Tacoma — the pre-Wallula default route for Tri-Cities-area agricultural exporters." },
    { "id": "rail", "label": "Wallula Drayage + UP/\nColumbia Rail (~25 mi drayage)", "rank": 2, "detail": "The facility's own 2024 soft-launch data point: its first shipment (300 tons of hay, not barley — this predates the Sep 2026 McKay Seed partnership by roughly two and a half years) moved via ten 50-mile round trips, Pasco to Wallula, instead of the 450-mile round trip to Tacoma — an 89% cut in highway truck miles for that specific load." },
    { "id": "export", "label": "Coastal Port / Ocean\nExport to Japan", "rank": 3, "detail": "Both paths converge at a coastal container port before ocean transit to Japan — the physical destination either mode has to reach." }
  ],
  "edges": [
    { "from": "partnership", "to": "mckay", "evidence": "verified", "label": "Dedicated storage/transload capacity built for this exporter" },
    { "from": "hub", "to": "partnership", "evidence": "verified", "label": "TCI facility sits inside the interlocal-agreement footprint" },
    { "from": "mckay", "to": "decision", "evidence": "verified", "label": "Shipment origin" },
    { "from": "decision", "to": "truck", "evidence": "hypothesis", "label": "Pre-Wallula default mode; 2026 split not public" },
    { "from": "decision", "to": "rail", "evidence": "hypothesis", "label": "New option; adoption rate not yet public" },
    { "from": "truck", "to": "export", "evidence": "verified", "label": "Direct delivery" },
    { "from": "rail", "to": "export", "evidence": "verified", "label": "UP/Columbia Rail service" }
  ],
  "sourceLabel": "Truck News (Sep 10, 2026 partnership announcement); PNW Ag Network (Feb 6, 2024, facility soft-launch); Port of Pasco/NWSA interlocal agreement filing (Jan 6, 2026); U.S. Grains & BioProducts Council (McKay Seed membership). The 89%-mileage-reduction figure is a real, dated 2024 data point about a hay shipment — not a McKay Seed barley figure, and not a landed-cost number. Drag nodes, tap for sources."
}
```

The honest read of this diagram: everything above the decision node is real and dated. Everything below it — which mode Wallula-area exporters are actually choosing at scale, and what it costs them — is the open question the rest of this article tries to size up, without inventing a shipper-specific number nobody's published.

![A cartoon shipper stands at a literal fork in a gravel road, one sign pointing over a mountain labeled "OLD WAY: TRUCK IT," one sign pointing to a small rail yard labeled "NEW WAY: 25 MILES, THEN RAIL," a giant question mark hovering over both, captioned "25 MILES THEN... WHAT?"](/assets/meme/wallula-pnw-ag-export-container-economics-2026-02.jpg)

## The Distance Math Nobody's Published, Run Against the Industry's Own Rule of Thumb

Here's the part of this investigation that turned up something more useful than a press-release recap. General 2026 freight-industry cost reporting puts the distance where intermodal rail typically starts beating direct truck on total landed cost at roughly 750 miles one-way — below that, drayage fees on both ends tend to eat most of rail's per-mile savings. The actual distance from Pasco to the Port of Tacoma, the pre-Wallula default route, works out to roughly 225 miles one-way, based on the 450-mile round trip the facility's own 2024 launch reporting cited. That's less than a third of the generic break-even distance.

![A yardstick stretches from a tiny Wallula grain silo toward a distant coastal port, with a big red "750 MILES TO BREAK-EVEN" marker planted way off in the distance, way past where the actual route ends, captioned "STILL 500+ MILES SHORT"](/assets/meme/wallula-pnw-ag-export-container-economics-2026-03.jpg)

That doesn't mean Wallula is a bad bet — it means the value case probably isn't primarily a landed-cost story, and the people who built this partnership seem to know that. MAC Container Line's own president, Brad Heier, framed the deal this way at announcement: "Wallula offers a unique opportunity to bring the agricultural supply chain closer to the producer." ([Truck News, Sep 10, 2026](https://www.trucknews.com/transportation/tri-cities-intermodal-expands-agricultural-transload-capacity/1003221433/)) Coverage of the facility has also emphasized shorter driver turns, less exposure to Cascade mountain-pass conditions, and drivers being able to get home the same night — a capacity-and-reliability pitch, not a per-container savings figure. That's the same shape of argument this site found behind Georgia's Gainesville inland port: when the distance math is short of the generic break-even line, the real sell tends to be driver capacity and service reliability, not a landed-cost number nobody's willing to publish yet.

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "The facility's own first shipment: truck round-trip miles, before vs. after (2024 launch, hay — not barley)",
  "labels": ["Pasco to Port of Tacoma (old route)", "Pasco to Wallula (new route)"],
  "series": [{ "name": "Round-trip miles", "data": [450, 50], "color": "#7fbf7f" }],
  "sourceLabel": "PNW Ag Network, Feb 6, 2024: the facility's first shipment (300 tons of hay) moved via ten 50-mile round trips instead of the 450-mile round trip to Tacoma — an 89% cut in highway miles for that load. This predates the Sep 2026 McKay Seed barley partnership by about two and a half years and is not a McKay-specific or cost figure — shown as the only real before/after mileage data point this facility has published."
}
```

```chart
{
  "type": "bar",
  "title": "Where the Pasco-to-Tacoma lane falls against the industry's own intermodal break-even rule of thumb",
  "labels": ["Reported industry break-even distance", "Actual Pasco-to-Tacoma one-way distance"],
  "series": [{ "name": "Miles", "data": [750, 225], "color": "#e07856" }],
  "sourceLabel": "The ~750-mile break-even figure is a generic 2026 freight-industry benchmark reported across multiple logistics-cost sources, not Wallula- or agriculture-specific. The 225-mile figure is derived from the reported 450-mile Pasco-Tacoma round trip. A real, citable gap — not proof Wallula is a bad investment, since reliability and driver capacity can justify rail even short of the cost break-even line."
}
```

```chart
{
  "type": "bar",
  "title": "U.S. barley export scale, for context (not Wallula- or Washington-specific)",
  "labels": ["Countries that bought U.S. barley, 2022/23", "Volume (thousand metric tons)"],
  "series": [{ "name": "Figure", "data": [56, 400], "color": "#f2b134" }],
  "sourceLabel": "U.S. Grains & BioProducts Council: 56 countries bought U.S. barley in the 2022/23 marketing year, totaling 400,000 metric tons (18.3M bushels), including Japan's food-grade market. This is a national scale reference, not McKay Seed's or Wallula's specific throughput, which isn't public."
}
```

Three honest jobs, three different scales: the first is the one real before/after mileage number this facility has ever published, for a shipment that isn't even the commodity this article is about. The second is the actual math that should make anyone selling this purely as a cost play pause. The third is scale context for why food-grade barley to Japan is worth building dedicated rail capacity for in the first place — without pretending to know McKay Seed's own volume through Wallula, which nobody's disclosed.

## Where This Is Happening

```map
{
  "title": "The route this article is actually measuring",
  "center": [46.6, -120.2],
  "zoom": 7,
  "markers": [
    { "lat": 46.0654, "lng": -118.9028, "label": "Wallula, WA — Tri-Cities Intermodal facility, Port of Walla Walla's Dodd Road Industrial Park; McKay Seed's dedicated storage/transload capacity" },
    { "lat": 46.2396, "lng": -119.1006, "label": "Pasco, WA — origin point for the 450-mile (old route) vs. 50-mile (new route) comparison in this article" },
    { "lat": 47.2668, "lng": -122.4056, "label": "Port of Tacoma, WA — the pre-Wallula default coastal transload destination, ~225 miles one-way from Pasco" }
  ],
  "sourceLabel": "Public facility and port locations only. The ~225-mile Pasco-to-Tacoma distance is what every truck-vs-rail comparison in this article measures against."
}
```

## What the Public Record Actually Confirms, and What It Still Doesn't

Every piece of this story that's genuinely public checks out: the Sep 10, 2026 TCI-MAC partnership is real and named, with an initial 75,000-lift annual capacity and dedicated McKay Seed infrastructure; the Tri-Cities Inland Logistics Hub interlocal agreement between four public port/seaport entities is real, filed, and dated; McKay Seed's status as the top U.S. exporter of commercial food-grade barley to Japan is corroborated by its own trade-council membership listing. ([Truck News, Sep 10, 2026](https://www.trucknews.com/transportation/tri-cities-intermodal-expands-agricultural-transload-capacity/1003221433/); [Port of Pasco — Interlocal Agreement, Jan 6, 2026](https://www.portofpasco.org/uploads/agreements/20260106-ILA-Inland-Logistics-Hub-NWSA-and-Tri-Cities-Ports-part-1-signed.pdf); [U.S. Grains & BioProducts Council — McKay Seed Company](https://grains.org/usgc-welcomes-new-member-mckay-seed-company/))

What's still missing, and what genuinely would settle this article's core question, is a real shipper's own before-and-after landed-cost or dwell-time figure for freight actually moving through the new McKay Seed capacity specifically — not the 2024 hay data point, not a generic freight-industry rule of thumb, an actual number from this partnership. Nobody's published one yet, four months into the partnership being announced isn't long to expect it, and that's a genuinely different, more honest place to leave this than pretending the mileage math above settles the cost question.

![A filing cabinet drawer labeled "MCKAY SEED ACTUAL LANDED-COST DATA" sits completely empty except for a tumbleweed, right next to an overflowing drawer labeled "PRESS RELEASES," captioned "GUESS WHICH DRAWER'S FULL"](/assets/meme/wallula-pnw-ag-export-container-economics-2026-04.jpg)

## Methodology

This pass drew on Truck News' Sep 10, 2026 reporting on the TCI-MAC Container Line partnership, PNW Ag Network's Feb 6, 2024 reporting on the facility's soft launch (the source of the only real before/after mileage figure found), the Port of Pasco's own filed interlocal agreement document (Jan 6, 2026), the U.S. Grains & BioProducts Council's McKay Seed membership page, and multiple 2026 freight-industry sources for the generic intermodal break-even distance benchmark. It does not include: a single McKay Seed- or barley-specific rate quote, dwell-time figure, or landed-cost comparison; a direct statement from Theodore Prince, Dan McKay, or a Washington Grain Commission representative; or confirmation of what share of the 75,000-lift annual capacity is actually being used as of this research pass. The 89% mileage-reduction figure is real but describes a 2024 hay shipment, not the 2026 barley partnership this article is centered on — using it as more than an illustration of the mechanism would overstate what it actually proves.

## Moral of the Story

**If you're a Wallula-area grain or specialty-crop shipper**, the concrete thing worth doing is asking Tri-Cities Intermodal or MAC Container Line for an actual quoted rate on your specific lane and commodity, rather than assuming a new rail option is automatically cheaper — the generic distance math above suggests it might not be, on cost alone.

**If you're McKay Seed or another exporter actually using the new capacity**, publishing even one real before/after landed-cost or transit-time figure would do more to validate this partnership than another capacity announcement — and it's the single piece of information every other stakeholder in this diagram is missing.

**If you're AgWest Farm Credit or another lender financing agricultural exporters in this corridor**, mode flexibility (can a borrower ship either way, or are they locked into one) is a logistics-risk variable worth a specific underwriting question this season — the same variable our companion investigation into Georgia's inland port flagged for poultry lenders.

**If you're the Port of Walla Walla, Port of Benton, Port of Pasco, or the Northwest Seaport Alliance**, the honest sell to the next prospective shipper isn't "rail beats truck on cost" until someone actually publishes that number for this specific lane — it's shorter driver turns, reduced mountain-pass exposure, and driver retention, which is exactly what the facility's own public language already leads with.

![A port authority spokesperson holds two signs: one says "CHEAPER!" with a big question mark scribbled over it, the other says "SHORTER TURNS, SAFER DRIVES, DRIVERS HOME AT NIGHT" with a confident checkmark, captioned "THE REAL PITCH, IN TWO SIGNS"](/assets/meme/wallula-pnw-ag-export-container-economics-2026-05.jpg)

## Related Research

This is the first flagship investigation into the Pacific Northwest / Columbia Basin on this site, and it shares an analytical shape — a new inland logistics investment measured against the freight industry's own generic cost break-even distance — with our investigation into [Georgia's $134M Gainesville Inland Port](/research-and-case-studies/georgia-poultry-gainesville-inland-port-rail-economics-2026). The structured fields below (who we'd like to talk to, what we still need, our sources) carry the parts of this investigation that update independently of the write-up above.
