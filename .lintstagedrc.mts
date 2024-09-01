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
        [`*.${mdExt.toString()}`]: [
            'prettier --write',
            'pnpm exec markdownlint --config=node_modules/@snailicide/build-config/dist/.markdownlint.json --fix',
        ],
        [`*.{${jsExt.toString()}}`]: [
            'eslint --fix --debug',
            'prettier --write',
        ],
        [`*.{${prettierExt.toString()}}`]: 'prettier --write',
        '.gitignore': 'prettier --write',
        '.husky/**/*': 'prettier --write',
    }
    console.log('TTHE jsExt RESULT ISSS', configExample)

    return configExample
}

export default getLintStagedConfig()
