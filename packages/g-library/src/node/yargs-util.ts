import yargs from 'yargs'
import { z } from 'zod'

export const getYArgs = <T extends z.ZodSchema>(
    schema: T,
    debug = false,
    _yargs = process.argv,
): z.infer<T> | undefined => {
    const data = yargs(_yargs).argv
    if (schema.safeParse(data).success) {
        return schema.parse(data)
    } else if (debug === true) return schema.parse(data)
    else return undefined
}
export const getArgsObject = (value = process.argv) => yargs(value).argv
