import { describe, expect, test } from 'vitest'
import {
    getValidIPAddress,
    getValidUrl,
    IPAddress,
    isValidIpAddress,
    isValidUrl,
    URL,
    URLDomainExtention,
    URLScheme,
} from './validators.js'
import { isNotUndefined } from '../typeguard/utility.typeguards.js'

describe('Image Base64 Encoding', () => {
    test('get valid url', () => {
        const testDomain: URLDomainExtention = 'net'
        const testScheme: URLScheme = 'https'
        // @ts-expect-error: "should error, bad type
        const testDomain2: URLDomainExtention = 'https'

        expect(getValidUrl('ftp://tjkjkuktps.google.com')).toBeDefined()
        expect(getValidUrl('httttt://tjkjkuktps.google.com')).toBeUndefined()
        expect(getValidUrl('http://google')).toBeUndefined()
        expect(getValidUrl('http://.www.foo.bar./')).toBeUndefined()
        expect(getValidUrl('http://google.com')).toBeDefined()

        expect(getValidUrl('http://192.168.1.1')).toBeUndefined()

        expect(getValidUrl('google')).toBeUndefined()
        expect(isValidUrl('http://google.com', 'https')).toBe(false)
        expect(isValidUrl('google.com', 'https')).toBe(true)
        expect(isValidUrl('https://google.com', ['ftp', 'https'], false)).toBe(
            true,
        )
        expect(isValidUrl('https://google.com', 'https', false)).toBe(true)

        expect(
            isValidUrl(
                'cdn.shopify.com/s/files/1/0155/0473/products/OSBarnOwl_8cc931c0-f15f-414b-9a38-93160f766dd0.jpg',
            ),
        ).toBe(true)
        expect(
            getValidUrl(
                'https://mailchimp.com/resources/parts-of-a-url/?igaag=154664726859&igaat=&igacm=20637339549&igacr=687230856184&igakw=&igamt=&igant=g&ds_c=DEPT_AOC_Google_Search_US_EN_NB_Acquire_Broad_DSA-Rsrc_US&ds_kids=p78250621731&ds_a_lid=aud-1530365438563:dsa-2227026702184&ds_cid=71700000115207178&ds_agid=58700008574686663&gad_source=1&gbraid=0AAAAADh1Fp3O_uqqer5UZTLyrsKewLSCV&gclid=Cj0KCQjww5u2BhDeARIsALBuLnOWhXdbFIZxiCzscHQJHVpEeRjX2Uvpl3IPNtfY6INzSEaFVcPYVUAaAj03EALw_wcB&gclsrc=aw.ds',
            ),
        ).toBeDefined()
        const _url = getValidUrl('http://yahoo.com')
        if (isNotUndefined<URL>(_url)) {
            const __url: URL = _url
        }
        // @ts-expect-error: should throw error, directly assigning to URL
        const _test: URL = 'http://yahoo.com'
    })

    test('get valid ip address', () => {
        const _ip = getValidIPAddress('http://192.168.1.1')
        if (isNotUndefined<IPAddress>(_ip)) {
            const __ip: IPAddress = _ip
        }
        // @ts-expect-error: should throw error, directly assigning to IP
        const _test: IPAddress = 'http://192.168.1.1'

        expect(getValidIPAddress('http://192.168.1.1')).toBeDefined()
        expect(isValidIpAddress('http://192.168.1.1')).toBe(true)
        expect(isValidIpAddress('192.168.1.1')).toBe(true)
        expect(isValidIpAddress('http://192.167678.1.1')).toBe(false)
        expect(
            isValidIpAddress('http://192.168.1.1', ['ftp', 'https'], false),
        ).toBe(false)
    })
})
