[**@snailicide/cli-app v0.4.3**](../README.md)

---

[@snailicide/cli-app](../README.md) / InitSuccessCallback

# Type Alias: InitSuccessCallback()\<AppOptionsSchema>

```ts
type InitSuccessCallback<AppOptionsSchema> = (
  args,
  config,
  help,
) => void | Promise<void>
```

Defined in:
[packages/cli-app/src/app.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L20)

A callback type that is invoked upon successful initialization of the
application.

## Type Parameters

| Type Parameter                                                       | Default type  | Description                                                            |
| -------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) | `z.ZodObject` | The schema for app options, either a ZodObject or a ZodEffects schema. |

## Parameters

| Parameter | Type                          | Description |
| --------- | ----------------------------- | ----------- | --------------------------------------------------- |
| `args`    | `z.infer`<`AppOptionsSchema`> | -           |
| `config`  | [`AppConfig`](AppConfig.md)   | -           |
| `help`    | `string`                      | `undefined` | The help string, if available, otherwise undefined. |

## Returns

`void` | `Promise`<`void`>
