[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / Setting

# Type Alias: Setting\<Type, id>

```ts
type Setting<Type, id>: Type extends "paragraph" | "header" ? z.infer<typeof SettingSchemaMap[Type]> : Merge<z.infer<typeof SettingSchemaMap[Type]>, id extends string ? Merge<z.infer<typeof baseSchema>, {
  id: id;
}> : z.infer<typeof baseSchema>>;
```

## Type Parameters

| Type Parameter                                     | Default type                      |
| -------------------------------------------------- | --------------------------------- |
| `Type` _extends_ keyof _typeof_ `SettingSchemaMap` | keyof _typeof_ `SettingSchemaMap` |
| `id` _extends_ `string`                            | `string`                          |

## Defined in

[packages/g-shopify-library/src/settings/index.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L22)
