import yargs from 'yargs'
import { z } from 'zod'

export const getYArgs = <Type extends z.ZodSchema>(
    schema: Type,
    debug = false,
    _yargs: Array<string> = process.argv,
): z.infer<Type> | undefined => {
    const data = yargs(_yargs).argv
    if (schema.safeParse(data).success) {
        return schema.parse(data)
    } else if (debug) return schema.parse(data)
    else return undefined
}

export const getArgsObject = (
    value = process.argv,
): Promise<Record<string, unknown>> | Record<string, unknown> =>
    yargs(value).argv
