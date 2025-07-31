[**@snailicide/g-shopify-library v0.3.6**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / GlobalSettingsSection

# Type Alias: GlobalSettingsSection

```ts
type GlobalSettingsSection = {
  name: string;
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
};
```

Defined in:
[packages/g-shopify-library/src/settings/theme.ts:30](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L30)

## Type declaration

| Name                             | Type     | Defined in                                                                                                                                                              |
| -------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- | ------------ | ----------------- | ----------------------------------------------------------------------- | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="name"></a> `name`         | `string` | [packages/g-shopify-library/src/settings/theme.ts:27](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L27) |
| <a id="settings"></a> `settings` | (        | { `content`: `string`; `type`: `"header"`; }                                                                                                                            | { `content`: `string`; `type`: `"paragraph"`; } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })\[] | [packages/g-shopify-library/src/settings/theme.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L28) |
