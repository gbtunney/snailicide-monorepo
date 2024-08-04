import chalk from 'chalk'
import figlet from 'figlet'
import { AppConfig } from './app-config.js'

export type PrintHeader = AppConfig & {
    app_title: string
    divider: string
}
const getTitleColor = (
    value: string,
    color: AppConfig['title_color'],
): string => {
    return chalk.bgHex(color.bg).hex(color.fg)(value)
}
export const doPrintHeader = (header: PrintHeader): string => {
    return `${header.app_title}\n${header.divider}\n`
}
export const getHeader = (options: AppConfig): PrintHeader => {
    const app_title: string = getTitleColor(
        options.figlet
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
