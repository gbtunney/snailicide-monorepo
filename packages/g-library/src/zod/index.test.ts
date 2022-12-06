import { zod, validateZodType, tg_Zod } from './index.js'
import { z } from 'zod'
describe('zod ', () => {
    it('returns `true` for values parseable number', () => {
        const schemaParseBad = zod
            .object({
                test_optional: zod.optionalDefault(
                    zod.string(),
                    'default_string'
                ),
                test_semver: zod.semVer(),
            })
            .safeParse({
                test_optional: 'test_string',
                test_semver: '2',
            })

        expect(schemaParseBad.success).toBe(false)

        const testParse = zod
            .object({
                test_optional: zod.optionalDefault(
                    zod.string(),
                    'default_string'
                ),
                test_semver: zod.semVer(),
            })
            .parse({
                // test_optional :"test_string",
                test_semver: '2.0.0',
            })
        expect(testParse).toEqual({
            test_optional: 'default_string',
            test_semver: '2.0.0',
        })

        const testParse2 = zod
            .object({
                test_optional: zod.optionalDefault(
                    zod.string(),
                    'default_string'
                ),
                test_semver: zod.semVer().optional(),
            })
            .parse({
                test_optional: 'test_string',
                //test_semver: '2.0.0'
            })
        expect(testParse2).toEqual({
            test_optional: 'test_string',
        })

        const testParse3 = zod
            .object({
                test_optional: zod.optionalDefault(
                    zod.string(),
                    'default_string'
                ),
                test_semver: zod.semVer('0.0.1'),
            })
            .parse({
                test_optional: 'test_string',
                //test_semver: '2.0.0'
            })
        expect(testParse3).toEqual({
            test_optional: 'test_string',
            test_semver: '0.0.1',
        })

        const testSchema = z.object({
            prop1: z.string(),
            prop2: z.number().int(),
        })
        const testval = {
            prop1: 'jkjkj',
            prop2: 2,
        }

        expect(validateZodType(testval, testSchema)).toEqual(true)

        const testval2 = {
            prop1: 22,
        }
        // @ts-expect-error should be error
        const val = validateZodType(testval2, testSchema)
        const testVal3 = undefined

        expect(tg_Zod(testVal3, testSchema)).toEqual(false)
        expect(tg_Zod<z.infer<typeof testSchema>>(testval, testSchema)).toEqual(
            true
        )
    })
})
export {}
