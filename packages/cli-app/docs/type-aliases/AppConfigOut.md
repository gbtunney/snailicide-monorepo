[**@snailicide/cli-app v0.4.1**](../README.md)

---

[@snailicide/cli-app](../README.md) / AppConfigOut

# Type Alias: AppConfigOut

```ts
type AppConfigOut = {
  clear: boolean
  description?: string
  examples: [string, string][]
  figlet: boolean
  flag_aliases: Record<string, string>
  hidden: string[]
  name: string
  print: boolean
  title_color: {
    bg: string
    fg: string
  }
  version: string
}
```

Defined in:
[packages/cli-app/src/app-config.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L23)

This is the schema used to configure the Cli Application, these should NOT used
in cli arguments when running the client cli app

## Type declaration

| Name                                     | Type                                | Description                                                                                                          | Defined in                                                                                                                                    |
| ---------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="clear"></a> `clear`               | `boolean`                           | Clears the terminal window                                                                                           | [packages/cli-app/src/app-config.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L45)   |
| <a id="description"></a> `description?`  | `string`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L49)   |
| <a id="examples"></a> `examples`         | \[`string`, `string`]\[]            | Examples of usage                                                                                                    | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51)   |
| <a id="figlet"></a> `figlet`             | `boolean`                           | Use figlet to make large ascii title                                                                                 | [packages/cli-app/src/app-config.ts:57](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L57)   |
| <a id="flag_aliases"></a> `flag_aliases` | `Record`<`string`, `string`>        | Shorthand Option Aliases (--help , -h ) **Exqmple** `pnpm test:example -h # are equivalent pnpm test:example --help` | [packages/cli-app/src/app-config.ts:71](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L71)   |
| <a id="hidden"></a> `hidden`             | `string`\[]                         | Hide an option from the help screen                                                                                  | [packages/cli-app/src/app-config.ts:78](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L78)   |
| <a id="name"></a> `name`                 | `string`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:82](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L82)   |
| <a id="print"></a> `print`               | `boolean`                           | -                                                                                                                    | [packages/cli-app/src/app-config.ts:87](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L87)   |
| <a id="title_color"></a> `title_color`   | { `bg`: `string`; `fg`: `string`; } | -                                                                                                                    | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| `title_color.bg`                         | `string`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:90](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L90)   |
| `title_color.fg`                         | `string`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:97](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L97)   |
| <a id="version"></a> `version`           | `string`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:112](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L112) |
