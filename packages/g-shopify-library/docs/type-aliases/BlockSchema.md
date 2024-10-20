[**@snailicide/g-shopify-library v0.3.4**](../README.md) • **Docs**

---

[@snailicide/g-shopify-library v0.3.4](../README.md) / BlockSchema

# Type Alias: BlockSchema

```ts
type BlockSchema: {
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
};
```

## Type declaration

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                           | Defined in                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`?   | `number`                                                                                                                                                                                                                                                                                                                                                                       | [packages/g-shopify-library/src/sections/index.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L48) |
| `name`?    | `string`                                                                                                                                                                                                                                                                                                                                                                       | [packages/g-shopify-library/src/sections/index.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L49) |
| `settings` | (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[] | [packages/g-shopify-library/src/sections/index.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L50) |
| `type`     | `string`                                                                                                                                                                                                                                                                                                                                                                       | [packages/g-shopify-library/src/sections/index.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L51) |

## Defined in

[packages/g-shopify-library/src/sections/index.ts:53](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L53)