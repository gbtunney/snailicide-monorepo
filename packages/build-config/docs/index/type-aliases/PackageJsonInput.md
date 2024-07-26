[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [index](../README.md) / PackageJsonInput

# Type Alias: PackageJsonInput\<Schema, BaseSchema\>

```ts
type PackageJsonInput<Schema, BaseSchema>: z.input<Merge<BaseSchema, Schema>>;
```

## Type Parameters

| Type Parameter                          | Default type           |
| --------------------------------------- | ---------------------- |
| `Schema` _extends_ `z.AnyZodObject`     | _typeof_ `basePackage` |
| `BaseSchema` _extends_ `z.AnyZodObject` | _typeof_ `basePackage` |

## Defined in

[packages/build-config/src/npm/npm.package.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/npm/npm.package.ts#L20)
