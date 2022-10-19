import fs from 'fs'
export const doesFilePathExcist = (value) =>
    value.length > 1 && fs.existsSync(value)
