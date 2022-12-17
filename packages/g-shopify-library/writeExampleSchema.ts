import { Jsonify } from 'type-fest'
import { node } from '@snailicide/g-library'

const { default: getSchema } = await import('./exampleSectionSchema.js')
const testSectionSchema: Jsonify<any> = getSchema
node.exportJSONFile([
    { data: testSectionSchema, filename: 'exampleSectionSchema.json' },
])

export {}
