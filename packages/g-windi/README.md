# @snailicide/g-windi 🐌

[![NPM](https://img.shields.io/npm/v/@snailicide/g-windi)](http://www.npmjs.com/package/@snailicide/g-windi)
![License: MIT](https://img.shields.io/npm/l/@snailicide/g-windi)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

_Provides repository with base configurations that can be extended in new
packages._

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TypeScript](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![UnoCSS](https://img.shields.io/badge/unocss-333333.svg?style=for-the-badge&logo=unocss&logoColor=white)
![Windicss](https://img.shields.io/badge/windicss-48B0F1.svg?style=for-the-badge&logo=windi-css&logoColor=white)

### Repository

- **Github:**
  [snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

- **NPM Homepage**:
  [@snailicide/g-windi](http://www.npmjs.com/package/@snailicide/g-windi)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

> Recommended package manager is [pnpm](http://pnpm.io)
>
> [![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](http://pnpm.io)

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

## 🐌

[g-windi](https://www.npmjs.com/package/@snailicide/g-windi): A collection of
utility functions for building configurations and themes for WindiCSS. These can
also be used for similar frameworks like TailwindCSS and Unocss.

- Includes functions that utilize Windi CSS's engine at runtime to debug full
  configurations, including plugins.full configuration is resolved by the build
  tools. This is similar to
  [antfu/windicss-runtime-dom: 🪄](https://github.com/antfu/windicss-runtime-dom),
  except does not use mutation observer.
- This is useful for a wide range of purposes, including debugging specific
  configurations, as well as compiling classes added via form, like Shopify's
  Customizer or Elementor.

## Installation

This library is published in the NPM registry and can be installed using any
compatible package manager.

```sh
#pnpm
pnpm add @snailicide/g-windi

#yarn
yarn add @snailicide/g-windi

#npm
npm install @snailicide/g-windi
```

**TODO**: figure out how to change the filenames-simple/naming-convention for
composables
