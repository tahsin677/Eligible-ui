# Eligible Workspace: Design System

The design language of the Eligible hiring workspace pages: Overview, AI assistant, Jobs, Applications, Interviews, Settings, the interview review page and the Full details page. It describes what the pages actually use, so new screens look like they belong.

**Principles**
1. **Calm and flat.** No drop shadows. Depth comes from soft grey surfaces and thin borders.
2. **One strong action colour.** A blue gradient marks the primary action. Everything else is neutral, with red, green and amber kept for meaning.
3. **Round and friendly.** Large radii, pill shapes, generous spacing.
4. **Say less.** Remove helper text that repeats what the layout already shows.
5. **Everything is clickable where it looks clickable.** Rows, cards, chips and tabs respond to hover and click.

---

## 1. Foundations

### Colour

| Token | Value | Use |
|---|---|---|
| `ink` | `#232838` | Headings, primary text, dark buttons |
| `ink2` | `#3d4356` | Body text, icons |
| `mute` | `#6f7480` | Secondary text, labels |
| `faint` | `#a1a6b2` | Placeholders, disabled, group labels |
| `bg` | `#eceef2` | Page background behind the main panel |
| `pill` | `#f3f4f6` | Soft fills: inputs, chips, inactive buttons |
| `line` | `#e9ebf0` | 1px borders |
| `line2` | `#f1f2f5` | Hairline dividers inside cards |
| `white` | `#ffffff` | Cards and the main panel |
| `blue` | `#1b6ee8` | Selected state, links, progress |
| `blue-deep` | `#0b5ad9` | Link text on tinted blue |
| `blue-tint` | `#e4eeff` | Blue chip background (text `#1b4fb8`) |
| `gradient` | `#0a50cf → #1d80f8` (left to right) | Primary button, active nav item, Q badges |
| `red` | `#d6304a` / text `#c42a44` | Missed, deductions, delete (tint `#ffe3e5`) |
| `green` | `#12804d` | Open, strengths, points earned (tint `#e4f6ec`) |
| `amber` | `#a96a06` | Paused, warnings, flags (tint `#fff0d6`) |
| `violet` | `#5b34c0` | "Applied" stage (tint `#efe9fd`) |

Score bars use semantic colour: green at 70 or above, blue from 40 to 69, red below 40.

### Typography

| Role | Font | Notes |
|---|---|---|
| Headings, UI, buttons | **Geist** | Weights 400 and 500. Headings use tight tracking (−3% to −4.5%) |
| Body copy | **Manrope** | 400 to 600, 15px base |
| Numbers, times, kbd | **Geist Mono** | Timestamps, fractions, shortcuts |

| Style | Size / weight |
|---|---|
| Page title | 38px, 400, tracking −4.5% |
| Section title | 20 to 22px, 400, tracking −2.5% |
| Card title / row title | 16 to 17px, 500 |
| Body | 14.5 to 15.5px, line height 1.55 |
| Secondary | 13 to 14px, `mute` |
| Overline / group label | 11.5 to 12px, 500, uppercase, tracking +10% |
| Big stat | 42 to 72px, 400, tracking −5% |

### Shape and spacing

| Element | Radius |
|---|---|
| Main panel | 36px (left corners only) |
| Cards, tables, panels | 28 to 32px |
| Inner blocks, boxes | 14 to 22px |
| Buttons, inputs, chips | **14px** |
| Tags and small status labels | **8px** |
| Sidebar items, search, avatars, tabs track | 99px (pill / circle) |

Spacing runs on a 4px base. Common gaps: 8, 10, 12, 14, 16, 20, 24. Card padding is 22 to 26px. Page padding is 22px top and 28px sides.

### Elevation
None. Use `1px` borders (`line`) or a `pill` fill to separate surfaces. Floating pop-ups (menus, drawer, chat, search) use a thin border and a dim backdrop where needed.

### Icons
**Hugeicons**, stroke rounded, `1.6` to `1.9` stroke, 18 to 22px. Colour follows text (`ink2`), inverted to white on filled buttons. Use one icon style per page and do not mix colours across icons.

---

## 2. Layout

### App shell
- **Sidebar**, 272px, on the `bg` colour, sticky. Order: logo and collapse button, workspace switcher, search, group "Hiring" (Overview, AI assistant, Jobs, Applications, Interviews), group "Workspace" (Billing, Team, Settings, Audit logs), "Coming soon", user card.
- **Main panel**, white, fills the rest, rounded on the left side only.
- **Top of page**: breadcrumb, then a header row with the page title on the left and the primary **New job** button on the right.
- **Floating "Ask Eligible"** button, fixed at the bottom right, dark, at 88% opacity.
- The sidebar collapses to a 92px icon rail on wide screens and becomes a slide-out drawer below 900px.

### Page patterns
| Pattern | Used on |
|---|---|
| **List page**: title, optional filters, one bordered table | Jobs, Applications, Interviews |
| **Dashboard**: greeting, banner, 4 stat cards, two columns | Overview |
| **Two-column workspace**: media on the left, tabbed panel on the right | Interview review, Full details |
| **Form page**: two cards, form left, info right | Settings |
| **Chat page**: conversation list left, thread and composer right | AI assistant |

Breakpoints: 1380px (stack dashboard columns), 1180px (stack two-column workspaces), 900px (sidebar becomes a drawer, tables become stacked cards), 560px (single column).

---

## 3. Components

