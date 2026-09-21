# AI Dropshipping Research Toolkit

An open-source browser-based toolkit for structuring early-stage dropshipping research for India and global markets.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![No API key required](https://img.shields.io/badge/API%20key-not%20required-brightgreen)
![Client-side](https://img.shields.io/badge/data-client--side-blue)

## Why this exists
Dropshipping research is usually spread across notes, spreadsheets, supplier conversations, ad libraries, storefront reviews and calculators. This project turns those recurring tasks into a transparent, inspectable toolkit that can be run locally in a browser.

The project deliberately avoids pretending that generated text is live market evidence. Wherever real data matters—supplier cost, delivery rate, RTO, competitor quality, product-page readiness—the user provides the inputs and the toolkit makes the assumptions visible.

## Current modules
- Local workspace: browser-only save/load plus versioned JSON import/export
- Product research brief: audience, positioning, creative angles, risks and validation
- Supplier economics: landed cost, gross margin and readiness checklist
- India COD/RTO contribution planner
- Competitor comparison framework
- 3-angle creative testing planner
- Product-page CRO checklist and score
- Markdown and CSV export
- Deterministic research engine with Node-based unit tests

> This project is a research and planning aid. It does **not** verify live demand, supplier quality, ad costs, profitability, taxes, compliance, reviews, competitor claims, or legal status.

## Quick start
1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Use the modules with your own real inputs.

No backend or API key is required.

## Local-first workspace
The browser UI can save your current inputs to localStorage on your own device. You can also export a versioned JSON workspace and import it later. These controls are designed to keep the workflow usable without a hosted account or database.

## Run tests
```bash
node tests/research.test.js
```

## Design principles
- transparent assumptions
- user-provided data rather than fabricated market evidence
- client-side by default
- no required paid services
- hypotheses clearly separated from verified facts
- reusable functions that can be tested independently from the UI

## Maintainer note
This project is in active early-stage development. The near-term goal is to make common e-commerce research workflows easier to inspect, test and extend—especially for India-specific realities such as COD/RTO economics that are often missing from generic tools.

Contributions are welcome in research logic, accessibility, documentation, export formats, testing, and additional market templates. New contributors can start with the open issues labelled `enhancement`.

## Project maturity
The repository currently has working modules, unit tests, CI configuration, contribution guidance, issue templates, a roadmap, and a history of feature pull requests. It is still early-stage and does not claim established ecosystem adoption, dependency counts, download volume, or a large contributor base.

## Contributing
Issues, bug reports, documentation improvements and feature contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [ROADMAP.md](ROADMAP.md).

## Responsible use
Validate demand, actual costs, shipping, product safety, platform policies, IP/trademark rights, taxes and consumer-law requirements independently.

## License
MIT — see [LICENSE](LICENSE).


## Changelog
See [CHANGELOG.md](CHANGELOG.md) for recent project updates.
