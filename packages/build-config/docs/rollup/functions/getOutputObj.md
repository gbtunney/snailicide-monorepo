[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / getOutputObj

# Function: getOutputObj()

```ts
function getOutputObj(entry): {
    config: RollupOptions
    exportObj: Record<string, Record<string, string>>
}
```

## Parameters

| Parameter | Type                                            |
| --------- | ----------------------------------------------- |
| `entry`   | [`EntryConfig`](../type-aliases/EntryConfig.md) |

## Returns

```ts
{
    config: RollupOptions
    exportObj: Record<string, Record<string, string>>
}
```

| Name | Type | Defined in |
| --- | --- | --- |
| `config` | `RollupOptions` | [packages/build-config/src/rollup/index.ts:124](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L124) |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`\>\> | [packages/build-config/src/rollup/index.ts:123](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L123) |

## Defined in

[packages/build-config/src/rollup/index.ts:119](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L119)
