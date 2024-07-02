/**
 * @file Manages the base configuration for ESLint.
 * @author Gillian Tunney
 * @see {@link https://www.npmjs.com/package/@typescript-eslint/eslint-plugin | @typescript-eslint/eslint-plugin}
 * @see {@link https://github.com/epaew/eslint-plugin-filenames-simple | eslint-plugin-filenames-simple}
 * @see {@link https://www.npmjs.com/package/eslint-import-resolver-typescript | eslint-import-resolver-typescript}
 * @see {@link https://www.npmjs.com/package/eslint-plugin-import | eslint-plugin-import}
 */
import type { Linter } from 'eslint'

const options: Linter.BaseConfig = {
    // root: true,
}
export const baseOptions = options
export default options
