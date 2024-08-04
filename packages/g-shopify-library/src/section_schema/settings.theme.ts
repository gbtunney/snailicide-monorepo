import { LocalSchema } from './settings.js'

type TypographySettings = {
    type_header_font: LocalSchema.Setting<'font_picker'>
    heading_scale: LocalSchema.Setting<'range'>
}

type ThemeSettings = {
    typography: LocalSchema.ThemeCategory<TypographySettings>
    color: LocalSchema.ThemeCategory<
        {
            bg_color: LocalSchema.Setting<'color'>
            fg_color: LocalSchema.Setting<'color'>
        },
        'myColorName' | 'myAlternateName'
    >
}

const typeSettings: TypographySettings = {
    heading_scale: {
        default: 100,
        label: 't:settings_schema.typography.settings.heading_scale.label',
        max: 150,
        min: 100,
        step: 5,
        type: 'range',
        unit: '%',
    },
    type_header_font: {
        default: 'assistant_n4',
        info: 't:settings_schema.typography.settings.type_header_font.info',
        label: 't:settings_schema.typography.settings.type_header_font.label',
        type: 'font_picker',
    },
}

const themeSettings: LocalSchema.ThemeSettingsSchema<ThemeSettings> = {
    color: {
        name: 'myColorName',
        settings: {
            bg_color: {
                default: '#ff0000',
                type: 'color',
            },
            fg_color: {
                type: 'color',
            },
        },
    },
    theme_info: {
        name: 'theme_info',
        theme_author: 'gbt',
        theme_name: 'test',
        theme_version: '0.0.1',
    },
    typography: {
        name: 'Typography',
        settings: typeSettings,
    },
}
export {}
