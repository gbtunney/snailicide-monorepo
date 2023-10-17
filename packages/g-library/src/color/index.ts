import * as chroma from 'chroma.ts'
import type { Chromable, Color } from 'chroma.ts'

const validate = (color: Chromable): boolean => {
    // todo: fix return chromajs.valid(color)
    console.log('color is ', chroma.color('palegreen'))
    chroma.color('palegreen')
    return true
}
/*  const getChromaColor = (color: Chromable, format?: chroma.ColorFormat) => {
        if (!validate(color)) return
        const chroma_color = chroma.color(color)
        const [hue, saturation, lightness] = chroma_color.hsl()
        return {
            chroma: chroma_color,
            hue,
            saturation,
            lightness,
            textColor: chroma_color.textColor(),
            luminance: chroma_color.luminance(),
            temperature: chroma_color.temperature(),
            complement: complement(chroma_color),
            split_complement: split_complement(chroma_color),
            triad: triad(chroma_color),
            tetrad: tetrad(chroma_color),
            analogous: analogous(chroma_color),
        }
    }
*/
