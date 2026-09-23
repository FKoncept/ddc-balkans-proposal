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

### Build (same session)

Site structure, plain HTML/CSS/JS, no build step:
- `site/index.html`: 11-slide deck. Start (merge animation), How it works today,
  What we noticed, Three proposals, Proposal 1, 2, 3, Smaller ideas, Suggested
  order, What we promise and what we don't, Next step (questions for the meeting).
  Keyboard (arrows, PageUp/Down, space, Home/End), side rail with slide names,
  counter and prev/next buttons. Proximity scroll-snap on desktop; plain scroll
  under 900px.
- `site/ideas/one-candidate-list.html`: detail page with a **working interactive
  demo** (`site/assets/board.js`): status and language filters, record panel with
  history, status buttons with the guardrail (trying to contact someone "Working" or
  "Do not contact" is refused with the reason), and "Simulate a new application"
  cycling through a new person, a re-application by someone working here, and a
  re-application by someone who left. Also: import-review mockup, two build options
  (recommended web app vs lighter Microsoft Lists / Airtable), steps, included / not
  included.
- `site/ideas/better-applications.html`: findings, new form mockup, text job ad
  mockup (content taken from the real German Customer Support Agent poster),
  confirmation email mockup, how it is done, included / needs from you.
- `site/ideas/talent-pool.html`: today view, message templates, new-role shortlist,
  retention housekeeping, monthly summary, included / not included.
- `site/ideas/smaller-ideas.html`: site tidy-up, interview booking link, referral
  page, "what happens after you apply" page, chat buttons, Life at DDC content.
- All detail links from the deck open in a new tab (`target="_blank"`).

Corrections made while building (so nothing overpromises):
- **Checked the plugin's official feature list** (wordpress.org, v4.1.0). The plugin
  has been renamed **HireZoot**. The **free** version already has customizable email
  notifications, auto-delete of applications, and application management; the paid
  **Pro pack** adds a form builder, shortlist/reject/rate, advanced notifications and
  export. Consequences: the confirmation email is pitched as "mostly setup and
  wording", and proposal 1 now has a section "Doesn't the job plugin already do some of
  this?" explaining the real gap (it is built around applications, not people: no
  merging, no Excel history, no knowledge of who works here).
- "We will host data in the EU" limited to the recommended build (the lighter
  alternative depends on product and plan). "Build everything shown" changed to "build
  what you choose".
- Support period after launch not invented ("30 days" removed; "set in the offer").
- Monthly summary moved into proposal 3; the deck's smaller-ideas slide now lists
  the "what happens after you apply" page instead.
- Sample phone numbers masked (`+387 61 ••• 111`) so no real number is shown.
- Numbered markers removed where the content is not a sequence ("Why these four").

Checked in Chrome at 1440x716 (short laptop), 1440x900 and 390x844 (phone): no
horizontal overflow on any page, demo logic verified by script (filters, guardrail,
simulation), merge animation starts only when visible, reduced motion shows the end
state. No em/en dashes anywhere in `site/`.

### Published

- GitHub (public): https://github.com/FKoncept/ddc-balkans-proposal, branch `main`.
- Vercel project `f-koncept/ddc-balkans-proposal`, **connected to the GitHub repo**,
  so a push to `main` deploys to production.
- Live: **https://ddc-balkans-proposal.vercel.app** (all pages return 200, served
  with `X-Robots-Tag: noindex, nofollow` from `vercel.json` plus a robots meta tag).

---

## 2026-09-23 — Session 1 (continued): feasibility check and decisions

### The user asked: can we really deliver all of this?

We answered honestly, splitting the work into three groups. **Safe to promise**:
proposal 2 and the smaller ideas. **Deliverable with conditions**: proposal 1 and,
through it, proposal 3. **Be careful**: the estimates are ranges, not quotes, and the
recruiter's workflow is second-hand.

### Verified in the plugin's source (WP Job Openings / HireZoot, free version from wordpress.org)

- Action **`awsm_job_application_submitted`** (in `class-awsm-job-openings-form.php`)
  fires on every submitted application. Our WordPress add-on for proposal 1 hooks
  here to send the application to the candidate list. **Proposal 1's "no more
  copying" is technically sound.**
- Filter **`awsm_application_form_fields`** lets us add form fields in the **free**
  version. Proposal 2 does **not** need the Pro licence.
