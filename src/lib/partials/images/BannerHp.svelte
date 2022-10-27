<script>
    import { getContext } from "svelte";
    import { fade } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
    const getImgSrc = getContext('getImgSrc')

    export let id = undefined
    export let alt = ''
    export let width = '1500'

    const key = ['200-jpeg', '500-jpeg', '800-jpeg', '1200-jpeg', '1500-jpeg']
    const keyW = ['200-webp', '500-webp', '800-webp', '1200-webp', '1500-webp']
</script>
<picture transition:fade={{duration: 800, easing: cubicInOut}}>
  <source type="image/webp"
    srcset="
      {getImgSrc(id, keyW[0])} 200w,
      {getImgSrc(id, keyW[1])} 500w,
      {getImgSrc(id, keyW[2])} 800w,
      {getImgSrc(id, keyW[3])} 1200w,
      {getImgSrc(id, keyW[4])} 1500w,
      "
      >

  <img
    srcset="
      {getImgSrc(id, key[0])} 200w,
      {getImgSrc(id, key[1])} 500w,
      {getImgSrc(id, key[2])} 800w,
      {getImgSrc(id, key[3])} 1200w,
      {getImgSrc(id, key[4])} 1500w,
      "

    src={getImgSrc(id, key[4])}
    {alt}
    loading="lazy"
    decoding="async"
    {width}
    >

</picture>