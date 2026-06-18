## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2024-05-18 - Unified Processor Instantiation
**Learning:** In the MDX compiler (`compileMdx`), `unified` processor pipelines (`parser` and `stringifier`) were being recreated on every execution.
**Action:** When using `unified` and `remark` for markdown parsing, instantiate the processor pipeline once (e.g., as a module-level constant) and reuse it for subsequent `.parse()` or `.stringify()` calls to drastically improve performance.
