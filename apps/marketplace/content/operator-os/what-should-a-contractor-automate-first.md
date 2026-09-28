# What Should a Contractor Automate First: Lead Generation, Quoting, Dispatch, or Follow-Up?

## Short Answer

**Follow-up first. Then quoting. Then dispatch. Lead generation last.**

That's the opposite of what most contractors buy. Paid leads aren't cheap. LocalIQ's 2025 benchmarks put paid-search cost per lead at about **$128 for HVAC**, **$94 for electricians**, **$129 for plumbing**, and **$228 for roofing**. Pouring more of them into a shop that doesn't follow up is paying to fill a leaky bucket. The theory of constraints says to fix the step that limits the whole system. For most small shops that's follow-up: it's where paid-for leads and finished estimates quietly die. In our model, fixing follow-up adds about as many jobs as buying 25% more leads, and cuts cost per job by about 18% instead of leaving it flat.

## The Four Things You Could Automate

Every contractor's revenue moves through the same four stages:

1. **Lead generation:** getting the phone to ring (ads, SEO, lead services, referrals)
2. **Quoting:** turning a call into a site visit and a written estimate
3. **Dispatch:** getting the right tech to the right job at the right time
4. **Follow-up:** after the estimate, after the job, and before the next one

Software vendors will sell you automation for all four. And the loudest pitch is always for number one, because "more leads" is the thing every owner thinks they need.

Here's the problem with starting there.

![A cartoon contractor happily pouring water labeled 'LEADS' into a bucket full of holes labeled 'FOLLOW-UP'](/assets/meme/what-should-a-contractor-automate-first-01.jpg)

## Fix the Bottleneck, Not the Loudest Step

In 1984, Eliyahu Goldratt's business novel *The Goal* introduced the **theory of constraints**. Its core idea is simple: every system has one step that limits total output, and **"an hour lost at a bottleneck is an hour lost for the entire system,"** while an hour saved anywhere else barely matters.

Apply that to a contracting business:

```graph
{
  "title": "Where a typical small shop's revenue actually gets stuck",
  "nodes": [
    { "id": "lead", "label": "1. Lead Generation\n(~$94-$228 per paid lead)", "rank": 0, "detail": "LocalIQ 2025 home-services benchmarks (3,211 campaigns): cost per lead $127.74 HVAC, $93.69 electrical, $129.02 plumbing, $228.15 roofing." },
    { "id": "quote", "label": "2. Quoting\n(visit + estimate)", "rank": 1, "detail": "Speed and clarity matter here; the customer is usually getting other quotes." },
    { "id": "follow", "label": "4. Follow-Up\n(THE USUAL CONSTRAINT)", "rank": 2, "detail": "Where finished estimates and paid-for leads die quietly. See Q01 (capacity) and Q02 (cost of a missed estimate)." },
    { "id": "dispatch", "label": "3. Dispatch\n(scheduling + routing)", "rank": 3, "detail": "Critical at scale, but for 1-5 trucks it's rarely the limit on revenue." },
    { "id": "rev", "label": "Revenue", "rank": 4 }
  ],
  "edges": [
    { "from": "lead", "to": "quote", "evidence": "verified", "label": "you pay for every one" },
    { "from": "quote", "to": "follow", "evidence": "verified", "label": "conversions concentrate across repeated touches" },
    { "from": "follow", "to": "dispatch", "evidence": "hypothesis", "label": "leaks here for most owner-operators" },
    { "from": "dispatch", "to": "rev", "evidence": "estimated", "label": "" }
  ],
  "sourceLabel": "Stage order is the real-world sequence; follow-up is drawn where it bites (between estimate and scheduled job). The 'usual constraint' label is our hypothesis for small owner-operated shops, supported by the lead-response and follow-up research cited in Q01 and Q02. Your shop may differ, so find your own bottleneck."
}
```

For most owner-operated shops, the lead isn't where the money dies. It dies between "estimate sent" and "job booked," in the silence we covered in Q01 and Q02. Buying more leads doesn't fix that. It **feeds the leak.**

## The Math: More Leads vs. Better Follow-Up

