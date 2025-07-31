import { tg } from '@snailicide/g-library'
import * as chroma from 'chroma.ts'
import colors from 'windicss/colors'

import { tg_isCSSColorSpecial } from './../css.color.special.js'
import type { ThemeColors, WindiConfig } from './index.js'

export type useConfigDefaults = typeof useConfigDefaults
export const useConfigDefaults = () => {
    const defaultColors: ThemeColors = colors

    const getMapColorDefaults = (_colors: ThemeColors): ThemeColors => {
        return Object.entries(_colors).reduce((accumulator, [key, value]) => {
            let my_new_value: string | undefined = undefined
            if (tg.isString(value)) {
                if (tg_isCSSColorSpecial(value)) my_new_value = value
                else if (chroma.color(value as any))
                    my_new_value = chroma.color(value as any).hex()
                else return accumulator
                return { ...accumulator, [key]: my_new_value }
            } else {
                const colorObj = value as Record<string, string>
                if (tg.isNotUndefined(colorObj['DEFAULT']))
                    my_new_value = colorObj['DEFAULT']
                else if (tg.isNotUndefined(colorObj['500']))
                    my_new_value = colorObj['500']
                else return accumulator
                return {
                    ...accumulator,
                    ...{ [key]: { ...colorObj, DEFAULT: my_new_value } },
                }
            }
            return accumulator
        }, {})
    }

    const colorDefaultPresetFactory = (_colors: ThemeColors): WindiConfig => {
        return {
            theme: {
                extend: {
                    colors: getMapColorDefaults(_colors),
                },
            },
        }
    }
    const windiColorDefaultPreset = (): WindiConfig => {
        return colorDefaultPresetFactory(defaultColors)
    }
    return {
        colorDefaultPresetFactory,
        defaultColors,
        getMapColorDefaults,
        windiColorDefaultPreset,
    }
}

export default useConfigDefaults
