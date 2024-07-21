import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import { Config } from 'typescript-eslint'

/** @see [How to quickly configure ESLint for import sorting](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853) */
export const importSortConfig = async (): Promise<Config> => [
    {
        plugins: { ['simple-import-sort']: simpleImportSortPlugin },
        rules: {
            // We often use @remarks or other ad-hoc tag names
            //'simple-import-sort/imports': 'error',
            'import/order': [
                1,
                {
                    groups: [
                        'external',
                        'builtin',
                        'internal',
                        'sibling',
                        'parent',
                        'index',
                    ],
                },
            ],
        },
    },
]

export default importSortConfig
