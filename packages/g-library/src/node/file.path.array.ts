import { globSync } from 'glob'
import _isGlob from 'is-glob'
import { isString } from 'ramda-adjunct'
import fs from 'fs'
import path from 'path'

export type FilePath = {
    basename: string
    dirname: string
    /** Parent directory name */
    parentdirname: string | undefined
    /** Extension */
    extname: string
    filename: string
    /** Absolute Path */
    absolute: string
    /** Array of parent directories */
    dirarray: Array<string>
    /** Does path exist? */
    exists: boolean
}
export type FileType = 'directory' | 'file' | 'symlink' | 'glob' | undefined
/**
 * Get Array of FilePaths from a glob string
 *
 * @example
 *     getFilePathArr('./*.json')
 *
 * @param {string} value - Glob Path String - "*.json"
 * @param {boolean} getDirectoryFiles - Get the file contents of directory ( like /mydir/* )
 */
export const getFilePathArr = (
    value: string,
    getDirectoryFiles = false,
): Array<FilePath> => {
    const filteredArray = (
        arr: Array<FilePath | undefined>,
    ): arr is Array<FilePath> => {
        return !arr.some((_entry) => _entry === undefined)
    }
    const _value =
        getDirectoryFiles && isDirectory(value)
            ? //make a glob.
              path.resolve(`${value}/*`)
            : value
    const _result = globSync(_value)
        .map((_path: string): FilePath | undefined => {
            return getFilePathObj(_path)
        })
        .filter((_result) => _result !== undefined)
    return filteredArray(_result) ? _result : []
}

export const isFileArray = (
    value: string,
    exists = true,
    allowDirectory = false,
): boolean => {
    const _path: string = path.resolve(value)
    /* * If we dont care if it exists, test if it is a glob or has no extention.  * */
    if (!exists) {
        if (isGlob(_path)) return true
        else if (allowDirectory && isDirectory(_path)) return true
    } else {
        /* * If we dont care if it exists, test if it is a glob or has no extention.  * */
        const newglob: undefined | string = isGlob(_path)
            ? _path
            : allowDirectory && isDirectory(_path)
              ? //make a glob.
                path.resolve(`${_path}/*`)
              : undefined
        if (newglob === undefined) return false
        else if (getFilePathArr(newglob).length > 0) return true
    }
    return false
}

export const getExistingPathType = (value: string): FileType => {
    const _path: string = path.resolve(value)
    if (isGlob(value)) {
        if (isFileArray(value, true)) return 'glob'
    } else if (fs.existsSync(_path)) {
        if (fs.lstatSync(_path).isDirectory()) return 'directory'
        else if (fs.lstatSync(_path).isFile()) return 'file'
        else if (fs.lstatSync(_path).isSymbolicLink()) return 'symlink'
    }
    return undefined
}

/** IsFile - if the string is a glob, we do not care if it exists or resolves. */
export const isFile = (
    value: string,
    allowedExtention: string | Array<string> | undefined = undefined,
): boolean => {
    const extention = path.extname(path.resolve(value))
    const result = extention.length > 1
    if (result && allowedExtention === undefined) return true
    else if (result && allowedExtention !== undefined) {
        let _inner_result = false
        const ALLOWED = isString(allowedExtention)
            ? [allowedExtention]
            : allowedExtention
        ALLOWED.forEach((item: string) => {
            if (extention.replace('.', '') === item.replace('.', ''))
                _inner_result = true
        })
        return _inner_result
    }
    return false
}
/** IsDirectory - if the string is a glob, we do not care if it exists or resolves. */
export const isDirectory = (value: string): boolean => {
    return !isFile(value)
}
/** IsGlob - if the string is a glob, we do not care if it exists or resolves. */
export const isGlob = (value: string): boolean => {
    return _isGlob(value)
}
export const getFilePathObj = function (_path: string): FilePath | undefined {
    if (isGlob(_path)) {
        console.error(
            'the path ',
            _path,
            ' is a glob, please use getFilePathArr function instead!',
        )
        return undefined
    }
    const resolvedPath = path.resolve(_path)
    const dirarray = getDirectoryArr(resolvedPath)
    const parentdirname = getParentDirectory(resolvedPath)
    const result: FilePath = {
        absolute: resolvedPath,
        basename: path.basename(resolvedPath),
        dirarray,
        dirname: path.dirname(resolvedPath),
        exists: fs.existsSync(resolvedPath),
        extname: getExt(resolvedPath),
        filename: getFilename(resolvedPath),
        parentdirname,
    }
    return result
}
export const getDirectoryArr = (_path: string): Array<string> => {
    const resolvedPath = path.resolve(_path)

    return path
        .resolve(path.dirname(resolvedPath))
        .split('/')
        .filter((_item) => _item.length > 0)
}
export const getParentDirectory = (_path: string): string | undefined => {
    const dirarray = getDirectoryArr(_path)
    return dirarray.length > 0 ? dirarray[dirarray.length - 1] : undefined
}
export const getFilename = (fullPath: string): string =>
    path.basename(fullPath, path.extname(fullPath))
export const getExt = (fullPath: string): string =>
    path.extname(fullPath).replace('.', '')
export const getFullPath = (
    _value: string,
    _root: string | undefined,
): string => {
    return _root !== undefined ? `${_root}/${_value}` : _value
}
export const normalizePath = (value: string): string =>
    path.normalize(path.resolve(value))

export const doesFileExist = (path: string): boolean => fs.existsSync(path)
