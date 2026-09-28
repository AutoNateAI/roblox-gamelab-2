# How Many Leads Can a Contractor Realistically Manage Before Follow-Up Starts Breaking?

## Short Answer

For an owner-operator running follow-up out of their phone and their head, the break usually starts somewhere around **20 to 25 new leads a month**. That's not because you stop caring. It's two ceilings stacked on top of each other: the few hours a week you really have for callbacks, and the roughly four open loops a human brain can juggle at once. The leads don't get turned down. They just sit there until they go cold, and the research on how fast leads go cold is brutal. Past that point more hustle won't fix it, because the problem isn't effort. It's architecture.

## Tuesday, 8:47 PM, Driveway

You're still in the truck. The engine's off and the phone isn't.

There's a voicemail from Monday about a water heater. A text from a number you don't have saved: "hey is this the AC guy, can you come look at it this week?" A web form someone filled out Saturday that you've read twice and answered zero times. Two estimates you sent last week and haven't heard back on. You meant to check in Friday, and Friday turned into a no-heat call and a supply-house run. Plus the lady from church who asked about a panel upgrade, and all you wrote down is "panel, church, Linda?"

None of these are *lost*. You know every one of them. That's the trap. They all feel handled, because they all live somewhere: in your call log, your texts, your email, your memory. But nothing moves any of them forward unless you personally pick it up, remember what was said, and decide what to do next.

So the honest question isn't "how many leads can I get?" It's **how many can I keep warm by myself before some of them start quietly dying?**

![A contractor in a truck cab at night surrounded by floating phone notifications](/assets/meme/contractor-lead-capacity-follow-up-breaking-point-01.jpg)

## Where a Lead Actually Goes

Let's follow one lead through a typical small shop. I'll use HVAC, but electricians, plumbers, roofers, and remodelers run the same shape.

```graph
{
  "title": "Where a lead actually goes in a one-truck to five-truck shop",
  "nodes": [
    { "id": "in", "label": "Call / Text /\nWeb Form", "rank": 0, "detail": "Inbound arrives on whatever channel the customer picked. A 2016 study of 85 small businesses found 62% of calls went unanswered live (37.8% to voicemail, 24.3% no response at all)." },
    { "id": "owner", "label": "Owner's Phone\n+ Memory", "rank": 1, "detail": "In most small shops this is the whole CRM: call log, text threads, inbox, and whatever the owner remembers from the job site." },
    { "id": "callback", "label": "Callback /\nSchedule Visit", "rank": 2, "detail": "Speed matters most here. HBR (2011): responding within an hour made firms ~7x likelier to qualify a lead than waiting longer." },
    { "id": "quote", "label": "Estimate Sent", "rank": 3, "detail": "The job is now a document waiting on a decision, and the customer is usually getting other quotes." },
    { "id": "follow", "label": "Follow-Up Touches", "rank": 4, "detail": "Velocify's multi-million-lead study found 93% of converted leads were reached by the 6th call attempt. Most small shops stop after one." },
    { "id": "won", "label": "Won Job", "rank": 5 },
    { "id": "cold", "label": "Went Cold\n(never rejected)", "rank": 5, "detail": "The lead that didn't say no. It just stopped hearing from you." }
  ],
  "edges": [
    { "from": "in", "to": "owner", "evidence": "verified", "label": "62% of calls not answered live (2016, n=85)" },
    { "from": "owner", "to": "callback", "evidence": "verified", "label": "Response speed drives contact + qualification" },
    { "from": "callback", "to": "quote", "evidence": "estimated", "label": "Visit + estimate" },
    { "from": "quote", "to": "follow", "evidence": "verified", "label": "Conversions concentrate in touches 1-6" },
    { "from": "follow", "to": "won", "evidence": "estimated", "label": "Touch kept alive" },
    { "from": "follow", "to": "cold", "evidence": "hypothesis", "label": "Owner capacity runs out" }
  ],
  "sourceLabel": "Flow drawn from typical owner-operator service businesses. Numbers on edges come from the studies cited in Sources: Oldroyd et al. HBR 2011, Velocify 'Ultimate Contact Strategy', 411 Locals 2016. The 'went cold' edge is our hypothesis about the mechanism, not a measured rate."
}
```

Look at the second row. Every lead goes through the same single node, and that node is you. You're the answering service, the scheduler, the estimator, and the follow-up department, and you're usually doing all four from a job site.

That's not a character flaw. It's a design. And the design has a capacity limit you can calculate.

## The Math Nobody Invoices You For

### Ceiling #1: the clock

Speed and persistence are where most of the money is. The research is old, and I'll tell you how old, but it has held up:

- **Speed.** In a 2011 *Harvard Business Review* study of 1.25 million leads at 42 companies, firms that responded within an hour were nearly **7 times** more likely to qualify the lead than firms that waited even one hour longer. They were more than **60 times** as likely as firms that waited 24 hours or more. An earlier MIT/InsideSales study (2007, ~15,000 web leads) found the odds of *reaching* a lead dropped about **100x** between a 5-minute callback and a 30-minute one.
- **Persistence.** Velocify analyzed millions of leads (circa 2013) and found **93% of converted leads had been reached by the sixth call attempt**. Its best-performing cadence was about six calls and five emails spread over roughly two weeks.
- **Reality.** In the same HBR audit of 2,241 companies, only **37%** answered a lead within an hour. **23% never responded at all.**

