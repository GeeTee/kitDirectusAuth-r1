import { redirect } from '@sveltejs/kit';
import r from '$lib/helpers/req'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'
// import {directus} from '$lib/helpers/directus'

export const actions = {
    default: async ({cookies,request}) => {
        // console.log('LOGOUT page clic!')
        const refresh_token = await cookies.get(DIRECTUS_COOKIE)
        
        const res = await r.directusLogout(refresh_token)

        // await cookies.delete('directus_refresh_token')
        // console.log('LOGOUT +page.server.js', res)
        if (res?.message == 'Logged Out') {
            await cookies.delete(DIRECTUS_COOKIE)
            throw redirect(303, '/')
        }

    }
}