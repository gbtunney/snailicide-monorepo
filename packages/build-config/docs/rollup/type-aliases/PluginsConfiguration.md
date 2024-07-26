[**@snailicide/build-config**](../../README.md) • **Docs**

---

[@snailicide/build-config](../../README.md) / [rollup](../README.md) / PluginsConfiguration

# Type Alias: PluginsConfiguration

```ts
type PluginsConfiguration: { [Property in PluginKey]?: Property extends PluginKey ? ConfigOptions<Property> | boolean : never };
```

## Defined in

[packages/build-config/src/rollup/plugins.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/864f9979e97eb579a793bd06e883355f7bea5c52/packages/build-config/src/rollup/plugins.ts#L62)
