# How Much Owner Attention Is Your Current Software Stack Consuming Every Week?

## Short Answer

Probably **8 to 12 hours a week**, and almost none of it shows up anywhere you'd look. It hides in small pieces: reorienting every time you switch apps, re-entering the same information in two places, hunting for "where did we leave it?", reconciling tools that disagree, and the focus you lose each time a notification pulls you off a task. Research on each of these is solid. People toggle between apps about 1,200 times a day. The average time on one screen before shifting has fallen to about **47 seconds**. And unfinished tasks leave "attention residue" that makes the next task worse. Add it up for an owner-operator and you get a part-time job nobody hired for. Priced at the median wage for a general manager, that's roughly **$20,000 to $30,000 a year** in owner time, before counting a single missed job.

## The Invoice You Never Get

Your software sends you bills. The CRM is $89 a month. The scheduling app is $49. The invoicing tool, the texting platform, the review tool, the spreadsheet add-on. You know those numbers.

The bigger bill never comes. It's paid in:

- the ninety seconds it takes to remember which app has the customer's address
- the Sunday night spent making the CRM match reality
- the estimate you almost forgot because the reminder was in a different app than the estimate
- the focus that evaporates every time your phone buzzes with a notification from one of seven tools
- the low hum of *"I know I'm forgetting something"* that follows you into dinner

This is the last question in our fourteen-question series, and it's the one that ties them together. Every earlier question (follow-up capacity, missed estimates, CRM overhead, meeting leakage, chat versus cockpit) is a slice of the same bill: **how much of the owner's attention the business's tools consume just to keep themselves running.**

![A cartoon owner opening a giant invoice envelope that reads 'ATTENTION: 11 HOURS, PAST DUE'](/assets/meme/how-much-owner-attention-your-software-stack-consumes-every-week-01.jpg)

## What the Research Says About Where Attention Goes

**Toggling.** A 2022 *Harvard Business Review* study tracked 137 workers at three Fortune 500 companies. They switched between applications about **1,200 times a day**, and the reorienting added up to **just under four hours a week**, about **9%** of work time.

**Shrinking focus.** UC Irvine's Gloria Mark has measured how long people stay on a single screen before switching, across studies spanning two decades. It fell from about **2.5 minutes in 2004** to **75 seconds in 2012** to about **47 seconds** in recent measurements.

```chart
{
  "type": "line",
  "title": "Average time on one screen before switching attention",
  "labels": ["2004", "2012", "Recent studies"],
  "series": [{ "name": "Seconds", "data": [150, 75, 47] }],
  "sourceLabel": "Gloria Mark (UC Irvine), as summarized in Attention Span (2023) and UC Irvine's coverage of her research. Knowledge workers observed in their normal work, not small-business owners specifically."
}
```

**Attention residue.** In a 2009 study in *Organizational Behavior and Human Decision Processes*, Sophie Leroy showed that when people switch away from an **unfinished** task, part of their attention stays stuck on it, and they perform worse on the next one. That's worst when the first task was time-pressured. That describes an owner's day precisely: dozens of half-finished loops (the unanswered estimate, the unlogged call, the reminder in the other app), each quietly taxing whatever you're doing now.

**Work about work.** Asana's surveys of knowledge workers found **58%** of the day going to "work about work": chasing status, searching for information, switching tools. Salesforce found sales reps spend about **60%** of their time on non-selling tasks, and **42%** feel overwhelmed by too many tools.

None of those studies measured small-business owners. That's the honest limit. But every mechanism they describe gets *stronger* in a small business, where one person is sales, dispatch, billing, and customer service, and every tool's notifications land on the same phone.

![A cartoon brain wearing a hard hat with dozens of sticky notes stuck to it, each saying 'unfinished', slowing it down like weights](/assets/meme/how-much-owner-attention-your-software-stack-consumes-every-week-02.jpg)

## Where Your Week Actually Goes

Here's how the drains stack up for an owner-operator:

