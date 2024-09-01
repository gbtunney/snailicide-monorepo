import type { Merge, PartialDeep, UndefinedOnPartialDeep } from 'type-fest'
import { TypeDocOptions } from 'typedoc'
import fs from 'fs'
import path from 'path'

export type TypedocConfigFunction<Type extends object = TypeDocOptions> = (
    __dirname: string,
    _options?: TypedocOptions<Type>,
) => undefined | TypedocOptions<Type>
export type TypedocOptions<Type extends object = TypeDocOptions> = PartialDeep<
    UndefinedOnPartialDeep<Merge<TypeDocOptions, Type>>
>

export type TypedocFileOptions = Pick<
    TypeDocOptions,
    'entryPoints' | 'tsconfig' | 'readme' | 'out' | 'exclude' | 'gitRevision'
>
export const fileSharedOptions = (
    __dirname: string,
): undefined | TypedocOptions => {
    const resolvedDirname = path.resolve(__dirname)
    if (!fs.existsSync(resolvedDirname)) {
        console.error('The directory ', resolvedDirname, ' does not exist.')
        return undefined
    } else {
        /* eslint sort/object-properties:off */
        const options: TypedocOptions = {
            /** This uses a "module" format, using the index of each subfolder */
            entryPoints: [path.resolve(`${resolvedDirname}/src/index.ts`)],
            tsconfig: path.resolve(`${resolvedDirname}/src/tsconfig.json`),
            readme: path.resolve(`${resolvedDirname}/README.md`),
            out: path.resolve(`${resolvedDirname}/docs`),
            exclude: [
                '**/*.test.ts',
                'node_modules/**/*',
                '**/node_modules/**/*',
            ],
            gitRevision: 'master',
        }
        return options
    }
}
