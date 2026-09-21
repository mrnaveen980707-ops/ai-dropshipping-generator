# AI Dropshipping Research Toolkit

An open-source browser-based toolkit for structuring early-stage dropshipping research for India and global markets.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![No API key required](https://img.shields.io/badge/API%20key-not%20required-brightgreen)
![Client-side](https://img.shields.io/badge/data-client--side-blue)

## What it does
Enter a product name, select a market, and generate a structured research brief covering:
- target customer hypotheses
- problem / benefit framing
- offer ideas
- ad angles and hooks
- product-page prompts
- risk checks
- testing checklist
- India vs global considerations

> This project is a research and ideation aid. It does **not** verify live demand, supplier quality, ad costs, profitability, or legal/compliance status.

## Why this project exists
Dropshipping research is often fragmented across spreadsheets, notes, ad libraries, supplier pages and AI chats. This project turns a repeatable research framework into a lightweight, transparent tool that anyone can inspect, modify and extend.

## Quick start
1. Download or clone the repository.
2. Open `index.html` in a browser.
3. Enter a product and market.
4. Generate the research brief.

No build step, backend or API key is required.

## Current features
- India and Global market modes
- Structured product research brief
- Audience and positioning prompts
- Offer and creative-angle generator
- Risk checklist
- Copy-to-clipboard export
- Deterministic research engine in `research.js`
- Unit tests runnable with Node.js
- Fully client-side; no user data is intentionally sent anywhere

## Run tests
```bash
node tests/research.test.js
```

## Project structure
```
.
├── index.html
├── research.js
├── tests/
│   └── research.test.js
├── docs/
│   └── ARCHITECTURE.md
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── ROADMAP.md
├── SECURITY.md
├── LICENSE
└── .github/
    ├── workflows/
    └── ISSUE_TEMPLATE/
```

## Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Roadmap
See [ROADMAP.md](ROADMAP.md). Planned areas include optional research-source adapters, supplier-evaluation checklists, richer scoring models, export formats, accessibility improvements, and contributor-friendly modules.

## Contributing
Issues, bug reports, documentation improvements and feature contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening a PR.

## Responsible use
Do not present generated text as verified market evidence. Validate demand, costs, shipping, product safety, platform policies, intellectual-property rights, taxes and consumer-law requirements independently.

## License
MIT — see [LICENSE](LICENSE).
