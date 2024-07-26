import { TypeDocOptions } from 'typedoc'
import fs from 'fs'
import * as path from 'path'

export type TypedocConfig = Partial<TypeDocOptions>

export const config = (__dirname: string): undefined | TypedocConfig => {
    const resolvedDirname = path.resolve(__dirname)
    if (!fs.existsSync(resolvedDirname)) {
        console.error('The directory ', resolvedDirname, ' does not exist.')
    } else {
        /* eslint sort/object-properties:off */
        const options: Partial<TypeDocOptions> = {
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
            excludeExternals: true,
        }
        return options
    }
    return undefined
}

export default config
