import { ensureArray as R_ensureArray } from 'ramda-adjunct'
import z, {
    ZodArray,
    ZodBigInt,
    ZodEffects,
    ZodNumber,
    ZodString,
    ZodType,
    ZodUnion,
} from 'zod'

import { Numeric } from '../number/numeric.js'
import { toNumeric } from '../number/transform.js'
import { escapeStringRegexpInvalid } from '../regexp/escape.js'
import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export type ZodRegExp = ZodType<RegExp>

export const resolveRegExpSchema = (
    doEscape: boolean = true,
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
                const _value = escapeStringRegexpInvalid(value, doEscape)
                if (_value !== undefined) {
                    return new RegExp(_value)
                } else {
                    return new RegExp('')
                }
            } else {
                const _reg: RegExp = value
                return _reg
            }
        })
        .refine((value: RegExp) => {
            return value.source !== '(?:)' ? isRegExp(value) : false
        }, 'Please provide a valid regular expression.')

    return union
}

export const ensureArray = <Type extends z.ZodTypeAny>(
    schema: Type,
): ZodEffects<ZodUnion<[ZodArray<Type>, Type]>, Array<Type['_output']>> => {
    const union: ZodEffects<
        ZodUnion<[ZodArray<Type>, Type]>,
        Array<Type['_output']>
    > = z
        .union([z.array(schema), schema])
        .transform((value): z.infer<ZodArray<typeof schema>> => {
            return R_ensureArray<typeof schema>(value)
        })

    return union
}

export const numeric = (): ZodEffects<
    ZodEffects<
        ZodUnion<[ZodString, ZodNumber, ZodBigInt]>,
        bigint | number | undefined
    >,
    bigint | number | undefined,
    bigint | string | number
> => {
    const result = z
        .union([z.string(), z.number(), z.bigint()])
        .transform((value) => {
            const _value: Numeric | undefined = toNumeric<typeof value>(value)
            return _value
        })
        .refine(
            (value) => value === undefined,
            'Please enter a valid number|bigint|string',
        )
    return result
}
