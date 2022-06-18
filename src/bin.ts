#!/usr/bin/env node
import fs from 'fs'
import splitMultipleImports from './index.js'

const [, , ...args] = process.argv

const ignoreIndex = args.indexOf('--ignore')
const options = {
  dry: args.includes('--dry'),
  ignore: ignoreIndex !== -1 ? args[ignoreIndex + 1].split(',') : [],
}

const imports = await splitMultipleImports(process.cwd(), options)
const numStatements = imports.reduce((accum, match) => accum + match.parsed.length, 0)
console.info(
  `${options.dry ? '' : 'Replaced '}${numStatements} import${numStatements === 1 ? '' : 's'} in ${imports.length} file${
    imports.length === 1 ? '' : 's'
  }`,
)

if (!options.dry) {
  imports.forEach(match => fs.promises.writeFile(match.filePath, match.replaced))
}
