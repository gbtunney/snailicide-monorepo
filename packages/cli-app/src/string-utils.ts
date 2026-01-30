import { ChalkColor, logger } from '@snailicide/build-config'
import chalk, { ChalkInstance } from 'chalk'
import { z } from 'zod'

export const prettyErrorLog = (
    error: z.ZodError,
    message: string,
    color: ChalkColor | undefined = 'red',
    theme: 'fg' | 'bg' = 'fg',
): string => {
    const _instance: ChalkInstance =
        color !== undefined ? logger.getChalkInstance(color, theme) : chalk
    return `${_instance.underline(`\n------ ✖ ${message} ------`)}\n${z.prettifyError(error)}`
}

export const wrapString = (
    value: string,
    prefix: string = '(',
    suffix: string = ')',
): string => {
    const _value = value.trim()
    return _value.length > 0 ? `${prefix}${_value}${suffix}` : ''
}
const ansiRegex = ({ onlyFirst = false } = {}): RegExp => {
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    ].join('|')

    return new RegExp(pattern, onlyFirst ? undefined : 'g')
}

export const removeAnsi = (value: string): string =>
    value.replace(ansiRegex(), '')
