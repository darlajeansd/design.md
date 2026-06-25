## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.

## 2024-06-25 - Caching unified processor pipelines
**Learning:** Instantiating `unified().use(...)` chains inside frequent execution paths (like `compileMdx`) creates significant overhead, even just 1000 iterations take hundreds of milliseconds due to recreating the pipeline. Additionally, `Object.keys()` and `Object.values()` evaluations inside inner loops (like an AST visit function) scale poorly.
**Action:** When using `unified`, declare processors at the module level. Similarly, hoist static extraction logic out of inner loops for observable performance benefits.
