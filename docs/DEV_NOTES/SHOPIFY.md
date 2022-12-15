# Shopify

```sh
pnpm add -D @shopify/cli @shopify/theme
```

```gitignore
#add file .npmrc if cli wont work in monorepo
node-linker=hoisted
```

-   Populate store products

```sh
#populate sample products - download csv
curl https://shopify.dev/csv/theme-store-testing-shop-product-data.csv --output shop-product-data.csv
#then import in admin.
```

## Theme editor

-   [detect theme editor](https://shopify.dev/themes/architecture/sections/integrate-sections-with-the-theme-editor#detect-the-theme-editor)
-   [theme editor **docs**](https://shopify.dev/themes/tools/online-editor)

## CLI

-   [Shopify CLI commands for themes](https://shopify.dev/themes/tools/cli/commands)

## **Shopify GitHub integration**

-   [Shopify GitHub integration for themes](https://shopify.dev/themes/tools/github)

-   [Installed GitHub Apps Settings](https://github.com/settings/installations)

-   theme push (no github integration)

```shell
shopify theme push --theme 139439341858 --json

# for mode=development (editor sync enabled)
shopify theme dev --theme 139439341858 --theme-editor-sync --store gbt-vite-test.myshopify.com
```

-   Clone theme

```sh
#get theme download, then preview.
mkdir gbt-dawn gbt-dawn/temp && cd gbt-dawn/temp && wget https://github.com/gbtunney/gbt-theme-dawn/archive/development.zip && unzip * && rm *.zip && mv **/* .. && cd .. && rm -rf temp && cd ..
#then
shopify theme push --unpublished
```
