## Husky

-   **Husky Add Hook**

```shell
pnpm exec husky add .husky/commit-msg 'npx commitlint --edit $1'
pnpm exec git-branch-is --not main
```

## Prevent Direct Commits

-   `pnpm exec git-branch-is  -i -r "^feat/"`
-   `pnpm exec git-branch-is  -i -r "^feat/"`

## Commitlint

-   [Commitlint docs](https://commitlint.js.org/)
-   [Commitlint & Husky Reference](https://www.techiediaries.com/git-hooks-husky-commitlint/)

```shell
# Should not work:
git commit -a -m "Set up Husky and commitlint"

# Should work:
git commit -m 'feat: set up husky and commitlint'
```
