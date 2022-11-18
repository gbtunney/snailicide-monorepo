import glob from 'glob'
import path from 'path'
import { trimCharactersStart } from './../transformString/_trimCharacters.js'
import { transformExplodeArray } from './../transformString/_transformExplodeArray.js'

export type FilePath = {
    basename: string
    dirname: string
    parentdirname: string | undefined
    extname: string
    filename: string
    absolute: string
    dirarray: string[]
}

/**
 * Get Array of FilePaths from a glob string
 *
 * @example
 *     getFilePathArr('./*.json')
 *
 * @param {string} value - Glob Path String - "*.json"
 * @returns {FilePath[]} - Array of data objects containing various file path
 *   parameters
 */
export const getFilePathArr = function (value: string): FilePath[] {
    return glob.sync(value).map((_path: string): FilePath => {
        const dirarray = transformExplodeArray({
            value: path.resolve(path.dirname(_path)),
            delimiter: '/',
        }).filter((_item) => _item.length > 0)
        const parentdirname =
            dirarray.length > 0 ? dirarray[dirarray.length - 1] : undefined
        return {
            basename: path.basename(_path),
            dirname: path.dirname(_path),
            parentdirname,
            extname: trimCharactersStart({
                value: path.extname(_path),
                pattern: '.',
            }),
            filename: path.basename(_path, path.extname(_path)),
            absolute: path.resolve(_path),
            dirarray,
        }
    })
}
