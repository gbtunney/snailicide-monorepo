[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [npm](../README.md) / parseNPMPackage

# Function: parseNPMPackage()

```ts
function parseNPMPackage<Schema, BaseSchema>(
    value,
    custom_schema,
    show_error,
    passThrough,
): undefined | PackageJson<Schema, BaseSchema>
```

## Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `Schema` _extends_ `AnyZodObject` | - |
| `BaseSchema` _extends_ `AnyZodObject` | `ZodObject`\<\{ `author`: `ZodObject`\<\{ `email`: `ZodString`; `name`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `email`: `string`; `name`: `string`; \}, \{ `email`: `string`; `name`: `string`; \}\>; `description`: `ZodString`; `license`: `ZodString`; `main`: `ZodString`; `name`: `ZodString`; `repository`: `ZodObject`\<\{ `type`: `ZodString`; `url`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `type`: `string`; `url`: `string`; \}, \{ `type`: `string`; `url`: `string`; \}\>; `version`: `ZodEffects`\<`ZodString`, `string`, `string`\>; \}, `"strip"`, `ZodTypeAny`, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}, \{ `author`: \{ `email`: `string`; `name`: `string`; \}; `description`: `string`; `license`: `string`; `main`: `string`; `name`: `string`; `repository`: \{ `type`: `string`; `url`: `string`; \}; `version`: `string`; \}\> |

## Parameters

| Parameter       | Type                    | Default value |
| --------------- | ----------------------- | ------------- |
| `value`         | `unknown`               | `undefined`   |
| `custom_schema` | `undefined` \| `Schema` | `undefined`   |
| `show_error`    | `boolean` \| `"safe"`   | `'safe'`      |
| `passThrough`   | `boolean`               | `true`        |

## Returns

`undefined` \| [`PackageJson`](../../index/type-aliases/PackageJson.md)\<`Schema`, `BaseSchema`\>

## Defined in

[packages/build-config/src/npm/npm.package.ts:25](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L25)
