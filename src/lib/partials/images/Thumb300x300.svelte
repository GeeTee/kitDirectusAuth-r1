<script>
    import { getContext } from "svelte";
    const getImgSrc = getContext('getImgSrc')

    export let id = undefined
    export let alt=""
    export let itemprop = undefined

    const key = ['300x300-jpeg', '300x300-webp']
</script>
{#if id}
    <picture>
        <source type="image/webp" srcset={getImgSrc(id, key[1])}>
        {#if itemprop}
             <img loading="lazy" {itemprop} src={getImgSrc(id, key[0])}  {alt}>
        {:else}
            <img loading="lazy" src={getImgSrc(id, key[0])}  {alt}>
        {/if}
        
    </picture>
{/if}