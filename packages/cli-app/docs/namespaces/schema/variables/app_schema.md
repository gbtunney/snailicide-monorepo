[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [schema](../README.md) / app_schema

# Variable: app_schema

```ts
const app_schema: ZodObject<
    {
        alias: ZodDefault<ZodRecord<ZodString, ZodString>>
        clear: ZodDefault<ZodBoolean>
        description: ZodOptional<ZodString>
        examples: ZodDefault<
            ZodArray<ZodTuple<[ZodString, ZodString], null>, 'many'>
        >
        figlet: ZodDefault<ZodBoolean>
        hidden: ZodDefault<ZodArray<ZodString, 'many'>>
        name: ZodEffects<ZodString, string, string>
        print: ZodDefault<ZodBoolean>
        title_color: ZodDefault<
            ZodObject<
                {
                    bg: ZodDefault<ZodString>
                    fg: ZodDefault<ZodString>
                },
                'strip',
                ZodTypeAny,
                {
                    bg: string
                    fg: string
                },
                {
                    bg: string
                    fg: string
                }
            >
        >
        version: ZodEffects<ZodDefault<ZodString>, string, undefined | string>
    },
    'strip',
    ZodTypeAny,
    {
        alias: Record<string, string>
        clear: boolean
        description: string
        examples: [string, string][]
        figlet: boolean
        hidden: string[]
        name: string
        print: boolean
        title_color: {
            bg: string
            fg: string
        }
        version: string
    },
    {
        alias: Record<string, string>
        clear: boolean
        description: string
        examples: [string, string][]
        figlet: boolean
        hidden: string[]
        name: string
        print: boolean
        title_color: {
            bg: string
            fg: string
        }
        version: string
    }
>
```

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `alias` | `ZodDefault`\<`ZodRecord`\<`ZodString`, `ZodString`\>\> | [packages/cli-app/src/schema.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L17) |
| `clear` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/schema.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L19) |
| `description` | `ZodOptional`\<`ZodString`\> | [packages/cli-app/src/schema.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L23) |
| `examples` | `ZodDefault`\<`ZodArray`\<`ZodTuple`\<[`ZodString`, `ZodString`], `null`\>, `"many"`\>\> | [packages/cli-app/src/schema.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L24) |
| `figlet` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/schema.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L28) |
| `hidden` | `ZodDefault`\<`ZodArray`\<`ZodString`, `"many"`\>\> | [packages/cli-app/src/schema.ts:32](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L32) |
| `name` | `ZodEffects`\<`ZodString`, `string`, `string`\> | [packages/cli-app/src/schema.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L36) |
| `print` | `ZodDefault`\<`ZodBoolean`\> | [packages/cli-app/src/schema.ts:39](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L39) |
| `title_color` | `ZodDefault`\<`ZodObject`\<\{ `bg`: `ZodDefault`\<`ZodString`\>; `fg`: `ZodDefault`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `bg`: `string`; `fg`: `string`; \}, \{ `bg`: `string`; `fg`: `string`; \}\>\> | [packages/cli-app/src/schema.ts:40](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L40) |
| `version` | `ZodEffects`\<`ZodDefault`\<`ZodString`\>, `string`, `undefined` \| `string`\> | [packages/cli-app/src/schema.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L50) |

## Defined in

[packages/cli-app/src/schema.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L16)
