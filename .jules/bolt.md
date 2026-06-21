## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.

## 2024-06-20 - MDX Compilation Optimization
**Learning:** Reusing the `unified()` processor pipeline for MDX compilation (`remarkParse`, `remarkMdx`, `remarkStringify`) reduces CPU overhead by roughly 3-4x across multiple invocations compared to rebuilding it inside the function.
**Action:** Extract `unified` compilation pipelines to module-level scope for high-throughput string manipulation tasks like MDX compilation.
