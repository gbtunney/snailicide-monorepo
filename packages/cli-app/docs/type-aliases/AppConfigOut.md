[**@snailicide/cli-app v0.4.0**](../README.md) • **Docs**

---

[@snailicide/cli-app v0.4.0](../README.md) / AppConfigOut

# Type Alias: AppConfigOut

```ts
type AppConfigOut: {
  clear: boolean;
  description: string;
  examples: [string, string][];
  figlet: boolean;
  flag_aliases: Record<string, string>;
  hidden: string[];
  name: string;
  print: boolean;
  title_color: {
     bg: string;
     fg: string;
    };
  version: string;
};
```

This is the schema used to configure the Cli Application, these should NOT used
in cli arguments when running the client cli app

## Type declaration

| Name             | Type                                 | Description                                                                                                          | Defined in                                                                                                                                    |
| ---------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `clear`          | `boolean`                            | Clears the terminal window                                                                                           | [packages/cli-app/src/app-config.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L45)   |
| `description`?   | `string`                             | -                                                                                                                    | [packages/cli-app/src/app-config.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L49)   |
| `examples`       | \[`string`, `string`]\[]             | Examples of usage                                                                                                    | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51)   |
| `figlet`         | `boolean`                            | Use figlet to make large ascii title                                                                                 | [packages/cli-app/src/app-config.ts:57](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L57)   |
| `flag_aliases`   | `Record`\<`string`, `string`>        | Shorthand Option Aliases (--help , -h ) **Exqmple** `pnpm test:example -h # are equivalent pnpm test:example --help` | [packages/cli-app/src/app-config.ts:70](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L70)   |
| `hidden`         | `string`\[]                          | Hide an option from the help screen                                                                                  | [packages/cli-app/src/app-config.ts:77](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L77)   |
| `name`           | `string`                             | -                                                                                                                    | [packages/cli-app/src/app-config.ts:81](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L81)   |
| `print`          | `boolean`                            | -                                                                                                                    | [packages/cli-app/src/app-config.ts:86](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L86)   |
| `title_color`    | \{ `bg`: `string`; `fg`: `string`; } | -                                                                                                                    | [packages/cli-app/src/app-config.ts:87](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L87)   |
| `title_color.bg` | `string`                             | -                                                                                                                    | [packages/cli-app/src/app-config.ts:89](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L89)   |
| `title_color.fg` | `string`                             | -                                                                                                                    | [packages/cli-app/src/app-config.ts:96](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L96)   |
| `version`        | `string`                             | -                                                                                                                    | [packages/cli-app/src/app-config.ts:111](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L111) |

## Defined in

[packages/cli-app/src/app-config.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L23)
