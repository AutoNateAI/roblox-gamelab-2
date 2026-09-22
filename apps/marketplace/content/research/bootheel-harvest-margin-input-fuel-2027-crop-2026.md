# Bootheel Harvest Margin Squeeze: Can Input and Fuel Shock Change the 2027 Crop Before 2026 Harvest Is Finished?

## Short Answer

Here's the part that should bother more people than it does: Bootheel farmers are being asked to make their 2027 fertilizer decisions in the same six weeks they're still paying record diesel prices to finish the 2026 harvest. That's not a metaphor — it's the literal fall prepay calendar. I went looking for a clean local number that would tell you exactly how much that two-season overlap costs a real Dunklin County rice-and-soybean operation, and the honest answer is that the number doesn't exist publicly yet. What does exist is a named, on-the-record Bootheel grower who already lived through one version of this math in 2026 and switched crops because of it, a national fertilizer market that's pricing the *next* version of that math worse, not better, and a local lender whose own credit-quality numbers started sliding before any of this fall pressure even showed up. Status: **investigating**.

## Why Fall in the Bootheel Has Always Been Two Seasons Wearing One Calendar Page

This region doesn't get a clean break between "this year's crop" and "next year's crop." The Little River Drainage District spent 1914 to 1928 cutting more than a hundred miles of levees and ditches through what used to be the Mississippi River's overflow swamp, turning it into some of the flattest, most fertile row-crop and rice ground in the country — and also some of the most input-intensive. Flood-irrigated rice, furrow-irrigated soybeans, propane or diesel-fired grain dryers, and gravity-drained gravel roads all mean this land converts fuel and fertilizer into yield at a rate a dryland Corn Belt farm simply doesn't match. That's the backdrop for why fall here has always carried two jobs at once: finish paying for the crop in the ground, and lock in — or delay — the inputs for the crop that isn't planted yet. Most years, that overlap is a scheduling inconvenience. This year, both halves of it got expensive at the same time.

