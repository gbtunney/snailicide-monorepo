//@ts-expect-error No declaration file or types for this
import importPlugin from 'eslint-plugin-import'
import { Config } from 'typescript-eslint'

export const importConfig = async (): Promise<Config> => [
    {
        plugins: { ['import']: importPlugin },
        rules: {
            'import/extensions': ['error', 'ignorePackages'],
            'import/no-duplicates': 'warn',
        },
    },
]

export default importConfig
