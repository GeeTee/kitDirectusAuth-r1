import {directus} from '$lib/helpers/directus'
const settings = directus.items('website_settings')

export const actions = {
    projectSettings: async ({request}) => {
        const data = await request.formData()
        const site_name = data.get('site_name')
        const logo = data.get('logo')
        console.log('BACKEND SETTINGS +page.server.js', {site_name}, {logo})
        const res = await settings.updateOne(1,{site_name, logo});
        console.log('BACKEND SETTINGS +page.server.js', {res})
    }
}