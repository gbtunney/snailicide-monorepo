import chalk, { modifierNames } from 'chalk'
import dayjs from 'dayjs'
import z from 'zod'
import { fmt, formatArgs } from './pretty.print.js'
import {
    type ChalkColor,
    getColorChalkInstance,
    wrapColorChalkInstanceText,
} from './utilities/chalk.js'

import { parseColorToHexStrict } from './utilities/color.js'

export type LogLevelColors = ChalkColor

export const LEVEL_NAMES = [
    'trace',
    'info',
    'debug',
    'warn',
    'error',
    'fatal',
    'silent',
] as const
export type LogLevelName = (typeof LEVEL_NAMES)[number]

type ExtractKeys<
    Type extends ReadonlyArray<unknown> | Record<keyof unknown, unknown>,
> =
    Type extends ReadonlyArray<infer U>
        ? Extract<U, PropertyKey>
        : Type extends Record<keyof any, unknown>
          ? keyof Type
          : never

/** Builds a Record<K, V> where K is inferred from array or object T. Enforces exhaustiveness: no extra or missing keys. */
type ExhaustiveRecordFrom<
    Type extends ReadonlyArray<unknown> | Record<keyof unknown, unknown>,
    Value = unknown,
> = Record<ExtractKeys<Type>, Value>

export type LoggerRecord<Value> = ExhaustiveRecordFrom<
    typeof LEVEL_NAMES,
    Value
>

export const LOG_LEVELS: LoggerRecord<number> = {
    debug: 35,
    error: 50,
    fatal: 60,
    info: 30,
    silent: 99,
    trace: 10,
    warn: 40,
}

export const LEVEL_COLORS: LoggerRecord<ChalkColor> = {
    debug: 'blue',
    error: 'red',
    fatal: 'magenta',
    info: parseColorToHexStrict('#0bb806'),
    silent: 'white',
    trace: 'gray',
    warn: 'yellow',
}
const LEVEL_STYLES = modifierNames

const isBrowser = (): boolean =>
    typeof window !== 'undefined' && typeof window.document !== 'undefined'

const RESET = '\x1b[0m'

/** TODO: use hex color in config */
function colorizeBrowser(
    label: string,
    color: LogLevelColors,
): [string, string, string] {
    const css = fmt`color:${color};font-weight:600`
    return [`%c${label}%c`, css, '']
}

function pickConsole(level: LogLevelName): (...args: Array<unknown>) => void {
    switch (level) {
        case 'error':
        case 'fatal':
            return console.error.bind(console)
        case 'warn':
            return console.warn.bind(console)
        case 'info':
            return console.info.bind(console)
        case 'debug':
            return console.debug.bind(console)
        default:
            return console.log.bind(console)
    }
}

const schemaLoggerOpts = z.object({
    colors: z
        .transform<
            Partial<LoggerRecord<LogLevelColors>>,
            LoggerRecord<LogLevelColors>
        >((val) => {
            return { ...LEVEL_COLORS, ...val }
        })
        .prefault({}),
    level: z.enum(LEVEL_NAMES).default('info'),
    name: z.string().trim().optional(),
    time_format: z.string().default('hh:mm:ss'),
    time_stamp: z.boolean().default(false),
})

export type Logger = {
    readonly name: string | undefined
    readonly level: LogLevelName
    setLevel: (level: LogLevelName) => void
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

export type LoggerOpts = z.input<typeof schemaLoggerOpts>
export const createLogger = (opts?: LoggerOpts): Logger => {
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
    // If your schema already merged colors, this is already LogLevelColors
    const colors: LoggerRecord<LogLevelColors> = {
        ...LEVEL_COLORS,
        ...(cfg.colors ?? {}),
    }

    const shouldLog = (level: LogLevelName): boolean =>
        LOG_LEVELS[level] >= minLevel && level !== 'silent'

    const prefix = (level: LogLevelName): string => {
        const bg_color = getColorChalkInstance(colors[level], 'bg')
        //assertChalkColor( color)
        return [
            bg_color.bold(` ===> ${chalk.bold(level.toUpperCase())} `),
            chalk.italic(showTime ? dayjs().format(timeFormat) : ''),
            name ? [`[${name}]`] : [],
        ].join(' ')
    }

    const emit = <Type extends Array<unknown>>(
        level: LogLevelName,
        ...args: Type
    ): void => {
        if (!shouldLog(level)) return
        const out = pickConsole(level)
        const head = prefix(level)
        const color = colors[level]
        if (isBrowser()) {
            const [fmt, css, reset] = colorizeBrowser(head, 'red')
            out(fmt, css, reset, ...args)
        } else {
            //chalk.bgRed('THIS IS A COLOR ', color)
            out(
                wrapColorChalkInstanceText(head, color, 'fg'),
                formatArgs('', ...args),
            )
        }
    }

    const _levelName = (): LogLevelName =>
        (Object.entries(LOG_LEVELS).find(
            ([, n]) => n === minLevel,
        )?.[0] as LogLevelName) ?? 'info'

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
        get level(): LogLevelName {
            return _levelName()
        },
        get name(): string | undefined {
            return loggerName
        },
        setLevel: (level: LogLevelName): void => {
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
