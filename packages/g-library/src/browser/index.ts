import { getHTMLElementFromString } from './html.js'
import { styledConsoleLog } from './logging.js'
import { renderMarkdown, renderInlineMarkdown } from '../string/_markdown.js'
import { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'

export const htmlUtils = {
    styledConsoleLog,
    getHTMLElementFromString,
    renderMarkdown,
    renderInlineMarkdown,
    isCSSColorSpecial,
    isNotCSSColorSpecial,
}
export default htmlUtils

export { getHTMLElementFromString } from './html.js'
export { styledConsoleLog } from './logging.js'
export { renderMarkdown, renderInlineMarkdown } from '../string/_markdown.js'
export { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'
