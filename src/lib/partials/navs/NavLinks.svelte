<script>
    import f from '$lib/helpers/scripts'
    export let path
    export let links = []
    export let isAuthenticated = false
    export let padLeft = false

    // console.log('NAVLINKS', {path})

</script>

{#each links as {title, href, beAuthenticated}}
    <a 
    class="navbar-item is-uppercase has-text-weight-bold" 
    class:padLeft 
    {href}  
    class:is-active={path === href}
    class:dn={f.checkAuthentif(beAuthenticated, isAuthenticated, href)}
    >{title}</a>
{/each}

<style>
    .padLeft {
        padding-left: 0;
    }
    .dn {
        display: none;
    }
    /* .is-active {
        border-bottom: 0.2rem solid tomato;
    } */
</style>