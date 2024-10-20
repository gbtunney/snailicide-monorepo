[**@snailicide/g-shopify-library v0.3.5**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.5](../README.md) / parseSectionSchema

# Function: parseSectionSchema()

```ts
function parseSectionSchema(data): undefined | {
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
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

## Returns

`undefined` | \{ `blocks`: \{ `limit`: `number`; `name`: `string`; `settings`:
(\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`:
`"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default:
number; type: "number"; placeholder?: string | undefined; } | \{ default: string
| number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ...
20 more ... | \{ ...; }) & \{ ...; })\[]; `type`: `string`; }\[]; `class`:
`string`; `limit`: `number`; `name`: `string`; `settings`: (\{ `content`:
`string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`;
} | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type:
"number"; placeholder?: string | undefined; } | \{ default: string | number;
options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more
... | \{ ...; }) & \{ ...; })\[]; `tag`: | `"article"` \| `"header"` \| `"div"`
\| `"aside"` \| `"footer"` \| `"section"`; `templates`: ( \| `"search"` \|
`"article"` \| `"blog"` \| `"collection"` \| `"page"` \| `"product"` \| `"404"`
\| `"cart"` \| `"list-collections"` \| `"customers/account"` \|
`"customers/activate_account"` \| `"customers/addresses"` \| `"customers/login"`
\| `"customers/order"` \| `"customers/register"` \| `"customers/reset_password"`
\| `"gift_card"` \| `"index"` \| `"password"` \| `"policy"`)\[]; }

## Defined in

[packages/g-shopify-library/src/sections/index.ts:77](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L77)
