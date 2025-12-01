import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLogger, logger } from './index.js'

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
    logger.reset()
})

describe('logger singleton basics', () => {
    it('returns same instance from getLogger()', () => {
        const firstLoggerInstance = getLogger()
        const secondLoggerInstance = getLogger()
        expect(firstLoggerInstance).toBe(secondLoggerInstance)
    })

    it('setLogger() replaces singleton', () => {
        const originalLoggerInstance = getLogger()
        const replacementLoggerInstance = logger.create({ level: 'debug' })
        logger.set(replacementLoggerInstance)
        expect(getLogger()).not.toBe(originalLoggerInstance)
        expect(getLogger()).toBe(replacementLoggerInstance)
    })

    it('resetLogger() restores default instance', () => {
        const customLoggerInstance = logger.create({ level: 'error' })
        logger.set(customLoggerInstance)
        logger.reset()
        const loggerAfterReset = getLogger()
        expect(loggerAfterReset).not.toBe(customLoggerInstance)
    })
})

describe('constants', () => {
    it('LEVEL_NAMES is non-empty and includes default level', () => {
        expect(logger.LEVEL_NAMES.length).toBeGreaterThan(0)
        expect(logger.LEVEL_NAMES).toContain('info')
    })

    it('LEVEL_COLORS has same keys as LEVEL_NAMES', () => {
        const levelColorKeys = Object.keys(logger.LEVEL_COLORS)
        logger.LEVEL_NAMES.forEach((levelName) => {
            expect(levelColorKeys).toContain(levelName)
        })
    })

    it('LOG_LEVELS numeric ordering is ascending', () => {
        const logLevelValues = logger.LEVEL_NAMES.map(
            (levelName) => logger.LOG_LEVELS[levelName],
        )
        const sortedLogLevelValues = [...logLevelValues].sort((a, b) => a - b)
        expect(logLevelValues).toEqual(sortedLogLevelValues)
    })
})

describe('level filtering', () => {
    it('suppresses lower-priority messages', () => {
        const _logger = logger.create({ level: 'warn' })
        _logger.debug('d')
        _logger.info('i')
        _logger.warn('w')
        _logger.error('e')
        expect(consoleSpyCollectionRecord.debug).not.toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.info).not.toHaveBeenCalled()
        expect(consoleSpyCollectionRecord.warn).toHaveBeenCalledTimes(1)
        expect(consoleSpyCollectionRecord.error).toHaveBeenCalledTimes(1)
    })
    it('allows all messages at lowest level (info)', () => {
        const logger2 = logger.create({ level: 'info' })
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
        const _logger = logger.create({ level: 'info', name: 'gillian' })
        _logger.info('hello')
        const lastInfoFirstArg =
            consoleSpyCollectionRecord.info.mock.calls.at(-1)?.[0]
        expect(String(lastInfoFirstArg)).toContain('gillian')
    })
})

describe('logging output basics', () => {
    it('logs info payload', () => {
        const _logger = logger.create({ level: 'info' })
        _logger.info('hello', { x: 1 })
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
