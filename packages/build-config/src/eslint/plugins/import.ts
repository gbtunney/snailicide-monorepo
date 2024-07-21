import { Config } from 'typescript-eslint'

export const importConfig = async (): Promise<Config> => [
    {
        rules: {
            'import/extensions': ['error', 'ignorePackages'],
            'import/no-default-export': 'error',
            'import/no-duplicates': 'warn',
        },
    },
]

export default importConfig
