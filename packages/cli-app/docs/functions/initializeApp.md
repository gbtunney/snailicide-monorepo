[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / initializeApp

# Function: initializeApp()

```ts
function initializeApp<AppOptionsSchema>(
    optionsSchema,
    config,
    initFunction,
    skip_interactive?,
    _yargs?,
): Promise<undefined | Argv<{}>>
```

Initializes the application with the provided configuration and options schema.

## Type Parameters

| Type Parameter | Description |
| --- | --- |
| `AppOptionsSchema` _extends_ `ZodObjectSchema` | The schema for the application options. |

## Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `optionsSchema` | `AppOptionsSchema` | `undefined` | The schema for validating the application options. |
| `config` | `object` | `undefined` | The configuration object for the application. |
| `config.clear`? | `boolean` | `...` | - |
| `config.description`? | `string` | `...` | - |
| `config.examples`? | [`string`, `string`][] | `...` | - |
| `config.figlet`? | `boolean` | `...` | - |
| `config.flag_aliases`? | [`AppFlagAliases`](../type-aliases/AppFlagAliases.md)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.hidden`? | [`AppHidden`](../type-aliases/AppHidden.md)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.name`? | `string` | `...` | - |
| `config.print`? | `boolean` | `...` | - |
| `config.title_color`? | `object` | `...` | - |
| `config.title_color.bg`? | `string` | `...` | - |
| `config.title_color.fg`? | `string` | `...` | - |
| `config.version`? | `string` | `...` | - |
| `initFunction`? | [`InitSuccessCallback`](../type-aliases/InitSuccessCallback.md)\<`AppOptionsSchema`\> | `undefined` | The callback function to be called upon successful initialization. |
| `skip_interactive`? | `boolean` | `false` | Flag to skip interactive prompts. Default is `false` |
| `_yargs`? | `string`[] | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

## Returns

`Promise`\<`undefined` \| `Argv`\<\{\}\>\>

-   Returns a Yargs instance or undefined if initialization fails.

## Defined in

[packages/cli-app/src/app.ts:180](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L180)
