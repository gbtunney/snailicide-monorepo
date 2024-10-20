[**@snailicide/cli-app v0.4.0**](../README.md) • **Docs**

---

[@snailicide/cli-app v0.4.0](../README.md) / AppFlagAliases

# Type Alias: AppFlagAliases\<Schema>

```ts
type AppFlagAliases<Schema>: DefaultAliases & { [Key in keyof z.infer<Schema>]?: string };
```

This type is used to autocomplete the yargs aliases property. This creates
shorthand values for option flags.

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |

## Defined in

[packages/cli-app/src/app-config.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L16)
