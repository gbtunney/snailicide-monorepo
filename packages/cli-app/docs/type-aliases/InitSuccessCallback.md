[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / InitSuccessCallback

# Type Alias: InitSuccessCallback()\<AppOptionsSchema\>

```ts
type InitSuccessCallback<AppOptionsSchema>: (resolvedFlags, help) => void;
```

## Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `AppOptionsSchema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`z.AnyZodObject`\> | `z.AnyZodObject` |

## Parameters

| Parameter       | Type                            |
| --------------- | ------------------------------- |
| `resolvedFlags` | `z.infer`\<`AppOptionsSchema`\> |
| `help`          | `string` \| `undefined`         |

## Returns

`void`

## Defined in

[packages/cli-app/src/app.ts:27](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L27)
