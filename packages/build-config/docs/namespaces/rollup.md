[**@snailicide/build-config v1.3.0**](../README.md) • **Docs**

---

[@snailicide/build-config v1.3.0](../README.md) / rollup

# rollup

Rollup Configuration, Plugins, and helper functions

## Contents

-   [See](#see)
-   [Functions](#functions)
    -   [getBanner()](#getbanner)
    -   [getOutputObj()](#getoutputobj)
    -   [getConfigEntries()](#getconfigentries)
    -   [getRollupConfig()](#getrollupconfig)
    -   [getPackageExports()](#getpackageexports)
    -   [getPluginsConfiguration()](#getpluginsconfiguration)
-   [Type Aliases](#type-aliases)
    -   [ExportType](#exporttype)
    -   [KeyData](#keydata)
    -   [EntryConfig](#entryconfig)
    -   [OutputObjReturnType](#outputobjreturntype)
    -   [ExpandedExportType](#expandedexporttype)
    -   [RollupPluginKey](#rolluppluginkey)
    -   [RollupPluginConfigOptions\<Key>](#rolluppluginconfigoptionskey)
    -   [RollupPluginConfiguration](#rolluppluginconfiguration)
-   [Variables](#variables)
    -   [EXPORT_KEY_LOOKUP](#export_key_lookup)
    -   [DEFAULT_PLUGINS_BUNDLED](#default_plugins_bundled)
    -   [CDN_PLUGINS_BUNDLED](#cdn_plugins_bundled)

## See

[Rollup - The JavaScript module bundler](https://rollupjs.org/guide/en/)

## Functions

### getBanner()

```ts
function getBanner(library_name, package_json, show_error): undefined | string
```

Comment with library information to be appended in the generated bundles.

#### Parameters

| Parameter                      | Type                  | Default value |
| ------------------------------ | --------------------- | ------------- |
| `library_name`                 | `string`              | `undefined`   |
| `package_json`                 | `object`              | `undefined`   |
| `package_json.author`          | `object`              | `...`         |
| `package_json.author.email`    | `string`              | `...`         |
| `package_json.author.name`     | `string`              | `...`         |
| `package_json.description`     | `string`              | `...`         |
| `package_json.license`         | `string`              | `...`         |
| `package_json.main`            | `string`              | `...`         |
| `package_json.name`            | `string`              | `...`         |
| `package_json.repository`      | `object`              | `...`         |
| `package_json.repository.type` | `string`              | `...`         |
| `package_json.repository.url`  | `string`              | `...`         |
| `package_json.version`         | `string`              | `...`         |
| `show_error`                   | `boolean` \| `"safe"` | `true`        |

#### Returns

`undefined` | `string`

#### Defined in

[packages/build-config/src/rollup/index.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L22)

---

### getOutputObj()

```ts
function getOutputObj(entry): {
    exportObj: Record<string, Record<string, string>>
    config: RollupOptions
}
```

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `entry`   | [`EntryConfig`](rollup.md#entryconfig) |

#### Returns

```ts
{
    exportObj: Record<string, Record<string, string>>
    config: RollupOptions
}
```

| Name | Type | Defined in |
| --- | --- | --- |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`>> | [packages/build-config/src/rollup/index.ts:119](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L119) |
| `config` | `RollupOptions` | [packages/build-config/src/rollup/index.ts:120](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L120) |

#### Defined in

[packages/build-config/src/rollup/index.ts:115](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L115)

---

### getConfigEntries()

```ts
function getConfigEntries(
    directoryObj,
    entries,
    plugins,
    package_json,
): OutputObjReturnType &
    {
        plugins: InputPluginOption
    }[]
```

Returns an array of output configurations based on the provided entries.

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `directoryObj` | `Pick`\<[`EntryConfig`](rollup.md#entryconfig), `"source_dir"` \| `"output_dir"`> | `undefined` | An object containing the source and output directories. |
| `entries` | `Omit`\<[`EntryConfig`](rollup.md#entryconfig), `"source_dir"` \| `"output_dir"`>\[] | `undefined` | An array of entry configurations. |
| `plugins` | `InputPluginOption` | `[]` | Optional array of Rollup plugins. |
| `package_json` | `object` | `undefined` | The base package JSON object. |
| `package_json.author` | `object` | `...` | - |
| `package_json.author.email` | `string` | `...` | - |
| `package_json.author.name` | `string` | `...` | - |
| `package_json.description` | `string` | `...` | - |
| `package_json.license` | `string` | `...` | - |
| `package_json.main` | `string` | `...` | - |
| `package_json.name` | `string` | `...` | - |
| `package_json.repository` | `object` | `...` | - |
| `package_json.repository.type` | `string` | `...` | - |
| `package_json.repository.url` | `string` | `...` | - |
| `package_json.version` | `string` | `...` | - |

#### Returns

[`OutputObjReturnType`](rollup.md#outputobjreturntype) & \{ `plugins`: `InputPluginOption`; }\[]

An array of output configurations with plugins.

#### Defined in

[packages/build-config/src/rollup/index.ts:223](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L223)

---

### getRollupConfig()

```ts
function getRollupConfig(args): RollupOptions[]
```

#### Parameters

| Parameter | Type |
| --- | --- |
| `args` | [`OutputObjReturnType`](rollup.md#outputobjreturntype) & \{ `plugins`: `InputPluginOption`; }\[] |

#### Returns

`RollupOptions`\[]

#### Defined in

[packages/build-config/src/rollup/index.ts:258](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L258)

---

### getPackageExports()

```ts
function getPackageExports(args, doPrint): undefined | JsonValue
```

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `args` | [`OutputObjReturnType`](rollup.md#outputobjreturntype) & \{ `plugins`: `InputPluginOption`; }\[] | `undefined` |
| `doPrint` | `boolean` | `false` |

#### Returns

`undefined` | `JsonValue`

#### Defined in

[packages/build-config/src/rollup/index.ts:287](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L287)

---

### getPluginsConfiguration()

```ts
function getPluginsConfiguration<Type>(config, _default): Plugin<any>[]
```

#### Type Parameters

| Type Parameter |
| --- |
| `Type` _extends_ [`RollupPluginConfiguration`](rollup.md#rolluppluginconfiguration) |

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `config` | `undefined` \| `Type` | `undefined` |
| `_default` | [`RollupPluginConfiguration`](rollup.md#rolluppluginconfiguration) | `basePluginConfig` |

#### Returns

`Plugin`\<`any`>\[]

#### Defined in

[packages/build-config/src/rollup/plugins.ts:91](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L91)

## Type Aliases

### ExportType

```ts
type ExportType:
  | "types"
  | "require"
  | "import"
  | "default"
  | "browser_default"
  | "browser_types"
  | "browser_import"
  | "browser_umd";
```

#### Defined in

[packages/build-config/src/rollup/index.ts:42](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L42)

---

### KeyData

```ts
type KeyData: {
  extension: string;
  internal_format: InternalModuleFormat;
  module_format: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `extension` | `string` | [packages/build-config/src/rollup/index.ts:96](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L96) |
| `internal_format` | `InternalModuleFormat` | [packages/build-config/src/rollup/index.ts:97](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L97) |
| `module_format` | `string` | [packages/build-config/src/rollup/index.ts:98](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L98) |

#### Defined in

[packages/build-config/src/rollup/index.ts:95](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L95)

---

### EntryConfig

```ts
type EntryConfig: {
  export_key: LiteralUnion<"." | "*" | "main", string>;
  in_file_name_override: string;
  out_file_name_override: string;
  export_types: ExportType[];
  source_dir: string;
  output_dir: string;
  library_name: string;
  overrides: Partial<OutputOptions> & {
     minify: boolean;
    };
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `export_key` | `LiteralUnion`\<`"."` \| `"*"` \| `"main"`, `string`> | [packages/build-config/src/rollup/index.ts:102](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L102) |
| `in_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:103](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L103) |
| `out_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:104](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L104) |
| `export_types` | [`ExportType`](rollup.md#exporttype)\[] | [packages/build-config/src/rollup/index.ts:107](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L107) |
| `source_dir` | `string` | [packages/build-config/src/rollup/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L108) |
| `output_dir` | `string` | [packages/build-config/src/rollup/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L109) |
| `library_name` | `string` | [packages/build-config/src/rollup/index.ts:110](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L110) |
| `overrides` | `Partial`\<`OutputOptions`> & \{ `minify`: `boolean`; } | [packages/build-config/src/rollup/index.ts:112](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L112) |

#### Defined in

[packages/build-config/src/rollup/index.ts:101](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L101)

---

### OutputObjReturnType

```ts
type OutputObjReturnType: {
  exportObj: Record<string, Record<string, string>>;
  config: Omit<RollupOptions, "plugins">;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`>> | [packages/build-config/src/rollup/index.ts:277](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L277) |
| `config` | `Omit`\<`RollupOptions`, `"plugins"`> | [packages/build-config/src/rollup/index.ts:278](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L278) |

#### Defined in

[packages/build-config/src/rollup/index.ts:276](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L276)

---

### ExpandedExportType

```ts
type ExpandedExportType: {
  export_type: ExportType;
  file: string;
  format: InternalModuleFormat;
  export_key: string;
};
```

Expand output objects by export type

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `export_type` | [`ExportType`](rollup.md#exporttype) | [packages/build-config/src/rollup/index.ts:282](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L282) |
| `file` | `string` | [packages/build-config/src/rollup/index.ts:283](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L283) |
| `format` | `InternalModuleFormat` | [packages/build-config/src/rollup/index.ts:284](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L284) |
| `export_key` | `string` | [packages/build-config/src/rollup/index.ts:285](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L285) |

#### Defined in

[packages/build-config/src/rollup/index.ts:281](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L281)

---

### RollupPluginKey

```ts
type RollupPluginKey: keyof typeof PLUGINS_CONFIG;
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:45](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L45)

---

### RollupPluginConfigOptions\<Key>

```ts
type RollupPluginConfigOptions<Key>: Parameters<ConfigPlugin<Key>>[0];
```

#### Type Parameters

| Type Parameter                                                 |
| -------------------------------------------------------------- |
| `Key` _extends_ [`RollupPluginKey`](rollup.md#rolluppluginkey) |

#### Defined in

[packages/build-config/src/rollup/plugins.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L47)

---

### RollupPluginConfiguration

```ts
type RollupPluginConfiguration: { [Property in RollupPluginKey]?: Property extends RollupPluginKey ? RollupPluginConfigOptions<Property> | boolean : never };
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L62)

## Variables

### EXPORT_KEY_LOOKUP

```ts
const EXPORT_KEY_LOOKUP: Record<ExportType, KeyData>
```

#### Defined in

[packages/build-config/src/rollup/index.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L52)

---

### DEFAULT_PLUGINS_BUNDLED

```ts
const DEFAULT_PLUGINS_BUNDLED: Plugin<any>[]
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:107](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L107)

---

### CDN_PLUGINS_BUNDLED

```ts
const CDN_PLUGINS_BUNDLED: Plugin<any>[]
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L109)
