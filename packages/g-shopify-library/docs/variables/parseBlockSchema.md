[**@snailicide/g-shopify-library v0.3.6**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / parseBlockSchema

# Variable: parseBlockSchema()

```ts
const parseBlockSchema: (data) =>
  | undefined
  | {
  limit?: number;
  name?: string;
  settings: (
     | {
     content: string;
     type: "header";
   }
     | {
     content: string;
     type: "paragraph";
   }
    | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
  type: string;
};
```

Defined in:
[packages/g-shopify-library/src/sections/index.ts:78](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L78)

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

| `undefined` | { `limit?`: `number`; `name?`: `string`; `settings`: ( | {
`content`: `string`; `type`: `"header"`; } | { `content`: `string`; `type`:
`"paragraph"`; } | ({ default: boolean; type: "checkbox"; } | { default: number;
type: "number"; placeholder?: string | undefined; } | { default: string |
number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20
more ... | { ...; }) & { ...; })\[]; `type`: `string`; }
