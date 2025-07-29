/* * THIS WHOLE THING IS DEPRICATED * */

import { stringUtils, tg } from '@snailicide/g-library'
import { omit } from 'ramda'

import type { LocalSchema } from './settings.js'
import type { SectionSchema } from './settings.schema.js'

export const defineSchemaSettings = <Type extends LocalSchema.Settings>(
    value: LocalSchema.Settings,
    _prefix: string | undefined = undefined,
): SectionSchema.Settings => {
    return Object.entries(value).reduce<SectionSchema.Settings>(
        (accumulator: SectionSchema.Settings, [_key, _value]) => {
            let _id: string = _key
            let _label: string | undefined = undefined

            if (tg.isUndefined(_value.label)) {
                _label = capitalizeWords(
                    unCamelCase(
                        stringUtils.replaceCharacters({
                            pattern: ['_', '-'],
                            replacement: ' ',
                            value: _id,
                        }) as string,
                    ),
                )
            } else if (tg.isNotUndefined(_value.label)) _label = _value.label

            if (tg.isNotUndefined(_prefix) && tg.isNotUndefined(_id)) {
                _id = `${_prefix}${_id}`
            }
            if (tg.isNotUndefined(_id) && tg.isNotUndefined(_label)) {
                // @ts-expect-error: this is busted idk
                const newobj: LocalSchema.Setting<typeof _value> = {
                    ..._value,
                    id: _id,
                    label: _label,
                    type: _value,
                }
                return [...accumulator, newobj]
            }
            return accumulator
        },
        [],
    )
}
export const defineSchemaBlocks = <T extends LocalSchema.Blocks>(
    value: T,
    _prefix: string | undefined = undefined,
): SectionSchema.Blocks => {
    return Object.entries(value).reduce<SectionSchema.Blocks>(
        (accumulator, [_key, _value]) => {
            const _type: string = _key
            let _name: string | undefined = undefined

            if (tg.isUndefined(_value.name)) {
                _name = capitalizeWords(
                    unCamelCase(
                        stringUtils.replaceCharacters({
                            pattern: ['_', '-'],
                            replacement: ' ',
                            value: _type,
                        }) as string,
                    ),
                )
            } else if (tg.isNotUndefined(_value.name)) _name = _value.name

            if (
                tg.isNotUndefined(_value.settings) &&
                tg.isNonEmptyObject(_value.settings)
            ) {
                const settings = defineSchemaSettings(
                    _value.settings as LocalSchema.Settings,
                    _prefix,
                )
                if (tg.isNotUndefined(_type) && tg.isNotUndefined(_name)) {
                    const new_block: SectionSchema.Block = {
                        ..._value,
                        name: _name as string,
                        settings,
                        type: _key,
                    }
                    return [...accumulator, new_block]
                }
            }
            return accumulator
        },
        [],
    )
}
export const defineSectionSchema = <T extends LocalSchema.Schema>(
    value: T,
    _prefix: string | undefined = undefined,
): SectionSchema.Schema => {
    const _value: Omit<LocalSchema.Schema, 'settings' | 'blocks' | 'presets'> =
        omit(['settings', 'blocks', 'presets'], value)

    const _schema: SectionSchema.Schema = _value

    // tg.isNotUndefined<LocalSchema.Settings>(_value.settings )  && tg.isNonEmptyObject<LocalSchema.Settings>(_value.settings )

    if (
        tg.isNotUndefined(value.settings) &&
        tg.isNonEmptyObject(value.settings)
    ) {
        const mysetting = value.settings as LocalSchema.Settings
        _schema.settings = defineSchemaSettings(mysetting)
    }
    if (tg.isNotUndefined(value.blocks) && tg.isNonEmptyObject(value.blocks)) {
        const _myblocks = value.blocks as LocalSchema.Blocks
        _schema.blocks = defineSchemaBlocks(_myblocks)
    }
    if (tg.isNotUndefined(value.presets)) {
        // testme.presets =  value.presets//defineSchemaBlocks(value.blocks)
    }
    return _schema
}
export type { SettingTypes, Shared } from './setting.types.js'
const { capitalizeWords, unCamelCase } = stringUtils

export type { LocalSchema } from './settings.js'

export { defineBlocks, defineSchemaPreset, defineSettings } from './settings.js'

export type { SectionSchema } from './settings.schema.js'
