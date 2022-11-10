import r from '$lib/helpers/req'
import f from '$lib/helpers/scripts'
import {DIRECTUS_COOKIE} from '$lib/helpers/Env'
// import {directus} from '$lib/helpers/directus'
// const settings = directus.items('website_settings')
let userC = {}

export const load = async ({parent}) => {
    const {user} = await parent()
    userC = {...user}
}

export const actions = {
    logoDelete: async ({request}) => {
       let error = ''
        const data = await request.formData()
        let logoToDelete = data.get('logoToDelete')
        const obj ={logo: null}

        console.log('BACKEND lOGODELETE +page.server.js', {logoToDelete}, {obj})

        const {access_token} = userC

        const res = await r.updateSettings(access_token, obj)

        if (res?.message == 'Token expired') {
            // console.log('BACKEND SETTINGS +page.server.js REFRESH')
            // const refresh_token = cookies.get(DIRECTUS_COOKIE)
            // const res = await r.directusRefresh(refresh_token)
        }
        if (res?.message == 'settings ok') {
            // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
        }

        f.deleteOneImg(f.slashToUnderscore(logoToDelete))

        return {done: 'deleted'}
    },
    logoSettings: async ({request}) => {
       let error = ''
        const data = await request.formData()
        let logo = data.get('logo')
        if (logo === '') logo = null
        const obj = {logo}
        console.log('BACKEND lOGOSETTINGS +page.server.js', {obj})

        const {access_token} = userC

        const res = await r.updateSettings(access_token, obj)

        if (res?.message == 'Token expired') {
            // console.log('BACKEND SETTINGS +page.server.js REFRESH')
            // const refresh_token = cookies.get(DIRECTUS_COOKIE)
            // const res = await r.directusRefresh(refresh_token)
        }
        if (res?.message == 'settings ok') {
            // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
        }

        return {done: 'ok'}
    },
    projectSettings: async ({cookies,request}) => {
        let error = ''
        const data = await request.formData()
        let site_name = data.get('site_name')
        let logo = data.get('logo')
        if (logo === '') logo = null
        const obj = {site_name}
        console.log('BACKEND PROJECTSETTINGS +page.server.js', {obj})

        // const {user} = await parent()

        // console.log('BACKEND SETTINGS +page.server.js', {userC})

        const {access_token} = userC

        const res = await r.updateSettings(access_token, obj)
        // console.log('BACKEND SETTINGS +page.server.js', {res})

        if (res?.message == 'Token expired') {
            // console.log('BACKEND SETTINGS +page.server.js REFRESH')
            // const refresh_token = cookies.get(DIRECTUS_COOKIE)
            // const res = await r.directusRefresh(refresh_token)
        }
        if (res?.message == 'settings ok') {
            // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
        }
        
    }
}