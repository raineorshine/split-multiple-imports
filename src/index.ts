import fs from 'fs'
import path from 'path'
import { globby } from 'globby'

const cwd = process.cwd()

const splitMultipleImports = async (cwd: string) => {
  const paths = await globby(['**/*.ts', '!**/node_modules'], { cwd })

  // parse imports
  const imports = await Promise.all(
    paths.slice(1).map(async path => {
      const text = await fs.promises.readFile(path, 'utf-8')
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
        path,
      }
    }),
  )

  const importsFiltered = imports.filter(parsedImport => parsedImport.parsed.length > 0)

  return importsFiltered
}

export default splitMultipleImports
