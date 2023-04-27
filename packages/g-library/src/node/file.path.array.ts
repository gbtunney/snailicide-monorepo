import glob from 'glob'
import path from 'path'
import fs from 'fs'
import isGlob from 'is-glob'
import { transformExplodeArray } from './../transformString/_transformExplodeArray.js'

export type FilePath = {
    basename: string
    dirname: string
    parentdirname: string | undefined
    extname: string
    filename: string
    absolute: string
    dirarray: string[]
    excists: boolean
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
export const getFilePathArr = (value: string): FilePath[] => {
    const filteredArray = (
        arr: (FilePath | undefined)[]
    ): arr is FilePath[] => {
        return !arr.some((_entry) => _entry === undefined)
    }
    const _result = glob
        .sync(value)
        .map((_path: string): FilePath | undefined => {
            return getFilePathObj(_path)
        })
        .filter((_result) => _result !== undefined)
    return filteredArray(_result) ? _result : []
}

export const getFilePathObj = function (_path: string): FilePath | undefined {
    if (isGlob(_path)) {
        console.error(
            'the path ',
            _path,
            ' is a glob, please use getFilePathArr function instead!'
        )
        return undefined
    }
    const resolvedPath = path.resolve(_path)
    const dirarray = getDirectoryArr(resolvedPath)
    const parentdirname = getParentDirectory(resolvedPath)
    const result = {
        basename: path.basename(resolvedPath),
        dirname: path.dirname(resolvedPath),
        parentdirname,
        extname: getExt(resolvedPath),
        filename: getFilename(resolvedPath),
        absolute: resolvedPath,
        dirarray,
        excists: fs.existsSync(resolvedPath),
    }
    return result
}
export const getDirectoryArr = (_path: string): string[] => {
    const resolvedPath = path.resolve(_path)
    return transformExplodeArray({
        value: path.resolve(path.dirname(resolvedPath)),
        delimiter: '/',
    }).filter((_item) => _item.length > 0)
}
export const getParentDirectory = (_path: string) => {
    const dirarray = getDirectoryArr(_path)
    return dirarray.length > 0 ? dirarray[dirarray.length - 1] : undefined
}
export const getFilename = (fullPath: string) =>
    path.basename(fullPath, path.extname(fullPath))
export const getExt = (fullPath: string) =>
    path.extname(fullPath).replace('.', '')
export const getFullPath = (_value: string, _root: string | undefined) => {
    return _root !== undefined ? `${_root}/${_value}` : _value
}
