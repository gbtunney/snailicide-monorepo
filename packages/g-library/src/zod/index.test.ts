import { zod } from './index.js'
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
    })
})
export {}
