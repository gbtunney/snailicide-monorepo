import { z } from 'zod'
import yargs from 'yargs'
export const getYArgs = <T extends z.ZodSchema>(
    schema: T,
    debug = false,
    _yargs = process.argv
): z.infer<T> | undefined => {
    const data = yargs(_yargs).argv
    if (schema.safeParse(data).success) {
        return schema.parse(data)
    } else if (debug === true) return schema.parse(data)
    else return undefined
}

const example = () => {
    const fileArgsSchema = z.object({
        watch: z.boolean().default(false), //use file flag
    })
    const example = getYArgs(fileArgsSchema)
    //   console.log('example', example.watch)
}
