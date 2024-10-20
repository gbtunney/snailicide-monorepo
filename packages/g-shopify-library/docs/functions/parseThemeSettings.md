[**@snailicide/g-shopify-library v0.3.5**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.5](../README.md) / parseThemeSettings

# Function: parseThemeSettings()

```ts
function parseThemeSettings(data):
  | undefined
  | [
      {
        name: 'theme_info'
        theme_author: string
        theme_documentation_url: string
        theme_name: string
        theme_support_url: string
        theme_version: string
      },
      ...Object[],
    ]
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

`undefined` | \[\{ `name`: `"theme_info"`; `theme_author`: `string`;
`theme_documentation_url`: `string`; `theme_name`: `string`;
`theme_support_url`: `string`; `theme_version`: `string`; }, `...Object[]`]

## Defined in

[packages/g-shopify-library/src/settings/theme.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L48)
