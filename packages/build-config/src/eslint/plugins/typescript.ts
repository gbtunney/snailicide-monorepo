import type { Config } from 'typescript-eslint'
import tsEslint from 'typescript-eslint'

export const tsEslintConfig = async (): Promise<Config> => {
    //const eslintRecommended: Config = await (tsEslint.configs.eslintRecommended as Config)
    return [
        ...(await tsEslint.configs.recommended),
        {
            rules: {
                '@typescript-eslint/no-namespace': 'warn',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/ban-types': [
                    'error',
                    {
                        types: {
                            'Boolean':
                                'Avoid using the `Boolean` type. Did you mean `boolean`?',
                            'Symbol':
                                'Avoid using the `Boolean` type. Did you mean `symbol`?',
                            'Number':
                                'Avoid using the `Number` type. Did you mean `number`?',
                            'String':
                                'Avoid using the `String` type. Did you mean `string`?',
                            'Object':
                                'Avoid using the `Object` type. Did you mean `object`?',
                            'Function':
                                'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                            /*
                             * Allow use of '{}' - we use it to define React components with no properties
                             */
                            '{}': false,
                        },
                    },
                ],

                '@typescript-eslint/explicit-function-return-type': 'error',
                '@typescript-eslint/array-type': [
                    'error',
                    { default: 'generic' },
                ],
            },
        },
    ]
}

export default tsEslintConfig
