import { markdownlint } from '@snailicide/build-config'
export const mdlint = { config: markdownlint.config({}) }
// @ts-check

const options = {
    config: {
        //'MD013/line-length': false,
        // @TODO: Temporarily disabled rules - review later - has to do with fixer and prettier sucking
        MD013: false,
        // 'MD046/code-block-style': { style: 'indented' },
        MD046: false,
    },
}
export default { ...mdlint, ...options }
