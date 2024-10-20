[**@snailicide/g-shopify-library v0.3.5**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.5](../README.md) / parseThemeSettingSection

# Function: parseThemeSettingSection()

```ts
function parseThemeSettingSection(data): undefined | {
  name: string;
  settings: ({
     content: string;
     type: "header";
    } | {
     content: string;
     type: "paragraph";
    } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

`undefined` | \{ `name`: `string`; `settings`: (\{ `content`: `string`; `type`:
`"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default:
boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?:
string | undefined; } | \{ default: string | number; options: \{ value: string;
label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...;
})\[]; }

## Defined in

[packages/g-shopify-library/src/settings/theme.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L51)
