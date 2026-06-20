## 2024-05-24 - Unified Pipeline Performance

**Learning:** When using `unified` and `remark` for parsing markdown, instantiating the pipeline `unified().use(...)` repeatedly per-compilation is surprisingly slow. `unified` does a lot of plugin resolution and setup work.

**Action:** Always extract the instantiated processor pipeline to a module-level constant or class property and call `.parse()` or `.stringify()` on the cached pipeline.
