## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2024-05-18 - Unified AST Stringify Overhead
**Learning:** Similar to the parse overhead, instantiating the `unified().use(...)` pipeline for `remarkStringify` on every compile call introduces redundant CPU overhead. The `.stringify()` method is stateless relative to the configuration.
**Action:** Extract both parse and stringify processor pipelines to module-level constants and reuse them.
