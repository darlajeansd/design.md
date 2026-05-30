## 2024-05-24 - RCE Vulnerability in MDX String Evaluation
**Vulnerability:** Arbitrary Code Execution (RCE) via `new Function` evaluating MDX strings.
**Learning:** Node.js tools need isolated evaluation when parsing dynamically constructed strings to prevent unauthorized code execution.
**Prevention:** Use `node:vm` modules, specifically `vm.runInContext(expr, vm.createContext(Object.assign(Object.create(null), scope)))` to safely evaluate code in a sandboxed execution context without full Node.js privileges.
