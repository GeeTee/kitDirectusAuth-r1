import { redirect } from '@sveltejs/kit'
import r from '$lib/helpers/req'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'

let user = {}

// $: checkU = Object.keys(user).length

export const load = async ({ fetch, cookies, locals }) => {

    const settings = await r.getSettings(fetch)
    const {navGeneraleLinks} = locals.navGeneraleLinks
    const {navMetiersLinks} = locals.navMetiersLinks

    const gt_token = cookies.get('gt')
    const refresh_token = cookies.get(DIRECTUS_COOKIE)

    console.log('ROOT +layout.server.js REACTION', {gt_token}, {refresh_token})

    if (refresh_token && !gt_token) { // CASE A
        console.log('ROOT +layout.server.js refresh_tocken // CASE A', refresh_token)
        const data = await r.directusRefresh(refresh_token)
        if (data) {
            console.log('ROOT +layout.server.js refresh_tocken // CASE A', {data})
            const nRT = data.refresh_token
            const {access_token} = data
            console.log('ROOT +layout.server.js compare refresh_tocken // CASE A', refresh_token === nRT)
            user = {
                isAuthenticated: true,
                ...await r.directusCurrentUser(access_token)
            }

            console.log('ROOT +layout.server.js refresh_tocken (previous login) // CASE A', {user})

            return {
            user,
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }
        }
        // pas data
        if (!data) { // ex on reload // CASE A BIS
            console.log('// CASE A BIS')
            await cookies.delete(DIRECTUS_COOKIE)
            throw redirect(307, '/login/?reason=1')          
        }
    }


    if (gt_token) { // CASE B
            user = {
                isAuthenticated: true,
                ...await r.directusCurrentUser(gt_token)
            }
            console.log('ROOT +layout.server.js gt_tocken (new login) // CASE B', {user})
            cookies.delete('gt')

            return {
            user,
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }
        }

    // console.log('ROOT +layout.server.js +++++ checkU', Object.keys(user).length)

    return {
    settings,
    navGeneraleLinks,
    navMetiersLinks
    }

}