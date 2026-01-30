import {
    getFileExtensionList,
    JSLIKE_FILE_EXTENSIONS,
    PRETTIER_FILE_EXTENSIONS,
} from '@snailicide/build-config'
import { execSync } from 'node:child_process'

const mdIgnores = [
    '#**/{node_modules,.changeset,docs,.history}/**',
    '#packages/cli-template/templates/**/*',
]

/** Minimal shell-safe single-quote wrapper */
const shQuote = (s: string): string => `'${s.replace(/'/g, `'\\''`)}'`

const isWipBranch = (): boolean => {
    try {
        const b = execSync('git rev-parse --abbrev-ref HEAD', {
            encoding: 'utf8',
        }).trim()
        return /^wip\//.test(b)
    } catch {
        return false
    }
}

const getLintStagedConfig = () => {
    const jsExt = getFileExtensionList(JSLIKE_FILE_EXTENSIONS)
    const prettierExt = getFileExtensionList<true>(PRETTIER_FILE_EXTENSIONS)
    const mdExt = getFileExtensionList<true>(['md'])
    const wip = isWipBranch()

    return {
        /** Markdown (warn-only) */
        [`*.${mdExt.toString()}`]: (stagedFiles: string | Array<string>) => {
            const list = Array.isArray(stagedFiles)
                ? stagedFiles
                : [stagedFiles]
            const files = list.map(shQuote).join(' ')
            const ignores = mdIgnores.map(shQuote).join(' ')
            return [
                `bash -lc "pnpm exec markdownlint-cli2 --config ./.markdownlint-cli2.mjs ${files} ${ignores} || true"`,
            ]
        },

        /** JS-like: always run Prettier; ESLint is non-blocking on wip/ */
        [`*.{${jsExt.toString()}}`]: (stagedFiles: string | Array<string>) => {
            const list = Array.isArray(stagedFiles)
                ? stagedFiles
                : [stagedFiles]
            const files = list.map(shQuote).join(' ')
            if (wip) {
                return [
                    `pnpm exec prettier --write ${files}`,
                    `bash -lc "pnpm exec eslint --fix --debug ${files} || true"`,
                ]
            }
            return [
                `pnpm exec prettier --write ${files}`,
                `pnpm exec eslint --fix --debug ${files}`,
            ]
        },

        /** Misc Prettier */
        [`*.{${prettierExt.toString()}}`]: (
            stagedFiles: string | Array<string>,
        ) => {
            const list = Array.isArray(stagedFiles)
                ? stagedFiles
                : [stagedFiles]
            const files = list.map(shQuote).join(' ')
            return [`pnpm exec prettier --write ${files}`]
        },

        '.gitignore': 'prettier --write',
        '.husky/**/*': 'prettier --write',
    }
}

export default getLintStagedConfig()
