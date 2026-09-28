# What Does One Missed Estimate Actually Cost an HVAC or Electrical Contractor?

## Short Answer

An HVAC replacement estimate that never gets followed up doesn't cost you one job. On reasonable assumptions it costs about **$2,900 in expected revenue**, and closer to **$5,800** if the lead never got an estimate at all. That counts the install, the repairs, the maintenance plan, and the referral that customer would likely have sent you. For electricians, a missed panel-upgrade estimate runs closer to **$800**, or about **$1,700** if the lead never got quoted at all. It compounds in a different way: the panel is the doorway to the EV charger, the generator, and the remodel. Multiply by how many estimates a month get sent and then quietly forgotten. That's the number that should keep you up. Not the one lost job you remember.

## The Estimate Sitting in the Truck

You did everything right. You showed up on time, diagnosed the 19-year-old system, walked the homeowner through good-better-best, and left a clean quote. They said, "Let us talk it over."

That was eleven days ago.

Since then there's been a heat wave, two no-cool calls, a warranty headache, and a Saturday you promised your kid. The quote is in your sent folder. The homeowner is in your head somewhere between "should call" and "probably went with someone else." And here's the part nobody says out loud: **you'll never find out.** A missed estimate doesn't send a rejection letter. It just turns into a house on your route that has somebody else's truck in the driveway next summer.

Most owners count that as one lost job. It's not. The math below says why.

