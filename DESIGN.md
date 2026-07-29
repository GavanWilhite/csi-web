# Design guidelines

The system as built. Every rule here is enforceable by reading
`app/globals.css` and the component modules — if code and this document
disagree, the code is the fact and this document is the bug.

## Non-negotiables

1. **Dark mode only.** Light mode is not shipped. Every colour resolves through
   a token, so adding it later means one `[data-theme="light"]` block, not a
   component sweep.
2. **Never hardcode a colour.** No hex, no `rgb()`, no bare `oklch()` in a
   component. If you need a colour that does not exist, add a token.
3. **CSS Modules only.** One `.module.css` per component. No Tailwind, no
   inline style objects — except to pass a dynamic value as a custom property
   (`style={{ "--accent": ... }}`), which is the sanctioned escape hatch.
4. **Zero horizontal overflow at 1333 / 768 / 390 / 360px.** This is the hard
   guarantee; the site replaced one that failed exactly this way. Verify by
   measuring `scrollWidth` against `innerWidth`, not by eye.
5. **Content is data.** Copy lives in `lib/`, never in JSX.

## Colour

| Token | Use |
|---|---|
| `--bg` | Page ground |
| `--surface` | Translucent plate over `--bg` |
| `--surface-solid` | Opaque plate — use when text sits over a dot field |
| `--ink` | Body and heading text |
| `--muted` | Secondary text. 9.55:1 on `--bg` |
| `--line` | Structural 1px rules and borders |
| `--hair` | Lighter internal dividers inside a bordered box |
| `--action` / `--action-hover` | **Filled buttons only.** 6.18:1 with white |
| `--indigo` | Tints, dot fields, rules. **Never a filled button** |
| `--indigo-deep` | Links and hover states. *Lighter* than `--indigo` in dark |
| `--cyan` | Track A; section-heading icons |
| `--magenta` | Track B; urgency; link hover |
| `--amber` | Track C; the one gold accent — donate, outbound event links |
| `--inv-bg` / `--inv-ink` / `--inv-muted` / `--inv-line` | The inverse band |

**The trap:** `--indigo` at its lightness gives white text **3.75:1**, below the
4.5:1 minimum. It is fine behind a 10% tint or as a 1px rule and wrong as a
button ground. `--action` exists for that and nothing else.

**`--indigo-deep` is lighter, not darker.** It is the hover partner for an
`--action` fill and the resting colour for links. Do not reach for it expecting
a shade.

Check contrast before shipping any new text-on-colour pairing. AA (4.5:1) is
the floor for body text, and small text in a light-weight face reads thinner
than its ratio suggests — `--muted` was lifted from a passing 7.34:1 to 9.55:1
for exactly that reason.

## Type

| Token | Face | Use |
|---|---|---|
| `--font-display` | Orbitron | Headings, numerals, buttons. Uppercase |
| `--font-text` | Space Grotesk | Body, decks, blurbs |
| `--font-mono` | IBM Plex Mono | Labels, metadata, times, tracked small caps |

- Section headings: `clamp(24px, 4.2vw, 32px)`, display, 700, uppercase, with a
  `--cyan` icon beside them. Every section heading matches — a section is not
  more important because its heading is bigger.
- Display headlines: no terminal periods. Use a line break where a full stop
  would go.
- Mono labels carry letter-spacing from `0.1em` to `0.24em`. Tighten it as size
  drops, never below `0.03em`.
- **No em dashes anywhere in copy.** Use a comma, a colon, or two sentences.

## Layout and graphics

The graphic vocabulary is deliberately small. Reuse it; do not invent.

- **Dot fields** — `radial-gradient(var(--line) 1px, transparent 1px)`. 22px
  pitch for hero-scale fields, 14px for tighter ones, 7px for the fine indigo
  plate texture. Always masked, never a flat tile.
- **Washes** — two low-alpha `color-mix` radial gradients (cyan and magenta,
  9–12%). Subtle enough to read as printed, not glossy.
- **Corner brackets** — 2px `--ink` ticks on a 1px frame. Featured plates only.
- **Hairline lattice** — cells draw right + bottom, container draws top + left,
  so borders never double.
- **The inverse band** — exactly one per page, around 70% of the scroll, to
  break a long column. Never adjacent to the footer's own dark ground.
- **Square corners.** No border-radius, no soft shadows.

Rhythm matters more than any single section: alternate `--bg` and `--surface`,
and let loud sections earn it by being rare.

## Components

- **Every filled primary button** uses `--action`. Secondary is a 1px `--ink`
  outline. Do not ship three identical buttons in one group — one primary, the
  rest outlined.
- **Cards in a row are peers.** Same heading size, same button style, same
  weight. If one deserves more emphasis, it belongs in a different section.
- **Never fake artwork.** A dot-field placeholder standing in for a missing
  image reads as thin. Either ship real art or ship no art area at all.
- **Scrollers need a visible affordance** — a trailing fade plus an explicit
  hint. A hover-revealed scrollbar is not discoverable.
- **Contact addresses are never literal.** The address is ROT13'd in
  `lib/contact.ts` and assembled after hydration, so it appears in neither the
  HTML nor the bundle as a plain string. Two components:
  - `<MailLink subject={...}>` — an in-context ask with a fixed label
    ("REQUEST THE PROSPECTUS"). The label is never the address.
  - `<EmailPanel />` — the address shown in full, on `/contact` and `/apply`,
    with a copy button.

  Do not add a `<noscript>` address: `[at]`/`[dot]` is the most-normalised
  obfuscation pattern and `<noscript>` is read disproportionately by scrapers.
- **Do not split an address across elements** for extra obfuscation. It buys
  nothing — the address is already absent from the HTML, so the only scrapers
  left run JavaScript and read `textContent`, which concatenates the pieces.
  And it breaks the clipboard: block children inject newlines, inline children
  with whitespace between tags inject spaces. The result looks right and
  pastes broken. One text node.

## Images and motion

- `next/image` for content images. Plain `<img>` for fixed-size chrome and for
  third-party trademarks, which must not be re-encoded or recoloured.
- `loading="eager"` for anything visible on open — a modal portrait must not be
  lazy.
- Art on a white ground gets a deliberately light plate, so it reads as framed
  artwork rather than a stray bright square.
- Autoplaying video: use `<LoopVideo>`. React does not reliably set `muted` as a
  DOM property during SSR, and Chrome's autoplay policy checks the property, so
  a plain `<video autoPlay muted>` silently never loads.
- Honour `prefers-reduced-motion` **in JS**, not by hiding a playing element in
  CSS — a hidden video still downloads and decodes.

## Accessibility

- AA contrast minimum, measured.
- Real semantics: `<dialog>` for modals (the browser supplies the top layer,
  focus containment and Escape), proper tablist roles for tabs, `<button>` for
  things that act and `<a>` for things that navigate.
- Visible focus: `2px solid var(--cyan)` with offset. Never remove it.
- Decorative icons and dot fields are `aria-hidden`. Icons that carry meaning
  get a label.
- Information conveyed by colour must also exist as text — track accents are
  paired with track names.
