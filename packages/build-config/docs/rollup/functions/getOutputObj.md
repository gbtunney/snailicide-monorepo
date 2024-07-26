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
| `config` | `RollupOptions` | [packages/build-config/src/rollup/index.ts:126](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L126) |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`\>\> | [packages/build-config/src/rollup/index.ts:125](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L125) |

## Defined in

[packages/build-config/src/rollup/index.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L121)
