import { z } from 'zod'

import { getSettingGroupSchema, parseValidatorFactory } from './index.js'
/*
reference
export type ThemeInfo = {
    name: 'theme_info'
    theme_name: string //should be package eventually
    theme_version: string //should be semver eventually
    theme_author: string
    theme_documentation_url?: string
    theme_support_url?: string
}*/

const theme_info_schema = z.object({
    name: z.literal('theme_info'),
    theme_name: z.string(),
    theme_version: z.string(), //should be semver eventually
    theme_author: z.string(),
    theme_documentation_url: z.string().optional(),
    theme_support_url: z.string().optional(),
})
export type ThemeInfo = z.infer<typeof theme_info_schema>

export const global_settings_section = z.object({
    name: z.string(),
    settings: getSettingGroupSchema(),
})
export type GlobalSettingsSection = z.infer<typeof global_settings_section>

const global_settings_schema = z
    .tuple([theme_info_schema])
    .rest(global_settings_section)

export type GlobalSettingsSchema = z.infer<typeof global_settings_schema>
const getGlobalSettingsFactory =
    <T extends typeof global_settings_section | typeof global_settings_schema>(
        schema: T,
    ) =>
    (data: unknown): z.infer<T> | undefined => {
        if (parseValidatorFactory(schema)(data)) {
            return schema.parse(data)
        }
        return undefined
    }

export const parseThemeSettings = getGlobalSettingsFactory(
    global_settings_schema,
)
export const parseThemeSettingSection = getGlobalSettingsFactory(
    global_settings_section,
)