```graph
{
  "title": "Where owner attention leaks in a disconnected software stack",
  "nodes": [
    { "id": "stack", "label": "Your Software Stack\n(5-8 tools, no shared memory)", "rank": 0 },
    { "id": "toggle", "label": "Toggling +\nReorienting", "rank": 1, "detail": "HBR 2022: ~1,200 app switches a day, just under 4 hours a week reorienting (Fortune 500 workers)." },
    { "id": "reentry", "label": "Re-entry +\nReconciliation", "rank": 1, "detail": "Typing the same facts into two tools, then fixing them when they disagree (see Q03)." },
    { "id": "lookup", "label": "Context Hunting", "rank": 1, "detail": "'Where did we leave it with them?' across texts, inbox, CRM, and memory." },
    { "id": "notif", "label": "Interruptions +\nResidue", "rank": 1, "detail": "Leroy 2009: unfinished tasks leave attention residue that hurts the next task. Mark: average screen focus now about 47 seconds." },
    { "id": "owner", "label": "Owner Attention\n(the scarcest resource)", "rank": 2 },
    { "id": "left", "label": "What's Left for\nJudgment, Relationships,\nand the Actual Work", "rank": 3 }
  ],
  "edges": [
    { "from": "stack", "to": "toggle", "evidence": "verified", "label": "" },
    { "from": "stack", "to": "reentry", "evidence": "estimated", "label": "" },
    { "from": "stack", "to": "lookup", "evidence": "estimated", "label": "" },
    { "from": "stack", "to": "notif", "evidence": "verified", "label": "" },
    { "from": "toggle", "to": "owner", "evidence": "verified", "label": "~9% of work time (HBR)" },
    { "from": "reentry", "to": "owner", "evidence": "estimated", "label": "" },
    { "from": "lookup", "to": "owner", "evidence": "estimated", "label": "" },
    { "from": "notif", "to": "owner", "evidence": "verified", "label": "residue degrades the next task" },
    { "from": "owner", "to": "left", "evidence": "hypothesis", "label": "what remains" }
  ],
  "sourceLabel": "Verified edges cite HBR 2022 (toggling), Leroy 2009 (attention residue), and Mark (screen attention). Estimated edges are mechanisms observed in small businesses and quantified in the model below, not measured in a published study."
}
```

## Run Your Own Numbers

Here's a model for an owner working about **50 hours a week** with a typical 5-to-8-tool stack. **Every number is an assumption**. Fill in your own in the right-hand column.

