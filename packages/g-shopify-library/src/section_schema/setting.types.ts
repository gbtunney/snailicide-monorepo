import type { Simplify, StringKeyOf } from 'type-fest'

export namespace SettingTypes {
    type _List = {
        //collection and product list
        limit?: number
    }
    type _TSelectOption = {
        value: string
        label: string // is label required idk?
    }
    type _Text = {
        default?: string
        placeholder?: string
    }
    export type Text = Simplify<
        _Text & {
            type: 'text'
        }
    >
    export type TextArea = Simplify<
        _Text & {
            type: 'textarea'
        }
    >
    export type Number = {
        type: 'number'
        default?: number
        placeholder?: number
    }
    export type Checkbox = {
        type: 'checkbox'
        default?: boolean //default is false
    }
    export type Radio = {
        type: 'radio'
        options: Array<_TSelectOption>
        default?: string //If default is unspecified, then the first option is selected by default.
    }
    export type Select = Omit<Radio, 'type'> & {
        type: 'select'
        group?: string /// no other info providewd
    }
    export type Range = {
        type: 'range'
        default: number //!!! NOTE ! REQUIRED HERE
        min: number
        max: number
        step: number
        unit: string // "example px",
    }

    /* * Color Picker  *
     * * @return "color object" | "blank" */
    export type Color = {
        type: 'color'
        default?: string //in hex code string format "#000000"
    }

    /* * Gradient Picker
     * Color Background aka Gradient  *
     * @return string | "blank" */
    export type ColorBackground = {
        type: 'color_background'
        default?: string // example: "linear-gradient(#ffffff, #000000)"
    }
    export type Gradient = ColorBackground

    /* * Font Picker - From Shopify Font Library *
     * @see https://shopify.dev/themes/architecture/settings/fonts#shopify-font-library
     * cant add custom fonts. -- it says you can use typekit but i dont know if it can populate this selector. ???
     * @return font object
     * default is NOT allowed.
     *  */
    export type FontPicker = {
        type: 'font_picker'
        default: string ///NOTE: THIS IS REQUIRED!!!  example "helvetica_n4"
    }

    /* * HTML Type *
     * @values Not allowed: html | head | body
     * @return string |  EmptyDrop */
    export type HTML = {
        type: 'html'
        default?: HTMLElement ///dont know if default , dont know if html elemenbt type will work
        placeholder?: HTMLElement
    }

    /* * Rich Text  *
     * Supported Tags: p | br | strong | b | em | i | u | span
     * * * @return string | "EmptyDrop"  */
    export type RichText = {
        type: 'richtext'
        default?: string //default must be wrapped in <p></p>
    }

    /* * URL Picker  *
     * manually enter external URLs and relative paths and
     * Picker for Articles | Blogs | Collections | Pages | Products
     * @return string | nil
     * NOTE: ( IDK WHY ONLY COLLECTIONS? )
     * - Accepted values for the default attribute are /collections and /collections/all.  */
    export type URL = {
        type: 'url'
        default?: string //Accepted values are /collections and /collections/all IDK???
    }

    /* * VideoURL
     * Accept: Takes an array of accepted video providers. Valid values are youtube, vimeo, or both.*
     * @return string ( entered url ) | nil */
    export type VideoURL = {
        type: 'video_url'
        placeholder?: string
        accept: ['youtube'] | ['vimeo'] | ['youtube', 'vimeo']
    }

    /* * Article Picker *
     * * @return "article object" | "blank" */
    export type Article = {
        type: 'article'
    }
    /* * Blog Picker *
     * @return "blog object" | "blank" */
    export type Blog = {
        type: 'blog'
    }
    /* * Collection Picker *
     * @return "collection object" | "blank" */
    export type Collection = {
        type: 'collection'
    }
    /* * Collection List  *
     * @return "Array<collection object>" | "blank" */
    export type CollectionList = Simplify<
        _List & {
            type: 'collection_list'
        }
    >
    /* * Image Picker Type *
     * automatically populated with the available images from the Files section of Shopify admin,
     * Has the option to upload new images.
     * SVG IS NOT ALLOWED! , favicons are ? .ico???
     * @return  'image object' | nil  */
    export type ImagePicker = {
        type: 'image_picker'
    }

