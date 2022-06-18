#!/usr/bin/env node
import fs from 'fs'
import splitMultipleImports from './index.js'

const imports = await splitMultipleImports(process.cwd())
const numStatements = imports.reduce((accum, match) => accum + match.parsed.length, 0)
console.info(
  `Replaced ${numStatements} import${numStatements === 1 ? '' : 's'} in ${imports.length} file${
    imports.length === 1 ? '' : 's'
  }`,
)
imports.forEach(match => fs.promises.writeFile(match.filePath, match.replaced))
