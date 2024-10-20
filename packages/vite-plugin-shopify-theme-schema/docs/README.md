**@snailicide/vite-plugin-shopify-theme-schema v0.2.5** • **Docs**

---

# @snailicide/vite-plugin-shopify-theme-schema 🐌

<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/@snailicide/vite-plugin-shopify-theme-schema" />

  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/vite-plugin-shopify-theme-schema" />
  </a>

  <a href="#" target="_blank">
    <img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>

  <a href="#" target="_blank">
    <img alt="RollupJS" height="20px" src="https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white" />
  </a>
</p>

This plugin adds features to make it easier to manage the JSON schema files for
Shopify Theme Settings. Please see [Inspiration](#inspiration) section for more
info and backstory!

> Many thanks to [barrel-shopify](https://github.com/barrel/barrel-shopify) by
> Barrel NY for readme inspiration.

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

## Contents

- [🐌](#)
- [Features](#features)
  - [Dynamic Shopify Setting Schemas](#dynamic-shopify-setting-schemas)
- [Examples](#examples)
  - [Installation](#installation)
  - [Tests](#tests)
- [Usage](#usage)
  - [Options](#options)
- [Inspiration](#inspiration)
  - [vite-plugin-shopify-theme-settings by Barrel NY](#vite-plugin-shopify-theme-settings-by-barrel-ny)
- [Helpful Links](#helpful-links)
- [To-Do](#to-do)
- [Bugs](#bugs)
- [Functions](#functions)
- [Type Aliases](#type-aliases)

## 🐌

- [🐌 Welcome to @snailicide/vite-plugin-shopify-theme-schema 🐌](#welcome-to--snailicide-vite-plugin-shopify-theme-schema---)
  - [Features](#features)
  - [Examples](#examples)
    - [Installation](#installation)
    - [Tests](#tests)
  - [Usage](#usage)
    - [Options](#options)
  - [Inspiration](#inspiration)
    - vite-plugin-shopify-theme-settings
  - [Helpful Links](#helpful-links)
  - [To-Do](#to-do)
  - [Bugs](#bugs)

<small><i><a href="http://ecotrust-canada.github.io/markdown-toc/">Table of
contents generated with markdown-toc</a></i></small>

## Features

### Dynamic Shopify Setting Schemas

- Build Shopify Setting schemas dynamically from Typescript, Javascript, and
  JSON files
- Share and reuse schema partials between different files. Promotes efficient
  code reusability.
- Benefit from the language support provided by IDEs such as VSCode and
  [WebStorm](https://www.jetbrains.com/webstorm/) like autocompletion,
  formatting, collapsing
- Use Typescript autocompletion to declare schema structure using my code
  library. Included types and validators range from generic to highly specific.

## Examples

See [**example_theme_config**](./example_theme_config/) folder for usage
examples of [validators](_media/settings_colors.ts) and
[types](_media/settings_typography.ts).

### Installation

This library is published in the NPM registry and can be installed using any
compatible package manager.

```sh
#pnpm
pnpm add @snailicide/vite-plugin-shopify-theme-schema

#yarn
yarn add @snailicide/vite-plugin-shopify-theme-schema

#npm
npm install @snailicide/vite-plugin-shopify-theme-schema
```

### Tests

```sh
# build example files
pnpm --filter=@snailicide/vite-plugin-shopify-theme-schema test:example
```

## Usage

Add `pluginShopifyThemeSchema` plugin to vite.config.js / vite.config.ts:

```js
import pluginShopifyThemeSchema from '@snailicide/vite-plugin-shopify-theme-schema'

/* * Example  * */
export default {
  plugins: [
    pluginShopifyThemeSchema({
      themeRoot: '.',
      sourceCodeDir: './src/global_settings',
      entryPoints: {
        'settings_schema.json': 'settings_schema.js',
      },
    }),
  ],
}
```

- Create a `sourceCodeDir` directory under your theme's folder to hold the
  source files for your `settings_schema.json` or custom entrypoint.
- Create a Javascript,Typescript or JSON file for each 'entrypoint' of your
  theme settings. You can compose different files to determine the settings
  sequence.
- Make sure that your schema source directory is listed in your theme's
  `.shopifyignore` file to avoid errors when pushing code to Shopify.

### Options

```ts
import type { ShopifyLiquidModulesOptions } from './src/options'

/* * Default Options Available * */
const defaultobj: ShopifyLiquidModulesOptions = {
  themeRoot: '.',
  sourceCodeDir: './src',
  entryPoints: {
    'settings_schema.json': 'settings_schema.js',
  },
}
```

## Inspiration

### [vite-plugin-shopify-theme-settings](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-theme-settings) by Barrel NY

Since i am new to vite plugin, i used this as my starting structure and was
heavily inspired by the overall concept of the
vite-plugin-shopify-theme-settings. I skipped looping thru the json directory
and instead used an 'entryPoint' approach.

## Helpful Links

- [Vite](https://vitejs.dev/)
- [Shopify Liquid reference](https://shopify.dev/api/liquid)
- [Shopify Theme Settings reference](https://shopify.dev/themes/architecture/settings)
- [vite-plugin-shopify-theme-settings](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-theme-settings)
  _(by barrel-shopify)_
- the awesome
  [vite-plugin-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify)
  _(by barrel-shopify)_

## To-Do

- [ ] Unit Tests

## Bugs

Please create an issue if you found any bugs, to help us improve this project!

## Functions

| Function                                      | Description |
| --------------------------------------------- | ----------- |
| [default](functions/default.md)               | -           |
| [resolveOptions](functions/resolveOptions.md) | -           |

## Type Aliases

| Type alias                                                                             | Description |
| -------------------------------------------------------------------------------------- | ----------- |
| [ShopifyThemeSchemaOptions](type-aliases/ShopifyThemeSchemaOptions.md)                 | -           |
| [ResolvedShopifyThemeSchemaOptions](type-aliases/ResolvedShopifyThemeSchemaOptions.md) | -           |
