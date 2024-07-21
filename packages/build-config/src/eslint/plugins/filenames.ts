//@ts-expect-error No declaration file or types for this
import { Config } from 'typescript-eslint'

export const filenamesConfig = async (): Promise<Config> => [
    {
        //  ...await filenamesPlugin.configs.recommended
    },
]

export default filenamesConfig
