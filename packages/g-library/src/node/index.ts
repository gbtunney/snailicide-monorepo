/* * NODE UTILITIES * */
import fs from 'fs'
import { getFilePathArr } from './file.path.array.js'

import { exportJSONFile } from './export.json.file.js'

import { getYArgs } from './yargs.js'

export const node = {
    getFilePathArr,
    exportJSONFile,
    getYArgs,
    /* * does file excist - works with files and directories
     * @param { string } path
     * @returns {boolean}
     */
    doesFileExcist: (path: string): boolean => fs.existsSync(path),
}

export type { FilePath } from './file.path.array.js'
export type { JSONExportConfig } from './export.json.file.js'
