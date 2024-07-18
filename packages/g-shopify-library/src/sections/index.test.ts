import { describe, expect, test } from 'vitest'

const example_block = [
    {
        type: 'icon',
        settings: [
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
        ],
    },

    {
        type: 'text',
        settings: [
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
        ],
    },
]

const example_section_full = {
    name: 'RICH TEXT TEST',
    templates: ['blog'],
    class: 'dd',
    settings: [
        { id: 'bg_color', type: 'color', default: 'white' },
        {
            id: 'fg_color',
            type: 'color',
            default: 'black',
        },
    ],
    blocks: example_block,
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