Let's run the comparison with real ad costs and stated assumptions. **Assumptions** (swap in yours):

- An HVAC shop buys **50 paid leads a month** at LocalIQ's benchmark of **$127.74** each, about **$6,390/month**
- **60%** of leads turn into an estimate: **30 estimates**
- Estimates that get real follow-up close at **40%**; silent ones at **20%** (see Q02)
- Today the owner properly follows up on **60%** of estimates, so the blended close rate is **32%**

Now compare four scenarios:

| Scenario | Monthly ad spend | Estimates | Blended close rate | Jobs / month | Ad cost per job |
|---|---|---|---|---|---|
| Today | $6,390 | 30 | 32% | **9.6** | $666 |
| Buy 25% more leads | $7,985 | 37.5 | 32% | **12.0** | $665 |
| Fix follow-up (95% followed up) | $6,390 | 30 | 39% | **11.7** | $546 |
| Both | $7,985 | 37.5 | 39% | **14.6** | $547 |

```chart
{
  "type": "bar",
  "title": "Jobs per month: buying leads vs. fixing follow-up (model)",
  "labels": ["Today", "+25% paid leads", "Fix follow-up", "Both"],
  "series": [
    { "name": "Jobs per month", "data": [9.6, 12.0, 11.7, 14.6] }
  ],
  "sourceLabel": "AutoNateAI model. Cost per lead $127.74 (LocalIQ 2025 home-services benchmark, Air Conditioning Installation & Repair). Assumptions: 60% lead-to-estimate, 40% close with follow-up vs. 20% without, 60% vs. 95% of estimates followed up. Not measured shop data."
}
```

```chart
{
  "type": "bar",
  "title": "Ad cost per booked job (model)",
  "labels": ["Today", "+25% paid leads", "Fix follow-up", "Both"],
  "series": [
    { "name": "Ad spend per job ($)", "data": [666, 665, 546, 547] }
  ],
  "sourceLabel": "Same model as above. Buying more leads adds jobs at the same cost per job. Fixing follow-up adds a similar number of jobs and makes every lead you already buy about 18% cheaper per booked job."
}
```

Read that twice. **Buying 25% more leads and fixing follow-up add almost the same number of jobs.** But one costs an extra ~$1,600 a month in ads forever, and the other makes every lead you *already* pay for about **18% cheaper** per booked job. And once follow-up is fixed, *then* more leads are worth buying, because they're no longer landing in a leaky bucket.

![A cartoon buff follow-up gear beating a pile of ad money at arm wrestling](/assets/meme/what-should-a-contractor-automate-first-02.jpg)

## Why Quoting Is Second

Once follow-up stops leaking, the next constraint is usually **how fast and how well** you turn a visit into a written estimate.

Automating quoting doesn't mean a robot sets your prices. It means:

- the site-visit notes you *said out loud* in the truck become a draft estimate
- good-better-best options come from templates you already trust
- the estimate goes out the **same day**, not after the weekend
- the customer's actual concern ("it's too loud," "we're worried about financing") shows up in the proposal

Faster, clearer quotes win more of the jobs you're already competing for. That matters more now that ad conversion is getting harder. LocalIQ found conversion rates **fell for 10 of 16 home-services categories** in its 2025 data, down about **15%** year over year on average. Every lead is getting more expensive to earn. You can't afford to lose them after the estimate.

## Why Dispatch Is Third

Dispatch and routing automation is transformative at scale. UPS's ORION routing system evaluates more than 200,000 ways to run a single route and saves about **100 million miles** and **10 million gallons of fuel a year**. That's real, and at 50 trucks it's worth serious money.

At 1 to 5 trucks, though, the owner usually *is* a pretty good dispatcher. The savings are real but smaller: a few miles here, a tighter window there. Dispatch becomes the constraint when you're adding trucks faster than you can coordinate them. Until then, it's usually not what's capping revenue.

## Why Lead Generation Is Last

Not because leads don't matter. Because **lead generation is the one step you can always buy later, at a known price,** and it's the only step that gets *more* expensive when the rest of your system is broken. Fix follow-up and quoting first, and every dollar of lead spend after that works harder. It's also the step where the "automation" is often just someone else's ad platform, which you don't need an operating system for.

