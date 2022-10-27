<script>
    import { getContext } from 'svelte';
    import Header from './Header.svelte'
    import ImageGallery from '$lib/partials/images/ImageGallery.svelte'
    import Pagination from '$lib/UI/elements/ArticlesPagination.svelte';

    // PROPS
    export let h1 = 'H1 article'
    export let h2 = undefined
    export let titleBg = false
    // export let galerie_images = []
    export let beWell = false
    export let titleAlternate = false
    export let linkTitle = ''
    export let withLogo = false
    export let margBottomOnContent = true
    export let pagination = {}
    export let itemId = null
    export let listImg = []


    let gtCalfCentered = getContext('centrageArticles') === 'yes' ? true : false


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

{#if Object.keys(pagination).length > 0}
     <Pagination {pagination} {itemId} />
{/if} 

<article
class={classL}
class:gt-half-centered={gtCalfCentered}
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
    
    <div class="gt-content" class:block={margBottomOnContent} >
        <div class:well={beWell} class:columns-2={!gtCalfCentered}>
            <slot>Mon content</slot>
        </div>
    </div>

    {#if listImg.length > 0}
         <ImageGallery {listImg} siteName={h2} />
    {/if}

    {#if $$slots.footer}
    <footer class="block is-in-item" class:well={beWell}>
        <slot name="footer"></slot>
    </footer>
    {/if}
</article>

{#if Object.keys(pagination).length > 0}
     <Pagination {pagination} {itemId} />
{/if}

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
        //     // position: absolute;
        //     // right: 0;
        //     // top: 0;
        //     // transform: translateY(1.25rem);
        //     > img {
        //         object-fit: cover;
        //     }
        // }
        
    }
    // .gt-content:not(.gt-half-centered) {
    //     background-color: red;
    // }
@media (min-width: 600px) {
    .columns {
        -webkit-column-gap: 30px; /* Chrome, Safari, Opera */
        -moz-column-gap: 30px; /* Firefox */
        column-gap: 30px;
        // -webkit-column-rule: 1px solid #f5f5f5; /* Chrome, Safari, Opera */
        // -moz-column-rule: 1px solid #f5f5f5; /* Firefox */
        // column-rule: 1px solid #f5f5f5;
        text-align: justify;
    }
    .columns-2 {
        -webkit-column-count: 2; /* Chrome, Safari, Opera */
        -moz-column-count: 2; /* Firefox */
        column-count: 2;
    }
    .columns-3 {
        -webkit-column-count: 3; /* Chrome, Safari, Opera */
        -moz-column-count: 3; /* Firefox */
        column-count: 3;
    }
    .columns-4 {
        -webkit-column-count: 4; /* Chrome, Safari, Opera */
        -moz-column-count: 4; /* Firefox */
        column-count: 4;
    }
}
</style>