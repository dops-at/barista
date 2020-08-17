// Run with "cd [barista directory] && node bazelify [component name]"
const { readFileSync, writeFileSync } = require('fs');

const componentName = process.argv[2];

// Jest config
