import type { IBuildable } from './index.js'
import { isNPMPackage } from './index.js'
const min_package = {
    name: 'gbttest',
    version: '1.0.0',
    types: 'types/index.d.ts',
    main: 'index.js',

    scripts: {
        'build': 'testing str',
        'clean:build': 'testing str',
    },
    author: '',
    license: 'ISC',
}

const example = isNPMPackage<IBuildable>(min_package)
