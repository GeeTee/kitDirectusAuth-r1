<script>
    import Header from '$lib/layouts/Header.svelte'
    import ImageGallery from '$lib/partials/images/ImageGallery.svelte'

    // PROPS
    export let h1 = 'H1 article'
    export let h2 = undefined
    export let titleBg = false
    export let gtCalfCentered = true
    export let galerie_images = []
    export let beWell = false
    export let titleAlternate = false
    export let linkTitle = ''
    export let withLogo = false


    // CLASSES CSS
    let classBase = ['item']
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }
    // console.log('classBase in Article : ', {classBase})
    if (classBase.length > 1) {classL = classBase.join(' ')}
    if (classBase.length === 1) {classL = classBase[0]}
</script>   
<article
class={classL}
>
    <div class="header-logo-container" class:withLogo>
    <Header {h1} {h2} {titleAlternate} {titleBg} {linkTitle} />

    {#if $$slots.logoDirection}
        <div class="logo-direction">
            <slot name="logoDirection" />
        </div>
    {/if}
    </div>
    {#if $$slots.banner}
         <div class="banner block">
            <slot name="banner"></slot>
        </div>
    {/if}
    
    <div class="block" class:gt-half-centered={gtCalfCentered}>
        <div class="gt-content" class:well={beWell}>
            <slot>Mon content</slot>
        </div>
    </div>
    {#if galerie_images.length > 0}
        <div class="block">
            <ImageGallery title={h2} listImg={galerie_images} />
        </div>
    {/if}
    {#if $$slots.footer}
    <hr>
    <footer class="block gt-half-centered is-in-item" class:well={beWell}>
        <slot name="footer"></slot>
    </footer>
    {/if}
</article>

<style lang="scss">
    $dim: 61px;
    article {
        position: relative;
        &.well {overflow: visible;}
        .header-logo-container.withLogo {
            align-items: center;
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
        // .logo-direction {
        //     // background-color: #e4e4e4;
        //     width: $dim;
        //     height: $dim;
        //     border-radius: 50%;
        //     > img {
        //         object-fit: cover;
        //     }
        // }
        
    }
</style>