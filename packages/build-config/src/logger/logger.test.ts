import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    createLogger,
    getLogger,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS,
    resetLogger,
    setLogger,
} from './index.js'

// Long descriptive key union for console methods under test
type ConsoleLoggerMethodNameKey = 'debug' | 'info' | 'warn' | 'error'

// Loosely typed spy instance to avoid constructor/function overload mismatch
type LooseVitestConsoleSpyInstance = {
    mock: { calls: Array<Array<unknown>> }
    mockImplementation: (
        ...args: Array<unknown>
    ) => LooseVitestConsoleSpyInstance
}

type ConsoleSpyCollectionRecord = Record<
    ConsoleLoggerMethodNameKey,
    LooseVitestConsoleSpyInstance
>

let consoleSpyCollectionRecord: ConsoleSpyCollectionRecord

const createConsoleSpyCollectionRecord = (): ConsoleSpyCollectionRecord => {
    const debug = vi
        .spyOn(console, 'debug')
        .mockImplementation(
            () => {},
        ) as unknown as LooseVitestConsoleSpyInstance
    const info = vi
        .spyOn(console, 'info')
        .mockImplementation(
            () => {},
        ) as unknown as LooseVitestConsoleSpyInstance
    const warn = vi
        .spyOn(console, 'warn')
        .mockImplementation(
            () => {},
        ) as unknown as LooseVitestConsoleSpyInstance
    const error = vi
        .spyOn(console, 'error')
        .mockImplementation(
            () => {},
        ) as unknown as LooseVitestConsoleSpyInstance
    return { debug, error, info, warn }
}

beforeEach(() => {
    consoleSpyCollectionRecord = createConsoleSpyCollectionRecord()
})

afterEach(() => {
    vi.restoreAllMocks()
    resetLogger()
})

describe('logger singleton basics', () => {
    it('returns same instance from getLogger()', () => {
        const firstLoggerInstance = getLogger()
        const secondLoggerInstance = getLogger()
        expect(firstLoggerInstance).toBe(secondLoggerInstance)
    })

    it('setLogger() replaces singleton', () => {
        const originalLoggerInstance = getLogger()
        const replacementLoggerInstance = createLogger({ level: 'debug' })
        setLogger(replacementLoggerInstance)
        expect(getLogger()).not.toBe(originalLoggerInstance)
        expect(getLogger()).toBe(replacementLoggerInstance)
    })

    it('resetLogger() restores default instance', () => {
        const customLoggerInstance = createLogger({ level: 'error' })
        setLogger(customLoggerInstance)
        resetLogger()
        const loggerAfterReset = getLogger()
        expect(loggerAfterReset).not.toBe(customLoggerInstance)
    })
})

describe('constants', () => {
    it('LEVEL_NAMES is non-empty and includes default level', () => {
        expect(LEVEL_NAMES.length).toBeGreaterThan(0)
        expect(LEVEL_NAMES).toContain('info')
    })

    it('LEVEL_COLORS has same keys as LEVEL_NAMES', () => {
        const levelColorKeys = Object.keys(LEVEL_COLORS)
        LEVEL_NAMES.forEach((levelName) => {
            expect(levelColorKeys).toContain(levelName)
        })
    })

    it('LOG_LEVELS numeric ordering is ascending', () => {
        const logLevelValues = LEVEL_NAMES.map(
            (levelName) => LOG_LEVELS[levelName],
        )
        const sortedLogLevelValues = [...logLevelValues].sort((a, b) => a - b)
        expect(logLevelValues).toEqual(sortedLogLevelValues)
    })
})

describe('level filtering', () => {
    it('suppresses lower-priority messages', () => {
        const logger = createLogger({ level: 'warn' })
        logger.debug('d')
        logger.info('i')
        logger.warn('w')
        logger.error('e')
        expect(consoleSpyCollectionRecord.debug).not.toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.info).not.toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.warn).toHaveBeenCalledTimes(1)
        expect(consoleSpyCollectionRecord.error).toHaveBeenCalledTimes(1)
    })
    it('allows all messages at lowest level (info)', () => {
        const logger2 = createLogger({ level: 'info' })
        logger2.debug('test1')
        logger2.info('test1')
        logger2.warn('test1')
        logger2.error('test1')
        expect(consoleSpyCollectionRecord.debug).toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.info).toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.warn).toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.error).toHaveBeenCalled()
    })
})

describe('createLogger options', () => {
    it('applies custom name if provided', () => {
        const logger = createLogger({ level: 'info', name: 'gillian' })
        logger.info('hello')
        const lastInfoFirstArg =
            consoleSpyCollectionRecord.info.mock.calls.at(-1)?.[0]
        expect(String(lastInfoFirstArg)).toContain('gillian')
    })
})

describe('logging output basics', () => {
    it('logs info payload', () => {
        const logger = createLogger({ level: 'info' })
        logger.info('hello', { x: 1 })
        expect(consoleSpyCollectionRecord.info).toHaveBeenCalled()
        const lastInfoCallArguments =
            consoleSpyCollectionRecord.info.mock.calls.at(-1)
        expect(
            lastInfoCallArguments?.some((argumentValue: unknown) =>
                String(argumentValue).includes('hello'),
            ),
        ).toBe(true)
    })
})
