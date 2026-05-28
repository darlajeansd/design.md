## 2024-05-30 - [MDX Compiler RCE via `new Function`]
**Vulnerability:** The internal build script `packages/cli/src/linter/spec-gen/compiler.ts` uses `new Function` to evaluate MDX expressions. This executes code injected from `docs/spec.mdx` directly in the Node.js context.
**Learning:** Even internal build scripts shouldn't use `new Function` if they don't strictly need to.
**Prevention:** Avoid `new Function` for simple variable substitution or use safer alternatives. Here, we can replace it with a limited parser or simply by restricting evaluation to the provided scope.
