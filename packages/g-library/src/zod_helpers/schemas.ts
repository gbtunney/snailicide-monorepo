import { ensureArray as R_ensureArray, isNotString } from 'ramda-adjunct'
import z, { ZodArray, ZodEffects, ZodType, ZodUnion } from 'zod'

import { Numeric } from '../number/numeric.js'
import { toNumeric } from '../number/transform.js'
import { isPossibleNumeric } from '../number/typeguards.js'
import { escapeStringRegexpInvalid } from '../regexp/escape.js'
import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export type ZodRegExp = ZodType<RegExp>

export const resolveRegExpSchema = (
    escape: boolean = true,
): z.ZodEffects<
    z.ZodEffects<z.ZodUnion<[z.ZodString, ZodRegExp]>, RegExp, string | RegExp>,
    RegExp,
    string | RegExp
> => {
    //ZodEffects< ZodEffects<ZodUnion<[ZodString,ZodRegExp]>>,ZodRegExp,ZodRegExp|ZodString>
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
const myschema = resolveRegExpSchema(true) //.parse("dsdsds")
const testme: z.output<typeof myschema> = new RegExp('rrrr')

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

//TODO: finish this
export const numeric = <T extends z.ZodTypeAny>(schema: T) =>
    z
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
