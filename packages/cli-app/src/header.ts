import figlet from 'figlet'
import { appOptionsSchema } from './app.js'
import chalk from 'chalk'
import { z } from 'zod'

type AppOptions = z.output<typeof appOptionsSchema>
export type PrintHeader = AppOptions & {
    app_title: string
    divider: string
}
const getTitleColor = (
    value: string,
    color: AppOptions['title_color']
): string => {
    return chalk.bgHex(color.bg).hex(color.fg)(value)
}
export const doPrintHeader = (header: PrintHeader) => {
    console.log(`${header.app_title}\n${header.divider}\n`)
}
export const getHeader = (options: AppOptions): PrintHeader => {
    const app_title: string = getTitleColor(
        options.figlet === true && options.name !== undefined
            ? figlet.textSync(options.name, {
                  horizontalLayout: 'full',
              })
            : options.name,
        options.title_color
    )
    const divider = '__________________________________________'
    return {
        ...options,
        app_title,
        divider,
    }
}
export {}
