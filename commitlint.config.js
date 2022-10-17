/**
 * @file Commitlint configuration for the Monorepo.
 * @author Gillian Tunney
 * @see [commitlint - Lint commit messages](https://commitlint.js.org/#/)
 */

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-empty': [2, 'never'],
        'scope-enum': [
            2,
            'always',
            [
                'root',
                '@snailicide/build-config',
                '@snailicide/template-cli',
                '@snailicide/g-library'
            ],
        ],
    },
}
