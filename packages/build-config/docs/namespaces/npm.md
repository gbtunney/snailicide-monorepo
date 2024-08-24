[**@snailicide/build-config v1.3.0**](../README.md) • **Docs**

---

[@snailicide/build-config v1.3.0](../README.md) / npm

# npm

Collection of Generic NPM Package Utility Schemas and Typeguards

## Contents

-   [See](#see)
-   [Functions](#functions)
    -   [packageStandardSchema()](#packagestandardschema)
    -   [parseNPMPackage()](#parsenpmpackage)
    -   [isNPMPackage()](#isnpmpackage)
-   [Type Aliases](#type-aliases)
    -   [BasePackage](#basepackage)
    -   [PackageJson\<Schema, BaseSchema>](#packagejsonschema-baseschema)
    -   [PackageJsonInput\<Schema, BaseSchema>](#packagejsoninputschema-baseschema)
-   [Variables](#variables)
    -   [npm](#npm-1)
    -   [schemas](#schemas)

## See

[NPM - Node Package Manager](https://www.npmjs.com/)

## Functions

### packageStandardSchema()

```ts
function packageStandardSchema(base_schema): AnyZodObject
```

Basic representation of NPM's package.json

#### Parameters

| Parameter     | Type           | Default value |
| ------------- | -------------- | ------------- |
| `base_schema` | `AnyZodObject` | `basePackage` |

#### Returns

`AnyZodObject`

#### Defined in

[packages/build-config/src/npm/npm.package.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L11)

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
| `BaseSchema` _extends_ `AnyZodObject` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> |

#### Parameters

| Parameter       | Type                    | Default value |
| --------------- | ----------------------- | ------------- |
| `value`         | `unknown`               | `undefined`   |
| `custom_schema` | `undefined` \| `Schema` | `undefined`   |
| `show_error`    | `boolean` \| `"safe"`   | `'safe'`      |
| `passThrough`   | `boolean`               | `true`        |

#### Returns

`undefined` | [`PackageJson`](npm.md#packagejsonschema-baseschema)\<`Schema`, `BaseSchema`>

#### Defined in

[packages/build-config/src/npm/npm.package.ts:26](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L26)

---

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
| `BaseSchema` _extends_ `AnyZodObject` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> |

#### Parameters

| Parameter       | Type                    | Default value |
| --------------- | ----------------------- | ------------- |
| `value`         | `unknown`               | `undefined`   |
| `custom_schema` | `undefined` \| `Schema` | `undefined`   |
| `show_error`    | `boolean` \| `"safe"`   | `false`       |
| `passthru`      | `boolean`               | `true`        |

#### Returns

value is undefined | PackageJson\<Schema, BaseSchema>

#### Defined in

[packages/build-config/src/npm/npm.package.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L48)

## Type Aliases

### BasePackage

```ts
type BasePackage: {
  author: {
     email: string;
     name: string;
    };
  description: string;
  license: string;
  main: string;
  name: string;
  repository: {
     type: string;
     url: string;
    };
  version: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `author` | \{ `email`: `string`; `name`: `string`; } | [packages/build-config/src/npm/schema.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L5) |
| `author.email` | `string` | [packages/build-config/src/npm/schema.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L6) |
| `author.name` | `string` | [packages/build-config/src/npm/schema.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L7) |
| `description` | `string` | [packages/build-config/src/npm/schema.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L9) |
| `license` | `string` | [packages/build-config/src/npm/schema.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L10) |
| `main` | `string` | [packages/build-config/src/npm/schema.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L11) |
| `name` | `string` | [packages/build-config/src/npm/schema.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L12) |
| `repository` | \{ `type`: `string`; `url`: `string`; } | [packages/build-config/src/npm/schema.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L15) |
| `repository.type` | `string` | [packages/build-config/src/npm/schema.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L16) |
| `repository.url` | `string` | [packages/build-config/src/npm/schema.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L17) |
| `version` | `string` | [packages/build-config/src/npm/schema.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L19) |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L16)

---

### PackageJson\<Schema, BaseSchema>

```ts
type PackageJson<Schema, BaseSchema>: PackageJson<Schema, BaseSchema>;
```

#### Type Parameters

| Type Parameter                          | Default type           |
| --------------------------------------- | ---------------------- |
| `Schema` _extends_ `z.AnyZodObject`     | _typeof_ `basePackage` |
| `BaseSchema` _extends_ `z.AnyZodObject` | _typeof_ `basePackage` |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L17)

---

### PackageJsonInput\<Schema, BaseSchema>

```ts
type PackageJsonInput<Schema, BaseSchema>: PackageJsonInput<Schema, BaseSchema>;
```

#### Type Parameters

| Type Parameter                          | Default type           |
| --------------------------------------- | ---------------------- |
| `Schema` _extends_ `z.AnyZodObject`     | _typeof_ `basePackage` |
| `BaseSchema` _extends_ `z.AnyZodObject` | _typeof_ `basePackage` |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L21)

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
| `isNPMPackage` | \<`Schema`, `BaseSchema`>(`value`, `custom_schema`, `show_error`, `passthru`) => value is undefined \| PackageJson\<Schema, BaseSchema> | - | [packages/build-config/src/npm/index.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L9) |
| `packageStandardSchema` | (`base_schema`) => `AnyZodObject` | - | [packages/build-config/src/npm/index.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L10) |
| `parseNPMPackage` | \<`Schema`, `BaseSchema`>(`value`, `custom_schema`, `show_error`, `passThrough`) => `undefined` \| [`PackageJson`](npm.md#packagejsonschema-baseschema)\<`Schema`, `BaseSchema`> | - | [packages/build-config/src/npm/index.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L11) |
| `schemas` | \{ `basePackage`: `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }>; `schemaRequiredScripts`: `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }>; }, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }>; `standardPackage`: `basePackage`; } | - | [packages/build-config/src/npm/index.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L12) |
| `schemas.basePackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> | - | [packages/build-config/src/npm/schema.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L36) |
| `schemas.schemaRequiredScripts` | `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }>; }, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }> | - | [packages/build-config/src/npm/schema.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L37) |
| `schemas.standardPackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> | basePackage | [packages/build-config/src/npm/schema.ts:38](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L38) |

#### Defined in

[packages/build-config/src/npm/index.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/index.ts#L8)

---

### schemas

```ts
const schemas: {
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
```

#### Type declaration

| Name | Type | Default value | Defined in |
| --- | --- | --- | --- |
| `basePackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> | - | [packages/build-config/src/npm/schema.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L36) |
| `schemaRequiredScripts` | `ZodObject`\<\{ `scripts`: `ZodObject`\<\{ `build`: `ZodString`; `dev`: `ZodString`; `test`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }, \{ `build`: `string`; `dev`: `string`; `test`: `string`; }>; }, `"strip"`, `ZodTypeAny`, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }, \{ `scripts`: \{ `build`: `string`; `dev`: `string`; `test`: `string`; }; }> | - | [packages/build-config/src/npm/schema.ts:37](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L37) |
| `standardPackage` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; }, \{ `email`: `string`; `name`: `string`; }>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; }, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; }, \{ `type`: `string`; `url`: `string`; }>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`>; }, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }, \{ `author`: \{ `email`: `string`; `name`: `string`; }; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; }; `version`: `string`; }> | basePackage | [packages/build-config/src/npm/schema.ts:38](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L38) |

#### Defined in

[packages/build-config/src/npm/schema.ts:35](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L35)
