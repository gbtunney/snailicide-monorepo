import { stringUtils, tg } from '@snailicide/g-library'
const { capitalizeWords, unCamelCase } = stringUtils

import { stringTransform } from '@snailicide/g-library'
import * as R from 'ramda'
import type { LocalSchema } from './settings.js'
import type { SectionSchema } from './settings.schema.js'

export type { SettingTypes, Shared } from './setting.types.js'
export type { LocalSchema } from './settings.js'
export type { SectionSchema } from './settings.schema.js'
export { defineSettings, defineBlocks, defineSchemaPreset } from './settings.js'

type DefineSettingsSchema = <
    T = LocalSchema.Settings,
    SettingDef = T extends LocalSchema.Settings ? T : LocalSchema.Settings
>(
    value: SettingDef,
    prefix?: string
) => SectionSchema.Settings

export const defineSchemaSettings = <Type extends LocalSchema.Settings>(
    value: Type,
    _prefix: string | undefined = undefined
) => {
    return Object.entries(value).reduce(
        (
            accumulator: SectionSchema.Settings,
            [_key, _value],
            currentIndex,
            array
        ) => {
            let _id: string = _key
            let _label: string | undefined = undefined

            if (tg.isUndefined<string>(_value.label)) {
                _label = capitalizeWords(
                    unCamelCase(
                        stringTransform.replaceCharacters({
                            value: _id,
                            pattern: ['_', '-'],
                            replacement: ' ',
                        }) as string
                    )
                )
            } else if (tg.isNotUndefined<string>(_value.label))
                _label = _value.label

            if (
                tg.isNotUndefined<string>(_prefix) &&
                tg.isNotUndefined<string>(_id)
            ) {
                _id = `${_prefix}${_id}`
            }
            if (
                tg.isNotUndefined<string>(_id) &&
                tg.isNotUndefined<string>(_label)
            ) {
                const newobj: SectionSchema.Setting = {
                    ..._value,
                    id: _id,
                    label: _label,
                }
                return [...accumulator, newobj]
            }
            return accumulator
        },
        []
    )
}

export const defineSchemaBlocks = <T = LocalSchema.Blocks>(
    value: T extends LocalSchema.Blocks ? T : never,
    _prefix: string | undefined = undefined
) => {
    return Object.entries(value).reduce(
        (accumulator: SectionSchema.Blocks, [_key, _value]) => {
            const _type: string = _key
            let _name: string | undefined = undefined

            if (tg.isUndefined<string>(_value.name)) {
                _name = capitalizeWords(
                    unCamelCase(
                        stringTransform.replaceCharacters({
                            value: _type,
                            pattern: ['_', '-'],
                            replacement: ' ',
                        }) as string
                    )
                )
            } else if (tg.isNotUndefined<string>(_value.name))
                _name = _value.name

            if (
                tg.isNotUndefined(_value.settings) &&
                tg.isNonEmptyObject(_value.settings)
            ) {
                const settings = defineSchemaSettings(_value.settings, _prefix)
                if (
                    tg.isNotUndefined<string>(_type) &&
                    tg.isNotUndefined<string>(_name)
                ) {
                    const new_block: SectionSchema.Block = {
                        ..._value,
                        type: _key,
                        name: _name,
                        settings,
                    }
                    return [...accumulator, new_block]
                }
            }
            return accumulator
        },
        []
    )
}

export const defineSectionSchema = <T = LocalSchema.Schema>(
    value: T extends LocalSchema.Schema ? T : never,
    _prefix: string | undefined = undefined
): SectionSchema.Schema => {
    const _value: Omit<LocalSchema.Schema, 'settings' | 'blocks' | 'presets'> =
        R.omit(['settings', 'blocks', 'presets'], value)

    const _schema: SectionSchema.Schema = _value

    if (tg.isNotUndefined(value.settings)) {
        _schema.settings = defineSchemaSettings(value.settings)
    }
    if (tg.isNotUndefined(value.blocks)) {
        _schema.blocks = defineSchemaBlocks(value.blocks)
    }
    if (tg.isNotUndefined(value.presets)) {
        // testme.presets =  value.presets//defineSchemaBlocks(value.blocks)
    }
    return _schema
}
