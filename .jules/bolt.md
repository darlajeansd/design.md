## 2026-05-16 - Reusing Unified/Remark Pipeline Avoids Instantiation Overhead
**Learning:** Instantiating the unified and remark processor pipeline (e.g. `unified().use(remarkParse)...`) on every execution creates significant overhead when parsing markdown repeatedly in high-frequency paths like `ParserHandler.execute` and `compileMdx`.
**Action:** Extract processor pipelines to class properties or module-level constants so they are instantiated only once and reused across executions.
