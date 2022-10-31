import r from '$lib/helpers/req'
export const load = async () => {
    const items = await r.getAllArticles()
    return {
        props: {
            items
        }
    }
}