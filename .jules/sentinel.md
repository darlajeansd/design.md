## 2024-06-19 - node:vm context isolation
**Vulnerability:** Code injection via MDX expressions evaluated using `new Function()`.
**Learning:** `new Function()` executes code in the global scope, allowing access to `process`, `require`, and potentially leading to arbitrary code execution if an attacker can control the input.
**Prevention:** Use `vm.runInNewContext()` to provide basic isolation and prevent access to the global scope. Note that `vm.runInNewContext()` is not a fully secure sandbox, but it significantly mitigates the risk of arbitrary code execution compared to `new Function()`. Always pass a shallow copy of the scope object (`{ ...scope }`) to prevent state leakage.
