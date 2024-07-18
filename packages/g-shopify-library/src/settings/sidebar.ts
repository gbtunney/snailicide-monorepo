import { zod } from '@snailicide/g-library/node'

/*
 * sidebar_settings_schema_map
 * @type { Record<string,z.ZodSchema> }
 * @property {z.ZodSchema } header
 * @property {z.ZodSchema}  paragraph
 */
export const sidebar_settings_schema_map = {
    header: zod.object({
        type: zod.literal('header'),
        content: zod.string(), //todo:maybe a void type?
    }),
    paragraph: zod.object({
        type: zod.literal('paragraph'),
        content: zod.string(),
    }),
}

export const SidebarSettings = sidebar_settings_schema_map
export type SideBarSettingType = keyof typeof sidebar_settings_schema_map
export default SidebarSettings
