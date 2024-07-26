[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [npm](../README.md) / PackageJsonInput

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

[packages/build-config/src/npm/npm.package.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/npm/npm.package.ts#L20)
