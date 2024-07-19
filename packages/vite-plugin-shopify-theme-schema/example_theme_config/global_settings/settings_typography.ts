import { Setting, SettingsMapped } from '@snailicide/g-shopify-library'
import { parseThemeSettingSection } from '@snailicide/g-shopify-library'
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
            type: 'font_picker',
            id: 'type_header_font',
            default: 'assistant_n4',
            label: 't:settings_schema.typography.settings.type_header_font.label',
            info: 't:settings_schema.typography.settings.type_header_font.info',
        },
        {
            type: 'range',
            id: 'heading_scale',
            min: 100,
            max: 150,
            step: 5,
            unit: '%',
            label: 't:settings_schema.typography.settings.heading_scale.label',
            default: 100,
        },
        {
            type: 'header',
            content: 't:settings_schema.typography.settings.header__2.content',
        },
        {
            type: 'font_picker',
            id: 'type_body_font',
            default: 'assistant_n4',
            label: 't:settings_schema.typography.settings.type_body_font.label',
            info: 't:settings_schema.typography.settings.type_body_font.info',
        },
        {
            type: 'range',
            id: 'body_scale',
            min: 100,
            max: 130,
            step: 5,
            unit: '%',
            label: 't:settings_schema.typography.settings.body_scale.label',
            default: 100,
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
