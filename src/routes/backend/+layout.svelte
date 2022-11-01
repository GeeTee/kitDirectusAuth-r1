<script>
    import { page } from '$app/stores';
    console.log('BACKEND +layout.svelte', $page)
    import Nav from "$lib/partials/navs/NavLinks.svelte";

    let path = $page.url.pathname

    const {first_name, last_name, email, isAuthenticated} = $page.data.user


    const settingsLinks = [
        {
        href: '/backend/settings',
        title: 'Settings',
        beAuthenticated: true
        },

    ]

    const NavLinks = [
        {
            href: '/backend',
            title: 'Dashboard',
            beAuthenticated: true
        },
        ...settingsLinks
    ]

   
</script>
<div class="container">
    <h1 class="title has-text-centered">Backend</h1>
    <p>{first_name} {last_name} {email}</p>
    <div class="columns">
        <div class="column is-one-fifth">
            <nav class="has-background-link-light p-2">
                <Nav {path} links={NavLinks} {isAuthenticated} padLeft={true} />
            </nav>
        </div>
        <div class="column">
            <!-- <span>isAuthenticated: {isAuthenticated}</span> -->
            <slot>Content backend</slot>
        </div>
    </div>
</div>