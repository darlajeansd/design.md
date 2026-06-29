## 2026-06-29 - Unified Processor Instantiation
**Learning:** Re-instantiating the `unified()` processor pipeline per `.parse()` or `.stringify()` call incurs substantial performance overhead, especially in loops like MDX rendering.
**Action:** Always extract `unified().use(...)` pipelines to module-level constants or class properties and reuse the instantiated `Processor` for repeated operations.
