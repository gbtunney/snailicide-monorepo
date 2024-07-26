[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [schema](../README.md) / base_schema

# Variable: base_schema

```ts
const base_schema: ZodObject<
    {
        debug: ZodDefault<ZodBoolean>
        outDir: ZodDefault<ZodString>
        outFile: ZodDefault<ZodString>
        rootDir: ZodDefault<
            ZodEffects<
                ZodEffects<
                    ZodEffects<ZodString, string, string>,
                    string,
                    string
                >,
                string,
                string
            >
        >
        verbose: ZodDefault<ZodBoolean>
    },
    'strip',
    ZodTypeAny,
    {
        debug: boolean
        outDir: string
        outFile: string
        rootDir: string
        verbose: boolean
    },
    {
        debug: boolean
        outDir: string
        outFile: string
        rootDir: string
        verbose: boolean
    }
>
```

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `debug` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/schema.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L60) |
| `outDir` | `ZodDefault`\<`ZodString`\> | [packages/cli-app/src/schema.ts:61](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L61) |
| `outFile` | `ZodDefault`\<`ZodString`\> | [packages/cli-app/src/schema.ts:65](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L65) |
| `rootDir` | `ZodDefault`\<`ZodEffects`\<`ZodEffects`\<`ZodEffects`\<`ZodString`, `string`, `string`\>, `string`, `string`\>, `string`, `string`\>\> | [packages/cli-app/src/schema.ts:69](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L69) |
| `verbose` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/schema.ts:72](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L72) |

## Defined in

[packages/cli-app/src/schema.ts:59](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L59)
