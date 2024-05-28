import { z } from 'zod'
import { isString } from 'ramda-adjunct'
import {
    FileType,
    FilePath,
    getFullPath,
    getFilePathArr,
    normalizePath,
    getExistingPathType,
    doesFileExist,
} from './../node/file.path.array.js'

/* * CUSTOM ZOD UTILITIES!! * */
export const fsPath = (root: string | undefined = undefined) => {
    return z
        .string()
        .transform((value) => getFullPath(value, root))
        .transform(normalizePath)
}

export const fsPathArray = (
    root: string | undefined = undefined,
    getDirectoryFileContents = false,
) => {
    return fsPath(root).transform((value) =>
        getFilePathArr(value, getDirectoryFileContents),
    )
}

export const fsPathExists = (
    exists = true,
    root: string | undefined = undefined,
    allowedType: FileType | 'any' | FileType[] = 'any',
) => {
    if (exists === false) {
        return fsPathTypeExists('none', root)
    }
    return fsPathTypeExists(allowedType, root)
}

export const fsPathTypeExists = (
    allowedType: FileType | 'any' | 'none' | FileType[] = 'any',
    root: string | undefined = undefined,
) => {
    return fsPath(root).refine(
        (value) => {
            let _inner_result = false
            const pathType: FileType = getExistingPathType(value)
            if (allowedType === 'any') {
                if (pathType === 'glob') _inner_result = true
                else if (doesFileExist(value)) _inner_result = true
            } else if (allowedType === 'none') return pathType === undefined
            else {
                const ALLOWED: FileType[] = isString(allowedType)
                    ? [allowedType]
                    : allowedType
                ALLOWED.forEach((item) => {
                    if (pathType === item) _inner_result = true
                })
            }
            return _inner_result
        },
        (value) => {
            return {
                message: `File path ${
                    value ? 'does not ' : 'does'
                } exist ${allowedType}`,
            }
        },
    )
}
//validates if it is a glob, and if it exists.
export const fsPathArrayHasFiles = (
    getDirectoryFileContents = false,
    root: string | undefined = undefined,
) => {
    return fsPathArray(root, getDirectoryFileContents).refine(
        (val) => {
            if (val && val.length > 0 && val[0] !== undefined) {
                const _possibleDir: FilePath = val[0]
                if (
                    getDirectoryFileContents === false &&
                    _possibleDir.extname.length <= 0
                )
                    return false
            }
            return val.length > 0
        },
        {
            message: `File path array does not contain files`,
        },
    )
}

export const filePathExists = fsPathExists(true)

export const filePathDoesNotExist = fsPathExists(false)

export const filePath = fsPath()
