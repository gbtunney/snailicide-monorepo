import * as _chroma from 'chroma.ts'

/** @internal */
export const Chroma: typeof _chroma = _chroma
export type { CSSColorSpecial } from './../browser/css.js'
export * as colorUtils from './chroma-utils.js'
export type { Chromable, Color, ColorFormat, ColorMode, Scale } from 'chroma.ts'
