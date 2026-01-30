---
'@snailicide/build-config': major
'@snailicide/cli-app': patch
'@snailicide/g-library': patch
---

BREAKING (build-config)

- Markdown linting is enforced in CI and pre-commit.
- Prefer named exports; default exports will fail lint.
- Tightened @typescript-eslint and JSDoc rules:
  - no-deprecated
  - no-unnecessary-type-conversion
  - no-unsafe-argument
  - jsdoc/no-undefined-types
- Logger Scripts

Migration

- Replace ZodSchema with z.ZodType (or z.ZodTypeAny).
- Remove string.toString() and BigInt(bigint) patterns.
- Replace default exports with named exports.
- When constructing entries/tuples, use readonly [K, V] typing or a typed
  entries helper.

@g-library (patch)

- Clean up numeric transforms (remove needless conversions, fix JSDoc). No
  runtime behavior change.

@snailicide/cli-app (patch)

- Align to new lint + markdownlint setup.
