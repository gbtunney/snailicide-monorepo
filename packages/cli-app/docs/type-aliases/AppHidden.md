[**@snailicide/cli-app**](../README.md) • **Docs**

---

[@snailicide/cli-app](../README.md) / AppHidden

# Type Alias: AppHidden\<Schema\>

```ts
type AppHidden<Schema>: keyof z.infer<Schema>[];
```

## Type Parameters

| Type Parameter                                                            |
| ------------------------------------------------------------------------- |
| `Schema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`z.AnyZodObject`\> |

## Defined in

[packages/cli-app/src/app-config.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L24)
