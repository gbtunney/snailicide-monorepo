/* * NODE UTILITIES * */
import fs from 'fs'
import * as filePath from './file.path.array.js'
import { getImageBase64 } from './encodeBase64.js'
import { exportJSONFile } from './export.json.file.js'
import { getYArgs, getArgsObject } from './yargs.js'

export const node = {
    getImageBase64,
    exportJSONFile,
    getArgsObject,
    getYArgs,
    ...filePath,
    /* * Types * */
    /* * does file excist - works with files and directories
     * @param { string } path
     * @returns {boolean}
     */
    doesFileExist: (path: string): boolean => fs.existsSync(path),
}
export default node
/* * TYPES * */
import type { FilePath, FileType } from './file.path.array.js'
import type { JSONExportConfig } from './export.json.file.js'
import type { ImageMimeType } from './encodeBase64.js'

export type Node = {
    FilePath: FilePath
    FileType: FileType
    JSONExportConfig: JSONExportConfig
    ImageMimeType: ImageMimeType
}
