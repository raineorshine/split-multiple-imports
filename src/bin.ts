#!/usr/bin/env node
import fs from 'fs'
import splitMultipleImports from './index.js'
import uniq from './lib/uniq.js'

const [, , ...args] = process.argv

const filterIndex = args.indexOf('--filter')
const ignoreIndex = args.indexOf('--ignore')
const options = {
  dry: args.includes('--dry'),
  filter: filterIndex !== -1 ? args[filterIndex + 1].split(',') : [],
  ignore: ignoreIndex !== -1 ? args[ignoreIndex + 1].split(',') : [],
}

const imports = await splitMultipleImports(process.cwd(), options)
const numStatements = imports.reduce((accum, match) => accum + match.parsed.length, 0)

// print summary
console.info(
  `${options.dry ? '' : 'Replaced '}${numStatements} import${numStatements === 1 ? '' : 's'} in ${imports.length} file${
    imports.length === 1 ? '' : 's'
  }`,
)

// print all unique import paths
const uniqueImportPaths = uniq(
  imports.map(match => match.parsed.map(p => p.importPath.replace(/(?:\.?\.\/)*/g, '')).flat()).flat(),
).sort()
console.info(
  `Import paths${options.dry ? '' : ' rewritten'}:\n${uniqueImportPaths.map(path => '  ' + path).join('\n')}`,
)

// write to files
if (!options.dry) {
  imports.forEach(match => fs.promises.writeFile(match.filePath, match.replaced))
}
