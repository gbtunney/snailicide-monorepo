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
