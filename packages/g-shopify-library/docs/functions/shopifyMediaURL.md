[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / shopifyMediaURL

# Function: shopifyMediaURL()

```ts
function shopifyMediaURL(
  src?,
  width?,
  height?,
  crop?,
  scale?,
): undefined | string
```

Generates a Shopify media URL with optional parameters for resizing and
cropping.

## Parameters

| Parameter | Type                                                            | Default value | Description                                             |
| --------- | --------------------------------------------------------------- | ------------- | ------------------------------------------------------- |
| `src`?    | `string`                                                        | `undefined`   | The source URL of the media. Default is `undefined`     |
| `width`?  | `string` \| `number`                                            | `undefined`   | The desired width of the media. Default is `undefined`  |
| `height`? | `string` \| `number`                                            | `undefined`   | The desired height of the media. Default is `undefined` |
| `crop`?   | \| `"top"` \| `"center"` \| `"bottom"` \| `"left"` \| `"right"` | `undefined`   | The crop position. Default is `undefined`               |
| `scale`?  | `boolean`                                                       | `false`       | Whether to scale the image. Default is `false`          |

## Returns

`undefined` | `string`

The modified media URL or undefined if the source URL is invalid.

## Function

shopifyMediaURL

## Defined in

[packages/g-shopify-library/src/scripts/index.ts:126](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L126)