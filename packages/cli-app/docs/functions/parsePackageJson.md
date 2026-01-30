[**@snailicide/cli-app v0.4.2**](../README.md)

---

[@snailicide/cli-app](../README.md) / parsePackageJson

# Function: parsePackageJson()

```ts
function parsePackageJson(pkg):
  | {
      description?: string
      name: string
      version: string
    }
  | undefined
```

Defined in:
[packages/cli-app/src/app-config.ts:154](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L154)

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `pkg`     | `unknown` |

## Returns

```ts
{
  description?: string;
  name: string;
  version: string;
}
```

| Name           | Type     | Description                         | Defined in                                                                                                                                    |
| -------------- | -------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `description?` | `string` | -                                   | [packages/cli-app/src/app-config.ts:52](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L52)   |
| `name`         | `string` | Hide an option from the help screen | [packages/cli-app/src/app-config.ts:88](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L88)   |
| `version`      | `string` | -                                   | [packages/cli-app/src/app-config.ts:121](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/cli-app/src/app-config.ts#L121) |

`undefined`
