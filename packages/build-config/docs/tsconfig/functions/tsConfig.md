[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [tsconfig](../README.md) / tsConfig

# Function: tsConfig()

```ts
function tsConfig(_tsconfig): JsonObject
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `_tsconfig` | `object` | - |
| `_tsconfig.compileOnSave`? | `boolean` | Enable Compile-on-Save for this project. |
| `_tsconfig.compilerOptions` | `CompilerOptions` | Instructs the TypeScript compiler how to compile `.ts` files. |
| `_tsconfig.exclude`? | `string`[] | Specifies a list of files to be excluded from compilation. The `exclude` property only affects the files included via the `include` property and not the `files` property. Glob patterns require TypeScript version 2.0 or later. |
| `_tsconfig.extends`? | `string` \| `string`[] | Path to base configuration file to inherit from. |
| `_tsconfig.files`? | `string`[] | If no `files` or `include` property is present in a `tsconfig.json`, the compiler defaults to including all files in the containing directory and subdirectories except those specified by `exclude`. When a `files` property is specified, only those files and those specified by `include` are included. |
| `_tsconfig.include`? | `string`[] | Specifies a list of glob patterns that match files to be included in compilation. If no `files` or `include` property is present in a `tsconfig.json`, the compiler defaults to including all files in the containing directory and subdirectories except those specified by `exclude`. |
| `_tsconfig.references`? | `References`[] | Referenced projects. |
| `_tsconfig.typeAcquisition`? | `TypeAcquisition` | Auto type (.d.ts) acquisition options for this project. |
| `_tsconfig.watchOptions`? | `WatchOptions` | Instructs the TypeScript compiler how to watch files. |

## Returns

`JsonObject`

## Defined in

[packages/build-config/src/tsconfig/index.ts:4](https://github.com/gbtunney/snailicide-monorepo/blob/000ebd5e5e0a4dc99abffd69e23184713d3a934a/packages/build-config/src/tsconfig/index.ts#L4)
