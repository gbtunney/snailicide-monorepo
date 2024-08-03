[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / initApp

# Function: initApp()

```ts
function initApp<AppOptionsSchema>(
    optionsSchema,
    config,
    initFunction,
    skip_interactive,
    _yargs,
): Promise<undefined | Argv<{}>>
```

## Type Parameters

| Type Parameter |
| --- |
| `AppOptionsSchema` _extends_ `AnyZodObject` \| `ZodEffects`\<`AnyZodObject`, \{\}, \{\}\> |

## Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `optionsSchema` | `AppOptionsSchema` | `undefined` |
| `config` | `object` | `undefined` |
| `config.clear`? | `boolean` | `...` |
| `config.description`? | `string` | `...` |
| `config.examples`? | [`string`, `string`][] | `...` |
| `config.figlet`? | `boolean` | `...` |
| `config.flag_aliases`? | [`AppFlagAliases`](../type-aliases/AppFlagAliases.md)\<`AppOptionsSchema`\> | `undefined` |
| `config.hidden`? | [`AppHidden`](../type-aliases/AppHidden.md)\<`AppOptionsSchema`\> | `undefined` |
| `config.name` | `string` | `...` |
| `config.print`? | `boolean` | `...` |
| `config.title_color`? | `object` | `...` |
| `config.title_color.bg`? | `string` | `...` |
| `config.title_color.fg`? | `string` | `...` |
| `config.version`? | `string` | `...` |
| `initFunction` | [`InitSuccessCallback`](../type-aliases/InitSuccessCallback.md)\<`AppOptionsSchema`\> | `undefined` |
| `skip_interactive` | `boolean` | `false` |
| `_yargs` | `string`[] | `process.argv` |

## Returns

`Promise`\<`undefined` \| `Argv`\<\{\}\>\>

## Defined in

[packages/cli-app/src/app.ts:33](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L33)
