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
    logoSettings: async ({request}) => {
       let error = ''
        const data = await request.formData()
        let action = data.get('action')
        let logoToDelete = data.get('logoToDelete')
        let logoBup = data.get('logoBup')
        let logo = data.get('logo')
        if (logo === '') logo = null
        const obj = {logo}
        // console.log('BACKEND lOGOSETTINGS +page.server.js', {action}, {obj})

        const {access_token} = userC
        let res

        //FIXME: logo !logoBup

        if (action == 'do') {
            console.log('BACKEND lOGOSETTINGS +page.server.js', {action}, {logo}, {logoBup}, {logoToDelete}, {obj})
            if (!logo && logoToDelete) {
                console.log('DO DELETE \n détruire logoTodelete de cld et update obj où logo: null', {obj}, {logoToDelete})
                res = await r.updateSettings(access_token, obj)
                if (res?.message == 'settings ok') {
                    // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
                    f.deleteOneImg(f.slashToUnderscore(logoToDelete))
                }
            }

            if (logo && !logoBup) {
                console.log('DO ADD NEW \n ajouter logo à bdd il est déjà dans cld', {logo}, {obj})
                res = await r.updateSettings(access_token, obj)
            }

            if ( logo && logoBup && logo !== logoBup && logo !== logoToDelete && logoBup === logoToDelete) {
                console.log('DO CHANGER \n ajouter new logo à bdd il est déjà dans cld et détruire logoBup (acien logo)', {logo}, {logoToDelete}, {logoBup}, {obj})
                res = await r.updateSettings(access_token, obj)
                if (res?.message == 'settings ok') {
                    // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
                    f.deleteOneImg(f.slashToUnderscore(logoToDelete))
                }
            }
        } 

        if (action == 'cancel') {
                console.log('BACKEND lOGOSETTINGS +page.server.js', {action}, {logo}, {logoBup}, {logoToDelete})
                if (!logo && logoToDelete && !logoBup) {
                    console.log('CANCEL ADD \n le new logo doit être détruit de cld il a été attribué à logoToDelete, rien à faire sur db car tout nouveau logo')
                    f.deleteOneImg(f.slashToUnderscore(logoToDelete))
                }

                if (logo && logoBup && logoToDelete && logo === logoBup) {
                    console.log('CANCEL CHANGER \n rien à faire en bdd, logoToDelete est le new logo')
                    f.deleteOneImg(f.slashToUnderscore(logoToDelete))
                }
        }



        //FIXME: logo bup
        
        //TODO:
        // f.deleteOneImg(f.slashToUnderscore(logoToDelete))
        // const res = await r.updateSettings(access_token, obj)

        // if (res?.message == 'Token expired') {
        //     // console.log('BACKEND SETTINGS +page.server.js REFRESH')
        //     // const refresh_token = cookies.get(DIRECTUS_COOKIE)
        //     // const res = await r.directusRefresh(refresh_token)
        // }
        // if (res?.message == 'settings ok') {
        //     // console.log('BACKEND SETTINGS +page.server.js SETTINGS OK')
        //     f.deleteOneImg(f.slashToUnderscore(logoToDelete))
        // }


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