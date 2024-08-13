[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / typedoc

# typedoc

Typedoc default configurations

## References

### MaterialThemeOptions

Re-exports [MaterialThemeOptions](index.md#materialthemeoptions)

### TypedocConfig

Re-exports [TypedocConfig](index.md#typedocconfig)

### TypedocMarkdownConfig

Re-exports [TypedocMarkdownConfig](index.md#typedocmarkdownconfig)

### default

Renames and re-exports [typedoc](typedoc.md#typedoc-1)

## Type Aliases

### Typedoc

```ts
type Typedoc: {
  config: (__dirname) => TypedocConfig | undefined;
  configMarkdown: (__dirname) => TypedocMarkdownConfig | undefined;
  materialTheme: (__dirname) => TypedocConfig & MaterialThemeOptions | undefined;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `config` | (`__dirname`) => [`TypedocConfig`](index.md#typedocconfig) \| `undefined` | [packages/build-config/src/typedoc/index.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L16) |
| `configMarkdown` | (`__dirname`) => [`TypedocMarkdownConfig`](index.md#typedocmarkdownconfig) \| `undefined` | [packages/build-config/src/typedoc/index.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L17) |
| `materialTheme` | (`__dirname`) => [`TypedocConfig`](index.md#typedocconfig) & [`MaterialThemeOptions`](index.md#materialthemeoptions) \| `undefined` | [packages/build-config/src/typedoc/index.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L18) |

#### Defined in

[packages/build-config/src/typedoc/index.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L15)

## Variables

### typedoc

```ts
const typedoc: Typedoc
```

#### Defined in

[packages/build-config/src/typedoc/index.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/index.ts#L22)