- Option **`awsm_jobs_acknowledgement`** / `awsm_jobs_applicant_notification`: the
  free version has an applicant auto-reply with customizable content and template
  tags. The confirmation email is configuration and wording.

### Conditions and risks we named

1. **WordPress access** is the biggest unknown. If DDC group (UK) or an outside
   agency manages the site, we may not be allowed to add a plugin. Proposals 1 and 2
   both depend on it.
2. **Who builds proposal 1.** It is a real small app (logins, CV storage, backups,
   security). 5 to 8 weeks assumes one experienced developer working steadily.
3. **Data responsibility.** Hosting candidate CVs makes F Koncept a processor of
   personal data for DDC: that needs a data processing agreement and ongoing care,
   priced as support.
4. **Excel quality** decides how much manual duplicate review the import needs.

### Decisions from the user

- **The user and Claude will build it together** (proposal 1 and whatever else is
  sold).
- **F Koncept is fine hosting the candidate data**, as long as the client agrees.

### Site changes that followed

- Proposal 1: "Depends on" is now **"Permission to add a small plugin to
  WordPress"** (was "Nothing, can start first"). Added the plain-language note that
  we checked the plugin's code and it announces every new application. "Included"
  now lists a **data processing agreement and backups** when we host the data. "Not
  included, or needs a decision" now lists **permission from whoever manages the
  WordPress site**.
- Proposal 2: the "how it is done" step now says the free plugin is enough (auto-reply
  built in, fields via a small add-on); "Needs from you" says **nothing to buy**,
  replacing the Pro licence line.
- Deck: "We will" now includes signing a data processing agreement; the suggested
  order slide says steps 1 and 2 need permission to add a small plugin to WordPress.

---

## 2026-09-23 — Session 1 (continued): research for two more proposals

The user asked whether there is room for **two more proposals** that improve the
recruiter's job, and that are **not close to the three we already have**. Opinion
first, no site changes yet.

### New research findings

- **Applications do not only come through the WordPress form.**
  - **MojPosao.ba**: DDC MLS d.o.o. Sarajevo posted "Customer Support Agent (English
    language)" on **22 Aug 2026**, deadline 22 Sep 2026. MojPosao has its own apply
    button, so those applications land in MojPosao, not in WordPress.
  - **Email**: an older DDC MLS ad (PDF, 2022) says "apply by sending CV on email:
    posao@ddcce.ba (Sarajevo) or posaobl@ddcce.ba (Banja Luka)". Other results
    mention posao@ddcmls.com. These inboxes may still receive CVs.
  - **LinkedIn**: DDC MLS posted jobs there (for example a Customer Support Advisor
    role, about a year ago, "Be among the first 25 applicants").
  - Also listed on **poslovi.ba** (DDC MLS: "Operater za engleski i njemački
    jezik", remote, data entry, "minimum nivo B2", "Čitanje i pisanje navedenih
    jezika je važnije od vještine izgovora") and **Infostud** (DDC OS Serbia profile).
  - **Consequence:** proposal 1 as written only pulls in WordPress applications. It
    needs an answer for the other channels (see the opinion below), or the "one list"
    promise is incomplete.
- **Banja Luka** is a third DDC site in BiH (theddcgroup.com locations page), but the
  careers site's location filter only lists Sarajevo and Belgrade. Question for the
  client.
- **Language level is the core of every role**, and what matters differs by role:
  spoken for support, written for data entry (the poslovi.ba ad says so directly).
- Candidate interview reviews found online (HelloWorld.rs) are for **DDC OSS**, the
  Belgrade IT company (Git and Excel tests), so they do not describe the language hub.
  dzobs.com (404) and the Klix forum (403) could not be read. **How DDC Balkans tests
  languages today is unknown.**

### Opinion given to the user (not yet on the site)

Recommended two new proposals:
4. **Language check reviewed by DDC's own speakers**: candidates record short spoken
   answers and write one short reply in the target language, in the browser; a
   colleague who speaks that language rates it against a simple level scale; the result
   lands on the record. No AI scoring. Medium, about 3 to 4 weeks.
5. **From "yes" to first day (pre-boarding)**: a personal page for each new hire
   (start date, what to bring, documents to upload, "I'm coming" confirmation) and a
   board for the recruiter; day-one attendance moves the person to "Working". Medium,
   about 3 to 4 weeks.

Considered and not recommended as proposals: hiring requests from team leads (backup
option), multi-channel intake (a gap to close inside proposal 1, not a new proposal),
a candidate FAQ chatbot, AI CV parsing, and automatic posting to job boards (no
verified APIs).

### User decisions on the two new proposals

1. **Add both** proposals 4 and 5.
2. **Other application channels** (MojPosao, LinkedIn, email): not built now, the focus
   stays on the DDC website process. Mention it as an option: if they want, we look
   into it and prepare a plan.
3. The user thinks DDC **already has a language test**. Bring it into the proposal
   as a question rather than assume.

### Site changes

- **Deck:** new slide 8 **"Two more, for later"** (`#later`) between proposal 3 and
  "Smaller ideas": two cards with mini mockups (a Norwegian review with a level picker;
  a "Starting Monday 5 October" readiness list), difficulty and effort, links to the
  new detail pages. Deck is now **12 slides**.
  - Opening lede now mentions "two more ideas for later".
  - Three-proposals footnote points to the two later options.
  - Suggested order note: both can be added any time after step 2, each about 3 to 4
    weeks.
  - Next-step questions: the first now asks where applications arrive (website,
    MojPosao, LinkedIn, email); two added: how languages are tested today (and
    whether an end client requires a test), and who handles documents and day one.
- **New page `site/ideas/language-check.html`** (Proposal 4 of 5): opens with "First,
  a question for you" (they probably test already; if so we build around it). Then:
  why it matters, a phone mockup of the candidate recording screen (German prompt), a
  reviewer mockup (candidate shown as a code, not a name; separate speaking and writing
  levels on the A1 to C2 scale), the result on the record, steps, included / not
  included (no software scoring, not a certificate, no target-language questions
  without their speakers, no replacing a client-required test).
- **New page `site/ideas/first-day.html`** (Proposal 5 of 5): where "employed" and
  "working" get mixed up, a phone mockup of the new hire's page (start date,
  checklist, "I'll be there"), a readiness board, a day-one check-in that sets
  "Working", steps, included / not included (no e-signing of contracts, legal document
  list comes from DDC, not an HR/payroll replacement).
