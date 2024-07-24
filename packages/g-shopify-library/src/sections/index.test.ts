import { describe, expect, test } from 'vitest'

const example_block = [
    {
        settings: [
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
        ],
        type: 'icon',
    },

    {
        settings: [
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
        ],
        type: 'text',
    },
]

const example_section_full = {
    blocks: example_block,
    class: 'dd',
    name: 'RICH TEXT TEST',
    settings: [
        { default: 'white', id: 'bg_color', type: 'color' },
        {
            default: 'black',
            id: 'fg_color',
            type: 'color',
        },
    ],
    templates: ['blog'],
}

//todo:write tests
describe('SECTION SCHEMA', () => {
    test('SECTION SCHEMA', () => {
        expect(true).toBe(true)
        /* expect(parseSectionSchema(sectionSchema, example_section_full)).toBe(
            true
        )*/
    })
})
export {}
