const path = require('path');

console.log(`
Executed:
================================================================

STORED: ${process.env.BAZEL_NODE_RUNFILES_HELPER}`);
// const runfiles = require(process.env['BAZEL_NODE_RUNFILES_HELPER']);
const args = process.argv.slice(2);

console.log(`

cwd: ${process.cwd()}
Relative: ${path.resolve(args[1])}

`);
console.log(process.argv);
