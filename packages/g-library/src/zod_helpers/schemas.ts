import { ensureArray as R_ensureArray, isNotString } from 'ramda-adjunct'
import z, { ZodArray, ZodEffects, ZodType, ZodUnion } from 'zod'

import { Numeric } from '../number/numeric.js'
import { toNumeric } from '../number/transform.js'
import { isPossibleNumeric } from '../number/typeguards.js'
import { escapeStringRegexpInvalid } from '../regexp/escape.js'
import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export type ZodRegExp = ZodType<RegExp>

/**
 * Creates a Zod schema for regular expressions, with optional escaping of
 * invalid characters.
 *
 * @memberof ZodHelpers
 * @category Zod
 * @category ZodSchema
 * @example
 *     const myRegExpSchema = resolveRegExpSchema(true)
 *     const myRegExp = myRegExpSchema.parse('example') // Returns a RegExp based on "example"
 *
 * @function resolveRegExpSchema
 * @param {boolean} [escape=true] - Whether to escape invalid characters in the
 *   string before converting to RegExp. Default is `true`
 * @returns {z.ZodSchema} A Zod schema that resolves to a RegExp.
 */
export const resolveRegExpSchema = (
    escape: boolean = true,
): z.ZodEffects<
    z.ZodEffects<z.ZodUnion<[z.ZodString, ZodRegExp]>, RegExp, string | RegExp>,
    RegExp,
    string | RegExp
> => {
    const union: z.ZodEffects<
        z.ZodEffects<
            z.ZodUnion<[z.ZodString, ZodRegExp]>,
            RegExp,
            string | RegExp
        >,
        RegExp,
        string | RegExp
    > = z
        .union([z.string(), z.instanceof(RegExp)])
        .transform((value): RegExp => {
            if (isString<string>(value)) {
                const _value = escapeStringRegexpInvalid(value, escape)
                if (_value !== undefined) {
                    return new RegExp(_value)
                } else {
                    return new RegExp('')
                }
            } else {
                const _reg: RegExp = value
                return _reg
            }
            //return undefined
        })
        .refine((value) => {
            return value !== undefined && value.source !== '(?:)'
                ? isRegExp(value)
                : false
        }, 'Please provide a valid regular expression.')

    return union
}

/**
 * Ensures that the input is treated as an array. If the input is not an array,
 * it is converted into an array.
 *
 * @memberof ZodHelpers
 * @category Zod
 * @category ZodSchema
 * @example
 *     const myArraySchema = ensureArray(z.string())
 *     const myArray = myArraySchema.parse('hello') // Returns ["hello"]
 *
 * @function ensureArray
 * @param {ZodTypeAny} schema - The Zod schema to ensure as an array.
 * @returns {z.ZodSchema} A Zod schema that ensures the input is treated as an
 *   array.
 */
export const ensureArray = <T extends z.ZodTypeAny>(
    schema: T,
): ZodEffects<ZodUnion<[ZodArray<T, 'many'>, T]>, T['_output'][]> => {
    const union: ZodEffects<
        ZodUnion<[ZodArray<T, 'many'>, T]>,
        T['_output'][]
    > = z
        .union([z.array(schema), schema])
        .transform((value): z.infer<ZodArray<typeof schema, 'many'>> => {
            return R_ensureArray<typeof schema>(value)
        })

    return union
}

/**
 * Creates a Zod schema that validates numeric inputs, including strings that
 * can be converted to numbers. This schema accepts either a string, a number,
 * or a bigint as input and attempts to refine it to a numeric value. If the
 * input is a string that represents a valid number or bigint, it will be
 * converted accordingly. Otherwise, if the conversion is not possible or the
 * input is not a numeric string, the refinement fails.
 *
 * @memberof ZodHelpers
 * @category Zod
 * @category ZodSchema
 * @example
 *     const myNumber = myNumericSchema.parse('123') // Returns 123 as a number
 *     const myBigInt = myNumericSchema.parse('9007199254740991') // Returns 9007199254740991n as a bigint
 *     const invalid = myNumericSchema.parse('abc') // Throws a Zod error
 *
 * @function numeric
 * @returns {z.ZodSchema} A Zod schema that validates numeric inputs and
 *   transforms them into either a bigint, a number, or undefined if the input
 *   cannot be converted.
 */
export const numeric = () => {
    return z
        .union([z.string(), z.number(), z.bigint()])
        .refine(
            (value) => isPossibleNumeric(value),
            'Please enter a valid number|bigint|string',
        )
        .transform((value): bigint | number | undefined => {
            const _value: Numeric | undefined = toNumeric<typeof value>(value)
            if (_value !== undefined && isNotString(_value)) {
                return _value
            }
            return undefined
        })
}
/* TODO : do explicit return type z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt]>,
    bigint | number | undefined>*/
