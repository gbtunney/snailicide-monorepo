[**@snailicide/cli-app v0.4.0**](../README.md) • **Docs**

---

[@snailicide/cli-app v0.4.0](../README.md) / AppConfigIn

# Type Alias: AppConfigIn\<Schema>

```ts
type AppConfigIn<Schema>: {
  hidden: AppHidden<Schema>;
  flag_aliases: AppFlagAliases<Schema>;
  clear: boolean;
  description: string;
  examples: [string, string][];
  figlet: boolean;
  name: string;
  print: boolean;
  title_color: {
     bg: string;
     fg: string;
    };
  version: string;
};
```

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |

## Type declaration

| Name              | Type                                             | Description                          | Defined in                                                                                                                                    |
| ----------------- | ------------------------------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `hidden`?         | [`AppHidden`](AppHidden.md)\<`Schema`>           | -                                    | [packages/cli-app/src/app-config.ts:33](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L33)   |
| `flag_aliases`?   | [`AppFlagAliases`](AppFlagAliases.md)\<`Schema`> | -                                    | [packages/cli-app/src/app-config.ts:34](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L34)   |
| `clear`?          | `boolean`                                        | Clears the terminal window           | [packages/cli-app/src/app-config.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L45)   |
| `description`?    | `string`                                         | -                                    | [packages/cli-app/src/app-config.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L49)   |
| `examples`?       | \[`string`, `string`]\[]                         | Examples of usage                    | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51)   |
| `figlet`?         | `boolean`                                        | Use figlet to make large ascii title | [packages/cli-app/src/app-config.ts:57](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L57)   |
| `name`            | `string`                                         | -                                    | [packages/cli-app/src/app-config.ts:81](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L81)   |
| `print`?          | `boolean`                                        | -                                    | [packages/cli-app/src/app-config.ts:86](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L86)   |
| `title_color`?    | \{ `bg`: `string`; `fg`: `string`; }             | -                                    | [packages/cli-app/src/app-config.ts:87](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L87)   |
| `title_color.bg`? | `string`                                         | -                                    | [packages/cli-app/src/app-config.ts:89](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L89)   |
| `title_color.fg`? | `string`                                         | -                                    | [packages/cli-app/src/app-config.ts:96](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L96)   |
| `version`?        | `string`                                         | -                                    | [packages/cli-app/src/app-config.ts:111](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L111) |

## Defined in

[packages/cli-app/src/app-config.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L26)
