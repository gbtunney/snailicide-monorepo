[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / getConfigEntries

# Function: getConfigEntries()

```ts
function getConfigEntries(
    directoryObj,
    entries,
    plugins,
    package_json,
): OutputObjReturnType &
    {
        plugins: InputPluginOption
    }[]
```

Returns an array of output configurations based on the provided entries.

## Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `directoryObj` | `Pick`\<[`EntryConfig`](../type-aliases/EntryConfig.md), `"source_dir"` \| `"output_dir"`\> | `undefined` | An object containing the source and output directories. |
| `entries` | `Omit`\<[`EntryConfig`](../type-aliases/EntryConfig.md), `"source_dir"` \| `"output_dir"`\>[] | `undefined` | An array of entry configurations. |
| `plugins` | `InputPluginOption` | `[]` | Optional array of Rollup plugins. |
| `package_json` | `object` | `undefined` | The base package JSON object. |
| `package_json.author` | `object` | `...` | - |
| `package_json.author.email` | `string` | `...` | - |
| `package_json.author.name` | `string` | `...` | - |
| `package_json.description` | `string` | `...` | - |
| `package_json.license` | `string` | `...` | - |
| `package_json.main` | `string` | `...` | - |
| `package_json.name` | `string` | `...` | - |
| `package_json.repository` | `object` | `...` | - |
| `package_json.repository.type` | `string` | `...` | - |
| `package_json.repository.url` | `string` | `...` | - |
| `package_json.version` | `string` | `...` | - |

## Returns

`OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[]

An array of output configurations with plugins.

## Defined in

[packages/build-config/src/rollup/index.ts:231](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L231)
