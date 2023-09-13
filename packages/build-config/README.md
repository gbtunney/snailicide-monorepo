# Snailicide Build Config Package

_Provides repository with base configurations that can be extended in new packages._

**NPM Homepage**: [@snailicide/build-config](https://www.npmjs.com/package/@snailicide/build-config)

-   **Configuration Files**

    -   **Typescript**: [tsconfig-base.json](./tsconfig-base.json)
    -   **ESLint Base**: [.eslintrc.ts](./.eslintrc.ts)
    -   **Prettier**: [prettier.config.js](./prettier.config.js)

## Commands

-   Install

```shell
$ pnpm add @snailicide/build-config -D
```

-   Build & Publish

```shell
$ pnpm --filter=@snailicide/build-config run build
$ pnpm --filter=@snailicide/build-config publish --access public
```

## Helpful Links

-   Linting
    -   [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
    -   [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple/)
    -   [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)
    -   [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

> Note: to transpile to (var and no arrow functions use target = ES5
