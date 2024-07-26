/**
 * Collection of Generic Package Utility Schemas and Typeguards
 *
 * @module npm
 */
import {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
} from './npm.package.js'
import schemas from './schema.js'

export const npm = {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
    schemas,
}

export default npm

export type {
    BasePackage,
    PackageJson,
    PackageJsonInput,
} from './npm.package.js'

export {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
} from './npm.package.js'
