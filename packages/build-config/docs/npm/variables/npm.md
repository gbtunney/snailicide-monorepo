[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [npm](../README.md) / npm

# Variable: npm

```ts
const npm: {
    isNPMPackage: <Schema, BaseSchema>(
        value,
        custom_schema,
        show_error,
        passthru,
    ) => value is undefined | PackageJson<Schema, BaseSchema>
    packageStandardSchema: (base_schema) => AnyZodObject
    parseNPMPackage: <Schema, BaseSchema>(
        value,
        custom_schema,
        show_error,
        passThrough,
    ) => undefined | PackageJson<Schema, BaseSchema>
    schemas: {
        basePackage: ZodObject<
            {
                author: ZodObject<
                    {
                        email: ZodString
                        name: ZodString
                    },
                    'strip',
                    ZodTypeAny,
                    {
                        email: string
                        name: string
                    },
                    {
                        email: string
                        name: string
                    }
                >
                description: ZodString
                license: ZodString
                main: ZodString
                name: ZodString
                repository: ZodObject<
                    {
                        type: ZodString
                        url: ZodString
                    },
                    'strip',
                    ZodTypeAny,
                    {
                        type: string
                        url: string
                    },
                    {
                        type: string
                        url: string
                    }
                >
                version: ZodEffects<ZodString, string, string>
            },
            'strip',
            ZodTypeAny,
            {
                author: {
                    email: string
                    name: string
                }
                description: string
                license: string
                main: string
                name: string
                repository: {
                    type: string
                    url: string
                }
                version: string
            },
            {
                author: {
                    email: string
                    name: string
                }
                description: string
                license: string
                main: string
                name: string
                repository: {
                    type: string
                    url: string
                }
                version: string
            }
        >
        schemaRequiredScripts: ZodObject<
            {
                scripts: ZodObject<
                    {
                        build: ZodString
                        dev: ZodString
                        test: ZodString
                    },
                    'strip',
                    ZodTypeAny,
                    {
                        build: string
                        dev: string
                        test: string
                    },
                    {
                        build: string
                        dev: string
                        test: string
                    }
                >
            },
            'strip',
            ZodTypeAny,
            {
                scripts: {
                    build: string
                    dev: string
                    test: string
                }
            },
            {
                scripts: {
                    build: string
                    dev: string
                    test: string
                }
            }
        >
        standardPackage: basePackage
    }
}
```

## Type declaration

| Name | Type | Default value | Defined in |
| --- | --- | --- | --- |
| `isNPMPackage` | \<`Schema`, `BaseSchema`\>(`value`, `custom_schema`, `show_error`, `passthru`) => value is undefined \| PackageJson\<Schema, BaseSchema\> | - | [packages/build-config/src/npm/index.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/index.ts#L10) |
| `packageStandardSchema` | (`base_schema`) => `AnyZodObject` | - | [packages/build-config/src/npm/index.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/index.ts#L11) |
| `parseNPMPackage` | \<`Schema`, `BaseSchema`\>(`value`, `custom_schema`, `show_error`, `passThrough`) => `undefined` \| [`PackageJson`](../type-aliases/PackageJson.md)\<`Schema`, `BaseSchema`\> | - | [packages/build-config/src/npm/index.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/index.ts#L12) |
| `schemas` | \{ `basePackage`: `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\>; `schemaRequiredScripts`: `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}\>; `standardPackage`: `basePackage`; \} | - | [packages/build-config/src/npm/index.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/index.ts#L13) |
| `schemas.basePackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> | - | [packages/build-config/src/npm/schema.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/schema.ts#L36) |
| `schemas.schemaRequiredScripts` | `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}\> | - | [packages/build-config/src/npm/schema.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/schema.ts#L37) |
| `schemas.standardPackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> | basePackage | [packages/build-config/src/npm/schema.ts:38](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/schema.ts#L38) |

## Defined in

[packages/build-config/src/npm/index.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/index.ts#L9)
