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
                default: 'mdi:alert',
                id: 'icon_path',
                info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                label: 'Icon Path or SVG Filename:',
                type: 'text',
            },
            {
                default: false,
                id: 'color_toggle',
                info: 'Use TAILWIND classes for text-red-500 etc.',
                label: 'Override color',
                type: 'checkbox',
            },
            {
                default: false,
                id: 'preserve_toggle',
                //"label": "Preserve Default Colors",
                info: 'toggle preserve color ',
                type: 'checkbox',
            },

            {
                default: '#3d4246',
                id: 'icon_color',
                label: 'Color',
                type: 'color',
            },
            {
                id: 'css_classes',
                label: 'Add custom css below',
                type: 'text',
            },
        ]

        const validateTest = parseSettings(test_icon_settings)
        const test_color_toggle: Setting<'checkbox', 'color_toggle'> = {
            default: false,
            id: 'color_toggle',
            info: 'Use TAILWIND classes for text-red-500 etc.',
            label: 'Override color',
            type: 'checkbox',
        } as const

        const test = parseSettings<
            // @ts-expect-error should throw error
            Array<Setting<'checkbox', 'color_toggle33'>>
        >([test_color_toggle])

        //this is how a section can be declared,typed, etc.
        type SectionSettingsExample = {
            bg_color: Setting<'color'>
            fg_color: Setting<'color'>
        }
        const exampleSectionSettings: SettingsMapped<SectionSettingsExample> = [
            {
                default: 'white',
                id: 'bg_color',
                type: 'color',
            },
            {
                default: 'black',
                id: 'fg_color',
                type: 'color',
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
                    default: 'black',
                    id: 'fg_color',
                    type: 'color',
                },
                'fg_color',
            ),
        ).toEqual({
            default: 'black',
            id: 'fg_color',
            type: 'color',
        })
        const obj2: Setting<'text'> = {
            id: 'hi',
            label: 'Add custom css below',
            //'css_classes',
            type: 'text',
        }

        const test_single_setting: SingleSetting = {
            default: 'assistant_n4',
            id: 'type_body_font',
            info: 't:settings_schema.typography.settings.type_body_font.info',
            label: 't:settings_schema.typography.settings.type_body_font.label',
            type: 'font_picker',
        }
        const badSettingsFromDawn = [
            {
                content:
                    't:settings_schema.typography.settings.header__1.content',
                type: 'header',
            },
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
                content:
                    't:settings_schema.typography.settings.header__2.content',
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
                label: 't:settings_schema.typography.settings.body_scale.label',
                max: 130,
                //"id": "body_scale",
                min: 100,
                step: 5,
                type: 'range',
                unit: '%',
            },
        ]
        expect(parseSettings(badSettingsFromDawn)).toBe(undefined)
    })
})
export {}
