//TODO: MOVE
export const stringContainsNumber = (value: string): boolean => /\d/.test(value)

export const stringContainsLetter = (value: string): boolean =>
    value.length === 1 && value.match(/[a-z]/i) === null
