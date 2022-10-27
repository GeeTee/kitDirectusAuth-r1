<script>
    import { onMount } from 'svelte';

    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import 'photoswipe/style.css';

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gt-cols-by-hand',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });

    import f from '$lib/helpers/scripts'
    import Thumb300x300 from './Thumb300x300.svelte';

    export let siteName = 'A faire !!!'
    export let listImg;
    export let inModal = false;

    $: outOfModal = !inModal;

    $: by4 = (listImg.length >= 8 && listImg.length < 10) ? true : false;
    $: by5 = listImg.length >= 10 ? true : false;

    const itemprop = "thumbnail";

    onMount(() => lightbox.init());
</script>
<div class="block">
<div class="pswp-gallery children-4" class:inModal class:outOfModal id="gt-cols-by-hand" class:by4 class:by5 itemscope itemtype="http://schema.org/ImageGallery">
    {#each listImg as {id, directus_files_id} (id)}
      <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a 
        href={f.getImgSrc(directus_files_id.id)} 
        itemprop="contentUrl" 
        data-pswp-width={directus_files_id.width}
        data-pswp-height={directus_files_id.height}
        target="_blank"
        rel="noreferrer"
        >
          <Thumb300x300 alt={f.galleryImgFigcaptionAlt(directus_files_id.description, siteName)} {itemprop} id={directus_files_id.id} />
        </a>
      <figcaption class="is-size-7" itemprop="caption description">{f.galleryImgFigcaptionAlt(directus_files_id.description, siteName)}</figcaption>
      </figure>
    {/each}
</div>

</div>
<div class="is-clearfix"></div>


<style lang="scss">
figure {
  > a {
    display: block;
  }
}
</style>
