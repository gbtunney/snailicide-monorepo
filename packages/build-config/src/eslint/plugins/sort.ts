// @ts-expect-error: No declaration file or types for this
import sortPlugin from 'eslint-plugin-sort'
import { Config } from 'typescript-eslint'
/** @see [How to quickly configure ESLint for import sorting](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853) */
export const importSortConfig = async (): Promise<Config> => [
    sortPlugin.configs['flat/recommended'],
    {rules: {
            'import/order': [
                'error',
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
            'sort/exports': [
                'error',
                {
                    caseSensitive: false,
                    groups: [],
                    natural: true,
                    typeOrder: 'preserve',
                },
            ],
        },
    },
]

export default importSortConfig
