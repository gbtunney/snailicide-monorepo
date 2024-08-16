/* * NODE UTILITIES * */
import { z } from 'zod'

import { getImageBase64 } from './encode-base64.js'
import { exportJSONFile } from './export.json.file.js'
import * as filePath from './file.path.array.js'
import { getArgsObject, getYArgs } from './yargs-util.js'
import * as zod_fs_schema from './zod.node.js'
export const zod: typeof z & typeof zod_fs_schema = {
    ...z,
    ...zod_fs_schema,
}

/** @namespace Functions pertaining to nodejs files and path resolution */
export const node = {
    exportJSONFile,
    getArgsObject,
    getImageBase64,
    getYArgs,
    ...zod_fs_schema,
    ...filePath,
}
export default node

/* * TYPES * */
export type { ImageMimeType } from './encode-base64.js'
export type { JSONExportConfig, JSONExportEntry } from './export.json.file.js'
export type { FilePath, FileType } from './file.path.array.js'
