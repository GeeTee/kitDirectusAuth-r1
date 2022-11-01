import u from '$lib/server/utils'
import r from '$lib/helpers/req'
import s from '$lib/helpers/scripts'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'
const protectedRoutes = u.protectedRoutes

// BUILDING NAV GENERALE
const navGeneraleLinksRaw = await r.getNavGenerale()
const navGeneraleLinks = s.builMenuArray(navGeneraleLinksRaw)

// BUILDING NAV METIERS
const navMetiersLinksRaw = await r.getNavMetiers()
const navMetiersLinks = s.builMenuArray(navMetiersLinksRaw, 'activites')

// BUILDING PROTECTED ROUTES
const metiersBackendUpdateLinks = s.builMenuArray(navMetiersLinksRaw, 'backend/activites/update')
const metiersBackendDeleteLinks = s.builMenuArray(navMetiersLinksRaw, 'backend/activites/delete')
metiersBackendUpdateLinks.forEach(element => {
    protectedRoutes.push(element.href)
});
metiersBackendDeleteLinks.forEach(element => {
    protectedRoutes.push(element.href)
});
// console.log('Hooks server js', {protectedRoutes})

function redirect(location, body) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

export const handle = async ({event, resolve}) => {
    // MENU METIERS
    event.locals.navMetiersLinks = {navMetiersLinks: [...navMetiersLinks]}
    event.locals.navGeneraleLinks = {navGeneraleLinks: [...navGeneraleLinks]}

    // AUTHENTICATION
    const refresh_token = event.cookies.get(DIRECTUS_COOKIE)

    const location = event.url.pathname
    // console.log('Hooks server js', {location})

    if (!refresh_token && protectedRoutes.includes(location)) { // NOT AUTHENTICATED && ON PROTECTED ROUTES
            console.log('Hooks server js PAS refresh_token - ON protectedRoutes', {location})
            return redirect('/login', 'pas bon')
        }

    if (refresh_token && location == '/login') { // NOT AUTHENTICATED && ON PROTECTED ROUTES
            console.log('Hooks server js PAS refresh_token - ON protectedRoutes', {location})
            return redirect('/logout', 'est déjà loggé')
        }

    return resolve(event);
}