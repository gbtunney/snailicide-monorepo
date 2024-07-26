[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [npm](../README.md) / isNPMPackage

# Function: isNPMPackage()

```ts
function isNPMPackage<Schema, BaseSchema>(
    value,
    custom_schema,
    show_error,
    passthru,
): value is undefined | PackageJson<Schema, BaseSchema>
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
| `show_error`    | `boolean` \| `"safe"`   | `false`       |
| `passthru`      | `boolean`               | `true`        |

## Returns

value is undefined \| PackageJson\<Schema, BaseSchema\>

## Defined in

[packages/build-config/src/npm/npm.package.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/npm.package.ts#L47)
