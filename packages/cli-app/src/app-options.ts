//import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

const testPipe = z.string().pipe(z.transform((val) => val.length))

const splitArray = z.transform<z.ZodString, number>((val) => 0)
//z.boo/lean().meta()
export const commonFlagsSchema = z.object({
    debug: z
        .boolean()
        .default(false)
        .meta({ alias: 'd', description: 'Debug output', hidden: true }),

    outDir: z
        .string()
        .default('dire')
        .meta({ alias: ['o', 'out'], description: '<dir> Output directory' }),
    // outDir: z.fsPath().meta({ description: '<dir> Output directory' , alias: 'o'}),
    /*
   rootDir: z
   .string()
   .default('.').optional()
   .meta({ description: '<dir> Set Root Directory' ,alias:'r'
   }),*/
})
export type CommonFlagsSchema = typeof commonFlagsSchema
export type CommonFlagsOutput = z.infer<typeof commonFlagsSchema>
export type CommonFlagsInput = z.input<typeof commonFlagsSchema>
