# Zod Notes

## ZodType with ZodEffects

> When using `z.ZodType` with `z.ZodEffects` _( .refine, .transform, preprocess, etc... )_, you will need to define the input and output types of the schema. `z.ZodType<Output, z.ZodTypeDef, Input>`

```ts
const isValidId = (id: string): id is `${string}/${string}` =>
    id.split('/').length === 2

const baseSchema = z.object({
    id: z.string().refine(isValidId),
})

type Input = z.input<typeof baseSchema> & {
    children: Input[]
}

type Output = z.output<typeof baseSchema> & {
    children: Output[]
}

const schema: z.ZodType<Output, z.ZodTypeDef, Input> = baseSchema.extend({
    children: z.lazy(() => schema.array()),
})
```

## Wrapped transform

> from [Error when transforming wrapped parser · Issue #361 · colinhacks/zod](https://github.com/colinhacks/zod/issues/361)

```ts
const wrap = <T extends z.ZodTypeAny>(
    inner: T
): ZodEffects<ZodObject<{ data: T }>, z.infer<T>> => {
    return z.object({ data: inner }).transform((val: any) => {
        return val.data
    })
}

const schema = wrap(z.string())
schema.parse({ data: 'asdfasdf' }) // => "asdfasdf"
```

## Make schema optional

> from [Typecheck schemas against existing types · Issue #372 · colinhacks/zod](https://github.com/colinhacks/zod/issues/372)

```ts
const makeSchemaOptional = <T extends z.ZodTypeAny>(schema: T) => {
    return schema.optional()
}
const arg = makeSchemaOptional(z.string())
arg.unwrap() // ZodString
```

> ZodTypeAny is just a shorthand for ZodType<any, any, any>, a type that is broad enough to match any Zod schema.

The `ZodType` class has three generic parameters.

```ts
class ZodType<
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output

/* * By constraining these in your generic input, you can limit what schemas are allowable as inputs to your function: * */

function makeSchemaOptional<T extends z.ZodType<string>>(schema: T) {
    return schema.optional();
}

makeSchemaOptional(z.string());
// works fine

makeSchemaOptional(z.number());
// Error: 'ZodNumber' is not assignable to parameter of type 'ZodType<string, ZodT
```

## Typecheck schemas against existing types

> from [github: colinhacks/zod](https://github.com/colinhacks/zod/issues/372)

```ts
type Dog = {
    name: string
    neutered: boolean
}
const schemaForType =
    <T>() =>
    <S extends z.ZodType<T, any, any>>(arg: S) => {
        return arg
    }

// use like this:
const dog = schemaForType<Dog>()(
    z.object({
        name: z.string(),
        neutered: z.boolean(),
    })
)

//Passing "Dog" as a generic type parameter tells Typescript what the schema should look like
const dogSchema = z.object<Dog>({
    name: z.string().min(3),
    neutered: z.string(), //Error: string can't be assigned to boolean
})
```
