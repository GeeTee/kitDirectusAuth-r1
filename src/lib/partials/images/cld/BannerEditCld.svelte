<script>

    import Button from '$lib/UI/Button.svelte'

    export let cld_public_id = ''
    $: src = cld_public_id !== ''? `https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_500,q_auto,f_jpg/Actibenne/banners/${cld_public_id}` : false

    const enabled = true

    const newBanner = () => {
        console.log('newBanner')
        //TODO:
    }

    // const deleteBanner = () => {
    //     console.log('deleteBanner')
    // }
</script>

<div class="edit-banner mb-6">
    {#if src}
         <img {src} alt="">
         <div class="buttons">
            <Button
            is-warning
            {enabled}
            fct={newBanner}
            >
                Changer
            </Button>
         </div>
    {:else}
         <strong>Erreur SRC</strong>
    {/if}
    
</div>

<style lang='scss'>
    .edit-banner {
        position: relative;
    }
    .dn {
        display: none;
    }
</style>