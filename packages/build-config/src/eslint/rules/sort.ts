// @ts-expect-error: No declaration file or types for this
import sortPlugin from 'eslint-plugin-sort'
import type { Config } from 'typescript-eslint'

/** @see [How to quickly configure ESLint for import sorting](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853) */
export const sortRules = (): Config => [
    sortPlugin.configs['flat/recommended'],
    {
        name: 'SORT IMPORTS & EXPORTS : ERROR',
        rules: {
            'import/order': [
                'error',
                {
                    alphabetize: { caseInsensitive: true, order: 'asc' },
                    groups: [
                        'external',
                        'builtin',
                        'internal',
                        'sibling',
                        'parent',
                        'index',
                    ],
                    pathGroups: [
                        { group: 'internal', pattern: 'components' },
                        { group: 'internal', pattern: 'common' },
                        { group: 'internal', pattern: 'routes/**' },
                        {
                            group: 'internal',
                            pattern: 'assets/**',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['internal'],
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
            /** Use import instead of Sort p;ugins sorter for imports only */
            'sort/imports': 'off',
        },
    },
]
