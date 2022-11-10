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

    // console.log('ROOT +layout.server.js REACTION', {gt_token}, {refresh_token})

    if (refresh_token && !gt_token) { // CASE A
        // console.log('ROOT +layout.server.js refresh_tocken // CASE A', refresh_token)
        const res = await r.directusRefresh(refresh_token)
        // console.log('ROOT +layout.server.js refresh_tocken // CASE A', {res})
        if (res?.message == 'refreshed token ok') {
            // console.log('ROOT +layout.server.js refresh_tocken // CASE A', {data})
            const nRT = res?.credentials?.refresh_token // newRefreshToken
            const access_token = res?.credentials?.access_token
            const expires = res?.credentials?.expires
            // console.log('ROOT +layout.server.js compare refresh_tocken // CASE A', refresh_token === nRT)

            if ((refresh_token === nRT) === false) {
                // console.log('ROOT +layout.server.js NOUVEAU refresh_tocken // CASE A')
                await cookies.delete(DIRECTUS_COOKIE)
                cookies.set(DIRECTUS_COOKIE, nRT, {
                    maxAge: expires,
                    path: '/'
                });
            }

            const connectedUser = await r.directusCurrentUser(access_token)
            user = {
                isAuthenticated: true,
                first_name: connectedUser.first_name,
                last_name: connectedUser.last_name,
                email: connectedUser.email,
                access_token
            }

            // console.log('ROOT +layout.server.js refresh_tocken (previous login) // CASE A', {user})

            return {
            user,
            settings,
            navGeneraleLinks,
            navMetiersLinks
            }
        }
        // pas data
        if (res?.message == 'Invalid user credentials.') { // ex on reload // CASE A BIS
            // console.log('// CASE A BIS')
            await cookies.delete(DIRECTUS_COOKIE)
            throw redirect(307, '/login/?reason=1')          
        }
    }


    if (gt_token) { // CASE B gt_token === access_token
            const connectedUser = await r.directusCurrentUser(gt_token)
            user = {
                isAuthenticated: true,
                first_name: connectedUser.first_name,
                last_name: connectedUser.last_name,
                email: connectedUser.email,
                access_token: gt_token
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