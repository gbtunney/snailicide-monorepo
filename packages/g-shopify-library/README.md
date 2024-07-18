# 🐌Welcome to @snailicide/g-shopify-library🐌

| [npm](https://www.npmjs.com/package/@snailicide/g-shopify-library) | [GitHub](https://github.com/gbtunney/shopify-monorepo/tree/main/packages/g-shopify-library) |

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Collections of types and utilities for working with Shopify

-   [🐌Welcome to @snailicide/g-shopify-library🐌](#welcome-to--snailicide-g-shopify-library--)
    -   [Author](#author)
    -   [Features](#features)
    -   [Examples](#examples)
        -   [Install](#install)
        -   [Build](#build)
        -   [Tests](#tests)
    -   [Helpful Links](#helpful-links)
    -   [To-Do](#to-do)
    -   [Bugs](#bugs)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Author

👤 **Gillian Tunney** | [github](https://github.com/gbtunney) | [email](mailto:gbtunney@mac.com) |

## Features

-   Generic functions for Storefront API, Shopify MediaURLs, etc
-   Section Schema types and validators (using zod)

## Examples

See **@snailicide/vite-plugin-shopify-liquid-modules** for an usage example of using the [validators](./../vite-plugin-shopify-liquid-modules/example_modules/gbt-curator/schema.ts) and [types](./../vite-plugin-shopify-liquid-modules/example_modules/gbt-curator/settings.ts).

## Usage

### Install

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
#npm
npm i @snailicide/g-shopify-library -D

# yarn
yarn add @snailicide/g-shopify-library -D

# pnp
pnpm add @snailicide/g-shopify-library -D
```

For pnpm workspace:

```sh
pnpm add @snailicide/g-shopify-library@workspace:*

pnpm --filter=[yourGlob] add @snailicide/g-shopify-library@workspace:*
```

### Build

```sh
pnpm --filter=@snailicide/g-shopify-library build
```

### Tests

```sh
pnpm --filter=@snailicide/g-shopify-library test
```

## Helpful Links

-   [Shopify Section schema reference](https://shopify.dev/themes/architecture/sections/section-schema)
-   [@shopify/admin-graphql-api-utilities](https://www.npmjs.com/package/@shopify/admin-graphql-api-utilities)
-   [Zod](https://zod.dev/)
-   [TypeScript](https://www.typescriptlang.org)
-   [Ramda](https://ramdajs.com/docs)

## To-Do

-   [ ] Presets (in new version)
-   [ ] Documentation

## Bugs

Please create an issue if you found any bugs, to help us improve this project!
