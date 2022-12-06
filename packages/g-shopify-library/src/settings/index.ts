/*const BasicSettingSchema = z.tuple([ThemeInfo, Checkbox, z.discriminatedUnion("type", [
    Text,TextArea,Number,Checkbox
])])*/
/*
const testme2:BasicSetting = [{name: "theme_info", theme_name:"jkjjkjj",theme_author:"hgilliuan", theme_version:'00.1'},
    { type: 'checkbox'},{ type: 'number'}]
const testme3:z.infer<typeof Number> = { type: 'number'}
*/
import { z } from 'zod'
import type { Merge } from 'type-fest'
import { tg } from '@snailicide/g-library'
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
const baseSchema: z.ZodObject<any> = z.object({
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
    id = undefined
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
/*

export type SettingSchema<T = 'default_array'> = T extends 'default_array'
    ? Setting<SettingTypes.TypeLiterals, string>[]
    : T extends Record<string, Setting>
        ? Array<
            {
                [Key in keyof T]: Key extends string
                ? Setting<T[Key]['type'], Key>
                : never
            }[keyof T]
            >
        : T
*/

export const getSetting = <
    Schema extends z.ZodObject<any>,
    ID extends undefined | string
>(
    value: Schema,
    id: string | undefined = undefined
): z.ZodObject<any> => {
    let _baseSchema: z.ZodObject<any> = z.object({
        label: z.string().optional(), ///todo: not sure if for shopify
        info: z.string().optional(),
        id: z.string(),
    })
    if (tg.isNotUndefined(id)) {
        _baseSchema = _baseSchema.merge(
            z.object({
                id: z.literal(id),
            })
        )
    }
    return value.merge(baseSchema)
}

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

export const parseSectionSchema = <
    Schema extends z.ZodSchema,
    Type = undefined
>(
    schema: Schema,
    value: Type extends undefined ? z.infer<typeof schema> : Type
): (Type extends undefined ? z.infer<typeof schema> : Type) | undefined =>
    schema.safeParse(value).success ? schema.parse(value) : undefined

export const debugSectionSchema = <
    Schema extends z.ZodSchema,
    Type = undefined
>(
    schema: Schema,
    value: Type extends undefined ? z.infer<typeof schema> : Type
): (Type extends undefined ? z.infer<typeof schema> : Type) | undefined =>
    schema.parse(value)

export {}
