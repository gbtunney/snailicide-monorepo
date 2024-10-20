[**@snailicide/g-shopify-library v0.3.5**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.5](../README.md) / SettingsMapped

# Type Alias: SettingsMapped\<T>

```ts
type SettingsMapped<T>: { [Key in keyof T]: Key extends string ? Setting<T[Key]["type"], Key> : never }[keyof T][];
```

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `T` _extends_ `Record`\<`string`, [`Setting`](Setting.md)> |

## Defined in

[packages/g-shopify-library/src/settings/index.ts:34](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L34)
