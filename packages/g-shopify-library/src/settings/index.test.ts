import { describe, expect, test } from 'vitest'

import {
    parseSettings,
    parseSettingsGroup,
    parseSingleSetting,
    Setting,
    SettingsMapped,
    SingleSetting,
} from './index.js'

describe('zod', () => {
    test('zod', () => {
        type ExampleIconSettings = {
            icon_path: Setting<'text'>
            color_toggle: Setting<'checkbox'>
            preserve_toggle: Setting<'checkbox'>
            icon_color: Setting<'color'>
            css_classes: Setting<'text'>
        }

        const test_icon_settings: SettingsMapped<ExampleIconSettings> = [
            {
                id: 'icon_path',
                type: 'text',
                label: 'Icon Path or SVG Filename:',
                default: 'mdi:alert',
                info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
            },
            {
                id: 'color_toggle',
                type: 'checkbox',
                default: false,
                label: 'Override color',
                info: 'Use TAILWIND classes for text-red-500 etc.',
            },
            {
                id: 'preserve_toggle',
                type: 'checkbox',
                default: false,
                //"label": "Preserve Default Colors",
                info: 'toggle preserve color ',
            },

            {
                id: 'icon_color',
                type: 'color',
                label: 'Color',
                default: '#3d4246',
            },
            {
                id: 'css_classes',
                type: 'text',
                label: 'Add custom css below',
            },
        ]

        const validateTest = parseSettings(test_icon_settings)
        const test_color_toggle: Setting<'checkbox', 'color_toggle'> = {
            id: 'color_toggle',
            type: 'checkbox',
            default: false,
            label: 'Override color',
            info: 'Use TAILWIND classes for text-red-500 etc.',
        } as const

        const test = parseSettings<
            // @ts-expect-error should throw error
            Setting<'checkbox', 'color_toggle33'>[]
        >([test_color_toggle])

        //this is how a section can be declared,typed, etc.
        type SectionSettingsExample = {
            bg_color: Setting<'color'>
            fg_color: Setting<'color'>
        }
        const exampleSectionSettings: SettingsMapped<SectionSettingsExample> = [
            {
                id: 'bg_color',
                type: 'color',
                default: 'white',
            },
            {
                id: 'fg_color',
                type: 'color',
                default: 'black',
            },
        ]
        expect(parseSettings(exampleSectionSettings)).toEqual([
            { default: 'white', id: 'bg_color', type: 'color' },
            { default: 'black', id: 'fg_color', type: 'color' },
        ])

        expect(parseSettings(exampleSectionSettings)).toEqual([
            { default: 'white', id: 'bg_color', type: 'color' },
            { default: 'black', id: 'fg_color', type: 'color' },
        ])

        expect(parseSettingsGroup(exampleSectionSettings, 'prefix_')).toEqual([
            { default: 'white', id: 'prefix_bg_color', type: 'color' },
            { default: 'black', id: 'prefix_fg_color', type: 'color' },
        ])

        expect(
            parseSingleSetting(
                {
                    id: 'fg_color',
                    type: 'color',
                    default: 'black',
                },
                'fg_color',
            ),
        ).toEqual({
            id: 'fg_color',
            type: 'color',
            default: 'black',
        })
        const obj2: Setting<'text'> = {
            id: 'hi', //'css_classes',
            type: 'text',
            label: 'Add custom css below',
        }

        const test_single_setting: SingleSetting = {
            type: 'font_picker',
            id: 'type_body_font',
            default: 'assistant_n4',
            label: 't:settings_schema.typography.settings.type_body_font.label',
            info: 't:settings_schema.typography.settings.type_body_font.info',
        }
        const badSettingsFromDawn = [
            {
                type: 'header',
                content:
                    't:settings_schema.typography.settings.header__1.content',
            },
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
                content:
                    't:settings_schema.typography.settings.header__2.content',
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
                //"id": "body_scale",
                min: 100,
                max: 130,
                step: 5,
                unit: '%',
                label: 't:settings_schema.typography.settings.body_scale.label',
                default: 100,
            },
        ]
        expect(parseSettings(badSettingsFromDawn)).toBe(undefined)
    })
})
export {}
