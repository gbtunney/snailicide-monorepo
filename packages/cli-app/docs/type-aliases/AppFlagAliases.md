[**@snailicide/cli-app v0.4.3**](../README.md)

---

[@snailicide/cli-app](../README.md) / AppFlagAliases

# Type Alias: AppFlagAliases\<Schema>

```ts
type AppFlagAliases<Schema> = DefaultAliases & {
  [Key in keyof z.infer<Schema>]?: string
}
```

Defined in:
[packages/cli-app/src/app-config.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L18)

This type is used to autocomplete the yargs aliases property. This creates
shorthand values for option flags.

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |
