import fs from 'fs'

/* * zod - needed for enum ZEnum * */
export type ZEnum = readonly [string, ...string[]]

export const doesFilePathExcist = (value: string) =>
    value.length > 1 && fs.existsSync(value)
