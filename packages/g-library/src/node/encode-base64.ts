import type { Tagged } from 'type-fest'
import fs from 'fs'
import path from 'path'

export type ImageMimeType = 'jpeg' | 'png' | 'gif' | 'svg' | 'bmp'

//todo: finish this type
type Base64 = Tagged<string, 'base64'>

export const getImageExtensionLiteral = (value: string): ImageMimeType => {
    if (value === 'jpeg') return 'jpeg'
    else if (value === 'gif') return 'gif'
    else if (value === 'svg') return 'svg'
    else if (value === 'bmp') return 'bmp'
    else {
        console.warn(
            'Warning:: ',
            value,
            'is not appropriate extension for base64 image encoding, using png',
        )
        return 'png'
    }
}

export const getImageBase64 = (
    file_path: string,
    mime_type: ImageMimeType = 'png',
): string => {
    const encoding = `data:image/${
        mime_type === 'svg' ? 'svg+xml' : mime_type
    };base64,`
    const resolvedPath = path.resolve(file_path)
    if (fs.existsSync(resolvedPath)) {
        const contents = fs.readFileSync(resolvedPath, 'base64')
        return `${encoding}${contents}`
    } else {
        console.error(
            'Error! base64 encoding fail :',
            resolvedPath,
            'does not excist',
        )
        return 'undefined'
    }
}
//JPG, PNG, GIF, WebP, SVG or BMP.image/gif image/svg+xml image/bmp  image/gif
