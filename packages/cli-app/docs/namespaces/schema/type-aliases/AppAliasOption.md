[**@snailicide/cli-app**](../../../README.md) • **Docs**

---

[@snailicide/cli-app](../../../README.md) / [schema](../README.md) / AppAliasOption

# Type Alias: AppAliasOption\<Schema\>

```ts
type AppAliasOption<Schema>: {
  help: string;
  version: string;
 } & { [Key in keyof z.infer<Schema>]?: string };
```

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `help` | `string` | [packages/cli-app/src/schema.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/schema.ts#L10) |
| `version` | `string` | [packages/cli-app/src/schema.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/schema.ts#L11) |

## Type Parameters

| Type Parameter                                                 |
| -------------------------------------------------------------- |
| `Schema` _extends_ `z.AnyZodObject` \| `z.ZodEffects`\<`any`\> |

## Defined in

[packages/cli-app/src/schema.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/schema.ts#L8)
