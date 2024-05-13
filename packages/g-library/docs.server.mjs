/** This is not a typescript file because it wont install the binary */
import shell from 'shelljs'
shell.exec('pnpm --filter=@snailicide/g-library docs:serve')
export {}
