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
pnpm add @snailicide/cli-app -D

## For pnpm workspace, use the command below.
pnpm add @snailicide/cli-app@workspace:* -D
```

###Example Usage

```ts
const initFunc = (args: BaseArgs, help: undefined | string) => {
    if (args.debug === true) {
        console.log('RESOLVED APP ARGS::initFunc: ', args, 'done')
    }
    console.log(help)
}

const myschema = base_schema
    .merge(
        z.object({
            testarr: z.number().array().default([]).describe('test array'),
            testarr2: z.string().array().default([]).describe('test array'),
        }),
    )
    .transform((value) => {
        return value
    })
    .describe('this is a sample app that is made of fun')

const alias: AppAliasOption<typeof myschema> = {
    testarr2: 'o',
    version: 'v',
    help: 'h',
    rootDir: 'r',
}
const OPTIONS: unResolvedAppOptions = {
    name: 'Example App',
    description: 'This is an example to demonstrate use',
    alias: alias, //code editor error
    examples: [
        ['$0 --config "~/config.json"', 'Use custom config'],
        ['$0 --safe', 'Start in safe mode'],
    ],
}

const initialize = async () => {
    const instance_yargs = initApp(myschema, initFunc, OPTIONS)
}
```

### Helpful Links

-   [yargs](https://yargs.js.org/docs/)
-   [Zod | Documentation](https://zod.dev/)
