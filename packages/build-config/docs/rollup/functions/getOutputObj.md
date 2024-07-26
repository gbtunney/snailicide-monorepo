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
| `config` | `RollupOptions` | [packages/build-config/src/rollup/index.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L121) |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`\>\> | [packages/build-config/src/rollup/index.ts:120](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L120) |

## Defined in

[packages/build-config/src/rollup/index.ts:116](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L116)
