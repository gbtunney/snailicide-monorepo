import {
    createLogger,
    getLogger,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS,
    resetLogger,
    setLogger,
} from './logger.js'
export {fmt,formatArgs,formatValue,prettify,prettyPrint} from './pretty.print.js'

/** @internal */
export const logger = {
    create:createLogger,
    get:getLogger,
    set:setLogger,
    reset: resetLogger,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS
}

/** @internal */
export default logger

export type { LevelColors, LevelName, Logger, LoggerOpts } from './logger.js'
export {
    createLogger,
    getLogger,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS,
    resetLogger,
    setLogger,
} from './logger.js'