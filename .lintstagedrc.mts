import {
    getFileExtensionList,
    JSLIKE_FILE_EXTENSIONS,
    PRETTIER_FILE_EXTENSIONS,
} from '@snailicide/build-config'

const mdIgnores = [
    '#**/{node_modules,.changeset,docs,.history}/**',
    '#packages/cli-template/templates/**/*',
]

/**
 * Minimal shell-safe single-quote wrapper
 */
const shQuote = (s: string): string => `'${s.replace(/'/g, `'\\''`)}'`

const getLintStagedConfig = () => {
    const jsExt = getFileExtensionList(JSLIKE_FILE_EXTENSIONS)
    const prettierExt = getFileExtensionList<true>(PRETTIER_FILE_EXTENSIONS)
    const mdExt = getFileExtensionList<true>(['md'])

    return {
        /**
         * Markdown (warn-only)
         */
        [`*.${mdExt.toString()}`]: (stagedFiles: string | Array<string>) => {
            const list = Array.isArray(stagedFiles)
                ? stagedFiles
                : [stagedFiles]
            const files = list.map(shQuote).join(' ')
            const ignores = mdIgnores.map(shQuote).join(' ')
            // Use a shell so || true is honored
            return [
                `bash -lc "pnpm exec markdownlint-cli2 --config ./.markdownlint-cli2.mjs ${files} ${ignores} || true"`,
            ]
        },

        // JS-like
        [`*.{${jsExt.toString()}}`]: [
            'prettier --write',
            'eslint --fix --debug',
        ],

        // Misc Prettier
        [`*.{${prettierExt.toString()}}`]: 'prettier --write',

        // Shell/ignore
        '.gitignore': 'prettier --write',
        '.husky/**/*': 'prettier --write',
    }
}

export default getLintStagedConfig()
