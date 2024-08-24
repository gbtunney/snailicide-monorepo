[**@snailicide/build-config v1.3.0**](../README.md) • **Docs**

---

[@snailicide/build-config v1.3.0](../README.md) / EsLint

# EsLint

Eslint / Tslint Configuration

## Contents

-   [See](#see)
-   [Functions](#functions)
    -   [flatEslintConfig()](#flateslintconfig)
-   [References](#references)
    -   [config](#config)

## See

-   [eslint - Find and fix problems in your JavaScript code.](https://eslint.org/)
-   [typescript-eslint](https://typescript-eslint.io/getting-started/)

## Functions

### flatEslintConfig()

```ts
function flatEslintConfig(__dirname): Promise<ConfigFile>
```

#### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `__dirname` | `string` |

#### Returns

`Promise`\<`ConfigFile`>

#### Defined in

[packages/build-config/src/eslint/base.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/eslint/base.ts#L26)

## References

### config

Renames and re-exports [flatEslintConfig](EsLint.md#flateslintconfig)
