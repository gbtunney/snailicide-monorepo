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
| `export_key` | `LiteralUnion`\<`"."` \| `"*"` \| `"main"`, `string`\> | [packages/build-config/src/rollup/index.ts:103](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L103) |
| `export_types` | [`ExportType`](ExportType.md)[] | [packages/build-config/src/rollup/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L108) |
| `in_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:104](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L104) |
| `library_name` | `string` | [packages/build-config/src/rollup/index.ts:111](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L111) |
| `out_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:105](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L105) |
| `output_dir` | `string` | [packages/build-config/src/rollup/index.ts:110](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L110) |
| `overrides` | `Partial`\<`OutputOptions`\> & \{ `minify`: `boolean`; \} | [packages/build-config/src/rollup/index.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L113) |
| `source_dir` | `string` | [packages/build-config/src/rollup/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L109) |

## Defined in

[packages/build-config/src/rollup/index.ts:102](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/index.ts#L102)
