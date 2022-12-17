import { Setting, SettingsMapped, validateSettingsSchema } from './index.js'

describe('zod', () => {
    it('zod', () => {
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

        const validateTest = validateSettingsSchema(test_icon_settings)
        const test_color_toggle: Setting<'checkbox', 'color_toggle'> = {
            id: 'color_toggle',
            type: 'checkbox',
            default: false,
            label: 'Override color',
            info: 'Use TAILWIND classes for text-red-500 etc.',
        } as const

        const test = validateSettingsSchema<
            Setting<'checkbox', 'color_toggle33'>[]
            // @ts-expect-error should throw error
        >([test_color_toggle])

        //this is how a section can be declared,typed, etc.
        type SectionSettingsExample = {
            bg_color: Setting<'color'>
            fg_color: Setting<'color'>
        }
        const exampleSection: SettingsMapped<SectionSettingsExample> = [
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
        expect(validateSettingsSchema(exampleSection)).toBe(true)
        const obj2: Setting<'text'> = {
            id: 'hi', //'css_classes',
            type: 'text',
            label: 'Add custom css below',
        }
    })
})
export {}
