/* * NODE UTILITIES * */
import { getFilePathArr } from './file.path.array.js'

import { exportJSONFile } from './export.json.file.js'

import { getYArgs } from './yargs.js'

export const node = {
    getFilePathArr,
    exportJSONFile,
    getYArgs,
}

export type { FilePath } from './file.path.array.js'
export type { JSONExportConfig } from './export.json.file.js'
