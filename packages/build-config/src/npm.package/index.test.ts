import type { PackageUtils, Buildable, Lintable } from './index'
import { isNPMPackage } from './index'

type PackageJsonTypescript = PackageUtils.PackageJsonTypescript
type BuildablePackage = Buildable.PackageJson
type LintablePackage = Lintable.PackageJson
/*/*todo: move to test


"config": {
    "eslint": {
        "extensions": "ts,js,cjs,mjs",
            "path": ".es*,*,**!/!*",
            "config": ".eslintrc.local.cjs"
    },
    "prettier": {
        "extensions": "cts,json,yaml,yml,graphql,md",
            "path": "*,**!/!*"
    }
},
"prettier": "./dist/prettier.config.ts",
    */

const buildable_ts_package: Buildable.PackageJson<PackageUtils.PackageJsonTypescript> =
    {
        name: 'gbttest',
        version: '1.0.0',
        types: 'types/index.d.ts',
        main: 'index.js',
        description: 'Description',
        scripts: {
            'build': 'testing str',
            'clean:build': 'testing str',
        },
        author: '',
        license: 'ISC',
    }

const example_ts_package = {
    name: 'gbt~~~~test',
    version: '1.0.0',
    description: 'Description',
    types: 'types/index.d.ts',
    main: 'index.js',
    scripts: {
        test: 'testing str',
    },
}

//tests
const tsTest1: PackageJsonTypescript = example_ts_package
// @ts-expect-error Is not a buildable package.
const tsTest2: Buildable.PackageJson<PackageUtils.PackageJsonTypescript> =
    example_ts_package

//todo: why is this broke, but works on direct assignment???
const tsTest3: PackageUtils.PackageJsonStandard = example_ts_package

//required test
const reqTest: PackageUtils.RequiredPackageScripts<'test' | 'gillian'> = {
    scripts: {
        test: 'fff',
        gillian: 'tttttt',
    },
}
const reqTest2: PackageUtils.RequiredPackageScripts<'test' | 'start', true> = {
    scripts: {
        test: 'fff',
        start: 'string',
        // @ts-expect-error does not allow extra properties in strict mode
        dev: 'string',
    },
}

const example_standard_package: PackageUtils.PackageJsonStandard<true> = {
    name: 'gbt~~~~test',
    version: '1.0.0',
    description: 'llll',
    // @ts-expect-error WILL ERROR when extra properties are added in strict mode
    types: 'types/index.d.ts',
    main: 'index.js',
}
// @ts-expect-error TODO: This is broke - does not check minimum properties
const example_standard_package2: PackageUtils.PackageJsonStandard = {
    name: 'gbt~~~~test',
    version: '1.0.0',
    //description:"llll",
    // types: 'types/index.d.ts',
    main: 'index.js',
}

//todo: write tests for LINTABLE
describe('package | isNPMPackage', () => {
    it('package types', () => {
        // expect( isNPMPackage<BuildablePackage<PackageJsonTypescript>>(buildable_ts_package)).toBeDefined()
        //expect( isNPMPackage<PackageJsonTypescript>(example_ts_package)).toBeDefined()
        // expect( isNPMPackage<PackageJsonStandard<true>>(example_standard_package)).toBeDefined()
        expect(isNPMPackage(example_standard_package)).toBeDefined()
    })
})
