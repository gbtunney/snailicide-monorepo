import { tg } from '@snailicide/g-library'
import * as RA from 'ramda-adjunct'
import type { Simplify } from 'type-fest'

import type { SettingTypes, Shared } from './setting.types.js'
import type { SectionSchema } from './settings.schema.js'
/* eslint  @typescript-eslint/no-empty-object-type: "off" */

export namespace LocalSchema {
    export type Setting<
        Type = SettingTypes.TypeLiterals,
        id = undefined,
    > = SettingTypes.SettingBase<
        Type extends SettingTypes.TypeLiterals ? Type : never
    > & {
        label?: string
        info?: string
    } & (id extends undefined | 'NONE'
            ? {}
            : id extends 'OPTIONAL'
              ? { id?: string }
              : id extends 'REQUIRED'
                ? { id: string }
                : { id: id })

    export type SettingType<id = undefined> = {
        [Key in SettingTypes.TypeLiterals as `${Key}`]: Setting<Key, id>
    }
    export type Settings = Record<string, Setting>

    export type SettingSchema<T = 'default_array'> = T extends 'default_array'
        ? Array<Setting<SettingTypes.TypeLiterals, string>>
        : T extends Record<string, Setting>
          ? Array<
                {
                    [Key in keyof T]: Key extends string
                        ? Setting<T[Key]['type'], Key>
                        : never
                }[keyof T]
            >
          : T

    export type Block<_Settings = {}, TypeString = string> = {
        type: TypeString extends string ? TypeString : undefined //"gillian"
        name?: string
        limit?: number
        settings?: _Settings
    }

    export type BlockSchema<T extends Record<string, Block>> = Array<
        {
            [Key in keyof T]: Block<T[Key]['settings'], Key>
        }[keyof T]
    >

    export type Blocks = Record<string, Block>

    export type PresetSettings<T = undefined> = T extends Settings
        ? Partial<{ [Key in keyof T]: SettingTypes.Default<T[Key]> }>
        : never // TODO: ? Record<string, string | boolean | number>

    export type BlockPreset<T extends Record<string, Block>> = Array<
        {
            [Key in keyof T]: {
                type: Key
                name?: string //> type?
                settings?: PresetSettings<Simplify<T[Key]['settings']>>
            }
        }[keyof T]
    >

    export type Preset<_Settings = {}, _Blocks = {}> = {
        name: string
        settings?: _Settings extends Settings
            ? PresetSettings<_Settings>
            : 'ggg'
        blocks?: _Blocks extends Blocks ? BlockPreset<_Blocks> : {}
    }
    export type Presets<_Settings = {}, _Blocks = {}> = Array<
        Preset<_Settings, _Blocks>
    >

    export type Schema<_Settings = {}, _Blocks = Blocks> = Shared.SchemaBase & {
        settings?: _Settings extends Settings ? _Settings : never
        blocks?: _Blocks extends Blocks ? _Blocks : never
        presets: _Settings extends Settings
            ? Array<Preset<_Settings, _Blocks>>
            : []
    }

    export type ThemeCategory<
        _Settings extends Settings,
        TypeString = string,
    > = {
        name?: TypeString extends string ? TypeString : never
        settings: _Settings
    }
    export type ThemeCategories = Record<string, LocalSchema.ThemeCategory<{}>>

    export type ThemeSettingsSchema<_ThemeCategories = ThemeCategories> = {
        theme_info: SettingTypes.ThemeInfo
    } & _ThemeCategories
}

export const defineSettings = (
    value: LocalSchema.Settings,
    _prefix: string | undefined = undefined,
): LocalSchema.Settings => {
    return Object.entries(value).reduce(
        (accumulator: LocalSchema.Settings, [_key, _value]) => {
            return {
                ...accumulator,
                [`${tg.isNotUndefined<string>(_prefix) ? _prefix : ''}${_key}`]:
                    _value,
            }
        },
        {},
    )
}

export const defineBlocks = (
    value: LocalSchema.Blocks,
    _prefix: Array<string> | string | undefined = undefined,
) => {
    const prefixArr: Array<string> | undefined = tg.isNotUndefined<
        string | Array<string>
    >(_prefix)
        ? RA.ensureArray(_prefix)
        : undefined
    return Object.entries(value).reduce<LocalSchema.Blocks | {}>(
        (accumulator, [_key, _value], index) => {
            const _type: string = _key
            let newPrefixValue: undefined | string = undefined
            if (tg.isNotUndefined(_value.settings)) {
                if (tg.isNotUndefined<Array<string>>(prefixArr)) {
                    if (prefixArr[index]) {
                        newPrefixValue = prefixArr[index]
                    } else if (prefixArr.length > 0)
                        newPrefixValue = prefixArr[0]
                }
                if (
                    tg.isNotUndefined<LocalSchema.Settings>(_value.settings) &&
                    tg.isNonEmptyObject<LocalSchema.Settings>(_value.settings)
                ) {
                    const settings: LocalSchema.Settings = defineSettings(
                        _value.settings,
                        newPrefixValue,
                    )
                    return { ...accumulator, [_type]: { ..._value, settings } }
                }
            }
            return accumulator
        },
        {},
    )
}
/* * Define Schema Preset - this is mostly for prefixing something. * */
export const defineSchemaPreset = (
    value: SectionSchema.PresetSettings,
    _prefix: string | undefined = undefined,
) => {
    if (tg.isNotUndefined(value)) {
        return Object.entries(value).reduce(
            (
                accumulator,
                [_key, _value]: [string, unknown],
                currentIndex,
                array,
            ) => {
                // if (tg.isNotUndefined(_value)) {
                if (tg.isNotUndefined<string>(_prefix)) {
                    return { ...accumulator, [`${_prefix}${_key}`]: _value }
                } else {
                    return { ...accumulator, [_key]: _value }
                }
                // }
                // return accumulator
            },
            {},
        )
    }
    return
}
