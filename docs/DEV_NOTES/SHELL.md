# Notes

```shell
if [ -z "$(git status --untracked-files=no --porcelain)" ]; then
    # Working directory clean excluding untracked files
else
    # Uncommitted changes in tracked files
fi
```

## Echo working directory

```sh
echo $PWD
echo $PATH
```

##Get working directory ( in childpackage )

```sh
pnpm --filter=@snailicide/cli-* run generate:base --file_path $PWD/package.json
```

##Parse Arguments using YARGS

```ts
import yargs from 'yargs'
const args = yargs(process.argv).argv
```

## Parse, Validate and trim junk with zod

```ts
import yargs from 'yargs'
import { z } from 'zod'

const argsSchema = z.object({
    name: z.string().default('unknown_name'),
    email: z.string().email().optional(),
})
const cleaned_args: z.infer<typeof argsSchema> = argsSchema.parse(
    yargs(process.argv).argv,
)
```

```sh
pnpm exec ts-node your-script-file.ts --unwantedFlag --name Gillian --email=gbtunney@gmail.com
```

## Get output of node script in variable

```ts
const reptiles: Array<string> = [
    'Alligator',
    'Crocodile',
    'Chameleon',
    'Komodo Dragon',
    'Iguana',
    'Salamander',
    'Snake',
    'Lizard',
    'Python',
    'Tortoise',
    'Turtle',
]
export const writeReptiles = () => {
    console.log(reptiles.toString())
}
export default writeReptiles()
```

```sh
> REPTILES=$(pnpm --filter=@snailicide/cli-* exec ts-node dist/example-file.js)

$REPTILES > echo
Dragon,Iguana,Salamander,Snake,Lizard,Python,Tortoise,Turtle > Alligator,Crocodile,Chameleon,Komodo

# becomes a script argument.
--filter=@snailicide/cli-* > pnpm run generate:base $REPTILES

# copy output to clipboard
echo $REPTILES | pbcopy
```

## .env file format

```sh
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

```sh
#output environmental variable
npx dotenv -p SECRET_KEY
```

## package.json

-   echo package name

```json5
{
    /* * package variables * */
    '\n========== example >> ==========': '',
    'example:1': 'echo $npm_package_name;',
    /* * ENV * */
    'example:2': 'todo: add example',
}
```

-   useful pkgs - _what do they mean, and why are they so similar?_

```json5
{
    'conventional-changelog-cli': '^2.2.2',
    'standard-version': '^9.5.0',
    'cross-env': '^7.0.3',
    'cross-var': '^1.1.0',
    'dotenv': '^16.0.3',
    'dotenv-cli': '^6.0.0',
}
```

## HUSKY - add new hook

```sh
$ pnpm exec husky add .husky/pre-commit "npx validate-branch-name"
```
