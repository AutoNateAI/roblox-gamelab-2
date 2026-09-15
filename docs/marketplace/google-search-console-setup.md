# Google Search Console & Bing Webmaster Setup

Why this matters: as of Aug 29, 2026, a Google search for the site was still
showing old copy — general "programming in Southeast Missouri" framing
instead of the current Consulting-first positioning. Turned out `autonateai.com`
was already a verified Search Console property (set up previously, real
performance history back to July), just crawled last on Aug 25 — before the
newest round of copy shipped. None of the on-page SEO work pays off until
Google (and Bing, which several AI tools query for web results) actually
recrawls the current site.

## 1. Google Search Console — done Aug 29, 2026

No "Add Property" step was needed — `autonateai.com` already existed as a
verified property. What we actually did:

1. **Sitemaps** (left nav, under Indexing): already submitted and reading
   `https://autonateai.com/sitemap.xml` successfully — 44 discovered pages,
   status "Success." Nothing to do here.
2. **URL inspection** (left nav): inspected `https://autonateai.com/`, saw
   "URL is on Google" / "Page is indexed," but **last crawl was Aug 25** —
   stale relative to the latest copy. Clicked **Request Indexing**. Got the
   green confirmation.
3. Repeated **Request Indexing** for the rest of the priority pages, same
   way (paste URL into the inspection bar, wait for the check, click Request
   Indexing) — all went through in one sitting, no daily-quota wall hit:
   - `https://autonateai.com/`
   - `https://autonateai.com/consulting`
   - `https://autonateai.com/for-organizations`
   - `https://autonateai.com/events`
   - `https://autonateai.com/about`
   - `https://autonateai.com/tutorials`
   - `https://autonateai.com/articles`
4. Recrawl is queued now. The actual Google search snippet can still take a
   few days to a couple weeks to visibly update even after the recrawl
   happens — check back in about a week (see section 3 below).

There's also a **"1 unused verification tokens"** recommendation sitting on
the Overview page. Not urgent — it's just Search Console noting an old,
unused ownership-verification method is still on file. Worth cleaning up
eventually (Settings → Users and permissions → Ownership verification), not
blocking anything.

## 2. Bing Webmaster Tools — done Aug 29, 2026

Bing's index is what powers web results inside ChatGPT and several other AI
tools, not just Bing.com itself — worth doing even if you don't care about
Bing search directly.

1. Signed in with Google via [bing.com/webmasters](https://www.bing.com/webmasters)
   and used **Import from Google Search Console** — pulled the property over
   automatically, no separate verification needed.
2. Submitted the sitemap (`https://autonateai.com/sitemap.xml`) under
   **Sitemaps** — showed "Processing" right after submit, which is normal.
3. Used **URL Submission** to submit all 7 priority URLs directly (10/day
   quota, used 7): home, consulting, for-organizations, events, about,
   tutorials, articles. All confirmed submitted.

**Future improvement, not done yet**: Bing offers an **IndexNow API** —
automatically pings Bing (and a few other engines) the moment a page
publishes or changes, no manual submission ever again. Worth wiring into the
deploy pipeline eventually so new articles get indexed without a manual
step, but not set up yet.

## 3. What to check back on

- **Week 1**: confirm the sitemap shows "Success" in both consoles, not
  "Couldn't fetch" or "Has errors."
- **Week 2-3**: Google `autonateai.com` (or `site:autonateai.com`) and see
  whether the result now reads Consulting-first instead of the old
  "programming in Southeast Missouri" framing. If it's still stale after
  2-3 weeks, that's worth flagging — could mean Google's caching the
  snippet from another signal (like an old meta description override),
  not just a slow recrawl.
- **Ongoing**: Search Console's **Performance** tab (queries, clicks,
  impressions, average position) is the real feedback loop once articles
  start publishing — that's where you'll see whether the content strategy
  in the Citation Engine doc is actually working.

## 4. Ag-lab pivot + URL rename — resubmitted 2026-09-15

The site repositioned to an Agricultural Economic Systems Intelligence Lab
(see `agricultural-intelligence-lab.md`), and this round's URL rework moved
`/articles` → `/research-and-case-studies` plus every region/organization/
system/investigation detail page to `/research-and-case-studies/<slug>`
(old paths 301-redirect via static stub pages — GitHub Pages is the real
host, not Firebase; see that doc's §7 for why that distinction mattered).
The user resubmitted the new URLs to Search Console themselves right
after this shipped — exact pages/method not logged here since it was done
outside this session. Worth a `site:autonateai.com` check in a week or two
to confirm the new copy and URLs are what's actually showing, same as the
Aug 29 round above.
