//ts-node typescript zod
import { z } from 'zod'
import { zod, node } from './src/index.js' //'@snailicide/g-library'

//make a schema for arguments:
const example_schema = zod.object({
    repository: zod.optionalDefault(
        z.string().url(),
        'https://github.com/gbtunney/gbt-theme-dawn'
    ),
    commitOrBranch: zod.optionalDefault(z.string(), 'main'),
    path: z.string(),
    name: z.string(),
    overwrite: zod.optionalDefault(z.boolean(), false),
})

const getParsedArguments = (schema: z.ZodSchema) => {
    const parsedData = node.getYArgs(schema, false, process.argv)
    if (parsedData !== undefined) {
        const data = parsedData
        const file_path = `${data.path}/${data.name}`

        //   console.log("access " ,file_path,zod.filePath(false).parse("http://") )
        if (
            zod.filePathDoesNotExist.safeParse(file_path).success === true ||
            (zod.filePathExists.safeParse(file_path).success === true &&
                data.overwrite === true)
        ) {
            let command = `mkdir ${file_path} ${file_path}/temp && cd ${file_path}/temp`
            command += ` && wget ${data.repository}/archive/${data.commitOrBranch}.zip`
            command += ` && unzip * && rm *.zip && mv **!/!* .. && cd .. && rm -rf temp`
            console.log(command)
        } else {
            console.log(
                'Error: file path already excists',
                zod.filePath.parse(file_path)
            )
        }
    } else {
        //use debug option to get error message
        node.getYArgs(schema, true, process.argv)
    }
}
getParsedArguments(example_schema)
export {}
