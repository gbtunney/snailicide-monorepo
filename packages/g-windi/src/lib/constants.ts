/** Color harmony and palette constants */

// ----------------------------------------
// Contrast Constants
// ----------------------------------------

export const DEFAULT_APCA_THRESHOLD = 60
export const DEFAULT_WCAG_THRESHOLD = 4.5
export const DEFAULT_DISTANCE_THRESHOLD = 0.1

export const CONTRAST_THRESHOLDS = {
    apac: DEFAULT_APCA_THRESHOLD,
    distance: DEFAULT_DISTANCE_THRESHOLD,
    wcag: DEFAULT_WCAG_THRESHOLD,
} as const

export const CONTRAST_DEFAULTS = {
    CLAMP: true,
    MODE: 'apac' as const,
    NORMALIZE: true,
    PRESET: 'minPair' as const,
    ROUND: false,
    STEP: 0.01,
    VERBOSE: false,
} as const

// ----------------------------------------
// Palette Constants
// ----------------------------------------

export const PALETTE_DEFAULTS = {
    ANALOGOUS_COUNT: 3,
    ANALOGOUS_SPREAD: 30,
    CHROMA_SCALE: 1,
    CLUSTERED_COUNT: 5,
    COMPLEMENT_OFFSET: 180,
    HEXADIC_STEP: 60,
    LIGHTNESS_SPREAD: 0.4,
    MONOCHROME_COUNT: 5,
    PENTADIC_STEP: 72,
    SPLIT_COMPLEMENT_ANGLES: [150, 210],
    TETRADIC_RECT_ANGLES: [60, 180, 240],
    TETRADIC_SQUARE_ANGLES: [90, 180, 270],
    TRIADIC_ANGLES: [120, 240],
} as const

export const HARMONY_DEFAULTS = {
    ANALOGOUS_ANGLE: 30,
    CHROMA_SCALE: 1,
    COMPOUND_ANALOGOUS_COUNT: 3,
    COMPOUND_ANALOGOUS_SPREAD: 60,
    DOUBLE_COMPLEMENT_OFFSET: 30,
    SPLIT_COMPLEMENT_ANGLE: 30,
} as const

export const CONTRAST_PRESETS = {
    COMPLEMENT: 'complement',
    MAX_PAIR: 'maxPair',
    MIN_PAIR: 'minPair',
    SUBTLE: 'subtle',
} as const

export const CONTRAST_PRESET_ADJUSTMENTS = {
    COMPLEMENT_HUE_ADJUSTMENT: 180,
    SUBTLE_CHROMA_ADJUSTMENT: 0.02,
} as const

// ----------------------------------------
// Palette Generation Constants
// ----------------------------------------

export const DEFAULT_CLUSTERED_COUNT = 5
export const DEFAULT_CHROMA_SCALE = 1.0
export const DEFAULT_LIGHTNESS_SPREAD = 0.4
export const DEFAULT_HUE_SPREAD = 30

export const DEFAULT_PALETTE_OPTIONS = {
    chromaScale: DEFAULT_CHROMA_SCALE,
    count: DEFAULT_CLUSTERED_COUNT,
    hueSpread: DEFAULT_HUE_SPREAD,
    lightnessSpread: DEFAULT_LIGHTNESS_SPREAD,
} as const

// ----------------------------------------
// Color Harmony Angles (from ColorAide)
// ----------------------------------------

export const HARMONY_ANGLES = {
    analogous: 30,
    // offset from complement
    complement: 180,
    doubleComplement: 30,
    splitComplementary: 150,
    tetradicRectangular: 30,
    tetradicSquare: 90,
    // 210 degrees offset
    triadic: 120, // offset for double complement
} as const

export const WHEEL_ANGLES = {
    // 360/5
    hexadic: 60,
    pentadic: 72, // 360/6
} as const

// ----------------------------------------
// Contrast Pair Presets
// ----------------------------------------

export const CONTRAST_PAIR_PRESETS = [
    'minPair',
    'maxPair',
    'subtle',
    'complement',
] as const

// ----------------------------------------
// Color Harmony Types
// ----------------------------------------

export const HARMONY_TYPES = [
    'monochromatic',
    'complementary',
    'split-complementary',
    'analogous',
    'triadic',
    'tetradic-square',
    'tetradic-rectangular',
    'compound',
    'double-complement',
    'pentadic',
    'hexadic',
    'wheel',
] as const

// ----------------------------------------
// Range Generation Constants
// ----------------------------------------

export const DEFAULT_RANGE_STEP = 0.01
export const DEFAULT_RANGE_STEPS = 5
export const MAX_CHROMA_VALUE = 0.4
export const MAX_LIGHTNESS_VALUE = 1.0
export const MIN_LIGHTNESS_VALUE = 0.0

// ----------------------------------------
// ColorAide-inspired Delta E
// ----------------------------------------

export const DELTA_E_METHODS = ['2000', '94', '76'] as const
export const DEFAULT_DELTA_E_METHOD = '2000' as const

// ----------------------------------------
// Utility Functions
// ----------------------------------------

/** Get default threshold based on contrast mode */
export const getDefaultThreshold = (
    mode: 'apac' | 'wcag' | 'distance',
): number => {
    switch (mode) {
        case 'apac':
            return CONTRAST_THRESHOLDS.apac
        case 'wcag':
            return CONTRAST_THRESHOLDS.wcag
        case 'distance':
            return CONTRAST_THRESHOLDS.distance
        default:
            return CONTRAST_THRESHOLDS.apac
    }
}

/** Get harmony angle for a given type */
export const getHarmonyAngle = (type: keyof typeof HARMONY_ANGLES): number => {
    return HARMONY_ANGLES[type]
}
