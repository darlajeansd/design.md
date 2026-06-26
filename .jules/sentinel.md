## 2026-06-26 - [Code Injection]
**Vulnerability:** Insecure use of `new Function` for arbitrary code execution in `compileMdx` when evaluating untrusted MDX text or flow expressions (`new Function(...Object.keys(scope), \`return \${expr}\`)`).
**Learning:** `new Function` runs code outside of an isolated context with access to the global scope. MDX evaluation naturally evaluates expressions and thus this code path could easily execute any supplied Javascript snippet.
**Prevention:** Using `vm.runInNewContext` offers basic sandbox execution which restricts the context to just what is provided (`scope`).
