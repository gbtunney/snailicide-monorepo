/**
 * Commitlint configuration for use in Monorepo.
 *
 * @see [commitlint - Lint commit messages](https://commitlint.js.org/#/)
 * @see [commitlint-config-conventional - Shareable commitlint config](https://www.npmjs.com/package/@commitlint/config-conventional)
 * @see [Commitizen](https://commitizen-tools.github.io/commitizen/)
 */
import type { UserConfig as CommitlintUserConfig } from "@commitlint/types"
import type { Writable } from "type-fest"

export const COMMIT_TYPES = [
    "feat",
    "fix",
    "wip",
    "build",
    "chore",
    "docs",
    "release",
    "ci",
    "perf",
    "refactor",
    "revert",
    "style",
    "test",
] as const
export const configuration = (
    scope_enum: Array<string> = [],
    type_enum: Array<string> = COMMIT_TYPES as Writable<typeof COMMIT_TYPES>,
): CommitlintUserConfig => {
    const baseConfig: CommitlintUserConfig = {
        extends: ["@commitlint/config-conventional"],
        prompt: {
            messages: {
                emptyWarning: "can not be empty",
                lowerLimitWarning: "below limit",
                max: "upper %d chars",
                min: "%d chars at least",
                skip: ":skip",
                upperLimitWarning: "over limit",
            },
            questions: {
                body: {
                    description: "Provide a longer description of the change",
                },
                breaking: {
                    description: "Describe the breaking changes",
                },
                breakingBody: {
                    description:
                        "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
                },
                isBreaking: {
                    description: "Are there any breaking changes?",
                },
                isIssueAffected: {
                    description: "Does this change affect any open issues?",
                },
                issues: {
                    description:
                        'Add issue references (e.g. "fix #123", "re #123".)',
                },
                issuesBody: {
                    description:
                        "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
                },
                scope: {
                    description:
                        "What is the scope of this change (e.g. component or file name)",
                },
                subject: {
                    description:
                        "Write a short, imperative tense description of the change",
                },
                type: {
                    description:
                        "Select the type of change that you're committing:",
                    enum: {
                        build: {
                            description:
                                "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
                            emoji: "🛠",
                            title: "Builds",
                        },
                        chore: {
                            description:
                                "Other changes that don't modify src or test files",
                            emoji: "♻️",
                            title: "Chores",
                        },
                        ci: {
                            description:
                                "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
                            emoji: "⚙️",
                            title: "Continuous Integrations",
                        },
                        docs: {
                            description: "Documentation only changes",
                            emoji: "📚",
                            title: "Documentation",
                        },
                        feat: {
                            description: "A new feature",
                            emoji: "✨",
                            title: "Features",
                        },
                        fix: {
                            description: "A bug fix",
                            emoji: "🐛",
                            title: "Bug Fixes",
                        },
                        perf: {
                            description:
                                "A code change that improves performance",
                            emoji: "🚀",
                            title: "Performance Improvements",
                        },
                        refactor: {
                            description:
                                "A code change that neither fixes a bug nor adds a feature",
                            emoji: "📦",
                            title: "Code Refactoring",
                        },
                        revert: {
                            description: "Reverts a previous commit",
                            emoji: "🗑",
                            title: "Reverts",
                        },
                        style: {
                            description:
                                "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
                            emoji: "💎",
                            title: "Styles",
                        },
                        test: {
                            description:
                                "Adding missing tests or correcting existing tests",
                            emoji: "🚨",
                            title: "Tests",
                        },
                    },
                },
            },
            settings: { enableMultipleScopes: true, scopeEnumSeparator: "," },
        },
        rules: {
            "scope-empty": [2, "never"],
            "scope-enum": [2, "always", scope_enum],
            "type-enum": [2, "always", type_enum],
        },
    }
    return baseConfig
}
/** @ignore */
export const commitlint = {
    commit_types: COMMIT_TYPES,
    configuration,
}

export type { UserConfig as CommitlintUserConfig } from "@commitlint/types"
