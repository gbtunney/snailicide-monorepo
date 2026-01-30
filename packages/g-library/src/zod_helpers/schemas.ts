import { ensureArray as R_ensureArray } from 'ramda-adjunct'
import z from 'zod'

import { Numeric } from '../number/index.js'
import { toNumeric } from '../number/transform.js'
import { escapeStringRegexpInvalid } from '../regexp/escape.js'
import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export type ZodRegExp = z.ZodType<RegExp>

/**
 * @category Zod
 * @category Schema
 */
export const resolveRegExpSchema = (
    doEscape: boolean = true,
): z.ZodType<RegExp, string | RegExp> => {
    const union = z
        .union([z.string(), z.instanceof(RegExp)])
        .transform<RegExp>((value) => {
            if (isString<string>(value)) {
                const _value = escapeStringRegexpInvalid(value, doEscape)
                return new RegExp(_value ?? '')
            } else {
                return value
            }
        })
        .refine((value: RegExp) => {
            return value.source !== '(?:)' ? isRegExp(value) : false
        }, 'Please provide a valid regular expression.')
    return union
}

/**
 * @category Zod
 * @category Schema
 */
export const ensureArray = <Type extends z.ZodType>(
    schema: Type,
): z.ZodType<Array<z.output<Type>>, z.input<Type> | Array<z.input<Type>>> => {
    const union = z
        .union([z.array(schema), schema])
        .transform<
            Array<z.output<Type>>
        >((value: z.output<Type> | Array<z.output<Type>>): Array<z.output<Type>> => {
            return R_ensureArray(value) ///Array.isArray(value) ? value : [value]
        })
    return union
}

/**
 * @category Zod
 * @category Schema
 */
export const numeric = (): z.ZodType<
    Numeric | undefined,
    string | number | bigint
> => {
    const result = z
        .union([z.string(), z.number(), z.bigint()])
        .transform((value: string | number | bigint): Numeric | undefined => {
            const _value: Numeric | undefined = toNumeric<typeof value>(value)
            return _value
        })
        .refine(
            (value) => value === undefined,
            'Please enter a valid number|bigint|string',
        )
    return result
}
