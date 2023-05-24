import { z } from 'zod'

export const getZodType = (dschema: z.ZodTypeAny): string | undefined => {
    if (dschema instanceof z.ZodEffects<any>) {
        if (dschema.innerType() instanceof z.ZodEffects) {
            const _inner = dschema.innerType()
            if (_inner['_def'] && _inner['_def']['schema']) {
                return getZodType(_inner['_def']['schema']) // recursive ZodEffect
            }
        } else {
            return getZodType(dschema.innerType())
        }
        return 'ERROR-ZODEFFECTS'
    }
    if (dschema instanceof z.ZodDefault) {
        if (!('_def' in dschema)) return undefined // error
        if (!('defaultValue' in dschema._def)) return undefined // error
        return getZodType(dschema['_def']['innerType'])
    }
    if (dschema instanceof z.ZodArray) {
        if (!('_def' in dschema)) return undefined // error
        if (!('type' in dschema._def)) return undefined // error
        return 'array'
    }
    if (dschema instanceof z.ZodString) return 'string'
    if (dschema instanceof z.ZodNumber || dschema instanceof z.ZodBigInt)
        return 'number'
    if (dschema instanceof z.ZodBoolean) return 'boolean'
    if (dschema instanceof z.ZodNull) return 'null'
    return undefined
}
