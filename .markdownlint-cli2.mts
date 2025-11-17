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
        'MD047/indent': 'false',
    },ignores:[
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/.husky/**',
        '**/coverage/**',
        '**/{.history,.changeset,docs}/**'
       // '#**/{node_modules,.github/instructions/**,.history,.changeset,docs}/**' 
    ],gitignore: true,

}
export default { ...mdlint, ...options }