The exception: if you're genuinely out of leads (phone not ringing, calendar empty), then lead generation *is* your constraint. Goldratt would tell you to fix that first. Just be honest about which problem you have. Most owners who say "I need more leads" have unanswered voicemails from last week.

![A cartoon contractor surrounded by ringing phones and unopened voicemails, holding a sign that says 'need more leads'](/assets/meme/what-should-a-contractor-automate-first-03.jpg)

## What Automating Follow-Up Actually Looks Like

In an Operator OS, "automating follow-up" isn't a drip campaign that texts everyone the same thing. It's:

1. **Every open estimate has a clock and a next touch.** The cockpit shows estimates by age and dollar value, oldest and biggest first.
2. **Touches are drafted in context.** Your AI knows what the customer cared about, because you said it after the visit, and drafts a specific message for you to approve.
3. **Follow-ups land in your day,** as two-minute tasks in a time block, not as a guilt pile.
4. **Post-job follow-up is included:** a thank-you, a review ask, and a maintenance-plan offer, scheduled automatically when a job closes. That's where the long-term value from Q02 lives.
5. **Everything stops when it should:** when they book, decline, or opt out.

Once that's running, quoting automation plugs into the same memory. Then dispatch. Then, if you still want them, more leads, into a system that actually keeps them.

## Run Your Own Numbers

Find your constraint in five minutes. Pull last month's numbers:

| Stage | Your number | Warning sign |
|---|---|---|
| Leads received | | Fewer than your crew could handle → lead gen may be your constraint |
| Leads that got an estimate | | Under ~60% → response speed or quoting is leaking |
| Estimates with 2+ follow-ups | | Under ~80% → **follow-up is your constraint** |
| Estimates closed | | Low close rate even with follow-up → quoting quality |
| Jobs delayed by scheduling | | Frequent → dispatch |

The first row where you hit the warning sign is where to automate first. For most small shops, it's the third row.

![A cartoon detective pointing a magnifying glass at the third row of a checklist on a clipboard, which glows red](/assets/meme/what-should-a-contractor-automate-first-04.jpg)

## What the Research Doesn't Tell Us

The cost-per-lead and conversion figures come from LocalIQ's own benchmark data for campaigns it managed. They're real market numbers, but they're one vendor's sample. The 40%/20% close rates and the 60% follow-up rate are assumptions carried over from Q02, not measured industry figures. There's no published study ranking automation priorities for small contracting businesses. The recommended order comes from applying the theory of constraints to the research on lead decay and follow-up. Your own numbers should decide.

## Moral of the Story

1. **Before you spend another dollar on leads,** count how many of last month's estimates got fewer than two follow-ups. If it's more than a handful, that's your first project.
2. **Calculate your ad cost per booked job,** not per lead. It's the number that tells you whether follow-up or leads are the real problem.
3. **Set a same-day estimate rule.** Even without software, getting quotes out the day of the visit is the cheapest quoting upgrade there is.
4. **Leave dispatch alone until you're adding trucks.** If you're 1 to 3 trucks and you can see everyone's day in your head, routing software isn't your constraint yet.
5. **Want to find your real bottleneck?** Book a discovery call. We'll walk your numbers stage by stage and tell you straight what to automate first, even if the answer isn't us.

## Sources

- [LocalIQ — 2025 Search Ad Benchmarks for Home Services (3,211 campaigns, Apr 2024–Mar 2025)](https://localiq.com/blog/home-services-search-advertising-benchmarks/)
- [WordStream — Google Ads Benchmarks 2025](https://www.wordstream.com/blog/2025-google-ads-benchmarks)
- Goldratt, Eliyahu M. — *The Goal* (1984)
- [INFORMS / ORMS Today — "'ORION' delivers success for UPS" (2016)](https://pubsonline.informs.org/do/10.1287/orms.2016.03.10/full/)
- [BSR — Looking Under the Hood: ORION Technology Adoption at UPS](https://www.bsr.org/en/case-studies/center-for-technology-and-sustainability-orion-technology-ups)