| Drain | How it's estimated | Model | Yours |
|---|---|---|---|
| Toggling and reorienting | ~9% of work time (HBR 2022), applied to 50 hrs | 4.5 hrs | |
| Re-entry and reconciliation | Double entry (~40 min) + weekly catch-up (~45 min), from Q03 | 1.5 hrs | |
| Context hunting | ~6 "where did we leave it?" lookups/day × ~2 min × 5 days | 1.0 hr | |
| Follow-up overhead | Finding context before each follow-up (Q01's 4-min touch, ~3 min of it hunting), ~30 touches/week | 1.5 hrs | |
| Interruption recovery | ~3 real interruptions/day × ~10 min of lost focus × 5 days | 2.5 hrs | |
| **Total attention tax** | | **~11 hrs/week** | |

Eleven hours is more than **one full workday every week**. That's about **22%** of a 50-hour week spent keeping the tools running rather than running the business.

Now put a price on it. The Bureau of Labor Statistics puts the median wage for **general and operations managers** at **$105,770** (May 2025), about **$51 an hour**. That's a conservative stand-in for what an owner's hour is worth.

```chart
{
  "type": "bar",
  "title": "Annual value of owner hours lost to the software stack (model)",
  "labels": ["6 hrs/week", "8 hrs/week", "11 hrs/week (model)", "14 hrs/week"],
  "series": [{ "name": "Annual cost at ~$51/hour, 50 weeks ($)", "data": [15300, 20400, 28050, 35700] }],
  "sourceLabel": "AutoNateAI model. Hourly value derived from the BLS median annual wage for general and operations managers ($105,770, May 2025) ÷ 2,080 hours ≈ $51/hour; 50 working weeks. Excludes revenue lost to missed follow-ups (see Q01, Q02), which is usually larger."
}
```

**$20,000 to $30,000 a year** in owner time, and that's the *small* number. It doesn't include the estimates that went quiet (Q02), the leads past your follow-up ceiling (Q01), or the meeting commitments that leaked (Q08). Those are usually bigger, and they're caused by the same thing: attention spent maintaining tools instead of working relationships.

![A cartoon owner watching dollar bills float away from a laptop surrounded by eight app icons, each with a tiny drain pipe](/assets/meme/how-much-owner-attention-your-software-stack-consumes-every-week-03.jpg)

## What Getting It Back Looks Like

You don't get attention back by using your tools harder. You get it back by removing the reasons the drains exist:

- **Toggling drops** when there are two places to go, a conversation to change things and a cockpit to see them, instead of eight (Q11, Q12).
- **Re-entry disappears** when talking *is* the data entry. You say it once and it's written to one memory (Q03).
- **Context hunting ends** when every person, job, and promise already has its history attached (Q06, Q07).
- **Follow-up overhead shrinks** when touches are scheduled and drafted in context, so you approve instead of reconstruct (Q01, Q10).
- **Attention residue eases** when open loops live in the system instead of in your head. You can let go of an unfinished task because you *know* it'll resurface on Thursday at 9:30 (Q08).

That's the Operator OS in one sentence: **the business remembers so the owner doesn't have to.** The attention you get back goes where only you can put it: judgment, relationships, and the work itself.

![A cartoon owner fishing peacefully off a dock on a weekday afternoon while a glowing cockpit on a tablet beside him shows everything on track](/assets/meme/how-much-owner-attention-your-software-stack-consumes-every-week-04.jpg)

## What the Research Doesn't Tell Us

The toggling, focus, and work-about-work findings come from corporate knowledge workers, and two are vendor surveys. Leroy's attention-residue work is lab-based. The 11-hour total is a model built from those findings plus assumptions about owner-operator workflows, not a measurement of real small businesses. The dollar figure uses a manager's median wage as a stand-in for owner time, and yours may be worth more or less. We'd much rather measure your actual number than estimate it, which is why the discovery call starts there.

## Moral of the Story

1. **Run the table above with your real numbers tonight.** Most owners have never seen their attention tax written down, and it's usually bigger than their software bill by a factor of ten or more.
2. **Count your notifications for one day.** Every app that pings you is billing you in focus. Turn off everything that isn't a customer or a crew member.
3. **Close loops before you switch.** Leroy's research says leaving a task unfinished taxes the next one. Even a 20-second note ("left voicemail, try Thursday") lets your brain put it down.
4. **Price your hour honestly,** then ask whether an operating system that returns even half of that tax is worth it. At $51 an hour, five hours a week is about $12,750 a year.
5. **This is question fourteen of fourteen.** If you recognized your business in any of them, book a discovery call. We'll measure your attention tax, show you AutoNateAI's own cockpit running live, and tell you straight whether an Operator OS would give you your week back.

## Sources

- [Harvard Business Review — Murty, Dadlani & Das, "How Much Time and Energy Do We Waste Toggling Between Applications?" (2022)](https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications)
- [UC Irvine — "Regaining Focus in a World of Digital Distractions" (Gloria Mark, 2023)](https://ics.uci.edu/2023/01/26/regaining-focus-in-a-world-of-digital-distractions/)
- [Gloria Mark — Attention Span (2023)](https://gloriamark.com/attention-span/)
- [Leroy — "Why Is It So Hard to Do My Work? The Challenge of Attention Residue When Switching Between Work Tasks," OBHDP 109(2) (2009)](https://ideas.repec.org/a/eee/jobhdp/v109y2009i2p168-181.html)
- [Asana — Anatomy of Work Global Index 2023](https://investors.asana.com/news-releases/news-release-details/asana-anatomy-work-global-index-2023-smart-collaboration-and)
- [Salesforce — Sales Statistics from the State of Sales report](https://www.salesforce.com/sales/state-of-sales/sales-statistics/)
- [U.S. Bureau of Labor Statistics — Top Executives (general and operations managers), Occupational Outlook Handbook](https://www.bls.gov/ooh/management/top-executives.htm)
