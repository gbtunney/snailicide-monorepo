import { OutputOptions } from 'rollup'

export const createOutputOptions = (
    options: Partial<OutputOptions>,
): OutputOptions => {
    return { exports: 'named', sourcemap: true, ...options }
}
export const getOutfileName = (
    _export_key: string,
    _out_file_name_override: undefined | string = undefined,
) => {
    return _out_file_name_override !== undefined
        ? _out_file_name_override
        : getExportKey(_export_key) === '.'
          ? 'index'
          : getExportKey(_export_key)
}
export const getExportKey = (_export_key: string) => {
    return _export_key === '.' || _export_key === '*' || _export_key === 'main'
        ? '.'
        : _export_key.charAt(0) !== '.'
          ? `./${_export_key}`
          : _export_key
}
export const addMinFileExtension = (
    _value: string,
    insert_value: string = '.min',
) => {
    const insert = (
        value: string,
        replace_value: string = '',
        index: number = 0,
    ) => {
        return index > 0
            ? `${value.substring(0, index)}${replace_value}${value.substring(index, value.length)}`
            : value
    }
    const myMatch: null | RegExpMatchArray = _value.match(
        new RegExp(/\.[a-z]{2,7}$/),
    )
    if (myMatch !== null && myMatch.index !== undefined) {
        return insert(_value, insert_value, myMatch.index)
    }
    return 'ERROR'
}
