import { z } from 'zod'
import { getLogger } from './logger.js'

//setLogLevel('debug') // or: setLogLevelFromConfig({ log_level: 'debug' } as any)
const DEFAULT_LOGGER = getLogger({
    colors: {},
    level: 'info',
    name: 'defaultlogger',
    time_stamp: true,
})
console.log('LATEST ', DEFAULT_LOGGER.name, DEFAULT_LOGGER.level)

DEFAULT_LOGGER.setLevel('debug')

const latestLogger = getLogger()

console.log(
    'LATEST ',
    DEFAULT_LOGGER.name,
    latestLogger.name,
    latestLogger.level,
)

const LOGGER2 = getLogger(
    { colors: {}, level: 'debug', name: 'myapp', time_stamp: true },
    true,
)

console.log(LOGGER2.name, getLogger().name, getLogger().level)

LOGGER2.info('HERP DERP LOGGIN CRAP!!')
console.log(getLogger().name, getLogger().level)

LOGGER2.warn('warn: %s', 'something odd')
LOGGER2.debug('HERP DERP LOGGIN CRAP!!')

LOGGER2.error('error with meta %o', { a: 1, b: [1, 2, 3] })

// no filepath
/*
const log = createLogger({ name: 'APP', level: 'debug', time_stamp: true, time_format: 'HH:mm:ss' })
log.info('hello %o', { a: 1 })

const child = log.child('worker', { level: 'info' })
child.warn('careful')*/
/*
const singleton = getLogger2({ name: 'SINGLE', level: 'warn' })
singleton.error('boom')
*/

const schema = z.object({
    choice: z
        .union([z.literal('a'), z.object({ n: z.number() })])
        .pipe(z.any()),
    id: z.uuid().default('x'),
    meta: z.record(z.string(), z.number().int()),
    tags: z.array(z.string().min(1)).optional(),
    user: z.lazy(() =>
        z.object({
            friend: z.object({ id: z.string() }).optional(),
            name: z.string(),
        }),
    ),
})
