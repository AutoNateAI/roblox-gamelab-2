# Michigan Has a Billion-Pound Apple Crop. Can Storage and AI Protect Grower Margin?

## Short Answer

I grew up in Michigan, and "big apple crop" was always framed as good news — more fruit, more work, more money moving through West Michigan. What I actually found chasing this question is that the size and quality of this year's crop is almost beside the point. The number that decides whether a Michigan apple grower makes money in 2026 isn't bushels — it's what fraction of the wholesale price per box survives past labor cost before it reaches the farm. Right now, most of it doesn't. Status: **investigating** — the crop-quality story is well documented, but the packout-level and storage-occupancy numbers that would tell us exactly how much CA storage and AI sorting can actually claw back aren't public yet.

![A farmer holds up a giant crate of apples like a trophy in one hand and a tiny shrinking paycheck in the other](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-01.jpg)

## Why This Crop Landed on a Lake-Effect Coincidence, Not a Plan

West Michigan grows apples for a reason that has nothing to do with soil chemistry or subsidy design: Lake Michigan. The prevailing westerlies pick up heat and moisture off 22,000 square miles of open water and dump it back onto the strip of land running from Benton Harbor up through Grand Rapids to Traverse City — warming the ground in spring just enough to delay bud break past the worst frost risk, then cooling it in fall just enough to slow ripening into a long, even harvest window. That lake-effect strip is why Michigan, not Ohio or Indiana next door, became the country's second-largest apple state, and it's why "Fruit Ridge" — the row of townships just north of Grand Rapids where Riveridge Packing sits — became one of the most concentrated commercial-apple footprints in the country. None of that geography changed this year. What changed is everything downstream of the orchard.