    /* * Linked List *
     * ID is the identifier
     * @see https://shopify.dev/api/liquid/objects/linklist
     * A setting of type link_list outputs a menu picker field that's automatically populated with the available menus for the store.
     * You can use these fields to capture a menu selection, such as the menu to use for footer links.
     * @return 'linklist object' or 'blank' */
    export type LinkList = {
        type: 'link_list'
    }

    /* * Liquid Type *
     * Can access :
     * - Global Liquid objects
     * - Template specific objects like collection, product, etc. (within their respective templates)
     * - Standard Liquid tags and filters
     * @see https://shopify.dev/themes/architecture/settings/input-settings FOR LIMITATIONS ( there are alot@! ) */
    export type Liquid = {
        type: 'liquid'
        default?: string
    }

    /* * Page Picker *
     * @return "page object" | "blank" (different return than similar types??) */
    export type Page = {
        type: 'page'
    }
    /* * Product Picker *
     * * @return "product" | "blank" (different return than similar types??) */
    export type Product = {
        type: 'product'
    }

    /* * Product List Picker *
     * * @return "Array<product>" | "blank" (different return than similar types??) */
    export type ProductList = Simplify<
        _List & {
            type: 'product_list'
        }
    >

    export type SidebarHeader = {
        type: 'header'
        content: string
    }
    export type SidebarParagraph = {
        type: 'paragraph'
        content: string
    }

    export type ThemeInfo = {
        name: 'theme_info'
        theme_name: string
        theme_version: string //should be semver eventually
        theme_author: string
        theme_documentation_url?: string
        theme_support_url?: string
    }

    export type BasicSettingTypes = {
        /* * Basic Setting Input Types * */
        text: Text
        textarea: TextArea
        number: Number
        checkbox: Checkbox
        radio: Radio
        range: Range
        select: Select
    }

    /* * Specialized Setting Input Types * */
    export type SpecializedSettingTypes = {
        color: Color
        color_background: ColorBackground
        gradient: ColorBackground
        font_picker: FontPicker
        html: HTML
        richtext: RichText
        url: URL
        video_url: VideoURL
    }

    export type ShopifySettingTypes = {
        /* * Shopify Setting Input Types * */
        article: Article
        blog: Blog
        collection: Collection
        collection_list: CollectionList
        image_picker: ImagePicker
        link_list: LinkList
        liquid: Liquid
        page: Page
        product: Product
        product_list: ProductList
    }

    /* * Sidebar Settings * */
    export type SidebarSettingTypes = {
        header: SidebarHeader
        paragraph: SidebarParagraph
    }
    export type All = Simplify<
        BasicSettingTypes &
            SpecializedSettingTypes &
            ShopifySettingTypes &
            SidebarSettingTypes
    >

    export type Default<T extends SettingBase> = 'default' extends keyof T
        ? T['default']
        : undefined

    export type Union = Simplify<SettingTypes.All[keyof All]>
    type UnionValues = Simplify<SettingTypes.All[keyof All]>

    ///this is a list of the string types only  'text
    export type TypeLiterals = StringKeyOf<All>
    export type SettingBase<Type = TypeLiterals> = Type extends keyof All
        ? All[Type]
        : Type extends Union
          ? All[Type['type']]
          : never
}

export namespace Shared {
    export type ElementTags =
        | 'div'
        | 'article'
        | 'aside'
        | 'footer'
        | 'header'
        | 'section'

    export type PageTypes =
        | '404'
        | 'article'
        | 'blog'
        | 'cart'
        | 'collection'
        | 'list-collections'
        | 'customers/account'
        | 'customers/activate_account'
        | 'customers/addresses'
        | 'customers/login'
        | 'customers/order'
        | 'customers/register'
        | 'customers/reset_password'
        | 'gift_card'
        | 'index'
        | 'page'
        | 'password'
        | 'policy'
        | 'product'
        | 'search'

    export type SchemaBase = {
        name: string
        tag?: ElementTags
        class?: string
        limit?: number // section limit count
        templates?: Array<PageTypes>
    }
}
