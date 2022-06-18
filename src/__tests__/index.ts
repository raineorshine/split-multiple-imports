import path from 'path'
import splitMultipleImports from '../index'

test('splitMultipleImports', async () => {
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
          path: '../../x',
        },
        {
          line: "import { x7, x8, x9 } from '../../x'",
          names: ['x7', 'x8', 'x9'],
          path: '../../x',
        },
      ],
      path: path.resolve(__dirname, '../../sample/index.ts'),
    },

    // nested imports
    {
      parsed: [
        {
          line: "import { a4, a5, a6 } from '../../a'",
          names: ['a4', 'a5', 'a6'],
          path: '../../a',
        },
        {
          line: "import { a7, a8, a9 } from '../../a'",
          names: ['a7', 'a8', 'a9'],
          path: '../../a',
        },
      ],
      path: path.resolve(__dirname, '../../sample/a/a.ts'),
    },

    // imports on separate lines
    {
      parsed: [
        {
          line: "import { b14, b15, b16 } from '../../b1'",
          names: ['b14', 'b15', 'b16'],
          path: '../../b1',
        },
        {
          line: "import { b17, b18, b19 } from '../../b1'",
          names: ['b17', 'b18', 'b19'],
          path: '../../b1',
        },
      ],
      path: path.resolve(__dirname, '../../sample/b/nested1.ts'),
    },

    // more nested imports
    {
      parsed: [
        {
          line: "import { b24, b25, b26 } from '../../b2'",
          names: ['b24', 'b25', 'b26'],
          path: '../../b2',
        },
        {
          line: "import { b27, b28, b29 } from '../../b2'",
          names: ['b27', 'b28', 'b29'],
          path: '../../b2',
        },
      ],
      path: path.resolve(__dirname, '../../sample/b/nested2.ts'),
    },
  ])
})
