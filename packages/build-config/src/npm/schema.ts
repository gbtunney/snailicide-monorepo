import semvervalid from 'semver/functions/valid.js'
import { z } from 'zod'

export const basePackage = z.object({
    author: z.object({
        email: z.string().email(),
        name: z.string(),
    }),
    description: z.string(),
    license: z.string(),
    main: z.string(),
    name: z
        .string()
        .regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/),
    repository: z.object({
        type: z.string(),
        url: z.string(),
    }),
    version: z.string().refine(
        (value) => {
            return semvervalid(value)
        },
        { message: 'Please enter a valid semver' },
    ),
})

export const schemaRequiredScripts = z.object({
    scripts: z.object({
        build: z.string(),
        dev: z.string(),
        test: z.string(),
    }),
})

export const schemas = {
    basePackage,
    schemaRequiredScripts,
    standardPackage: basePackage,
}
export default schemas
