[**@snailicide/g-shopify-library v0.3.8**](../README.md)

---

[@snailicide/g-shopify-library](../README.md) / Settings

# Type Alias: Settings

```ts
type Settings = (
  | {
  content: string;
  type: "header";
}
  | {
  content: string;
  type: "paragraph";
}
  | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
```

Defined in:
[packages/g-shopify-library/src/settings/index.ts:84](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L84)
