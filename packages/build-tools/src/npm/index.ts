/* * Collection of Generic Package Utility Types  * */
import {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
} from './npm.package.js'
import schemas from './schema.js'

export type {
    PackageJson,
    BasePackage,
    PackageJsonInput,
} from './npm.package.js'

export const npm = {
    isNPMPackage,
    parseNPMPackage,
    packageStandardSchema,
    schemas,
}

export default npm
