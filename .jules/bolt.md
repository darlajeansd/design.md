## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2024-05-18 - Unified AST parsing optimization
**Learning:** Instantiating the unified processor pipeline once as a module-level constant significantly improves performance in `compileMdx`, rather than re-creating it per-execution.
**Action:** Extract unified parsing/stringifying configurations into shared module-level constants wherever possible to avoid re-initialization overhead.
