[**@snailicide/g-shopify-library v0.3.8**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / isSID

# Function: isSID()

```ts
function isSID<Type>(value, min_digits?): value is Type
```

Defined in:
[packages/g-shopify-library/src/scripts/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L108)

Determines if the provided value is a valid Shopify ID (SID), considering a
minimum number of digits.

isSID

## Type Parameters

| Type Parameter            |
| ------------------------- | -------- |
| `Type` _extends_ `string` | `number` |

## Parameters

| Parameter     | Type     | Default value | Description                                                       |
| ------------- | -------- | ------------- | ----------------------------------------------------------------- |
| `value`       | `Type`   | `undefined`   | The value to validate.                                            |
| `min_digits?` | `number` | `9`           | The minimum number of digits required for the SID. Default is `9` |

## Returns

`value is Type`

True if the value is a valid SID, false otherwise.
