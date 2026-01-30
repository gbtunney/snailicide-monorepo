[**@snailicide/g-shopify-library v0.3.8**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / SectionSchema

# Type Alias: SectionSchema

```ts
type SectionSchema = {
  blocks?: {
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
  }[];
  class?: string;
  limit: number;
  name: string;
  settings?: (
     | {
     content: string;
     type: "header";
   }
     | {
     content: string;
     type: "paragraph";
   }
    | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
  tag?: "article" | "header" | "div" | "aside" | "footer" | "section";
  templates?: (
     | "search"
     | "article"
     | "blog"
     | "collection"
     | "page"
     | "product"
     | "404"
     | "cart"
     | "list-collections"
     | "customers/account"
     | "customers/activate_account"
     | "customers/addresses"
     | "customers/login"
     | "customers/order"
     | "customers/register"
     | "customers/reset_password"
     | "gift_card"
     | "index"
     | "password"
    | "policy")[];
};
```

Defined in:
[packages/g-shopify-library/src/sections/index.ts:65](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L65)

## Type Declaration

| Name                                | Type                                                   | Defined in                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------- | ------------------- | ------------------- | ---------------------- | ---------------------------- | ------------- | --------- | ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="blocks"></a> `blocks?`       | { `limit?`: `number`; `name?`: `string`; `settings`: ( | { `content`: `string`; `type`: `"header"`; }                                                                                                                            | { `content`: `string`; `type`: `"paragraph"`; } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string                                                                                                                                                       | number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })\[]; `type`: `string`; }\[] | [packages/g-shopify-library/src/sections/index.ts:54](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L54) |
| <a id="class"></a> `class?`         | `string`                                               | [packages/g-shopify-library/src/sections/index.ts:55](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L55) |
| <a id="limit"></a> `limit`          | `number`                                               | [packages/g-shopify-library/src/sections/index.ts:57](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L57) |
| <a id="name"></a> `name`            | `string`                                               | [packages/g-shopify-library/src/sections/index.ts:58](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L58) |
| <a id="settings"></a> `settings?`   | (                                                      | { `content`: `string`; `type`: `"header"`; }                                                                                                                            | { `content`: `string`; `type`: `"paragraph"`; } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string                                                                                                                                                       | number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })\[]                         | [packages/g-shopify-library/src/sections/index.ts:59](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L59) |
| <a id="tag"></a> `tag?`             | `"article"`                                            | `"header"`                                                                                                                                                              | `"div"`                                         | `"aside"`                                | `"footer"`                                              | `"section"`  | [packages/g-shopify-library/src/sections/index.ts:61](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L61) |
| <a id="templates"></a> `templates?` | (                                                      | `"search"`                                                                                                                                                              | `"article"`                                     | `"blog"`                                 | `"collection"`                                          | `"page"`     | `"product"`                                                                                                                                                             | `"404"`                                                                 | `"cart"`        | `"list-collections"`                             | `"customers/account"`                                                                                                                                                   | `"customers/activate_account"` | `"customers/addresses"` | `"customers/login"` | `"customers/order"` | `"customers/register"` | `"customers/reset_password"` | `"gift_card"` | `"index"` | `"password"` | `"policy"`)\[] | [packages/g-shopify-library/src/sections/index.ts:63](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L63) |
