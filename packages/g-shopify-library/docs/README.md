**@snailicide/g-shopify-library v0.3.4** • **Docs**

---

# @snailicide/g-shopify-library 🐌

<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/@snailicide/g-shopify-library" />

  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/g-shopify-library" />
  </a>

  <a href="#" target="_blank">
    <img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>

  <a href="#" target="_blank">
    <img alt="RollupJS" height="20px" src="https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white" />
  </a>
</p>

_This plugin enables Shopify theme developers to structure their code into "module" folders which keep Liquid template files (snippets and sections) organized together with their corresponding JS or CSS, while retaining the standard file structure of Shopify themes. Please see [Inspiration](#inspiration) section for more info and backstory!_

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

## Contents

-   [🐌](#)
-   [Features](#features)
-   [Usage](#usage)
    -   [Installation](#installation)
-   [Helpful Links](#helpful-links)
-   [To-Do](#to-do)
-   [Bugs](#bugs)
-   [Functions](#functions)
    -   [toGID()](#togid)
    -   [isEncodedGID()](#isencodedgid)
    -   [isGID()](#isgid)
    -   [isParsableToSID()](#isparsabletosid)
    -   [toSID()](#tosid)
    -   [isSID()](#issid)
    -   [shopifyMediaURL()](#shopifymediaurl)
    -   [parseSectionSchema()](#parsesectionschema)
    -   [parseBlockSchema()](#parseblockschema)
    -   [parseSettingsGroup()](#parsesettingsgroup)
    -   [parseSingleSetting()](#parsesinglesetting)
    -   [parseSetting()](#parsesetting)
    -   [parseThemeSettings()](#parsethemesettings)
    -   [parseThemeSettingSection()](#parsethemesettingsection)
-   [Type Aliases](#type-aliases)
    -   [ElementTags](#elementtags)
    -   [PageTypes](#pagetypes)
    -   [BlockSchema](#blockschema)
    -   [SectionSchema](#sectionschema)
    -   [BasicSettingType](#basicsettingtype)
    -   [SettingTypes](#settingtypes)
    -   [AllSettingTypes](#allsettingtypes)
    -   [Setting\<Type, id>](#settingtype-id)
    -   [SettingsMapped\<T>](#settingsmappedt)
    -   [SingleSetting](#singlesetting)
    -   [Settings](#settings)
    -   [SettingGroup](#settinggroup)
    -   [ShopifySettingType](#shopifysettingtype)
    -   [SideBarSettingType](#sidebarsettingtype)
    -   [SpecializedSettingType](#specializedsettingtype)
    -   [ThemeInfo](#themeinfo)
    -   [GlobalSettingsSection](#globalsettingssection)
    -   [GlobalSettingsSchema](#globalsettingsschema)

## 🐌

> Collections of types and utilities for working with Shopify

-   [🐌Welcome to @snailicide/g-shopify-library🐌](#welcome-to--snailicide-g-shopify-library--)
    -   [Features](#features)
    -   [Examples](#examples)
    -   [Installation](#installation)
    -   [Helpful Links](#helpful-links)
    -   [To-Do](#to-do)
    -   [Bugs](#bugs)

<small><i><a href="http://ecotrust-canada.github.io/markdown-toc/">Table of contents generated with markdown-toc</a></i></small>

## Features

-   Generic functions for Storefront API, Shopify MediaURLs, etc
-   Section Schema types and validators (using zod)

## Usage

### Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
#npm
npm i @snailicide/g-shopify-library -D

# yarn
yarn add @snailicide/g-shopify-library -D

# pnp
pnpm add @snailicide/g-shopify-library -D
```

## Helpful Links

-   [Shopify Section schema reference](https://shopify.dev/themes/architecture/sections/section-schema)
-   [@shopify/admin-graphql-api-utilities](https://www.npmjs.com/package/@shopify/admin-graphql-api-utilities)
-   [Zod](https://zod.dev/)
-   [TypeScript](https://www.typescriptlang.org)
-   [Ramda](https://ramdajs.com/docs)

## To-Do

-   [ ] Presets (in new version)
-   [ ] Documentation

## Bugs

Please create an issue if you found any bugs, to help us improve this project!

## Functions

### toGID()

```ts
function toGID(value): undefined | string
```

Converts a potentially encoded Global ID (GID) to its decoded form if it is a valid GID, otherwise returns undefined.

#### Parameters

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `value`   | `string` | The GID to decode. |

#### Returns

`undefined` | `string`

The decoded GID if valid, otherwise undefined.

#### Function

toGID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:13](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L13)

---

### isEncodedGID()

```ts
function isEncodedGID<Type>(value): value is Type
```

Checks if the provided string is an encoded GID.

#### Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

#### Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| `value`   | `Type` | The string to check. |

#### Returns

`value is Type`

True if the string is an encoded GID, false otherwise.

#### Function

isEncodedGID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L24)

---

### isGID()

```ts
function isGID<Type>(value): value is Type
```

Determines if the provided string is a valid GID.

#### Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

#### Parameters

| Parameter | Type   | Description             |
| --------- | ------ | ----------------------- |
| `value`   | `Type` | The string to validate. |

#### Returns

`value is Type`

True if the string is a valid GID, false otherwise.

#### Function

isGID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:40](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L40)

---

### isParsableToSID()

```ts
function isParsableToSID<Type>(value, min_digits?): value is Type
```

Checks if the provided value can be parsed into a Shopify ID (SID) with a minimum number of digits.

#### Type Parameters

| Type Parameter                        |
| ------------------------------------- |
| `Type` _extends_ `string` \| `number` |

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `value` | `Type` | `undefined` | The value to check. |
| `min_digits`? | `number` | `9` | The minimum number of digits required for the SID. Default is `9` |

#### Returns

`value is Type`

True if the value can be parsed into a SID, false otherwise.

#### Function

isParsableToSID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L62)

---

### toSID()

```ts
function toSID<Type>(value, min_digits?): undefined | number
```

Converts a GID to a Shopify ID (SID) if possible, considering a minimum number of digits.

#### Type Parameters

| Type Parameter            |
| ------------------------- |
| `Type` _extends_ `string` |

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `value` | `Type` | `undefined` | The GID to convert. |
| `min_digits`? | `number` | `9` | The minimum number of digits required for the SID. Default is `9` |

#### Returns

`undefined` | `number`

The SID if conversion is possible, otherwise undefined.

#### Function

toSID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:87](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L87)

---

### isSID()

```ts
function isSID<Type>(value, min_digits?): value is Type
```

Determines if the provided value is a valid Shopify ID (SID), considering a minimum number of digits.

#### Type Parameters

| Type Parameter                        |
| ------------------------------------- |
| `Type` _extends_ `string` \| `number` |

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `value` | `Type` | `undefined` | The value to validate. |
| `min_digits`? | `number` | `9` | The minimum number of digits required for the SID. Default is `9` |

#### Returns

`value is Type`

True if the value is a valid SID, false otherwise.

#### Function

isSID

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:117](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L117)

---

### shopifyMediaURL()

```ts
function shopifyMediaURL(
    src?,
    width?,
    height?,
    crop?,
    scale?,
): undefined | string
```

Generates a Shopify media URL with optional parameters for resizing and cropping.

#### Parameters

| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `src`? | `string` | `undefined` | The source URL of the media. Default is `undefined` |
| `width`? | `string` \| `number` | `undefined` | The desired width of the media. Default is `undefined` |
| `height`? | `string` \| `number` | `undefined` | The desired height of the media. Default is `undefined` |
| `crop`? | \| `"top"` \| `"center"` \| `"bottom"` \| `"left"` \| `"right"` | `undefined` | The crop position. Default is `undefined` |
| `scale`? | `boolean` | `false` | Whether to scale the image. Default is `false` |

#### Returns

`undefined` | `string`

The modified media URL or undefined if the source URL is invalid.

#### Function

shopifyMediaURL

#### Defined in

[packages/g-shopify-library/src/scripts/index.ts:149](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/scripts/index.ts#L149)

---

### parseSectionSchema()

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

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

#### Returns

`undefined` | \{ `blocks`: \{ `limit`: `number`; `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; })\[]; `type`: `string`; }\[]; `class`: `string`; `limit`: `number`; `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; })\[]; `tag`: | `"article"` \| `"header"` \| `"div"` \| `"aside"` \| `"footer"` \| `"section"`; `templates`: ( \| `"search"` \| `"article"` \| `"blog"` \| `"collection"` \| `"page"` \| `"product"` \| `"404"` \| `"cart"` \| `"list-collections"` \| `"customers/account"` \| `"customers/activate_account"` \| `"customers/addresses"` \| `"customers/login"` \| `"customers/order"` \| `"customers/register"` \| `"customers/reset_password"` \| `"gift_card"` \| `"index"` \| `"password"` \| `"policy"`)\[]; }

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:77](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L77)

---

### parseBlockSchema()

```ts
function parseBlockSchema(data): undefined | {
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
}
```

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

#### Returns

`undefined` | \{ `limit`: `number`; `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; })\[]; `type`: `string`; }

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:78](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L78)

---

### parseSettingsGroup()

```ts
function parseSettingsGroup(
   data,
   id_prefix,
   id_suffix): undefined | ({
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
 } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[]
```

#### Parameters

| Parameter   | Type                    | Default value |
| ----------- | ----------------------- | ------------- |
| `data`      | `unknown`               | `undefined`   |
| `id_prefix` | `undefined` \| `string` | `undefined`   |
| `id_suffix` | `undefined` \| `string` | `undefined`   |

#### Returns

`undefined` | (\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; })\[]

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:109](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L109)

---

### parseSingleSetting()

```ts
function parseSingleSetting(data, id): undefined | {
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
} | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; }
```

#### Parameters

| Parameter | Type                    | Default value |
| --------- | ----------------------- | ------------- |
| `data`    | `unknown`               | `undefined`   |
| `id`      | `undefined` \| `string` | `undefined`   |

#### Returns

`undefined` | \{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; }

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:137](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L137)

---

### parseSetting()

```ts
function parseSetting(data, id): undefined | {
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
} | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; }
```

#### Parameters

| Parameter | Type                    | Default value |
| --------- | ----------------------- | ------------- |
| `data`    | `unknown`               | `undefined`   |
| `id`      | `undefined` \| `string` | `undefined`   |

#### Returns

`undefined` | \{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; }

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:146](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L146)

---

### parseThemeSettings()

```ts
function parseThemeSettings(data):
    | undefined
    | [
          {
              name: 'theme_info'
              theme_author: string
              theme_documentation_url: string
              theme_name: string
              theme_support_url: string
              theme_version: string
          },
          ...Object[],
      ]
```

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

#### Returns

`undefined` | \[\{ `name`: `"theme_info"`; `theme_author`: `string`; `theme_documentation_url`: `string`; `theme_name`: `string`; `theme_support_url`: `string`; `theme_version`: `string`; }, `...Object[]`]

#### Defined in

[packages/g-shopify-library/src/settings/theme.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L48)

---

### parseThemeSettingSection()

```ts
function parseThemeSettingSection(data): undefined | {
  name: string;
  settings: ({
     content: string;
     type: "header";
    } | {
     content: string;
     type: "paragraph";
    } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
}
```

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `data`    | `unknown` |

#### Returns

`undefined` | \{ `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } | \{ `content`: `string`; `type`: `"paragraph"`; } | (\{ default: boolean; type: "checkbox"; } | \{ default: number; type: "number"; placeholder?: string | undefined; } | \{ default: string | number; options: \{ value: string; label: string; }\[]; type: "radio"; } | ... 20 more ... | \{ ...; }) & \{ ...; })\[]; }

#### Defined in

[packages/g-shopify-library/src/settings/theme.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L51)

## Type Aliases

### ElementTags

```ts
type ElementTags:
  | "article"
  | "header"
  | "div"
  | "aside"
  | "footer"
  | "section";
```

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L18)

---

### PageTypes

```ts
type PageTypes:
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
  | "policy";
```

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:44](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L44)

---

### BlockSchema

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

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `limit` | `number` | [packages/g-shopify-library/src/sections/index.ts:48](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L48) |
| `name` | `string` | [packages/g-shopify-library/src/sections/index.ts:49](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L49) |
| `settings` | (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[] | [packages/g-shopify-library/src/sections/index.ts:50](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L50) |
| `type` | `string` | [packages/g-shopify-library/src/sections/index.ts:51](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L51) |

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:53](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L53)

---

### SectionSchema

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

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `blocks` | \{ `limit`: `number`; `name`: `string`; `settings`: (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[]; `type`: `string`; }\[] | [packages/g-shopify-library/src/sections/index.ts:55](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L55) |
| `class` | `string` | [packages/g-shopify-library/src/sections/index.ts:56](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L56) |
| `limit` | `number` | [packages/g-shopify-library/src/sections/index.ts:58](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L58) |
| `name` | `string` | [packages/g-shopify-library/src/sections/index.ts:59](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L59) |
| `settings` | (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[] | [packages/g-shopify-library/src/sections/index.ts:60](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L60) |
| `tag` | \| `"article"` \| `"header"` \| `"div"` \| `"aside"` \| `"footer"` \| `"section"` | [packages/g-shopify-library/src/sections/index.ts:62](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L62) |
| `templates` | ( \| `"search"` \| `"article"` \| `"blog"` \| `"collection"` \| `"page"` \| `"product"` \| `"404"` \| `"cart"` \| `"list-collections"` \| `"customers/account"` \| `"customers/activate_account"` \| `"customers/addresses"` \| `"customers/login"` \| `"customers/order"` \| `"customers/register"` \| `"customers/reset_password"` \| `"gift_card"` \| `"index"` \| `"password"` \| `"policy"`)\[] | [packages/g-shopify-library/src/sections/index.ts:64](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L64) |

#### Defined in

[packages/g-shopify-library/src/sections/index.ts:66](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/sections/index.ts#L66)

---

### BasicSettingType

```ts
type BasicSettingType: keyof typeof basic_settings_schema_map;
```

#### Defined in

[packages/g-shopify-library/src/settings/basic.ts:74](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/basic.ts#L74)

---

### SettingTypes

```ts
type SettingTypes: keyof typeof SettingSchemaMap;
```

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L19)

---

### AllSettingTypes

```ts
type AllSettingTypes: SettingTypes;
```

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L20)

---

### Setting\<Type, id>

```ts
type Setting<Type, id>: Type extends "paragraph" | "header" ? z.infer<typeof SettingSchemaMap[Type]> : Merge<z.infer<typeof SettingSchemaMap[Type]>, id extends string ? Merge<z.infer<typeof baseSchema>, {
  id: id;
}> : z.infer<typeof baseSchema>>;
```

#### Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `Type` _extends_ keyof _typeof_ `SettingSchemaMap` | keyof _typeof_ `SettingSchemaMap` |
| `id` _extends_ `string` | `string` |

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L22)

---

### SettingsMapped\<T>

```ts
type SettingsMapped<T>: { [Key in keyof T]: Key extends string ? Setting<T[Key]["type"], Key> : never }[keyof T][];
```

#### Type Parameters

| Type Parameter                                                           |
| ------------------------------------------------------------------------ |
| `T` _extends_ `Record`\<`string`, [`Setting`](README.md#settingtype-id)> |

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:34](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L34)

---

### SingleSetting

```ts
type SingleSetting: {
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
} | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; };
```

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:83](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L83)

---

### Settings

```ts
type Settings: ({
  content: string;
  type: "header";
 } | {
  content: string;
  type: "paragraph";
 } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
```

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:84](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L84)

---

### SettingGroup

```ts
type SettingGroup: any[];
```

#### Defined in

[packages/g-shopify-library/src/settings/index.ts:85](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/index.ts#L85)

---

### ShopifySettingType

```ts
type ShopifySettingType: keyof typeof shopify_settings_schema_map;
```

#### Defined in

[packages/g-shopify-library/src/settings/shopify.ts:70](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/shopify.ts#L70)

---

### SideBarSettingType

```ts
type SideBarSettingType: keyof typeof sidebar_settings_schema_map;
```

#### Defined in

[packages/g-shopify-library/src/settings/sidebar.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/sidebar.ts#L21)

---

### SpecializedSettingType

```ts
type SpecializedSettingType: keyof typeof specialized_settings_schema_map;
```

#### Defined in

[packages/g-shopify-library/src/settings/specialized.ts:78](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/specialized.ts#L78)

---

### ThemeInfo

```ts
type ThemeInfo: {
  name: "theme_info";
  theme_author: string;
  theme_documentation_url: string;
  theme_name: string;
  theme_support_url: string;
  theme_version: string;
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `name` | `"theme_info"` | [packages/g-shopify-library/src/settings/theme.ts:16](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L16) |
| `theme_author` | `string` | [packages/g-shopify-library/src/settings/theme.ts:18](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L18) |
| `theme_documentation_url` | `string` | [packages/g-shopify-library/src/settings/theme.ts:19](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L19) |
| `theme_name` | `string` | [packages/g-shopify-library/src/settings/theme.ts:20](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L20) |
| `theme_support_url` | `string` | [packages/g-shopify-library/src/settings/theme.ts:21](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L21) |
| `theme_version` | `string` | [packages/g-shopify-library/src/settings/theme.ts:22](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L22) |

#### Defined in

[packages/g-shopify-library/src/settings/theme.ts:24](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L24)

---

### GlobalSettingsSection

```ts
type GlobalSettingsSection: {
  name: string;
  settings: ({
     content: string;
     type: "header";
    } | {
     content: string;
     type: "paragraph";
    } | ({ default: boolean; type: "checkbox"; } | { default: number; type: "number"; placeholder?: string | undefined; } | { default: string | number; options: { value: string; label: string; }[]; type: "radio"; } | ... 20 more ... | { ...; }) & { ...; })[];
};
```

#### Type declaration

| Name | Type | Defined in |
| --- | --- | --- |
| `name` | `string` | [packages/g-shopify-library/src/settings/theme.ts:27](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L27) |
| `settings` | (\{ `content`: `string`; `type`: `"header"`; } \| \{ `content`: `string`; `type`: `"paragraph"`; } \| (\{ default: boolean; type: "checkbox"; } \| \{ default: number; type: "number"; placeholder?: string \| undefined; } \| \{ default: string \| number; options: \{ value: string; label: string; }\[]; type: "radio"; } \| ... 20 more ... \| \{ ...; }) & \{ ...; })\[] | [packages/g-shopify-library/src/settings/theme.ts:28](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L28) |

#### Defined in

[packages/g-shopify-library/src/settings/theme.ts:30](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L30)

---

### GlobalSettingsSchema

```ts
type GlobalSettingsSchema: [{
  name: "theme_info";
  theme_author: string;
  theme_documentation_url: string;
  theme_name: string;
  theme_support_url: string;
  theme_version: string;
 }, ...Object[]];
```

#### Defined in

[packages/g-shopify-library/src/settings/theme.ts:36](https://github.com/gbtunney/snailicide-monorepo/blob/master/packages/g-shopify-library/src/settings/theme.ts#L36)
