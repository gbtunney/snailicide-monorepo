# Typedoc

## Installation

```sh
pnpm add -D @snailicide/build-config typedoc typedoc-plugin-markdown
```

## Example Usage

```ts
//typedoc.config.ts

/** Basic Typedoc Config */
import url from 'node:url'
import path from 'path'
import { typedoc } from '@snailicide/build-config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig = typedoc.config(__dirname)

export default typeDocConfig
```

```ts
//typedoc.config.ts

/** Typedoc Config with custom options added */
import url from 'node:url'
import path from 'path'
import { merge, typedoc, isPlainObject } from '@snailicide/build-config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const _config = typedoc.configMarkdown(__dirname)

const typedocConfig = merge.withOptions(
    { mergeArrays: false },
    isPlainObject(_config) ? _config : {},
    {
        /**
         * Entrypoint array is overwritten by this value, use mergeArrays : true
         * to merge all arrays
         */
        entryPoints: [path.resolve(`${__dirname}/src/typedoc/markdown.ts`)],
    },
)

export default typedocConfig
```

## Helpful Links

-   [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/)
