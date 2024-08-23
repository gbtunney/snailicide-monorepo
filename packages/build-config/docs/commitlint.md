[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / commitlint

# commitlint

## References

### default

Renames and re-exports [commitlint](commitlint.md#commitlint)

## Variables

### COMMIT_TYPES

```ts
const COMMIT_TYPES: string[]
```

#### Defined in

[packages/build-config/src/commitlint/index.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L8)

---

### commitlint

```ts
const commitlint: {
    commit_types: COMMIT_TYPES
    configuration: (scope_enum, type_enum) => UserConfig
}
```

#### Type declaration

| Name | Type | Default value | Defined in |
| --- | --- | --- | --- |
| `commit_types` | `string`[] | COMMIT_TYPES | [packages/build-config/src/commitlint/index.ts:151](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L151) |
| `configuration` | (`scope_enum`, `type_enum`) => `UserConfig` | - | [packages/build-config/src/commitlint/index.ts:152](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L152) |

#### Defined in

[packages/build-config/src/commitlint/index.ts:150](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/commitlint/index.ts#L150)
