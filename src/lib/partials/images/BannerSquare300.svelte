<script>
    import { getContext } from "svelte";
    const getImgSrc = getContext('getImgSrc')

    export let idBanner = undefined
    export let alt = getContext('siteName')

    const key = ['300x300-jpeg', '300x300-webp']
</script>
<picture>
    <source type="image/webp" srcset={getImgSrc(idBanner, key[1])}>
    <img class="test" loading="lazy" src={getImgSrc(idBanner, key[0])}  {alt} width="300"  height="300">
</picture>