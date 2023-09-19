import { z } from 'zod'
import { isString } from 'ramda-adjunct'

import { isValidSemVer } from './../npm/index.js'
import { node } from './../node/index.js'
import {
    FileType,
    FilePath,
    getFullPath,
    getFilePathArr,
    normalizePath,
    getExistingPathType,
} from './../node/file.path.array.js'

/* * CUSTOM ZOD UTILITIES!! * */
export const optionalDefault = <Type extends z.ZodType>(
    value: Type,
    _value: z.infer<Type>,
) => {
    return z.union([value.default(_value), value.optional()])
}
export const semVer = () =>
    z
        .string()
        .refine((value) => isValidSemVer(value), {
            message: 'Please enter valid semver',
        })

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
                else if (node.doesFileExist(value)) _inner_result = true
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

/* * ZOD * */
export type Zod = typeof z & {
    optionalDefault: typeof optionalDefault
    semVer: typeof semVer
    filePath: typeof filePath
    filePathExists: typeof filePathExists
    filePathDoesNotExist: typeof filePathDoesNotExist
    fsPath: typeof fsPath
    fsPathExists: typeof fsPathExists
    fsPathArray: typeof fsPathArray
    fsPathArrayHasFiles: typeof fsPathArrayHasFiles
    fsPathTypeExists: typeof fsPathTypeExists
}

export const zod = {
    ...z,
    optionalDefault,
    semVer,
    filePath,
    filePathExists,
    filePathDoesNotExist,
    fsPath,
    fsPathExists,
    fsPathArray,
    fsPathArrayHasFiles,
    fsPathTypeExists,
}

export default zod

/**
 * Get zod data typed
 *
 * @category Zod
 * @example
 *     getZodData( z.object({
 *     prop1: z.string(),
 *     prop2: z.number().int(),
 *     },{
 *     prop1: 'i am a string',
 *     prop2: 2,
 *     prop3: 3
 *     } )
 *     => {
 *     prop1: 'i am a string',
 *     prop2: 2
 *     }
 *
 * @template {z.ZodSchema} Schema
 * @function getZodData
 * @param {unknown} value - Z.infer<typeof schema>
 * @param {Schema} schema - Zod schema to use
 * @returns {unknown} Z.infer<typeof schema>
 */
export const getZodData = <Schema = z.ZodSchema>(
    value: Schema extends z.ZodSchema ? z.infer<Schema> : never,
    schema: Schema extends z.ZodSchema ? Schema : never,
): z.infer<typeof schema> => {
    return tg_Zod(value, schema) ? schema.parse(value) : undefined
}

/**
 * Guard function to determine if value is parseable according to schema
 *
 * @category Zod
 * @category TypeGuard
 * @example
 *     tg_Zod( z.object({
 *     prop1: z.string(),
 *     prop2: z.number().int(),
 *     },{
 *     prop1: 'i am a string',
 *     prop2: 2,
 *     } )
 *     => true
 *
 * @template {unknown} Type
 * @template {z.ZodSchema} Schema
 * @function tg_Zod
 * @param {Type} value - Value to test
 * @param {Schema} schema - Zod schema to use
 * @returns {boolean}
 */
export const tg_Zod = <Type = unknown, Schema = z.ZodSchema>(
    value: Type,
    schema: Schema extends z.ZodSchema ? Schema : never,
): value is z.infer<typeof schema> => {
    return schema.safeParse(value).success
}

export const parseFactory =
    <T extends z.ZodTypeAny>(schema: T) =>
    (data: unknown): z.infer<T> => {
        try {
            return schema.parse(data)
        } catch (err) {
            // handle error
            throw new Error()
        }
    }
