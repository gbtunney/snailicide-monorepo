[**@snailicide/cli-app v0.4.2**](../README.md)

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
  name: string
  print?: boolean
  title_color?: {
    bg?: string
    fg?: string
  }
  version?: string
}
```

Defined in:
[packages/cli-app/src/app-config.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L26)

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |

## Type declaration

| Name                                      | Type                                            | Description                          | Defined in                                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="hidden"></a> `hidden?`             | [`AppHidden`](AppHidden.md)<`Schema`>           | -                                    | [packages/cli-app/src/app-config.ts:33](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L33)   |
| <a id="flag_aliases"></a> `flag_aliases?` | [`AppFlagAliases`](AppFlagAliases.md)<`Schema`> | -                                    | [packages/cli-app/src/app-config.ts:34](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L34)   |
| <a id="clear"></a> `clear?`               | `boolean`                                       | Clears the terminal window           | [packages/cli-app/src/app-config.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L45)   |
| <a id="description"></a> `description?`   | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L49)   |
| <a id="examples"></a> `examples?`         | \[`string`, `string`]\[]                        | Examples of usage                    | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51)   |
| <a id="figlet"></a> `figlet?`             | `boolean`                                       | Use figlet to make large ascii title | [packages/cli-app/src/app-config.ts:57](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L57)   |
| <a id="name"></a> `name`                  | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:82](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L82)   |
| <a id="print"></a> `print?`               | `boolean`                                       | -                                    | [packages/cli-app/src/app-config.ts:87](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L87)   |
| <a id="title_color"></a> `title_color?`   | { `bg?`: `string`; `fg?`: `string`; }           | -                                    | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| `title_color.bg?`                         | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:90](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L90)   |
| `title_color.fg?`                         | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:97](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L97)   |
| <a id="version"></a> `version?`           | `string`                                        | -                                    | [packages/cli-app/src/app-config.ts:112](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L112) |
