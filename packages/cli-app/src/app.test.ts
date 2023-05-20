import { unResolvedAppOptions, initApp } from './app.js'
import { BaseArgs, base_schema } from './schema.js'
import { zod, node } from '@snailicide/g-library'
import { z } from 'zod'

const OPTIONS: unResolvedAppOptions = {
    name: 'Example App',
    description: 'This is an example to demonstrate use',
}

const transformFunc = (value: z.output<typeof base_schema>) => {
    const outDir =
        value.outDir !== undefined
            ? zod.filePath.parse(node.getFullPath(value.outDir, value.rootDir))
            : value.outDir
    return { ...value, outDir }
}
const initFunc = (args: BaseArgs) => {
    if (args.verbose === true) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
    return true
}
describe('cli-app', () => {
    it('returns `true` if merged schema is parsable', () => {
        const test_schema = base_schema.transform(transformFunc)
        const my_custom_schema = base_schema
            .merge(
                z.object({
                    my_custom_prop: z.string().default('hello'),
                })
            )
            .transform(transformFunc)

        expect(initApp(base_schema, initFunc, OPTIONS)).toBe(true)
        expect(initApp(test_schema, initFunc, OPTIONS)).toBe(true)
        expect(initApp(my_custom_schema, initFunc, OPTIONS)).toBe(true)
    })
})
export {}
