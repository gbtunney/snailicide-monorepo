[**@snailicide/g-shopify-library v0.3.5**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / parseSettingsGroup

# Function: parseSettingsGroup()

```ts
function parseSettingsGroup(
   data,
   id_prefix,
   id_suffix):
  | undefined
  | (
  | {
  content: string;
  type: "header";
}
  | {
  content: string;
  type: "paragraph";
}
  | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
```

Defined in:
[packages/g-shopify-library/src/settings/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L109)

## Parameters

| Parameter   | Type        | Default value |
| ----------- | ----------- | ------------- | ----------- |
| `data`      | `unknown`   | `undefined`   |
| `id_prefix` | `undefined` | `string`      | `undefined` |
| `id_suffix` | `undefined` | `string`      | `undefined` |

## Returns

| `undefined` | ( | { `content`: `string`; `type`: `"header"`; } | { `content`:
`string`; `type`: `"paragraph"`; } | ({ default: boolean; type: "checkbox"; } |
{ default: number; type: "number"; placeholder?: string | undefined; } | {
default: string | number; options: { value: string; label: string; }\[]; type:
"radio"; } | ... 20 more ... | { ...; }) & { ...; })\[]
