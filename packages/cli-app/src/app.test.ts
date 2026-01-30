import { expect, test } from 'vitest'

/* eslint-disable  vitest/no-commented-out-tests */
/*import { node, zod } from '@snailicide/g-library/node'
import { z } from 'zod'
import {mergeSchemas}from './helpers.js'

import { commonFlagsSchema, CommonFlagsSchema } from './app-options.js'
import { initApp, InitSuccessCallback } from './app.js'

import { WrappedSchema, wrapSchema, ZodObjectSchema } from './helpers.js'

//TODO: THis test is a MESS!
const OPTIONS = {
    description: 'This is an example to demonstrate use',
    name: 'Unit Test',
    version: '1.0.0',
}

const transformFunc = <Schema extends ZodObjectSchema>(
    value: z.output<Schema>,
): z.output<Schema> => {
    const outDir =
        value['outDir'] !== undefined
            ? zod
                  .filePath()
                  .parse(node.getFullPath(value['outDir'], value['rootDir']))
            : value['outDir']
    return { ...value, outDir }
}

const initFunc = <Schema extends ZodObjectSchema = typeof commonFlagsSchema>(
    args: z.infer<Schema>,
): true => {
    if (args['verbose']) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
    return true
}

const schemaA = z.object({
    thisisstupid: z.string().default('hello'),
})

const newcommonflags: CommonFlagsSchema =
    wrapSchema<CommonFlagsSchema>(commonFlagsSchema)
const testmeschema = newcommonflags.merge(schemaA)
const testmeschema2 = wrapSchema<typeof testmeschema>(testmeschema)

describe('cli-app', () => {
    test('returns `true` if merged schema is parsable', async () => {
        const custom_schema = z.object({
            my_custom_prop: z.string(),
        })

const my_merged_schema = mergeSchemas(commonFlagsSchema, custom_schema)
            .describe('this is a sample app that is made of fun')

const initFunc: InitSuccessCallback<typeof my_merged_schema> =  (
            
        const initFuncB: InitSuccessCallback<typeof my_merged_schema> = (
            args: z.infer<typeof my_merged_schema>,
        ) => {
            if (args['my_custom_prop']) {
                console.warn('RESOLVED APP ARGS: ', args)
            }
            console.log(JSON.stringify(args))
            return true
        }
        // @ts-expect-error: "THIS is the output thing
        const testingtesting: z.infer<MergedSchema> = {
            my_custom_prop: 'hello',
            outDir: 'hello',
            verbose: true,
        }

        const testme: z.input<MergedSchema> = {
            my_custom_prop: 'gggg',
            outDir: 'hello',
        }

        expect(
            await initApp<typeof commonFlagsSchema>(
                commonFlagsSchema,
                OPTIONS,
                initFunc,
                true,
            ),
        ).toBe(undefined)
        expect(
            await initApp<typeof my_merged_schema>(
                my_merged_schema,
                OPTIONS,
                initFuncB,
                true,
            ),
        ).toBe(undefined)
        // expect(await initApp<typeof newschema>(newschema, OPTIONS, initFunc<typeof newschema>)).toBeDefined()
        //expect(await initApp<typeof testmeschema2>(testmeschema2, OPTIONS, initFunc2<typeof testmeschema2>)) //.toBeDefined()

        /*expect(
            await initApp<typeof my_custom_schema>(my_custom_schema,  OPTIONS,initFunc )[
                '--rootDir',
                '33',
            ]) ).toBeUndefined()
    }
})*/
test('todo: fix', () => {
    expect(true).toBe(true)
})
