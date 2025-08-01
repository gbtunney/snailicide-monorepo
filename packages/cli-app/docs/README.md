**@snailicide/cli-app v0.4.2**

---

# @snailicide/cli-app 🐌

[![NPM](https://img.shields.io/npm/v/@snailicide/cli-app)](http://www.npmjs.com/package/@snailicide/cli-app)
![License: MIT](https://img.shields.io/npm/l/@snailicide/cli-app)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Node Cli App Boilerplate with yargs, zod, chalk

---

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

- **Github:**
  [`@snailicide/cli-app`](https://github.com/gbtunney/snailicide-monorepo/tree/main/packages/cli-app)
  • [`snailicide-monorepo`](https://github.com/gbtunney/snailicide-monorepo.git)
- **CDN**:
  [jsdeliver](https://cdn.jsdelivr.net/npm/@snailicide/cli-app/dist/index.min.js)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

> Recommended package manager is [pnpm](http://pnpm.io)
>
> [![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](http://pnpm.io)

## @snailicide/cli-app 🐌

---

The `@snailicide/cli-app` package is a builder application for making custom
command-line interface (CLI) application. Developers can quickly bootstrap a
boilerplate with powerful validation/parsing schemas. It leverages several
libraries to provide robust and interactive user experience.

#### Key Features

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

### Example Usage

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

| Function                                          | Description                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| [parsePackageJson](functions/parsePackageJson.md) | -                                                                               |
| [initApp](functions/initApp.md)                   | Initializes the application with the provided configuration and options schema. |
| [wrapSchema](functions/wrapSchema.md)             | -                                                                               |

## Type Aliases

| Type Alias                                                 | Description                                                                                                                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [AppFlagAliases](type-aliases/AppFlagAliases.md)           | This type is used to autocomplete the yargs aliases property. This creates shorthand values for option flags.                    |
| [AppHidden](type-aliases/AppHidden.md)                     | -                                                                                                                                |
| [AppConfigOut](type-aliases/AppConfigOut.md)               | This is the schema used to configure the Cli Application, these should NOT used in cli arguments when running the client cli app |
| [AppConfig](type-aliases/AppConfig.md)                     | -                                                                                                                                |
| [AppConfigIn](type-aliases/AppConfigIn.md)                 | -                                                                                                                                |
| [appConfigSchema](type-aliases/appConfigSchema.md)         | This is the schema used to configure the Cli Application, these should NOT used in cli arguments when running the client cli app |
| [AppConfigSchema](type-aliases/AppConfigSchema-1.md)       | -                                                                                                                                |
| [CommonFlagsOutput](type-aliases/CommonFlagsOutput.md)     | -                                                                                                                                |
| [CommonFlagsInput](type-aliases/CommonFlagsInput.md)       | -                                                                                                                                |
| [InitSuccessCallback](type-aliases/InitSuccessCallback.md) | A callback type that is invoked upon successful initialization of the application.                                               |
| [ZodObjectSchema](type-aliases/ZodObjectSchema.md)         | -                                                                                                                                |
| [WrappedSchema](type-aliases/WrappedSchema.md)             | -                                                                                                                                |

## Variables

| Variable                                            | Description |
| --------------------------------------------------- | ----------- |
| [commonFlagsSchema](variables/commonFlagsSchema.md) | -           |
| [initializeApp](variables/initializeApp.md)         | -           |
