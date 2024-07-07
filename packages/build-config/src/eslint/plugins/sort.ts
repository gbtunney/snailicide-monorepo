import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import { Config } from 'typescript-eslint'

export const importSortConfig = async (): Promise<Config> => [
    {
        plugins: { ['simple-import-sort']: simpleImportSortPlugin },
        rules: {
            // We often use @remarks or other ad-hoc tag names
            'simple-import-sort/imports': 'error',
        },
    },
]

export default importSortConfig
