# @snailicide/build-tools 🐌

<p align="center">
	<img alt="Version" src="https://img.shields.io/npm/v/@snailicide/build-tools"/>
	<a href="#" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/build-tools"/>
	</a>
	<a href="#" target="_blank">
		<img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
	</a>
	<a href="#" target="_blank">
		<img alt="RollupJS" height="20px" src="https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white"/>
	</a>
</p>

_Rollup Tools and Npm updater_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

## 🐌

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
#pnpm
pnpm add @snailicide/build-tools

#yarn
yarn add @snailicide/build-tools

#npm
npm install @snailicide/build-tools
```

## Usage

```ts
/** Rollup.config.ts */

import { RollupOptions } from 'rollup'
import { rollup } from './types/index.js'
import pkg from './package.json' assert { type: 'json' }

const PRINT_EXPORTS: boolean = true

const CONFIG_OBJ = rollup.getConfigEntries(
    {
        source_dir: './src/',
        output_dir: './dist/',
    },
    [
        {
            export_types: ['default', 'import', 'require', 'types'],
            export_key: '*',
            library_name: 'gBuildTools',
        },
    ],
    rollup.DEFAULT_PLUGINS_BUNDLED,
    pkg,
)

const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
```

## Helpful Links
