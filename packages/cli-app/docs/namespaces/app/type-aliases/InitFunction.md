[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [app](../README.md) / InitFunction

# Type Alias: InitFunction()\<Schema\>

```ts
type InitFunction<Schema>: (value, help) => void;
```

## Type Parameters

| Type Parameter | Default type  |
| -------------- | ------------- |
| `Schema`       | `z.ZodSchema` |

## Parameters

| Parameter | Type |
| --- | --- |
| `value` | `Schema` _extends_ `z.ZodSchema` ? `z.infer`\<`Schema`\> : `never` |
| `help` | `string` \| `undefined` |

## Returns

`void`

## Defined in

[packages/cli-app/src/app.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/e538d73c297e05cfc5c2161039b61c76cd65cf31/packages/cli-app/src/app.ts#L17)
