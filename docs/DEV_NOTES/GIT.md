#GIT NOTES!

-   DIY lint-staged

```shell
git add <files>
pnpm run fix && pnpm run check
#echo diff HEAD list . ? idk cached vs staged??
git add $(git diff HEAD --cached --name-only)
pnpm commit
```
