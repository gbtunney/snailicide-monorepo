import * as chroma from 'chroma.ts'
import * as RA from 'ramda-adjunct'
import { Chromable as TChromable, Chromable } from 'chroma.ts'
import type { WindiConfig, ThemeColors } from './index.js'

export type ColorScaleConfig = {
    scale: [] | TChromable[]
    default_color?: TChromable //default color
    color_count: number
}
export type ColorScaleConfigCollection = Record<
    string,
    ColorScaleConfig | Pick<ColorScaleConfig, 'default_color'>
>

export type useColorScale = typeof useColorScale
export const useColorScale = () => {
    ///private method.
    const _getColorScale = (
        { scale = [], default_color, color_count = 5 }: ColorScaleConfig = {
            scale: [],
            color_count: 5,
        }
    ) => {
        if (RA.isUndefined(default_color) && RA.isEmptyArray(scale)) return
        if (RA.isUndefined(default_color) && scale.length > 0)
            [default_color] = scale
        //if scale array is empty, map gradient.
        scale =
            default_color && scale.length <= 1
                ? [
                      chroma.color(default_color).luminance(0),
                      chroma.color(default_color).luminance(0.5),
                      chroma.color(default_color).luminance(1),
                  ]
                : scale
        const map_scale: Array<string> = chroma
            .scale(scale)
            .correctLightness()
            .colors(color_count)
        return Object.entries(map_scale).reduce(
            (scale_map_accumulator, [key, value]) => {
                return {
                    ...scale_map_accumulator,
                    ...{
                        [`${parseInt(key) + 1}00`]: chroma.color(value).hex(),
                    },
                }
            },
            { ['DEFAULT']: chroma.color(default_color as Chromable).hex() }
        )
    }
    const getColorScale = (
        colorScaleConfig: ColorScaleConfigCollection
    ): ThemeColors => {
        return Object.entries(colorScaleConfig).reduce(
            (accumulator, [key, value]) => {
                return {
                    ...accumulator,
                    [key]: _getColorScale({
                        scale: [],
                        color_count: 5,
                        ...value,
                    }),
                }
            },
            {}
        )
    }

    const colorScalePresetFactory = (
        colorScaleConfig: ColorScaleConfigCollection
    ): WindiConfig => {
        return {
            theme: {
                extend: {
                    colors: getColorScale(colorScaleConfig),
                },
            },
        }
    }

    return { colorScalePresetFactory, getColorScale }
}

export default useColorScale
