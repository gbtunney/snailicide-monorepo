import { describe, expect, test } from 'vitest'

import type { LocalSchema } from './settings.js'
import { defineSchemaPreset } from './settings.js'
import type { SectionSchema } from './settings.schema.js'

describe('Section Schema Settings', () => {
    test('ShopifySchema.Section.Checkbox', () => {
        expect(true).toBe(true)
        type IconSettings = {
            icon_path: LocalSchema.Setting<'text'>
            color_toggle: LocalSchema.Setting<'checkbox'>
            preserve_toggle: LocalSchema.Setting<'checkbox'>
            icon_color: LocalSchema.Setting<'color'>
            css_classes: LocalSchema.Setting<'text'>
        }
        type TextBlockSettings = {
            text_content: LocalSchema.Setting<'text'>
            heading: LocalSchema.Setting<'text'>
        }
        type testType = LocalSchema.SettingType<'REQUIRED'>['checkbox']

        const ttt: testType = {
            default: true,
            id: 'anid',
            type: 'checkbox', //"dd"
        }
        type RichTextSettings = {
            bg_color: LocalSchema.Setting<'color'>
            fg_color: LocalSchema.Setting<'color'>
        }

        const test_icon_settings: LocalSchema.SettingSchema<IconSettings> = [
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

        const test_icon_settings_obj: IconSettings = {
            color_toggle: {
                default: false,
                info: 'Use TAILWIND classes for text-red-500 etc.',
                label: 'Override color',
                type: 'checkbox',
            },
            css_classes: {
                label: 'Add custom css below',
                type: 'text',
            },
            icon_color: {
                default: '#3d4246',
                label: 'Color',
                type: 'color',
            },
            icon_path: {
                default: 'mdi:alert',
                info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                label: 'Icon Path or SVG Filename:',
                type: 'text',
            },
            preserve_toggle: {
                default: false,
                //"label": "Preserve Default Colors",
                info: 'toggle preserve color ',
                type: 'checkbox',
            },
        }
        const test_generic: LocalSchema.SettingSchema<{
            another_setting: LocalSchema.Setting
        }> = [
            {
                id: 'another_setting',
                label: 'Add custom css below',
                type: 'text',
            },
        ]

        const test_generic_array: LocalSchema.SettingSchema = [
            {
                id: 'gillian',
                label: 'Add custom css below',
                type: 'text',
            },
        ]

        const test_text_settingspt2: LocalSchema.SettingSchema<TextBlockSettings> =
            [
                {
                    id: 'heading',
                    label: 'Add custom css below',
                    type: 'text',
                },
                {
                    default: 'mdi:alert',
                    id: 'text_content',
                    info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                    label: 'Icon Path or SVG Filename:',
                    type: 'text',
                },
            ]
        type RichTextBlocks = {
            icon: LocalSchema.Block<IconSettings>
            text: LocalSchema.Block<TextBlockSettings>
        }

        const testblock: LocalSchema.Block<RichTextSettings, 'icon'> = {
            settings: {
                bg_color: {
                    default: 'white',
                    type: 'color',
                },
                fg_color: {
                    default: 'black',
                    type: 'color',
                },
            },
            type: 'icon',
        }
        const _myblockNEW: LocalSchema.BlockSchema<RichTextBlocks> = [
            {
                settings: {
                    color_toggle: {
                        default: false,
                        info: 'Use TAILWIND classes for text-red-500 etc.',
                        label: 'Override color',
                        type: 'checkbox',
                    },
                    css_classes: {
                        label: 'Add custom css below',
                        type: 'text',
                    },
                    icon_color: {
                        default: '#3d4246',
                        label: 'Color',
                        type: 'color',
                    },
                    icon_path: {
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                        label: 'Icon Path or SVG Filename:',
                        type: 'text',
                    },
                    preserve_toggle: {
                        default: false,
                        info: 'toggle preserve color ',
                        type: 'checkbox',
                    },
                },
                type: 'icon',
            },
            {
                settings: {
                    heading: {
                        label: 'Add custom css below',
                        type: 'text',
                    },
                    text_content: {
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                        label: 'Icon Path or SVG Filename:',
                        type: 'text',
                    },
                },
                type: 'text',
            },
        ]
        const _myblock: RichTextBlocks = {
            icon: {
                settings: {
                    color_toggle: {
                        default: false,
                        info: 'Use TAILWIND classes for text-red-500 etc.',
                        label: 'Override color',
                        type: 'checkbox',
                    },
                    css_classes: {
                        label: 'Add custom css below',
                        type: 'text',
                    },
                    icon_color: {
                        default: '#3d4246',
                        label: 'Color',
                        type: 'color',
                    },
                    icon_path: {
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                        label: 'Icon Path or SVG Filename:',
                        type: 'text',
                    },
                    preserve_toggle: {
                        default: false,
                        //"label": "Preserve Default Colors",
                        info: 'toggle preserve color ',
                        type: 'checkbox',
                    },
                },
                type: 'icon',
            },
            text: {
                settings: {
                    heading: {
                        label: 'Add custom css below',
                        type: 'text',
                    },
                    text_content: {
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                        label: 'Icon Path or SVG Filename:',
                        type: 'text',
                    },
                },
                type: 'text',
            },
        }
        const TESTSCHEMA: LocalSchema.Schema<RichTextSettings, RichTextBlocks> =
            {
                blocks: _myblock,
                name: 'RICH TEXXT TEST',
                presets: [
                    {
                        blocks: [
                            {
                                type: 'icon',
                            },
                        ],
                        name: 'preset 1',
                        settings: {
                            bg_color: 'orange',
                        },
                    },
                    {
                        blocks: [
                            {
                                type: 'icon',
                            },
                        ],
                        name: 'preset 5',
                        settings: {
                            bg_color: 'orange',
                        },
                    },
                    {
                        blocks: [
                            {
                                settings: {
                                    color_toggle: true,
                                },
                                type: 'icon',
                            },
                            {
                                settings: {
                                    heading: 'heading1',
                                    text_content: 'ffffd',
                                },
                                type: 'text',
                            },
                        ],
                        name: 'preset 2',
                    },
                ],
                //  class:"dd",
                settings: {
                    bg_color: {
                        default: 'white',
                        type: 'color',
                    },
                    fg_color: {
                        default: 'black',
                        type: 'color',
                    },
                },
                templates: ['blog'],
            }

        const presetBlock = {
            settings: {
                heading: 'heading1',
                text_content: 'ffffd',
            },
            type: 'text',
        }

        const valuee = defineSchemaPreset(presetBlock.settings, 'test')
        const test2: SectionSchema.Settings = [
            { id: 'mycollection', label: 'Mycollection', type: 'collection' },
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
                info: 'toggle preserve color ',
                label: 'Preserve Toggle',
                type: 'checkbox',
            },
            {
                default: '#3d4246',
                id: 'icon_color',
                label: 'klk',
                type: 'color',
            },
            { id: 'css_classes', label: 'Add custom css below', type: 'color' },
        ]
    })
})
