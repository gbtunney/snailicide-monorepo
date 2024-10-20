[**@snailicide/vite-plugin-shopify-theme-schema v0.2.4**](../README.md) •
**Docs**

---

[@snailicide/vite-plugin-shopify-theme-schema v0.2.4](../README.md) /
resolveOptions

# Function: resolveOptions()

```ts
function resolveOptions(options):
  | undefined
  | {
      entryPoints: Record<string, string>
      sourceCodeDir: string
      themeRoot: string
    }
```

## Parameters

| Parameter                | Type                          |
| ------------------------ | ----------------------------- |
| `options`                | `object`                      |
| `options.entryPoints`?   | `Record`\<`string`, `string`> |
| `options.sourceCodeDir`? | `string`                      |
| `options.themeRoot`?     | `string`                      |

## Returns

`undefined` | \{ `entryPoints`: `Record`\<`string`, `string`>; `sourceCodeDir`:
`string`; `themeRoot`: `string`; }

## Defined in

[packages/vite-plugin-shopify-theme-schema/src/options.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-theme-schema/src/options.ts#L17)
