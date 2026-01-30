[**@snailicide/g-shopify-library v0.3.7**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / parseThemeSettings

# Variable: parseThemeSettings()

```ts
const parseThemeSettings: (data) =>
  | [{
  name: "theme_info";
  theme_author: string;
  theme_documentation_url?: string;
  theme_name: string;
  theme_support_url?: string;
  theme_version: string;
}, ...{ name: string; settings: ({ content: string; type: "header" } | { content: string; type: "paragraph" } | (({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; }))[] }[]]
  | undefined;
```

Defined in:
[packages/g-shopify-library/src/settings/theme.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L48)

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

| \[{ `name`: `"theme_info"`; `theme_author`: `string`;
`theme_documentation_url?`: `string`; `theme_name`: `string`;
`theme_support_url?`: `string`; `theme_version`: `string`; }, ...{ name: string;
settings: ({ content: string; type: "header" } | { content: string; type:
"paragraph" } | (({ default: boolean; type: "checkbox"; } | { default: number;
type: "number"; placeholder?: string | undefined; } | { default: string |
number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20
more ... | { ...; }) & { ...; }))\[] }\[]] | `undefined`
