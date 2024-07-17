/* * NODE UTILITIES * */
//import { getYArgs, getArgsObject } from './yargs-util.js'
import { z } from 'zod'

import { getImageBase64 } from './encodeBase64.js'
import { exportJSONFile } from './export.json.file.js'
import * as filePath from './file.path.array.js'
import * as zod_fs_schema from './zod.node.js'

/* * TYPES * */
export type { FilePath, FileType } from './file.path.array.js'
export type { JSONExportConfig } from './export.json.file.js'
export type { ImageMimeType } from './encodeBase64.js'

export const zod: typeof z & typeof zod_fs_schema = {
    ...z,
    ...zod_fs_schema,
}

export const node = {
    ...filePath,
    getImageBase64,
    exportJSONFile,
}

export default node
