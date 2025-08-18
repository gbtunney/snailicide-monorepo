import { numeric, tg } from '@snailicide/g-library'
import type { SerializeOptions } from 'colorjs.io'
import { parse } from 'culori'
import { RANGE_DEGREE } from './constants.js'
import { culoriToColorObject, isCuloriColor } from './convert.js'
import type {
    ColorJSInstance,
    ColorJSObject,
    ColorJSSpaceKey,
    ColorTypeMode,
    CuloriColor,
    ExpandedColorJSObject,
    ExpandedCoordinate,
    OklchColorOptions,
    RangeKeys,
    ValidColorJSInput,
    ValidOklchColor,
} from './types.js'
import { ColorJS } from './types.js'
import {
    getRange,
    hasCss5OrVars,
    mapRange,
    wrapInRange,
} from './utilities.js'

const myttt: ExpandedColorJSObject = {
    coords: [null, null, null],
    space: 'oklch',
}
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
            //this is an attempt to catch string like 'oklch(.33.33 .233333 180.43412323355434)'
            //but allow CSS5 'from' or variables "oklch(from red l .233333 180.43412323355434)"
            //@todo: this should be a future improvement, maybe a quick way to make a from string?
            if (!hasCss5OrVars(value) && parse(value) !== undefined) {
                parsedColor = new ColorJS(value)
            }
        } catch (error) {
            throw new TypeError(
                `COLORJS STRING PARSE ERROR: Could not parse string ${value} as a color. Ensure the input is valid and all required plugins are loaded. Original error: ${error}`,
            )
        }
    } else {
        try {
            if (isColorInstance(value)) parsedColor = value.clone()
            if (isColorObject(value))
                parsedColor = new ColorJS(normalizeColorJSObject(value))
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
    }
    return parsedColor as ValidOklchColor
}

type CssStringOptions = Pick<SerializeOptions, 'precision'> & {
    gamut?: ColorJSSpaceKey
    includeAlpha?: boolean
    clamped?: boolean
    type?: ColorTypeMode
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
        type = 'oklch',
    }: CssStringOptions = options

    if (!(gamut in ColorJS.spaces)) {
        throw new Error(`Invalid color space key: ${gamut}`)
    }
    const srgbColor = toClampedColor(
        validateOklchColorJS(color.clone()),
        gamut,
    ).to(type)
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
    enableLogging = false, // New parameter to control logging
): string {
    //TODO: this had a problem with cclamping, lets make a check to assure somethiing is a valid RGBB for it sets passed in ?
    if (enableLogging) console.log('Input color:', color.toString())

    // Convert to sRGB and ensure valid coordinates
    const validatedColor = validateOklchColorJS(color)
    if (enableLogging)
        console.log('After validateOklchColorJS:', validatedColor.toString())

    const clampedColor = toClampedColor(validatedColor)
    if (enableLogging)
        console.log('After toClampedColor:', clampedColor.toString())

    const srgbColor = clampedColor.clone().to('srgb')
    if (enableLogging)
        console.log('After conversion to sRGB:', srgbColor.toString())

    if (!srgbColor.inGamut('srgb')) {
        throw new Error(`sRGB color is not in gamut ${color.toString()}`)
    }

    const [r, g, b] = srgbColor.coords.map((v) => {
        if (v === undefined) {
            throw new Error(
                `Invalid sRGB coordinate: ${v} --${color.toString()}`,
            )
        }
        // Clamp the value to [0, 1] to handle precision issues
        const clamped = Math.max(0, Math.min(1, v))
        return Math.round(clamped * 255)
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

    if (enableLogging) console.log('Final hex value:', hex)
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
        /*  console.log(
            'THE COLOR NOT IN GAMUT SHOULD BE CLAMPED!! ',
            "inGamut('srgb')",
            _is_displayable,
            'Color (source):::',
            color.toString(),
        )*/
    }

    const _oklchColor: ValidOklchColor = color
        .clone()
        .toGamut(_gamut) as ValidOklchColor

    const _post_is_displayable = isDisplayable(_oklchColor, _gamut)
    /*console.log(
        '\nBEFORE CLAMP ',
        color.toString(),
        '--displayable',
        _is_displayable,
        '\nAFTER CLAMP',
        _oklchColor.toString(),
        '--displayable',
        _post_is_displayable,
    )*/
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

export const normalizeColorJSObject = (
    obj: ExpandedColorJSObject,
): ColorJSObject => {
    // Ensure coords is always a tuple of exactly 3 values
    const coordsTuple: [
        ExpandedCoordinate,
        ExpandedCoordinate,
        ExpandedCoordinate,
    ] = [obj.coords[0] ?? 0, obj.coords[1] ?? 0, obj.coords[2] ?? 0]

    const resultCoordMap = coordsTuple.map(
        (value: ExpandedCoordinate, _index: number) =>
            normalizeCoordinate(value, _index),
    ) as [number, number, number]
    //console.log("---before",obj.coords ,  "after", resultCoordMap)
    return { ...obj, coords: resultCoordMap }
}

export const normalizeCoordinate = (
    value: ExpandedCoordinate,
    _index: number,
): number => {
    let _input_type: RangeKeys = 'float'
    let _newNumber: number = 0
    const _outputType: RangeKeys = _index === 2 ? 'deg' : 'float'
    if (tg.isFalsy(value)) return 0
    else if (typeof value === 'number') {
        _newNumber = value as number
    } else if (
        typeof value === 'string' &&
        numeric.isParsableToNumeric(value)
    ) {
        _newNumber = numeric.parseStringToNumeric(value) as number
        ///if it has a perccent sign
        if (/deg$/.test(value) === true) {
            _input_type = 'deg'
        } else if (/%$/.test(value) === true) {
            _input_type = 'percent'
        }
    }
    //note the direction
    const direction = _newNumber < 0 ? -1 : 1
    //set absolute value
    _newNumber = Math.abs(_newNumber)

    //assume this integer is hue. , else it stays FLOATT
    if (_outputType === 'deg' && _newNumber > 1 && _input_type !== 'percent')
        _input_type = 'deg'
    ///assume > 1 is a percent
    else if (_newNumber > 1) _input_type = 'percent'
    const mappedValue = mapRange(
        _newNumber,
        getRange(_input_type),
        getRange(_outputType),
    )
    const result =
        _outputType === 'deg'
            ? wrapInRange(mappedValue, RANGE_DEGREE)
            : mappedValue
    // console.log("___________________________" , _input_type,"output" ,_outputType , _newNumber, "mapped",result)
    return result * direction
}
export type { ValidOklchColor } from './types.ts'
