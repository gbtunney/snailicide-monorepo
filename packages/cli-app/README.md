# <h1 align="center">Welcome to @snailicide/cli-app👋</h1>

_Node Cli App Boilerplate with yargs, zod, chalk_

#### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

#### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

> Important! Suggested package manager is [pnpm](https://pnpm.io)

## @snailicide/cli-app

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
        })
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
