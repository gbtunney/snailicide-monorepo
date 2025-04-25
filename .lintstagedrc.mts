import {
    getFileExtensionList,
    JSLIKE_FILE_EXTENSIONS,
    PRETTIER_FILE_EXTENSIONS,
} from '@snailicide/build-config'

//TODO: figure out a way this is not utterly ridiculous
const mdIgnores = [
    '#**/{node_modules,.changeset,docs}/**',
    '#packages/cli-template/templates/**/*',
]

/** TODO: had to remove the type so i could use staged function */
const getLintStagedConfig = () => {
    const jsExt = getFileExtensionList(JSLIKE_FILE_EXTENSIONS)
    const prettierExt = getFileExtensionList<true>(PRETTIER_FILE_EXTENSIONS)
    const mdExt = getFileExtensionList<true>(['md'])

    const configExample = {
        /** Markdown */
        [`*.${mdExt.toString()}`]: (stagedFiles: string | Array<string>) => {
            const files = Array.isArray(stagedFiles)
                ? stagedFiles.join(' ')
                : stagedFiles
            return [
                'pnpm prettier --write',
                `pnpm exec markdownlint-cli2 ${files} ${mdIgnores.join(' ')}`,
                //`pnpm run fix:md ${files} ${mdIgnores.join(' ')}`,
            ]
        },

        /** JS-Like Files */
        [`*.{${jsExt.toString()}}`]: [
            'prettier --write',
            'eslint --fix --debug',
        ],

        /** Misc Prettier Files */
        [`*.{${prettierExt.toString()}}`]: 'prettier --write',

        /** Shell Scripts and Ignores */
        '.gitignore': 'prettier --write',
        '.husky/**/*': 'prettier --write',
    }
    return configExample
}

export default getLintStagedConfig()
