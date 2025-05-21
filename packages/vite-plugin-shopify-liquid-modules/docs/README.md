**@snailicide/vite-plugin-shopify-liquid-modules v0.2.4** • **Docs**

---

# @snailicide/vite-plugin-shopify-liquid-modules 🐌

<p align="center">
 <img alt="Version" src="https://img.shields.io/npm/v/@snailicide/vite-plugin-shopify-liquid-modules"/>
 <a href="#" target="_blank">
  <img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/vite-plugin-shopify-liquid-modules"/>
 </a>
 <a href="#" target="_blank">
  <img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
 </a>
 <a href="#" target="_blank">
  <img alt="RollupJS" height="20px" src="https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white"/>
 </a>
</p>

_This plugin enables Shopify theme developers to structure their code into
"module" folders which keep Liquid template files (snippets and sections)
organized together with their corresponding JS or CSS, while retaining the
standard file structure of Shopify themes. Please see
[Inspiration](#inspiration) section for more info and backstory!_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

## Contents

## 🐌

> Many thanks to [barrel-shopify](https://github.com/barrel/barrel-shopify) by
> Barrel NY for readme inspiration.

- [🐌 Welcome to @snailicide/vite-plugin-shopify-liquid-modules 🐌](#welcome-to--snailicide-vite-plugin-shopify-liquid-modules---)
  - [Author](#author)
  - [Features](#features)
    - [Installation](#installation)
    - [Tests](#tests)
  - [Usage](#usage)
    - [Using scripts in module folders](#using-scripts-in-module-folders)
    - [Options](#options)
  - [Inspiration](#inspiration)
    - Liquid Schema Plugin _(webpack)_
    - vite-plugin-shopify-modules _(vite)_
  - [Helpful Links](#helpful-links)
  - [To-Do](#to-do)
  - [Bugs](#bugs)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of
contents generated with markdown-toc</a></i></small>

## Features

### Module System

- Automatically associates each module folder with the matching **snippet**,
  **section liquid**, and **section schema** files based on parent directory
  name
- Moves liquid files created within module folders to correct theme folders
- Fully compatible with Shopify GitHub integration and Shopify CLI features for
  syncing updates from remote theme

### Dynamic Shopify Section Schemas

- Build Shopify Section schemas dynamically from Typescript, Javascript, and
  JSON files
- Share and reuse schema partials between different modules. Promotes efficient
  code reusability.
- Benefit from the language support provided by IDEs such as VSCode and
  [WebStorm](https://www.jetbrains.com/webstorm/) like autocompletion,
  formatting, collapsing
- Use Typescript autocompletion to declare schema structure using my code
  library. Included types and validators range from generic to highly specific.

## Examples

See [**example_modules**](./example_modules) folder for usage examples of
[validators](_media/schema.ts) and [types](_media/settings.ts).

## Installation

This library is published in the NPM registry and can be installed using any
compatible package manager.

```sh
#pnpm
pnpm add @snailicide/vite-plugin-shopify-liquid-modules

#yarn
yarn add @snailicide/vite-plugin-shopify-liquid-modules

#npm
npm install @snailicide/vite-plugin-shopify-liquid-modules
```

### Tests

```sh
# build example files
pnpm --filter=@snailicide/vite-plugin-shopify-liquid-modules test:example
```

## Usage

Add `pluginShopifyLiquidModules` plugin to vite.config.js / vite.config.ts:

```js
import pluginShopifyLiquidModules from '@snailicide/vite-plugin-shopify-liquid-modules'

export default {
  plugins: [
    pluginShopifyLiquidModules({
      themeRoot: '.',
      modulesDir: './src/example_modules',
      snippets: {
        copy: true,
      },
      sections: {
        copy: true,
      },
    }),
  ],
}
```

- Create a "modules" folder alongside your theme folders, or use the
  `modulesDir` plugin option to specify an alternate location.
- Create a subfolder for each theme module. The folder name should precisely
  match the filename of the corresponding liquid section and/or snippet file.
- If a section or snippet file exists matching the module folder name, a symlink
  will be generated pointing from the module folder to the actual file.
- If a file matching the `[module-name].section.liquid` or
  `[module-name].snippet.liquid` naming convention is found in the module
  folder, it will be moved to the corresponding theme folder and replaced with a
  symlink.
- You can place any other files in the module folder, and they will not be
  affected by the plugin. If you add JS or CSS, make sure these files are
  imported from an entrypoint file somewhere to include them in the bundled
  output.

### Using scripts in module folders

Adding a script file to a module folder will not have any effect until either:

- file is imported and loaded into your shopify theme
- file is imported at end of **section** file, using the schema tag:

```liquid
{% comment %} Example Section File {% endcomment %}
<div class='color-{{ section.settings.color_scheme }} gradient'>Example Section</div>

{% schema 'schema.js' %}
```

**Usage with
[vite-plugin-shopify by barrel-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify):**

When used in combination with the `additionalEntrypoints` option from
vite-plugin-shopify, you also have the option to treat each module script as its
own entry point to be loaded directly onto a page using a script tag. For
example:

```js
// vite.config.js / vite.config.ts
import shopify from 'vite-plugin-shopify'
import shopifyModules from 'vite-plugin-shopify-modules'

export default {
  plugins: [
    shopify({
      additionalEntrypoints: ['modules/**/*.js'],
    }),
    shopifyModules(),
  ],
}
```

```liquid
<!-- modules/cart-drawer/cart-drawer.section.liquid -->
{% render 'vite-tag' with '@modules/cart-drawer' as vite-tag %}
```

See the
[vite-plugin-shopify docs](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify)
for more details on the plugin configuration and `vite-tag` snippet usage.

### Options

```ts
import type { ShopifyLiquidModulesOptions } from './src/options'

/* * Default Options Available * */
const defaultobj: ShopifyLiquidModulesOptions = {
  themeRoot: './theme',
  modulesDir: './modules',
  sections: { prefix: 'g-', copy: false, file_name: 'section' },
  snippets: { prefix: 'g-', copy: false, file_name: '*' },
}
```

## Inspiration

### Liquid Schema Plugin _(webpack)_

This plugin was inspired by David Warrington's article
[Building Shopify Section Schemas with JavaScript](https://ellodave.dev/blog/article/building-shopify-section-schemas-with-javascript/).
It is a Webpack build system plugin, and this was exactly what i was looking
for.

> The
> [Liquid Schema Plugin](https://github.com/davidwarrington/liquid-schema-plugin)
> allows you to export your Shopify Section schemas from JS and JSON files, in
> turn allowing you to build your schemas dynamically, share schema partials
> between several schemas, and benefit from the language support provided by
> IDEs such as VSCode.

My main issue is my code editor would not collapse the Section Schemas in Liquid
Templates unless i wrapped in a script tag, and then Shopify Cli would error
because that is not allowed in the {% schema %} tag. These schemas also tend to
be a **mile long** and i couldn't check for json formatting errors easily,
especially when moving large groups of Section fields.

```liquid
<!-- causes error when liquid is rendered -->
{% schema 'landing-page' %}
<script type="application/json">
    { "name": "Autumn Winter 2020" }
</script>
{% endschema %}
```

```js
/* * Plugin Configuration * */
const LiquidSchemaPlugin = require('liquid-schema-plugin')

module.exports = {
  // ...
  'webpack.extend': {
    plugins: [
      new LiquidSchemaPlugin({
        from: {
          liquid: './src/sections',
          schema: './src/schema',
        },
        to: './dist/sections',
      }),
    ],
  },
}
```

I wanted to be able to reuse sections easily so after some use, i felt like
defining separate directories for **liquid** and **schema** hindered a modular
style approach. I decided on using globs to select the files and added a parent
directory key. Thus, my fork born.

#### [GitHub - gbtunney/liquid-schema-plugin: Build reusable section schemas using Javascript](https://github.com/gbtunney/liquid-schema-plugin)

Here is how the plugin options was defined instead in my fork:

```ts
const plugin = new LiquidSchemaPlugin({
  from: {
    liquid: `${__dirname}/../../src/shopify/sections/**/section-*.liquid`,
    //  schema: `${__dirname}/../../src/shopify/sections/**/schema.ts`
  },
  to: `${__dirname}/../../shopify/sections`,
})
```

### [vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) by Barrel NY _(vite)_

I have long been hunting for a perfect Shopify theme development environment
boilerplate. I wanted something similar to
[uicrooks/shopify-theme-lab](https://github.com/uicrooks/shopify-theme-lab) that
uses **Vite** instead of **Webpack**. A forum comment lead me to the glorious
[vite-plugin-shopify by barrel-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify)
and then the accompanying
[vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-modules)
package.

Since this is my first time making a vite plugin, i used this as my starting
structure and was heavily inspired by the overall concept. This project is a
customized "hybrid" of these two projects.

## Helpful Links

- [Vite](https://vitejs.dev/)
- [Shopify Liquid reference](https://shopify.dev/api/liquid)
- [Shopify Section schema reference](https://shopify.dev/themes/architecture/sections/section-schema)
- [Liquid Schema Plugin](https://github.com/davidwarrington/liquid-schema-plugin)
  _(webpack)_
- [vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-modules)
  _(by barrel-shopify)_
- [vite-plugin-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify)
  _(by barrel-shopify)_

## To-Do

- [ ] Unit Tests

## Bugs

Please create an issue if you found any bugs, to help us improve this project!

## Functions

### default()

```ts
function default(options): Plugin
```

#### Parameters

| Parameter                     | Type      |
| ----------------------------- | --------- |
| `options`                     | `object`  |
| `options.modulesDir`?         | `string`  |
| `options.sections`?           | `object`  |
| `options.sections.copy`?      | `boolean` |
| `options.sections.file_name`? | `string`  |
| `options.sections.prefix`?    | `string`  |
| `options.snippets`?           | `object`  |
| `options.snippets.copy`?      | `boolean` |
| `options.snippets.file_name`? | `string`  |
| `options.snippets.prefix`?    | `string`  |
| `options.themeRoot`?          | `string`  |

#### Returns

`Plugin`

#### Defined in

[packages/vite-plugin-shopify-liquid-modules/src/index.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/index.ts#L15)

---

### resolveOptions()

```ts
function resolveOptions(options):
  | undefined
  | {
      modulesDir: string
      sections: {
        copy: boolean
        file_name: string
        prefix: string
      }
      snippets: {
        copy: boolean
        file_name: string
        prefix: string
      }
      themeRoot: string
    }
```

#### Parameters

| Parameter                     | Type      |
| ----------------------------- | --------- |
| `options`                     | `object`  |
| `options.modulesDir`?         | `string`  |
| `options.sections`?           | `object`  |
| `options.sections.copy`?      | `boolean` |
| `options.sections.file_name`? | `string`  |
| `options.sections.prefix`?    | `string`  |
| `options.snippets`?           | `object`  |
| `options.snippets.copy`?      | `boolean` |
| `options.snippets.file_name`? | `string`  |
| `options.snippets.prefix`?    | `string`  |
| `options.themeRoot`?          | `string`  |

#### Returns

`undefined` \| \{ `modulesDir`: `string`; `sections`: \{ `copy`: `boolean`;
`file_name`: `string`; `prefix`: `string`; \}; `snippets`: \{ `copy`: `boolean`;
`file_name`: `string`; `prefix`: `string`; \}; `themeRoot`: `string`; \}

#### Defined in

[packages/vite-plugin-shopify-liquid-modules/src/options.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L52)

## Type Aliases

### ShopifyLiquidModulesOptions

```ts
type ShopifyLiquidModulesOptions: {
  modulesDir: string;
  sections: {
     copy: boolean;
     file_name: string;
     prefix: string;
    };
  snippets: {
     copy: boolean;
     file_name: string;
     prefix: string;
    };
  themeRoot: string;
};
```

#### Type declaration

| Name                 | Type                                                                | Defined in                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modulesDir`         | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L12) |
| `sections`           | \{ `copy`: `boolean`; `file_name`: `string`; `prefix`: `string`; \} | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L13) |
| `sections.copy`      | `boolean`                                                           | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L16) |
| `sections.file_name` | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L17) |
| `sections.prefix`    | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L18) |
| `snippets`           | \{ `copy`: `boolean`; `file_name`: `string`; `prefix`: `string`; \} | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L21) |
| `snippets.copy`      | `boolean`                                                           | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L24) |
| `snippets.file_name` | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L25) |
| `snippets.prefix`    | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L26) |
| `themeRoot`          | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:29](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L29) |

#### Defined in

[packages/vite-plugin-shopify-liquid-modules/src/options.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L47)

---

### ResolvedShopifyLiquidModulesOptions

```ts
type ResolvedShopifyLiquidModulesOptions: {
  modulesDir: string;
  sections: {
     copy: boolean;
     file_name: string;
     prefix: string;
    };
  snippets: {
     copy: boolean;
     file_name: string;
     prefix: string;
    };
  themeRoot: string;
};
```

#### Type declaration

| Name                 | Type                                                                | Defined in                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modulesDir`         | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L12) |
| `sections`           | \{ `copy`: `boolean`; `file_name`: `string`; `prefix`: `string`; \} | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L13) |
| `sections.copy`      | `boolean`                                                           | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L16) |
| `sections.file_name` | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L17) |
| `sections.prefix`    | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L18) |
| `snippets`           | \{ `copy`: `boolean`; `file_name`: `string`; `prefix`: `string`; \} | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L21) |
| `snippets.copy`      | `boolean`                                                           | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L24) |
| `snippets.file_name` | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L25) |
| `snippets.prefix`    | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L26) |
| `themeRoot`          | `string`                                                            | [packages/vite-plugin-shopify-liquid-modules/src/options.ts:29](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L29) |

#### Defined in

[packages/vite-plugin-shopify-liquid-modules/src/options.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-liquid-modules/src/options.ts#L48)
