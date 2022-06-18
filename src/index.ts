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
      const matches = text.matchAll(/import \{ (.*) \} from '(\.[./]*.*)'/g)
      const parsed = Array.from(matches || []).map(([line, names, path]) => ({ line, names, path }))
      return {
        parsed: parsed
          .map(match => ({
            ...match,
            names: match.names.split(', '),
          }))
          // filter out imports with multiple names
          .filter(match => match.names.length > 1),
        path: fullPath,
      }
    }),
  )

  const importsFiltered = imports.filter(parsedImport => parsedImport.parsed.length > 0)

  return importsFiltered
}

export default splitMultipleImports
