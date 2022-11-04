<script>
    import { goto } from "$app/navigation";

    export let pagination = {}
    export let itemId = null
    let {arr, categ} = pagination
    // console.log('Pagination', {pagination}, {categ}, typeof categ, {itemId})
    const length = arr.length
    $: idx = arr.findIndex(item => item.id === itemId)

    const goToCateg = (categ) => {
        if (typeof categ === 'string') {
            // console.log('goToCateg string', {categ})
            goto(`/${categ}`)
        }
        if (typeof categ === 'object') {
            // console.log('goToCateg object', {categ})
            goto(`/${categ.link}`)
        }
        
    }

    const goToArticle = (i, c) => {
        // console.log('goToArticle', {i}, {c}, typeof c)
        if (typeof c === 'string') {
            console.log('goToArticle string', {i}, {c})
            goto(`/${categ}/${arr[i].slug}`)
        }
        if (typeof categ === 'object' && Object.keys(categ).length === 2) {
            console.log('goToArticle object', {i}, {c})
            goto(`/${categ.link}/${arr[i].slug}`)
        }
        if (typeof categ === 'object' && Object.keys(categ).length === 3 && categ.subCategories === 'yes') {
            console.log('goToArticle object subCategories', {i}, {c})
            goto(`/${categ.link}/${arr[i].type}/${arr[i].slug}`)
        }
    }
</script>

{#if (itemId && arr.length > 0) || (typeof categ === 'string' && categ !== '' ) || (typeof categ === 'object' && Object.keys(categ).length > 0)}

<div class="buttons has-addons is-centered">
    {#if typeof categ === 'string'}
         <span class="button" on:click={() => goToCateg(categ)}>{categ}</span>
    {/if}

    {#if typeof categ === 'object'}
        <span class="button" on:click={() => goToCateg(categ)}>{categ.title}</span>
    {/if}
    
    {#if itemId && length > 0}
 
            {#if idx === 0 && length >= 2}
                <span class="button" on:click={goToArticle(idx + 1, categ)}>{arr[idx + 1].title} &raquo;</span>
            {/if}

            {#if idx > 0 && length > 2 && idx < length - 1}
                <span class="button">
                <span on:click={goToArticle(idx - 1, categ)}>&laquo; {arr[idx - 1].title}</span> &nbsp; | &nbsp; <span on:click={goToArticle(idx + 1, categ)}>{arr[idx + 1].title} &raquo;</span>
                </span>
            {/if}

            {#if  idx === length - 1}
                <span class="button" on:click={goToArticle(idx - 1, categ)}>&laquo; {arr[idx - 1].title}</span>
            {/if}
    {/if}
</div>
{/if}

<style lang="scss">
    .button,
    .button ~ span {
        text-transform: uppercase;
    }
</style>