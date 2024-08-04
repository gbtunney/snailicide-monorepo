import { z } from 'zod'

import { validNPMPackageName, validSemVer } from './package-template-helpers.js'
import type { ZEnum } from './template-helpers.js'

/* * Target populates description with preset values defaults * */
//readonly [string, ...string[]]
export const EnumLicenses: ZEnum = [
    'MIT',
    'Apache 2.0',
    'BSD',
    'Creative Commons Attribution 4.0 International',
    'GNU GPL',
    'ISC',
    'Unlicense',
    'custom',
]

export enum EnumDescriptionPresets {
    default = 'No preset',
    library = 'Function library written in typescript',
    vue = 'Vue component library',
    react = 'React component library',
    example = 'Example Package - Demo',
}
export type EnumTargetKeys = keyof typeof EnumDescriptionPresets
export const enumTargetKeys = () =>
    Object.keys(EnumDescriptionPresets) as Array<EnumTargetKeys>
/* * FILE ARGS SCHEMA * */
export const fileArgsSchema = z.object({
    base_dir: z.string().default('.'),
    //package file path (or id config)
    f: z.boolean().default(false),
    file_path: z.string().optional(),
    output_dir: z.string().default('generated'),
    template_base_dir: z.string().default('templates'),
    template_dir: z.string().default('base'), //use file flag
})

export type FileArgs = z.infer<typeof fileArgsSchema>

const IsValidEmail = z
    .string()
    .email()
    .optional()
    .transform((val) => (val === '' ? undefined : val))

export const packageSchemaProps = {
    author_email: z.string().email().optional(),
    author_name: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    description: z.string(),
    //.enum(EnumDescriptionPresets),
    license: z.enum(EnumLicenses),
    packageName: z.string().regex(validNPMPackageName),
    repositoryName: z.string(),
    repositoryOwner: z.string(),
    target: z.string().transform((val) => {
        return val as EnumTargetKeys
    }),
    version: z.string().regex(validSemVer),
    year: z.number(),
}
export const packageSchema = z.object(packageSchemaProps)
export type PackageSchema = z.infer<typeof packageSchema>
