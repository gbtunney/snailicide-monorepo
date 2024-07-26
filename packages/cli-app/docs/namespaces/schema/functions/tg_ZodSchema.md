[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [schema](../README.md) / tg_ZodSchema

# Function: tg_ZodSchema()

```ts
function tg_ZodSchema<Schema>(schema, value): value is TypeOf<Schema>
```

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `schema`  | `Schema`  |
| `value`   | `unknown` |

## Returns

`value is TypeOf<Schema>`

## Defined in

[packages/cli-app/src/schema.ts:75](https://github.com/gbtunney/snailicide-monorepo/blob/2f8292b3376742ccb9ee5c3746eee5023a1d41bb/packages/cli-app/src/schema.ts#L75)
