//https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0_1024x1024.jpg
import { describe, expect, test } from 'vitest'

import {
    isEncodedGID,
    isGID,
    isParsableToSID,
    isSID,
    shopifyMediaURL,
    toSID,
} from './index.js'
describe('shopify functions', () => {
    test('shopifyMediaURL', () => {
        const goodURL =
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0.jpg'
        const badURLNoExt =
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0'
        const invalidURL =
            'cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0.jpg'

        expect(shopifyMediaURL(badURLNoExt, 2024)).toBe(undefined)
        expect(shopifyMediaURL(invalidURL)).toBe(undefined)

        expect(shopifyMediaURL(goodURL, 1024, 2048)).toBe(
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0_1024x2048.jpg',
        )
        expect(shopifyMediaURL(goodURL, 1024)).toBe(
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0_1024.jpg',
        )

        //height set to zero
        expect(shopifyMediaURL(goodURL, 1024, 0)).toBe(
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0_1024x1024.jpg',
        )

        expect(shopifyMediaURL(goodURL)).toBe(
            'https://cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0.jpg',
        )

        //2342221512783
    })

    test('toGID', () => {
        expect(isGID('gid://shopify/Customer/12345')).toBe(true)
        expect(isSID('2342221512783')).toBe(true)

        expect(toSID('gid://shopify/Product/2342221512783')).toBe(2342221512783)
        expect(toSID('gid://shopify/Product/23422')).toBe(undefined)
        expect(toSID('gid://shopify/Product/23422', 4)).toBe(23422)
        expect(toSID('gid://shopify/Product/23422', 6)).toBe(undefined)

        expect(isEncodedGID('gid://shopify/Product/2342221512783')).toBe(false)
        expect(
            isEncodedGID('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIzNDIyMjE1MTI3ODM='),
        ).toBe(true)

        expect(isGID('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIzNDIyMjE1MTI3ODM=')).toBe(
            true,
        )
        expect(toSID('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIzNDIyMjE1MTI3ODM=')).toBe(
            2342221512783,
        )

        expect(
            isParsableToSID('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIzNDIyMjE1MTI3ODM='),
        ).toBe(true)
        expect(isParsableToSID('gid://shopify/Product/2342221512783')).toBe(
            true,
        )
        expect(isParsableToSID(2342221512783)).toBe(true)
        expect(isParsableToSID(23422)).toBe(false)
        expect(isParsableToSID(23422, 5)).toBe(true)
    })
})
export {}
