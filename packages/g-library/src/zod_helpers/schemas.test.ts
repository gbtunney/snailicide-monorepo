import { describe, expect, test } from 'vitest'
import z from 'zod'

import { isRegExp } from '../typeguard/utility.typeguards.js'
import { ensureArray, resolveRegExpSchema } from './schemas.js'

describe('Zod helpers', () => {
    test('ENSURE ARRAY', () => {
        const getArrStringSchemaTest = ensureArray(z.string())
        const startvalue = 'zzzz'
        const arrvalue = [startvalue]
        expect(getArrStringSchemaTest.parse(startvalue)).toStrictEqual(arrvalue)
        expect(getArrStringSchemaTest.parse(arrvalue)).toStrictEqual(arrvalue)

        const recursiveTest = [arrvalue, arrvalue]
        const getArrRecursiveSchemaTest = ensureArray(ensureArray(z.string()))
        const endResult = [['gill'], ['tunney']]

        expect(getArrRecursiveSchemaTest.parse(recursiveTest)).toStrictEqual(
            recursiveTest,
        )
        expect(
            getArrRecursiveSchemaTest.parse(['gill', 'tunney']),
        ).toStrictEqual(endResult)
        expect(
            getArrRecursiveSchemaTest.parse([['gill'], 'tunney']),
        ).toStrictEqual(endResult)
        expect(getArrRecursiveSchemaTest.parse(endResult)).toStrictEqual(
            endResult,
        )

        //inputs
        const inputInA: z.input<typeof getArrStringSchemaTest> = ['33']
        const inputInB: z.input<typeof getArrStringSchemaTest> = '33'

        const inputOutA: z.output<typeof getArrStringSchemaTest> = ['33']
        // @ts-expect-error: not allowable as input
        const inputOutB: z.output<typeof getArrStringSchemaTest> = '33'

        const getArrNumberSchemaTest = ensureArray(z.number())

        //inputs
        const _inputInA: z.input<typeof getArrNumberSchemaTest> = [33]
        const _inputInB: z.input<typeof getArrNumberSchemaTest> = 33
        //outputs
        const _inputOutA: z.output<typeof getArrNumberSchemaTest> = [33]
        // @ts-expect-error: not allowable as input
        const _inputOutB: z.output<typeof getArrNumberSchemaTest> = 33

        //inputs
        const __inputInA: z.input<typeof getArrRecursiveSchemaTest> = [
            '33',
            'gillian',
        ]
        const __inputInB: z.input<typeof getArrRecursiveSchemaTest> = '33'
        //outputs
        const __inputOutA: z.output<typeof getArrRecursiveSchemaTest> = [['33']]
        const __inputOutB: z.output<typeof getArrRecursiveSchemaTest> = [
            ['33'],
            ['gillian'],
        ]
        // @ts-expect-error: not allowable as input
        const __inputOutC: z.output<typeof getArrRecursiveSchemaTest> = '33'

        // @ts-expect-error: todo: figure out why the typescript is correct but parsing the schema is only 1 level.
        const __inputOutD: z.output<typeof getArrRecursiveSchemaTest> = ['33']
        // BUSTED EXAMPLE : console.log("TESTMMMM", getArrRecursiveSchemaTest.parse("gillian") )
    })

    test('resolveRegExpSchema', () => {
        expect(resolveRegExpSchema().safeParse('^+0x').success).toBe(true)
        const testschema = resolveRegExpSchema(true)

        const getREGEXPSchemaTest = ensureArray<typeof testschema>(
            testschema,
        ).transform((value) => {
            const mapval = value.map((val): string => {
                if (isRegExp(val)) {
                    return val.source
                }
                return val
            })
            return new RegExp(mapval.join('|'))
        })

        expect(getREGEXPSchemaTest.parse([/^0x/, 'FFFF00']).test('440x')).toBe(
            false,
        )
        expect(
            getREGEXPSchemaTest.parse([/^0x/, 'FFFF00']).test('0x3476'),
        ).toBe(true)
        expect(
            getREGEXPSchemaTest.parse(['^0x', 'FFFF00']).test('0x3476'),
        ).toBe(true)
        expect(
            getREGEXPSchemaTest.parse(['^0x', 'FFFF00']).test('FFFF00333'),
        ).toBe(true)
        expect(
            getREGEXPSchemaTest.parse(['^0x', 'FFFF00']).test('34760x'),
        ).toBe(false)

        //this is because the ^ is escaped to a literal  rather than the regexp to come first !!
        expect(
            getREGEXPSchemaTest.parse(['^+0x', 'FFFF00']).test('^+0x234760x'),
        ).toBe(true)
        expect(resolveRegExpSchema(false).safeParse('^+0x').success).toBe(false)
    })
})
export {}
