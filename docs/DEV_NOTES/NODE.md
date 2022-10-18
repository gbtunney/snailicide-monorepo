# Node Nodes (Filesystem)

-   Does file excist?

```ts
import fs from 'fs'
const filePathExcistBool = fs.existsSync('package.json')
```

-   Get file content

```ts
import fs from 'fs'
const getFileContent = fs.readFileSync('package.json', {
    encoding: 'utf8',
    flag: 'r',
})
```
