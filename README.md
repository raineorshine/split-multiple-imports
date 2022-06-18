[![npm version](https://img.shields.io/npm/v/split-multiple-imports)](https://www.npmjs.com/package/split-multiple-imports)

Splits multiple names in a single es module import into multiple lines.

- Assumes default imports.
- Traverses all \*.ts files recursively from the current working directory.
- Ignores node_modules.

## Usage

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

## Options

Dry run:

```sh
$ split-multiple-imports --dry
9 imports in 4 files
```

Ignore specific import paths:

```sh
$ split-multiple-imports --ignore constants
Replaced 7 imports in 3 files
```

Replace only specific import paths:

```sh
$ split-multiple-imports --filter constants
Replaced 2 imports in 1 file
```
