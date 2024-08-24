**@snailicide/build-config v1.3.0** • **Docs**

---

# @snailicide/build-config 🐌

<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/@snailicide/build-config" />

  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/build-config" />
  </a>

  <a href="#" target="_blank">
    <img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>
</p>

_Provides repository with base configurations that can be extended in new packages._

### Repository

-   **Github:** [snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

-   **NPM Homepage**: [@snailicide/build-config](https://www.npmjs.com/package/@snailicide/build-config)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

> Important! Suggested package manager is [pnpm](https://pnpm.io)

## Contents

-   [@snailicide/build-config 🐌](#snailicidebuild-config--1)
-   [Installation](#installation)
-   [Examples](#examples)
    -   [Typescript](#typescript)
    -   [Eslint](#eslint)
    -   [Prettier](#prettier)
    -   [Typedoc](#typedoc)
-   [Helpful Links](#helpful-links)
-   [Functions](#functions)
    -   [typedocStandardConfig()](#typedocstandardconfig)
    -   [typedocMaterialTheme()](#typedocmaterialtheme)
    -   [exportJSON()](#exportjson)
    -   [isPlainObject()](#isplainobject)
    -   [safeDeserializeJSON()](#safedeserializejson)
-   [References](#references)
    -   [COMMIT_TYPES](#commit_types)
    -   [configuration](#configuration)
    -   [flatEslintConfig](#flateslintconfig)
    -   [config](#config)
    -   [isNPMPackage](#isnpmpackage)
    -   [packageStandardSchema](#packagestandardschema)
    -   [parseNPMPackage](#parsenpmpackage)
    -   [schemas](#schemas)
    -   [BasePackage](#basepackage)
    -   [PackageJson](#packagejson)
    -   [PackageJsonInput](#packagejsoninput)
    -   [getBanner](#getbanner)
    -   [ExportType](#exporttype)
    -   [EXPORT_KEY_LOOKUP](#export_key_lookup)
    -   [KeyData](#keydata)
    -   [EntryConfig](#entryconfig)
    -   [getOutputObj](#getoutputobj)
    -   [getConfigEntries](#getconfigentries)
    -   [getRollupConfig](#getrollupconfig)
    -   [OutputObjReturnType](#outputobjreturntype)
    -   [ExpandedExportType](#expandedexporttype)
    -   [getPackageExports](#getpackageexports)
    -   [RollupPluginConfigOptions](#rolluppluginconfigoptions)
    -   [RollupPluginKey](#rolluppluginkey)
    -   [RollupPluginConfiguration](#rolluppluginconfiguration)
    -   [CDN_PLUGINS_BUNDLED](#cdn_plugins_bundled)
    -   [DEFAULT_PLUGINS_BUNDLED](#default_plugins_bundled)
    -   [getPluginsConfiguration](#getpluginsconfiguration)
    -   [viteDocServerConfig](#vitedocserverconfig)
    -   [viTestConfig](#vitestconfig)
-   [Type Aliases](#type-aliases)
    -   [Typedoc](#typedoc-1)
    -   [TypedocMarkdownConfig](#typedocmarkdownconfig)
    -   [MaterialThemeOptions](#materialthemeoptions)
    -   [TypedocConfig](#typedocconfig)
    -   [JSONExportEntry\<Type>](#jsonexportentrytype)
    -   [JSONExportConfig\<Type>](#jsonexportconfigtype)
    -   [NotAssignableToJson](#notassignabletojson)
    -   [JSONCompatible\<Type>](#jsoncompatibletype)
-   [Namespaces](#namespaces)

## @snailicide/build-config 🐌

The `@snailicide/build-config` package provides reusable configuration files for commonly used tooling. It aims to define,extend, and manage build settings , ensuring consistency across different environments and projects

#### Build/Config Tools

-   [commitlint - Lint commit messages](https://commitlint.js.org/#/)
-   [commitlint-config-conventional - Shareable commitlint config](https://www.npmjs.com/package/@commitlint/config-conventional)
-   [Commitizen](https://commitizen-tools.github.io/commitizen/)
-   [eslint - Find and fix problems in your JavaScript code.](https://eslint.org/)
-   [typescript-eslint](https://typescript-eslint.io/getting-started/)
-   [NPM - Node Package Manager](https://www.npmjs.com/)
-   [Prettier - Opinionated Code Formatter](https://prettier.io/)
-   [Rollup - The JavaScript module bundler](https://rollupjs.org/guide/en/)
-   [Typedoc - Documentation Generator for TypeScript Projects](https://typedoc.org/)
-   [Typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/)
-   [Vite - Next Generation Frontend Tooling](https://vitejs.dev/)
-   [Vitest - A modern testing library for Vue 3](https://vitest.dev/)

## Installation

```sh
#pnpm
pnpm add @snailicide/build-config -D

#yarn
yarn add @snailicide/build-config -D

#npm
npm install @snailicide/build-config --development
```

## Examples

### Typescript

```json5
/* tsconfig.json */

{
    extends: '@snailicide/build-config/tsconfig-base',
    compilerOptions: {
        outDir: './../types',
        rootDir: '.',
        declarationDir: './../types',
    },
    exclude: ['**/*.test.ts'],
    include: ['**/*.ts', '**/*.cts', '**/*.mts'],
}
```

---

### Eslint

```js
/* eslint.config.js */

import { EsLint } from '@snailicide/build-config'

const FLAT_CONFIG = await EsLint.flatConfig()

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['packages/**/docs/**/*'],
    },
]
```

---

### Prettier

```json5
/* include in package.json */
{
    prettier: '@snailicide/build-config/prettier',
}
```

**_OR_**

```ts
/* prettier.config.cjs */

/* extend the base config */
const { Prettier, merge } = require('@snailicide/build-config')
const options = {
    plugins: ['@shopify/prettier-plugin-liquid'],
    overrides: [
        {
            files: '*.liquid',
            options: {
                tabWidth: 2,
            },
        },
    ],
}

module.exports = merge(Prettier.config, options)
```

---

### Typedoc

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

**_OR_**

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

-   [Linting with Type Information | typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting)
-   [How to quickly configure ESLint for import sorting | Medium](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853)
-   [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

> Note: to transpile to (var and no arrow functions use target = ES5

## Functions

### typedocStandardConfig()

```ts
function typedocStandardConfig(__dirname): undefined | Partial<TypeDocOptions>
```

#### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `__dirname` | `string` |

#### Returns

`undefined` | `Partial`\<`TypeDocOptions`>

#### Defined in

[packages/build-config/src/typedoc/standard.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L10)

---

### typedocMaterialTheme()

```ts
function typedocMaterialTheme(
    __dirname,
): undefined | (Partial<TypeDocOptions> & MaterialThemeOptions)
```

#### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `__dirname` | `string` |

#### Returns

`undefined` | `Partial`\<`TypeDocOptions`> & [`MaterialThemeOptions`](README.md#materialthemeoptions)

#### Defined in

[packages/build-config/src/typedoc/standard.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L36)

---

### exportJSON()

```ts
function exportJSON(config, outdir): boolean
```

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `config` | [`JSONExportConfig`](README.md#jsonexportconfigtype)\<`JsonObject` \| `JsonArray`> \| readonly `ReadonlyObjectDeep`\<[`JSONExportEntry`](README.md#jsonexportentrytype)\<`JsonObject` \| `JsonArray`>>\[] | `undefined` |
| `outdir` | `undefined` \| `string` | `undefined` |

#### Returns

`boolean`

#### Defined in

[packages/build-config/src/utilities.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L22)

---

### isPlainObject()

```ts
function isPlainObject<Type>(value): value is Type
```

#### Type Parameters

| Type Parameter                   |
| -------------------------------- |
| `Type` _extends_ `UnknownRecord` |

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

#### Returns

`value is Type`

#### Defined in

[packages/build-config/src/utilities.ts:71](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L71)

---

### safeDeserializeJSON()

```ts
function safeDeserializeJSON<Type>(data): undefined | JSONCompatible<Type>
```

#### Type Parameters

| Type Parameter |
| -------------- |
| `Type`         |

#### Parameters

| Parameter | Type                                                      |
| --------- | --------------------------------------------------------- |
| `data`    | [`JSONCompatible`](README.md#jsoncompatibletype)\<`Type`> |

#### Returns

`undefined` | [`JSONCompatible`](README.md#jsoncompatibletype)\<`Type`>

#### Defined in

[packages/build-config/src/utilities.ts:77](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L77)

## References

### COMMIT_TYPES

Re-exports [COMMIT_TYPES](namespaces/commitlint.md#commit_types)

### configuration

Re-exports [configuration](namespaces/commitlint.md#configuration)

### flatEslintConfig

Re-exports [flatEslintConfig](namespaces/EsLint.md#flateslintconfig)

### config

Renames and re-exports [flatEslintConfig](namespaces/EsLint.md#flateslintconfig)

### isNPMPackage

Re-exports [isNPMPackage](namespaces/npm.md#isnpmpackage)

### packageStandardSchema

Re-exports [packageStandardSchema](namespaces/npm.md#packagestandardschema)

### parseNPMPackage

Re-exports [parseNPMPackage](namespaces/npm.md#parsenpmpackage)

### schemas

Re-exports [schemas](namespaces/npm.md#schemas)

### BasePackage

Re-exports [BasePackage](namespaces/npm.md#basepackage)

### PackageJson

Re-exports [PackageJson](namespaces/npm.md#packagejsonschema-baseschema)

### PackageJsonInput

Re-exports [PackageJsonInput](namespaces/npm.md#packagejsoninputschema-baseschema)

### getBanner

Re-exports [getBanner](namespaces/rollup.md#getbanner)

### ExportType

Re-exports [ExportType](namespaces/rollup.md#exporttype)

### EXPORT_KEY_LOOKUP

Re-exports [EXPORT_KEY_LOOKUP](namespaces/rollup.md#export_key_lookup)

### KeyData

Re-exports [KeyData](namespaces/rollup.md#keydata)

### EntryConfig

Re-exports [EntryConfig](namespaces/rollup.md#entryconfig)

### getOutputObj

Re-exports [getOutputObj](namespaces/rollup.md#getoutputobj)

### getConfigEntries

Re-exports [getConfigEntries](namespaces/rollup.md#getconfigentries)

### getRollupConfig

Re-exports [getRollupConfig](namespaces/rollup.md#getrollupconfig)

### OutputObjReturnType

Re-exports [OutputObjReturnType](namespaces/rollup.md#outputobjreturntype)

### ExpandedExportType

Re-exports [ExpandedExportType](namespaces/rollup.md#expandedexporttype)

### getPackageExports

Re-exports [getPackageExports](namespaces/rollup.md#getpackageexports)

### RollupPluginConfigOptions

Re-exports [RollupPluginConfigOptions](namespaces/rollup.md#rolluppluginconfigoptionskey)

### RollupPluginKey

Re-exports [RollupPluginKey](namespaces/rollup.md#rolluppluginkey)

### RollupPluginConfiguration

Re-exports [RollupPluginConfiguration](namespaces/rollup.md#rolluppluginconfiguration)

### CDN_PLUGINS_BUNDLED

Re-exports [CDN_PLUGINS_BUNDLED](namespaces/rollup.md#cdn_plugins_bundled)

### DEFAULT_PLUGINS_BUNDLED

Re-exports [DEFAULT_PLUGINS_BUNDLED](namespaces/rollup.md#default_plugins_bundled)

### getPluginsConfiguration

Re-exports [getPluginsConfiguration](namespaces/rollup.md#getpluginsconfiguration)

### viteDocServerConfig

Re-exports [viteDocServerConfig](namespaces/vite.md#vitedocserverconfig)

### viTestConfig

Re-exports [viTestConfig](namespaces/vitest.md#vitestconfig)

## Type Aliases

### Typedoc

```ts
type Typedoc: {
  config: (__dirname) => TypedocConfig | undefined;
  configMarkdown: (__dirname) => TypedocMarkdownConfig | undefined;
  materialTheme: (__dirname) => TypedocConfig & MaterialThemeOptions | undefined;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `config` | (`__dirname`) => [`TypedocConfig`](README.md#typedocconfig) \| `undefined` | [packages/build-config/src/typedoc/index.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L16) |
| `configMarkdown` | (`__dirname`) => [`TypedocMarkdownConfig`](README.md#typedocmarkdownconfig) \| `undefined` | [packages/build-config/src/typedoc/index.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L17) |
| `materialTheme` | (`__dirname`) => [`TypedocConfig`](README.md#typedocconfig) & [`MaterialThemeOptions`](README.md#materialthemeoptions) \| `undefined` | [packages/build-config/src/typedoc/index.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L18) |

#### Defined in

[packages/build-config/src/typedoc/index.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L15)

---

### TypedocMarkdownConfig

```ts
type TypedocMarkdownConfig: Partial<TypeDocOptions> & Partial<PluginOptions> & RemarkPluginOptions;
```

#### Defined in

[packages/build-config/src/typedoc/markdown.ts:39](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/markdown.ts#L39)

---

### MaterialThemeOptions

```ts
type MaterialThemeOptions: {
  themeColor: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `themeColor` | `string` | [packages/build-config/src/typedoc/standard.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L6) |

#### Defined in

[packages/build-config/src/typedoc/standard.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L5)

---

### TypedocConfig

```ts
type TypedocConfig: Partial<TypeDocOptions>;
```

#### Defined in

[packages/build-config/src/typedoc/standard.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L8)

---

### JSONExportEntry\<Type>

```ts
type JSONExportEntry<Type>: {
  data: Type;
  filename: string;
};
```

#### Type Parameters

| Type Parameter                 | Default type                |
| ------------------------------ | --------------------------- |
| `Type` _extends_ `Jsonifiable` | `JsonArray` \| `JsonObject` |

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `data` | `Type` | [packages/build-config/src/utilities.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L15) |
| `filename` | `string` | [packages/build-config/src/utilities.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L16) |

#### Defined in

[packages/build-config/src/utilities.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L13)

---

### JSONExportConfig\<Type>

```ts
type JSONExportConfig<Type>: JSONExportEntry<Type>[];
```

#### Type Parameters

| Type Parameter                 | Default type                |
| ------------------------------ | --------------------------- |
| `Type` _extends_ `Jsonifiable` | `JsonArray` \| `JsonObject` |

#### Defined in

[packages/build-config/src/utilities.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L18)

---

### NotAssignableToJson

```ts
type NotAssignableToJson: bigint | symbol | Function;
```

#### Defined in

[packages/build-config/src/utilities.ts:55](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L55)

---

### JSONCompatible\<Type>

```ts
type JSONCompatible<Type>: unknown extends Type ? never : { [Property in keyof Type]: Type[Property] extends JsonValue ? Type[Property] : Type[Property] extends NotAssignableToJson ? never : JSONCompatible<Type[Property]> };
```

#### Type Parameters

| Type Parameter |
| -------------- |
| `Type`         |

#### Defined in

[packages/build-config/src/utilities.ts:61](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L61)

## Namespaces

| Namespace | Description |
| --- | --- |
| [commitlint](namespaces/commitlint.md) | Commitlint configuration for use in Monorepo. |
| [EsLint](namespaces/EsLint.md) | Eslint / Tslint Configuration |
| [npm](namespaces/npm.md) | Collection of Generic NPM Package Utility Schemas and Typeguards |
| [Prettier](namespaces/Prettier.md) | Prettier Configuration |
| [rollup](namespaces/rollup.md) | Rollup Configuration, Plugins, and helper functions |
| [vite](namespaces/vite.md) | Vite Configuration ( only docserver for now ) |
| [vitest](namespaces/vitest.md) | Vitest Configuration |
