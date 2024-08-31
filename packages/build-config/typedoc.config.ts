import path from 'node:path'
import url from 'node:url'
import { typedoc } from './types/index.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const newTypeDocConfig= {
    "githubPages": false,
    "indexFormat": "table" as const,
    "textContentMappings": {
       "title.indexPage": "Documentation",
       "title.memberPage": "{name}"
    },
     "useCodeBlocks": true,
   // plugin:["./dist/typedocPlugin.mjs"],
}
const typeDocConfig = {...typedoc.configVitepressTheme(__dirname,newTypeDocConfig),
    entryPoints: [
        path.resolve(`${__dirname}/src/**/index.ts`),
        path.resolve(`${__dirname}/src/utilities.ts`)
        ],
    exclude: [path.resolve(`${__dirname}/src/index.ts`)]
}

export const result =JSON.parse(JSON.stringify( typeDocConfig, null, 4))
//console.log("result:",result)
export default result
