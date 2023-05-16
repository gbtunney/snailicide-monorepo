import { isNPMPackage, NPMPackage } from './npm.package.js'
import { omit } from 'ramda'

const example_package = {
    name: 'g-libttest',
    version: '1.0.2',
    description: 'Description',
    types: 'types/index.d.ts',
    main: 'index.js',
    scripts: {},
    author: {
        email: 'gbtunney@mac.com',
    },
}
const example_package2: NPMPackage.RequiredPackageScripts<
    'build' | 'preinstall'
> = {
    ...example_package,
    name: 'g-libttest',
    scripts: {
        build: '33333',
        clean: 'jkjk',
        preinstall: 'jkjkjjk',
    },
}
const example_package_bad_name = {
    ...example_package,
    name: '--Glibttest',
}
const example_package_bad_semver = {
    ...example_package,
    version: '1',
}
const example_package_bad_email = {
    ...example_package,
    author: {
        email: 'gbtunney',
    },
}
const example_package_bad_desc = omit(['description'], example_package)

describe('isNPMPackage', () => {
    it('is valid package.json :', () => {
        expect(isNPMPackage(example_package)).toEqual(true)
        expect(isNPMPackage(example_package_bad_name)).toEqual(false)
        expect(isNPMPackage(example_package_bad_email)).toEqual(false)

        // @ts-expect-error should catch the type error
        expect(isNPMPackage(example_package_bad_desc)).toEqual(false)
        expect(isNPMPackage(example_package_bad_semver)).toEqual(false)
    })
})
