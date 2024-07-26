[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / rollup

# Variable: rollup

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

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `CDN_PLUGINS_BUNDLED` | `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:310](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L310) |
| `DEFAULT_PLUGINS_BUNDLED` | `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:311](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L311) |
| `getBanner` | (`library_name`, `package_json`, `show_error`) => `undefined` \| `string` | [packages/build-config/src/rollup/index.ts:312](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L312) |
| `getConfigEntries` | (`directoryObj`, `entries`, `plugins`, `package_json`) => `OutputObjReturnType` & \{ `plugins`: `InputPluginOption`; \}[] | [packages/build-config/src/rollup/index.ts:313](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L313) |
| `getOutputObj` | (`entry`) => \{ `config`: `RollupOptions`; `exportObj`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; \} | [packages/build-config/src/rollup/index.ts:314](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L314) |
| `getPackageExports` | (`args`, `doPrint`) => `undefined` \| `JsonValue` | [packages/build-config/src/rollup/index.ts:315](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L315) |
| `getPluginsConfiguration` | \<`Type`\>(`config`, `_default`) => `Plugin`\<`any`\>[] | [packages/build-config/src/rollup/index.ts:316](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L316) |
| `getRollupConfig` | (`args`) => `RollupOptions`[] | [packages/build-config/src/rollup/index.ts:317](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L317) |

## Defined in

[packages/build-config/src/rollup/index.ts:309](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L309)