- **Proposal 1 page:** new section "Applications from other places" offering to look
  into MojPosao, LinkedIn, poslovi.ba and email if they want, without promising it.
- Kickers renumbered to "of 5"; previous/next links now run 1, 2, 3, 4, 5, then
  smaller ideas. Smaller ideas kicker is "Alongside the proposals".
- Removed an unverified claim ("one recruiter"): we do not know how many recruiters
  there are.
- New CSS: `.later`, `.phone`, `.answer` / `.wave`, `.rec`, `.levels`, `.checklist`,
  `.cta-mock`, `.mini-bar`.
- Checked at 1440x800, 1440x716 and 390 wide: no horizontal overflow on any page.
- Committed, **not pushed** (user's instruction), so the live site does not show this
  yet.

---

## 2026-09-23 — Session 1 (continued): UX redesign into a guided walkthrough

### Why

The user found the site overwhelming: "someone new that opens it cannot understand
what is going on". Diagnosis:
- 12 dense slides, each with a mockup, bullets, difficulty bars and links at once.
- Organised around our five proposals, not around her problems.
- Jargon on the main path ("guardrails", "WordPress plugin", "data processing
  agreement").
- No clear "what is this, how long does it take, what do you want from me".

### Options explored (`design/ux-options/`, not deployed)

Three clickable mockups, same brand and content, different structure:
- **A. Guided walkthrough**: one idea per screen, progress bar, Next/Back.
- **B. Start from your problem**: five problems in her words; click one to open the fix.
- **C. Your week, before and after**: five moments in a week; one Today / With the
  changes switch.

**The user chose our recommendation:** A as the backbone, with B's problem-in-her-words
on every change screen and C's Today / With this change switch as the picture.
Answers to the open questions:
1. Unsure whether she reads it alone or it is presented: **support both**.
2. The combination.
3. Keep "which would help you?", **clearly marked as only for showing and deciding**.
4. Detail pages: our call. **Kept** (the brief asked for pages that open in new
   tabs), made shorter to read.

### What was built

- **`site/index.html` is now an 11-screen walkthrough** driven by
  **`site/assets/walk.js`** (the old `deck.js` is deleted):
  Start, How it works today, The idea, Change 1 to 5, Your choice, What we promise,
  Next step.
  - Welcome screen: who it is from, what it is, "about 5 minutes", nothing decided,
    names made up, and a five-item "what's inside" list. Start or skip to the changes.
  - Chapter pills (clickable), progress bar, bottom bar with Back, "Step n of 10" and
    "Next: <next screen>".
  - Every screen has its own link (`#today`, `#idea`, `#change-1` ... `#next`), browser
    Back works, arrow keys and PageUp/PageDown work (for presenting). The browser's
    own jump to an anchor on load is cancelled so the header stays in view. Focus moves
    to the new screen for screen readers. Without JavaScript all screens show in order.
  - "The idea" screen lists the five changes as buttons to jump to any of them.
  - **Each change screen uses one template:** "Change n of 5: name", a benefit
    headline, her problem in a "Sounds familiar?" box, then What changes / What it
    takes / What we need, fold-away "behind the scenes" or "what it is not", a link to
    the detail page (new tab), and on the right a **Today / With this change** switch
    with a small before and after picture.
  - Plain-language size: **Small job / Medium job / Bigger job** (instead of Low /
    Medium / Medium to high), always with the rough weeks.
  - "Your choice": five tick boxes with a rough week total, and a yellow note: "This is
    only here to help you think and decide. Nothing you tick is saved or sent anywhere."
  - "What we promise, and what we don't" is its own short screen.
  - Next step: one hour with the Excel, the nine questions in a fold-away, "reply to
    whoever sent you this link" (contact details still open in `TODO.md`).
- **Honesty fixes during the build:** the problem box first said "You told us", which is
  untrue (she never spoke to us), so it says **"Sounds familiar?"**. Change 5's "after"
  picture shows 7 of 8 ready, not a perfect 8 of 8.
- **Detail pages** now say "Change n of 5", link "Back to the overview" to that change's
  screen, use the plain size words, open with an **"In short"** block (her problem,
  what changes, what it takes, what we need), and gather the heavy parts into one
  **"More detail, if you want it"** group of fold-away sections: other application
  channels, the plugin question, the two ways to build it, how we would run it, and
  what's included / not. Tab titles read "Change n of 5 for The DDC Group Balkans".
- **CSS:** the old deck styles were removed; shared mockup components (alerts, forms,
  task lists, filter pills) were kept; `.wordmark` and `.avatar` were restored after
  the clean-up dropped them (caught by a script that compares classes used against
  classes defined). New: walkthrough layout, `.said`, `.pce`, `details.more`, scene
  switch, sheet, chain, bigstat, picks, two-lists. Chapter pills scroll sideways on
  phones.
- **Checked** at 1440x800, 1440x900 and 390x844: no horizontal overflow on any screen
  or detail page (with all fold-aways open), the demo still works, and navigation
  (Next, arrows, browser Back, chapter jumps, switches, picks total) was tested by
  script and with real key presses.
- Committed, **not pushed** (user's instruction).

### User feedback on the redesign

The user reviewed the walkthrough locally: **"this is much much better"**. Approved as
is. Docs brought up to date (TODO wording now uses "size" and "screen"), committed,
still **not pushed**: the push waits for the user's go.

---

## 2026-09-23 — Session 1 (continued): no long dashes anywhere on the site

The user asked that any "big dash" on the website be replaced. Full check:
- Scanned every HTML, CSS and JS file in `site/` for em dash, en dash, figure dash,
  horizontal bar and minus sign, as characters, HTML entities (`&mdash;`, `&ndash;`,
  `&minus;` and numeric forms) and CSS escapes (`\2014`, `\2013`, `\2212`), plus
  hyphens used as dashes in text.
- **One hit:** the open/closed marker on the fold-away sections ("How does it work
  behind the scenes?" and the others) showed "+" when closed and **"−" (minus sign)**
  when open, drawn by CSS `content: "\2212"`.
- **Fix:** the marker is now a small chevron drawn with CSS borders (pointing down
  when closed, up when open, with a short rotation). No character at all. Same fix in
  `design/ux-options/mockups.css` for consistency.
- Verified: the only CSS-generated text left is "Sounds familiar?" and "What we
  noticed"; no dash-like characters in `walk.js` or `board.js` output strings. The
  chevron was checked in a separate headless Chrome (the DevTools browser was locked
  after the session resumed).
- The `mix&#8209;ups` in the welcome headline is a non-breaking hyphen (short, like a
  normal hyphen), kept on purpose so the word does not split across lines.
- CLAUDE.md rule widened from "no em or en dashes in copy" to "no long dashes anywhere
  a visitor can see them", including CSS-generated content.
- Committed, not pushed.
