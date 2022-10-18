#Notes

## Echo working directory

```shell
echo $PWD
echo $PATH
```

##Get working directory ( in childpackage )

```shell
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
    yargs(process.argv).argv
)
```

```shell
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

```shell
> REPTILES=$(pnpm --filter=@snailicide/cli-* exec ts-node dist/example-file.js)

$REPTILES > echo
Dragon,Iguana,Salamander,Snake,Lizard,Python,Tortoise,Turtle > Alligator,Crocodile,Chameleon,Komodo

# becomes a script argument.
--filter=@snailicide/cli-* > pnpm run generate:base $REPTILES

# copy output to clipboard
echo $REPTILES | pbcopy
```
