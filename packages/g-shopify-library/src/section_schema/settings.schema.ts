import type { SettingTypes, Shared } from './setting.types.js'

/* * Section Schema - this is the full setting types required by the schema. * */
export namespace SectionSchema {
    ///this is a list of the full types like:         type BasicList = Text | TextArea | Number | Checkbox | Radio | Range | Select

    export type Setting<Type = SettingTypes.TypeLiterals> = {
        id: string
        label: string
        info?: string
    } & SettingTypes.SettingBase<Type>

    export type Settings = Array<Setting>

    export type Block = {
        type: string
        name: string
        limit?: number
        settings: Settings
    }

    export type Blocks = Array<Block>

    /* * This is just a loose type for now.   * */
    export type PresetSettings = Record<string, string | boolean | number>

    export type Preset = {
        name: string
        settings: PresetSettings
        blocks: Array<{
            type: string
            settings: PresetSettings
        }>
    }

    export type Presets = Array<Preset>

    export type Schema = Shared.SchemaBase & {
        settings?: Settings
        blocks?: Array<Block>
        presets?: Array<Preset>
    }
}
