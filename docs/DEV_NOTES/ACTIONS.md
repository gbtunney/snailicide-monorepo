# Github Actions

```shell
gh act
```

```yaml
on: push
jobs:
  deploy:
    if: ${{ !github.event.act }} # skip during local actions testing
    runs-on: ubuntu-latest
    steps:
    - run: exit 0

- name: Some step
  if: ${{ !env.ACT }}
  run: exit 0
```

## Helpful Links

-   [nektos/act: Run your GitHub Actions locally 🚀](https://github.com/nektos/act)
-   [Introduction - act - User Guide](https://nektosact.com/)
-   [remote](https://github.com/marketplace/actions/deploy-to-github-pages)
-   [kiegroup/act-js: A node.js wrapper for nektos/act to programmatically run your github actions locally](https://github.com/kiegroup/act-js)
-   [Caching dependencies to speed up workflows - GitHub Docs](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

## Notes

Act can be installed as a GitHub CLI extension:

```shell
gh extension install https://github.com/nektos/gh-act
```

> -r, --reuse: don't remove container(s) on successfully completed workflow(s) to maintain state between runs
