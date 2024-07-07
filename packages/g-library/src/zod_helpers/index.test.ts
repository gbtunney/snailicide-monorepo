import { expect, test } from 'vitest'
import z from 'zod'
import { isZodParsable, ensureArray, parseFactory } from './index.js'

test('zod helpers', () => {
    expect(true).toBe(true)

    const getArrSchemaTest = ensureArray(z.string())
    console.log('parseee', getArrSchemaTest.parse('zzzz'))
    // console.log("parseee" ,getArrSchema.default('55').parse( undefined ))

    // parseFactory(getArrSchema.default('55') )( 33)

    const inputS: z.input<typeof getArrSchemaTest> = ['33']
    const inputt: z.output<typeof getArrSchemaTest> = ['33'] // [ '33']
})

export {}
