<script>
  import f from '$lib/helpers/scripts'
  // import { fade } from 'svelte/transition';
  // import { cubicInOut } from 'svelte/easing';

  export let alt = ''
  export let width = '1500'
  export let cld_public_id = ''

  const {srcJpg, srcWebP} = f.createSrcJpgSrcWebp(cld_public_id)
  // console.log('expected banner', srcJpg, srcWebP)
</script>
{#if srcJpg?.length > 0 && srcWebP?.length > 0}
  <picture>
    <source type="image/webp"
      srcset="
        {srcWebP[0]} 200w,
        {srcWebP[1]} 400w,
        {srcWebP[2]} 600w,
        {srcWebP[3]} 800w,
        {srcWebP[4]} 1000w,
        {srcWebP[5]} 1200w,
        {srcWebP[6]} 1400w,
        {srcWebP[7]} 1600w,
        "
        >

    <img
      srcset="
        {srcJpg[0]} 200w,
        {srcJpg[1]} 400w,
        {srcJpg[2]} 600w,
        {srcJpg[3]} 800w,
        {srcJpg[4]} 1000w,
        {srcJpg[5]} 1200w,
        {srcJpg[6]} 1400w,
        {srcJpg[7]} 1600w,
        "

      src={srcJpg[6]}
      {alt}
      loading="lazy"
      decoding="async"
      {width}
      >

  </picture>
{:else}
   Pas de banner
{/if}
