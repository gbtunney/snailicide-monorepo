# @snailicide/g-windi 🐌

<p align="center">
	<img alt="Version" src="https://img.shields.io/npm/v/@snailicide/g-windi"/>
	<a href="#" target="_blank">
		<img alt="License" src="https://img.shields.io/npm/l/@snailicide/g-windi"/>
	</a>
	<a href="#" target="_blank">
		<img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
	</a>
	<a href="#" target="_blank">
		<img alt="Typescript" height="20px" src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D"/>
	</a>
</p>

_A collection of windiCSS and Vue3 composables_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

## 🐌

[g-windi](https://www.npmjs.com/package/@snailicide/g-windi): A collection of utility functions for building configurations and themes for WindiCSS. These can also be used for similar frameworks like TailwindCSS and Unocss.

-   Includes functions that utilize Windi CSS's engine at runtime to debug full configurations, including plugins.full configuration is resolved by the build tools. This is similar to [antfu/windicss-runtime-dom: 🪄 Enables Windi CSS for any site with one-line code without any build tools](https://github.com/antfu/windicss-runtime-dom), except does not use mutation observer.
-   This is useful for a wide range of purposes, including debugging specific configurations, as well as compiling classes added via form, like Shopify's Customizer or Elementor.

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
#pnpm
pnpm add @snailicide/g-windi

#yarn
yarn add @snailicide/g-windi

#npm
npm install @snailicide/g-windi
```

**TODO**: figure out how to change the filenames-simple/naming-convention for composables
