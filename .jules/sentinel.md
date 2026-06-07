## 2024-06-07 - Arbitrary Code Execution in Markdown Compiler
**Vulnerability:** Arbitrary code execution vulnerability via `new Function` in `packages/cli/src/linter/spec-gen/compiler.ts` when evaluating markdown expressions.
**Learning:** Node's `vm.runInContext` is not a secure sandbox if the injected scope objects retain prototypes from the main context.
**Prevention:** Always set up a pristine context with `Object.create(null)` and reconstruct non-function objects using `JSON.parse` evaluated *within* the sandbox. For functions, wrap them using an inner-realm factory to avoid prototype leakage.
