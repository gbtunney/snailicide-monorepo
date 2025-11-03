import { z } from 'zod'
import { getValueSchema } from './helpers.js'

/** Capitalizes only the first letter of the string and LEAVES THE REST OF CHARACTERSS */
export const modifyCaseIndexedLetter = (
    str: string,
    _case: 'upper' | 'lower',
    index: number = 0,
): string => {
    if (str.length >= 0 && str.length >= index + 1 && str[index]) {
        // const indexedElement =
        const str_transformed: string =
            _case === 'upper'
                ? str[index].toUpperCase()
                : str[index].toLowerCase()

        return `${str_transformed}${str.slice(index + 1)}`
    }
    return str
}
/** Lowercasea only the first letter of the string and LEAVES THE REST OF CHARACTERSS */
export const lowerCaseFirstLetter = (str: string): string =>
    modifyCaseIndexedLetter(str, 'lower', 0)
export const upperCaseFirstLetter = (str: string): string =>
    modifyCaseIndexedLetter(str, 'upper', 0)

export const wrapString = (
    value: string,
    prefix: string = '(',
    suffix: string = ')',
): string => {
    const _value = value.trim()
    return _value.length > 0 ? `${prefix}${_value}${suffix}` : ''
}
const ansiRegex = ({ onlyFirst = false } = {}): RegExp => {
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    ].join('|')

    return new RegExp(pattern, onlyFirst ? undefined : 'g')
}

export const removeAnsi = (value: string): string =>
    value.replace(ansiRegex(), '')

export const getEnumValuesString = <Schema extends z.ZodType>(
    schema: Schema,
): string => {
    return schema instanceof z.ZodEnum && schema.type === 'enum'
        ? schema.options.map((v) => v.toString().trim()).join('|')
        : ''
}

export const getArraySchemaString = (_schema: z.ZodType): string => {
    const innerSchema = getValueSchema(_schema, true)

    return _schema.type === 'array' ? `${innerSchema.type}[]` : ''
}

export const convertZodTypeToYargs = (type: string): string => {
    ///TODO: add a count type ? more exhaustive list?
    if (
        /* Positional Arguments for Yargs*/
        type === 'string' ||
        type === 'boolean' ||
        type === 'number' ||
        /* Other types of arguments */
        type === 'array' ||
        type === 'object'
    )
        return type
    //this returns the default type
    console.warn('YARGS unfriendly type encountered', type)
    return 'boolean'
}

export const spaceText = (value: string, delimiter: string = ' '): string => {
    return Array.from(value).join(delimiter)
}
