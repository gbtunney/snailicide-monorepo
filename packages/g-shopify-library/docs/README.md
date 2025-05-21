**@snailicide/g-shopify-library v0.3.5**

---

# @snailicide/g-shopify-library 🐌

[![NPM](https://img.shields.io/npm/v/@snailicide/g-shopify-library)](http://www.npmjs.com/package/@snailicide/g-shopify-library)
![License: MIT](https://img.shields.io/npm/l/@snailicide/g-shopify-library)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

_This plugin enables Shopify theme developers to structure their code into
"module" folders which keep Liquid template files (snippets and sections)
organized together with their corresponding JS or CSS, while retaining the
standard file structure of Shopify themes._

### Repository

[snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

## 🐌

> Collections of types and utilities for working with Shopify

- 🐌Welcome to @snailicide/g-shopify-library🐌
  - [Features](#features)
  - [Installation](#installation)
  - [Helpful Links](#helpful-links)
  - [To-Do](#to-do)
  - [Bugs](#bugs)

[Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc)

## Features

- Generic functions for Storefront API, Shopify MediaURLs, etc
- Section Schema types and validators (using zod)

## Usage

### Installation

This library is published in the NPM registry and can be installed using any
compatible package manager.

```bash
#npm
npm i @snailicide/g-shopify-library -D

# yarn
yarn add @snailicide/g-shopify-library -D

# pnp
pnpm add @snailicide/g-shopify-library -D
```

## Helpful Links

- [Shopify Section schema reference](https://shopify.dev/themes/architecture/sections/section-schema)
- [@shopify/admin-graphql-api-utilities](https://www.npmjs.com/package/@shopify/admin-graphql-api-utilities)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [Ramda](https://ramdajs.com/docs)

## To-Do

- \[ ] Presets (in new version)
- \[ ] Documentation

## Bugs

Please create an issue if you found any bugs, to help us improve this project!

## Functions

| Function                                              | Description                                                                                                           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [toGID](functions/toGID.md)                           | Converts a potentially encoded Global ID (GID) to its decoded form if it is a valid GID, otherwise returns undefined. |
| [isEncodedGID](functions/isEncodedGID.md)             | Checks if the provided string is an encoded GID.                                                                      |
| [isGID](functions/isGID.md)                           | Determines if the provided string is a valid GID.                                                                     |
| [isParsableToSID](functions/isParsableToSID.md)       | Checks if the provided value can be parsed into a Shopify ID (SID) with a minimum number of digits.                   |
| [toSID](functions/toSID.md)                           | Converts a GID to a Shopify ID (SID) if possible, considering a minimum number of digits.                             |
| [isSID](functions/isSID.md)                           | Determines if the provided value is a valid Shopify ID (SID), considering a minimum number of digits.                 |
| [shopifyMediaURL](functions/shopifyMediaURL.md)       | Generates a Shopify media URL with optional parameters for resizing and cropping.                                     |
| [parseSettingsGroup](functions/parseSettingsGroup.md) | -                                                                                                                     |
| [parseSingleSetting](functions/parseSingleSetting.md) | -                                                                                                                     |

## Type Aliases

| Type Alias                                                       | Description |
| ---------------------------------------------------------------- | ----------- |
| [ElementTags](type-aliases/ElementTags.md)                       | -           |
| [PageTypes](type-aliases/PageTypes.md)                           | -           |
| [BlockSchema](type-aliases/BlockSchema.md)                       | -           |
| [SectionSchema](type-aliases/SectionSchema.md)                   | -           |
| [BasicSettingType](type-aliases/BasicSettingType.md)             | -           |
| [SettingTypes](type-aliases/SettingTypes.md)                     | -           |
| [AllSettingTypes](type-aliases/AllSettingTypes.md)               | -           |
| [Setting](type-aliases/Setting.md)                               | -           |
| [SettingsMapped](type-aliases/SettingsMapped.md)                 | -           |
| [SingleSetting](type-aliases/SingleSetting.md)                   | -           |
| [Settings](type-aliases/Settings.md)                             | -           |
| [SettingGroup](type-aliases/SettingGroup.md)                     | -           |
| [ShopifySettingType](type-aliases/ShopifySettingType.md)         | -           |
| [SideBarSettingType](type-aliases/SideBarSettingType.md)         | -           |
| [SpecializedSettingType](type-aliases/SpecializedSettingType.md) | -           |
| [ThemeInfo](type-aliases/ThemeInfo.md)                           | -           |
| [GlobalSettingsSection](type-aliases/GlobalSettingsSection.md)   | -           |
| [GlobalSettingsSchema](type-aliases/GlobalSettingsSchema.md)     | -           |

## Variables

| Variable                                                          | Description |
| ----------------------------------------------------------------- | ----------- |
| [parseSectionSchema](variables/parseSectionSchema.md)             | -           |
| [parseBlockSchema](variables/parseBlockSchema.md)                 | -           |
| [parseSetting](variables/parseSetting.md)                         | -           |
| [parseThemeSettings](variables/parseThemeSettings.md)             | -           |
| [parseThemeSettingSection](variables/parseThemeSettingSection.md) | -           |
