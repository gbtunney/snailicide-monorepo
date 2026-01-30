[**@snailicide/g-shopify-library v0.3.8**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / parseThemeSettingSection

# Variable: parseThemeSettingSection()

```ts
const parseThemeSettingSection: (data) =>
  | {
  name: string;
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
}
  | undefined;
```

Defined in:
[packages/g-shopify-library/src/settings/theme.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L51)

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

| { `name`: `string`; `settings`: ( | { `content`: `string`; `type`: `"header"`;
} | { `content`: `string`; `type`: `"paragraph"`; } | ({ default: boolean; type:
"checkbox"; } | { default: number; type: "number"; placeholder?: string |
undefined; } | { default: string | number; options: { value: string; label:
string; }\[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })\[]; } |
`undefined`
