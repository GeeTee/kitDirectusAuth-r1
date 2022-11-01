import r from '$lib/helpers/req'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'

let user

export const load = async ({ cookies, locals }) => {

    const settings = await r.getSettings()
    const {navGeneraleLinks} = locals.navGeneraleLinks
    const {navMetiersLinks} = locals.navMetiersLinks

    const refresh_token = cookies.get(DIRECTUS_COOKIE)
    if (!refresh_token) {
        // console.log('+layout.server.js load pas de cookie')
        user = {}
    }
    if (refresh_token) {
        // console.log('+layout.server.js load on a cookie')
        const {data} = await r.directusRefresh(refresh_token)
        console.log('+layout.server.js ON A access_token step 1', data)
        const access_tocken = data.access_token
        // console.log('+layout.server.js ON A access_token step 2', {access_tocken})
        const newRefresh_tocken = data.refresh_token
        // console.log('+layout.server.js ON A newRefresh_tocken step 3', {newRefresh_tocken})
        const expires = data.expires
        // console.log('+layout.server.js ON A expires step 4', {expires})
        // RENEW COOKIE
        await cookies.delete(DIRECTUS_COOKIE)
        cookies.set(DIRECTUS_COOKIE, newRefresh_tocken, {
            maxAge: expires
        })
        user = {
            isAuthenticated: true,
            ...await r.directusCurrentUser(access_tocken)
        }
    }
    return {
        user,
        settings,
        navGeneraleLinks,
        navMetiersLinks
    };
}