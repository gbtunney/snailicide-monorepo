import MarkdownIt from 'markdown-it'

export const renderMarkdown = (
    value: string,
    _options: MarkdownIt['options'] = {
        html: false,
    },
) => {
    return MarkdownIt(_options).render(value)
}
export const renderInlineMarkdown = (
    value: string,
    _options: MarkdownIt['options'] = {
        html: true,
    },
) => {
    return MarkdownIt(_options).renderInline(value)
}