Those studies are mostly about web leads for sales teams, not a guy with a van. But the mechanism carries over: the customer with a dead AC calls three companies, and the first one who calls back and shows up tends to win. The fair takeaway isn't "respond in exactly 5 minutes." It's that **the value of a lead decays by the hour, and conversions come from repeated touches**. Both cost owner time.

```chart
{
  "type": "bar",
  "title": "How fast 2,241 U.S. companies responded to a web lead",
  "labels": ["Within 1 hour", "1–24 hours", "More than 24 hours", "Never responded"],
  "series": [{ "name": "Share of companies audited", "data": [37, 16, 24, 23] }],
  "sourceLabel": "Oldroyd, McElheran & Elkington, 'The Short Life of Online Sales Leads,' Harvard Business Review, March 2011. Web leads across industries, not trade-specific; shown for the shape of the problem, not as a contractor benchmark."
}
```

Now do the arithmetic for a small shop. These are **my assumptions, stated so you can swap in yours**:

- Each lead needs about **8 touches** from first contact to a decision: callback, scheduling, estimate delivery, and around five follow-ups on the quote. That's roughly the Velocify cadence applied to a service job.
- Each touch costs about **4 minutes** once you count finding the thread, remembering the context, calling, and leaving a note somewhere.
- That's about **32 minutes per lead**, or roughly **7.4 minutes a week for every lead you take per month**.

Most owner-operators I talk to can protect about **3 hours a week** for callbacks and follow-up, between jobs and after dinner. Here's where those lines cross:

```chart
{
  "type": "line",
  "title": "Weekly follow-up hours required vs. what an owner actually has",
  "labels": ["10", "20", "30", "40", "60", "80"],
  "series": [
    { "name": "Hours needed per week (8 touches × 4 min per lead)", "data": [1.2, 2.5, 3.7, 4.9, 7.4, 9.9] },
    { "name": "Hours an owner can realistically protect", "data": [3, 3, 3, 3, 3, 3] }
  ],
  "sourceLabel": "AutoNateAI model, not measured data. X-axis: new leads per month. Assumptions: 8 touches per lead, 4 minutes per touch, 4.33 weeks/month, 3 protected hours/week. Change any assumption and the crossover moves. The shape doesn't."
}
```

The lines cross at about **24 leads a month**. Beyond that, something has to give, and it's never the no-heat emergency. It's the fourth follow-up on the $9,000 system replacement.

![A cartoon plumber sprinting between six ringing phones while a clock melts](/assets/meme/contractor-lead-capacity-follow-up-breaking-point-02.jpg)

### Ceiling #2: your head

The clock is the ceiling you can see. The one you can't see arrives first.

Cognitive psychologist Nelson Cowan's widely cited 2001 review put the capacity of working memory, the stuff you're holding "live" in your head, at about **four chunks**, not the "seven, plus or minus two" people quote. Four.

If each lead stays open for about two weeks, then at 20 leads a month you're carrying about **10 live threads** at any moment. Each has its own details (who, what system, what you promised, when). You can't hold ten. You hold the loudest four, and the other six fall to whatever you remember at 8:47 PM in the driveway.

Then add interruptions. In a 2008 study at UC Irvine, Gloria Mark's team found that interrupted people finished their work *faster*, and paid for it with measurably more stress, frustration, and time pressure. That's the owner-operator's whole day. You don't get slower. You get more fried, and the things that slip are the ones with no alarm attached. Follow-up never has an alarm.

So the practical breaking point often comes **before** the time math says it should. Many owners feel it around **15 to 20 leads a month**. That's the point where "I'll remember" stops being true, even though there were technically enough hours.

## "Just Answer the Phone More" Isn't the Fix

The usual advice is an answering service, a better CRM, or more discipline.

An answering service helps with ceiling #1's first minute. It does nothing for touches two through eight. A CRM gives you a place to write things down, but you still have to remember to open it, type into it, and decide what to do. For a lot of owners it becomes a very expensive place to feel guilty. Discipline works right up until the week with three emergency calls.

And the stakes are real. The widely repeated line that "62% of calls to small businesses go unanswered" comes from one 2016 study of 85 businesses by a marketing firm, 411 Locals. It's directional, not gospel. But it's consistent with what every busy contractor already knows: when you're on a roof, you're not on the phone.

There are also a lot of you carrying this alone. The SBA's Office of Advocacy counts about **36 million small businesses** in the U.S., and **82%** of them have no employees at all. For most of the trades, the follow-up department is one person.

## What Changes When the Business Remembers

Here's the design change. You don't get a new app to babysit. The job of *remembering* moves out of your head and into a system you talk to.

With an Operator OS, that driveway moment goes like this:

