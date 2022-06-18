import fs from 'fs'
import path from 'path'
import { globby } from 'globby'

const cwd = process.cwd()

const paths = await globby(['**/*.ts', '!**/node_modules'])

console.log(paths.length)
