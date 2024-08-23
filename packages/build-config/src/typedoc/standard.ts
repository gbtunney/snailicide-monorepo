import { TypeDocOptions } from 'typedoc'
import fs from 'fs'
import * as path from 'path'

export type MaterialThemeOptions = {
    themeColor?: string
}
export type TypedocConfig = Partial<TypeDocOptions>

export const config = (__dirname: string): undefined | TypedocConfig => {
    const resolvedDirname = path.resolve(__dirname)
    if (!fs.existsSync(resolvedDirname)) {
        console.error('The directory ', resolvedDirname, ' does not exist.')
    } else {
        /* eslint sort/object-properties:off */
        const options: TypedocConfig = {
            /** This config uses a standard entrypoint */
            entryPoints: [path.resolve(`${resolvedDirname}/src/index.ts`)],
            tsconfig: path.resolve(`${resolvedDirname}/src/`),
            readme: path.resolve(`${resolvedDirname}/README.md`),
            out: path.resolve(`${resolvedDirname}/docs`),
            exclude: [
                '**/*.test.ts',
                'node_modules/**/*',
                '**/node_modules/**/*',
            ],
            excludeExternals: false,
            gitRevision: 'master',
            plugin: ['typedoc-plugin-zod'],
        }
        return options
    }
    return undefined
}

export const materialTheme = (
    __dirname: string,
): undefined | (TypedocConfig & MaterialThemeOptions) => {
    const standardConfig: TypedocConfig | undefined = config(__dirname)
    if (standardConfig !== undefined) {
        const options: TypedocConfig & MaterialThemeOptions = {
            ...standardConfig,
            plugin: ['typedoc-material-theme', 'typedoc-plugin-zod'],
            themeColor: '#cb9820',
        }
        return options
    }
    return undefined
}

export default config
