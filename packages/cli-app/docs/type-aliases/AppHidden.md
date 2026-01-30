[**@snailicide/cli-app v0.4.3**](../README.md)

---

[@snailicide/cli-app](../README.md) / AppHidden

# Type Alias: AppHidden\<Schema>

```ts
type AppHidden<Schema> = keyof z.infer<Schema>[]
```

Defined in:
[packages/cli-app/src/app-config.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L22)

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |
