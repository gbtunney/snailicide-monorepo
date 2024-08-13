[**@snailicide/build-config**](README.md) • **Docs**

---

[@snailicide/build-config](README.md) / vite

# vite

## Variables

### vite

```ts
const vite: {
    docServer: docServerConfig
}
```

#### Type declaration

| Name | Type | Default value | Defined in |
| --- | --- | --- | --- |
| `docServer` | (`port`) => `UserConfig` | docServerConfig | [packages/build-config/src/vite/index.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/vite/index.ts#L22) |

#### Defined in

[packages/build-config/src/vite/index.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/vite/index.ts#L21)

## Functions

### docServerConfig()

```ts
function docServerConfig(port): UserConfig
```

Vite configuration for documentation server\*

#### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `port`    | `number` | `5555`        |

#### Returns

`UserConfig`

#### Defined in

[packages/build-config/src/vite/index.ts:9](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/build-config/src/vite/index.ts#L9)
