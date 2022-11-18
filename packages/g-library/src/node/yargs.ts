import { z } from 'zod'
import yargs from 'yargs'

export const getYArgs = <T extends z.ZodSchema>(
    schema: T,
    _yargs = process.argv
): z.infer<T> => {
    return schema.parse(yargs(_yargs).argv)
}

const example = () => {
    const fileArgsSchema = z.object({
        watch: z.boolean().default(false), //use file flag
    })
    const example = getYArgs(fileArgsSchema)
    console.log('example', example.watch)
}
