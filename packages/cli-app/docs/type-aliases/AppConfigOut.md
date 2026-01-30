[**@snailicide/cli-app v0.4.2**](../README.md)

---

[@snailicide/cli-app](../README.md) / AppConfigOut

# Type Alias: AppConfigOut

```ts
type AppConfigOut = {
  clear: boolean
  description?: string
  examples: [string, string][]
  figlet: boolean
  flag_aliases: {
    help?: string
    version?: string
  }
  log_level: 'error' | 'trace' | 'info' | 'debug' | 'warn' | 'fatal' | 'silent'
  name: string
  print: boolean
  skip_interactive: boolean
  title_color: {
    bg: string
    fg: string
  }
  version: string
}
```

Defined in:
[packages/cli-app/src/app-config.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L25)

This is the schema used to configure the Cli Application, these should NOT used
in cli arguments when running the client cli app

## Type Declaration

| Name                                             | Type                                         | Description                                                                                                          | Defined in                                                                                                                                    |
| ------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | --------- | ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="clear"></a> `clear`                       | `boolean`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L48)   |
| <a id="description"></a> `description?`          | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L52)   |
| <a id="examples"></a> `examples`                 | \[`string`, `string`]\[]                     | Examples of usage                                                                                                    | [packages/cli-app/src/app-config.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L54)   |
| <a id="figlet"></a> `figlet`                     | `boolean`                                    | Use figlet to make large ascii title                                                                                 | [packages/cli-app/src/app-config.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L60)   |
| <a id="flag_aliases"></a> `flag_aliases`         | { `help?`: `string`; `version?`: `string`; } | Shorthand Option Aliases (--help , -h ) **Exqmple** `pnpm test:example -h # are equivalent pnpm test:example --help` | [packages/cli-app/src/app-config.ts:74](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L74)   |
| `flag_aliases.help?`                             | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L7)     |
| `flag_aliases.version?`                          | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L8)     |
| <a id="log_level"></a> `log_level`               | `"error"`                                    | `"trace"`                                                                                                            | `"info"`                                                                                                                                      | `"debug"` | `"warn"` | `"fatal"` | `"silent"` | -   | [packages/cli-app/src/app-config.ts:82](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L82) |
| <a id="name"></a> `name`                         | `string`                                     | Hide an option from the help screen                                                                                  | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| <a id="print"></a> `print`                       | `boolean`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:93](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L93)   |
| <a id="skip_interactive"></a> `skip_interactive` | `boolean`                                    | Clears the terminal window                                                                                           | [packages/cli-app/src/app-config.ts:95](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L95)   |
| <a id="title_color"></a> `title_color`           | { `bg`: `string`; `fg`: `string`; }          | -                                                                                                                    | [packages/cli-app/src/app-config.ts:96](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L96)   |
| `title_color.bg`                                 | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98)   |
| `title_color.fg`                                 | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:105](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L105) |
| <a id="version"></a> `version`                   | `string`                                     | -                                                                                                                    | [packages/cli-app/src/app-config.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L121) |
