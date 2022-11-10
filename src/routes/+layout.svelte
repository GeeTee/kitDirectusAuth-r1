<script>
    import { setContext, onMount } from 'svelte'
    import {BASE_URL} from '$lib/helpers/Env'

    export let data
    // console.log('layout.svelte', {data})

    // SVELTE COMPONENTS
    import Nav from '../lib/partials/navs/NavContainer.svelte'

    // VARIABLES
    let isAuthenticated = false
    let user = {}
    let settings = {}
    let navGeneraleLinks = []
    let navMetiersLinks = []

    if (data?.user) {
        isAuthenticated = data?.user?.isAuthenticated
        user = {
            isAuthenticated: data?.user?.isAuthenticated,
            first_name: data?.user?.first_name,
            last_name: data?.user?.last_name,
            email: data?.user?.email,
        }
        // user = {...data?.user}
    }

    if (!data?.user?.isAuthenticated) {
        isAuthenticated = false
    }

    if (data?.settings) settings = {...data?.settings}
    if (data?.navGeneraleLinks) navGeneraleLinks = [...data?.navGeneraleLinks]
    if (data?.navMetiersLinks) navMetiersLinks = [...data?.navMetiersLinks]

    setContext('siteName', 'Bleu Blanc Web')
    setContext('navGeneraleLinks', navGeneraleLinks)
    setContext('metiersLinks', navMetiersLinks)

    onMount(
    async () => {
            // BULMA
            const navbarBurger = document.getElementById('top-burger')
            // console.log('onMount', {navbarBurger});
            navbarBurger.addEventListener('click', () => {
            console.log('navbar click')
            const target = navbarBurger.dataset.target;
            const targetedMenu = document.getElementById(target)
            navbarBurger.classList.toggle('is-active')
            targetedMenu.classList.toggle('is-active')
            })

            return
        }
    )
</script>
<svelte:head>
    <link rel="stylesheet" href="{BASE_URL}/css/app.css">
</svelte:head>

{#if isAuthenticated}
    <span>isAuthenticated : {user.first_name} / {user.last_name}</span>
{/if}

<Nav {isAuthenticated} />
<div id="level-main-content" class="custom-bg" role="document">
  <main class="py-5" data-sveltekit-prefetch>
  <h1 class="title">{settings?.site_name}</h1>

    <slot />
  </main>
</div>