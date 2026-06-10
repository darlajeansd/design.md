
## 2024-05-24 - Fix code injection in MDX compiler
**Vulnerability:** Arbitrary code execution vulnerability in `packages/cli/src/linter/spec-gen/compiler.ts` due to the use of `new Function` for evaluating MDX expressions based on unsanitized user inputs or expressions.
**Learning:** `new Function` allows full access to the global scope and can be trivially abused to execute malicious code. While `node:vm` is not a full security sandbox for untrusted code, it provides isolation from the main global scope and prevents direct global scope access via `new Function`.
**Prevention:** Use an isolated execution context like `node:vm` (`vm.runInContext`) to evaluate expressions in a restricted scope. Avoid using `JSON.stringify` to serialize the injected scope if it contains nested objects with functions.
