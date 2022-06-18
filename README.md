[![npm version](https://img.shields.io/npm/v/split-multiple-imports)](https://www.npmjs.com/package/split-multiple-imports)

Splits multiple names in a single es module import into multiple lines.

- Assumes default imports.
- Traverses all \*.ts files recursively from the current working directory.
- Ignores node_modules.

## Usage

```sh
$ split-multiple-imports
```

Before:

```ts
import { a, b, c } from '../lib'
```

After:

```ts
import a from '../lib/a'
import b from '../lib/b'
import c from '../lib/c'
```
