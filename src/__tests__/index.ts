import path from 'path'
import fs from 'fs'
import splitMultipleImports from '../index'

test('parse imports with multiple names', async () => {
  const startPath = path.resolve(__dirname, '../../sample')
  const result = await splitMultipleImports(startPath)
  expect(result).toEqual([
    // ignore imports with single names
    // handle multiple import statements
    {
      parsed: [
        {
          line: "import { x4, x5, x6 } from '../../x'",
          names: ['x4', 'x5', 'x6'],
          importPath: '../../x',
        },
        {
          line: "import { x7, x8, x9 } from '../../x'",
          names: ['x7', 'x8', 'x9'],
          importPath: '../../x',
        },
        {
          line: `import {
  y1,
  y2,
  y3 
} from '../../y'`,
          names: ['y1', 'y2', 'y3'],
          importPath: '../../y',
        },
      ],
      filePath: path.resolve(__dirname, '../../sample/index.ts'),
      replaced: `import x1 from '../../x1'
import x2 from '../../x2'
import { x3 } from '../../x3'
import x4 from '../../x/x4'
import x5 from '../../x/x5'
import x6 from '../../x/x6'
import x7 from '../../x/x7'
import x8 from '../../x/x8'
import x9 from '../../x/x9'
import y1 from '../../y/y1'
import y2 from '../../y/y2'
import y3 from '../../y/y3'
`,
    },

    // nested imports
    {
      parsed: [
        {
          line: "import { a4, a5, a6 } from '../../a'",
          names: ['a4', 'a5', 'a6'],
          importPath: '../../a',
        },
        {
          line: "import { a7, a8, a9 } from '../../a'",
          names: ['a7', 'a8', 'a9'],
          importPath: '../../a',
        },
      ],
      filePath: path.resolve(__dirname, '../../sample/a/a.ts'),
      replaced: `import a1 from '../../a1'
import a2 from '../../a2'
import { a3 } from '../../a3'
import a4 from '../../a/a4'
import a5 from '../../a/a5'
import a6 from '../../a/a6'
import a7 from '../../a/a7'
import a8 from '../../a/a8'
import a9 from '../../a/a9'
`,
    },

    // imports on separate lines
    {
      parsed: [
        {
          line: "import { b14, b15, b16 } from '../../b1'",
          names: ['b14', 'b15', 'b16'],
          importPath: '../../b1',
        },
        {
          line: "import { b17, b18, b19 } from '../../b1'",
          names: ['b17', 'b18', 'b19'],
          importPath: '../../b1',
        },
      ],
      filePath: path.resolve(__dirname, '../../sample/b/nested1.ts'),
      replaced: `import b11 from '../../b11'
import b12 from '../../b12'
import { b13 } from '../../b13'
import b14 from '../../b1/b14'
import b15 from '../../b1/b15'
import b16 from '../../b1/b16'
import b17 from '../../b1/b17'
import b18 from '../../b1/b18'
import b19 from '../../b1/b19'
`,
    },

    // more nested imports
    {
      parsed: [
        {
          line: "import { b24, b25, b26 } from '../../b2'",
          names: ['b24', 'b25', 'b26'],
          importPath: '../../b2',
        },
        {
          line: "import { b27, b28, b29 } from '../../b2'",
          names: ['b27', 'b28', 'b29'],
          importPath: '../../b2',
        },
      ],
      filePath: path.resolve(__dirname, '../../sample/b/nested2.ts'),
      replaced: `import b21 from '../../b21'
import b22 from '../../b22'
import { b23 } from '../../b23'
import b24 from '../../b2/b24'
import b25 from '../../b2/b25'
import b26 from '../../b2/b26'
import b27 from '../../b2/b27'
import b28 from '../../b2/b28'
import b29 from '../../b2/b29'
`,
    },
  ])
})
