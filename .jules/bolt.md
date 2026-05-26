## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2026-05-26 - Unified Processor Caching
**Learning:** Instantiating `unified` processor pipelines (with `remark-parse`, `remark-mdx`, `remark-stringify`) within a hot code path (like `compileMdx`) causes significant redundant overhead. It is completely safe to hoist the processor instantiation to a module-level constant and reuse its `parse` or `stringify` methods.
**Action:** Always hoist stateless processor configurations (like `unified()`, parsers, formatters) out of recurring function scopes and reuse the global instance across executions.
