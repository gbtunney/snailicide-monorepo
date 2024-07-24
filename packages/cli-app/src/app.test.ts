import { node, zod } from '@snailicide/g-library/node'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { initApp, InitFunction } from './app.js'
import { base_schema, unResolvedAppOptions } from './schema.js'

const OPTIONS: unResolvedAppOptions = {
    description: 'This is an example to demonstrate use',
    name: 'Unit Test',
}

const transformFunc = (value: z.output<typeof base_schema>) => {
    const outDir =
        value.outDir !== undefined
            ? zod.filePath.parse(node.getFullPath(value.outDir, value.rootDir))
            : value.outDir
    return { ...value, outDir }
}

const initFunc: InitFunction<typeof base_schema> = (args) => {
    if (args.verbose) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
    return true
}
describe('cli-app', () => {
    test('returns `true` if merged schema is parsable', async () => {
        const test_schema = base_schema.transform(transformFunc)
        const my_custom_schema = base_schema
            .merge(
                z.object({
                    my_custom_prop: z.string().default('hello'),
                }),
            )
            .transform(transformFunc)

        expect(await initApp(base_schema, initFunc, OPTIONS)).toBeDefined()
        expect(await initApp(test_schema, initFunc, OPTIONS)).toBeDefined()
        expect(await initApp(my_custom_schema, initFunc, OPTIONS)).toBeDefined()
        expect(
            await initApp(my_custom_schema, initFunc, OPTIONS, [
                '--rootDir',
                '33',
            ]),
        ).toBeUndefined()
    })
})
export {}
