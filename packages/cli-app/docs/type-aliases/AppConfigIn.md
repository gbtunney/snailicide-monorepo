[**@snailicide/cli-app v0.4.3**](../README.md)

---

[@snailicide/cli-app](../README.md) / AppConfigIn

# Type Alias: AppConfigIn\<Schema>

```ts
type AppConfigIn<Schema> = {
  hidden?: AppHidden<Schema>
  flag_aliases?: AppFlagAliases<Schema>
  clear?: boolean
  description?: string
  examples?: [string, string][]
  figlet?: boolean
  log_level?: 'error' | 'trace' | 'info' | 'debug' | 'warn' | 'fatal' | 'silent'
  name: string
  print?: boolean
  skip_interactive?: boolean
  title_color?: {
    bg?: string
    fg?: string
  }
  version?: string
}
```

Defined in:
[packages/cli-app/src/app-config.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L28)

## Type Parameters

| Type Parameter                                             | Default type                                     |
| ---------------------------------------------------------- | ------------------------------------------------ |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) | _typeof_ [`appConfigSchema`](appConfigSchema.md) |

## Type Declaration

| Name                                              | Type                                            | Description                          | Defined in                                                                                                                                    |
| ------------------------------------------------- | ----------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | --------- | ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="hidden"></a> `hidden?`                     | [`AppHidden`](AppHidden.md)<`Schema`>           | -                                    | [packages/cli-app/src/app-config.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L37)   |
| <a id="flag_aliases"></a> `flag_aliases?`         | [`AppFlagAliases`](AppFlagAliases.md)<`Schema`> | -                                    | [packages/cli-app/src/app-config.ts:38](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L38)   |
| <a id="clear"></a> `clear?`                       | `boolean`                                       | -                                    | [packages/cli-app/src/app-config.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L48)   |
| <a id="description"></a> `description?`           | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L52)   |
| <a id="examples"></a> `examples?`                 | \[`string`, `string`]\[]                        | Examples of usage                    | [packages/cli-app/src/app-config.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L54)   |
| <a id="figlet"></a> `figlet?`                     | `boolean`                                       | Use figlet to make large ascii title | [packages/cli-app/src/app-config.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L60)   |
| <a id="log_level"></a> `log_level?`               | `"error"`                                       | `"trace"`                            | `"info"`                                                                                                                                      | `"debug"` | `"warn"` | `"fatal"` | `"silent"` | -   | [packages/cli-app/src/app-config.ts:82](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L82) |
| <a id="name"></a> `name`                          | `string`                                        | Hide an option from the help screen  | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| <a id="print"></a> `print?`                       | `boolean`                                       | -                                    | [packages/cli-app/src/app-config.ts:93](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L93)   |
| <a id="skip_interactive"></a> `skip_interactive?` | `boolean`                                       | Clears the terminal window           | [packages/cli-app/src/app-config.ts:95](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L95)   |
| <a id="title_color"></a> `title_color?`           | { `bg?`: `string`; `fg?`: `string`; }           | -                                    | [packages/cli-app/src/app-config.ts:96](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L96)   |
| `title_color.bg?`                                 | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98)   |
| `title_color.fg?`                                 | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:105](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L105) |
| <a id="version"></a> `version?`                   | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L121) |
