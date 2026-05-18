## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2025-02-23 - Unified Stringifier Re-instantiation Overhead
**Learning:** Just like the parser, instantiating the `unified().use(...)` pipeline for `remarkStringify` (or `remarkMdx`) on every function call introduces measurable CPU overhead. In `packages/cli/src/linter/spec-gen/compiler.ts`, the `compileMdx` function was recreating these pipelines on every invocation, causing significant slowdown during compilation.
**Action:** Extract `unified` processor pipelines for compilation/stringifying to module-level constants and reuse them.
