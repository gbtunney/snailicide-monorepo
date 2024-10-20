[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / isParsableToSID

# Function: isParsableToSID()

```ts
function isParsableToSID<Type>(value, min_digits?): value is Type
```

Checks if the provided value can be parsed into a Shopify ID (SID) with a
minimum number of digits.

## Type Parameters

| Type Parameter                        |
| ------------------------------------- |
| `Type` _extends_ `string` \| `number` |

## Parameters

| Parameter     | Type     | Default value | Description                                                       |
| ------------- | -------- | ------------- | ----------------------------------------------------------------- |
| `value`       | `Type`   | `undefined`   | The value to check.                                               |
| `min_digits`? | `number` | `9`           | The minimum number of digits required for the SID. Default is `9` |

## Returns

`value is Type`

True if the value can be parsed into a SID, false otherwise.

## Function

isParsableToSID

## Defined in

[packages/g-shopify-library/src/scripts/index.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L54)
