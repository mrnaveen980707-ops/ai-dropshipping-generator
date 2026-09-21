# Community Market Template Format

Market templates let contributors add region-specific research checklists without changing the core logic.

## Required fields
- `schemaVersion`: currently `1`
- `id`: stable lowercase identifier
- `name`: human-readable template name
- `checks`: non-empty array of checklist items

Each check requires:
- `key`
- `label`
- optional `weight` from 0 to 100

## Validation
Use `DropshippingResearch.validateMarketTemplate(template)`.

## Example
See `templates/india-commerce-basics.json`.

Templates should contain frameworks and assumptions, not invented statistics or unverifiable claims.
