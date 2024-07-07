//@ts-expect-error No declaration file or types for this
import filenamesPlugin from 'eslint-plugin-filenames'
import { Config } from 'typescript-eslint'

export const filenamesConfig = async (): Promise<Config> => [
    {
        plugins: { ['filenames']: filenamesPlugin },
        rules: {
            // We often use @remarks or other ad-hoc tag names
            'simple-import-sort/imports': 'error',
        },
    },
    {
        //  ...await filenamesPlugin.configs.recommended
    },
]

export default filenamesConfig
