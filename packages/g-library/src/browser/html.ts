export const getHTMLElementFromString = (value: string): HTMLElement => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(value, 'text/html')
    return doc.body
}
