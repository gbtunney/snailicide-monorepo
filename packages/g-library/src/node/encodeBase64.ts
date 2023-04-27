import fs from 'fs'
import path from 'path'

export const getImageBase64 = (
    file_path: string,
    mime_type: 'jpeg' | 'png' | 'gif' | 'svg' | 'bmp' = 'png'
): string => {
    const encoding = `data:image/${
        mime_type === 'svg' ? 'svg+xml' : mime_type
    };base64,`
    const resolvedPath = path.resolve(file_path)
    console.log('PATH ', resolvedPath, fs.existsSync(resolvedPath))
    if (fs.existsSync(resolvedPath)) {
        const contents = fs.readFileSync(resolvedPath, 'base64')
        return `${encoding}${contents}`
        // console.log(`data:image/png;base64,${contents}`)
    } else {
        console.error(
            'Error! base64 encoding fail :',
            resolvedPath,
            'as ',
            mime_type
        )
        return 'undefined'
    }
}
//JPG, PNG, GIF, WebP, SVG or BMP.image/gif image/svg+xml image/bmp  image/gif
