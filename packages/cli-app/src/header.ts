import chalk from 'chalk'
import figlet from 'figlet'
import { z } from 'zod'

import { app_schema } from './schema.js'

type AppOptions = z.output<typeof app_schema>
export type PrintHeader = AppOptions & {
    app_title: string
    divider: string
}
const getTitleColor = (
    value: string,
    color: AppOptions['title_color'],
): string => {
    return chalk.bgHex(color.bg).hex(color.fg)(value)
}
export const doPrintHeader = (header: PrintHeader): string => {
    return `${header.app_title}\n${header.divider}\n`
}
export const getHeader = (options: AppOptions): PrintHeader => {
    const app_title: string = getTitleColor(
        options.figlet && options.name !== undefined
            ? figlet.textSync(options.name, {
                  horizontalLayout: 'full',
              })
            : options.name,
        options.title_color,
    )
    const divider = '__________________________________________'
    return {
        ...options,
        app_title,
        divider,
    }
}
export {}
