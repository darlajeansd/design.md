## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2025-03-02 - Unified Processor Reuse in MDX Compiler
**Learning:** Recreating `unified()` pipelines with `remark` plugins on every function call introduces measurable overhead due to internal plugin registration and setup, significantly slowing down processes that repeatedly parse or stringify content.
**Action:** Extract `unified()` processor pipelines into module-level constants or class properties so they are instantiated only once per module load and can be safely reused for `parse` or `stringify` calls.
