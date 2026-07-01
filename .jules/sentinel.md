## 2026-07-01 - Replace new Function with node:vm
**Vulnerability:** Use of `new Function` for MDX expressions enables arbitrary code execution within the Node.js global scope.
**Learning:** Avoid using `new Function` to evaluate dynamic or untrusted strings. The provided mitigation, `node:vm`, offers isolation but isn't a robust sandbox.
**Prevention:** Use safer alternatives like `vm.runInContext` with a securely defined scope or an AST-based evaluator for stronger security guarantees.
