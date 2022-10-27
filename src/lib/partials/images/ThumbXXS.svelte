<script>
    import { getContext } from "svelte";
    const getImgSrc = getContext('getImgSrc')

    export let id = undefined
    export let alt="logo"

    const key = ['45x45-png', '45x45-webp']
</script>
{#if id}
    <picture>
        <source type="image/webp" srcset={getImgSrc(id, key[1])}>
        <img loading="lazy" src={getImgSrc(id, key[0])}  {alt}>
    </picture>
{/if}