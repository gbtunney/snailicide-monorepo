import { z } from 'zod'
/*
export type ThemeInfo = {
    name: 'theme_info'
    theme_name: string //should be package eventually
    theme_version: string //should be semver eventually
    theme_author: string
    theme_documentation_url?: string
    theme_support_url?: string
}*/

const ThemeInfo = z.object({
    name: z.literal('theme_info'),
    theme_name: z.string(),
    theme_version: z.string(), //should be semver eventually
    theme_author: z.string(),
    theme_documentation_url: z.string().optional(),
    theme_support_url: z.string().optional(),
})
