import u from '$lib/server/utils'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'
const protectedRoutes = u.protectedRoutes

function redirect(location, body) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

export const handle = async ({event, resolve}) => {
    
    const refresh_token = event.cookies.get(DIRECTUS_COOKIE)
    // const email = event.url.searchParams.get('m')
    const location = event.routeId
    // console.log('Hooks server js EVENT', event)
    // console.log('Hooks server js', {refresh_token}, {location})

    if (!refresh_token && protectedRoutes.includes(location)) { // NOT AUTHENTICATED && ON PROTECTED ROUTES
            console.log('Hooks server js PAS refresh_token - ON protectedRoutes', {location})
            return redirect('/login', 'pas bon')
        }

    return resolve(event);
}