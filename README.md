# JOBIFY

Career-services website with a browser-based PDF/DOCX resume checker.

## Run Locally

Requires Node.js 22.12+ or 24+.

```sh
npm ci
npm run dev
```

## Verify and Build

```sh
npx oxlint src
npm run build
npm run preview
```

The built site is in `dist/`. Hosting must route unknown paths to `index.html`
for `/ats`, `/ats/results`, `/privacy`, and `/terms`.

## Resume Analysis

Resume processing runs in the browser. Scores are deterministic and indicative,
not a guarantee of interviews or employment. Automated category scores have a
disclosed 90% ceiling, and the overall score has a 70/100 ceiling. Individual
check outcomes and raw category scores are retained separately from these limits.

Service buttons link to the configured WhatsApp destination. No payment gateway
or backend is required for this version.
