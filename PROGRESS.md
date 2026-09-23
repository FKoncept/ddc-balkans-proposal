# PROGRESS.md

Running log of every step on the DDC Group Balkans proposal. Updated in the same
commit as the work it describes. Newest session at the bottom.

---

## 2026-09-23 — Session 1: research, ideas, design plan, first build

### Brief received (from the user, F Koncept)

- Client: **The DDC Group Balkans**, https://balkans.theddcgroup.com.
- The person we are helping is **the recruiter**. Current flow as described by the user:
  1. Candidates apply for jobs through a WordPress plugin.
  2. Applications pile up in the plugin's database.
  3. The recruiter copies each application into a big Excel file by hand.
  4. In Excel she marks statuses: contacted, employed, working, not working and so on.
  5. Because it is one big hand-kept file, it drifts: someone who quit gets contacted
     again, someone already working is marked "to contact", and similar mix-ups.
- Goal: brainstorm solutions, develop **three** into a proposal, and present them as a
  click-through web presentation with mockups, separate detail pages that open in new
  tabs, and a rough difficulty estimate for each. Use DDC's colours and vibe.
- Hard rule from the user: **list only what we can actually deliver.**
- Hosting: GitHub `FKoncept` (public repo) and Vercel `fkoncept`.

### Setup

- `git init` in `~/GitHub-FKoncept/ddc`, commit identity set to
  `F Koncept <fkonceptadmin@gmail.com>` (same as the sibling `fkoncept` repo).
- Checked accounts: `gh` has both `amrudincatic` (active) and `FKoncept`; `vercel
  whoami` returns `fkoncept`.
- Created `CLAUDE.md`, `PROGRESS.md`, `TODO.md`. The file names and style follow the
  sibling F Koncept website repo, which also gave us two house rules we carry over:
  never invent client facts, and no em/en dashes in visitor-facing copy.

### Research: balkans.theddcgroup.com (checked in a browser on 2026-09-23)

Stack and content:
- WordPress, **Elementor 4.3** with Elementor Pro, **Hello Elementor** theme.
- Jobs run on **WP Job Openings (AWSM) 4.1.0**. The WP REST API reports **20 published
  job openings**. Locations offered: **Sarajevo** (Bosna i Hercegovina) and
  **Belgrade** (Serbia). Roles: customer support agent, customer service advisor,
  customs broker agent, inside sales representative, B2B sales agent. Languages:
  English, German, French, Italian, Spanish, Dutch, Swedish, Norwegian, Polish, Czech,
  Hungarian.
- The application form asks only for **full name, email, phone, bio, CV upload
  (pdf/doc/docx) and privacy consent**. No language or language level, no city, no
  availability date, no "how did you hear about us".

Findings we can use honestly in the pitch:
- **Every job description is a single image** (a "WE ARE HIRING!" poster, e.g.
  `7-724x1024.jpg`) with an **empty alt text**. So the text of the ad (requirements,
  duties, benefits, "German minimum B2") is invisible to screen readers, translation,
  site search and Google. The page does output `JobPosting` structured data, but its
  `description` field contains only the image tag.
- Job category filter includes a misspelling: **"norvegian language"**, and mixed
  capitalisation ("English Language" vs "Italian language").
- Footer typos: **"Evergreen, Colarado"** and **"Mandaluyong, Metro Manilla"** (may be
  group-wide footer, so we flag it gently).
- There is a "Life at DDC" Instagram (`life.at.ddc`) linked from the site.

Brand tokens taken from the live site (computed styles):
- Navy `#021843` (also `#011749`), gradient navy to teal on the page background.
- Teal button `#1F8093` (hover/lighter `#1E8FA4`).
- Benefit cards carry four coloured top bars: lavender `#827493`, teal `#1F8093`,
  raspberry `#C02A7E` (site also uses `#CC3366`), green `#20A47A`.
- Fonts: **Onest** (almost everything), Plus Jakarta Sans (buttons).

### Brainstorm: the long list

All ideas considered, before choosing. Difficulty is rough: Low (days to 2 weeks),
Medium (3 to 5 weeks), High (6+ weeks).

