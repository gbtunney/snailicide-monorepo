//@ts-expect-error No declaration file or types for this
import importPlugin from 'eslint-plugin-import'
import { Config } from 'typescript-eslint'

export const importConfig: Config = [
    {
        plugins: { ['simple-import-sort']: importPlugin },
        rules: {
            // We often use @remarks or other ad-hoc tag names
            'simple-import-sort/imports': 'error',
        },
    },
]

export default importConfig
