# What Information Should Your AI Know Before It Recommends Your Next Sales Action?

## Short Answer

Before an AI can tell you who to call next, it needs **seven kinds of context**:

1. **Who's who** in your world
2. **What's been said** to each of them
3. **Where each opportunity stands**
4. **What you're trying to hit**
5. **What you can actually do this week**
6. **What each kind of job is worth**
7. **What's worked before**

Without those, ChatGPT or Claude will still give you an answer. It'll be confident, well written, and generic, because it's advising a business it has never seen. The research is consistent on this. Gartner warns most AI projects without "AI-ready" data get abandoned. Salesforce's own survey of 4,050 sales professionals found over half of AI-using sales leaders say disconnected systems are slowing them down. The fix isn't a better prompt. It's giving the AI the business, in a structured form it can read every time.

## "Who Should I Follow Up With This Week?"

Try it. Open ChatGPT and ask: *"Who should I follow up with this week to hit my numbers?"*

You'll get something like: *"Prioritize warm leads who've shown recent interest. Follow up on outstanding proposals, re-engage past customers, and consider a referral ask from satisfied clients."*

That's not wrong. It's also useless. It would be the same answer for a roofer in Tulsa, a brokerage in Phoenix, and a bakery in Maine. The AI isn't dumb. **It just doesn't know anything about you.** It doesn't know the Hendersons have a $12,000 quote aging on day eleven. It doesn't know Marcus at the supply house sends you work every month. It doesn't know you're booked solid Thursday, or that you're $18,000 short of this month's goal.

Now imagine the same question answered like this:

*"Three moves this week. (1) Call the Hendersons today. Their $12K heat-pump quote is 11 days old and they were worried about financing, so lead with the 0% option. (2) Text Marcus a thank-you. He's sent 4 jobs this quarter and hasn't heard from you since August. (3) You have 6 open panel estimates over 14 days old. Your close rate on those drops after day 21, so batch them in Tuesday's pipeline block. Together that's about $31K of open value against your $18K gap."*

That's a recommendation. Same AI. The difference is entirely **what it knew.**

![A cartoon robot fortune-teller giving vague advice to a confused plumber while a crystal ball shows static](/assets/meme/what-your-ai-should-know-before-recommending-your-next-sales-action-01.jpg)

## The Seven Layers of Context

Here's what separated those two answers, layer by layer:

```graph
{
  "title": "The context an AI needs before recommending a sales action",
  "nodes": [
    { "id": "who", "label": "1. Who's Who\n(people + orgs)", "rank": 0, "detail": "People, organizations, and their roles: prospect, client, partner. Who referred whom." },
    { "id": "hist", "label": "2. What's Been Said\n(touchpoints)", "rank": 0, "detail": "Calls, texts, meetings, promises, objections. 'Worried about financing' is sales gold, and it lives in a text thread unless something captures it." },
    { "id": "state", "label": "3. Where It Stands\n(stage + age)", "rank": 0, "detail": "Open estimate, days since last touch, next step, value." },
    { "id": "goal", "label": "4. What You're\nTrying to Hit", "rank": 1, "detail": "Dated, dollar-specific goals. Without a target, 'prioritize' has nothing to prioritize against." },
    { "id": "cap", "label": "5. What You Can\nDo This Week", "rank": 1, "detail": "Calendar, time blocks, crew capacity, service area, and who's opted out of texts." },
    { "id": "econ", "label": "6. What It's\nWorth", "rank": 1, "detail": "Average ticket and close rate by job type, what a customer is worth after the first job." },
    { "id": "learn", "label": "7. What's Worked\nBefore", "rank": 1, "detail": "Win/loss reasons, which follow-up day tends to land, which partners actually convert." },
    { "id": "ai", "label": "Your AI\n(ChatGPT / Claude)", "rank": 2, "detail": "Reads the structured memory, not a pasted wall of notes." },
    { "id": "rec", "label": "A Specific\nRecommendation", "rank": 3 },
    { "id": "you", "label": "You Approve\n→ Action → Outcome", "rank": 4, "detail": "The outcome gets written back as layer 7, so next week's recommendation is better." }
  ],
  "edges": [
    { "from": "who", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "hist", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "state", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "goal", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "cap", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "econ", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "learn", "to": "ai", "evidence": "estimated", "label": "" },
    { "from": "ai", "to": "rec", "evidence": "verified", "label": "grounded answers beat parametric guesses (Lewis et al. 2020)" },
    { "from": "rec", "to": "you", "evidence": "hypothesis", "label": "human judgment stays in the loop" }
  ],
  "sourceLabel": "AutoNateAI's context model for sales recommendations in small businesses. The 'verified' edge refers to the retrieval-augmented generation research showing models perform better on knowledge-intensive tasks when grounded in retrieved documents; the specific seven-layer breakdown is our design, not a published standard."
}
```

