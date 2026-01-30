import {
    markdownlint,
    MarkdownlintConfiguration,
} from '@snailicide/build-config'

const options: MarkdownlintConfiguration = {
    config: {
        //"MD002": false,
    },
    gitignore: true,
    ignores: [
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/.github/instructions/**',
        '**/.husky/**',
        '**/coverage/**',
        '**/{.changeset,docs}/**',
        'packages/cli-template/templates/**/*',
    ],
}

export default await markdownlint.config.get(options, { throwOnError: true })
//@todo: this will take extra properties that are not in the schema wtf
//console.log(await markdownlint.rules.validate(options.config,{throwOnError:true} ) )
