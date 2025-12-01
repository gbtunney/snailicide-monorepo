import { z } from 'zod'
/*
 * sidebar_settings_schema_map
 * @type { Record<string,z.ZodSchema> }
 * @property {z.ZodSchema } header
 * @property {z.ZodSchema}  paragraph
 */
export const sidebar_settings_schema_map = {
    header: z.object({
        content: z.string(),
        type: z.literal('header'), //todo:maybe a void type?
    }),
    paragraph: z.object({
        content: z.string(),
        type: z.literal('paragraph'),
    }),
}

export const SidebarSettings = sidebar_settings_schema_map
export type SideBarSettingType = keyof typeof sidebar_settings_schema_map
export default SidebarSettings