| Idea | Solves | Difficulty |
|---|---|---|
| One shared candidate database fed automatically from WordPress, one record per person, statuses with history | Copying, duplicates, stale statuses | Medium to High |
| Guardrails: "working" and "do not contact" people drop out of call lists; re-applicants flagged | Contacting people who work there / quit | part of the above |
| Import and de-duplicate the existing Excel (with human confirmation) | Years of history kept | part of the above |
| Lighter alternative: structured Airtable / Microsoft Lists base plus automation | Same pain, smaller budget, less control | Low to Medium |
| Better application form: language + CEFR level, city, availability, talent-pool consent | Cannot filter by language / city today | Low |
| Job ads as real text (keep the poster as a visual) | Accessibility, Google for Jobs, translation | Low |
| Automatic confirmation email to applicants | Candidates hear nothing after applying | Low |
| Reminders and follow-ups ("contacted 7 days ago, no answer") | Things fall through the cracks | Medium (needs database) |
| Re-engage past applicants when a new role opens | Faster shortlists | Medium (needs database) |
| Message templates (invite, rejection, keep-in-pool) | Retyping the same emails | Low (needs database) |
| Data retention housekeeping list | Old CVs kept forever | Low (needs database) |
| Monthly hiring summary (per language, location, source) | Reporting to management by hand | Low to Medium |
| Interview booking link (Microsoft Bookings / Cal.com) | Phone ping-pong to set times | Low |
| Employee referral page ("know someone who speaks Dutch?") | Hard-to-fill languages | Low |
| "Life at DDC" careers content (people, office, day in the role) | Employer brand, F Koncept's core service | Medium |
| Site tidy-up (typos, category names) | Credibility | Low |

Rejected, and why:
- **AI CV scoring / automatic ranking.** We can build it, but we cannot promise it is
  fair or accurate, and automated candidate decisions raise legal questions under EU
  and local data law. Not something to pitch.
- **Replacing WordPress or the job plugin.** Not needed; the plugin works for
  candidates. We add to it rather than rip it out.
- **Syncing with DDC's HR/payroll system.** We do not know what it is. Moved to the
  questions in `TODO.md`; it is mentioned as "possible if it can export".
- **WhatsApp Business API messaging.** Approval, cost and consent overhead. Instead we
  offer plain click-to-chat links (open WhatsApp/Viber with the number filled in).

### The three proposals (chosen)

1. **One candidate list** (the core fix). Every application flows automatically from
   WordPress into one shared database; one record per person (matched on email and
   phone); status pipeline with full history; guardrails so working and do-not-contact
   people never appear in call lists; existing Excel imported with a duplicate review
   step. Recommended build: small web app (EU-hosted database) plus a small WordPress
   connector. Lighter alternative offered honestly: Airtable / Microsoft Lists.
   Difficulty **Medium to High**, rough effort **5 to 8 weeks**.
2. **Better applications**. New form fields (languages with level, city, availability,
   talent-pool consent), job ads as real text with the poster kept as a picture,
   correct `JobPosting` data, automatic confirmation email. Difficulty **Low**, rough
   effort **1 to 2 weeks**. Can be done first and on its own.
3. **Talent pool and follow-ups**. Reminders, message templates, "new role? here are
   past applicants who match", retention housekeeping, monthly summary. Difficulty
   **Medium**, rough effort **3 to 4 weeks**, requires proposal 1.

Plus a **quick wins** page (booking link, referral page, careers content, site tidy-up,
click-to-chat) and an explicit **what we do not promise** section.

### Design plan (frontend-design pass)

- **Colour**: DDC navy `#021843` as the presentation ground with their navy-to-teal
  gradient; teal `#1F8093` for actions; the four benefit-card colours are reused as
  **candidate status colours**, so the brand device carries meaning: lavender = new,
  teal = in contact, green = working, raspberry = left / do not contact. Mockups are
  light "app windows" (`#F3F6FA` surface, `#FFFFFF` panels) so the product reads as
  real software against the navy deck.
- **Type**: Onest only (their face), 400/500/600/700, tabular numbers in mockups.
- **Layout**: index is a vertical slide deck (scroll-snap, arrow keys, side progress
  rail with slide names), left-aligned text. Detail pages are long-form reading pages
  on a light background with the mockups inline.
- **The one memorable thing**: the opening slide shows two contradicting Excel rows for
  the same (sample) person, which merge into one clean record. That is the only
  unprompted animation. Everything else moves only when clicked.
- **Checked against generic defaults**: no all-caps eyebrows, no numbered markers except
  where the content is a real sequence (the current flow and the roadmap), no arrows
  appended to buttons, no monospace labels, no middle-dot meta strings.
