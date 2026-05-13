## 2026-05-13 - Nested loops in state iterators
**Learning:** Linter rules iterating over entire `symbolTable` collections inside component property iterations cause significant O(n^2) bottlenecks on larger design systems. Object reference equality checks (`symValue === value`) allow for safe and reliable optimization using a precomputed Map (`valueToPaths`).
**Action:** Always check for repeated full-collection scans in AST/Model validation rules and replace them with O(1) Map lookups for reverse value-to-path resolution.
