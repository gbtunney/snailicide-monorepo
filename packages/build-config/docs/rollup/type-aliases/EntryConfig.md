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
| `export_key` | `LiteralUnion`\<`"."` \| `"*"` \| `"main"`, `string`\> | [packages/build-config/src/rollup/index.ts:108](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L108) |
| `export_types` | [`ExportType`](ExportType.md)[] | [packages/build-config/src/rollup/index.ts:113](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L113) |
| `in_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L109) |
| `library_name` | `string` | [packages/build-config/src/rollup/index.ts:116](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L116) |
| `out_file_name_override` | `string` | [packages/build-config/src/rollup/index.ts:110](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L110) |
| `output_dir` | `string` | [packages/build-config/src/rollup/index.ts:115](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L115) |
| `overrides` | `Partial`\<`OutputOptions`\> & \{ `minify`: `boolean`; \} | [packages/build-config/src/rollup/index.ts:118](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L118) |
| `source_dir` | `string` | [packages/build-config/src/rollup/index.ts:114](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L114) |

## Defined in

[packages/build-config/src/rollup/index.ts:107](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/index.ts#L107)
