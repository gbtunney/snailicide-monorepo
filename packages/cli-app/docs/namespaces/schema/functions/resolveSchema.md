[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [schema](../README.md) / resolveSchema

# Function: resolveSchema()

```ts
function resolveSchema<Schema>(
    schema,
    value,
    suppressError,
): undefined | TypeOf<Schema>
```

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

## Parameters

| Parameter       | Type      | Default value |
| --------------- | --------- | ------------- |
| `schema`        | `Schema`  | `undefined`   |
| `value`         | `unknown` | `undefined`   |
| `suppressError` | `boolean` | `true`        |

## Returns

`undefined` \| `TypeOf`\<`Schema`\>

## Defined in

[packages/cli-app/src/schema.ts:82](https://github.com/gbtunney/snailicide-monorepo/blob/branch/packages/cli-app/src/schema.ts#L82)
