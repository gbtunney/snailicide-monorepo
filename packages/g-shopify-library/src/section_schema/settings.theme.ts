import { LocalSchema } from './settings'

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
    type_header_font: {
        type: 'font_picker',
        default: 'assistant_n4',
        label: 't:settings_schema.typography.settings.type_header_font.label',
        info: 't:settings_schema.typography.settings.type_header_font.info',
    },
    heading_scale: {
        type: 'range',
        min: 100,
        max: 150,
        step: 5,
        unit: '%',
        label: 't:settings_schema.typography.settings.heading_scale.label',
        default: 100,
    },
}

const themeSettings: LocalSchema.ThemeSettingsSchema<ThemeSettings> = {
    theme_info: {
        name: 'theme_info',
        theme_name: 'test',
        theme_author: 'gbt',
        theme_version: '0.0.1',
    },
    typography: {
        name: 'Typography',
        settings: typeSettings,
    },
    color: {
        name: 'myColorName',
        settings: {
            bg_color: {
                type: 'color',
                default: '#ff0000',
            },
            fg_color: {
                type: 'color',
            },
        },
    },
}
export {}
