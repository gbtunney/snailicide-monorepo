[**@snailicide/g-shopify-library v0.3.7**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / BlockSchema

# Type Alias: BlockSchema

```ts
type BlockSchema = {
  limit?: number;
  name?: string;
  settings: (
     | {
     content: string;
     type: "header";
   }
     | {
     content: string;
     type: "paragraph";
   }
    | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
  type: string;
};
```

Defined in:
[packages/g-shopify-library/src/sections/index.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L52)

## Type Declaration

| Name                             | Type     | Defined in                                                                                                                                                              |
| -------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- | ------------ | ----------------- | ----------------------------------------------------------------------- | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="limit"></a> `limit?`      | `number` | [packages/g-shopify-library/src/sections/index.ts:47](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L47) |
| <a id="name"></a> `name?`        | `string` | [packages/g-shopify-library/src/sections/index.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L48) |
| <a id="settings"></a> `settings` | (        | { `content`: `string`; `type`: `"header"`; }                                                                                                                            | { `content`: `string`; `type`: `"paragraph"`; } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })\[] | [packages/g-shopify-library/src/sections/index.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L49) |
| <a id="type"></a> `type`         | `string` | [packages/g-shopify-library/src/sections/index.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L50) |
