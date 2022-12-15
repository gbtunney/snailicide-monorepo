import { zod, tg_Zod, getZodData } from './index.js'
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
        const test_val = {
            prop1: 'my string',
            prop2: 2,
            prop3: 3,
        }
        const test_bad_val = {
            prop1: 'my string',
            prop2: 'supposed to be int',
        }
        // @ts-expect-error will ts-error if type is explicity set
        if (tg_Zod<z.infer<typeof testSchema>>(test_bad_val, testSchema)) {
            // @ts-expect-error will error
            const test_bad_parse = getZodData(test_bad_val, testSchema)
        }

        const test_parse = getZodData(test_val, testSchema)
        expect(test_parse).toEqual({
            prop1: 'my string',
            prop2: 2,
        })

        const test_bad_val_2 = {
            prop1: '22',
        }
        // @ts-expect-error should be error
        const test_parse_bad_2 = getZodData(test_bad_val_2, testSchema)
        expect(test_parse_bad_2).toEqual(undefined)
        expect(tg_Zod(test_bad_val_2, testSchema)).toEqual(false)

        expect(tg_Zod(undefined, testSchema)).toEqual(false)
        expect(
            tg_Zod<z.infer<typeof testSchema>>(test_val, testSchema)
        ).toEqual(true)
    })
})
export {}
