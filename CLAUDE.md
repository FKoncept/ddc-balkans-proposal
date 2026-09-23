# CLAUDE.md — The DDC Group Balkans proposal

The rules for this repository. **Why** things are the way they are lives in
`PROGRESS.md` (full history). **What is left** lives in `TODO.md`. Keep this file short.

## What this is

A click-through proposal website that **F Koncept** (employer branding agency,
Sarajevo) presents to the recruiter at **The DDC Group Balkans**
(https://balkans.theddcgroup.com, offices in Sarajevo and Belgrade).

The recruiter's core problem: applications arrive through the **WP Job Openings**
WordPress plugin, are copied by hand into a large Excel file, and statuses there
(contacted, employed, working, left...) drift out of date. People who already work
there get contacted again, people who quit are not flagged, and so on.

The site presents **three developed proposals** (each with a mockup and its own detail
page that opens in a new tab), a list of smaller quick wins, a rough difficulty and
effort estimate for each, and an honest "what we do not promise" section.

## Structure

- `site/` is the whole website: plain HTML, CSS and a little JS, no build step.
  - `site/index.html` is the presentation (slide deck, keyboard and click navigation).
  - `site/ideas/*.html` are the detail pages, linked with `target="_blank"`.
  - `site/assets/` holds the shared stylesheet and scripts.
- `vercel.json` at the root serves `site/` as a static site.

## Non-negotiable rules

- **`PROGRESS.md` is updated in the same commit as the work it describes.**
  `CLAUDE.md`, `PROGRESS.md` and `TODO.md` must be current at every commit.
- **Only promise what F Koncept can actually deliver.** No invented metrics, no
  "saves X hours" claims without data, no legal-compliance guarantees. Estimates are
  labelled as rough.
- **Never invent client facts.** Every candidate name and number in the mockups is
  sample data and is visibly marked as such. Facts about DDC come from their public
  site (recorded in `PROGRESS.md`) or from the user.
- **No em or en dashes in visitor-facing copy** (carried over from the F Koncept
  house style). Use commas, colons, full stops or brackets.
- **Brand:** DDC's own palette and type (Onest; navy to teal gradient; teal, raspberry,
  green and lavender accents). Details and hex values are in `PROGRESS.md`.
- **Accounts:** GitHub `FKoncept`, Vercel `fkoncept`. The repo is public. Commits are
  authored as `F Koncept <fkonceptadmin@gmail.com>`.
- The site carries `noindex`: it is public, but it is a client pitch, not marketing.
