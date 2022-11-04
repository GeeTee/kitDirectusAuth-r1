<script>
    import { getContext } from "svelte";
    import Notification from '$lib/UI/elements/Notification.svelte'
    import List from '$lib/UI/elements/LinksListSiteMap.svelte'

    const metiersLinks = getContext('metiersLinks')
    const articlesMetiersLinks = getContext('articlesMetiersLinks')
    const articlesNewsLinks = getContext('articlesNewsLinks')
    const navGeneraleLinks = getContext('navGeneraleLinks')
    const navAdminLinks = getContext('navAdminLinks')
    // console.log('HtmlSiteMap : ', {navGeneraleLinks})
    // console.log('HtmlSiteMap : ', {metiersLinks})
    // console.log('HtmlSiteMap : ', {articlesNewsLinks})
    // console.log('HtmlSiteMap : ', {articlesMetiersLinks})
    // console.log('HtmlSiteMap : ', {articlesNewsLinks}, {metiersLinks}, {articlesMetiersLinks}, {navGeneraleLinks}, {navAdminLinks})
</script>

<div class="block">
    <h3 class="subtitle">Articles Métiers</h3>
    {#if articlesMetiersLinks.length > 0}
        <div id="gt-cols-by-hand" class="children-3 mt-4">
            {#each articlesMetiersLinks as {title, articles}}
                    <List tag="h4" arr={articles} {title} />
            {/each}
        </div>
    {:else}
         <Notification is-info />
    {/if}
</div>

<div class="block">
    <div id="gt-cols-by-hand" class="children-3 mt-4">
        <List tag="h3" arr={articlesNewsLinks} title='Articles Chantiers / news' />
    </div>
</div>

<div class="block">
    <div id="gt-cols-by-hand" class="children-3 mt-4">
        <List tag="h3" arr={metiersLinks} title='menu métiers' />
        <List tag="h3" arr={navGeneraleLinks} title='menu principal' />
        <List tag="h3" arr={navAdminLinks} title='menu légal' />
    </div>
</div>