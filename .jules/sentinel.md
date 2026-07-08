## 2024-07-08 - Use `node:vm` instead of `new Function` for evaluating expressions
**Vulnerability:** Code injection via `new Function` in `packages/cli/src/linter/spec-gen/compiler.ts`. `new Function` executes code in the global scope and can lead to code execution vulnerabilities.
**Learning:** `node:vm` provides a safer execution environment than `new Function` for evaluating dynamic expressions. However, note that it is not a complete sandbox and cannot protect against determined malicious code, but it is better than `new Function` for mitigating some execution risks and avoids global scope pollution.
**Prevention:** Replace `new Function` with `vm.runInContext` using an IIFE execution context, passing a shallow copy of the scope.
