# boilerplates

```ts
export type InternalModuleFormat =
    | 'amd'
    | 'cjs'
    | 'es'
    | 'iife'
    | 'system'
    | 'umd'
export type ImportAttributesKey = 'with' | 'assert'
export type ModuleFormat =
    | InternalModuleFormat
    | 'commonjs'
    | 'esm'
    | 'module'
    | 'systemjs'
```

## Formats

-   browser: (format) iife
    -   Exports
        -   "." : index.js || "module_name": "{fileName}".js
            -   "browser.default": {{output_dir}}/{{fileName}}-iife{{?min}}.js
-   commonjs: (format) cjs

    -   Exports
        -   "." : index.cjs || "module_name": "{fileName}".cjs
            -   "require": {{output_dir}}/{{fileName}}.{{?min}}.cjs

-   esmodule: (format) mjs

    -   Exports
        -   "." : index.mjs || "module_name": "{fileName}".mjs
            -   "import": {{output_dir}}/{{fileName}}.{{?min}}.mjs

-   x "import": "./dist/index.js", MJS root: module
-   "types": "./types/index.d.ts", d.ts root: types
-   x "require": "./dist/index.cjs", root: commonjs
-   x "default": "./dist/index.js" esm ( bundled? )
-   x "browser.default" index-iife.js + min :: root:cdn
-   -   x "browser.import" index-js + min

```shell
my-awesome-lib
├── lib/
│   ├── whole-lib.browser.js (iife format)
│   ├── public-module-a.cjs  (commonjs format)
│   ├── public-module-a.mjs  (esmodule format)
│   ├── public-module-b.cjs
│   ├── public-module-b.mjs
│   └── internals/
│       ├── private-module-c.cjs
│       └── private-module-c.mjs
├── package.json
└──
```

```json
{
    "name": "my-awesome-lib",
    "exports": {
        ".": {
            "browser": {
                "default": "./lib/whole-lib.browser.js"
            }
        },
        "module-a": {
            "import": "./lib/public-module-a.mjs",
            "require": "./lib/public-module-a.cjs"
        },
        "module-b": {
            "import": "./lib/public-module-b.mjs",
            "require": "./lib/public-module-b.cjs"
        }
    }
}
```

UMD (Universal Module Definition): this will support the use of a script tag, and RequireJS. As the consuming app will not be transpiling or bundling the code themselves, we need to provide a version of our library that is minified and transpiled for wide browser support. ESM (ES2015 Module): this will allow bundlers to import our application, elimintate dead code and transpile it down to the level they choose. We’re still compiling the code, but just providing it in a format that’s convenient for consumers and letting them decide what to do next. This will allow the import keyword to work. CJS (CommonJS): the format of choice for Node.js. No tree-shaking needed here as code size doesn’t matter as much, this format allows the use of the require keyword in a node application. For each of these format, we will also provide a source map so consumers can debug the library should they need to.