![A Bootheel farmer stands with one boot in a flooded rice paddy and one boot on dry fertilizer-prepay ground, a calendar behind him with September circled twice in two different colors, captioned "SEPTEMBER: DOUBLE BOOKED"](/assets/meme/bootheel-harvest-margin-input-fuel-2027-crop-2026-01.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "diesel", "label": "2026 Harvest Diesel\n$6.285/gal, national record", "rank": 0, "detail": "USDA AMS: national average diesel hit a record $6.285/gal for the week ending Sep 14, 2026 — up from $4.65/gal just five weeks earlier (Aug 7, 2026, per farmdoc daily), and 254.6 cents above the same week in 2025. This is the fuel bill for finishing the 2026 harvest, drying, and hauling." },
    { "id": "fert", "label": "Fall 2026 Fertilizer\nBenchmarks (national)", "rank": 0, "detail": "farmdoc daily, Aug 7 2026: anhydrous ammonia $915.50/ton (+16% YoY), DAP $912.22/ton (+7% YoY), potash ~$500/ton (+2.5% YoY) — national/Midwest benchmark prices, not a Bootheel-specific quote. This is the backdrop 2027 fall prepay decisions are being priced against." },
    { "id": "ground", "label": "Dunklin Co. Rice Grower,\nOn Record: Urea +$300-350/ton,\nFuel +$1.50/gal", "rank": 1, "detail": "Rance Daniels, Chairman of the Missouri Rice Council, farms rice and soybeans in southern Dunklin County. On record twice in 2026 (Brownfield Ag News, Apr 7 and Jul 31): urea up $250-300/ton in April, $300-350/ton by July, versus 2025; fuel up $1.50/gallon. His words: 'it really puts it in the red.'" },
    { "id": "margin", "label": "2026 In-Season\nCash Margin", "rank": 2, "detail": "Not separately disclosed for the Bootheel specifically. This node combines the national cost signal and the real Dunklin County account into an estimate of what a 2026 crop actually nets before a single 2027 input is bought." },
    { "id": "switch", "label": "2026 Crop-Mix Response\n(MO rice acres -44.6% YoY)", "rank": 3, "detail": "USDA NASS, Sep 11 2026: Missouri all-rice planted acreage fell from 213,000 (2025) to 118,000 (2026), a 44.6% drop; soybean acreage rose from 5.6M to 5.95M. Daniels' own farm is part of that state-level shift, by his own account — not proof every acre moved for the same reason, but a real, named, on-the-ground match to the state number." },
    { "id": "prepay", "label": "Fall 2026 Prepay\nDecision for 2027", "rank": 3, "detail": "National ag-finance reporting (farmdoc daily, Terrain Ag, CropLife, Aug 2026) suggests growers facing elevated fall fertilizer prices may shift a larger share of nutrient purchases to spring 2027 rather than prepaying this fall. No Bootheel-specific fall prepay quote or local lock-in rate is public yet — that gap is the actual open question this article can't close." },
    { "id": "credit", "label": "Farm Credit SEMO\nAdversely Classified Loans\n7.3% at 6/30/26", "rank": 4, "detail": "Farm Credit Southeast Missouri's own disclosed classification rate rose from 4.7% (12/31/25) to 7.3% (6/30/26) — see our companion investigation. That reporting period ends before the September diesel record and before the fall 2027 prepay window even opens, which means the next disclosed quarter is the first one that could actually reflect this two-season squeeze." }
  ],
  "edges": [
    { "from": "diesel", "to": "margin", "evidence": "verified", "label": "USDA AMS: record harvest-season fuel cost" },
    { "from": "fert", "to": "margin", "evidence": "verified", "label": "farmdoc: elevated fall fertilizer benchmarks" },
    { "from": "ground", "to": "margin", "evidence": "verified", "label": "Named Dunklin Co. grower's own account" },
    { "from": "margin", "to": "switch", "evidence": "verified", "label": "Daniels: 'we've shifted acres to more soybeans'" },
    { "from": "margin", "to": "prepay", "evidence": "estimated", "label": "Tighter 2026 margin constrains 2027 input budget" },
    { "from": "switch", "to": "credit", "evidence": "hypothesis", "label": "Commodity-level credit attribution not yet provable" },
    { "from": "prepay", "to": "credit", "evidence": "hypothesis", "label": "Fall 2026 decisions not yet reflected in any disclosed filing" }
  ],
  "sourceLabel": "USDA AMS Grain Transportation Report (Sep 17, 2026); farmdoc daily (Aug 7, 2026); Brownfield Ag News interviews with Rance Daniels (Apr 7 and Jul 31, 2026); USDA NASS Crop Production (Sep 11, 2026); Farm Credit Southeast Missouri Q1/Q2 2026 Stockholder Reports. No scenario slider here on purpose — the two edges that would need a real driverGain (crop-mix-to-credit and prepay-to-credit) are exactly the ones public data can't yet support. Drag nodes, tap for sources."
}
```

A diagram makes this look tidy. Living it doesn't feel tidy at all — it feels like two bills arriving in the same mailbox, one for a crop that's still in the field and one for a crop that isn't planted yet, and a single checking account that has to cover both.

![Two identical-looking farm invoices sit side by side on a kitchen table, one stamped "2026 HARVEST FUEL" and one stamped "2027 FERTILIZER PREPAY," both circled in red pen by the same tired hand, captioned "TWO BILLS, ONE CHECKBOOK"](/assets/meme/bootheel-harvest-margin-input-fuel-2027-crop-2026-02.jpg)

## The Policy Lever That's Supposed to Help Arrives on a Different Clock Than the Cost Shock

USDA's Economic Research Service raised its 2026 net farm income forecast to $158.4 billion in September — $5 billion higher than its February read — helped along by a projected $47.4 billion in direct government farm payments, a roughly 70% jump over 2025. That's real money, and it's part of why the national headline reads better than the on-the-ground cost story does. ([USDA ERS — Farm Sector Income Forecast, updated Sep 3, 2026](https://www.ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast)) But total production expenses are forecast at $492.8 billion, up 4.5% — with fertilizer/lime/soil-conditioner spending alone up 15.3% to $39.6 billion and fuel/oil up 28.8% to $21.6 billion, both driven substantially by the same Iran-conflict energy and shipping disruption that's shown up in every Bootheel-adjacent investigation on this site this month.

That's the tension worth naming plainly: government payments are calculated and disbursed on an annual, after-the-fact cycle. Fall fertilizer prepay decisions get made now, in real time, against spot prices that don't wait for a farm-income forecast to catch up. A producer deciding this week whether to lock in 2027 nitrogen isn't pricing against $158.4 billion in national net farm income — he's pricing against whatever anhydrous costs at his local co-op today, with a payment that may or may not show up in his account before the invoice is due.

![A farmer holds a phone showing a headline "NET FARM INCOME UP $5 BILLION!" in one hand while staring at a fall prepay invoice with a much bigger, much more immediate number in the other, captioned "THE HEADLINE DOESN'T PAY THE INVOICE"](/assets/meme/bootheel-harvest-margin-input-fuel-2027-crop-2026-03.jpg)

## The Numbers So Far

```chart
{
  "type": "line",
  "title": "National diesel price, three dated 2026 readings",
  "labels": ["Early May 2026 (seasonal peak)", "Aug 7, 2026", "Sep 14, 2026 (record)"],
  "series": [{ "name": "$ per gallon, national average", "data": [5.50, 4.65, 6.285], "color": "#f2b134" }],
  "sourceLabel": "USDA AMS Grain Transportation Report (Sep 14, 2026 reading — record, 254.6 cents above the same week in 2025) and farmdoc daily (Aug 7, 2026 reading, and the ~$5.50/gal early-May peak it cites). Not a smooth trend — a volatile, record-setting move landing squarely on harvest."
}
```

```chart
{
  "type": "bar",
  "title": "Fall 2026 fertilizer benchmarks vs. a year earlier (national/Midwest)",
  "labels": ["Anhydrous ammonia", "DAP", "Potash"],
  "series": [{ "name": "YoY % change, Aug 2026 vs Aug 2025", "data": [16, 7, 2.5], "color": "#c9a227" }],
  "sourceLabel": "farmdoc daily, Aug 7, 2026: anhydrous $915.50/ton, DAP $912.22/ton, potash ~$500/ton. These are national/Midwest benchmark prices, not a Bootheel-specific quote — the actual local fall prepay price a Dunklin County producer sees isn't public, which is exactly the gap this investigation flags rather than fills with a guess."
}
```

```chart
{
  "type": "bar",
  "title": "One named Dunklin County grower's own reported cost increases, 2026 vs. 2025",
  "labels": ["Urea (low end, $/ton)", "Urea (high end, $/ton)", "Fuel ($/gal)"],
  "series": [{ "name": "Reported increase", "data": [300, 350, 1.50], "color": "#e07856" }],
  "sourceLabel": "Rance Daniels, Chairman of the Missouri Rice Council, farming rice and soybeans in southern Dunklin County, MO — quoted in Brownfield Ag News, Apr 7 and Jul 31, 2026. Different units shown together for scale (per-ton fertilizer vs. per-gallon fuel), not directly comparable — the point is that both are real, named, county-level numbers, not national extrapolations."
}
```

Three charts, three different jobs. The first shows the fuel shock is genuinely volatile and just set a record during harvest, not a one-time spike that already passed. The second shows the market a fall 2027 prepay decision gets priced against is elevated across all three major nutrients, most sharply on nitrogen. The third is the one that actually answers something local: a named Bootheel rice grower already lived through this math once in 2026, in writing, and moved acres because of it.

## Where This Is Happening

```map
{
  "title": "The two-season squeeze, county by county",
  "center": [36.4, -89.9],
  "zoom": 8,
  "markers": [
    { "lat": 36.2359, "lng": -90.0629, "label": "Kennett, MO — seat of Dunklin County, where Rance Daniels farms rice and soybeans and reported the cost increases in this article" },
    { "lat": 36.8834, "lng": -89.5878, "label": "Sikeston, MO — Farm Credit Southeast Missouri headquarters" },
    { "lat": 36.5875, "lng": -89.5265, "label": "New Madrid, MO — Mississippi River grain port, downstream freight point for the crop this cost shock is attached to" }
  ],
  "sourceLabel": "Public locations only — a county seat, a lender headquarters, and a river port, not individual farm sites. Dunklin, New Madrid, and the surrounding counties sit inside Farm Credit SEMO's 12-county territory."
}
```

## What a Named Bootheel Grower Actually Said, Twice, in Writing

This is the part of the investigation that kept it honest. In April 2026, Rance Daniels told Brownfield Ag News: "You let urea go up $250 to $300 and fuel go up $1.50 per gallon, it really puts it in the red. We've shifted acres to more soybeans." Three months later, in July, he was back on the record — this time as Chairman of the Missouri Rice Council, not just as a grower — with the gap even wider: urea "$300 to $350, a ton more expensive this year versus 2025," against a rice price that was "maybe a dollar more than last year." His own summary of that math: "The market is up a little, but not near the percentage that input costs have risen." ([Brownfield Ag News, Apr 7, 2026](https://www.brownfieldagnews.com/news/semo-farmer-cuts-rice-acres-as-fuel-fertilizer-costs-surge/); [Brownfield Ag News, Jul 31, 2026](https://www.brownfieldagnews.com/news/missouri-rice-farmer-higher-fertilizer-costs-outpace-gains-in-rice-prices/))

That's a real producer, named, in a Bootheel county, describing the exact mechanism this article is chasing — and he described it about the 2026 crop, before fall 2027 prepay pricing even entered the picture. Whatever number shows up on his fertilizer invoice this fall is layered on top of a season he's already on record calling "in the red."

![A grain elevator silhouette at dusk with a single lit office window, inside which a tiny figure re-reads the same two printed news quotes taped to the wall, red pen circling "in the red" twice, captioned "HE SAID IT TWICE. IN WRITING."](/assets/meme/bootheel-harvest-margin-input-fuel-2027-crop-2026-04.jpg)

One more honest caveat belongs here: MU Extension's Soybean Growth and Yield Report (Andres Reis, soybean farming systems specialist) flagged declining 2026 yield projections statewide as of Aug 19, 2026 — but the largest declines are concentrated in northern Missouri, not the Bootheel, and April-planted soybeans in central and southwest Missouri were still holding above-average yield potential as of that report. The Bootheel's own irrigation infrastructure — covered in our companion investigation into groundwater and pumping economics here — is part of why this region's yield risk this season reads differently than the state's. This article's cost pressure is real and county-verified; the yield-decline story making national soybean headlines this season is a different, mostly-northern-Missouri story, and conflating the two would misstate both.

## Methodology

This pass combined the USDA AMS Grain Transportation Report (Sep 17, 2026), USDA ERS's Farm Sector Income Forecast (Sep 3, 2026), USDA NASS Crop Production (Sep 11, 2026), farmdoc daily's Aug 7, 2026 fertilizer-and-fuel price roundup, two dated Brownfield Ag News interviews with a named Dunklin County grower, MU Extension's Soybean Growth and Yield Report reporting, and Farm Credit Southeast Missouri's own Q1/Q2 2026 stockholder filings (via our companion credit-stress investigation). It explicitly does not include: an actual local fall 2026 fertilizer prepay quote from a Bootheel co-op or input dealer, a producer-level working-capital or operating-line figure, a crop-specific breakeven or switch-threshold calculation for rice vs. soybeans vs. cotton vs. corn, or a third disclosed Farm Credit SEMO quarter (the association's most recent public filing still ends June 30, 2026 — before the September diesel record). MU Extension's own Southeast Missouri irrigated soybean planning budget (Publication G659) exists and is revised annually, but its per-acre cost tables weren't extractable from the source PDF during this research pass — that's a named gap to close on the next pass, not a number I'm willing to guess at.

## Moral of the Story

**If you're a Bootheel row-crop or rice producer**, the concrete thing to do this month isn't to wait for a clean answer — it's to ask your fertilizer dealer for an actual written fall 2027 prepay quote now, this week, and compare it line-by-line against what you paid a year ago. Rance Daniels already did the informal version of that math out loud; a written quote turns it into something you can actually plan a crop-mix decision around instead of a gut feeling.

**If you're a lender in this territory**, Farm Credit SEMO's own disclosed numbers only run through June 30 — before this diesel record and before fall prepay pricing. That makes the next quarterly filing genuinely informative in a way this one isn't yet: watch specifically for whether the classification trend accelerates, holds, or breaks, because that quarter is the first one structurally capable of showing this two-season effect.

**If you're an input dealer or co-op**, you're sitting on the one number that would actually resolve this article's open question — what you're quoting Bootheel growers for fall 2027 delivery, right now. Publishing even a range would do more to inform the region's crop-mix decisions this fall than another national forecast will.

**If you're just trying to understand why farm country doesn't feel as good as the national net-farm-income headline sounds**, this is the mechanism in miniature: a national income number calculated in arrears, sitting on top of a real-time, county-level cost shock that a named grower is already describing as pushing him into the red — twice, four months apart, in his own words.

![A calendar page for September with two overlapping circles — one labeled "FINISH 2026 HARVEST," one labeled "LOCK IN 2027 INPUTS" — both circled by the same red pen, overlapping in the middle where a tiny stressed farmer stands, captioned "WHERE THE TWO SEASONS COLLIDE"](/assets/meme/bootheel-harvest-margin-input-fuel-2027-crop-2026-05.jpg)

## Related Research

This investigation builds directly on [Diesel Just Hit $6.285. What Does That Actually Cost a Bootheel Farm?](/research-and-case-studies/bootheel-diesel-harvest-cost-2026), [Farm Credit SEMO's Crop Loan Stress Is Rising. What Is Driving It?](/research-and-case-studies/farm-credit-semo-crop-credit-stress-2026), and [Congress Just Made Rice More Profitable. So Why Are Bootheel Farmers Planting Less of It?](/research-and-case-studies/bootheel-rice-to-soybean-pivot) — the structured fields below (who we'd like to talk to, what we still need, our sources) carry the parts of this investigation that update independently of the write-up above.
