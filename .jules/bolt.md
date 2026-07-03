## 2024-05-17 - Unified AST Parser Re-instantiation Overhead
**Learning:** Instantiating the `unified().use(...)` pipeline for `remarkParse` and `remarkFrontmatter` on every function call introduces measurable CPU overhead when parsing many files, because plugin resolution and internal state structures are rebuilt each time. The `.parse()` method is stateless relative to the configuration.
**Action:** Always extract `unified` processor pipelines to module-level constants or static properties and reuse them across parses to maximize throughput.
## 2025-02-28 - Unified Processor Re-instantiation Overhead in MDX Compiler
**Learning:** Similar to the remark parser learning, instantiating `unified().use(...)` for `remarkMdx` and `remarkStringify` on every call to `compileMdx` introduces unnecessary overhead. The `parse` and `stringify` methods are stateless with respect to the input document. Re-instantiating the entire pipeline per execution (like inside a linter or compiler) represents a classic performance bottleneck.
**Action:** Extract `unified` processor pipelines (including parsing and stringifying) to module-level constants and reuse them across function invocations.
