[**@snailicide/cli-app v0.3.0**](../README.md) • **Docs**

---

[@snailicide/cli-app v0.3.0](../README.md) / initializeApp

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

| Type Parameter                                                                       | Description                             |
| ------------------------------------------------------------------------------------ | --------------------------------------- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](../type-aliases/ZodObjectSchema.md) | The schema for the application options. |

## Parameters

| Parameter                | Type                                                                                 | Default value  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------ |
| `optionsSchema`          | `AppOptionsSchema`                                                                   | `undefined`    | The schema for validating the application options.                 |
| `config`                 | `object`                                                                             | `undefined`    | The configuration object for the application.                      |
| `config.hidden`?         | [`AppHidden`](../type-aliases/AppHidden.md)\<`AppOptionsSchema`>                     | `undefined`    | -                                                                  |
| `config.flag_aliases`?   | [`AppFlagAliases`](../type-aliases/AppFlagAliases.md)\<`AppOptionsSchema`>           | `undefined`    | -                                                                  |
| `config.clear`?          | `boolean`                                                                            | `...`          | Clears the terminal window                                         |
| `config.description`?    | `string`                                                                             | `...`          | -                                                                  |
| `config.examples`?       | \[`string`, `string`]\[]                                                             | `...`          | Examples of usage                                                  |
| `config.figlet`?         | `boolean`                                                                            | `...`          | Use figlet to make large ascii title                               |
| `config.name`?           | `string`                                                                             | `...`          | -                                                                  |
| `config.print`?          | `boolean`                                                                            | `...`          | -                                                                  |
| `config.title_color`?    | `object`                                                                             | `...`          | -                                                                  |
| `config.title_color.bg`? | `string`                                                                             | `...`          | -                                                                  |
| `config.title_color.fg`? | `string`                                                                             | `...`          | -                                                                  |
| `config.version`?        | `string`                                                                             | `...`          | -                                                                  |
| `initFunction`?          | [`InitSuccessCallback`](../type-aliases/InitSuccessCallback.md)\<`AppOptionsSchema`> | `undefined`    | The callback func ccalled successful init                          |
| `skip_interactive`?      | `boolean`                                                                            | `false`        | Flag to skip interactive prompts. Default is `false`               |
| `_yargs`?                | `string`\[]                                                                          | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

## Returns

`Promise`\<`undefined` | `Argv`\<\{}>>

- Returns a Yargs instance or undefined if initialization fails.

## Defined in

[packages/cli-app/src/app.ts:167](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L167)
