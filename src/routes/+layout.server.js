import r from '$lib/helpers/req'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'

let user
let isAuthenticated = false

// $: console.log('ROOT +layout.server.js', u)
// u.deleteUser()




export const load = async ({ fetch, cookies, locals }) => {

    const settings = await r.getSettings(fetch)
    const {navGeneraleLinks} = locals.navGeneraleLinks
    const {navMetiersLinks} = locals.navMetiersLinks

    const gt_token = cookies.get('gt')
    const refresh_token = cookies.get(DIRECTUS_COOKIE)

    console.log('ROOT +layout.server.js REACTION', {gt_token}, {refresh_token})

    if (refresh_token && !gt_token) {
        console.log('ROOT +layout.server.js refresh_tocken', refresh_token)
        const data = await r.directusRefresh(refresh_token)
        if (data) {
            console.log('ROOT +layout.server.js refresh_tocken', {data})
            const nRT = data.refresh_token
            const {access_token, expires} = data
            console.log('ROOT +layout.server.js compare refresh_tocken', refresh_token === nRT)
            user = {
                isAuthenticated: true,
                ...await r.directusCurrentUser(access_token)
            }
            // if(refresh_token !== nRT) {
            //     async () => {
            //         await cookies.delete(DIRECTUS_COOKIE)
            //         cookies.set(DIRECTUS_COOKIE, nRT, {
            //             maxAge: expires
            //         });
            //     }
            // }
            console.log('ROOT +layout.server.js refresh_tocken (previous login)', {user})

            return {
            user,
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }
        }
        // pas data
        if (!data) {
            await cookies.delete(DIRECTUS_COOKIE)
            return {
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }            
        }
    }


    if (gt_token) {
            user = {
                isAuthenticated: true,
                ...await r.directusCurrentUser(gt_token)
            }
            console.log('ROOT +layout.server.js gt_tocken (new login)', {user})
            cookies.delete('gt')

            return {
            user,
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }
        }

    return {
    settings,
    navGeneraleLinks,
    navMetiersLinks
    }

}