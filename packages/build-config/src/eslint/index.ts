/**
 * Eslint / Tslint Configuration
 *
 * @see [eslint - Find and fix problems in your JavaScript code.](https://eslint.org/)
 * @see [typescript-eslint](https://typescript-eslint.io/getting-started/)
 */
import { flatEslintConfig } from "./base.js"

/** @ignore */
export const EsLint: {
    config: typeof flatEslintConfig
    flatConfig: typeof flatEslintConfig
} = {
    config: flatEslintConfig,
    flatConfig: flatEslintConfig,
}

export { flatEslintConfig } from "./base.js"
export { flatEslintConfig as config } from "./base.js"
export type { Config as EslintConfig } from "typescript-eslint"
export type { Config as TsConfig } from "typescript-eslint"
