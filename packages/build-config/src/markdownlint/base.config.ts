import type { MarkdownlintConfigurationSchema } from './markdownlint.config.js'

import { getScaledWidth, SHARED_FORMATTING_RULES } from '../prettier/index.js'

type MarkdownlintRuleConfiguration = MarkdownlintConfigurationSchema

export type MarkdownlintRuleConfigurationNoAliases = Omit<
    MarkdownlintRuleConfiguration,
    | '$schema'
    | 'extends'
    | 'heading-increment'
    | 'heading-style'
    | 'ul-style'
    | 'list-indent'
    | 'ul-indent'
    | 'no-trailing-spaces'
    | 'no-hard-tabs'
    | 'no-reversed-links'
    | 'no-multiple-blanks'
    | 'line-length'
    | 'headings'
    | 'bullet'
    | 'ul'
    | 'indentation'
    | 'whitespace'
    | 'hard_tab'
    | 'links'
    | 'blank_lines'
    | 'line_length'
    | 'code'
    | 'atx'
    | 'spaces'
    | 'atx_closed'
    | 'blockquote'
    | 'ol'
    | 'html'
    | 'url'
    | 'hr'
    | 'emphasis'
    | 'language'
    | 'spelling'
    | 'accessibility'
    | 'images'
    | 'table'
    | 'commands-show-output'
    | 'no-missing-space-atx'
    | 'no-multiple-space-atx'
    | 'no-missing-space-closed-atx'
    | 'no-multiple-space-closed-atx'
> & {
    /** Force presence of default for “strict” usage */
    default: boolean
}

/** As MarkdownlintRuleConfiguration; */
export const getBaseConfig = (): MarkdownlintRuleConfiguration => {
    const baseConfig: MarkdownlintRuleConfiguration = {
        // assigned at end default: useDefault,
        //extends: false,
        default: true,
        // MD001 heading-increment
        // Heading levels should only increment by one: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md001.md
        MD001: false,

        // MD003 heading-style
        // Consistent heading style: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md003.md
        MD003: { style: 'consistent' },

        // MD004 ul-style
        // Consistent unordered list style: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md004.md
        MD004: { style: 'consistent' },

        // MD005 list-indent
        // Inconsistent indentation for list items: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md005.md
        MD005: true,

        // MD007 ul-indent
        // Unordered list indentation: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md007.md
        MD007: {
            indent: SHARED_FORMATTING_RULES.markdownTabWidth,
            start_indent: SHARED_FORMATTING_RULES.markdownTabWidth,
            start_indented: false,
        },

        // MD009 no-trailing-spaces
        // Trailing spaces: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md009.md
        MD009: {
            br_spaces: 2,
            list_item_empty_lines: false,
            strict: true,
        },

        // MD010 no-hard-tabs
        // Hard tabs: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md010.md
        MD010: {
            code_blocks: true,
            ignore_code_languages: [],
            spaces_per_tab: 1,
        },

        // MD011 no-reversed-links
        // Reversed link syntax: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md011.md
        MD011: true,

        // MD012 no-multiple-blanks
        // Multiple consecutive blank lines: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md012.md
        MD012: { maximum: SHARED_FORMATTING_RULES.maxEmptyLines },

        // MD013 line-length
        // Line length: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md013.md
        MD013: {
            code_block_line_length: getScaledWidth('comments'),
            code_blocks: true,
            heading_line_length: getScaledWidth('markdown'),
            headings: true,
            line_length: getScaledWidth('markdown'),
            stern: false,
            strict: false,
            tables: true,
        },

        // MD014 commands-show-output
        // Dollar signs without output: https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md014.md
        MD014: false,

        // MD018 no-missing-space-atx
        MD018: true,

        // MD019 no-multiple-space-atx
        MD019: true,

        // MD020 no-missing-space-closed-atx
        MD020: true,

        // MD021 no-multiple-space-closed-atx
        MD021: true,

        // MD022 blanks-around-headings
        MD022: { lines_above: 1, lines_below: 1 },

        // MD023 heading-start-left
        MD023: true,

        // MD024 no-duplicate-heading
        MD024: false,

        // MD025 single-title/single-h1
        MD025: { front_matter_title: '^\\s*title\\s*[:=]', level: 1 },

        // MD026 no-trailing-punctuation
        MD026: { punctuation: '.,;:!。，；：！' },

        // MD027 no-multiple-space-blockquote
        MD027: true,

        // MD028 no-blanks-blockquote
        MD028: true,

        // MD029 ol-prefix
        MD029: { style: 'one_or_ordered' },

        // MD030 list-marker-space
        MD030: { ol_multi: 1, ol_single: 1, ul_multi: 1, ul_single: 1 },

        // MD031 blanks-around-fences
        MD031: { list_items: true },

        // MD032 blanks-around-lists
        MD032: true,

        // MD033 no-inline-html
        MD033: { allowed_elements: [] },

        // MD034 no-bare-urls
        MD034: true,

        // MD035 hr-style
        MD035: { style: 'consistent' },

        // MD036 no-emphasis-as-heading
        MD036: { punctuation: '.,;:!?。，；：！？' },

        // MD037 no-space-in-emphasis
        MD037: true,

        // MD038 no-space-in-code
        MD038: true,

        // MD039 no-space-in-links
        MD039: true,

        // MD040 fenced-code-language
        MD040: { language_only: true },

        // MD041 first-line-heading/first-line-h1
        MD041: { front_matter_title: '^\\s*title\\s*[:=]', level: 1 },

        // MD042 no-empty-links
        MD042: true,

        // MD043 required-headings
        MD043: { match_case: true },

        // MD044 proper-names
        MD044: { code_blocks: true, html_elements: true, names: [] },

        // MD045 no-alt-text
        MD045: true,

        // MD046 code-block-style
        MD046: { style: 'consistent' },

        // MD047 single-trailing-newline
        MD047: true,

        // MD048 code-fence-style
        MD048: { style: 'consistent' },

        // MD049 emphasis-style
        MD049: { style: 'consistent' },

        // MD050 strong-style
        MD050: { style: 'consistent' },

        // MD051 link-fragments
        MD051: true,

        // MD052 reference-links-images
        MD052: { shortcut_syntax: false },

        // MD053 link-image-reference-definitions
        MD053: { ignored_definitions: ['//'] },

        // MD054 link-image-style
        MD054: {
            autolink: true,
            collapsed: true,
            full: true,
            inline: true,
            shortcut: true,
            url_inline: true,
        },

        // MD055 table-pipe-style
        MD055: { style: 'consistent' },

        // MD056 table-column-count
        MD056: true,

        // MD058 blanks-around-tables
        // (Intentionally left for user override)
        // MD058: true,
    }
    return baseConfig
}
