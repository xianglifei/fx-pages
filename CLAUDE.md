# fx-pages

## Research HTML filenames — auto-English rule

Whenever the user asks to commit / push / deploy the project, BEFORE staging,
check every `research/*.html` filename. If any filename contains non-ASCII
characters (e.g. Chinese), rename it to a pure-English slug **automatically**
— do not wait to be asked to translate.

Rules for the rename:
- Translate the title into a descriptive English slug: lowercase, hyphen-
  separated. Use the entity's official English name when known
  (e.g. 达势股份 → `dpc-dash`, 美股七姐妹 → `us-magnificent-seven-performance`).
- Preserve the trailing `-YYYYMMDD` date suffix exactly.
- Keep the `.html` extension.
- Use `git mv` if the file is already tracked, otherwise `mv`.
- Mention any renames in the commit message.

A filename is non-compliant if it contains any character outside ASCII
(a quick check: `ls research/*.html | grep -P '[^\x00-\x7F]'`).

## Deploy workflow

- Routine authorized deploys commit and push directly to `main` — no feature
  branches.
- Before pushing, run `node scripts/check-research-pages.js` to enforce the
  research page layout guardrail (body padding/margin must stay 0). Fix any
  violations before committing rather than skipping the check.
