[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / getPluginsConfiguration

# Function: getPluginsConfiguration()

```ts
function getPluginsConfiguration<Type>(config, _default): Plugin<any>[]
```

## Type Parameters

| Type Parameter |
| --- |
| `Type` _extends_ [`PluginsConfiguration`](../type-aliases/PluginsConfiguration.md) |

## Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `config` | `undefined` \| `Type` | `undefined` |
| `_default` | [`PluginsConfiguration`](../type-aliases/PluginsConfiguration.md) | `basePluginConfig` |

## Returns

`Plugin`\<`any`\>[]

## Defined in

[packages/build-config/src/rollup/plugins.ts:91](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/plugins.ts#L91)
