## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2023-10-27 - Unified Processor Initialization Overhead
**Learning:** Instantiating `unified()` processor pipelines (like those using `remarkParse`, `remarkMdx`, `remarkStringify`) is unexpectedly expensive in this codebase's architecture if performed per function call, especially inside hot paths.
**Action:** Always extract `unified` processor pipelines to module-level constants or class properties. Re-use `.parse()` and `.stringify()` across invocations instead of recreating the pipeline entirely.
