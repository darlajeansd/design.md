## 2024-06-24 - MDX Expression Evaluation with node:vm
**Vulnerability:** Arbitrary code execution via `new Function('return ' + expr)` when evaluating MDX expressions.
**Learning:** Refactoring to `node:vm` requires wrapping expressions in parentheses `(${expr})` so object literals aren't parsed as block statements. Additionally, `vm.runInNewContext` mutates the scope, requiring a shallow copy `{ ...scope }` to prevent state leakage. Finally, `node:vm` is not a secure boundary, but provides basic isolation over `new Function`.
**Prevention:** Avoid `new Function` for evaluating untrusted input. Use `node:vm` with parenthesized expressions and cloned scope objects for basic isolation, but prefer AST-based evaluators or `isolated-vm` for true sandboxing.
