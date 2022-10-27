<script>
    import { getContext } from "svelte";
    const getImgSrc = getContext('getImgSrc')

    export let idBanner = undefined
    export let alt = undefined

    const key = 'category-post-banner'
</script>
<img src={getImgSrc(idBanner, key)}  {alt}>