import { z } from 'zod'
import type { Merge } from 'type-fest'
import { BasicSettings, BasicSettingType } from './basic.js'
import { SpecializedSettings, SpecializedSettingType } from './specialized.js'
import { ShopifySettings, ShopifySettingType } from './shopify.js'
import { SidebarSettings, SideBarSettingType } from './sidebar.js'
export const SettingSchemaMap = {
    ...BasicSettings,
    ...SpecializedSettings,
    ...ShopifySettings,
    ...SidebarSettings,
}
const baseSchema = z.object({
    label: z.string().optional(), ///todo: not sure if for shopify
    info: z.string().optional(),
    id: z.string(),
})

export type { BasicSettingType } from './basic.js'
export type { SpecializedSettingType } from './specialized.js'
export type { ShopifySettingType } from './shopify.js'
export type { SideBarSettingType } from './sidebar.js'
export type SettingTypes = keyof typeof SettingSchemaMap

export type Setting<
    Type extends keyof typeof SettingSchemaMap = keyof typeof SettingSchemaMap,
    id extends string = string
> = Merge<
    z.infer<typeof SettingSchemaMap[Type]>,
    id extends string
        ? Merge<z.infer<typeof baseSchema>, { id: id }>
        : z.infer<typeof baseSchema>
>

export type Settings<Type = Setting[]> = Type extends Setting[]
    ? Type
    : Type extends Record<string, Setting>
    ? Array<
          {
              [Key in keyof Type]: Key extends string
                  ? Setting<Type[Key]['type'], Key>
                  : never
          }[keyof Type]
      >
    : never

export type SettingsMapped<T extends Record<string, Setting>> = Array<
    {
        [Key in keyof T]: Key extends string
            ? Setting<T[Key]['type'], Key>
            : never
    }[keyof T]
>

export const settingSchema = z.array(
    z.discriminatedUnion('type', [
        BasicSettings.text,
        BasicSettings.textarea,
        BasicSettings.number,
        BasicSettings.radio,
        BasicSettings.checkbox,
        BasicSettings.select,
        BasicSettings.range,
        ...Object.values(SpecializedSettings),
        ...Object.values(ShopifySettings),
        ...Object.values(SidebarSettings),
    ])
)

export const validateSettingsSchema = <Type = z.infer<typeof settingSchema>>(
    value: Type,
    schema: z.ZodSchema = settingSchema
): value is Type extends undefined ? z.infer<typeof schema> : Type =>
    schema.safeParse(value).success

export const debugSettingsSchema = <Type = z.infer<typeof settingSchema>>(
    value: Type,
    schema: z.ZodSchema = settingSchema
): value is z.infer<typeof schema> => schema.parse(value)

export {}
