import { SetRequired, TsConfigJson } from 'type-fest'

type CompilerOptions = SetRequired<
    TsConfigJson,
    'compilerOptions'
>['compilerOptions']

export const compilerOptions: CompilerOptions = {
    allowSyntheticDefaultImports: true,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    alwaysStrict:
        true /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    composite: true,
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    declaration: true /* Specify what JSX code is generated. */,
    declarationMap:
        true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    emitDecoratorMetadata:
        true /* Emit design-type metadata for decorated declarations in source files. */,
    esModuleInterop:
        true /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */,
    exactOptionalPropertyTypes:
        true /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */,
    experimentalDecorators: true /* Specify what module code is generated. */,
    // "preserveSymlinks": true,                          /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    forceConsistentCasingInFileNames:
        true /* Specify how TypeScript looks up a file from a given module specifier. */,
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    importsNotUsedAsValues: 'remove' /* Enable importing .json files. */,
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */
    /* Interop Constraints */
    isolatedModules: true,
    /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    jsx: 'react',
    jsxFactory:
        'React.createElement' /* Create source map files for emitted JavaScript files. */,
    jsxFragmentFactory:
        'React.Fragment' /* Specify emit/checking behavior for imports that are only used for types. */,
    lib: [
        'ESNext',
        'ES2020',
        'DOM',
    ] /* Set the newline character for emitting files. */,
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */
    /* Modules */
    module: 'ESNext' /* Ensure that each file can be safely transpiled without relying on other imports. */,
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    moduleResolution:
        'bundler' /* Allow 'import x from y' when a module doesn't have a default export. */,
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    newLine: 'LF',
    /* Ensure that casing is correct in imports. */
    noFallthroughCasesInSwitch: true,
    /* Enable all strict type-checking options. */
    noImplicitOverride: true,
    noImplicitReturns: true /* Ensure 'use strict' is always emitted. */,
    noPropertyAccessFromIndexSignature:
        true /* Enable error reporting when local variables aren't read. */,
    noUncheckedIndexedAccess:
        true /* Raise an error when a function parameter isn't read. */,
    noUnusedLocals:
        false /* Interpret optional property types as written, rather than adding 'undefined'. */,
    noUnusedParameters:
        false /* Enable error reporting for codepaths that do not explicitly return in a function. */,
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    resolveJsonModule:
        true /* Enable error reporting for fallthrough cases in switch statements. */,
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    skipDefaultLibCheck:
        true /* Add 'undefined' to a type when accessed using an index. */,
    skipLibCheck:
        true /* Ensure overriding members in derived classes are marked with an override modifier. */,
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    /* Enforces using indexed accessors for keys declared using an indexed type. */
    sourceMap: true,
    /* Type Checking */
    strict: true /* Skip type checking .d.ts files that are included with TypeScript. */,
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
    /* Language and Environment */
    target: 'ESNext',
}
