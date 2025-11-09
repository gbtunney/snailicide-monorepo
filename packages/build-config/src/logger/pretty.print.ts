import util from 'util'

export type PrettyPrintOptions = {
    depth?: number
    colors?: boolean
    compact?: boolean | number
    maxArrayLength?: number
    breakLength?: number
    sorted?: boolean | ((a: string, b: string) => number)
}

export const formatValue = (
    value: unknown,
    opts?: PrettyPrintOptions,
): string => {
    switch (typeof value) {
        case 'string':
            return value
        case 'number':
        case 'boolean':
            return String(value)
        case 'bigint':
            return `${value.toString()}n`
        case 'symbol':
            return value.toString()
        case 'function':
            return value.name ? `[Function ${value.name}]` : '[Function]'
        case 'undefined':
            return 'undefined'
        case 'object':
            if (value === null) return 'null'
            if (value instanceof Error)
                return value.stack ?? `${value.name}: ${value.message}`
            try {
                return util.inspect(value, {
                    breakLength: opts?.breakLength ?? 120,
                    colors: opts?.colors ?? process.stdout.isTTY,
                    compact: opts?.compact ?? 2,
                    depth: opts?.depth ?? 4,
                    maxArrayLength: opts?.maxArrayLength ?? 100,
                    sorted: opts?.sorted ?? true,
                })
            } catch {
                return '[Uninspectable Object]'
            }
        default:
            return String(value)
    }
}

/** Join many unknowns into a single formatted string */
export const formatArgs = (
    delimiter: string = '',
    ...vals: Array<unknown>
): string => vals.map((v) => formatValue(v)).join(delimiter)

/** Tagged template: safely interpolate unknowns */
export const fmt = (
    strings: TemplateStringsArray,
    ...values: Array<unknown>
): string =>
    strings.reduce((accumulated, chunk, index) => {
        const interpolated =
            index < values.length ? formatValue(values[index]) : ''
        return accumulated + chunk + interpolated
    }, '')

export const prettify = fmt
export const prettyPrint = fmt
/** @deprecated Use fmt */
export const pp = fmt
