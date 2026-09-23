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

The site presents **three core proposals** (one candidate list, better applications,
talent pool and follow-ups) plus **two for later** (language check, from yes to first
day). Each has a mockup and its own detail page that opens in a new tab. There is also a
list of smaller ideas, a rough difficulty and effort estimate for each, and an honest
"what we do not promise" section.

## Structure

- `site/` is the whole website: plain HTML, CSS and a little JS, no build step.
  - `site/index.html` is the presentation (12 slides, keyboard and click navigation).
  - `site/ideas/*.html` are the detail pages, linked with `target="_blank"`:
    `one-candidate-list`, `better-applications`, `talent-pool`, `language-check`,
    `first-day`, `smaller-ideas`. Previous/next links run in that order.
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
- **Live URL:** https://ddc-balkans-proposal.vercel.app. Repo:
  https://github.com/FKoncept/ddc-balkans-proposal. Vercel is connected to the repo:
  **pushing to `main` publishes to the client.** Anything unfinished goes on a branch.
- Preview locally with `python3 -m http.server 4173` from `site/`.
- Facts about WP Job Openings / HireZoot (free vs Pro, hooks we rely on) are recorded
  in `PROGRESS.md`; re-check them before changing what a proposal claims the plugin
  can do.

## Decisions (2026-09-23)

- **Who builds:** the user and Claude, together.
- **Data hosting:** F Koncept may host DDC's candidate data if the client agrees;
  that comes with a data processing agreement and paid ongoing support.
- **Biggest dependency:** permission to add a small plugin to their WordPress site.
  Proposals 1 and 2 both need it.
- **Scope is the DDC website process.** Other channels (MojPosao, LinkedIn, email) are
  only offered as "we can look into it", never promised.
- **Language testing:** DDC probably has a test already. Proposal 4 asks first and
  builds around an existing test rather than replacing it.
