import {directus} from '$lib/helpers/directus'
const settings = directus.items('website_settings')

export const actions = {
    projectSettings: async ({request}) => {
        const data = await request.formData()
        const site_name = data.get('site_name')
        const logo = data.get('logo')
        console.log('BACKEND SETTINGS +page.server.js', {site_name}, {logo})
        const test = await settings.readByQuery({});
        // console.log('BACKEND SETTINGS +page.server.js', {test})
    }
}