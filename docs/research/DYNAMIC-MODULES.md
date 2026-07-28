# Dynamic modules on the CSI Wix homepage

Reverse-engineering of the two dynamic modules on `https://www.cognitivesecurityinstitute.org/`,
with a port specification for the Next.js app in `csi-web`.

- **Evidence base:** `handoff/raw-html/index.html` (server-rendered homepage, 1.23 MB), plus
  `blog.html`, `blog__categories__*.html`, `research.html`, `publications.html`.
- **Capture date of the source HTML:** 2026-07-27.
- **Companion data:** [`videos.json`](./videos.json), [`research-posts.json`](./research-posts.json).

Both modules are Wix first-party apps ("TPAs"). Wix server-renders them and embeds the data the
widget was hydrated with in an inline `appsWarmupData` JSON blob. That blob is what made both
modules fully recoverable — it contains the real API responses, not just the rendered markup.

Locate it in `index.html` with:

```
grep -o 'appsWarmupData.\{0,200\}' raw-html/index.html
```

```json
"appsWarmupData":{
  "14409595-f076-4753-8303-9a86f9f71469":{ "vodWidgetData-comp-mrbx94gu": "…" },
  "14bcded7-0066-7c35-14d7-466cb3f09103":{ "post-list-comp-md40oyz7-undefined-95b8acfa-5ad4-48cd-9f5f-530e6212d92f-undefined-en-3": "…" }
}
```

The two GUIDs are Wix app-definition IDs, resolved elsewhere in the same file:

```json
{"appDefinitionId":"14409595-f076-4753-8303-9a86f9f71469","type":"public","instanceId":"4311d17d-1008-4040-a5fc-9660cc7a889c","appDefinitionName":"Wix Video","isWixTPA":true,…}
{"appDefinitionId":"14bcded7-0066-7c35-14d7-466cb3f09103","type":"public","instanceId":"b7b6d1ee-05d6-4dee-a65e-9435f2b4f70e","appDefinitionName":"Wix Blog","isWixTPA":true,…}
```

---

# 1. The YouTube video scroller

## 1.1 What it is

| | |
|---|---|
| Wix app | **Wix Video** (a.k.a. Wix VOD), appDefinitionId `14409595-f076-4753-8303-9a86f9f71469` |
| Component id on the page | `comp-mrbx94gu` (type `tpaWidgetNative`) |
| Viewer bundle | `https://static.parastorage.com/services/wix-vod-widget/1.4639.0/viewerScript.bundle.min.js` |
| Backend | `https://vod-server.wix.com/` |
| Warmup key | `vodWidgetData-comp-mrbx94gu` |

The component-type map in `index.html` confirms it is a native TPA widget, not a rich-text block or
an HTML embed:

```json
"comp-mrbx94gu":"tpaWidgetNative","comp-md40oyz7":"tpaWidgetNative"
```

## 1.2 What it is bound to — a YouTube channel, via that channel's uploads playlist

This is the decisive quote, from the `__CHANNEL__` object inside `vodWidgetData-comp-mrbx94gu`
(un-escaped for readability):

```json
"__CHANNEL__": {
  "channelType": "youtube-feed",
  "itemType": "list",
  "title": "Cognitive Security Institute",
  "mediaExternUrl": "https://www.youtube.com/channel/UCcjtBmZGno8co3APMD56fuQ/",
  "externalId": "UUcjtBmZGno8co3APMD56fuQ",
  "uploadsPlaylistId": "UUcjtBmZGno8co3APMD56fuQ",
  "urlType": "playlist",
  "isExternalRemoved": false,
  "externalCreatedTs": "2022-10-22T01:49:59.605Z",
  "featuredItem": null,
  "videosCount": 69,
  "id": "4d98aa748a62450fb41cb0c79c9f186b",
  "coverUrl": "https://i.ytimg.com/vi/XiFohPbeAlI/maxresdefault.jpg"
}
```

**Identifiers recovered:**

- **YouTube channel ID:** `UCcjtBmZGno8co3APMD56fuQ`
- **Uploads playlist ID:** `UUcjtBmZGno8co3APMD56fuQ` — this is not a hand-made playlist. It is the
  auto-generated "all uploads" playlist that YouTube maintains for every channel (`UC…` → `UU…`).
  `urlType: "playlist"` therefore does **not** mean a curated playlist; it means Wix reads the
  channel through its uploads playlist.
