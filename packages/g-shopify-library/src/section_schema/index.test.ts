import type { LocalSchema } from './settings.js'
import type { SectionSchema } from './settings.schema.js'
import { defineSchemaPreset } from './settings.js'

describe('Section Schema Settings', () => {
    it('ShopifySchema.Section.Checkbox', () => {
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
            id: 'anid',
            type: 'checkbox',
            default: true, //"dd"
        }
        type RichTextSettings = {
            bg_color: LocalSchema.Setting<'color'>
            fg_color: LocalSchema.Setting<'color'>
        }

        const test_icon_settings: LocalSchema.SettingSchema<IconSettings> = [
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

        const test_icon_settings_obj: IconSettings = {
            icon_path: {
                type: 'text',
                label: 'Icon Path or SVG Filename:',
                default: 'mdi:alert',
                info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
            },
            color_toggle: {
                type: 'checkbox',
                default: false,
                label: 'Override color',
                info: 'Use TAILWIND classes for text-red-500 etc.',
            },
            preserve_toggle: {
                type: 'checkbox',
                default: false,
                //"label": "Preserve Default Colors",
                info: 'toggle preserve color ',
            },
            icon_color: {
                type: 'color',
                label: 'Color',
                default: '#3d4246',
            },
            css_classes: {
                type: 'text',
                label: 'Add custom css below',
            },
        }
        const test_generic: LocalSchema.SettingSchema<{
            another_setting: LocalSchema.Setting
        }> = [
            {
                id: 'another_setting',
                type: 'text',
                label: 'Add custom css below',
            },
        ]

        const test_generic_array: LocalSchema.SettingSchema = [
            {
                id: 'gillian',
                type: 'text',
                label: 'Add custom css below',
            },
        ]

        const test_text_settingspt2: LocalSchema.SettingSchema<TextBlockSettings> =
            [
                {
                    id: 'heading',
                    type: 'text',
                    label: 'Add custom css below',
                },
                {
                    id: 'text_content',
                    type: 'text',
                    label: 'Icon Path or SVG Filename:',
                    default: 'mdi:alert',
                    info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                },
            ]
        type RichTextBlocks = {
            icon: LocalSchema.Block<IconSettings>
            text: LocalSchema.Block<TextBlockSettings>
        }

        const testblock: LocalSchema.Block<RichTextSettings, 'icon'> = {
            type: 'icon',
            settings: {
                bg_color: {
                    type: 'color',
                    default: 'white',
                },
                fg_color: {
                    type: 'color',
                    default: 'black',
                },
            },
        }
        const _myblockNEW: LocalSchema.BlockSchema<RichTextBlocks> = [
            {
                type: 'icon',
                settings: {
                    icon_path: {
                        type: 'text',
                        label: 'Icon Path or SVG Filename:',
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                    },
                    color_toggle: {
                        type: 'checkbox',
                        default: false,
                        label: 'Override color',
                        info: 'Use TAILWIND classes for text-red-500 etc.',
                    },
                    preserve_toggle: {
                        type: 'checkbox',
                        default: false,
                        info: 'toggle preserve color ',
                    },
                    icon_color: {
                        type: 'color',
                        label: 'Color',
                        default: '#3d4246',
                    },
                    css_classes: {
                        type: 'text',
                        label: 'Add custom css below',
                    },
                },
            },
            {
                type: 'text',
                settings: {
                    heading: {
                        type: 'text',
                        label: 'Add custom css below',
                    },
                    text_content: {
                        type: 'text',
                        label: 'Icon Path or SVG Filename:',
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                    },
                },
            },
        ]
        const _myblock: RichTextBlocks = {
            icon: {
                type: 'icon',
                settings: {
                    icon_path: {
                        type: 'text',
                        label: 'Icon Path or SVG Filename:',
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                    },
                    color_toggle: {
                        type: 'checkbox',
                        default: false,
                        label: 'Override color',
                        info: 'Use TAILWIND classes for text-red-500 etc.',
                    },
                    preserve_toggle: {
                        type: 'checkbox',
                        default: false,
                        //"label": "Preserve Default Colors",
                        info: 'toggle preserve color ',
                    },
                    icon_color: {
                        type: 'color',
                        label: 'Color',
                        default: '#3d4246',
                    },
                    css_classes: {
                        type: 'text',
                        label: 'Add custom css below',
                    },
                },
            },
            text: {
                type: 'text',
                settings: {
                    heading: {
                        type: 'text',
                        label: 'Add custom css below',
                    },
                    text_content: {
                        type: 'text',
                        label: 'Icon Path or SVG Filename:',
                        default: 'mdi:alert',
                        info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                    },
                },
            },
        }
        const TESTSCHEMA: LocalSchema.Schema<RichTextSettings, RichTextBlocks> =
            {
                name: 'RICH TEXXT TEST',
                templates: ['blog'],
                //  class:"dd",
                settings: {
                    bg_color: {
                        type: 'color',
                        default: 'white',
                    },
                    fg_color: {
                        type: 'color',
                        default: 'black',
                    },
                },
                blocks: _myblock,
                presets: [
                    {
                        name: 'preset 1',
                        settings: {
                            bg_color: 'orange',
                        },
                        blocks: [
                            {
                                type: 'icon',
                            },
                        ],
                    },
                    {
                        name: 'preset 5',
                        settings: {
                            bg_color: 'orange',
                        },
                        blocks: [
                            {
                                type: 'icon',
                            },
                        ],
                    },
                    {
                        name: 'preset 2',
                        blocks: [
                            {
                                type: 'icon',
                                settings: {
                                    color_toggle: true,
                                },
                            },
                            {
                                type: 'text',
                                settings: {
                                    heading: 'heading1',
                                    text_content: 'ffffd',
                                },
                            },
                        ],
                    },
                ],
            }

        const presetBlock = {
            type: 'text',
            settings: {
                heading: 'heading1',
                text_content: 'ffffd',
            },
        }

        const valuee = defineSchemaPreset(presetBlock.settings, 'test')
        const test2: SectionSchema.Settings = [
            { type: 'collection', id: 'mycollection', label: 'Mycollection' },
            {
                type: 'text',
                label: 'Icon Path or SVG Filename:',
                default: 'mdi:alert',
                info: '%ASSET% : For asset_url \nor can take URL or iconify icon with :',
                id: 'icon_path',
            },
            {
                type: 'checkbox',
                default: false,
                label: 'Override color',
                info: 'Use TAILWIND classes for text-red-500 etc.',
                id: 'color_toggle',
            },
            {
                type: 'checkbox',
                default: false,
                info: 'toggle preserve color ',
                id: 'preserve_toggle',
                label: 'Preserve Toggle',
            },
            {
                type: 'color',
                label: 'klk',
                default: '#3d4246',
                id: 'icon_color',
            },
            { type: 'color', label: 'Add custom css below', id: 'css_classes' },
        ]
    })
})
