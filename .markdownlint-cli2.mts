import { markdownlint } from '@snailicide/build-config'
export const mdlint = { config: markdownlint.config({}) }
// @ts-check

const options = {
    config: {
        'MD032': false,
        'no-multiple-blanks': false,
    },
}

export default mdlint
