[**@snailicide/cli-app v0.4.2**](../README.md)

---

[@snailicide/cli-app](../README.md) / InitSuccessCallback

# Type Alias: InitSuccessCallback()\<AppOptionsSchema>

```ts
type InitSuccessCallback<AppOptionsSchema> = (resolvedFlags, help) => void
```

Defined in:
[packages/cli-app/src/app.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L37)

A callback type that is invoked upon successful initialization of the
application.

## Type Parameters

| Type Parameter                                | Default type                     | Description      |
| --------------------------------------------- | -------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `AppOptionsSchema` _extends_ `z.AnyZodObject` | `z.ZodEffects`<`z.AnyZodObject`> | `z.AnyZodObject` | The schema for app options, either a ZodObject or a ZodEffects schema. |

## Parameters

| Parameter       | Type                          | Description                                                    |
| --------------- | ----------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| `resolvedFlags` | `z.infer`<`AppOptionsSchema`> | The resolved and validated flags based on the provided schema. |
| `help`          | `string`                      | `undefined`                                                    | The help string, if available, otherwise undefined. |

## Returns

`void`
