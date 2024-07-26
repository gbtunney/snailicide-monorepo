[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / EntryConfig

# Type Alias: EntryConfig

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

## Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `export_key` | `LiteralUnion`\<`"."` \| `"*"` \| `"main"`, `string`\> | [packages/build-config/src/rollup/index.ts:106](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L106) |
| `export_types` | [`ExportType`](ExportType.md)[] | [packages/build-config/src/rollup/index.ts:111](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L111) |
| `in_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:107](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L107) |
| `library_name` | `string` | [packages/build-config/src/rollup/index.ts:114](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L114) |
| `out_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L108) |
| `output_dir` | `string` | [packages/build-config/src/rollup/index.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L113) |
| `overrides` | `Partial`\<`OutputOptions`\> & \{ `minify`: `boolean`; \} | [packages/build-config/src/rollup/index.ts:116](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L116) |
| `source_dir` | `string` | [packages/build-config/src/rollup/index.ts:112](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L112) |

## Defined in

[packages/build-config/src/rollup/index.ts:105](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/rollup/index.ts#L105)