**Primary button** (`New job`, `Full details`): 54px high, 14px radius, blue gradient, white 17px text, a translucent white 30px tile holding the icon at the left.

**Secondary button**: 38 to 48px high, 14px radius, `pill` fill, `ink2` text. On white surfaces it gains a 1px border. Hover darkens the fill slightly.

**Dark button** (Save, Play answer, Create): `ink` fill, white text, a white 32 to 38px icon tile where an icon is used.

**Icon button**: 40px square, 12 to 14px radius, transparent, `pill` on hover.

**Tag / status label**: 8px radius, 13px text, 26 to 28px high. Pairs: Open (green), Paused (amber), Closed (grey), Finished and Interviewed (blue), Shortlisted (green), Rejected and Don't advance (red), Applied (violet), High cheating risk (amber).

**Chip / filter button**: 14px radius, `pill` fill. Selected state is solid `ink` (filters) or solid blue (question chips).

**Tabs, sliding**: a `pill` track with 5px padding and 12px inner radius. The selected tab is white with a thin border. Panels slide horizontally.

**Table**: 28px radius, 1px border, header row on `#f6f7f9` (54px), rows at 84 to 90px with a hairline between them. A row highlights on hover and opens its detail when clickable.

**Card**: white, 1px `line` border, 28 to 32px radius, 22 to 26px padding.

**Input / select**: 50px high, 14px radius, `pill` fill, no border. Focus turns white with a blue border. Selects use a chevron on the right.

**Stat card**: label with an icon on top, a large number, one muted line below. The whole card is a link.

**Score row**: 40px icon tile, label and caption, a 6px bar, value with a muted "/ max".

**Question card**: blue gradient Q badge (44px, 14px radius, white text, no border), question text, tags, five-segment meter, points, dark play tile.

**Transcript bubbles**: interviewer on the left in `pill` grey with a logo avatar, candidate on the right in `#dbe8ff` with a photo avatar. A small corner is flat on the speaker's side. Each message carries a kind tag, an "Interrupted by the candidate" tag where relevant, and a clickable time chip.

**Heat map**: 30 cells per row (about 12 seconds each), 22px high, 5px radius. Four levels: none `#eef0f4`, then three blues (`#cfe0ff`, `#7fb0f7`, `#1b6ee8`). Integrity rows use the red equivalents (`#fcdadd`, `#f08a94`, `#d6304a`).

**Bottom fade**: where a panel's content continues below, a white gradient (84px) sits at the bottom edge and disappears at the end of the scroll.

**Floating Ask Eligible chat**: opens above the button, 410px wide, 28px radius, thin border, greeting, suggested questions, input, and a note that answers are demo data.

**Search pop-up**: opens in the middle of the screen over a dimmed backdrop. Grouped results, arrow-key navigation, Enter to open, Esc to close. Shortcut: Ctrl or ⌘ + K.

**Drawer** (Behaviour and flags, Why this score): slides in from the right, 460px, rounded on the left.

---

## 4. Interaction

- Hover: fills darken one step; cards and rows get a very light tint; the floating button goes to full opacity.
- Focus: 2px blue outline, 14px radius. Every control is reachable by keyboard.
- Selected tab or filter: stronger fill, never only a colour change.
- Destructive actions (Delete) ask for a second click.
- Toasts: a dark pill at the bottom centre for 2 to 2.5 seconds, for actions that have no page change.
- Motion is short: 150 to 350ms, ease-out. Bars and sliders may animate; respect reduced motion.

---

## 5. Content and tone

- Short, direct labels: "Why this score", "Rescore", "Full details".
- Numbers always carry their unit or total: `8.8 / 55`, `−40`, `1/5`.
- Status wording is plain: "Don't advance", "Missed", "Partly correct", "Not answered".
- Avoid helper sentences that repeat the title or the layout.
- Dates are written `26 Nov` in lists and `26/11/2026` where a full date helps.

---

## 6. Screens

| Screen | File | Notes |
|---|---|---|
| Overview | `overview.html` | Greeting with photo, assistant banner, 4 stat cards, open roles, latest interviews, new applications, "Needs your attention" |
| AI assistant | `assistant.html` | Conversations, empty state with 3 suggestions, composer with attach, @ Job and voice |
| Jobs | `jobs.html` | Filter tabs with counts, table with icon tiles, copy link, pause, close, delete |
| Applications | `applications.html` | Search, job, stage and sort filters, ranked table with photos and score bars |
| Interviews | `interviews.html` | Status and score tags, opens the interview |
| Settings | `settings.html` | Company logo upload, organization form, role card |
| Interview review | `index.html` | Video player, summary card, tabbed Score / Must-haves / Transcript panel |
| Full details | `details.html` | Why this score slider, six-tab detail panel, cheating likelihood, heat map, voices, flags, session |

Shared files: `app.css` (tokens and components), `pages.css` (list, form and dashboard pages), `shell.js` (sidebar, search), `chat.js` (Ask Eligible).

---

## 7. Assets

- Logo (`eligible-logo.png`) and mark (`eligible-icon.png`), used in the sidebar, banner, chat and floating button.
- Sample photos: the candidate, the user's avatar, and eight stock portraits for applicants.
- Fonts: Geist, Geist Mono and Manrope from Google Fonts; icons from the Hugeicons stylesheet.

## 8. Known demo shortcuts
Data is sample data and is not saved. Two pages disagree on integrity totals (`−40` / 4.4 on the interview page, `−47` / 5.7 on Full details). Billing, Team and Audit logs have no pages yet.
