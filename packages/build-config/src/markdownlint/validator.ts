import type { Configuration } from 'markdownlint'
import { JsonObject } from 'type-fest'
import {importJSON} from './../utilities.js'
import type { JsonValue, UndefinedOnPartialDeep ,OmitIndexSignature} from 'type-fest'
import { getMarkdownlintRuleConfiguration,MarkdownLintConfig } from './config.js'
import { isPlainObject, safeDeserializeJSON } from '../utilities.js'
import Ajv,{type JSONSchemaType,ErrorObject,Options as AjvOptions,ValidateFunction} from "ajv";
import { is } from 'ramda'

const ttt:Configuration = {
    ignores:[],
}
type MarkdownlintValidatedResult<ConfigType> = {
    config: ConfigType
    schema: JsonObject
    valid: boolean
    errors: Array<ErrorObject>
}

/* Options for validation/compilation */
export interface GetConfigMDOptions {
    strictSchema?: boolean            // Which schema file (-strict or not)
    strictValidation?: boolean        // Ajv strict mode
    allowAdditionalProperties?: boolean
    ajvOptions?: Omit<AjvOptions, 'strict'>
    throwOnError?: boolean            // Throw instead of returning errors array
    useBaseConfig?: boolean           // added
    useDefault?: boolean              // added
}

export const configMD: (opts?: MarkdownLintConfig<'loose'>) => MarkdownLintConfig<'loose'> = (
  opts: MarkdownLintConfig<'loose'> = {} as any,
): MarkdownLintConfig<'loose'> => getMarkdownlintRuleConfiguration(opts, false)

export async function getConfigMD(
  rules: MarkdownLintConfig<'strict'>,
  isStrict: true,
  opts?: GetConfigMDOptions,
): Promise<MarkdownlintValidatedResult<MarkdownLintConfig<'strict'>>>
export async function getConfigMD(
  rules: MarkdownLintConfig<'loose'>,
  isStrict?: false,
  opts?: GetConfigMDOptions,
): Promise<MarkdownlintValidatedResult<MarkdownLintConfig<'loose'>>>
export async function getConfigMD(
  rules: MarkdownLintConfig<'strict'> | MarkdownLintConfig<'loose'>,
  isStrict: boolean = false,
  opts?: GetConfigMDOptions,
): Promise<
  | MarkdownlintValidatedResult<MarkdownLintConfig<'strict'>>
  | MarkdownlintValidatedResult<MarkdownLintConfig<'loose'>>
> {
  const {
    strictSchema = isStrict,
    strictValidation = isStrict,
    allowAdditionalProperties = !isStrict,
    ajvOptions = { allErrors: true, allowUnionTypes: true },
    throwOnError = false,
    useBaseConfig = true,
    useDefault = true,
  } = opts ?? {}

  const schemaJson = await importJSON(getMDSchemaPath(strictSchema))
  if (!isPlainObject<JsonObject>(schemaJson)) {
    if (throwOnError) throw new Error('Failed to load markdownlint schema JSON')
    return {
      config: rules as any,
      schema: {} as JsonObject,
      valid: false,
      errors: [
        {
          instancePath: '',
          schemaPath: '',
          keyword: 'type',
          params: {},
          message: 'Schema JSON was not an object',
        },
      ],
    }
  }

  const workingSchema: JsonObject = { ...(schemaJson as JsonObject) }
  ;(workingSchema as any).additionalProperties = allowAdditionalProperties

  const validateFn = getAjvValidator(
    workingSchema as JSONSchemaType<unknown>,
    strictValidation,
    ajvOptions,
  )

  const normalized: MarkdownLintConfig =
    isStrict
      ? getMarkdownlintRuleConfiguration(
          rules as MarkdownLintConfig<'strict'>,
          true,
          useBaseConfig,
          useDefault,
        )
      : getMarkdownlintRuleConfiguration(
          rules as MarkdownLintConfig<'loose'>,
          false,
          useBaseConfig,
          useDefault,
        )

  const ok: boolean = validateFn(normalized)
  const errors: Array<ErrorObject> = ok ? [] : validateFn.errors ?? []

  if (!ok && throwOnError) {
    const msg = errors
      .map(
        e =>
          `${e.instancePath || '/'} ${e.message ?? e.keyword}${
            Object.keys(e.params || {}).length
              ? ' ' + JSON.stringify(e.params)
              : ''
          }`,
      )
      .join('\n')
    throw new Error(`markdownlint configuration failed validation:\n${msg}`)
  }

  return {
    config: normalized as any,
    schema: workingSchema,
    valid: ok,
    errors,
  }
}

export const getAjvValidator = <S extends JSONSchemaType<unknown>>(
  schema: S,
  strictValidation: boolean = true,
  opts: Omit<AjvOptions, 'strict'> = { allErrors: true, allowUnionTypes: true },
): ValidateFunction<S> => {
  return new Ajv({ ...opts, strict: strictValidation }).compile<S>(schema)
}

/* @todo: fix this function someday */
export const exportTypes = (schema : JSONSchemaType<unknown>,  outFile = "./src/markdownlint/gbtmarkdownlint-config.d.ts"):void=>{
/*
  const tsRaw = await compile(schema["properties"], "MarkdownlintConfig", {
    bannerComment: "",
    style:false,
  });

  await fs.writeFileSync(outFile, tsRaw.toString(), "utf8");
  console.log(`✅  Wrote sanitized types → ${fs.existsSync(outFile)}`);
  return ts;onsole.log("THE TYPES@" ,ts)
*/
}

const getMDSchemaPath = (isStrict :boolean=true):string=>{
    return `node_modules/markdownlint/schema/markdownlint-config-schema${ isStrict ? '-strict': '' }.json`
}