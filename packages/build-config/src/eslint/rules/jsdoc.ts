import jsdoc from "eslint-plugin-jsdoc"
import { Config } from "typescript-eslint"
export const jsdocRules = (): Config => [
    { ...jsdoc.configs["flat/recommended"] },

    { ...jsdoc.configs["flat/recommended-typescript"] },
    {
        rules: {
            "jsdoc/check-alignment": "error",
            "jsdoc/check-examples": "off", // Recommended
            "jsdoc/check-indentation": 1,
            "jsdoc/check-line-alignment": "error",
            "jsdoc/convert-to-jsdoc-comments": [
                "error",
                { enforceJsdocLineStyle: "multi" },
            ],
            "jsdoc/no-blank-block-descriptions": "error",
            "jsdoc/require-param": "off",
            "jsdoc/require-returns": "off",
            "jsdoc/tag-lines": "off",
        },
    },
]
