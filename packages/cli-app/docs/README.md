**@snailicide/cli-app** • **Docs**

---

# @snailicide/cli-app 🐌

<p align="center">
	<img alt="Version" src="https://img.shields.io/npm/v/@snailicide/cli-app"/>
	<a href="#" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/cli-app"/>
	</a>
	<a href="#" target="_blank">
		<img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
	</a>
</p>

_Node Cli App Boilerplate with yargs, zod, chalk_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

> Important! Suggested package manager is [pnpm](https://pnpm.io)

## @snailicide/cli-app 🐌

---

### Installation

This library is published in the NPM registry and can be installed using any compatible package manager as a development dependency.

```sh
#pnpm
pnpm add @snailicide/cli-app

#yarn
yarn add @snailicide/cli-app

#npm
npm install @snailicide/cli-app
```

###Example Usage

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

/**
 * Set the init function which will be called after app is intialized with typed
 * arguments.
 */
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

-   [yargs](https://yargs.js.org/docs/)
-   [Zod | Documentation](https://zod.dev/)

## Type Aliases

### AppConfig

```ts
type AppConfig: AppConfigOut;
```

#### Defined in

[packages/cli-app/src/app-config.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L26)

---

### AppConfigIn\<Schema\>

```ts
type AppConfigIn<Schema>: {
  clear: boolean;
  description: string;
  examples: [string, string][];
  figlet: boolean;
  flag_aliases: AppFlagAliases<Schema>;
  hidden: AppHidden<Schema>;
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

| Name | Type | Defined in |
| --- | --- | --- |
| `clear` | `boolean` | [packages/cli-app/src/app-config.ts:46](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L46) |
| `description` | `string` | [packages/cli-app/src/app-config.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L50) |
| `examples` | [`string`, `string`][] | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51) |
| `figlet` | `boolean` | [packages/cli-app/src/app-config.ts:56](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L56) |
| `flag_aliases` | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`Schema`\> | [packages/cli-app/src/app-config.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L36) |
| `hidden` | [`AppHidden`](README.md#apphiddenschema)\<`Schema`\> | [packages/cli-app/src/app-config.ts:35](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L35) |
| `name` | `string` | [packages/cli-app/src/app-config.ts:70](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L70) |
| `print` | `boolean` | [packages/cli-app/src/app-config.ts:73](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L73) |
| `title_color` | \{ `bg`: `string`; `fg`: `string`; \} | [packages/cli-app/src/app-config.ts:74](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L74) |
| `title_color.bg` | `string` | [packages/cli-app/src/app-config.ts:76](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L76) |
| `title_color.fg` | `string` | [packages/cli-app/src/app-config.ts:83](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L83) |
| `version` | `string` | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98) |

#### Defined in

[packages/cli-app/src/app-config.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L28)

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

This is the schema used to configure the Cli Application, these should NOT used in cli arguments when running the client cli app

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `clear` | `boolean` | [packages/cli-app/src/app-config.ts:46](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L46) |
| `description` | `string` | [packages/cli-app/src/app-config.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L50) |
| `examples` | [`string`, `string`][] | [packages/cli-app/src/app-config.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L51) |
| `figlet` | `boolean` | [packages/cli-app/src/app-config.ts:56](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L56) |
| `flag_aliases` | \{ `help`: `string`; `version`: `string`; \} | [packages/cli-app/src/app-config.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L60) |
| `flag_aliases.help` | `string` | [packages/cli-app/src/app-config.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L8) |
| `flag_aliases.version` | `string` | [packages/cli-app/src/app-config.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L9) |
| `hidden` | `string`[] | [packages/cli-app/src/app-config.ts:66](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L66) |
| `name` | `string` | [packages/cli-app/src/app-config.ts:70](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L70) |
| `print` | `boolean` | [packages/cli-app/src/app-config.ts:73](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L73) |
| `title_color` | \{ `bg`: `string`; `fg`: `string`; \} | [packages/cli-app/src/app-config.ts:74](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L74) |
| `title_color.bg` | `string` | [packages/cli-app/src/app-config.ts:76](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L76) |
| `title_color.fg` | `string` | [packages/cli-app/src/app-config.ts:83](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L83) |
| `version` | `string` | [packages/cli-app/src/app-config.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L98) |

#### Defined in

[packages/cli-app/src/app-config.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L25)

---

### AppConfigSchema

```ts
type AppConfigSchema: typeof appConfigSchema;
```

#### Defined in

[packages/cli-app/src/app-config.ts:106](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L106)

---

### AppFlagAliases\<Schema\>

```ts
type AppFlagAliases<Schema>: { [Key in keyof z.infer<Schema>]?: string };
```

This type is used to autocomplete the yargs aliases property. This creates shorthand values for option flags.

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/app-config.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L18)

---

### AppHidden\<Schema\>

```ts
type AppHidden<Schema>: keyof z.infer<Schema>[];
```

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/app-config.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L22)

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

| Name | Type | Defined in |
| --- | --- | --- |
| `debug` | `boolean` | [packages/cli-app/src/app-options.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L6) |
| `outDir` | `string` | [packages/cli-app/src/app-options.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L7) |
| `rootDir` | `string` | [packages/cli-app/src/app-options.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L8) |
| `verbose` | `boolean` | [packages/cli-app/src/app-options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L12) |

#### Defined in

[packages/cli-app/src/app-options.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L16)

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

| Name | Type | Defined in |
| --- | --- | --- |
| `debug` | `boolean` | [packages/cli-app/src/app-options.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L6) |
| `outDir` | `string` | [packages/cli-app/src/app-options.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L7) |
| `rootDir` | `string` | [packages/cli-app/src/app-options.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L8) |
| `verbose` | `boolean` | [packages/cli-app/src/app-options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L12) |

#### Defined in

[packages/cli-app/src/app-options.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L15)

---

### InitSuccessCallback()\<AppOptionsSchema\>

```ts
type InitSuccessCallback<AppOptionsSchema>: (resolvedFlags, help) => void;
```

A callback type that is invoked upon successful initialization of the application.

#### Type Parameters

| Type Parameter | Default type | Description |
| --- | --- | --- |
| `AppOptionsSchema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`z.AnyZodObject`\> | `z.AnyZodObject` | The schema for the application options, which can be either a Zod object schema or a Zod effects schema. |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `resolvedFlags` | `z.infer`\<`AppOptionsSchema`\> | The resolved and validated flags based on the provided schema. |
| `help` | `string` \| `undefined` | The help string, if available, otherwise undefined. |

#### Returns

`void`

#### Defined in

[packages/cli-app/src/app.ts:41](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L41)

---

### WrappedSchema\<Schema\>

```ts
type WrappedSchema<Schema>: Schema extends ZodObjectSchema ? Schema : never;
```

#### Type Parameters

| Type Parameter                                                    |
| ----------------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) |

#### Defined in

[packages/cli-app/src/helpers.ts:4](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L4)

---

### ZodObjectSchema

```ts
type ZodObjectSchema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
```

#### Defined in

[packages/cli-app/src/helpers.ts:3](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L3)

## Variables

### appConfigSchema

```ts
const appConfigSchema: ZodObject<AppConfigOut>
```

This is the schema used to configure the Cli Application, these should NOT used in cli arguments when running the client cli app

#### Defined in

[packages/cli-app/src/app-config.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L45)

---

### commonFlagsSchema

```ts
const commonFlagsSchema: ZodObject<CommonFlagsOutput>
```

#### Defined in

[packages/cli-app/src/app-options.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L5)

## Functions

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

| Type Parameter | Description |
| --- | --- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) | The schema for the application options. |

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `optionsSchema` | `AppOptionsSchema` | `undefined` | The schema for validating the application options. |
| `config` | `object` | `undefined` | The configuration object for the application. |
| `config.clear`? | `boolean` | `...` | - |
| `config.description`? | `string` | `...` | - |
| `config.examples`? | [`string`, `string`][] | `...` | - |
| `config.figlet`? | `boolean` | `...` | - |
| `config.flag_aliases`? | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.hidden`? | [`AppHidden`](README.md#apphiddenschema)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.name`? | `string` | `...` | - |
| `config.print`? | `boolean` | `...` | - |
| `config.title_color`? | `object` | `...` | - |
| `config.title_color.bg`? | `string` | `...` | - |
| `config.title_color.fg`? | `string` | `...` | - |
| `config.version`? | `string` | `...` | - |
| `initFunction`? | [`InitSuccessCallback`](README.md#initsuccesscallbackappoptionsschema)\<`AppOptionsSchema`\> | `undefined` | The callback function to be called upon successful initialization. |
| `skip_interactive`? | `boolean` | `false` | Flag to skip interactive prompts. Default is `false` |
| `_yargs`? | `string`[] | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

#### Returns

`Promise`\<`undefined` \| `Argv`\<\{\}\>\>

-   Returns a Yargs instance or undefined if initialization fails.

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

| Type Parameter | Description |
| --- | --- |
| `AppOptionsSchema` _extends_ [`ZodObjectSchema`](README.md#zodobjectschema) | The schema for the application options. |

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `optionsSchema` | `AppOptionsSchema` | `undefined` | The schema for validating the application options. |
| `config` | `object` | `undefined` | The configuration object for the application. |
| `config.clear`? | `boolean` | `...` | - |
| `config.description`? | `string` | `...` | - |
| `config.examples`? | [`string`, `string`][] | `...` | - |
| `config.figlet`? | `boolean` | `...` | - |
| `config.flag_aliases`? | [`AppFlagAliases`](README.md#appflagaliasesschema)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.hidden`? | [`AppHidden`](README.md#apphiddenschema)\<`AppOptionsSchema`\> | `undefined` | - |
| `config.name`? | `string` | `...` | - |
| `config.print`? | `boolean` | `...` | - |
| `config.title_color`? | `object` | `...` | - |
| `config.title_color.bg`? | `string` | `...` | - |
| `config.title_color.fg`? | `string` | `...` | - |
| `config.version`? | `string` | `...` | - |
| `initFunction`? | [`InitSuccessCallback`](README.md#initsuccesscallbackappoptionsschema)\<`AppOptionsSchema`\> | `undefined` | The callback function to be called upon successful initialization. |
| `skip_interactive`? | `boolean` | `false` | Flag to skip interactive prompts. Default is `false` |
| `_yargs`? | `string`[] | `process.argv` | The command-line arguments to be parsed. Default is `process.argv` |

#### Returns

`Promise`\<`undefined` \| `Argv`\<\{\}\>\>

-   Returns a Yargs instance or undefined if initialization fails.

#### Defined in

[packages/cli-app/src/app.ts:180](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app.ts#L180)

---

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

`undefined` \| \{ `description`: `string`; `name`: `string`; `version`: `string`; \}

#### Defined in

[packages/cli-app/src/app-config.ts:131](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L131)

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
