import type { Merge } from 'type-fest'
import { z } from 'zod'

import { BasicSettings } from './basic.js'
import { ShopifySettings } from './shopify.js'
import { SidebarSettings } from './sidebar.js'
import { SpecializedSettings } from './specialized.js'
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
export type SettingTypes = keyof typeof SettingSchemaMap
export type AllSettingTypes = SettingTypes

export type Setting<
    Type extends keyof typeof SettingSchemaMap = keyof typeof SettingSchemaMap,
    id extends string = string,
> = Type extends 'paragraph' | 'header'
    ? z.infer<(typeof SettingSchemaMap)[Type]>
    : Merge<
          z.infer<(typeof SettingSchemaMap)[Type]>,
          id extends string
              ? Merge<z.infer<typeof baseSchema>, { id: id }>
              : z.infer<typeof baseSchema>
      >

export type SettingsMapped<T extends Record<string, Setting>> = Array<
    {
        [Key in keyof T]: Key extends string
            ? Setting<T[Key]['type'], Key>
            : never
    }[keyof T]
>

export const getSettingSchema = (id: string | undefined = undefined) => {
    let baseSchemaID = z.object({
        label: z.string().optional(), ///todo: not sure if for shopify
        info: z.string().optional(),
        id: z.string(),
    })

    if (id !== undefined) {
        baseSchemaID = z.object({
            label: z.string().optional(), ///todo: not sure if for shopify
            info: z.string().optional(),
            id: z.string().regex(new RegExp(id)),
        })
    }

    return z.union([
        z.intersection(
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
            ]),
            baseSchemaID,
        ),

        z.discriminatedUnion('type', [
            SidebarSettings.paragraph,
            SidebarSettings.header,
        ]),
    ])
}
export const getSettingGroupSchema = () => {
    return z.array(getSettingSchema())
}

export type SingleSetting = z.infer<ReturnType<typeof getSettingSchema>>
export type Settings = z.infer<ReturnType<typeof getSettingGroupSchema>>
export type SettingGroup = Settings

export const parseValidatorFactory =
    <T extends z.ZodTypeAny>(schema: T) =>
    (data: unknown): data is z.infer<T> => {
        return schema.safeParse(data).success
    }
const getSettingsFactory =
    <
        T extends
            | ReturnType<typeof getSettingGroupSchema>
            | ReturnType<typeof getSettingSchema>,
    >(
        schema: T,
    ) =>
    (data: unknown): z.infer<T> | undefined => {
        if (parseValidatorFactory(schema)(data)) {
            return schema.parse(data)
        }
        return undefined
    }

export const parseSettings = getSettingsFactory(getSettingGroupSchema())

export const parseSettingsGroup = (
    data: unknown,
    id_prefix: string | undefined = undefined,
    id_suffix: string | undefined = undefined,
) => {
    const _schema = getSettingGroupSchema().transform((data_array) => {
        /* * Transform result to add prefix/suffix * */
        return data_array.map((data_value) => {
            let _data_value = data_value
            if (
                data_value.type !== 'header' &&
                data_value.type !== 'paragraph'
            ) {
                _data_value = {
                    ...data_value,
                    id: `${id_prefix !== undefined ? id_prefix : ''}${
                        data_value.id
                    }${id_suffix !== undefined ? id_suffix : ''}`,
                }
            }
            return _data_value
        })
    })
    if (parseValidatorFactory(_schema)(data)) {
        return _schema.parse(data)
    } else return undefined
}

export const parseSingleSetting = (
    data: unknown,
    id: string | undefined = undefined,
) => {
    const _schema = getSettingSchema(id)
    if (parseValidatorFactory(_schema)(data)) {
        return _schema.parse(data)
    } else return undefined
}
export const parseSetting = parseSingleSetting

export {}
