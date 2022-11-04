export const load = async ({parent}) => {
    const {settings} = await parent()
    // console.log('BACKEND SETTINGS +page.js', {settings})
    return settings
}