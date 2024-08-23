/** Returns a new regexp with a min and max character count appended */
export const regExpCharacterCount = (
    value: RegExp,
    min: number = 2,
    max: number = 8,
): RegExp => new RegExp(`${value.source}{${min.toString()},${max.toString()}$`)
