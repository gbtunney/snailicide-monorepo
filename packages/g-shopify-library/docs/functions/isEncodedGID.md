[**@snailicide/g-shopify-library v0.3.7**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / isEncodedGID

# Function: isEncodedGID()

```ts
function isEncodedGID<Type>(value): value is Type
```

Defined in:
[packages/g-shopify-library/src/scripts/index.ts:23](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L23)

Checks if the provided string is an encoded GID.

isEncodedGID

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

## Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| `value`   | `Type` | The string to check. |

## Returns

`value is Type`

True if the string is an encoded GID, false otherwise.
