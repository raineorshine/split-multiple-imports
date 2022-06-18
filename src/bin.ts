#!/usr/bin/env node
import splitMultipleImports from './index.js'

const imports = await splitMultipleImports(process.cwd())

console.log(JSON.stringify(imports, null, 2))
