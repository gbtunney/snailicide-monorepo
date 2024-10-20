[**@snailicide/cli-app v0.3.0**](../README.md) • **Docs**

---

[@snailicide/cli-app v0.3.0](../README.md) / WrappedSchema

# Type Alias: WrappedSchema\<Schema>

```ts
type WrappedSchema<Schema>: Schema extends ZodObjectSchema ? Schema : never;
```

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `Schema` _extends_ [`ZodObjectSchema`](ZodObjectSchema.md) |

## Defined in

[packages/cli-app/src/helpers.ts:4](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/helpers.ts#L4)