![A cartoon HVAC tech's estimate clipboard gathering dust and cobwebs on a truck dashboard](/assets/meme/cost-of-one-missed-estimate-hvac-electrical-contractor-01.jpg)

## What Actually Walks Out the Door

A replacement customer isn't a transaction. They're the start of a relationship that, if it's handled well, pays for itself for a decade or more. Here's the chain that breaks when an estimate goes quiet:

```graph
{
  "title": "What one un-followed estimate takes with it",
  "nodes": [
    { "id": "est", "label": "Estimate Sent,\nNever Followed Up", "rank": 0, "detail": "The homeowner is usually collecting multiple quotes. Silence from you reads as disinterest." },
    { "id": "install", "label": "The Install\n(~$10,000)", "rank": 1, "detail": "Carrier lists full HVAC replacements from about $3,000 to more than $15,000; central AC $3,000-$15,000; gas furnace $3,800-$12,000. $10,000 is our planning midpoint, not a quote." },
    { "id": "plan", "label": "Maintenance\nPlan", "rank": 2, "detail": "Recurring visits that keep you in the house every year." },
    { "id": "repair", "label": "Repairs Over\nthe System's Life", "rank": 2, "detail": "Carrier puts central AC and furnace lifespans at roughly 15-20 years (heat pumps 10-15). Every service call in that window tends to go to whoever installed it." },
    { "id": "review", "label": "Review +\nReferral", "rank": 2, "detail": "Nielsen (2015): 83% of respondents trust recommendations from friends and family. BrightLocal (2025): only 3% of consumers say they never read online reviews." },
    { "id": "next", "label": "The Next\nReplacement", "rank": 3, "detail": "15-20 years out, but the customer who trusts you calls you first." }
  ],
  "edges": [
    { "from": "est", "to": "install", "evidence": "estimated", "label": "Close odds drop without follow-up" },
    { "from": "install", "to": "plan", "evidence": "estimated", "label": "Plan attach at install" },
    { "from": "install", "to": "repair", "evidence": "verified", "label": "15-20 yr equipment life (Carrier)" },
    { "from": "install", "to": "review", "evidence": "verified", "label": "Word of mouth is the most trusted channel" },
    { "from": "plan", "to": "next", "evidence": "hypothesis", "label": "Relationship → next job" },
    { "from": "review", "to": "next", "evidence": "hypothesis", "label": "Referrals compound" }
  ],
  "sourceLabel": "Equipment cost ranges: Carrier. Lifespan: Carrier. Trust figures: Nielsen Global Trust in Advertising 2015, BrightLocal Local Consumer Review Survey 2025. Dotted edges are our reasoning about how the relationship compounds, not measured rates."
}
```

Every node below the first is money that never gets written down as lost. Your P&L shows jobs you did. It has no line for jobs that evaporated.

## Pricing the Hidden Tax

I couldn't find an independent, public study that measures the lifetime value of a residential HVAC customer. Plenty of vendors publish numbers, and they range wildly. So instead of borrowing one, here's a model with every assumption in plain view. **Swap in your own numbers. That's the point.**

### The value of one won replacement customer

| Piece | Assumption | Expected value |
|---|---|---|
| The install | $10,000 ticket (Carrier's range runs ~$3K to $15K+) | $10,000 |
| Repairs over the next ~10 years | ~$200/year average | $2,000 |
| Maintenance plan | 30% sign up, $200/year for 10 years | $600 |
| Referral | 1 in 3 happy installs sends one, which you close 60% of the time | $2,000 |
| **Total** | | **~$14,600** |

That's revenue, not profit. I'm not pretending to know your margins. And I'm not counting the next replacement 15 to 20 years out, because discounting a job that far away is guesswork dressed up as math.

```chart
{
  "type": "bar",
  "title": "Where one replacement customer's value comes from (model)",
  "labels": ["Install", "Repairs (10 yrs)", "Referral (expected)", "Maintenance plan (expected)"],
  "series": [{ "name": "Expected revenue ($)", "data": [10000, 2000, 2000, 600] }],
  "sourceLabel": "AutoNateAI model with stated assumptions: $10K install (planning midpoint within Carrier's published ranges), $200/yr repairs, 30% plan attach at $200/yr, 1-in-3 referral closed at 60%. Revenue, not margin. Plug in your own numbers."
}
```

### What "missed" does to the odds

Industry groups and coaching networks commonly report in-home replacement close rates somewhere around **30% to 50%**, and higher for emergency replacements. That's a reported range, not a controlled study. Call it **40%** for a followed-up estimate.

Now the assumption that matters most: what happens to your odds when nobody follows up? Nobody publishes this cleanly for the trades. Q01's research on sales leads says conversions concentrate across repeated touches, and a homeowner comparing quotes will often go with whoever stays in contact. So I'll assume a silent estimate closes at **half the rate: 20%**.

- **Un-followed estimate:** (40% − 20%) × $14,600 ≈ **$2,900** in expected revenue lost
- **Lead that never got an estimate** (unreturned call, no visit): 40% × $14,600 ≈ **$5,800**

![A cartoon homeowner happily shaking hands with a rival contractor while the original tech watches through a window](/assets/meme/cost-of-one-missed-estimate-hvac-electrical-contractor-02.jpg)

### Electricians: smaller ticket, longer tail

A 100-to-200-amp panel upgrade runs about **$1,300 to $3,000** for most homeowners, according to This Old House (updated March 2026). On its face that's a smaller miss. Call it **$2,200** at the same 40% vs. 20% close odds, which is about **$440** of expected install revenue.

But in 2026 the panel is the front door. It's frequently the prerequisite for an EV charger, a heat pump, a generator transfer switch, solar, or a kitchen remodel. If one in two panel customers comes back for $2,000 to $4,000 of follow-on work within a few years (my assumption; test it against your own history), and one in three sends a referral, a won panel customer is worth about **$4,100**, not $2,200. At the same odds, an un-followed panel estimate costs about **$830** in expected revenue, and a lead that never got quoted costs about **$1,650**. That's why electricians who treat panels as one-off tickets are underpricing their own follow-up.

```chart
{
  "type": "bar",
  "title": "Expected revenue lost per un-followed estimate (model)",
  "labels": ["HVAC: un-followed estimate", "HVAC: lead never estimated", "Panel: un-followed (install only)", "Panel: un-followed (with follow-on work)", "Panel: lead never estimated"],
  "series": [{ "name": "Expected revenue lost ($)", "data": [2920, 5840, 440, 830, 1650] }],
  "sourceLabel": "AutoNateAI model. Close odds 40% followed-up vs. 20% un-followed (assumption; no public trade-specific study found). HVAC value $14,600 per won customer (table above). Panel $2,200 (This Old House range $1,300-$3,000) plus assumed 50% chance of ~$3,000 follow-on work and a 1-in-3 referral closed at 60% (~$4,140 per won customer)."
}
```

## Now Multiply It

One missed estimate is an annoyance. The pattern is the problem.

Say your shop sends **30 replacement estimates a month**, and in a busy season **one in four** never gets a real follow-up. That's not laziness. That's July. That's **7 or 8 estimates** a month at about $2,900 each, or roughly **$20,000 to $22,000 a month in expected revenue** that never shows up as a loss anywhere. Over a four-month cooling season, that's the price of a new truck. Maybe two.

A quick word on stats you'll see online: "44% of salespeople give up after one follow-up" and "80% of sales require five follow-ups" get repeated everywhere. I went looking for the original research behind them and couldn't find any. So they're not in this article, and I'd be careful with anyone who builds a pitch on them.

![A cartoon electrician calculator exploding with dollar signs while he holds a single estimate](/assets/meme/cost-of-one-missed-estimate-hvac-electrical-contractor-03.jpg)

## What Changes When the Estimate Has a Memory

The fix isn't "be more disciplined in July." Nobody is. The fix is making sure an estimate can't go quiet without the system noticing.

In an Operator OS, an estimate isn't a PDF in your sent folder. It's a live object in your business's memory, attached to the person, the house, the system you quoted, and what they said at the kitchen table.

1. **You tell it once.** Walking back to the truck: *"Sent the Hendersons a quote. 3-ton heat pump, good-better-best, they're leaning middle option but worried about financing. Wife works from home, wants it quiet."* That's now stored with the estimate.
2. **The follow-up sequence schedules itself.** Day 2, day 5, day 10, day 21. Each touch lands in your daily timebox as a two-minute task instead of a vague guilt.
3. **Your AI drafts in context.** Day 5's message isn't "just checking in." It's *"Wanted to follow up on the heat pump. The middle option is the one with the quieter variable-speed compressor, and there's a 0% financing option if that helps."* You approve it or edit it.
4. **The cockpit shows the pipeline by age.** An "estimates aging" view shows every open quote by days since sent and dollar value. The eleven-day-old $12,000 heat pump is glowing amber at the top, not buried in a folder.
5. **Wins and losses teach the system.** When a quote closes or dies, you say why in one sentence. After a season you know your real close rate by job type, which follow-up day tends to land, and what the silence was actually costing you.

![A cartoon cockpit screen with estimate cards lined up by age, the oldest one glowing amber like a warning light](/assets/meme/cost-of-one-missed-estimate-hvac-electrical-contractor-04.jpg)

## Run Your Own Numbers

Five inputs. Fill them in on the back of an invoice:

1. **Estimates sent last month:** ____
2. **How many got fewer than two follow-ups:** ____
3. **Your average ticket for that job type:** ____
4. **Your close rate on estimates you *did* follow up:** ____
5. **What a customer is worth after the first job** (repairs, plan, referrals; be honest, not hopeful): ____

**Monthly leak ≈ (#2) × (#4 × 0.5) × (#3 + #5)**

The 0.5 is my assumption that silence cuts your close rate in half. If you think silence is worse than that, use a bigger number. Most owners who do this math land somewhere between "that's a salary" and "that's a second location."

## What the Research Doesn't Tell Us

There's no independent, public dataset on residential HVAC or electrical customer lifetime value, or on exactly how much follow-up lifts close rates in the trades. The close-rate range comes from industry networks and coaching groups, not a controlled study. The customer-value table and the "silence halves your odds" assumption are models, labeled as such. Your own job history is a better dataset than anything published, and that's exactly the data most shops can't see because it's scattered across a phone, a sent folder, and a memory.

## Moral of the Story

1. **Pull last month's estimates tonight.** Every one that's still open and older than 7 days gets a real, specific follow-up tomorrow morning. Not "just checking in." Mention the thing they cared about.
2. **Write the kitchen-table note.** Before you leave every estimate, record one sentence about what the homeowner is worried about. That sentence is your follow-up script.
3. **Put a date on every quote's second touch** before you pull out of the driveway. If it's not scheduled, it's not happening in July.
4. **Know your two numbers:** your close rate on followed-up estimates vs. silent ones. If you can't find them, that's the finding.
5. **Electricians: stop pricing the panel alone.** Track which panel customers come back for chargers, generators, and heat pumps. That's your real ticket.
6. **If this cost you a truck last summer,** book a discovery call. We'll look at how estimates move through your shop today and whether an Operator OS would close the gap.

## Sources

- [Carrier — HVAC Replacement Cost: System Pricing & Installation Guide](https://www.carrier.com/us/en/residential/hvac-resources/hvac-replacement-cost/)
- [This Old House — What Is the Cost to Upgrade an Electrical Panel? (updated March 2026)](https://www.thisoldhouse.com/electrical/cost-to-upgrade-electrical-panel)
- [Carrier — How Long Do HVAC Systems Last?](https://www.carrier.com/us/en/residential/hvac-resources/how-long-do-hvac-systems-last/)
- [Nielsen — Global Trust in Advertising (2015)](https://www.nielsen.com/insights/2015/global-trust-in-advertising-2015/)
- [BrightLocal — Local Consumer Review Survey (2025)](https://www.brightlocal.com/research/local-consumer-review-survey-2025/)
- [MarginPlug — HVAC close rate benchmarks, summarizing Service Roundtable and Nexstar Network ranges (2025)](https://marginplug.com/blog/hvac-close-rate-benchmarks/)
- [Harvard Business Review — "The Short Life of Online Sales Leads" (2011)](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)
