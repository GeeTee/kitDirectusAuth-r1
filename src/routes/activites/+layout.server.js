import r from '$lib/helpers/req'
export const load = async ({fetch}) => {
    const items = await r.getAllArticles(fetch)
    return {
        props: {
            items
        }
    }
}