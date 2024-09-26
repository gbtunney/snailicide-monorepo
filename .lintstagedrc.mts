import type { LintStagedConfig } from '@snailicide/build-config'
import {
    getFileExtensionList,
    JSLIKE_FILE_EXTENSIONS,
    PRETTIER_FILE_EXTENSIONS,
} from '@snailicide/build-config'

const getLintStagedConfig = (): LintStagedConfig => {
    const jsExt = getFileExtensionList(JSLIKE_FILE_EXTENSIONS)
    const prettierExt = getFileExtensionList<true>(PRETTIER_FILE_EXTENSIONS)
    const mdExt = getFileExtensionList<true>(['md'])

    const configExample: LintStagedConfig = {
        /** Markdown */
        [`*.${mdExt.toString()}`]: [
            'prettier --write',
            "pnpm exec markdownlint-cli2 '{./*,./**/*}.md' '#**/{node_modules,docs}/**' '#./packages/{vite-plugin-shopify-liquid-modules,vite-plugin-shopify-theme-schema,g-shopify-library,cli-template}' --fix",
        ],
        /** JS-Like Files */
        [`*.{${jsExt.toString()}}`]: [
            'prettier --write',
            'eslint --fix --debug',
        ],

        /** Misc Prettier Files todo: update in root scripts */
        [`*.{${prettierExt.toString()}}`]: 'prettier --write',

        /** Shell Scripts and Ignores */
        '.gitignore': 'prettier --write',
        '.husky/**/*': 'prettier --write',
    }
    console.log('LINT-STAGED CONFIG IS::', configExample)
    return configExample
}

export default getLintStagedConfig()
