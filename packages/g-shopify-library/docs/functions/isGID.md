[**@snailicide/g-shopify-library v0.3.6**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / isGID

# Function: isGID()

```ts
function isGID<Type>(value): value is Type
```

Defined in:
[packages/g-shopify-library/src/scripts/index.ts:39](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L39)

Determines if the provided string is a valid GID.

isGID

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

## Parameters

| Parameter | Type   | Description             |
| --------- | ------ | ----------------------- |
| `value`   | `Type` | The string to validate. |

## Returns

`value is Type`

True if the string is a valid GID, false otherwise.
