import {
    parseThemeSettingSection,
    Setting,
    SettingsMapped,
} from '@snailicide/g-shopify-library'
type TypographySettingsGroup = {
    test_header: Setting<'header'>
    type_header_font: Setting<'font_picker'>
    heading_scale: Setting<'range'>
    type_body_font: Setting<'font_picker'>
    body_scale: Setting<'range'>
}
const getSchema = () => {
    const typography_settings: SettingsMapped<TypographySettingsGroup> = [
        {
            default: 'assistant_n4',
            id: 'type_header_font',
            info: 't:settings_schema.typography.settings.type_header_font.info',
            label: 't:settings_schema.typography.settings.type_header_font.label',
            type: 'font_picker',
        },
        {
            default: 100,
            id: 'heading_scale',
            label: 't:settings_schema.typography.settings.heading_scale.label',
            max: 150,
            min: 100,
            step: 5,
            type: 'range',
            unit: '%',
        },
        {
            content: 't:settings_schema.typography.settings.header__2.content',
            type: 'header',
        },
        {
            default: 'assistant_n4',
            id: 'type_body_font',
            info: 't:settings_schema.typography.settings.type_body_font.info',
            label: 't:settings_schema.typography.settings.type_body_font.label',
            type: 'font_picker',
        },
        {
            default: 100,
            id: 'body_scale',
            label: 't:settings_schema.typography.settings.body_scale.label',
            max: 130,
            min: 100,
            step: 5,
            type: 'range',
            unit: '%',
        },
    ]

    const typography_group = {
        name: 't:settings_schema.typography.name',
        settings: typography_settings,
    }
    const result = parseThemeSettingSection(typography_group)
    if (result !== undefined) {
        return result
    } else {
        console.log('typography_group COMPILE ERROR!!')
        return {}
    }
}
export default getSchema()
