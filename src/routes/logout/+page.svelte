<script>

    import { page } from '$app/stores';
    console.log('logout.svelte', $page.data)

    import { getContext } from "svelte"
    import Div from "$lib/layouts/DivHeader.svelte"
    export let data 
    // console.log('logout.svelte', {data})

    const headT = 'Déconnexion'
    const h2 = getContext('siteName')

    let isAuthenticated = false
    if (data?.user) isAuthenticated = data?.user?.isAuthenticated
</script>

<Div
    titleBg={true}
    h1={headT}
    {h2}
    beWell={true}
>

{#if !isAuthenticated}
    <div class="has-text-centered is-uppercase">
        Il semble que vous ne soyez pas connecté.
    </div>
{:else}
<div class="has-text-centered is-uppercase">
    <div class="block">
        <!-- <User isAuthenticated={$session?.user?.authenticated} ConnectedUser={$session?.user} positionAbsolute={false} /> -->
        Infos User : <br>
        <strong>{data?.user?.first_name} {data?.user?.last_name}</strong>
    </div>
    <form id="login-form" name="login" method="POST">
        <button class="button is-warning">Vous déconnecter</button>
    </form>
     
     </div>
{/if}
</Div>