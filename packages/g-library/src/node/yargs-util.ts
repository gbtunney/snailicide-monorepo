import yargs from 'yargs'
import { z } from 'zod'

/** @group yargs */
export const getYArgs = <Type extends z.ZodObject>(
    schema: Type,
    debug = false,
    _yargs = process.argv,
): z.infer<Type> | undefined => {
    const data = yargs(_yargs).argv
    if (schema.safeParse(data).success) {
        return schema.parse(data)
    } else if (debug) return schema.parse(data)
    else return undefined
}

/** @group yargs */
export const getArgsObject = (
    value = process.argv,
): Promise<Record<string, unknown>> | Record<string, unknown> =>
    yargs(value).argv
