## 2025-02-14 - Prevent RCE in MDX string evaluation
**Vulnerability:** Arbitrary code execution risk from evaluating MDX expressions using `new Function()`. It allowed executing context-escaping logic (e.g., accessing `process.env.PATH` or other node APIs).
**Learning:** Evaluating user or dynamically generated expressions via `new Function` or `eval()` exposes node context which leads to Remote Code Execution (RCE) in CLI/Linter tools.
**Prevention:** Use `vm.runInContext` passing an explicit, prototype-less `Object.create(null)` context, and ensure expressions are safely wrapped (e.g. in parentheses) when evaluating dynamic input.
