[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / commonFlagsSchema

# Variable: commonFlagsSchema

```ts
const commonFlagsSchema: ZodObject<
    {
        debug: ZodDefault<ZodBoolean>
        outDir: ZodEffects<
            ZodEffects<ZodString, string, string>,
            string,
            string
        >
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
        rootDir: string
        verbose: boolean
    },
    {
        debug: boolean
        outDir: string
        rootDir: string
        verbose: boolean
    }
>
```

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `debug` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/app-options.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L6) |
| `outDir` | `ZodEffects`\<`ZodEffects`\<`ZodString`, `string`, `string`\>, `string`, `string`\> | [packages/cli-app/src/app-options.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L7) |
| `rootDir` | `ZodDefault`\<`ZodEffects`\<`ZodEffects`\<`ZodEffects`\<`ZodString`, `string`, `string`\>, `string`, `string`\>, `string`, `string`\>\> | [packages/cli-app/src/app-options.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L8) |
| `verbose` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/app-options.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L12) |

## Defined in

[packages/cli-app/src/app-options.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-options.ts#L5)
