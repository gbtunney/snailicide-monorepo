<h1 align="center">Welcome to @snailicide/g-library👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Function library written in typescript

## Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

## Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

# Snailicide g-windi - a collection of windiCSS Vue3 composables

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
## For pnpm workspace, use the command below.
pnpm add @snailicide/g-windi@workspace:*

pnpm --filter=[yourGlob] add @snailicide/g-windi@workspace:*
```

## Build

```sh
pnpm --filter=@snailicide/g-windi build
```

## Tests

```sh
pnpm --filter=@snailicide/g-windi test
```

[g-windi](https://www.npmjs.com/package/@snailicide/g-windi): A collection of utility functions for building configurations and themes for WindiCSS. These can also be used for similar frameworks like TailwindCSS and Unocss.

-   Includes functions that utilize Windi CSS's engine at runtime to debug full configurations, including plugins.full configuration is resolved by the build tools. This is similar to [antfu/windicss-runtime-dom: 🪄 Enables Windi CSS for any site with one-line code without any build tools](https://github.com/antfu/windicss-runtime-dom), except does not use mutation observer.
-   This is useful for a wide range of purposes, including debugging specific configurations, as well as compiling classes added via form, like Shopify's Customizer or Elementor.

## TODO: jsdocPrintWidth look at this variable for line breaks.
