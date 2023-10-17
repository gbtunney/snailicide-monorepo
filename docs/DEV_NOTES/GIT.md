# GIT NOTES!

-   name: Deploy GitHub Pages site uses: actions/deploy-pages@v1.2.9

-   Commit [Link](https://github.com/gbtunney/gbt-theme-dawn/commit/7035aaa754ba4f99b1ff1f245d9f882ef6951b96)

## Init instructions

-   create a new repository on the command line
    ```shell
    echo "# test2" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin git@github.com:gbtunney/test2.git
    git push -u origin main
    ```
-   push an existing repository from the command line
    ```shell
    git remote add origin git@github.com:gbtunney/test2.git
    git branch -M main
    git push -u origin main
    ```

## Add package from commit hash

```sh
#link to specific commit on website:
open https://github.com/<user>/<repository>/commit/<commit-hash>

#download git archive (zip | tar.gz)  by branch or hash
wget https://github.com/<user>/<repository>/archive/<branch-or-commit>.zip

#add as dependency
 pnpm add -w -D git://github.com/gbtunney/gbt-theme-dawn.git#7035aaa754ba4f99b1ff1f245d9f882ef6951b96
```

## STASH CHANGES!!!

-   **Stash single file**: `git stash -m "Description of scope" -- <file>`

-   **Restore from stash, then delete**: `git stash pop`

-   Files can be stashed with comments. `git stash push -m "Change comment" -- file1.txt`

-   View stash: `git stash list`

-   Creating a Copy of a Stashed File Under a Different Filename `git show stash@{0}:stashed_file.rb > copy_of_stashed_file.rb`

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

## Repo merging notes

-   [Git Filter Repo](https://github.com/newren/git-filter-repo#how-do-i-install-it)

```shell
#remove all other files and history except path
git filter-repo --path packages/g-shopify-library
```

-   Merge git repositories

```shell
cd repo-b
git remote add repo-a ../repo-a
git fetch repo-a
git merge --allow-unrelated-histories a/main
git remote remove repo-a

#then use the git filter-repo
```

-   push an existing repository from the command line

````shell
git remote add origin git@github.com:gbtunney/junk.git
git branch -M main
git push -u origin main```
````
