[**@snailicide/vite-plugin-shopify-theme-schema v0.2.5**](../README.md)

---

[@snailicide/vite-plugin-shopify-theme-schema](../README.md) / resolveOptions

# Type Alias: resolveOptions()

```ts
type resolveOptions = (options) =>
  | undefined
  | {
      entryPoints: Record<string, string>
      sourceCodeDir: string
      themeRoot: string
    }
```

Defined in:
[packages/vite-plugin-shopify-theme-schema/src/options.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/vite-plugin-shopify-theme-schema/src/options.ts#L17)

## Parameters

| Parameter                | Type                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `options`                | { `entryPoints?`: `Record`<`string`, `string`>; `sourceCodeDir?`: `string`; `themeRoot?`: `string`; } |
| `options.entryPoints?`   | `Record`<`string`, `string`>                                                                          |
| `options.sourceCodeDir?` | `string`                                                                                              |
| `options.themeRoot?`     | `string`                                                                                              |

## Returns

| `undefined` | { `entryPoints`: `Record`<`string`, `string`>; `sourceCodeDir`:
`string`; `themeRoot`: `string`; }
