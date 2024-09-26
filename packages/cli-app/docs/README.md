**@snailicide/cli-app v0.3.0** • **Docs**

---

# @snailicide/cli-app 🐌

<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/@snailicide/cli-app" />

  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/cli-app" />
  </a>

  <a href="#" target="_blank">
    <img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>
</p>

_Node Cli App Boilerplate with yargs, zod, chalk_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

> Important! Suggested package manager is [pnpm](https://pnpm.io)

## Contents

- [@snailicide/cli-app 🐌](#snailicidecli-app--1)
  - [Installation](#installation)
  - [Example Usage:](#example-usage)
  - [Helpful Links](#helpful-links)
- [Functions](#functions)
  - [parsePackageJson()](#parsepackagejson)
  - [initApp()](#initapp)
  - [initializeApp()](#initializeapp)
  - [wrapSchema()](#wrapschema)
- [Type Aliases](#type-aliases)
  - [AppFlagAliases\<Schema>](#appflagaliasesschema)
  - [AppHidden\<Schema>](#apphiddenschema)
  - [AppConfigOut](#appconfigout)
  - [AppConfig](#appconfig)
  - [AppConfigIn\<Schema>](#appconfiginschema)
  - [AppConfigSchema](#appconfigschema)
  - [CommonFlagsOutput](#commonflagsoutput)
  - [CommonFlagsInput](#commonflagsinput)
  - [InitSuccessCallback()\<AppOptionsSchema>](#initsuccesscallbackappoptionsschema)
  - [ZodObjectSchema](#zodobjectschema)
  - [WrappedSchema\<Schema>](#wrappedschemaschema)
- [Variables](#variables)
  - [appConfigSchema](#appconfigschema-1)
  - [commonFlagsSchema](#commonflagsschema)

## @snailicide/cli-app 🐌

The `@snailicide/cli-app` package is a builder application for making custom
command-line interface (CLI) application. Developers can quickly bootstrap a
boilerplate with powerful validation/parsing schemas. It leverages several
libraries to provide robust and interactive user experience.

#### Key Features:

- **Command-Line Parsing**: Utilizes [`yargs`](https://yargs.js.org/docs/) and
  [`yargs-interactive`](https://www.npmjs.com/package/yargs-interactive?activeTab=readme)
  for parsing command-line arguments and handling interactive prompts.
- **Schema Validation/Handling**: Use zod schemas to parse/validate input,
  including resolving user options & application configurations, and generating
  Yargs-compatible option objects.
- **Configuration Management**: Manages application configurations using schemas
  defined with [`zod`](https://zod.dev/). This ensures that configurations are
  validated and adhere to expected structures.
- **Title /HelpScreen Management**: Manage custom cli options and customize
  appearance of title/help menu terminal output.

---

### Installation

This library is published in the NPM registry and can be installed using any
compatible package manager as a development dependency.

```sh
#pnpm
pnpm add @snailicide/cli-app

#yarn
yarn add @snailicide/cli-app

#npm
npm install @snailicide/cli-app
```

### Example Usage:

The `cli-app` package can be initialized and configured using the `initApp`
function, which sets up the application based on provided schemas and options,
and supports interactive prompts if needed.

---

```ts
import { z } from 'zod'

import {
  AppConfigIn,
  commonFlagsSchema,
  initApp,
  InitSuccessCallback,
  WrappedSchema,
  wrapSchema,
} from './index.js'

/** Define custom schema, wrapper is required to avoid typescript error */
const custom_schema = z.object({
  testarr: z.number().array().default([]).describe('test array'),
  testarr2: z.string().array().default([]).describe('test array'),
})
const my_merged_schema = wrapSchema<typeof commonFlagsSchema>(commonFlagsSchema)
  .merge(custom_schema)
  .transform((value) => {
    return value
  })
  .describe('this is a sample app that is made of fun')

type MergedSchema = WrappedSchema<typeof my_merged_schema>

/** Set the init function which will be called after app is intialized with typed arguments. */
const initFunc: InitSuccessCallback<MergedSchema> = <
  Schema extends
    | z.AnyZodObject
    | z.ZodEffects<z.AnyZodObject> = typeof commonFlagsSchema,
>(
  args: z.infer<Schema>,
) => {
  if (args['testarr']) {
    console.warn('RESOLVED APP ARGS: ', args)
  }
  console.log(JSON.stringify(args))
  return true
}

/** Example app configuration options */
const exampleAppConfigOptions: AppConfigIn<MergedSchema> = {
  description: 'This is an example to demonstrate use',
  //code editor error
  examples: [
    ['$0 --config "~/config.json"', 'Use custom config'],
    ['$0 --safe', 'Start in safe mode'],
  ],
  flag_aliases: {
    outDir: 'o',
    rootDir: 'r',
    // help: 'h',
    //version: 'v',
  },
  hidden: ['debug', 'testarr2'],
  name: 'Example App',
}

/** Initialize App */
const initialize = async (): Promise<'SUCCESS' | 'ERROR'> => {
  const instance_yargs = await initApp<MergedSchema>(
    my_merged_schema,
    exampleAppConfigOptions,
    initFunc,
  )
  if (instance_yargs === undefined) {
    process.exit(1)
    return 'ERROR'
  }
  process.exit(0)
  return 'SUCCESS'
}

export default initialize()
```

### Helpful Links

- [yargs](https://yargs.js.org/docs/)
- [yargs-interactive](https://www.npmjs.com/package/yargs-interactive?activeTab=readme)
- [zod](https://zod.dev/)
- [chalk](https://www.npmjs.com/package/chalk)
- [figlet](https://www.npmjs.com/package/figlet)

## Functions

### parsePackageJson()

```ts
function parsePackageJson(pkg):
  | undefined
  | {
      description: string
      name: string
      version: string
    }
```

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `pkg`     | `unknown` |

#### Returns

`undefined` | \{ `description`: `string`; `name`: `string`; `version`: `string`;
}

#### Defined in

[packages/cli-app/src/app-config.ts:146](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L146)

---

### initApp()

```ts
function initApp<AppOptionsSchema>(
  optionsSchema,
  config,
  initFunction,
  skip_interactive?,
  _yargs?,
): Promise<undefined | Argv<{}>>
```

Initializes the application with the provided configuration and options schema.

#### Type Parameters

| Type Parameter                                                              | Description                             |
| --------------------------------------------------------------------------- | --------------------------------------- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) | The schema for the application options. |

#### Parameters

| Parameter                | Type                                                                                        | Default value  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------ |
| `optionsSchema`          | `AppOptionsSchema`                                                                          | `undefined`    | The schema for validating the application options.                 |
| `config`                 | `object`                                                                                    | `undefined`    | The configuration object for the application.                      |
| `config.hidden`?         | [`AppHidden`](README.md#apphiddenschema)\<`AppOptionsSchema`>                               | `undefined`    | -                                                                  |
| `config.flag_aliases`?   | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`AppOptionsSchema`>                     | `undefined`    | -                                                                  |
| `config.clear`?          | `boolean`                                                                                   | `...`          | Clears the terminal window                                         |
| `config.description`?    | `string`                                                                                    | `...`          | -                                                                  |
| `config.examples`?       | \[`string`, `string`]\[]                                                                    | `...`          | Examples of usage                                                  |
| `config.figlet`?         | `boolean`                                                                                   | `...`          | Use figlet to make large ascii title                               |
| `config.name`?           | `string`                                                                                    | `...`          | -                                                                  |
| `config.print`?          | `boolean`                                                                                   | `...`          | -                                                                  |
| `config.title_color`?    | `object`                                                                                    | `...`          | -                                                                  |
| `config.title_color.bg`? | `string`                                                                                    | `...`          | -                                                                  |
| `config.title_color.fg`? | `string`                                                                                    | `...`          | -                                                                  |
| `config.version`?        | `string`                                                                                    | `...`          | -                                                                  |
| `initFunction`?          | [`InitSuccessCallback`](README.md#initsuccesscallbackappoptionsschema)\<`AppOptionsSchema`> | `undefined`    | The callback function to be called upon successful initialization. |
| `skip_interactive`?      | `boolean`                                                                                   | `false`        | Flag to skip interactive prompts. Default is `false`               |
| `_yargs`?                | `string`\[]                                                                                 | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

#### Returns

`Promise`\<`undefined` | `Argv`\<\{}>>

- Returns a Yargs instance or undefined if initialization fails.

#### Defined in

[packages/cli-app/src/app.ts:65](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L65)

---

### initializeApp()

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

#### Type Parameters

| Type Parameter                                                              | Description                             |
| --------------------------------------------------------------------------- | --------------------------------------- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) | The schema for the application options. |

#### Parameters

| Parameter                | Type                                                                                        | Default value  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------ |
| `optionsSchema`          | `AppOptionsSchema`                                                                          | `undefined`    | The schema for validating the application options.                 |
| `config`                 | `object`                                                                                    | `undefined`    | The configuration object for the application.                      |
| `config.hidden`?         | [`AppHidden`](README.md#apphiddenschema)\<`AppOptionsSchema`>                               | `undefined`    | -                                                                  |
| `config.flag_aliases`?   | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`AppOptionsSchema`>                     | `undefined`    | -                                                                  |
| `config.clear`?          | `boolean`                                                                                   | `...`          | Clears the terminal window                                         |
| `config.description`?    | `string`                                                                                    | `...`          | -                                                                  |
| `config.examples`?       | \[`string`, `string`]\[]                                                                    | `...`          | Examples of usage                                                  |
| `config.figlet`?         | `boolean`                                                                                   | `...`          | Use figlet to make large ascii title                               |
| `config.name`?           | `string`                                                                                    | `...`          | -                                                                  |
| `config.print`?          | `boolean`                                                                                   | `...`          | -                                                                  |
| `config.title_color`?    | `object`                                                                                    | `...`          | -                                                                  |
| `config.title_color.bg`? | `string`                                                                                    | `...`          | -                                                                  |
| `config.title_color.fg`? | `string`                                                                                    | `...`          | -                                                                  |
| `config.version`?        | `string`                                                                                    | `...`          | -                                                                  |
| `initFunction`?          | [`InitSuccessCallback`](README.md#initsuccesscallbackappoptionsschema)\<`AppOptionsSchema`> | `undefined`    | The callback function to be called upon successful initialization. |
| `skip_interactive`?      | `boolean`                                                                                   | `false`        | Flag to skip interactive prompts. Default is `false`               |
| `_yargs`?                | `string`\[]                                                                                 | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

#### Returns

`Promise`\<`undefined` | `Argv`\<\{}>>

- Returns a Yargs instance or undefined if initialization fails.

#### Defined in

[packages/cli-app/src/app.ts:180](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L180)

---

### wrapSchema()

```ts
function wrapSchema<Schema>(schema): Schema
```

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `schema`  | `Schema` |

#### Returns

`Schema`

#### Defined in

[packages/cli-app/src/helpers.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L6)

## Type Aliases

### AppFlagAliases\<Schema>

```ts
type AppFlagAliases<Schema>: DefaultAliases & { [Key in keyof z.infer<Schema>]?: string };
```

This type is used to autocomplete the yargs aliases property. This creates
shorthand values for option flags.

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/app-config.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L19)

---

### AppHidden\<Schema>

```ts
type AppHidden<Schema>: keyof z.infer<Schema>[];
```

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/app-config.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L23)

---

### AppConfigOut

```ts
type AppConfigOut: {
  clear: boolean;
  description: string;
  examples: [string, string][];
  figlet: boolean;
  flag_aliases: {
     help: string;
     version: string;
    };
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

#### Type declaration

| Name                   | Type                                        | Description                                                                                                          | Defined in                                                                                                                                    |
| ---------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `clear`                | `boolean`                                   | Clears the terminal window                                                                                           | [packages/cli-app/src/app-config.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L48)   |
| `description`          | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L52)   |
| `examples`             | \[`string`, `string`]\[]                    | Examples of usage                                                                                                    | [packages/cli-app/src/app-config.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L54)   |
| `figlet`               | `boolean`                                   | Use figlet to make large ascii title                                                                                 | [packages/cli-app/src/app-config.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L60)   |
| `flag_aliases`         | \{ `help`: `string`; `version`: `string`; } | Shorthand Option Aliases (--help , -h ) **Exqmple** `pnpm test:example -h # are equivalent pnpm test:example --help` | [packages/cli-app/src/app-config.ts:74](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L74)   |
| `flag_aliases.help`    | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L8)     |
| `flag_aliases.version` | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L9)     |
| `hidden`               | `string`\[]                                 | Hide an option from the help screen                                                                                  | [packages/cli-app/src/app-config.ts:81](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L81)   |
| `name`                 | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:85](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L85)   |
| `print`                | `boolean`                                   | -                                                                                                                    | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| `title_color`          | \{ `bg`: `string`; `fg`: `string`; }        | -                                                                                                                    | [packages/cli-app/src/app-config.ts:89](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L89)   |
| `title_color.bg`       | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:91](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L91)   |
| `title_color.fg`       | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98)   |
| `version`              | `string`                                    | -                                                                                                                    | [packages/cli-app/src/app-config.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L113) |

#### Defined in

[packages/cli-app/src/app-config.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L26)

---

### AppConfig

```ts
type AppConfig: AppConfigOut;
```

#### Defined in

[packages/cli-app/src/app-config.ts:27](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L27)

---

### AppConfigIn\<Schema>

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

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Type declaration

| Name             | Type                                                          | Description                          | Defined in                                                                                                                                    |
| ---------------- | ------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `hidden`         | [`AppHidden`](README.md#apphiddenschema)\<`Schema`>           | -                                    | [packages/cli-app/src/app-config.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L36)   |
| `flag_aliases`   | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`Schema`> | -                                    | [packages/cli-app/src/app-config.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L37)   |
| `clear`          | `boolean`                                                     | Clears the terminal window           | [packages/cli-app/src/app-config.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L48)   |
| `description`    | `string`                                                      | -                                    | [packages/cli-app/src/app-config.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L52)   |
| `examples`       | \[`string`, `string`]\[]                                      | Examples of usage                    | [packages/cli-app/src/app-config.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L54)   |
| `figlet`         | `boolean`                                                     | Use figlet to make large ascii title | [packages/cli-app/src/app-config.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L60)   |
| `name`           | `string`                                                      | -                                    | [packages/cli-app/src/app-config.ts:85](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L85)   |
| `print`          | `boolean`                                                     | -                                    | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| `title_color`    | \{ `bg`: `string`; `fg`: `string`; }                          | -                                    | [packages/cli-app/src/app-config.ts:89](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L89)   |
| `title_color.bg` | `string`                                                      | -                                    | [packages/cli-app/src/app-config.ts:91](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L91)   |
| `title_color.fg` | `string`                                                      | -                                    | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98)   |
| `version`        | `string`                                                      | -                                    | [packages/cli-app/src/app-config.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L113) |

#### Defined in

[packages/cli-app/src/app-config.ts:29](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L29)

---

### AppConfigSchema

```ts
type AppConfigSchema: typeof appConfigSchema;
```

#### Defined in

[packages/cli-app/src/app-config.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L121)

---

### CommonFlagsOutput

```ts
type CommonFlagsOutput: {
  debug: boolean;
  outDir: string;
  rootDir: string;
  verbose: boolean;
};
```

#### Type declaration

| Name      | Type      | Defined in                                                                                                                                    |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug`   | `boolean` | [packages/cli-app/src/app-options.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L6)   |
| `outDir`  | `string`  | [packages/cli-app/src/app-options.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L7)   |
| `rootDir` | `string`  | [packages/cli-app/src/app-options.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L8)   |
| `verbose` | `boolean` | [packages/cli-app/src/app-options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L12) |

#### Defined in

[packages/cli-app/src/app-options.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L15)

---

### CommonFlagsInput

```ts
type CommonFlagsInput: {
  debug: boolean;
  outDir: string;
  rootDir: string;
  verbose: boolean;
};
```

#### Type declaration

| Name      | Type      | Defined in                                                                                                                                    |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug`   | `boolean` | [packages/cli-app/src/app-options.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L6)   |
| `outDir`  | `string`  | [packages/cli-app/src/app-options.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L7)   |
| `rootDir` | `string`  | [packages/cli-app/src/app-options.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L8)   |
| `verbose` | `boolean` | [packages/cli-app/src/app-options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L12) |

#### Defined in

[packages/cli-app/src/app-options.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L16)

---

### InitSuccessCallback()\<AppOptionsSchema>

```ts
type InitSuccessCallback<AppOptionsSchema>: (resolvedFlags, help) => void;
```

A callback type that is invoked upon successful initialization of the
application.

#### Type Parameters

| Type Parameter                                                                     | Default type     | Description                                                                                              |
| ---------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `AppOptionsSchema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`z.AnyZodObject`> | `z.AnyZodObject` | The schema for the application options, which can be either a Zod object schema or a Zod effects schema. |

#### Parameters

| Parameter       | Type                           | Description                                                    |
| --------------- | ------------------------------ | -------------------------------------------------------------- |
| `resolvedFlags` | `z.infer`\<`AppOptionsSchema`> | The resolved and validated flags based on the provided schema. |
| `help`          | `string` \| `undefined`        | The help string, if available, otherwise undefined.            |

#### Returns

`void`

#### Defined in

[packages/cli-app/src/app.ts:41](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L41)

---

### ZodObjectSchema

```ts
type ZodObjectSchema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
```

#### Defined in

[packages/cli-app/src/helpers.ts:3](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L3)

---

### WrappedSchema\<Schema>

```ts
type WrappedSchema<Schema>: Schema extends ZodObjectSchema ? Schema : never;
```

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/helpers.ts:4](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L4)

## Variables

### appConfigSchema

```ts
const appConfigSchema: ZodObject<AppConfigOut>
```

This is the schema used to configure the Cli Application, these should NOT used
in cli arguments when running the client cli app

#### Defined in

[packages/cli-app/src/app-config.ts:46](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L46)

---

### commonFlagsSchema

```ts
const commonFlagsSchema: ZodObject<CommonFlagsOutput>
```

#### Defined in

[packages/cli-app/src/app-options.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L5)
