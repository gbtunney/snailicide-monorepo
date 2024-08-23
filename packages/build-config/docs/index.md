[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / index

# index

## References

### EntryConfig

Re-exports [EntryConfig](rollup.md#entryconfig)

### EsLint

Re-exports [EsLint](eslint.md#eslint)

### EslintConfig

Re-exports [EslintConfig](eslint.md#eslintconfig)

### ExportType

Re-exports [ExportType](rollup.md#exporttype)

### Prettier

Re-exports [Prettier](prettier.md#prettier)

### PrettierConfig

Re-exports [PrettierConfig](prettier.md#prettierconfig)

### PrettierOptions

Re-exports [PrettierOptions](prettier.md#prettieroptions)

### commitlint

Re-exports [commitlint](commitlint.md#commitlint)

### npm

Re-exports [npm](npm.md#npm)

### rollup

Re-exports [rollup](rollup.md#rollup)

### typedoc

Re-exports [typedoc](typedoc.md#typedoc-1)

### vite

Re-exports [vite](vite.md#vite)

### vitest

Re-exports [vitest](vitest.md#vitest)

## Type Aliases

### BasePackage

```ts
type BasePackage: {
  author: {
     email: string;
     name: string;
    };
  description: string;
  license: string;
  main: string;
  name: string;
  repository: {
     type: string;
     url: string;
    };
  version: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `author` | \{ `email`: `string`; `name`: `string`; \} | [packages/build-config/src/npm/schema.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L5) |
| `author.email` | `string` | [packages/build-config/src/npm/schema.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L6) |
| `author.name` | `string` | [packages/build-config/src/npm/schema.ts:7](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L7) |
| `description` | `string` | [packages/build-config/src/npm/schema.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L9) |
| `license` | `string` | [packages/build-config/src/npm/schema.ts:10](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L10) |
| `main` | `string` | [packages/build-config/src/npm/schema.ts:11](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L11) |
| `name` | `string` | [packages/build-config/src/npm/schema.ts:12](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L12) |
| `repository` | \{ `type`: `string`; `url`: `string`; \} | [packages/build-config/src/npm/schema.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L15) |
| `repository.type` | `string` | [packages/build-config/src/npm/schema.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L16) |
| `repository.url` | `string` | [packages/build-config/src/npm/schema.ts:17](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L17) |
| `version` | `string` | [packages/build-config/src/npm/schema.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/schema.ts#L19) |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:15](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L15)

---

### ConfigOptions\<Key\>

```ts
type ConfigOptions<Key>: Parameters<ConfigPlugin<Key>>[0];
```

#### Type Parameters

| Type Parameter                                    |
| ------------------------------------------------- |
| `Key` _extends_ [`PluginKey`](index.md#pluginkey) |

#### Defined in

[packages/build-config/src/rollup/plugins.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L47)

---

### MaterialThemeOptions

```ts
type MaterialThemeOptions: {
  themeColor: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `themeColor` | `string` | [packages/build-config/src/typedoc/standard.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L6) |

#### Defined in

[packages/build-config/src/typedoc/standard.ts:5](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L5)

---

### PackageJson\<Schema, BaseSchema\>

```ts
type PackageJson<Schema, BaseSchema>: PackageJson<Schema, BaseSchema>;
```

#### Type Parameters

| Type Parameter                          | Default type           |
| --------------------------------------- | ---------------------- |
| `Schema` _extends_ `z.AnyZodObject`     | _typeof_ `basePackage` |
| `BaseSchema` _extends_ `z.AnyZodObject` | _typeof_ `basePackage` |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L16)

---

### PackageJsonInput\<Schema, BaseSchema\>

```ts
type PackageJsonInput<Schema, BaseSchema>: PackageJsonInput<Schema, BaseSchema>;
```

#### Type Parameters

| Type Parameter                          | Default type           |
| --------------------------------------- | ---------------------- |
| `Schema` _extends_ `z.AnyZodObject`     | _typeof_ `basePackage` |
| `BaseSchema` _extends_ `z.AnyZodObject` | _typeof_ `basePackage` |

#### Defined in

[packages/build-config/src/npm/npm.package.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/npm/npm.package.ts#L20)

---

### PluginKey

```ts
type PluginKey: keyof typeof PLUGINS_CONFIG;
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L45)

---

### TypedocConfig

```ts
type TypedocConfig: Partial<TypeDocOptions>;
```

#### Defined in

[packages/build-config/src/typedoc/standard.ts:8](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/standard.ts#L8)

---

### TypedocMarkdownConfig

```ts
type TypedocMarkdownConfig: Partial<TypeDocOptions> & Partial<PluginOptions>;
```

#### Defined in

[packages/build-config/src/typedoc/markdown.ts:6](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/typedoc/markdown.ts#L6)

## Functions

### exportJSON()

```ts
function exportJSON(config, outdir): boolean
```

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `config` | `JSONExportConfig`\<`JsonObject` \| `JsonArray`\> \| readonly `ReadonlyObjectDeep`\<`JSONExportEntry`\<`JsonObject` \| `JsonArray`\>\>[] | `undefined` |
| `outdir` | `undefined` \| `string` | `undefined` |

#### Returns

`boolean`

#### Defined in

[packages/build-config/src/utilities.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L22)

---

### isPlainObject()

```ts
function isPlainObject<Type>(value): value is Type
```

#### Type Parameters

| Type Parameter                   |
| -------------------------------- |
| `Type` _extends_ `UnknownRecord` |

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

#### Returns

`value is Type`

#### Defined in

[packages/build-config/src/utilities.ts:71](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L71)

---

### safeDeserializeJSON()

```ts
function safeDeserializeJSON<Type>(data): undefined | JSONCompatible<Type>
```

#### Type Parameters

| Type Parameter |
| -------------- |
| `Type`         |

#### Parameters

| Parameter | Type                       |
| --------- | -------------------------- |
| `data`    | `JSONCompatible`\<`Type`\> |

#### Returns

`undefined` \| `JSONCompatible`\<`Type`\>

#### Defined in

[packages/build-config/src/utilities.ts:77](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/utilities.ts#L77)
