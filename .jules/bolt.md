## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2025-02-23 - Unified Processor Instantiation
**Learning:** Instantiating `unified()` processor pipelines (like remark-parse, remark-mdx, remark-stringify) is surprisingly heavy. Creating them on every compile call introduces significant overhead.
**Action:** When working with unified/remark/rehype pipelines, always extract the processor instantiation to a module-level constant or class property and reuse the `.parse()` and `.stringify()` methods across calls.
