import r from '$lib/helpers/req'
export const load = async ({fetch, params}) => {
    const {slug} = params
    const item = await r.getArticleBySlug(fetch, slug)
    // console.log('ACTIVITES Slug +page.server.js', {slug}, {item})
    // console.log('ACTIVITES Slug +page.server.js', slug, item)
    return {
        item
    }
}