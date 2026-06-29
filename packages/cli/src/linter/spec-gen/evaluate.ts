import * as acorn from 'acorn';

export function safeEvaluate(expr: string, scope: Record<string, unknown>): unknown {
  try {
    const ast = acorn.parse(expr, { ecmaVersion: 2020 });
    const node = (ast as any).body[0].expression;

    function walk(node: any, currentScope: Record<string, unknown>): any {
      if (node.type === 'Literal') {
        return node.value;
      }
      if (node.type === 'Identifier') {
        if (Object.prototype.hasOwnProperty.call(currentScope, node.name)) {
          return currentScope[node.name];
        }
        throw new Error(`Identifier ${node.name} not found in scope`);
      }
      if (node.type === 'BinaryExpression') {
        const left = walk(node.left, currentScope);
        const right = walk(node.right, currentScope);
        switch (node.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return left / right;
        }
      }
      if (node.type === 'MemberExpression') {
        const obj = walk(node.object, currentScope);
        const prop = node.computed ? walk(node.property, currentScope) : node.property.name;
        if (obj === undefined || obj === null) throw new Error("Cannot read property of null/undefined");
        const val = obj[prop];
        if (typeof val === 'function') {
            return val.bind(obj);
        }
        return val;
      }
      if (node.type === 'CallExpression') {
        const callee = walk(node.callee, currentScope);
        const args = node.arguments.map((a: any) => walk(a, currentScope));
        return callee.apply(null, args);
      }
      if (node.type === 'ArrowFunctionExpression') {
         return (...args: any[]) => {
             const newScope = { ...currentScope };
             node.params.forEach((param: any, i: number) => {
                 if (param.type === 'Identifier') {
                     newScope[param.name] = args[i];
                 }
             });
             return walk(node.body, newScope);
         }
      }
      if (node.type === 'TemplateLiteral') {
          return node.quasis.map((q: any, i: number) => {
              let str = q.value.cooked;
              if (i < node.expressions.length) {
                  str += String(walk(node.expressions[i], currentScope));
              }
              return str;
          }).join('');
      }
      throw new Error(`Unsupported syntax type: ${node.type}`);
    }

    return walk(node, scope);
  } catch (e) {
    console.error("Evaluation error:", e);
    return null;
  }
}