1. **You talk, it writes.** Still in the truck, you tell ChatGPT or Claude: *"Linda from church wants a quote on a panel upgrade. Older house, probably 100 amp. Call her Thursday."* The system creates the person, the job, and the Thursday task in your business's structured memory. No form, no fields.
2. **Every lead gets a clock.** Every open lead has an age and a next touch. Your cockpit shows a follow-up queue sorted by what's about to go cold, not by who yelled loudest. The Monday voicemail you forgot is sitting at the top in amber.
3. **Agents draft, you approve.** For the two quotes with no reply, the system drafts a short, specific follow-up text in your voice ("Checking in on the 3-ton system quote. Happy to walk through financing if that helps"). You tap send or edit it. Touch four stops depending on whether you remembered.
4. **The day plans itself.** Tomorrow morning the system has already routed the six follow-ups that matter into a 30-minute block before your first job, instead of scattering them across your evening.

The number that changes isn't your hours. It's the **minutes per touch**. When the context is already there and the message is already drafted, a touch drops from about 4 minutes to about 1. And the memory ceiling mostly disappears, because you're not holding ten threads anymore. The graph is holding them.

![A calm contractor sipping coffee while a glowing emerald dashboard sorts leads into neat rows](/assets/meme/contractor-lead-capacity-follow-up-breaking-point-03.jpg)

## Run Your Own Numbers

Same model, two scenarios. Swap in your own numbers. The point is to see how much each assumption moves the break.

| | Running it from your phone | With an Operator OS |
|---|---|---|
| Touches per lead | 8 | 8 (same persistence, not less) |
| Minutes per touch | 4 | ~1 (context + draft ready) |
| Minutes per lead | 32 | ~8 |
| Protected follow-up time | 3 hrs/week | 3 hrs/week |
| **Leads/month before follow-up breaks** | **~24** | **~97** |
| Live threads you hold in your head | ~12 at 24 leads | ~0 (the graph holds them) |

Now put money on it. Say you get **40 leads a month** and close **30%** of the ones you follow up properly, on a **$6,500** average ticket. Under the phone model, your time covers about 24 of those 40. If the other 16 get one touch instead of a real sequence, and that cuts their close rate in half, you're leaving about **2 to 3 jobs a month** on the table. That's somewhere around **$15,000 to $20,000 a month** in work that never said no.

Those are illustrative numbers, not a promise. Do it with yours: **(leads per month − leads your time covers) × close rate × average ticket × how much the close rate drops without follow-up.** Most owners have never done this math, because the lost jobs never show up anywhere. They're not rejections. They're silence.

![A cartoon roofer staring at a very long receipt that says 'jobs you never heard back from'](/assets/meme/contractor-lead-capacity-follow-up-breaking-point-04.jpg)

## What the Research Doesn't Tell Us

There's no good public study of follow-up capacity specifically for HVAC, electrical, or plumbing shops. The speed and persistence research is mostly web leads and sales teams, and some of it is 10 to 15 years old. The missed-call figure is one small vendor study. The "24 leads a month" break point is a model with its assumptions in plain view, not a measurement. If you run a shop and want to test it against your real numbers, I'd love to see what you find.

## Moral of the Story

1. **Tonight, count the silence.** Scroll your calls, texts, and email for the last 30 days. Count every lead that got fewer than three touches. That's your follow-up ceiling, in your own handwriting.
2. **Time one touch.** Tomorrow, time how long a single follow-up takes, from "who was that again?" to message sent. If it's over three minutes, most of that is context-hunting, and context-hunting is the part a system removes.
3. **Give every open lead an age.** Even on paper: write the date next to each open lead. The ones over 7 days old are your money on the table.
4. **Stop buying leads until you can keep the ones you have.** If you're past about 20 a month and follow-up is already slipping, more leads just means more silence.
5. **If this was your driveway,** that's exactly what the discovery call is for. We'll look at where your leads live today and tell you straight whether an Operator OS would move your break point.

## Sources

- [Harvard Business Review — "The Short Life of Online Sales Leads," Oldroyd, McElheran & Elkington (2011)](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)
- [MIT / InsideSales.com — Lead Response Management Study, executive summary (2007)](https://www.onecavo.com/wp-content/uploads/2015/11/MIT-InsideSales.com_Lead-Response-Management.pdf)
- [Velocify — "The Ultimate Contact Strategy" sales optimization study (c. 2013)](https://appexchange.salesforce.com/partners/servlet/servlet.FileDownload?file=00P3000000P3dgaEAB)
- [411 Locals — "SMBs Don't Answer 62% of Phone Calls" (2016, 85 businesses)](https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/)
- [Cowan — "The Magical Number 4 in Short-Term Memory," Behavioral and Brain Sciences (2001)](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/44023F1147D4A1D44BDC0AD226838496/S0140525X01003922a.pdf/the-magical-number-4-in-short-term-memory-a-reconsideration-of-mental-storage-capacity.pdf)
- [Mark, Gudith & Klocke — "The Cost of Interrupted Work: More Speed and Stress," CHI (2008)](https://ics.uci.edu/~gmark/chi08-mark.pdf)
- [SBA Office of Advocacy — 2025 Small Business Profile, United States](https://advocacy.sba.gov/wp-content/uploads/2025/06/United_States_2025-State-Profile.pdf)
