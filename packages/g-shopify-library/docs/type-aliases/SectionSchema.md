[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / SectionSchema

# Type Alias: SectionSchema

```ts
type SectionSchema: {
  blocks: {
     limit: number;
     name: string;
     settings: ({
        content: string;
        type: "header";
       } | {
        content: string;
        type: "paragraph";
       } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
     type: string;
    }[];
  class: string;
  limit: number;
  name: string;
  settings: ({
     content: string;
     type: "header";
    } | {
     content: string;
     type: "paragraph";
    } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
  tag:   | "article"
     | "header"
     | "div"
     | "aside"
     | "footer"
     | "section";
  templates: (
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

## Type declaration

| Name         | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Defined in                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blocks`?    | \{ `limit`: `number`; `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[]; `type`: `string`; }\[] | [packages/g-shopify-library/src/sections/index.ts:55](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L55) |
| `class`?     | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | [packages/g-shopify-library/src/sections/index.ts:56](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L56) |
| `limit`      | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | [packages/g-shopify-library/src/sections/index.ts:58](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L58) |
| `name`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | [packages/g-shopify-library/src/sections/index.ts:59](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L59) |
| `settings`?  | (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[]                                                                             | [packages/g-shopify-library/src/sections/index.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L60) |
| `tag`?       | \| `"article"` \| `"header"` \| `"div"` \| `"aside"` \| `"footer"` \| `"section"`                                                                                                                                                                                                                                                                                                                                                                          | [packages/g-shopify-library/src/sections/index.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L62) |
| `templates`? | ( \| `"search"` \| `"article"` \| `"blog"` \| `"collection"` \| `"page"` \| `"product"` \| `"404"` \| `"cart"` \| `"list-collections"` \| `"customers/account"` \| `"customers/activate_account"` \| `"customers/addresses"` \| `"customers/login"` \| `"customers/order"` \| `"customers/register"` \| `"customers/reset_password"` \| `"gift_card"` \| `"index"` \| `"password"` \| `"policy"`)\[]                                                       | [packages/g-shopify-library/src/sections/index.ts:64](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L64) |

## Defined in

[packages/g-shopify-library/src/sections/index.ts:66](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L66)