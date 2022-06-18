#!/usr/bin/env node
import splitMultipleImports from './index.js'

const imports = await splitMultipleImports(process.cwd())

console.log(JSON.stringify(imports[0], null, 2))
console.log(imports.length)
