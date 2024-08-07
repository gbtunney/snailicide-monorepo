import { describe, expect, test } from 'vitest'

import useColorScale, { ColorScaleConfigCollection } from './use-color-scale.js'

describe('useColorScale', () => {
    test('getColorScale', () => {
        const TEST_CONFIG: ColorScaleConfigCollection = {
            'gradient': {
                color_count: 9,
                default_color: 'red',
                scale: ['yellow', 'red', 'black'],
            },
            'newgumleaf': {
                default_color: 'afd3c2',
            },
            'potter-winkle': {
                default_color: 'CCCCFF',
            },
        }

        expect(useColorScale().getColorScale(TEST_CONFIG)).toEqual({
            'gradient': {
                '100': '#fffe00',
                '200': '#ffd000',
                '300': '#ff9c00',
                '400': '#ff5d00',
                '500': '#e80000',
                '600': '#b00000',
                '700': '#7b0000',
                '800': '#490000',
                '900': '#010000',
                'DEFAULT': '#ff0000',
            },
            'newgumleaf': {
                '100': '#010101',
                '200': '#333e39',
                '300': '#677c72',
                '400': '#a0c1b1',
                '500': '#ffffff',
                'DEFAULT': '#afd3c2',
            },
            'potter-winkle': {
                '100': '#010101',
                '200': '#3a3a49',
                '300': '#757592',
                '400': '#b4b4e2',
                '500': '#ffffff',
                'DEFAULT': '#ccccff',
            },
        })
    })
})
export {}
