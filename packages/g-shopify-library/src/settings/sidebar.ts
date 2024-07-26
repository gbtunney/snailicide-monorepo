import { zod } from '@snailicide/g-library/node'

/*
 * sidebar_settings_schema_map
 * @type { Record<string,z.ZodSchema> }
 * @property {z.ZodSchema } header
 * @property {z.ZodSchema}  paragraph
 */
export const sidebar_settings_schema_map = {
    header: zod.object({
        content: zod.string(),
        type: zod.literal('header'), //todo:maybe a void type?
    }),
    paragraph: zod.object({
        content: zod.string(),
        type: zod.literal('paragraph'),
    }),
}

export const SidebarSettings = sidebar_settings_schema_map
export type SideBarSettingType = keyof typeof sidebar_settings_schema_map
export default SidebarSettings
