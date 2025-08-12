import type { SerializeOptions } from 'colorjs.io'

import { culoriToColorObject, isCuloriColor } from './convert.js'
import type {
    ColorJSInstance,
    ColorJSObject,
    ColorJSSpaceKey,
    CuloriColor,
    OklchColorOptions,
    ValidColorJSInput,
    ValidOklchColor,
} from './types.js'
import { ColorJS } from './types.js'

export const validateOklchColorJS = <T extends ValidColorJSInput>(
    value: T,
    _options: OklchColorOptions = {},
): ValidOklchColor => {
    const { clamp, round }: Required<OklchColorOptions> = {
        clamp: false,
        round: false,
        ..._options,
    }

    let parsedColor: undefined | ColorJSInstance = undefined

    if (typeof value === 'string') {
        try {
            parsedColor = new ColorJS(value)
        } catch (error) {
            throw new TypeError(
                `COLORJS STRING PARSE ERROR: Could not parse string ${value} as a color. Ensure the input is valid and all required plugins are loaded. Original error: ${error}`,
            )
        }
    } else {
        try {
            if (isColorInstance(value)) parsedColor = value.clone()
            if (isColorObject(value)) parsedColor = new ColorJS(value)
        } catch {
            throw new TypeError(
                `OBJECT PARSE ERROR Could not parse MODE: as a color. ${JSON.stringify(value, undefined, 2)} \nEnsure the input is valid and all required plugins are loaded. Original error: `,
            )
        }
        try {
            if (isCuloriColor(value)) {
                parsedColor = new ColorJS(
                    culoriToColorObject(value as CuloriColor),
                )
            }
        } catch {
            throw new TypeError(
                `CULORI OBJECT PARSE ERROR ${JSON.stringify(value, undefined, 2)} \nEnsure the input is valid and all required plugins are loaded. Original error: `,
            )
        }
    }
    if (parsedColor === undefined)
        throw new Error(`Invalid OKLCH color${value}`)
    if (parsedColor !== undefined && parsedColor.spaceId !== 'oklch') {
        const _before = parsedColor
        parsedColor = parsedColor.clone().to('oklch')
        console.log(
            `AFTER-------CONVERTING ${_before.toString()}. TO OKLCH!!`,
            parsedColor.toString(),
        )
    }
    return parsedColor as ValidOklchColor
}

type CssStringOptions = Pick<SerializeOptions, 'precision'> & {
    gamut?: ColorJSSpaceKey
    includeAlpha?: boolean
    clamped?: boolean
}
export function toCssString(
    color: ColorJSInstance,
    options: CssStringOptions = {},
) {
    const {
        clamped = true,
        gamut = 'srgb',
        includeAlpha = false,
        precision = 3,
    } = options

    if (!(gamut in ColorJS.spaces)) {
        throw new Error(`Invalid color space key: ${gamut}`)
    }
    const srgbColor = toClampedColor(
        validateOklchColorJS(color.clone()),
        gamut,
    ).to('srgb')
    const _is_displayable = isDisplayable(srgbColor, gamut)
    if (!_is_displayable) {
        throw new Error(`sRGB color is not in gamut ${color.toString()}`)
    }
    return srgbColor.toString({
        precision,
        ...(includeAlpha === true ? { format: { noAlpha: true } } : {}),
    })
}
export function toColorHex<Type extends ColorJSInstance>(
    color: Type,
    includeAlpha = false,
): string {
    // Convert to sRGB and ensure valid coordinates
    const srgbColor = toClampedColor(validateOklchColorJS(color))
        .clone()
        .to('srgb')
    if (srgbColor.inGamut('srgb')) {
        throw new Error(`sRGB color is not in gamut ${color.toString()}`)
    }
    const [r, g, b] = srgbColor.coords.map((v) => {
        if (v === undefined || v < 0 || v > 1) {
            throw new Error(`Invalid sRGB coordinate: ${v}`)
        }
        return Math.round(v * 255)
    })

    // Handle alpha channel
    const a = Math.round((srgbColor.alpha ?? 1) * 255)

    // Construct the hex string
    let hex = `#${[r, g, b]
        .map((x) => (x ?? 0).toString(16).padStart(2, '0')) // Ensure x is not undefined
        .join('')}`

    // Add alpha if requested or if it's not fully opaque
    if (includeAlpha || a < 255) {
        hex += a.toString(16).padStart(2, '0')
    }

    return hex.toUpperCase()
}
export const toClampedColor = (
    color: ValidOklchColor,
    _gamut: ColorJSSpaceKey = 'srgb',
): ValidOklchColor => {
    if (!(_gamut in ColorJS.spaces)) {
        throw new Error(`Invalid color space key: ${_gamut}`)
    }
    const _is_displayable = isDisplayable(color, _gamut)
    //return if it doesnt need to be clamped
    if (_is_displayable) {
        return color as unknown as ValidOklchColor
    }
    if (!_is_displayable) {
        console.log(
            'THE COLOR NOT IN GAMUT SHOULD BE CLAMPED!! ',
            "inGamut('srgb')",
            _is_displayable,
            'Color (source):::',
            color.toString(),
        )
    }

    const _oklchColor: ValidOklchColor = color
        .clone()
        .toGamut(_gamut) as ValidOklchColor

    const _post_is_displayable = isDisplayable(_oklchColor, _gamut)
    console.log(
        '\nBEFORE CLAMP ',
        color.toString(),
        '--displayable',
        _is_displayable,
        '\nAFTER CLAMP',
        _oklchColor.toString(),
        '--displayable',
        _post_is_displayable,
    )
    if (!_post_is_displayable) {
        throw new Error(`OKCHl Color UNCLAMPABLE!!!`)
    }
    return _oklchColor as unknown as ValidOklchColor
}
export const isDisplayable = <Type extends ColorJSInstance>(
    color: Type,
    _gamut: ColorJSSpaceKey = 'srgb',
): boolean => color.inGamut(_gamut)

const isColorInstance = (x: unknown): x is ColorJSInstance =>
    typeof x === 'object' && x != null && x.constructor?.name === 'Color'

const isColorObject = (x: unknown): x is ColorJSObject =>
    !!x &&
    typeof x === 'object' &&
    'space' in (x as { space: unknown }) &&
    'coords' in (x as { coords: unknown })