Notice that most of this isn't "sales data" in the CRM sense. It's the **stuff in your head**: the financing worry, the fact that Marcus is good for four jobs a quarter, that Thursday is full. That's why a CRM export alone doesn't produce a good recommendation either. It has layer 3 and part of layer 1, and not much else.

## Why the AI Can't Just "Figure It Out"

There's real research behind why context beats cleverness.

**Grounding beats memory.** The 2020 paper that coined "retrieval-augmented generation" (Lewis et al., presented at NeurIPS) showed that language models do better on knowledge-intensive tasks when they're connected to an external store of documents they can retrieve from, rather than relying only on what's baked into their training. Your business is the ultimate knowledge-intensive task. None of it is in the model's training data. It has to be *given* to it.

**But dumping it all in doesn't work either.** A 2023 Stanford-led study, "Lost in the Middle" (Liu et al.), tested major models including GPT-3.5, GPT-4, and Claude. Accuracy was highest when the relevant information sat at the beginning or end of a long input and dropped substantially when it was buried in the middle. So pasting three months of texts into a chat and asking "what should I do?" is a lottery. The model may simply miss the one line that mattered.

That's the argument for **structured memory**: pull the specific facts the question needs (this person, this estimate, this goal), put them up front, and leave out the noise.

![A cartoon AI robot buried under a mountain of pasted text messages, one tiny important note stuck in the middle](/assets/meme/what-your-ai-should-know-before-recommending-your-next-sales-action-02.jpg)

## Big Companies Are Hitting the Same Wall

This isn't just a small-business problem. It's *the* AI problem right now, and big companies are telling on themselves:

- **Gartner** (February 2025) predicts that through 2026, organizations will abandon **60%** of AI projects unsupported by AI-ready data. In a survey of 248 data-management leaders, **63%** said they don't have, or aren't sure they have, the right data practices for AI.
- **Salesforce's State of Sales** (4,050 sales professionals, Aug–Sep 2025) found **87%** of sales organizations use AI in some form. But **51%** of AI-using sales leaders say disconnected systems are slowing them down. **79%** of high-performing teams prioritize data hygiene, versus **54%** of underperformers.

Salesforce's own leadership put it in one line: stand-alone agents without full customer context tend to fail.

```chart
{
  "type": "bar",
  "title": "The data problem behind AI, in companies' own words",
  "labels": ["Sales orgs using AI (Salesforce)", "High performers prioritizing data hygiene", "Underperformers prioritizing data hygiene", "AI-using sales leaders slowed by disconnected systems", "Data leaders unsure of AI-ready data practices (Gartner)"],
  "series": [{ "name": "Percent", "data": [87, 79, 54, 51, 63] }],
  "sourceLabel": "Salesforce State of Sales (4,050 sales professionals, 22 countries, Aug–Sep 2025); Gartner survey of 248 data management leaders (Q3 2024, published Feb 2025). Enterprise populations. Small businesses weren't surveyed separately."
}
```

