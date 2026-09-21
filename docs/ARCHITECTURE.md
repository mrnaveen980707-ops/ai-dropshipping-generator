# Architecture

The project intentionally has a small, inspectable architecture.

## Browser UI
`index.html` contains the interface and rendering logic. It collects user inputs, calls the research engine, and renders a structured brief.

## Research engine
`research.js` contains the deterministic research framework. It has no network calls and no model dependency. The same function can be tested in Node.js and used in the browser.

## Tests
`tests/research.test.js` checks required-input handling and market-specific output.

## Design goals
- no required API key
- no hidden external data collection
- transparent assumptions
- easy to fork and extend
- hypotheses clearly separated from verified evidence

Future integrations should remain optional so the core toolkit stays usable without paid services.
