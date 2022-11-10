import { redirect } from '@sveltejs/kit';
import r from '$lib/helpers/req'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'
import {customResponse} from '$lib/helpers/authentication'

export const actions = {
    // @ts-ignore
    default: async ({cookies,request, locals}) => {
            const data = await request.formData()
            const email = await data.get('email')
            const password = await data.get('password')

            // console.log('LOGIN page.server.js', {email}, {password})

            if (cookies.get(DIRECTUS_COOKIE)) {
                console.log(('LOGIN +page.server.js il y a DIRECTUS_COOKIE'))
                await cookies.delete(DIRECTUS_COOKIE)
                console.log(('LOGIN +page.server.js DIRECTUS_COOKIE deleted'))
            }

            console.log(('LOGIN +page.server.js email && password'))

            const res = await r.directusLogin(email, password)

            // console.log('LOGIN  +page.server.js email && password', res)

            if (!res) {
                // console.log(('email && password CONNEXION REFUSEE'))
                return customResponse(400, false, 'CONNEXION REFUSEE')
            }

            
            const {refresh_token, access_token, expires} = res
            // console.log('LOGIN +page.server.js', {refresh_token})
            
            await cookies.set(DIRECTUS_COOKIE, refresh_token, {
                maxAge: expires,
                path: '/'
            });

            await cookies.set('gt', access_token, {
                maxAge: expires,
                path: '/'
            });

            // return { success: true }

            throw redirect(303, `/backend`)
    }
}
