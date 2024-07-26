import MarkdownIt from 'markdown-it'

export const renderMarkdown = (
    value: string,
    _options: MarkdownIt['options'] = {
        html: false,
    },
): string => {
    return MarkdownIt(_options).render(value)
}
export const renderInlineMarkdown = (
    value: string,
    _options: MarkdownIt['options'] = {
        html: true,
    },
): string => {
    return MarkdownIt(_options).renderInline(value)
}
