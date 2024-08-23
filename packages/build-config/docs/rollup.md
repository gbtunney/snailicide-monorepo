[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / rollup

# rollup

Rollup Configuration tools and utilities

## References

### ConfigOptions

Re-exports [ConfigOptions](index.md#configoptionskey)

### PluginKey

Re-exports [PluginKey](index.md#pluginkey)

### default

Renames and re-exports [rollup](rollup.md#rollup)

## Type Aliases

### EntryConfig

```ts
type EntryConfig: {
  export_key: LiteralUnion<"." | "*" | "main", string>;
  export_types: ExportType[];
  in_file_name_override: string;
  library_name: string;
  out_file_name_override: string;
  output_dir: string;
  overrides: Partial<OutputOptions> & {
     minify: boolean;
    };
  source_dir: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `export_key` | `LiteralUnion`\<`"."` \| `"*"` \| `"main"`, `string`\> | [packages/build-config/src/rollup/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L108) |
| `export_types` | [`ExportType`](rollup.md#exporttype)[] | [packages/build-config/src/rollup/index.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L113) |
| `in_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L109) |
| `library_name` | `string` | [packages/build-config/src/rollup/index.ts:116](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L116) |
| `out_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:110](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L110) |
| `output_dir` | `string` | [packages/build-config/src/rollup/index.ts:115](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L115) |
| `overrides` | `Partial`\<`OutputOptions`\> & \{ `minify`: `boolean`; \} | [packages/build-config/src/rollup/index.ts:118](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L118) |
| `source_dir` | `string` | [packages/build-config/src/rollup/index.ts:114](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L114) |

#### Defined in

[packages/build-config/src/rollup/index.ts:107](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L107)

---

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

[packages/build-config/src/rollup/index.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L48)

---

### PluginsConfiguration

```ts
type PluginsConfiguration: { [Property in PluginKey]?: Property extends PluginKey ? ConfigOptions<Property> | boolean : never };
```

#### Defined in

[packages/build-config/src/rollup/plugins.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L62)

## Variables

### EXPORT_KEY_LOOKUP

```ts
const EXPORT_KEY_LOOKUP: Record<ExportType, KeyData>
```

#### Defined in

[packages/build-config/src/rollup/index.ts:58](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L58)

---

### rollup

```ts
const rollup: {
    CDN_PLUGINS_BUNDLED: Plugin<any>[]
    DEFAULT_PLUGINS_BUNDLED: Plugin<any>[]
    getBanner: (library_name, package_json, show_error) => undefined | string
    getConfigEntries: (
        directoryObj,
        entries,
        plugins,
        package_json,
    ) => OutputObjReturnType &
        {
            plugins: InputPluginOption
        }[]
    getOutputObj: (entry) => {
        config: RollupOptions
        exportObj: Record<string, Record<string, string>>
    }
    getPackageExports: (args, doPrint) => undefined | JsonValue
    getPluginsConfiguration: <Type>(config, _default) => Plugin<any>[]
    getRollupConfig: (args) => RollupOptions[]
}
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `CDN_PLUGINS_BUNDLED` | `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:312](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L312) |
| `DEFAULT_PLUGINS_BUNDLED` | `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:313](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L313) |
| `getBanner` | (`library_name`, `package_json`, `show_error`) => `undefined` \| `string` | [packages/build-config/src/rollup/index.ts:314](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L314) |
| `getConfigEntries` | (`directoryObj`, `entries`, `plugins`, `package_json`) => `OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[] | [packages/build-config/src/rollup/index.ts:315](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L315) |
| `getOutputObj` | (`entry`) => \{ `config`: `RollupOptions`; `exportObj`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; \} | [packages/build-config/src/rollup/index.ts:316](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L316) |
| `getPackageExports` | (`args`, `doPrint`) => `undefined` \| `JsonValue` | [packages/build-config/src/rollup/index.ts:317](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L317) |
| `getPluginsConfiguration` | \<`Type`\>(`config`, `_default`) => `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:318](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L318) |
| `getRollupConfig` | (`args`) => `RollupOptions`[] | [packages/build-config/src/rollup/index.ts:319](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L319) |

#### Defined in

[packages/build-config/src/rollup/index.ts:311](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L311)

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

`undefined` \| `string`

#### Defined in

[packages/build-config/src/rollup/index.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L28)

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
| `directoryObj` | `Pick`\<[`EntryConfig`](rollup.md#entryconfig), `"source_dir"` \| `"output_dir"`\> | `undefined` | An object containing the source and output directories. |
| `entries` | `Omit`\<[`EntryConfig`](rollup.md#entryconfig), `"source_dir"` \| `"output_dir"`\>[] | `undefined` | An array of entry configurations. |
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

`OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[]

An array of output configurations with plugins.

#### Defined in

[packages/build-config/src/rollup/index.ts:236](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L236)

---

### getOutputObj()

```ts
function getOutputObj(entry): {
    config: RollupOptions
    exportObj: Record<string, Record<string, string>>
}
```

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `entry`   | [`EntryConfig`](rollup.md#entryconfig) |

#### Returns

```ts
{
    config: RollupOptions
    exportObj: Record<string, Record<string, string>>
}
```

| Name | Type | Defined in |
| --- | --- | --- |
| `config` | `RollupOptions` | [packages/build-config/src/rollup/index.ts:126](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L126) |
| `exportObj` | `Record`\<`string`, `Record`\<`string`, `string`\>\> | [packages/build-config/src/rollup/index.ts:125](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L125) |

#### Defined in

[packages/build-config/src/rollup/index.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L121)

---

### getPackageExports()

```ts
function getPackageExports(args, doPrint): undefined | JsonValue
```

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `args` | `OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[] | `undefined` |
| `doPrint` | `boolean` | `false` |

#### Returns

`undefined` \| `JsonValue`

#### Defined in

[packages/build-config/src/rollup/index.ts:293](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L293)

---

### getPluginsConfiguration()

```ts
function getPluginsConfiguration<Type>(config, _default): Plugin<any>[]
```

#### Type Parameters

| Type Parameter                                                            |
| ------------------------------------------------------------------------- |
| `Type` _extends_ [`PluginsConfiguration`](rollup.md#pluginsconfiguration) |

#### Parameters

| Parameter | Type | Default value |
| --- | --- | --- |
| `config` | `undefined` \| `Type` | `undefined` |
| `_default` | [`PluginsConfiguration`](rollup.md#pluginsconfiguration) | `basePluginConfig` |

#### Returns

`Plugin`\<`any`\>[]

#### Defined in

[packages/build-config/src/rollup/plugins.ts:91](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/plugins.ts#L91)

---

### getRollupConfig()

```ts
function getRollupConfig(args): RollupOptions[]
```

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `args`    | `OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[] |

#### Returns

`RollupOptions`[]

#### Defined in

[packages/build-config/src/rollup/index.ts:271](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/rollup/index.ts#L271)
