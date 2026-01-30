import { z } from 'zod'
const shopify_settings_schema_map = {
    /*
     * Article Picker
     * @return "article object" | "blank" */
    article: z.object({
        type: z.literal('article'),
    }),
    /* * Blog Picker *
     * @return "blog object" | "blank" */
    blog: z.object({
        type: z.literal('blog'),
    }),
    /* * Collection Picker *
     * @return "collection object" | "blank" */
    collection: z.object({
        type: z.literal('collection'),
    }),
    /* * Collection List  *
     * @return "Array<collection object>" | "blank" */
    collection_list: z.object({
        type: z.literal('collection_list'), //extends list
    }),
    /* * Image Picker Type *
     * automatically populated with the available images from the Files section of Shopify admin,
     * Has the option to upload new images.
     * SVG IS NOT ALLOWED! , favicons are ? .ico???
     * @return  'image object' | nil  */
    image_picker: z.object({
        type: z.literal('image_picker'),
    }),

    /* * Linked List *
     * ID is the identifier
     * @see https://shopify.dev/api/liquid/objects/linklist
     * A setting of type link_list outputs a menu picker field that's automatically populated with the available menus for the store.
     * You can use these fields to capture a menu selection, such as the menu to use for footer links.
     * @return 'linklist object' or 'blank' */
    link_list: z.object({
        type: z.literal('link_list'),
    }),
    /* * Liquid Type *
     * Can access :
     * - Global Liquid objects
     * - Template specific objects like collection, product, etc. (within their respective templates)
     * - Standard Liquid tags and filters
     * @see https://shopify.dev/themes/architecture/settings/input-settings FOR LIMITATIONS ( there are alot@! ) */
    liquid: z.object({
        type: z.literal('liquid'),
    }),
    /* * Page Picker *
     * @return "page object" | "blank" (different return than similar types??) */
    page: z.object({
        type: z.literal('page'),
    }),
    /* * Product Picker *
     * * @return "product" | "blank" (different return than similar types??) */
    product: z.object({
        type: z.literal('product'),
    }),
    /* * Product List Picker *
     * * @return "Array<product>" | "blank" (different return than similar types??) */
    product_list: z.object({
        //extends list
        type: z.literal('product_list'),
    }),
}
export const ShopifySettings = shopify_settings_schema_map
export type ShopifySettingType = keyof typeof shopify_settings_schema_map

export default ShopifySettings
