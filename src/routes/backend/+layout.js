export const load = async ({parent}) => {
    const {user} = await parent()
    // console.log('backend +page.js', user)

    return user
}