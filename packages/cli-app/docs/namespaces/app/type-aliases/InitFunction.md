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

[packages/cli-app/src/app.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/2f8292b3376742ccb9ee5c3746eee5023a1d41bb/packages/cli-app/src/app.ts#L17)
