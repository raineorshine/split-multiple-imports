[![npm version](https://img.shields.io/npm/v/split-multiple-imports)](https://www.npmjs.com/package/split-multiple-imports)
[![build status](https://img.shields.io/github/workflow/status/raineorshine/split-multiple-imports/Tests/main?label=tests&logo=github)](https://github.com/raineorshine/split-multiple-imports/actions?query=workflow%3ATests+branch%3Amain)

Splits many names in a single import into multiple lines.

Assumes default imports

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