## 2025-06-30 - Fix code injection in MDX compiler
**Vulnerability:** Untrusted MDX expressions were being evaluated directly using `new Function()`, which poses a severe arbitrary code execution vulnerability.
**Learning:** Evaluated strings inside Markdown AST visitors need a bounded execution environment. `new Function()` executes code with full access to the global scope (like `process`).
**Prevention:** Always use an AST-based evaluator or restrict the execution scope via `node:vm` when interpreting expressions within text parsers. While `node:vm` is not a hardened sandbox for strongly untrusted code, it limits global scope leakage and stops trivial script injection vectors.
