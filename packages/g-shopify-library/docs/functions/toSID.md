[**@snailicide/g-shopify-library v0.3.7**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / toSID

# Function: toSID()

```ts
function toSID<Type>(value, min_digits?): undefined | number
```

Defined in:
[packages/g-shopify-library/src/scripts/index.ts:80](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L80)

Converts a GID to a Shopify ID (SID) if possible, considering a minimum number
of digits.

toSID

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

## Parameters

| Parameter     | Type     | Default value | Description                                                       |
| ------------- | -------- | ------------- | ----------------------------------------------------------------- |
| `value`       | `Type`   | `undefined`   | The GID to convert.                                               |
| `min_digits?` | `number` | `9`           | The minimum number of digits required for the SID. Default is `9` |

## Returns

`undefined` | `number`

The SID if conversion is possible, otherwise undefined.
