[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / toSID

# Function: toSID()

```ts
function toSID<Type>(value, min_digits?): undefined | number
```

Converts a GID to a Shopify ID (SID) if possible, considering a minimum number
of digits.

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

## Parameters

| Parameter     | Type     | Default value | Description                                                       |
| ------------- | -------- | ------------- | ----------------------------------------------------------------- |
| `value`       | `Type`   | `undefined`   | The GID to convert.                                               |
| `min_digits`? | `number` | `9`           | The minimum number of digits required for the SID. Default is `9` |

## Returns

`undefined` | `number`

The SID if conversion is possible, otherwise undefined.

## Function

toSID

## Defined in

[packages/g-shopify-library/src/scripts/index.ts:75](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L75)
