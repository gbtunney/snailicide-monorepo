import semvervalid from 'semver/functions/valid.js'
import { z } from 'zod'

export const basePackage = z.object({
    name: z
        .string()
        .regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/),
    version: z.string().refine(
        (value) => {
            return semvervalid(value)
        },
        { message: 'Please enter a valid semver' },
    ),
    description: z.string(),
    main: z.string(),
    license: z.string(),
    repository: z.object({
        type: z.string(),
        url: z.string(),
    }),
    author: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
})

export const schemaRequiredScripts = z.object({
    scripts: z.object({
        build: z.string(),
        test: z.string(),
        dev: z.string(),
    }),
})

export const schemas = {
    basePackage,
    schemaRequiredScripts,
    standardPackage: basePackage,
}
export default schemas
