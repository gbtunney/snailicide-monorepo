import { z } from 'zod'
import { validNPMPackageName, validSemVer } from './package-template-helpers.js'
/* * Target populates description with preset values defaults * */
//readonly [string, ...string[]]
export const EnumLicenses = [
    'MIT',
    'Apache 2.0',
    'BSD',
    'Creative Commons Attribution 4.0 International',
    'GNU GPL',
    'ISC',
    'Unlicense',
    'custom',
]
export var EnumDescriptionPresets
;(function (EnumDescriptionPresets) {
    EnumDescriptionPresets['default'] = 'No preset'
    EnumDescriptionPresets['library'] = 'Function library written in typescript'
    EnumDescriptionPresets['vue'] = 'Vue component library'
    EnumDescriptionPresets['react'] = 'React component library'
    EnumDescriptionPresets['example'] = 'Example Package - Demo'
})(EnumDescriptionPresets || (EnumDescriptionPresets = {}))
export const enumTargetKeys = () => Object.keys(EnumDescriptionPresets)
/* * FILE ARGS SCHEMA * */
export const fileArgsSchema = z.object({
    base_dir: z.string().default('.'),
    output_dir: z.string().default('generated'),
    template_base_dir: z.string().default('templates'),
    template_dir: z.string().default('base'),
    file_path: z.string().optional(),
    f: z.boolean().default(false), //use file flag
})
const IsValidEmail = z
    .string()
    .email()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
export const packageSchemaProps = {
    packageName: z.string().regex(validNPMPackageName),
    version: z.string().regex(validSemVer),
    author_name: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    author_email: z.string().email().optional(),
    description: z.string(),
    repositoryOwner: z.string(),
    repositoryName: z.string(),
    year: z.number(),
    target: z.string().transform((val) => {
        return val
    }),
    //.enum(EnumDescriptionPresets),
    license: z.enum(EnumLicenses),
}
export const packageSchema = z.object(packageSchemaProps)