- **Canonical handle:** `@cognitivesecurityinstitute`
  (`https://www.youtube.com/@cognitivesecurityinstitute`). This is *not* in the HTML — the HTML only
  ever has the `UC…` form. Resolved by web lookup, and confirmed by the channel name matching
  `__CHANNEL__.title` exactly.
- `featuredItem: null` — no pinned/featured video override.
- `videosCount: 69` — the number of videos Wix has synced from the channel. (The channel itself may
  hold more; Wix's count is what the widget paginates over.)

The `Cognitive Security Institute` label the UI shows above the row is `__CHANNEL__.title`, i.e. the
channel name synced from YouTube, not hand-typed site copy.

## 1.3 Dynamic or static? — **Dynamic. Auto-synced from YouTube. Not curated.**

Three independent lines of evidence:

1. **Paging cursor.** The payload is a page of a larger feed, not a fixed list:

   ```json
   "__VIDEOS__": { "status": 200, "paging": { "size": 8, "cursor": "EAAaHlBUOkNBZ2lFRFE0T1VVM05qRXhOems1TkRKRlJEQQ" }, "data": [ … 8 items … ] }
   ```

   8 items delivered against a channel of 69, plus a `cursor` — the arrows / "load more" fetch the
   next page from `vod-server.wix.com` at runtime. Widget style var `--loadMoreButtonType: 1`
   corroborates a load-more affordance.

2. **The 8 videos are exactly the 8 most recent uploads, in upload order.** Fetching the live
   channel RSS feed (`https://www.youtube.com/feeds/videos.xml?channel_id=UCcjtBmZGno8co3APMD56fuQ`)
   returns entries whose first 8 are, in order: `XiFohPbeAlI`, `Y9kDI35hyC4`, `skitg5xpVGY`,
   `bIGcM7W9Gqo`, `pcNOBv9d1g0`, `U9axbn-GHMw`, `RzqdVmZlMqo`, `IBccwAI8OTI` — an exact match, same
   order, same titles, as the embedded payload. A hand-curated list would not track the RSS feed
   ordering perfectly.

3. **Recency.** The newest item is dated `2026-07-14T14:00:13Z`, days before the crawl. Nobody is
   hand-adding videos to a homepage widget within days of upload.

Per-video fields are all YouTube-derived, including a `videoSource` discriminator:

```json
{
  "externalId": "skitg5xpVGY",
  "title": "Cybersecurity Social Dynamics: Attitudes, Influences, Usable Security | Dr. Cori Faklaris | CSI #59",
  "durationSec": 2677, "durationStr": "44:37",
  "coverUrl": "https://i.ytimg.com/vi/skitg5xpVGY/maxresdefault.jpg",
  "mediaExternUrl": "//www.youtube.com/embed/skitg5xpVGY",
  "videoSource": "youtube",
  "datePublish": "2026-07-07T06:00:20Z",
  "publisher": "Cognitive Security Institute",
  "categories": ["Science & Technology"]
}
```

**Conclusion:** the module needs a real data source in the port. Hardcoding it would freeze a row
that currently self-updates within days of every upload.

## 1.4 The eight videos currently shown

Full records — including complete descriptions — are in [`videos.json`](./videos.json).

| # | Video ID | Duration | Published | Title |
|---|---|---|---|---|
| 1 | `XiFohPbeAlI` | 01:08 | 2026-07-14 | What is the role of human factors in cybersecurity? Crystal Faucett, PhD CognectCon Tampa |
| 2 | `Y9kDI35hyC4` | 58:21 | 2026-07-14 | From Awareness to Accountability: Rethinking the Human Risk Practitioner's Role |
| 3 | `skitg5xpVGY` | 44:37 | 2026-07-07 | Cybersecurity Social Dynamics: Attitudes, Influences, Usable Security \| Dr. Cori Faklaris \| CSI #59 |
| 4 | `bIGcM7W9Gqo` | 21:15 | 2026-07-05 | Building Cognitive Defence for Organisations in the Age of AI w/ Holly-Jane Grayling & Andrew Beachy |
| 5 | `pcNOBv9d1g0` | 45:48 | 2026-06-30 | 2024: A Cyborg Odyssey \| Len Noe \| CSI #60 |
| 6 | `U9axbn-GHMw` | — | 2026-06-25 | Cognitive Security Institute Live Stream |
| 7 | `RzqdVmZlMqo` | 31:43 | 2026-06-23 | The Mind of the Machine: Governing the New Agentic Workforce \| Josh Devon \| CSI #87 |
| 8 | `IBccwAI8OTI` | 18:30 | 2026-06-20 | Beyond Click Rates: Rethinking Phishing Awareness w/ James Phillips |

Thumbnails are plain YouTube CDN URLs — `https://i.ytimg.com/vi/{videoId}/maxresdefault.jpg`. The
rendered markup serves `mqdefault.jpg` at 1x and `maxresdefault.jpg` at 2x.

**Edge case worth designing for:** item 6 is a livestream. `durationSec: 0`, `durationStr: "00:00"`,
empty description, and its 2x thumbnail is `sddefault_live.jpg` rather than `maxresdefault.jpg`. The
live UI **omits the duration badge and the description block entirely** for it (verified in
`content/index.md` — that card has a title and nothing else). In `videos.json` this is encoded as
`durationSec: null`, `durationLabel: null`, `description: null`, `isLiveOrPremiere: true`. Your card
component must tolerate all three being absent.

It also breaks the thumbnail convention. I verified this by request:
`https://i.ytimg.com/vi/U9axbn-GHMw/maxresdefault.jpg` returns **HTTP 404**, as does
`sddefault.jpg`; `hqdefault.jpg` and `sddefault_live.jpg` return 200. (For a normal video such as
`XiFohPbeAlI`, all of them return 200.) So `maxresdefault.jpg` is *not* safe to assume — always fall
back to `hqdefault.jpg`, which exists for every video. `videos.json` records `null` for the two
non-existent URLs rather than a plausible-looking dead link.

## 1.5 Rendered behaviour to reproduce

From the widget's style custom properties (`.comp-mrbx94gu { … }` in `index.html`):

| Property | Value | Meaning |
|---|---|---|
| `--sliderHeight` | `388` | row height in px |
| `--navigationArrowsPosition` | `0` | arrows overlaid on the gallery |
| `--navigationArrowsBehavior` | `1` | arrows shown on hover |
| `--loadMoreButtonType` | `1` | load-more enabled |
| `--dividersAndArrowsColor` | `155,180,204` | arrow colour |

Card anatomy, per `content/index.md`: thumbnail → play affordance → duration badge → `<h3>` title →
description paragraph. Clicking plays inline via the YouTube iframe embed
(`mediaExternUrl: "//www.youtube.com/embed/{id}"`) rather than navigating away.

## 1.6 Port options and trade-offs

Context that drives the recommendation: `csi-web` today is **fully static**. `app/page.tsx` renders
eleven components with zero data fetching; all content lives in typed TS modules under `lib/`
(`lib/content.ts`, `lib/agenda.ts`, `lib/event.ts`). `next.config.ts` enables only `reactCompiler`
and a turbopack root — no `cacheComponents`, no `images.remotePatterns`. Anything introducing a
network call changes that posture, so the question is how much.

### Option A — YouTube Data API v3 (recommended)

Two calls, in a server component or a build-time script:

1. `playlistItems.list?playlistId=UUcjtBmZGno8co3APMD56fuQ&part=snippet&maxResults=8` → ids, titles,
   descriptions, thumbnails. **1 quota unit.**
2. `videos.list?id={comma-separated ids}&part=contentDetails` → ISO-8601 `duration`, plus
   `liveStreamingDetails` if you want the livestream flag. **1 quota unit** (up to 50 ids per call).

- **Pros:** the only option that yields **durations**, which the current design shows on every card.
  Full descriptions. Deterministic ordering. 2 units per refresh against a 10,000/day default quota
  is effectively free.
- **Cons:** needs an API key (server-side only — a browser-exposed key is abusable and rate-limited
  by referer at best). Adds one secret to manage. Google can revoke/expire keys.
- **Effect on prerendering:** none, if you keep it out of the request path. Two shapes:
  - **Build-time (keeps the site 100 % static):** a script writes `lib/videos.json`, committed or
    generated in CI. `next build` stays a pure static export. Freshness = deploy cadence; pair with
    a scheduled CI job (e.g. daily) that regenerates and redeploys if the list changed.
  - **ISR (fresh without redeploys):** `export const revalidate = 3600` on the page, or a `fetch`
    with `{ next: { revalidate: 3600 } }`. The page is still prerendered and served from cache; Next
    regenerates in the background. The route stops being a pure static asset — you need a Node
    runtime, so this rules out `output: 'export'` / a plain-CDN deploy.

  Note the app is on **Next 16.2.10** without `cacheComponents`, so the "previous" caching model
  applies: route-segment `export const revalidate = N` and `fetch(url, { next: { revalidate: N } })`.
  If `cacheComponents` is later enabled, this becomes `'use cache'` + `cacheLife('hours')` +
  `cacheTag('videos')`. Don't mix the two models.

### Option B — Channel RSS feed

`https://www.youtube.com/feeds/videos.xml?channel_id=UCcjtBmZGno8co3APMD56fuQ` (verified working).

- **Pros:** no key, no quota, no secret. Returns title, `yt:videoId`, publish date, `media:thumbnail`
  and `media:description`. Simple to fetch at build time.
- **Cons, and they are real for this design:**
  - **No durations at all.** Confirmed by fetching the feed. You would have to drop the duration
    badge — a visible regression against the current homepage — or hardcode durations, which
    reintroduces staleness for exactly the field that goes stale.
  - Hard cap of ~15 most recent entries. Fine for a row of 8; blocks any future "load more".
  - Undocumented, unversioned, no support contract. YouTube has quietly changed and deprecated feed
    endpoints before.
  - Needs an XML parser (a dependency, or ~40 lines of regex you'll regret).
- **Effect on prerendering:** identical to Option A — build-time keeps it static, ISR does not.

### Option C — Static hardcoded list

Ship `videos.json` as a typed TS module under `lib/`, same idiom as `lib/content.ts`.

- **Pros:** zero dependencies, zero secrets, zero network, site stays trivially static and
  deployable anywhere. Fastest to build. Content is already extracted and typed for you.
- **Cons:** goes stale immediately. The channel published two videos on 2026-07-14 alone; a
  hardcoded row is visibly wrong within a fortnight and silently wrong thereafter. This is strictly
  worse than the Wix module it replaces, which is a hard thing to justify to the client.
- **Effect on prerendering:** none. Fully static.

### Recommendation

**Option A, in its build-time form, with the fetch factored so it can flip to ISR later.**

Concretely:

1. Land Option C's data file *now* as `lib/videos.ts` (typed, seeded from `videos.json`) so the
   component can be built and reviewed without waiting on a key. Ship it as the committed fallback.
2. Add `scripts/fetch-videos.ts` that calls `playlistItems.list` + `videos.list`, validates the
   shape, and rewrites `lib/videos.ts`. Key from `.env.agent` / CI secret, never `NEXT_PUBLIC_*`.
3. Wire it into CI on a schedule. If the API call fails, the script exits non-zero and the committed
   data stays — the homepage never renders empty.
4. If the client later wants freshness without redeploys, move the same fetch into the server
   component with `revalidate`. The card component and the `Video` type don't change.

This keeps today's static-prerender guarantee, removes the staleness objection, and preserves the
duration badge. Point 3 is what makes it genuinely better than the Wix widget rather than merely
equivalent.

**Also required regardless of option:** add `i.ytimg.com` to `images.remotePatterns` in
`next.config.ts` if you use `next/image` for thumbnails (the app currently has no `remotePatterns`
at all, and uses `next/image` in `Hero.tsx` and `Keynotes.tsx`). Alternatively mirror thumbnails into
`public/assets/videos/` at build time, matching how `public/assets/speakers/` and
`public/assets/sponsors/` already work — that also insulates you from ytimg 404s on livestreams.

## 1.7 What I could not determine

- **Whether the widget's page size of 8 is authored or a Wix default.** `paging.size` is 8 in the
  response, but I found no `itemsPerPage`-style setting in the component's style variables. Treat 8
  as the observed value, not a confirmed setting.
- **Whether the site owner had also configured a manual override list.** `featuredItem` is `null` and
  `usedInLists` is `[]` on every video, which is consistent with "no manual curation", but the Wix
  editor-side config is not present in the public HTML, so this is inference from absence.
- **The channel's true total video count.** Wix reports 69 synced; I did not verify against YouTube.

---

# 2. The "Published Research" section

## 2.1 What it is

| | |
|---|---|
| Wix app | **Wix Blog**, appDefinitionId `14bcded7-0066-7c35-14d7-466cb3f09103` |
| Component id | `comp-md40oyz7` (type `tpaWidgetNative`), 980 × 378 px |
| Widget | Post List (slider layout), rendered through Wix Pro Gallery |
| Heading | `comp-md40rm5n`, a plain rich-text `<h2>` — *not* part of the widget |
| CTA | `comp-mdsc5rr8`, a plain `StylableButton` — *also not* part of the widget |

The heading and button are ordinary page elements sitting above and below the widget:

```html
<div id="comp-md40rm5n" … data-testid="richTextElement">
  <h2 class="font_2 wixui-rich-text__text" style="font-size:36px;">
    <span style="color:#FFFFFF;" class="wixui-rich-text__text">Published Research</span>
  </h2>
</div>
```

```html
<div id="comp-mdsc5rr8" class="comp-mdsc5rr8" data-semantic-classname="button">
  <a data-testid="linkElement"
     href="https://www.cognitivesecurityinstitute.org/research"
     target="_self" … aria-label="View More">
    <span class="StylableButton2545352419__label wixui-button__label"
          data-testid="stylablebutton-label">View More</span>
```

So **"VIEW MORE" points at `/research`**, not at `/blog`.

## 2.2 What backs it — the Wix Blog collection, filtered to one category

Not a manually authored list. The warmup cache key encodes the query:

```
post-list-comp-md40oyz7-undefined-95b8acfa-5ad4-48cd-9f5f-530e6212d92f-undefined-en-3
                       └ component ┘ └──────── category id ────────────┘        │  └ page size
                                                                             language
```

`95b8acfa-5ad4-48cd-9f5f-530e6212d92f` is the **Research** category, per the category list in the
same payload:

```json
{ "id": "95b8acfa-5ad4-48cd-9f5f-530e6212d92f",
  "label": "Research",
  "postCount": 10,
  "url": { "base": "https://www.cognitivesecurityinstitute.org", "path": "/blog/categories/research" },
  "description": "White papers, reports, frameworks, and foundational documents from our team and contributors. Open knowledge for an open future!" }
```

The response's own paging metadata confirms the filter and the limit:

```json
"pagingMetaData": { "count": 3, "offset": 0, "total": 10, "cursors": { "next": "eyJmaWx0ZXIiOnsiJGFuZCI6W3siY2F0ZWdvcnlJZHMiOnsiJGluIjpbIjk1YjhhY2ZhLTVhZDQtNDhjZC05ZjVmLTUzMGU2MjEyZDkyZiJdfX0seyJzdGF0dXMiOiJwdWJsaXNoZWQifV19…" } }
```

Base64-decoding that cursor gives the query in the clear:

```json
{"filter":{"$and":[{"categoryIds":{"$in":["95b8acfa-5ad4-48cd-9f5f-530e6212d92f"]}},{"status":"published"}]},
 "value":{"isPinned":false,"firstPublishedDate":"2020-03-01T06:00:00.000Z"},
 "order":{"isPinned":-1,"firstPublishedDate":-1,"id":-1},"type":0}
```

**The module is therefore:** `posts WHERE category = Research AND status = published ORDER BY pinned
DESC, firstPublishedDate DESC LIMIT 3`. `total: 10` matches the category's `postCount: 10`, and I
independently verified 10 of the 13 posts carry the Research category.

The `/research` page runs the identical query with a different component
(`post-list-comp-mdsb4kn4-false-95b8acfa-5ad4-48cd-9f5f-530e6212d92f-undefined-en-3`), which is why
"View More" goes there.

**This is dynamic too** — publish an eleventh Research post and it appears on the homepage
automatically.

## 2.3 Where the category labels come from

The card label is the post's **first `categoryIds` entry**, resolved to that category's `label`, and
linked to `/blog/categories/{slug}`. Evidence — the three cards render "Research", "Research",
"Neurosecurity", and:

| Card | `categoryIds` (in stored order) | Rendered label |
|---|---|---|
| Darwin Monkey | `[Research, AI Security, Cognitive Warfare, Neurosecurity]` | **Research** |
| NIST Special Publication | `[Research, Human-Centered Cyber]` | **Research** |
| Neurosecurity … MASINT | `[Neurosecurity, Research]` | **Neurosecurity** |

Card 3 is the tell: it *is* in the Research category (that's why it matched the filter) but displays
"Neurosecurity", because Neurosecurity is first in its array. So the label is **not** the filter
category — it's the post's own primary category. Style var `--category-label-layoutType: 0` selects
this single-label presentation.

Note the ordering is the array order as stored on the post, which is Wix-editor-authored and has no
independent sort key. In the port, `primaryCategory` in `research-posts.json` preserves it; treat it
as authored data to be maintained by hand, because there is nothing to derive it from.

## 2.4 The nine categories

| Label | Slug | Posts |
|---|---|---|
| Research | `research` | 10 |
| Cognitive Warfare | `cognitive-warfare` | 7 |
| Human-Centered Cyber | `human-centered-cyber` | 4 |
| Neurosecurity | `neurosecurity` | 3 |
| Cognitive Resilience | `cognitive-resilience` | 2 |
| AI Security | `ai-security` | 1 |
| Announcements | `announcements` | 0 |
| Media | `media` | 0 |
| Resources | `resources` | 0 |

Category IDs, descriptions and cover images are all in `research-posts.json`. Counts sum to more than
13 because posts carry multiple categories.

## 2.5 The three cards, mapped

| Card | Post URL | Hero image (local) |
|---|---|---|
| Darwin Monkey: Next Generation Neuromorphic Computing… | `/post/darwin-monkey-next-gen-neuromorphic-computing-and-competition-for-cognitive-capability-control` | `assets/other/439552_3b2d5da567e4403b8ce85626b168c77f~mv2.png` |
| NIST Special Publication: Minding the Gaps… | `/post/nist-special-publication-minding-the-gaps-in-human-centered-cybersecurity` | `assets/other/439552_cb22c295d2894d2d928c3f532839769d~mv2.png` |
| Neurosecurity: Human Brain Electro-Optical Signals as MASINT | `/post/neurosecurity-human-brain-electro-optical-signals-as-masint` | `assets/home/439552_033d768e77fc44b3a150f3e834371e44~mv2.avif` |

Only the first has authored alt text (`"Silhouette of human head in profile overlaid with computer
chip"`, `media.custom: true`); the other two have none and Wix falls back to the post title. Fix this
in the port — write real alt text for all 13.

## 2.6 All 13 posts

Full records — excerpts, dates, categories, hero images, local file paths — are in
[`research-posts.json`](./research-posts.json). Every hero image was matched to a file that exists in
`handoff/assets/`, and every post to its `content/post__*.md` and `raw-html/post__*.html`.

| Published | Primary category | Title | Slug |
|---|---|---|---|
| 2026-01-12 | Neurosecurity | Developing a Neurosecurity Framework to Defend Against the Coming Neurowar | `developing-a-neurosecurity-framework-to-defend-against-the-coming-neurowar` |
| 2025-12-09 | **(none)** | Coupons as Cognitive Malware: Attacking Interconnected Systems | `coupons-as-cognitive-malware-attacking-interconnected-systems` |
| 2025-11-18 | Cognitive Resilience | What Can Cognitive Security Learn From The B-17 Flying Fortress? | `what-can-cognitive-security-learn-from-the-b-17-flying-fortress` |
| 2025-11-11 | Research | Darwin Monkey: Next Generation Neuromorphic Computing and Competition for Cognitive Capability and Control | `darwin-monkey-next-gen-neuromorphic-computing-and-competition-for-cognitive-capability-control` |
| 2025-04-02 | Research | NIST Special Publication: Minding the Gaps in Human-Centered Cybersecurity | `nist-special-publication-minding-the-gaps-in-human-centered-cybersecurity` |
| 2020-03-01 | Neurosecurity | Neurosecurity: Human Brain Electro-Optical Signals as MASINT | `neurosecurity-human-brain-electro-optical-signals-as-masint` |
| 2019-08-01 | Research | The Enduring Mystery of the Repeat Clickers | `the-enduring-mystery-of-the-repeat-clickers` |
| 2018-09-01 | Cognitive Warfare | Developing Training Research to Improve Cyber Defense of Industrial Control Systems | `developing-training-research-to-improve-cyber-defense-of-industrial-control-systems` |
| 2018-07-03 | Research | Understanding Online Information Operations: Development of an Influence Network for Scientific Inquiry | `understanding-online-information-operations-development-of-an-influence-network-for-scientific-inqu…` |
| 2018-07-03 | Cognitive Warfare | Socio-technical communication: The hybrid space and the OLB model for science-based cyber education | `socio-technical-communication-the-hybrid-space-and-the-olb-model-for-science-based-cyber-education` |
| 2018-01-01 | Research | A Computational Social Science Approach to Examine the Duality Between Productivity and Cybersecurity | `a-computational-social-science-approach-to-examine-the-duality-between-productivity-and-cybersecurit…` |
| 2017-05-28 | Cognitive Warfare | Macrocognition Applied to the Hybrid Space: Team Environment, Functions and Processes in Cyber Operations | `macrocognition-applied-to-the-hybrid-space-team-environment-functions-and-processes-in-cyber-opera…` |
| 2016-06-21 | Research | Exploring the Hybrid Space | `exploring-the-hybrid-space` |

**Data-quality issue to raise with the client:** `coupons-as-cognitive-malware-attacking-interconnected-systems`
has `"categoryIds": []`. It renders with no category label, and it will never appear in the homepage
row or on `/research` no matter how recent it is. That is almost certainly an authoring oversight
rather than intent. It also has the only non-`439552_` hero image
(`2586a4_75c0fc3a81eb458893e6534cebcc9b50~mv2.png`), suggesting it was uploaded by a different
author. Ask before assigning it a category in the port.

Two further notes:

- **All 13 posts have `owner.name: "CSI"`.** The real authors are named in the body text
  (e.g. "Authors: Matthew Canham, Ben D Sawyer"), not in the post metadata. If the port wants
  per-post bylines, they must be extracted from `content/post__*.md` by hand — I have not attempted
  that, and `research-posts.json` records `author: "CSI"` because that is what the data says.
- **Several posts are pointers, not articles.** `neurosecurity-human-brain-electro-optical-signals-as-masint`
  is a one-minute read whose body is an abstract plus a "Read Paper" link to a PDF on
  `bendsawyer.com`. The older 2016–2019 entries follow the same shape. This matters for the port
  decision below.

## 2.7 Port options and trade-offs

The client's stated aim is to **replace the Wix site entirely**. That rules out the middle option on
any timeline longer than a few months, so the real choice is between doing it now and doing it later.

### Option A — Cards linking out to the existing Wix blog

Render the three cards in Next.js; `href` stays `https://www.cognitivesecurityinstitute.org/post/…`.

- **Pros:** ship today. Zero content migration. Data is already extracted in `research-posts.json`.
- **Cons:** every card is an exit from the new site to the old one. Directly contradicts "replace
  Wix entirely" — it makes the Wix blog a permanent dependency of the new homepage, and guarantees a
  second migration later. Also splits SEO across two domains-worth of content.
- **Verdict:** acceptable only as an explicit interim, with a dated plan to replace it.

### Option B — Curated static highlight row, no post pages

Three hardcoded cards, "View More" → the Wix `/research` page.

- **Pros:** minimal. Matches the existing `lib/content.ts` idiom exactly.
- **Cons:** all of Option A's problems, plus it discards the "new Research post appears
  automatically" behaviour the Wix module has today. Strictly a downgrade.
- **Verdict:** not recommended.

### Option C — Port the posts as real content pages (recommended)

Bring all 13 posts into the Next.js app as first-class content.

- **Pros:**
  - The only option consistent with retiring Wix.
  - The corpus is *tiny and finished*: 13 posts, ~7 of them short abstract-plus-PDF-link pointers.
    This is a one-off task of hours, not a migration project. It will only get bigger if deferred.
  - Full text is already in `content/post__*.md`; every hero image is already in `handoff/assets/`
    and verified present.
  - You control the URL shape. Keep `/post/{slug}` — the existing Wix URLs are already indexed, and
    preserving them means zero redirect work at cutover. Category pages at
    `/blog/categories/{slug}` likewise already exist and are already linked from every post's nav.
  - The homepage row becomes a pure local query over typed data — no API, no key, no network, fully
    static. Better than the Wix widget on every axis.
- **Cons:**
  - Requires deciding on an authoring pipeline: MDX files under `content/` with a small frontmatter
    schema, or a typed TS module like `lib/content.ts`. MDX is the right call — post bodies have
    headings, links, block quotes and embedded PDFs; encoding those as TS string literals is
    miserable. That adds `@next/mdx` or `next-mdx-remote`, the app's first content dependency.
  - Someone must own publishing going forward. Wix gave the client a WYSIWYG editor; a Git-based
    flow does not. **Confirm who authors posts before committing to this** — if it's a non-technical
    staff member publishing monthly, MDX-in-Git may be a worse outcome for them even though it's a
    better outcome for the codebase. This is the one genuine open question on this module.
  - Post body text in `content/post__*.md` is the crawler's extraction, which includes site chrome
    (nav, footer) around the article. It needs trimming per post — cheap for 13, but not zero.

### Recommendation

**Option C**, with this sequencing:

1. **Now:** build the homepage row against `research-posts.json` as typed local data, with cards
   linking to `/post/{slug}` — routes that don't exist yet. Implement the same query the Wix widget
   runs (`category = Research`, sort by `firstPublishedDate` desc, limit 3) rather than hardcoding
   three cards, so the row keeps its dynamic behaviour once posts land.
2. **Next:** port the 13 posts as MDX at `/post/{slug}`, plus category pages at
   `/blog/categories/{slug}`. Both fully static — `generateStaticParams` over the local content, no
   change to the app's prerender posture.
3. **Then:** `/research` as a real page, so "View More" stops pointing at Wix. `content/research.md`
   already has its full structure (Focus 5 Areas, Active Projects, Publications).

Until step 2 lands, `/post/{slug}` should temporarily redirect to the Wix URL — one line per post in
`next.config.ts`, removed as each post is ported. That keeps the homepage honest without blocking on
the migration.

**Assets:** copy the 13 hero images from `handoff/assets/` into `public/assets/research/` with
human-readable filenames, matching the convention already used by `public/assets/speakers/` and
`public/assets/sponsors/`. Do not hotlink `static.wixstatic.com` — it keeps a Wix dependency alive
and the URLs will break when the site is decommissioned. Note that six of the heroes are `.avif`
only; convert or provide fallbacks if you need broader support than `next/image` gives you.

## 2.8 What I could not determine

- **Whether the Wix editor pins any post.** The sort includes `isPinned: -1`, and every post has
  `"pinned": false`, so pinning is available but unused. It cannot change the current output.
- **Real per-post authorship.** Metadata says "CSI" for all 13; actual authors are prose inside the
  bodies. Not machine-extractable with confidence — flagged rather than guessed.
- **Why `postCount` is 0 for Announcements, Media and Resources** while those categories are linked
  from every post's nav. Either they were created and never used, or their posts are unpublished.
  The public HTML cannot distinguish these.
- **Whether the 3-post limit is authored or a Wix default.** It's in the warmup key (trailing `-3`)
  and in `pagingMetaData.count`, but I found no editor-side setting confirming intent.

---

# 3. Summary

| | YouTube scroller | Published Research |
|---|---|---|
| Wix app | Wix Video (`14409595-…`) | Wix Blog (`14bcded7-…`) |
| Component | `comp-mrbx94gu` | `comp-md40oyz7` |
| Dynamic? | **Yes** — auto-synced from YouTube | **Yes** — live query over the blog collection |
| Bound to | Channel `UCcjtBmZGno8co3APMD56fuQ` (`@cognitivesecurityinstitute`) via uploads playlist `UUcjtBmZGno8co3APMD56fuQ` | Category `Research` (`95b8acfa-…`), sorted by publish date desc, limit 3 |
| Items shown | 8 most recent of 69 | 3 most recent of 10 |
| CTA | load-more / arrows (in-widget) | "View More" → `/research` |
| Recommended port | YouTube Data API v3 at **build time**, committed fallback in `lib/`, CI refresh; ISR-ready | Port all 13 posts as **MDX content pages**; homepage row becomes a local query |
| Static prerender preserved? | Yes (build-time). No, if ISR is chosen. | Yes, fully |

**Biggest open question:** who will author blog posts after Wix is retired. That answer, not any
technical constraint, determines whether the MDX-in-Git recommendation for module 2 is right.
