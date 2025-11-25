import Ajv, {
    ErrorObject,
    type JSONSchemaType,
    Options as AjvOptions,
    ValidateFunction,
} from 'ajv'

export type ValidationErrorObject = ErrorObject
export const getAjvValidator = <SchemaType extends JSONSchemaType<unknown>>(
    schema: SchemaType,
    strictValidation: boolean = true,
    opts: Omit<AjvOptions, 'strict'> = {
        allErrors: true,
        allowUnionTypes: true,
        removeAdditional: true,
    },
): ValidateFunction<SchemaType> => {
    // schema["additionalProperties"] = strictValidation
    return new Ajv({ ...opts, strict: strictValidation }).compile<SchemaType>({
        ...schema,
        additionalProperties: !strictValidation,
    })
}
