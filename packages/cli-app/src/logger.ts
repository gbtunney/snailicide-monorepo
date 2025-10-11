import chalk, { type ColorName } from 'chalk'
import ColorJS from 'colorjs.io'
import dayjs from 'dayjs'
import z from 'zod'

/** "#F0E68C" */
const ChalkColor: ColorName | `#${string}` = 'green'
export const LEVEL_NAMES = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
    'silent',
] as const
export type LevelName = (typeof LEVEL_NAMES)[number]

type ExtractKeys<
    Type extends ReadonlyArray<unknown> | Record<keyof unknown, unknown>,
> =
    Type extends ReadonlyArray<infer U>
        ? Extract<U, PropertyKey>
        : Type extends Record<keyof any, unknown>
          ? keyof Type
          : never

/** Builds a Record<K, V> where K is inferred from array or object T. Enforces exhaustiveness: no extra or missing keys. */
export type ExhaustiveRecordFrom<
    Type extends ReadonlyArray<unknown> | Record<keyof unknown, unknown>,
    Value = unknown,
> = Record<ExtractKeys<Type>, Value>

const LOG_LEVELS: ExhaustiveRecordFrom<typeof LEVEL_NAMES, number> = {
    debug: 20,
    error: 50,
    fatal: 60,
    info: 30,
    silent: 99,
    trace: 10,
    warn: 40,
}

export type Color =
    | 'gray'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'yellow'
    | 'magenta'
    | 'red'
    | 'white'
    | `#${string}`

const LEVEL_COLORS: ExhaustiveRecordFrom<typeof LEVEL_NAMES, Color> = {
    debug: 'blue',
    error: 'red',
    fatal: 'magenta',
    info: 'green',
    silent: 'white',
    trace: 'gray',
    warn: 'yellow',
}
type Teyyyy = ExtractKeys<typeof LEVEL_COLORS>

type LevelColors = ExhaustiveRecordFrom<typeof LEVEL_NAMES, Color>

/** Normalize any color string to sRGB hex */
const parseColorJSToHex = (input: string): string => {
    if (input.startsWith('#')) return input as `#${string}`
    try {
        /** Parse CSS color (e.g., 'oklch(60% 0.15 30)', 'rebeccapurple') */
        const myColor = new ColorJS(input)
        //const srgb = c.to('srgb').toGamut({ method: 'clip' }) // ensure in sRGB gamut

        const hexValue = myColor.to('srgb').toString({ format: 'hex' })
        return hexValue
        // return srgb.toString({ format: 'hex' }) as `#${string}`
    } catch {
        return '#FFFFFF' //TODO: add throw??
    }
}

const isBrowser = (): boolean =>
    typeof window !== 'undefined' && typeof window.document !== 'undefined'

const RESET = '\x1b[0m'

/**
 * Function colorizeNode(s: string, color: Color): string { if (color.startsWith('#')) return s; const code = ANSI[color
 * as keyof typeof ANSI]; return code ? `${code}${s}${RESET}` : s; }
 */
function colorizeNode(value: string, color: Color): string {
    const colorHex = parseColorJSToHex(color)
    if (color.startsWith('#')) return chalk.bgHex(color)(colorHex)
    const fn = (chalk as any)[color] as ((t: string) => string) | undefined
    return fn ? fn(value) : value
}

/** TODO: use hex color in config */
function colorizeBrowser(
    label: string,
    color: Color,
): [string, string, string] {
    const css = `color:${color};font-weight:600`
    return [`%c${label}%c`, css, '']
}

function pickConsole(level: LevelName): (...args: Array<unknown>) => void {
    switch (level) {
        case 'error':
        case 'fatal':
            return console.error.bind(console)
        case 'warn':
            return console.warn.bind(console)
        default:
            return console.log.bind(console)
    }
}

const LEVEL_COLOR_DEFAULTS: Record<LevelName, Color> = {
    debug: 'cyan',
    error: 'red',
    fatal: 'magenta',
    info: 'green',
    silent: 'white',
    trace: 'gray',
    warn: 'yellow',
}
const schemaLoggerOpts = z.object({
    colors: z
        .transform<Partial<LevelColors>, LevelColors>((val = {}) => {
            // console.log("COLOR PARSING TRANSFORM ", val )
            return { ...LEVEL_COLORS, ...val }
        })
        .prefault({}),
    level: z.enum(LEVEL_NAMES).default('info'),
    name: z.string().trim().optional(),
    //.default(LEVEL_COLORS),
    time_format: z.string().default('mm:ss:ms'),
    time_stamp: z.boolean().default(false),
})

