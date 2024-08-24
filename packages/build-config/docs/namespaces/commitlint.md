[**@snailicide/build-config v1.3.0**](../README.md) • **Docs**

---

[@snailicide/build-config v1.3.0](../README.md) / commitlint

# commitlint

Commitlint configuration for use in Monorepo.

## Contents

-   [See](#see)
-   [Functions](#functions)
    -   [configuration()](#configuration)
-   [Variables](#variables)
    -   [COMMIT_TYPES](#commit_types)

## See

-   [commitlint - Lint commit messages](https://commitlint.js.org/#/)
-   [commitlint-config-conventional - Shareable commitlint config](https://www.npmjs.com/package/@commitlint/config-conventional)
-   [Commitizen](https://commitizen-tools.github.io/commitizen/)

## Functions

### configuration()

```ts
function configuration(scope_enum, type_enum): UserConfig
```

#### Parameters

| Parameter    | Type        | Default value |
| ------------ | ----------- | ------------- |
| `scope_enum` | `string`\[] | `[]`          |
| `type_enum`  | `string`\[] | `...`         |

#### Returns

`UserConfig`

#### Defined in

[packages/build-config/src/commitlint/index.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L19)

## Variables

### COMMIT_TYPES

```ts
const COMMIT_TYPES: readonly [
    'feat',
    'fix',
    'wip',
    'build',
    'chore',
    'docs',
    'release',
    'ci',
    'perf',
    'refactor',
    'revert',
    'style',
    'test',
]
```

#### Defined in

[packages/build-config/src/commitlint/index.ts:4](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L4)
