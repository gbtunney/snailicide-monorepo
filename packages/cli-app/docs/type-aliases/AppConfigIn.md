[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / AppConfigIn

# Type Alias: AppConfigIn\<Schema\>

```ts
type AppConfigIn<Schema>: z.input<z.ZodType<AppConfig, z.ZodTypeDef, Merge<z.input<AppConfigSchema>, {
  flag_aliases: AppFlagAliases<Schema>;
  hidden: AppHidden<Schema>;
}>>>;
```

## Type Parameters

| Type Parameter                                                            |
| ------------------------------------------------------------------------- |
| `Schema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`z.AnyZodObject`\> |

## Defined in

[packages/cli-app/src/app-config.ts:30](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L30)
