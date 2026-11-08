# Publications

Everything at autonateai.com/publications comes from this folder. One post is one `<slug>.html` file, and the slug is its
URL:

```html
---
title: The headline
subtitle: One sentence under it, also used as the description
date: 2026-11-08
status: draft
video: optional YouTube video id
image: optional /assets/... or https://... image
---
<p>The post body, as HTML.</p>
```

Only `status: published` files are built. To publish, set the status and date, then commit that one file to `main`. The
deploy workflow rebuilds the site.

Posts for Virtual Cell Lab episodes are written here by `npm run release -- post <id>` in `research-intelligence-lab/media`.