Here's the twist that should make small operators feel better. **You have a huge advantage.** An enterprise has to clean up a decade of data across dozens of systems before its AI is useful. You can start clean, with one structured memory, this month.

## What Changes When the AI Has the Business

In an Operator OS, those seven layers aren't something you paste in. They're the structure of the system:

- **Layers 1–3 fill themselves from your conversations.** *"Met Dana at the chamber mixer, runs a brokerage, worried about lead follow-up, demo Thursday"* becomes a person, an organization, a relationship stage, a touchpoint, and a task.
- **Layer 4 is explicit.** Goals are records with a target, a date, and the relationships and tasks attached to them. The AI can see the gap.
- **Layer 5 comes from your calendar and your time blocks,** plus consent and opt-out status on every contact.
- **Layers 6 and 7 build up over time.** Every closed or lost opportunity gets a one-sentence reason. After a season, your AI knows your real close rates by job type and which follow-up day actually lands.

Then when you ask *"who should I follow up with this week?"*, it pulls exactly those facts, puts them up front, and answers about **your** business. You approve, it drafts, you send. The outcome goes back in as layer 7, and next week's answer is better.

![A cartoon plumber and a friendly glowing robot looking at the same emerald cockpit screen, both pointing at the same card](/assets/meme/what-your-ai-should-know-before-recommending-your-next-sales-action-03.jpg)

## Run Your Own Numbers

A context audit. For each layer, can your AI see it *today*, without you pasting it in?

| Layer | Question | Yes / No |
|---|---|---|
| 1. Who's who | Could it list your open prospects, clients, and partners? | |
| 2. What's been said | Does it know the last thing each one told you? | |
| 3. Where it stands | Can it see open estimates by age and value? | |
| 4. Your targets | Does it know this month's revenue goal and the gap? | |
| 5. Your capacity | Does it know which days are already full? | |
| 6. The economics | Does it know your average ticket and close rate by job type? | |
| 7. What's worked | Does it know why your last 10 losses were lost? | |

**0–2 yes:** your AI is a well-spoken stranger. **3–5:** it's a helpful assistant with amnesia. **6–7:** it's starting to act like a sales manager who knows your business.

Most owners score zero or one. That's not a failure. It's the starting line, and it's the same line every enterprise is trying to get back to.

![A cartoon report card for an AI showing a zero and a friendly teacher-contractor writing 'needs context' on it](/assets/meme/what-your-ai-should-know-before-recommending-your-next-sales-action-04.jpg)

## What the Research Doesn't Tell Us

The retrieval and long-context research measures question-answering accuracy, not sales outcomes. The Gartner and Salesforce figures are enterprise surveys from vendors and analysts, not small-business studies. We don't yet have public, rigorous data on how much grounded AI recommendations lift close rates for small service businesses. The seven-layer model is our design, informed by the research but not a published standard.

## Moral of the Story

1. **Ask your AI the question anyway.** Type "who should I follow up with this week?" into ChatGPT or Claude. If the answer could apply to any business, you've just measured your context gap.
2. **Write down layer 4 today.** One goal, a dollar amount, and a date. It's the cheapest context you can give any AI, and most businesses skip it.
3. **Capture the "why" on every lost job.** One sentence. In three months that's the most valuable dataset you own.
4. **Stop pasting long threads and hoping.** Give the AI the few facts that matter, first. Or better, give it a memory it can query.
5. **Want an AI that actually knows your business?** That's what the discovery call is for. We'll show you a live cockpit where the AI's recommendations come from real structured memory.

## Sources

- [Gartner — "Lack of AI-Ready Data Puts AI Projects at Risk" (February 2025)](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk)
- [Salesforce — State of Sales Report announcement (2026 edition; survey Aug–Sep 2025)](https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/)
- [Lewis et al. — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," NeurIPS (2020)](https://proceedings.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf)
- [Liu et al. — "Lost in the Middle: How Language Models Use Long Contexts," TACL (2024; preprint 2023)](https://aclanthology.org/2024.tacl-1.9/)
