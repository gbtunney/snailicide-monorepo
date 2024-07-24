/* * NODE UTILITIES * */
//import { getYArgs, getArgsObject } from './yargs-util.js'
import { z } from 'zod'

import { getImageBase64 } from './encode-base64.js'
import { exportJSONFile } from './export.json.file.js'
import * as filePath from './file.path.array.js'
import * as zod_fs_schema from './zod.node.js'

export const zod: typeof z & typeof zod_fs_schema = {
    ...z,
    ...zod_fs_schema,
}
export const node = {
    ...filePath,
    exportJSONFile,
    getImageBase64,
}
export default node

export type { ImageMimeType } from './encode-base64.js'

export type { JSONExportConfig } from './export.json.file.js'

/* * TYPES * */
export type { FilePath, FileType } from './file.path.array.js'
