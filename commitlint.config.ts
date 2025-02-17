/**
 * @file Commitlint configuration for the Monorepo.
 * @author Gillian Tunney
 * @see [commitlint - Lint commit messages](https://commitlint.js.org/#/)
 */
import { commitlint, CommitlintUserConfig } from '@snailicide/build-config'

const Configuration: CommitlintUserConfig = commitlint.configuration([
    'root',
    'build-config',
    'g-library',
    'g-windi',
    'cli-app',
    'cli-template',
    'g-shopify-library',
    'vite-shopify-modules',
    'vite-shopify-theme-schema',
])

export default Configuration
