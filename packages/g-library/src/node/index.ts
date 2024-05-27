/* * NODE UTILITIES * */
import * as filePath from './file.path.array.js'

import { getImageBase64 } from './encodeBase64.js'
import { exportJSONFile } from './export.json.file.js'
//import { getYArgs, getArgsObject } from './yargs-util.js'

import * as zod_fs_schema from './zod.node.js'

/* * TYPES * */
export type { FilePath, FileType } from './file.path.array.js'
export type { JSONExportConfig } from './export.json.file.js'
export type { ImageMimeType } from './encodeBase64.js'

export const node = {
    ...filePath,
    getImageBase64,
    exportJSONFile,
    zod_fs_schema,
}
export default node
