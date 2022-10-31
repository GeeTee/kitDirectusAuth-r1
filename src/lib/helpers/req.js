import {DIRECTUS_URL, PROJECT_TITLE, PROJECT_ID} from './Env'
const url = DIRECTUS_URL

const getAllArticles = async () => {
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query {
                    advanced_articles {
                        id
                        title
                        slug 
                        cld_public_id
                        blocks
                        gallery_photos
                        gallery_videos
                        main_text
                        connected_to_page {
                            slug
                        }
                    }
                }
            `
        })
    })

    const {data: {advanced_articles}} = await res.json()
    const items = advanced_articles
    // console.log('req getAllArticles', {items})
    return items
}

const getArticleBySlug = async (fetch,slug) => {
    if (typeof slug !== 'string') return
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query ($slug: String) {
                    advanced_articles (filter: {connected_to_page: {slug: {_eq: $slug}}})  {
                        title
                        slug 
                        cld_public_id
                        blocks
                        gallery_photos
                        gallery_videos
                        main_text
                    }
                }
            `,
            variables : {
                slug,
            }
        })
    })

    // const {data} = await res.json()
    // console.log('req getArticleBySlug', {data})

    const {data: {advanced_articles}} = await res.json()
    const item = advanced_articles[0]
    // console.log('req getArticleBySlug', {item})
    return item
}

const getAllArticlesLinks = async () => {
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query ($title: String) {
                    advanced_articles (filter: {project: {project_title: {_eq: $title}}}) {
                        id
                        title
                        slug 
                    }
                }
            `,
            variables: {
                title: PROJECT_TITLE
            }
        })
    })

    const {data: {advanced_articles}} = await res.json()
    const items = advanced_articles
    // console.log('req getAllArticlesLinks', {items})
    return items
}

const getAllTest = async () => {
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query {
                    test {
                        id
                        title
                        slug
                        redaction
                        cld_public_id
                        gallery_photos
                    }
                }
            `
        })
    })

    const {data: {test}} = await res.json()
    // console.log('req getAllTest', {test})
    return test
}

const getTestSlug = async (slug) => {
    if (typeof slug !== 'string') return
    // console.log('req getTestSlug', {slug})
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query ($slug: String) {
                    test (filter: {slug: {_eq: $slug}}) {
                        title
                        redaction
                        cld_public_id
                    }
                }
            `,
            variables: {
                slug
            }
        })
    })

    const {data: {test}} = await res.json()
    const item = test[0]
    // console.log('req getTestSlug', {item})
    return item    
}

const getNavGenerale = async () => {
    // console.log('getNavGenerale')
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query {
                    menu_general {
                        title
                        slug
                        beAuthenticated
                    }
                }
            `
        })
    })

    const {data: {menu_general}} = await res.json()
    const items = [...menu_general]
    // console.log('Req getNavGenerale', {items})
    return items
}

const getNavMetiers = async () => {
    // console.log('getNavMetiers')
    const res = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query {
                    menu_metiers {
                        title
                        slug
                        beAuthenticated
                    }
                }
            `
        })
    })

    const {data: {menu_metiers}} = await res.json()
    const items = [...menu_metiers]
    // console.log('Req getNavMetiers', {items})
    return items
}

// DIRECTUS AUTH LOGIN LOGOUT

const directusLogin = async (email, password) => {
    console.log('directusLogin 0', typeof email, typeof password)
    if (typeof email !== 'string') return
    if (typeof password !== 'string') return
    console.log('directusLogin 1', email, password)
    const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
            })
    })

    const {data} = await res.json()
    console.log('Req directusLogin', {data})
    return data
}

const directusLogout = async (refresh_token) => {
    // console.log('directusLogout 0', typeof refresh_token)
    if (typeof refresh_token !== 'string') return

    const res = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                refresh_token
            })
    })

    // const {data} = await res.json()
    // console.log('Req directusLogout', {data})
    // const {data: {auth_login}} = await res.json()
    // console.log('Req directusLogout', {data})
    return {message: 'Logged Out'}
}

const directusRefresh = async (refresh_token) => {
    // console.log('Req directusRefresh step 0', typeof refresh_token)
    if (typeof refresh_token !== 'string') return
    // console.log('Req directusRefresh step 1', {refresh_token})
    const res = await fetch(`${url}/auth/refresh`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                refresh_token,
                "mode": "json"
            })
    })

    const {data} = await res.json()
    // console.log('Req directusRefresh setp 3', {data})
    return {data}
}

const directusCurrentUser = async (access_token) => {
    if (typeof access_token !== 'string') return
    // console.log('Req directusCurrentUser step 0')
    const res = await fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + access_token
        }
    })

    const {data} = await res.json()
    // console.log('Req directusCurrentUser step 1', data)
    return data
}

const directusUserByEmail = async (email) => {
    // console.log('directusUserByEmail 0', typeof email)
    if (typeof email !== 'string') return
    const res = await fetch(`${url}/graphql/system`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query ($email: String) {
                    users(filter: { email: { _eq: $email } }) {
                        first_name
                        last_name
                        email
                    }
                }
            `,
            variables: {email}
        })
    })

    // const {data: {users_me}} = await res.json()
    // console.log('getCurrentUser', {users_me})
    const {data: {users}} = await res.json()
    // console.log('directusUserByEmail', users[0])
    return users[0]
}

// WEBSITE SETTINGS
const getSettings = async () => {
    const res = await fetch(`${url}/graphql`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
            query {
                website_settings {
                id
                main_color_1
                main_color_2 
                main_color_3
                bg_banner
                bg_color  
                hover_link_color 
                hover_bg_link_color
                site_name
                domain_name
                logo
                full_name
                job
                avatar
                speech_about
                company_name
                commercial_name
                address_1 
                address_2 
                code_postal 
                town 
                country 
                tel_fixe
                tel_fax
                tel_mobile 
                email
                speech_company
                map_company
                zoom_global
                zoom_zoom
                centrage_largeur_articles
                nombre_resume_article_par_niveau
                footer_pleine_largeur
                meta_description
                mots_cles
                }
            }
            `
        })
    })

    const {data: {website_settings}} = await res.json()

    // console.log('Req getSettings', {website_settings})

    return website_settings
}

const reqServices = {
    getNavGenerale,
    getNavMetiers,
    getArticleBySlug,
    getAllArticlesLinks,
    getAllArticles,
    getAllTest,
    getTestSlug,
    getSettings,
    directusLogin,
    directusCurrentUser,
    directusUserByEmail,
    directusRefresh,
    directusLogout,
}

export default reqServices