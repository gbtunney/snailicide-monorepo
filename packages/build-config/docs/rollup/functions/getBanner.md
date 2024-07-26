[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / getBanner

# Function: getBanner()

```ts
function getBanner(library_name, package_json, show_error): undefined | string
```

Comment with library information to be appended in the generated bundles.

## Parameters

| Parameter                      | Type                  | Default value |
| ------------------------------ | --------------------- | ------------- |
| `library_name`                 | `string`              | `undefined`   |
| `package_json`                 | `object`              | `undefined`   |
| `package_json.author`          | `object`              | `...`         |
| `package_json.author.email`    | `string`              | `...`         |
| `package_json.author.name`     | `string`              | `...`         |
| `package_json.description`     | `string`              | `...`         |
| `package_json.license`         | `string`              | `...`         |
| `package_json.main`            | `string`              | `...`         |
| `package_json.name`            | `string`              | `...`         |
| `package_json.repository`      | `object`              | `...`         |
| `package_json.repository.type` | `string`              | `...`         |
| `package_json.repository.url`  | `string`              | `...`         |
| `package_json.version`         | `string`              | `...`         |
| `show_error`                   | `boolean` \| `"safe"` | `true`        |

## Returns

`undefined` \| `string`

## Defined in

[packages/build-config/src/rollup/index.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L23)