![A cartoon Lake Michigan wearing a superhero cape blows wind onto an orchard while a tiny suited committee figure takes a bow at a podium for the credit](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-02.jpg)

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "crop", "label": "2026 Michigan Crop\n~25-30M bushels, early + high quality", "rank": 0, "detail": "USDA/NASS lists 1.05B lb (~25M bushels); Michigan Apple Committee says industry expects the crop to run above that; USApple's national report puts Michigan closer to 30M bushels. Either way it's close to Michigan's own 27.2M-bushel historical average, not a record-breaking outlier." },
    { "id": "oversupply", "label": "National Oversupply\n263M bu US crop, +6% YoY", "rank": 0, "detail": "USApple's 2026/27 national forecast: 263 million bushels, up 6% year-over-year, driven mainly by Washington State (~176M bushels). Wholesale traypack-box prices have fallen roughly 28% over three years." },
    { "id": "h2a", "label": "H-2A Wage Rule Change\nOct 2025 DOL rule", "rank": 0, "detail": "DOL's October 2025 Interim Final Rule changed how H-2A Adverse Effect Wage Rates are calculated. Michigan's 2026 rate: $13.73/hr entry-level, $16.15/hr experienced — a methodology change estimated to save Michigan employers ~$33M in the first half of FY2026 versus the old formula. It lowers the rate of increase; it does not lower labor's underlying share of the grower's price." },
    { "id": "harvest", "label": "Harvest & Routing Decision\n(the grower's call)", "rank": 1, "detail": "By variety and maturity: pick now vs. later, pre-sort, fresh-pack immediately, CA storage, or divert to processing." },
    { "id": "storage", "label": "CA Storage + AI Sorting\n(Riveridge and other packers)", "rank": 2, "detail": "Controlled-atmosphere storage plus optical/infrared sorting (color, defect detection, Brix) determines what share of stored fruit still grades into the fresh-market packout months later versus sliding into lower-value processing." },
    { "id": "price", "label": "Wholesale Price per Box\n~$26.50-29, down ~28-36% in 3 yrs", "rank": 3, "detail": "USApple: traypack box price fell from ~$40 to under $29 over three seasons, another ~8% in 2024/25 to roughly $26.50. That's the number storage/AI is trying to protect the grower's share of." },
    { "id": "labor_share", "label": "Labor Cost Share\nof wholesale price: ~60-70%", "rank": 3, "output": true, "baseline": 65, "format": "percent", "detail": "USApple VP of Insights Chris Gerlach: H-2A-related expenses now run 60-70% of the average wholesale price per box growers are paid — up from roughly 40% a decade ago. That's a different, and worse, denominator problem than storage or sorting technology can fix." },
    { "id": "return", "label": "Grower Net Return", "rank": 4, "detail": "Farm Credit East, May 2026: current pricing 'is not sustainable without changes in costs, pack-out, demand or supply.' A Crain's Grand Rapids analysis put a 45-acre Michigan apple farm's 2026 projected loss at $135,495; the Michigan Apple Committee's own retail-split example shows a retailer earning $1.06 on a $2.99 3-lb bag against $0.19 for the grower." }
  ],
  "edges": [
    { "from": "crop", "to": "harvest", "evidence": "verified", "label": "Early maturity, MSU reports varieties 11-24 days ahead of normal" },
    { "from": "oversupply", "to": "price", "evidence": "verified", "label": "USApple: 6% more national supply, 3-year price decline" },
    { "from": "h2a", "to": "labor_share", "evidence": "estimated", "label": "Slows labor-cost growth, doesn't reverse the share" },
    { "from": "harvest", "to": "storage", "evidence": "verified", "label": "Riveridge: CA storage + optical/infrared sorting" },
    { "from": "storage", "to": "price", "evidence": "estimated", "label": "Routing improves packout mix, doesn't set the box price" },
    { "from": "price", "to": "labor_share", "evidence": "verified", "label": "Same box price, growing labor-cost fraction" },
    { "from": "labor_share", "to": "return", "evidence": "verified", "label": "Farm Credit East + Crain's: costs now exceed returns" }
  ],
  "sourceLabel": "USApple 2026/27 national report (via FreshFruitPortal, Aug 2026); USApple VP Chris Gerlach on H-2A cost share (FreshFruitPortal, May 2026); Farm Credit East Apple Outlook (May 2026); Crain's Grand Rapids Business (2026); Michigan Apple Committee. Drag nodes to rearrange, pinch/scroll to zoom, tap a node for its source."
}
```

Every node on the right two-thirds of that diagram is a capital and information problem, not a production one. The crop is fine. What happens to the dollars after the crop is picked is the actual story.

![A glowing apple orchard wears a trophy ribbon reading Best Crop Ever while a filing cabinet labeled Margin burns next to it](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-03.jpg)

## The Policy Lever That's Actually Helping, and the One That Isn't Enough

Here's the tension this question turns on. In October 2025, the Department of Labor rewrote how it calculates H-2A Adverse Effect Wage Rates — moving from a single statewide farm-labor survey number to an occupational, skill-level-based system. For Michigan in 2026, that produced entry-level and experienced H-2A rates of $13.73 and $16.15 an hour, and MSU Extension estimates it will save Michigan growers roughly $33 million in the first half of fiscal year 2026 relative to what the old formula would have charged. That's a real, current, favorable policy signal — a genuine break in a labor-cost trend that had otherwise risen roughly 57-61% over the prior decade.

![A two-armed bureaucrat hands a grower a check labeled $33M saved while the other arm simultaneously snatches away a bigger stack labeled 65% labor share](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-04.jpg)

It is not, on its own, enough to fix the margin problem, and the data says so directly. USApple's own numbers show H-2A-related labor expense has grown from roughly 40% of the average wholesale price per box in 2013 to 60-70% of it in 2026 — a shift in *what share of the box price labor eats*, not just in the hourly wage. Slowing the rate of wage growth doesn't reverse a decade-long shift in that ratio, especially while the box price itself is falling. Two levers, both real, pointing in different directions: one is Washington easing the cost side, the other is national oversupply squeezing the revenue side at the same time.

```chart
{
  "type": "bar",
  "title": "Michigan's 2026 crop, in the context of its own history",
  "labels": ["2026 crop (USDA/NASS estimate)", "Michigan's historical average crop"],
  "series": [{ "name": "Million bushels", "data": [25, 27.2], "color": "#7fbf7f" }],
  "sourceLabel": "USDA/NASS 2026 estimate (1.05B lb ≈ 25M bushels) vs. the Michigan Apple Committee's own cited historical average of 27.2M bushels/year. The 'billion-pound crop' headline is real, but by Michigan's own history it's an ordinary-to-slightly-below-average year, not a record."
}
```

```chart
{
  "type": "line",
  "title": "Labor's share of the wholesale box price has nearly doubled in a decade",
  "labels": ["2013", "2026"],
  "series": [{ "name": "Labor cost as % of wholesale price/box", "data": [40, 65], "color": "#f2b134" }],
  "sourceLabel": "USApple VP of Insights Chris Gerlach, via FreshFruitPortal, May 28 2026: H-2A-related expenses now run 60-70% of average wholesale price/box, versus roughly 40% in 2013. 65% plotted as the midpoint of the cited 60-70% range, not a precise point estimate."
}
```

Storage and AI sorting live entirely on the left side of that second chart's problem — they can shift how much of a grower's fruit earns the fresh-pack price instead of the processing price, which matters, but they don't touch the line climbing underneath it.

## Where This Is Happening

```map
{
  "title": "Fruit Ridge and the lake-effect apple belt",
  "zoom": 7,
  "markers": [
    { "lat": 43.1662, "lng": -85.7042, "label": "Sparta, MI — Riveridge Packing, Fruit Ridge apple-growing district" },
    { "lat": 42.9634, "lng": -85.6681, "label": "Grand Rapids, MI — regional packing/distribution hub" },
    { "lat": 44.7631, "lng": -85.6206, "label": "Traverse City, MI — Northwest Michigan growing region" },
    { "lat": 42.1153, "lng": -86.4526, "label": "Benton Harbor, MI — Southwest Michigan growing region" }
  ],
  "sourceLabel": "Public geographic reference points for Michigan's lake-effect apple belt — Fruit Ridge (Sparta/Kent County), Southwest Michigan (Berrien/Van Buren), and Northwest Michigan (Grand Traverse), the three regions MSU Extension's statewide maturity reports track separately."
}
```

## The Ground Truth: A Real Farm's Numbers

This is the part that should end any "billion pounds must mean a good year" read of this crop. Crain's Grand Rapids Business reported that for a roughly 45-acre Michigan apple farm, 2026's combination of low wholesale pricing and high labor cost pencils out to a projected loss of $135,495 for the season. The Michigan Apple Committee's own retail-margin example, cited in that reporting, shows a retailer earning $1.06 on a $2.99, 3-pound bag of apples — while the grower who grew them earns $0.19. That split isn't a storage problem or an AI-sorting problem. It's a supply-chain-margin problem sitting downstream of everything Riveridge's packing line can touch.

![A retailer stacks a tall tower of gold coins labeled $1.06 next to a farmer holding a single tiny dull coin labeled $0.19, both looking at the same bag of apples](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-05.jpg)

## Methodology

This round pulled from USDA/NASS's 2026 Michigan overview, the Michigan Apple Committee's own August 2026 crop-quality release, MSU Extension's September 2 and September 10, 2026 statewide apple maturity reports (variety-by-variety starch/firmness/Brix/color data and CA storage thresholds), USApple's 2026/27 national crop and margin reporting via FreshFruitPortal, Farm Credit East's May 2026 Apple Outlook, GreenStone Farm Credit Services' own 2025 harvest commentary (used for its typical framing of grower cash-flow and storage strategy, clearly dated as 2025, not assumed current), Crain's Grand Rapids Business's 2026 reporting on grower losses, and MSU Extension's H-2A wage-rate reporting. It does not include 2026 CA-storage occupancy by facility, packout percentage by grade/variety for this specific crop, Riveridge's own throughput or AI-sorting ROI figures, or a direct conversation with a Michigan grower, packer, or GreenStone loan officer — those four gaps are the real next phase of this investigation, not an afterthought.

![A filing cabinet drawer labeled 2026 Packout Data sits empty except for a tumbleweed while a researcher peers in with a magnifying glass and a deadpan expression](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-06.jpg)

## Moral of the Story

**A big, high-quality crop is not the same thing as a profitable one, and in 2026 Michigan apple growers are living the gap between those two sentences in real dollars.** Storage and AI sorting are real tools — they move fruit toward the fresh-market packout instead of the processing bin, and that's worth real money at the margin — but they're solving a packout problem while the bigger problem is a price-and-labor-share problem sitting one layer above them.

![A grower at a poker table pushes apple-shaped chips labeled this season toward two face-up cards marked Packout Mix and Labor Share](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-07.jpg)

A few concrete moves that fall out of that:

- **If you're a grower**, don't let "the crop looks great" set your financial expectations for the season — run your own numbers against the Michigan Apple Committee's cited $0.19-per-3-lb-bag grower split and the 60-70% labor-cost-share figure before you commit to a storage-vs-processing call, and ask your packer directly what packout percentage they're actually seeing by variety this year, not last year.
- **If you're a lender (GreenStone or otherwise)**, the more useful 2026 renewal question isn't "how big is the crop" — it's "what's this grower's actual packout mix and their exposure to the wholesale-price decline," since Farm Credit East's own May 2026 outlook already says current pricing "is not sustainable without changes in costs, pack-out, demand or supply."
- **If you're a packer or the Michigan Apple Committee**, the AI/storage story is genuinely compelling, but publishing even a rough 2026 packout-by-variety or CA-occupancy number would do more to help growers plan than another crop-quality press release — that's the exact gap this investigation hit first.
- **If you're a policymaker watching H-2A**, the October 2025 AEWR methodology change is real relief on the rate of labor-cost growth, but it isn't reversing labor's climbing share of the box price — those are two different problems, and treating the first as a fix for the second is the mistake to avoid.

![A Michigan rural crossroads with four signposts reading Grower, Lender, Packer, and Policymaker, a single glowing apple sitting at the center of the intersection](/assets/meme/michigan-apple-storage-ai-packing-margin-2026-08.jpg)

## Related Research

The structured fields below this narrative — what got us asking this, who we'd like to talk to, what we still need, and our sources — carry the parts of this investigation that update independently of the write-up above.
