[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / npm

# npm

Collection of Generic Package Utility Schemas and Typeguards

## References

### BasePackage

Re-exports [BasePackage](index.md#basepackage)

### PackageJson

Re-exports [PackageJson](index.md#packagejsonschema-baseschema)

### PackageJsonInput

Re-exports [PackageJsonInput](index.md#packagejsoninputschema-baseschema)

### default

Renames and re-exports [npm](npm.md#npm)

## Variables

### npm

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

#### Type declaration

| Name | Type | Default value | Defined in |
| --- | --- | --- | --- |
| `isNPMPackage` | \<`Schema`, `BaseSchema`\>(`value`, `custom_schema`, `show_error`, `passthru`) => value is undefined \| PackageJson\<Schema, BaseSchema\> | - | [packages/build-config/src/npm/index.ts:14](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L14) |
| `packageStandardSchema` | (`base_schema`) => `AnyZodObject` | - | [packages/build-config/src/npm/index.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L15) |
| `parseNPMPackage` | \<`Schema`, `BaseSchema`\>(`value`, `custom_schema`, `show_error`, `passThrough`) => `undefined` \| [`PackageJson`](index.md#packagejsonschema-baseschema)\<`Schema`, `BaseSchema`\> | - | [packages/build-config/src/npm/index.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L16) |
| `schemas` | \{ `basePackage`: `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\>; `schemaRequiredScripts`: `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}\>; `standardPackage`: `basePackage`; \} | - | [packages/build-config/src/npm/index.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L17) |
| `schemas.basePackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> | - | [packages/build-config/src/npm/schema.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L36) |
| `schemas.schemaRequiredScripts` | `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}, \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; \}; \}\> | - | [packages/build-config/src/npm/schema.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L37) |
| `schemas.standardPackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> | basePackage | [packages/build-config/src/npm/schema.ts:38](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L38) |

#### Defined in

[packages/build-config/src/npm/index.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L13)

## Functions

### isNPMPackage()

```ts
function isNPMPackage<Schema, BaseSchema>(
    value,
    custom_schema,
    show_error,
    passthru,
): value is undefined | PackageJson<Schema, BaseSchema>
```

#### Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `Schema` _extends_ `AnyZodObject` | - |
| `BaseSchema` _extends_ `AnyZodObject` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> |

#### Parameters

| Parameter       | Type                    | Default value |
| --------------- | ----------------------- | ------------- |
| `value`         | `unknown`               | `undefined`   |
| `custom_schema` | `undefined` \| `Schema` | `undefined`   |
| `show_error`    | `boolean` \| `"safe"`   | `false`       |
| `passthru`      | `boolean`               | `true`        |

#### Returns

value is undefined \| PackageJson\<Schema, BaseSchema\>

#### Defined in

[packages/build-config/src/npm/npm.package.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L47)

---

### packageStandardSchema()

```ts
function packageStandardSchema(base_schema): AnyZodObject
```

#### Parameters

| Parameter     | Type           | Default value |
| ------------- | -------------- | ------------- |
| `base_schema` | `AnyZodObject` | `basePackage` |

#### Returns

`AnyZodObject`

#### Defined in

[packages/build-config/src/npm/npm.package.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L10)

---

### parseNPMPackage()

```ts
function parseNPMPackage<Schema, BaseSchema>(
    value,
    custom_schema,
    show_error,
    passThrough,
): undefined | PackageJson<Schema, BaseSchema>
```

#### Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `Schema` _extends_ `AnyZodObject` | - |
| `BaseSchema` _extends_ `AnyZodObject` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> |

#### Parameters

| Parameter       | Type                    | Default value |
| --------------- | ----------------------- | ------------- |
| `value`         | `unknown`               | `undefined`   |
| `custom_schema` | `undefined` \| `Schema` | `undefined`   |
| `show_error`    | `boolean` \| `"safe"`   | `'safe'`      |
| `passThrough`   | `boolean`               | `true`        |

#### Returns

`undefined` \| [`PackageJson`](index.md#packagejsonschema-baseschema)\<`Schema`, `BaseSchema`\>

#### Defined in

[packages/build-config/src/npm/npm.package.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L25)
