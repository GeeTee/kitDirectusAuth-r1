<script>
    import Notification from '$lib/UI/elements/Notification.svelte'

    export let tag = 'h1'
    export let arr = []
    export let title = "Title"

    const attr = {class: 'subtitle'}
</script>
<div class="well">
    <svelte:element this={tag} {...attr}>{title}</svelte:element>
    {#if arr.length > 0}
        <ul>
        {#each arr as {title, href}}
            <li class="is-uppercase"><a {href} {title}>{title} &raquo;</a></li>
        {/each}
        </ul>
    {:else}
        <Notification is-info />
    {/if}
</div>

<style>
    .subtitle {
        text-transform: capitalize;
    }
</style>