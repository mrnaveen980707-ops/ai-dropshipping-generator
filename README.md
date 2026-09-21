# AI Dropshipping Research Toolkit

An open-source browser-based toolkit for structuring early-stage dropshipping research for India and global markets.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![No API key required](https://img.shields.io/badge/API%20key-not%20required-brightgreen)
![Client-side](https://img.shields.io/badge/data-client--side-blue)

## What it does
The toolkit now includes:
- product research briefs for India and global markets
- audience, positioning, creative-angle and product-page prompts
- supplier landed-cost and margin calculator
- supplier-readiness checklist
- India COD/RTO contribution planner
- Markdown and CSV export
- deterministic research engine with unit tests

> This is a research and planning aid. It does **not** verify live demand, supplier quality, ad costs, profitability, taxes, compliance, or legal status.

## Quick start
1. Download or clone the repository.
2. Open `index.html` in a browser.
3. Use the product research, supplier economics, or COD/RTO modules.

No build step, backend or API key is required.

## Run tests
```bash
node tests/research.test.js
```

## Design principles
- transparent assumptions
- user-provided economics rather than fabricated market data
- no required paid services
- client-side by default
- hypotheses clearly separated from verified evidence

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

## Roadmap
See [ROADMAP.md](ROADMAP.md).

## Contributing
Issues, bug reports, documentation improvements and feature contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Responsible use
Validate demand, actual costs, shipping, product safety, platform policies, IP/trademark rights, taxes and consumer-law requirements independently.

## License
MIT — see [LICENSE](LICENSE).
