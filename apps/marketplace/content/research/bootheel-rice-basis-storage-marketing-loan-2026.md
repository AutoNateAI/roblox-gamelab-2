# Missouri Rice Is Harvested. Should Bootheel Farmers Sell Now or Finance Time?

## Short Answer

I went into this expecting a basis story and came out with a units story. Dunklin County rice farmer and Missouri Rice Council chair Rance Daniels told Brownfield Ag News he's only moved about 20% of his crop, at cash prices in the "low sixes," and that he'd feel comfortable selling more around $6.75. Quoted that way, next to USDA's $7.70-per-hundredweight loan rate, it reads like his cash price is below the government's floor. It isn't — he's quoting dollars per bushel, the loan rate is dollars per hundredweight, and once you convert those onto the same footing, his price is already running *above* the loan rate, not below it. That changes what this decision actually is. It's still **investigating**, not answered, because the number that would actually settle it — a real Bootheel mill bid and a real local storage cost — isn't published anywhere I can find. But I can tell you exactly what waiting costs in financing terms, and it's a lot cheaper than the basis gap Daniels is holding out for.

![A farmer frantically does math on a calculator between a green $6.75/bushel sign and a red $7.70/cwt sign](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-01.jpg)

## Why This Decision Even Has This Shape

The reason a Bootheel farmer in 2026 can choose to *not* sell at harvest — can put rice in a bin and wait for a better number instead of dumping the whole crop into whatever the market offers in September — traces back to a very specific piece of Depression-era plumbing. President Franklin Roosevelt created the Commodity Credit Corporation by executive order in October 1933, with a mandate to make low-interest loans against stored crops so farmers weren't forced to sell everything at once into a collapsed harvest-time market. The loans were structured as **nonrecourse**: a farmer could put up the stored grain as collateral, take the cash, and if the market price never recovered above the loan rate, simply forfeit the grain to the government instead of repaying — no penalty, no debt follows them. That mechanism, reauthorized farm bill after farm bill, is the direct ancestor of the Marketing Assistance Loan Rance Daniels could take out on his 2026 crop right now. Ninety-plus years later, the problem it solves hasn't changed: harvest floods the market with grain at exactly the moment prices are weakest, and someone has to be able to afford to wait. ([EBSCO Research Starters — Roosevelt Creates the Commodity Credit Corporation](https://www.ebsco.com/research-starters/history/roosevelt-creates-commodity-credit-corporation/); [farmdoc daily — Historical Background on Marketing Assistance Loans](https://farmdocdaily.illinois.edu/2017/06/farm-bill-review-historical-background-marketing.html))

## How This Connects

```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "harvest", "label": "Harvested Rough Rice\n(Dunklin County, 2026)", "rank": 0, "detail": "Rance Daniels, Missouri Rice Council chair: average yields on his own operation, only about 20% of the crop marketed as of mid-September 2026." },
    { "id": "decision", "label": "Sell Now, or\nFinance the Wait", "rank": 1, "detail": "The actual decision every rice grower is making right now, at the same moment, for the same reason — harvest doesn't wait for a good price." },
    { "id": "cash", "label": "Cash Sale\n~$6.00–$6.75/bu\n(≈ $13.3–$15.0/cwt)", "rank": 2, "detail": "Daniels quotes his price in dollars per bushel, the way row-crop grain is usually quoted locally. Converted at the standard 45 lb rough-rice bushel (13% moisture, University of Arkansas Extension), that's roughly $13.3–$15.0/cwt — already above, not below, the MAL loan rate." },
    { "id": "finance", "label": "MAL / Operating-Credit\nStorage\n$7.70/cwt loan · 5.25% APR", "rank": 2, "detail": "Missouri's 2026 rough-rice Marketing Assistance Loan rate is $7.70/cwt, available through May 31, 2027. FSA's direct operating loan rate for September 2026 is 5.25% — that's the real financing-cost anchor behind the slider below." },
    { "id": "carry", "label": "Interest Cost\nof Waiting", "rank": 3, "output": true, "baseline": 0, "driverInput": "months", "driverGain": 0.033688, "detail": "Financing interest only, on the $7.70/cwt MAL principal at FSA's actual 5.25% September rate — does not include storage rent, drying, shrink or quality-loss risk, none of which is published for the Bootheel yet." },
    { "id": "basis_gap", "label": "Gap to Daniels'\nComfort Price\n≈ $1.7/cwt equivalent", "rank": 3, "detail": "The difference between his current cash-equivalent price and his stated $6.75/bu comfort level, in cwt terms — roughly $1.7/cwt, more than six times the 8-month financing-interest cost alone." },
    { "id": "mill", "label": "Local Mills /\nElevators", "rank": 4, "detail": "Where basis is actually set — Daniels' own read is that basis widened because 'the futures had outrun the mill market price,' and has narrowed some since. No public Bootheel-specific mill bid sheet exists to verify by how much." },
    { "id": "market", "label": "Export & Domestic\nMilling Demand", "rank": 4, "detail": "USDA's 2026/27 season-average farm price forecast is $14.90/cwt, up from $12.50/cwt in 2025/26 — a real, cited, national anchor, not a Bootheel-specific one." }
  ],
  "edges": [
    { "from": "harvest", "to": "decision", "evidence": "verified", "label": "Daniels: avg. yields, ~20% marketed" },
    { "from": "decision", "to": "cash", "evidence": "estimated", "label": "Sell into the current bid" },
    { "from": "decision", "to": "finance", "evidence": "estimated", "label": "Store and finance the wait" },
    { "from": "finance", "to": "carry", "evidence": "verified", "label": "FSA 5.25% Sept 2026 rate × $7.70/cwt principal" },
    { "from": "cash", "to": "basis_gap", "evidence": "estimated", "label": "Author's bu→cwt conversion, not an official figure" },
    { "from": "cash", "to": "mill", "evidence": "verified", "label": "\"Futures had outrun the mill market price\" — Daniels" },
    { "from": "mill", "to": "market", "evidence": "estimated", "label": "Local basis tracks national/export demand with a lag" }
  ],
  "sourceLabel": "Brownfield Ag News (Rance Daniels interview); USDA FSA Sept 2026 lending rates and 2026 MAL rates; USDA rice season-average price forecast. Carry-cost slider uses only the verified FSA rate and MAL principal — drag nodes to rearrange, tap a node for its source."
}
```

Six months of financing interest on the loan alone is real money, but it's not the thing standing between Daniels and a sale. The gap between his current price and his comfort price is roughly six times larger than the interest cost of waiting for it. That's the actual finding here: the Marketing Assistance Loan isn't functioning as a price floor this year — cash is trading well above it — it's functioning as cheap time. The real bet a Bootheel rice grower is making right now isn't "can I afford to wait," it's "will the basis actually narrow before I run out of reasons to keep waiting."

![A tiny coin labeled interest cost sits next to a towering stack of coins labeled basis gap on a wildly tipped balance scale](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-02.jpg)

## Two Government Rice Numbers That Are Not the Same Number

This is the part worth being explicit about, because it's an easy thing to blur if you're not looking closely. In the same 2026 season, USDA has published two very different "rice numbers" that both get called "the government's rice price" in casual conversation, and they do completely different jobs:

- The **Price Loss Coverage (PLC) reference price**, raised 20.7% to $16.90/cwt by the One Big Beautiful Bill Act (enacted July 2025), is a *safety-net trigger* — it determines whether growers get a payment at the end of the marketing year if the season-average price falls short, and it has nothing to do with what a mill will pay a farmer in September. (See our companion piece on the [Bootheel rice-to-soybean pivot](/research-and-case-studies/bootheel-rice-to-soybean-pivot) for the full policy picture there.)
- The **Marketing Assistance Loan rate**, set at $7.70/cwt for Missouri's 2026 rough rice, is a *financing tool* — a nonrecourse loan a grower can take against stored grain, repay with interest if the price comes back, or forfeit the grain against if it doesn't. It's not a forecast, a target, or a recommendation. ([USDA FSA — 2026 Marketing Assistance Loan Rates for Wheat, Feed Grains, Oilseeds and Rice](https://www.fsa.usda.gov/news-events/news/04-08-2026/usda-announces-2026-marketing-assistance-loan-rates-wheat-feed-grains))

Neither of those two numbers is "what rice is worth" — and neither one is what's actually driving Daniels' decision. What's driving it is a third, much more local number nobody publishes: the mill bid in front of him today, and whether it's closer to $6.00 or $6.75.

![Two government-mascot wrestlers made of grain sacks, one belted PLC and one belted MAL, square off while a confused farmer referee holds up both their arms](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-03.jpg)

## The Numbers So Far

```chart
{
  "type": "bar",
  "title": "Daniels' quoted price, converted to the loan rate's own units",
  "labels": ["2026 MAL loan rate ($7.70/cwt)", "Current cash, converted (~$13.3/cwt)", "Comfort level, converted (~$15.0/cwt)", "USDA 2026/27 season-average forecast ($14.90/cwt)"],
  "series": [{ "name": "$ per cwt", "data": [7.70, 13.33, 15.00, 14.90], "color": "#7fbf7f" }],
  "sourceLabel": "MAL rate and USDA season-average forecast are official USDA figures. The two middle bars are this piece's own conversion of Daniels' $6.00 and $6.75 per-bushel quotes (Brownfield Ag News) at the standard 45 lb rough-rice bushel — not an officially published cwt figure for his operation specifically. Note how close the converted comfort price lands to USDA's own national forecast."
}
```

That third bar landing almost exactly on USDA's own $14.90/cwt national forecast isn't something I engineered — it fell out of the unit conversion. It's also consistent with a separate, independent data point from the same week: the Arkansas Farm Bureau's September 18, 2026 market brief put Mid-South rice basis at "near $1/cwt under the board" against November futures pushing toward $16/cwt — which nets out to almost exactly the same $15/cwt Daniels is holding out for. Two unrelated sources, one Missouri farmer quote and one regional futures-and-basis report, converge on the same number from different directions. That's about as close to triangulated as public data gets you on a figure nobody publishes directly for the Bootheel. ([Arkansas Farm Bureau — Market Briefs, September 18, 2026](https://www.arfb.com/news/2026/sep/18/market-briefs-september-18-2026/))

```chart
{
  "type": "bar",
  "title": "What's actually getting more expensive to hold grain, nationally",
  "labels": ["Fuel & oil (+28.8%)", "Fertilizer & lime (+15.3%)", "Marketing/storage/transport (+12%)", "Interest expense (+2.8%)"],
  "series": [{ "name": "YoY change, 2026 vs 2025", "data": [28.8, 15.3, 12.0, 2.8], "color": "#f2b134" }],
  "sourceLabel": "USDA ERS 2026 Farm Sector Income Forecast, national production-expense categories — not Bootheel- or rice-specific. Shown to illustrate that the general cost climate around holding inventory is rising faster than interest rates alone would suggest, even though no county-level Bootheel storage-cost figure exists to plug in directly."
}
```

National marketing, storage, and transportation expense is up 12% year over year — a real signal that the general cost of holding grain is climbing, even without a Bootheel-specific number to attach it to. Production expenses overall are forecast at $492.8 billion for 2026, up 4.5%, against a farm sector debt load USDA now puts at $605.1 billion, up 4.6%. Net farm income is projected down 5.5% after inflation. None of that tells Rance Daniels what to do with this year's rice. All of it says the room for error on a bad carry decision is smaller than it was a couple of years ago. ([USDA ERS — Farm Sector Income Forecast](https://ers.usda.gov/topics/farm-economy/farm-sector-income-finances/farm-sector-income-forecast))

## Where This Is Happening

```map
{
  "title": "Dunklin County and the rice-milling geography around it",
  "zoom": 8,
  "markers": [
    { "lat": 36.2395, "lng": -90.0562, "label": "Kennett, MO — Dunklin County seat, Rance Daniels' home county" },
    { "lat": 36.5595, "lng": -89.9679, "label": "Malden, MO — Dunklin County grain-handling town" },
    { "lat": 35.8423, "lng": -90.7043, "label": "Jonesboro, AR — regional rice-milling hub (Riceland Foods operates a major mill here)" }
  ],
  "sourceLabel": "Public geographic reference points. No county-level Bootheel rice-mill bid data is publicly available — this map shows where the physical milling infrastructure that sets basis actually sits, not a price surface."
}
```

## On the Record, Right Now

The most useful sentence in this whole investigation isn't a USDA figure — it's Daniels describing the mechanism in his own words: "the futures had outrun the mill market price," which is exactly why basis went wide, and why it's since narrowed "some." That's a working rice farmer, in real time, diagnosing a basis move the way a trader would — futures ran ahead of what mills were actually willing to pay for physical grain, and the gap between those two things is the entire decision. It's also, notably, not a story about the water table, drought, or anything happening in the field. This year's rice-marketing decision in the Bootheel is a pure financial-markets story wearing a harvest costume. ([Brownfield Ag News — Missouri rice farmer holds off on sales as basis remains wide](https://www.brownfieldagnews.com/news/missouri-rice-farmer-holds-off-on-sales-as-basis-remains-wide/))

![A sprinting stock-ticker-candlestick character labeled Futures celebrates crossing a finish line while a grain-silo character labeled Mill Price lags behind](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-04.jpg)

## Methodology

This round pulled from USDA FSA's official 2026 Marketing Assistance Loan rate announcement and September 2026 lending-rate announcement, USDA ERS's farm sector income and production-expense forecast, USDA's rice season-average price forecast as reported by agricultural trade press, Brownfield Ag News' direct interview with Rance Daniels, the Arkansas Farm Bureau's weekly market brief, the Missouri Rice Council's own organizational page, and University of Arkansas Extension's rice moisture/weight standards (used only for the bushel-to-hundredweight conversion, not as a Missouri-specific figure). It does not include an actual current Bootheel mill bid sheet, a documented local storage/drying rate, a forward basis curve by month, or a direct interview beyond the one Brownfield already published — those four gaps are exactly what the dossier flagged as missing going in, and they're still missing coming out. The bushel-to-cwt price conversion is this piece's own calculation from a published weight standard, not an officially reported figure for Daniels' operation specifically, and is labeled that way everywhere it appears above.

![An overstuffed filing cabinet labeled USDA press releases sits next to one tiny crying empty folder labeled Bootheel mill bid sheet](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-05.jpg)

## Moral of the Story

**If you're waiting on rice because the price feels wrong, check whether you're actually comparing it to the right number in the right units first — Daniels' own math shows that mistake alone can make a fair price look like a bad one.**

![A farmer at a kitchen table has a lightbulb moment pointing at a napkin covered in bushel-to-hundredweight unit-conversion math](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-06.jpg)

A few concrete moves that fall out of that:

- **If you grow rice and you're holding for basis**, the financing cost of waiting through the MAL's full window — call your local FSA office and confirm your county's exact rate, since it moves monthly — is a real but genuinely small number next to a basis gap this wide. Don't let "I can't afford to wait" talk you out of a position when the actual math says you can afford it for cheap; the harder, honest question is whether the basis gap is actually going to close before next year's crop forces the decision again.
- **If you're a lender**, the useful renewal-season question isn't "did you sell yet" — it's "what mill bid, in what units, are you actually comparing your MAL rate against," because this piece found that confusion sitting right out in a farmer's own public quote. A borrower doing that math wrong in either direction is a borrower making the wrong call on when to release collateral.
- **If you're USA Rice, the Missouri Rice Council, or a county Extension office**, the single highest-leverage thing you could publish this fall is a plain-language, weekly, Bootheel-specific mill bid and basis number in both $/bu and $/cwt side by side. Nothing else in this piece required original data collection — that one number did, and its absence is the entire reason this stays "investigating."
- **If you're a mill or elevator operator**, Daniels' own account — that basis widened because futures outran the mill market, then narrowed "some" — is a real-time signal worth tracking against your own book. If growers across the region are reading basis the same way he is, storage utilization this fall is a leading indicator worth watching before county acreage data ever catches up to it.

![A grain elevator manager stands proudly in front of a chalkboard where a messy dollars-per-bushel line and a dollars-per-cwt line are now circled together with a check mark](/assets/meme/bootheel-rice-basis-storage-marketing-loan-2026-07.jpg)

None of this is instructions. It's the actual math behind a decision a real Bootheel farmer is making this week, laid out in one place, in units that match.

## Related Research

The structured fields below this narrative — what got us asking this, who we'd like to talk to, what we still need, and our sources — carry the parts of this investigation that update independently of the write-up above. See also our companion pieces on the [Bootheel rice-to-soybean pivot](/research-and-case-studies/bootheel-rice-to-soybean-pivot) and [Farm Credit SEMO's crop-credit stress](/research-and-case-studies/farm-credit-semo-crop-credit-stress-2026) for the wider Bootheel financial picture this decision sits inside.
