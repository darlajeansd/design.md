import vm from 'node:vm';
const scope = { a: 1 };
const context = vm.createContext({ ...scope });
const result = vm.runInContext(`(function() { return a; })()`, context);
console.log(result);
try {
  vm.runInContext(`(function() { return this.constructor.constructor('return process.env')(); })()`, context);
  console.log('escaped!');
} catch (e) {
  console.log('safe!', e.message);
}
