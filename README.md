[![npm version](https://img.shields.io/npm/v/split-multiple-imports)](https://www.npmjs.com/package/split-multiple-imports)

Splits multiple names in a single es module import into multiple lines.

- Assumes default imports.
- Traverses all \*.ts files recursively from the current working directory.
- Ignores node_modules.

## Usage

Dry run:

```sh
$ split-multiple-imports --dry
9 imports in 4 files
```

Ignore certain import paths:

```sh
$ split-multiple-imports --dry --ignore constants
7 imports in 3 files
```

Okay, let's do it:

```sh
$ split-multiple-imports
Replaced 9 imports in 4 files
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
