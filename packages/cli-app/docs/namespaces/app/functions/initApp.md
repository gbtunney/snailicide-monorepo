[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [app](../README.md) / initApp

# Function: initApp()

```ts
function initApp<Schema>(
    schema,
    initFunction,
    unresolved_options,
    argstr,
): Promise<undefined | Argv<Omit<{}, never> & InferredOptionTypes<{}>>>
```

## Type Parameters

| Type Parameter                  |
| ------------------------------- |
| `Schema` _extends_ `ZodTypeAny` |

## Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `schema` | `Schema` | `undefined` |
| `initFunction` | [`InitFunction`](../type-aliases/InitFunction.md)\<`Schema`\> | `undefined` |
| `unresolved_options` | `object` | `undefined` |
| `unresolved_options.alias`? | `Record`\<`string`, `string`\> | `...` |
| `unresolved_options.clear`? | `boolean` | `...` |
| `unresolved_options.description`? | `string` | `...` |
| `unresolved_options.examples`? | [`string`, `string`][] | `...` |
| `unresolved_options.figlet`? | `boolean` | `...` |
| `unresolved_options.hidden`? | `string`[] | `...` |
| `unresolved_options.name` | `string` | `...` |
| `unresolved_options.print`? | `boolean` | `...` |
| `unresolved_options.title_color`? | `object` | `...` |
| `unresolved_options.title_color.bg`? | `string` | `...` |
| `unresolved_options.title_color.fg`? | `string` | `...` |
| `unresolved_options.version`? | `string` | `...` |
| `argstr` | `string`[] | `process.argv` |

## Returns

`Promise`\<`undefined` \| `Argv`\<`Omit`\<\{\}, `never`\> & `InferredOptionTypes`\<\{\}\>\>\>

## Defined in

[packages/cli-app/src/app.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/2f8292b3376742ccb9ee5c3746eee5023a1d41bb/packages/cli-app/src/app.ts#L21)
