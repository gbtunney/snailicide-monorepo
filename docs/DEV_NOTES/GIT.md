# GIT NOTES!

-   Commit [Link](https://github.com/gbtunney/gbt-theme-dawn/commit/7035aaa754ba4f99b1ff1f245d9f882ef6951b96)

## Add package from commit hash

```sh
#link to specific commit on website:
open https://github.com/<user>/<repository>/commit/<commit-hash>

#download git archive (zip | tar.gz)  by branch or hash
wget https://github.com/<user>/<repository>/archive/<branch-or-commit>.zip

#add as dependency
 pnpm add -w -D git://github.com/gbtunney/gbt-theme-dawn.git#7035aaa754ba4f99b1ff1f245d9f882ef6951b96
```

## Test validate branch name

```sh
pnpm exec validate-branch-name -r "^(master|main|dev){1}$|^(feature|fix|hotfix|release)/.+$" -t feature/main
```

-   DIY lint-staged

todo: command below fails if file is deleted ( rather than updated )

```sh
git add \<files\>
pnpm run fix && pnpm run check
#echo diff HEAD list . ? idk cached vs staged??
git add $(git diff HEAD --cached --name-only)
pnpm commit
```

## Useful links

-   [Automate Semantic Versioning with Conventional Commits](https://medium.com/@jsilvax/automate-semantic-versioning-with-conventional-commits-d76a9f45f2fa)
-   [Git Annotated-Tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging#Annotated-Tags)

## Tags

```sh
git tag
#osgeolive-6.5
#v8.0

git tag -a v1.4 -m "my version 1.4"
##annotated tag
git show v1.4

#tag v1.4
##Tagger: Ben Straub <ben@straub.cc>
##Date:   Sat May 3 20:19:12 2014 -0700
#my version 1.4

git show-ref --tags
#e7e66977c1f34be5627a268adb4b9b3d59700e40 refs/tags/osgeolive-6.5
#8f27e65bddd7d4b8515ce620fb485fdd78fcdf89 refs/tags/v8.0

git tag -n5
#show 5 lines of annotation
```
