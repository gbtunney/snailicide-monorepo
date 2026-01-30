[**@snailicide/g-shopify-library v0.3.8**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / toGID

# Function: toGID()

```ts
function toGID(value): string | undefined
```

Defined in:
[packages/g-shopify-library/src/scripts/index.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L12)

Converts a potentially encoded Global ID (GID) to its decoded form if it is a
valid GID, otherwise returns undefined.

toGID

## Parameters

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `value`   | `string` | The GID to decode. |

## Returns

`string` | `undefined`

The decoded GID if valid, otherwise undefined.