export type Logger = {
    readonly name: string | undefined
    readonly level: LevelName
    setLevel: (level: LevelName) => void

    child: (
        name: string,
        overrides?: Partial<z.input<typeof schemaLoggerOpts>>,
    ) => Logger
    trace: <Type extends Array<unknown>>(...a: Type) => void
    debug: <Type extends Array<unknown>>(...a: Type) => void
    info: <Type extends Array<unknown>>(...a: Type) => void
    warn: <Type extends Array<unknown>>(...a: Type) => void
    error: <Type extends Array<unknown>>(...a: Type) => void
    fatal: <Type extends Array<unknown>>(...a: Type) => void
}
export const createLogger = (
    opts?: z.input<typeof schemaLoggerOpts>,
): Logger => {
    // Resolve/validate options
    const parsed = schemaLoggerOpts.safeParse(opts ?? {})
    if (!parsed.success) {
        console.error('Invalid logger configuration:')
        console.error(z.prettifyError(parsed.error))
        throw new Error('Invalid logger configuration')
    }
    const cfg = parsed.data

    // Internal state (captured by closure)
    /** (cfg.name ?? '').trim() */
    const name: string | undefined = cfg.name
    const loggerName = cfg.name === undefined ? undefined : cfg.name

    let minLevel: number = LOG_LEVELS[cfg.level]
    const showTime: boolean = cfg.time_stamp
    const timeFormat = cfg.time_format
    // If your schema already merged colors, this is already LevelColors
    const colors: Record<LevelName, Color> = {
        ...LEVEL_COLORS,
        ...(cfg.colors ?? {}),
    }

    const shouldLog = (level: LevelName): boolean =>
        LOG_LEVELS[level] >= minLevel && level !== 'silent'

    const prefix = (level: LevelName): string => {
        return [
            `----- ${level.toUpperCase()}`,
            ...(showTime ? [dayjs().format(timeFormat)] : []),
            ...(name ? [`[${name}]`] : []),
        ].join(' ')
    }

    const emit = <Type extends Array<unknown>>(
        level: LevelName,
        ...args: Type
    ): void => {
        if (!shouldLog(level)) return
        const out = pickConsole(level)
        const head = prefix(level)
        const color = colors[level]
        if (isBrowser()) {
            const [fmt, css, reset] = colorizeBrowser(head, color)
            out(fmt, css, reset, ...args)
        } else {
            out(colorizeNode(head, color), ...args)
        }
    }

    const _levelName = (): LevelName =>
        (Object.entries(LOG_LEVELS).find(
            ([, n]) => n === minLevel,
        )?.[0] as LevelName) ?? 'info'

    return {
        child: (childName, overrides = {}): Logger =>
            createLogger({
                ...cfg,
                ...overrides,
                name: name ? `${name}:${childName}` : childName,
            }),
        debug: (...a): void => {
            emit('debug', ...a)
        },

        error: (...a): void => {
            emit('error', ...a)
        },

        fatal: (...a): void => {
            emit('fatal', ...a)
        },
        info: (...a): void => {
            emit('info', ...a)
        },
        get level(): LevelName {
            return _levelName()
        },
        get name(): string | undefined {
            return loggerName
        },
        setLevel: (level: LevelName): void => {
            minLevel = LOG_LEVELS[level]
        },
        trace: (...a): void => {
            emit('trace', ...a)
        },
        warn: (...a): void => {
            emit('warn', ...a)
        },
    }
}

// Optional singleton
let loggerInstance: Logger | undefined

/**
 * GetLogger():
 *
 * - Without opts: returns the shared singleton (created on first call).
 * - With opts: returns a new, non-singleton instance configured with those opts.
 */
/** ...existing code... */
export const getLogger = (
    opts?: z.input<typeof schemaLoggerOpts>,
    makeDefault = false,
): Logger => {
    if (!loggerInstance) {
        loggerInstance = createLogger(opts)
        return loggerInstance
    } else {
        if (opts === undefined) {
            return (loggerInstance ??= createLogger())
        }
        const inst = createLogger(opts)
        if (makeDefault) loggerInstance = inst
        return inst
    }
}
/** Replace the singleton instance */
export const setLogger = (logger: Logger): Logger => (loggerInstance = logger)

/** Clear the singleton so next getLogger() creates a new one */
export const resetLogger = (): void => {
    loggerInstance = undefined
}
