[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / parseSetting

# Function: parseSetting()

```ts
function parseSetting(data, id): undefined | {
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
} | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; }
```

## Parameters

| Parameter | Type                    | Default value |
| --------- | ----------------------- | ------------- |
| `data`    | `unknown`               | `undefined`   |
| `id`      | `undefined` \| `string` | `undefined`   |

## Returns

`undefined` | \{ `content`: `string`; `type`: `"header"`; } | \{ `content`:
`string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } |
\{ default: number; type: "number"; placeholder?: string | undefined; } | \{
default: string | number; options: \{ value: string; label: string; }\[]; type:
"radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; }

## Defined in

[packages/g-shopify-library/src/settings/index.ts:146](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L146)