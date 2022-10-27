<script>
    import {getContext} from 'svelte'
    export let idBanner = undefined
    export let alt = getContext('siteName')
</script>
<picture>
    <source type="image/webp" srcset={`https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_300,q_auto,f_webp/${idBanner}`}>
    <img class="test" loading="lazy" src={`https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_300,q_auto,f_jpg/${idBanner}`}  {alt} width="300"  height="300">
</picture>