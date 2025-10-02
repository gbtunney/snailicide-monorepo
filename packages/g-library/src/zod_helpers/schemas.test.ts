import { describe, expect, test } from 'vitest'
import z from 'zod'
import { ensureArray, numeric, resolveRegExpSchema } from './schemas.js'
import { isRegExp } from '../typeguard/utility.typeguards.js'

describe('Zod helpers', () => {
    test('ENSURE ARRAY', () => {
        const testing = numeric().optional()
        const inptNumeric: z.input<typeof testing> = '2'
        const outptNumeric: z.infer<typeof testing> = 2
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
        const inputOutB: z.input<typeof getArrStringSchemaTest> = '33'

        const getArrNumberSchemaTest = ensureArray(z.number())

        //inputs
        const _inputInA: z.input<typeof getArrNumberSchemaTest> = [33]
        const _inputInB: z.input<typeof getArrNumberSchemaTest> = 33
        //outputs
        const _inputOutA: z.output<typeof getArrNumberSchemaTest> = [33]

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

        const __inputOutC: z.input<typeof getArrRecursiveSchemaTest> = 'gillian'
        const __inputOutD: z.input<typeof getArrRecursiveSchemaTest> = [
            'gillian',
        ]

        const outputOutD2: z.output<typeof getArrRecursiveSchemaTest> = [
            ['gillian'],
        ]
        const outputOutD: z.input<typeof getArrRecursiveSchemaTest> = 'gillian'

        expect(getArrRecursiveSchemaTest.parse(['gillian'])).toStrictEqual([
            ['gillian'],
        ])

        //TODO: NOTE - following does NOT work - please fix someday
        //expect(getArrRecursiveSchemaTest.parse("gillian") ).toStrictEqual([['gillian']])
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
