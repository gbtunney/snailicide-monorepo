/* eslint  @typescript-eslint/explicit-function-return-type: "warn" */
import { isString } from 'ramda-adjunct'
import { z, ZodEffects, ZodString } from 'zod'

import {
    doesFileExist,
    FilePath,
    FileType,
    getExistingPathType,
    getFilePathArr,
    getFullPath,
    normalizePath,
} from './../node/file.path.array.js'

/* * CUSTOM ZOD UTILITIES!! * */
export const fsPath = (
    root: string | undefined = undefined,
): ZodEffects<ZodEffects<ZodString, string>, string> => {
    return z
        .string()
        .transform((value) => getFullPath(value, root))
        .transform(normalizePath)
}

export const fsPathArray = (
    root: string | undefined = undefined,
    getDirectoryFileContents = false,
): ZodEffects<
    ZodEffects<ZodEffects<ZodString, string>, string>,
    Array<FilePath>
> => {
    return fsPath(root).transform((value) =>
        getFilePathArr(value, getDirectoryFileContents),
    )
}

export const fsPathExists = (
    exists = true,
    root: string | undefined = undefined,
    allowedType:
        | (Exclude<FileType, undefined> | Array<Exclude<FileType, undefined>>)
        | 'any' = 'any',
) => {
    if (!exists) {
        return fsPathTypeExists('none', root)
    }
    return fsPathTypeExists(allowedType, root)
}

export const fsPathTypeExists = (
    allowedType:
        | (Exclude<FileType, undefined> | Array<Exclude<FileType, undefined>>)
        | 'any'
        | 'none' = 'any',
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
                const ALLOWED: Array<FileType> = isString(allowedType)
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
                message: `File path ${(value
                    ? 'does not'
                    : 'does'
                ).toString()} exist (type: ${allowedType.toString()})`,
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
        (val: Array<FilePath>) => {
            if (val.length > 0 && val[0] !== undefined) {
                const _possibleDir: FilePath = val[0]
                if (
                    !getDirectoryFileContents &&
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
