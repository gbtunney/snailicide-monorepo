## Husky

-   **Husky Add Hook**

```shell
pnpm exec husky add .husky/commit-msg 'npx commitlint --edit $1'
```

## Commitlint

-   [Commitlint docs](https://commitlint.js.org/)
-   [Commitlint & Husky Reference](https://www.techiediaries.com/git-hooks-husky-commitlint/)

```shell
# Should not work:
git commit -a -m "Set up Husky and commitlint"

# Should work:
git commit -m 'feat: set up husky and commitlint'
```
