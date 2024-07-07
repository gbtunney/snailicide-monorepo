import sortPackageJson from 'sort-package-json'

import pkg from './package.json' assert { type: 'json' }
import { isNPMPackage, parseNPMPackage } from './types/npm/npm.package.js'

if (isNPMPackage(pkg)) {
    const _pkg = parseNPMPackage(pkg, undefined, true, true)
    const _parsed = JSON.parse(JSON.stringify(_pkg))

    const sorted = sortPackageJson(_parsed, {
        sortOrder: ['version'],
    })
    console.log('is package', sorted)
}
