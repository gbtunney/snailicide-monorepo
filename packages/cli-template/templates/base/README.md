<h1 align="center">Welcome to {{packageName}}👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-{{version}}-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: {{license}}" src="https://img.shields.io/badge/License-{{license}}-yellow.svg" />
  </a>
</p>

> {{description}}

## Repository

[{{repositoryName}}](https://github.com/{{repositoryOwner}}/{{repositoryName}}.git)

## Author

👤 **{{author_name}}**

-   [github](https://github.com/{{repositoryOwner}})
-   [email](mailto:{{author_email}})

# {{sentenceCase packageName}}

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
## For pnpm workspace, use the command below.
pnpm add {{packageName}}@workspace:*

pnpm --filter=[yourGlob] add {{packageName}}@workspace:*
```

## Build

```sh
pnpm --filter={{packageName}} build
```

## Tests

```sh
pnpm --filter={{packageName}} test
```
