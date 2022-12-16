import { tg } from '@snailicide/g-library'
import * as chroma from 'chroma.ts'
import colors from 'windicss/colors'
import type { WindiConfig, ThemeColors } from './index.js'
import { tg_isCSSColorSpecial } from './../css.color.special.js'

export type useConfigDefaults = typeof useConfigDefaults
export const useConfigDefaults = () => {
    const defaultColors: ThemeColors = colors

    const getMapColorDefaults = (_colors: ThemeColors): ThemeColors => {
        return Object.entries(_colors).reduce((accumulator, [key, value]) => {
            let my_new_value: string | undefined = undefined
            if (tg.isString(value)) {
                if (tg_isCSSColorSpecial(value)) my_new_value = value
                else if (chroma.color(value))
                    my_new_value = chroma.color(value).hex()
                else return accumulator
                return { ...accumulator, [key]: my_new_value }
            } else {
                if (tg.isNotUndefined<string>(value['DEFAULT']))
                    my_new_value = value['DEFAULT']
                else if (tg.isNotUndefined<string>(value['500']))
                    my_new_value = value['500']
                else return accumulator
                return {
                    ...accumulator,
                    ...{ [key]: { ...value, DEFAULT: my_new_value } },
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
        getMapColorDefaults,
        defaultColors,
        windiColorDefaultPreset,
        colorDefaultPresetFactory,
    }
}

export default useConfigDefaults
