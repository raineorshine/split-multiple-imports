import fs from 'fs'
import path from 'path'

// globby v12+ does not import correctly in typescript + babel setup
// https://github.com/sindresorhus/globby/issues/193
const globby = require('globby')

const cwd = process.cwd()

const splitMultipleImports = async (startPath: string) => {
  const files: string[] = await globby(['**/*.ts', '!**/node_modules'], { cwd: startPath })

  // parse imports
  const imports = await Promise.all(
    files.map(async file => {
      const fullPath = path.resolve(startPath, file)
      const text = await fs.promises.readFile(fullPath, 'utf-8')

      // we cannot easily parse imports that span multiple lines with a single RegExp
      // instead, match all imports and use the starting and ending char indices to slice out the full import statement
      const matches = text.matchAll(/^import \{(.*)/gm)
      const indices = Array.from(matches || []).map(match => match.index)
      const importStatements = indices.map(index => {
        const indexFirstQuote = text.indexOf("'", index! + 1)
        const indexSecondQuote = text.indexOf("'", indexFirstQuote + 1)
        return text.slice(index, indexSecondQuote + 1)
      })

      // parse individual import statements
      const parsed = importStatements.map(statement => {
        // use matchAll to gain access to groups
        // but there will only be 0 or 1 matches
        const matches = statement.replace(/\n/g, '').matchAll(/import \{(.*)\} from '(\.[./]*.*)'/g)
        return matches
          ? Array.from(matches).map(([line, names, path]) => ({
              line: statement,
              // trim and split on any number of spaces to handle extra whitespace is present in multi-line import
              names: names.trim().split(/, */g),
              importPath: path,
            }))[0]
          : null
      })
      return {
        parsed: parsed
          // filter out imports with multiple names
          .filter(match => match && match.names.length > 1),
        filePath: fullPath,
      }
    }),
  )

  const importsFiltered = imports.filter(parsedImport => parsedImport.parsed.length > 0)

  return importsFiltered
}

export default splitMultipleImports
