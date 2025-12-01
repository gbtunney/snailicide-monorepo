import {
    createLogger,
    getLogger,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS,
    resetLogger,
    setLogger,
} from './logger.js'
import {
    getColorChalkInstance,
    wrapColorChalkInstanceText,
} from './utilities/chalk.js'
/** @internal */
export const logger = {
    create: createLogger,
    get: getLogger,
    getChalkInstance: getColorChalkInstance,
    LEVEL_COLORS,
    LEVEL_NAMES,
    LOG_LEVELS,
    reset: resetLogger,
    set: setLogger,
    wrapChalkText: wrapColorChalkInstanceText,
}

/** @internal */
export default logger

export type { LevelColors, LevelName, Logger, LoggerOpts } from './logger.js'
export { getLogger, LOG_LEVELS } from './logger.js'

export {
    fmt,
    formatArgs,
    formatValue,
    prettify,
    prettyPrint,
} from './pretty.print.js'
export { type ChalkColor } from './utilities/chalk.js'
