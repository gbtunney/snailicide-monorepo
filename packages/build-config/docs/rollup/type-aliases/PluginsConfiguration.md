[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / PluginsConfiguration

# Type Alias: PluginsConfiguration

```ts
type PluginsConfiguration: { [Property in PluginKey]?: Property extends PluginKey ? ConfigOptions<Property> | boolean : never };
```

## Defined in

[packages/build-config/src/rollup/plugins.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/e6e31fab4b5388ce50c23f623dbfd6064ce1a2f2/packages/build-config/src/rollup/plugins.ts#L62)
