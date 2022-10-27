<script>
    export let titleBg = false
    export let titleAlternate = false
    export let h1 = 'Heading Un'
    export let headerCentered = false
    export let h2 = undefined
    export let linkTitle = ''

    $: h1R = titleAlternate ? h2 : h1
    $: h2R = titleAlternate ? h1 : h2

</script>

<header class="mb-3" class:titleBg class:has-text-centered={headerCentered}>
    {#if linkTitle !== ''}
         <h1 class="title  my-1">
            {@html linkTitle}
        </h1>
    {:else}
         <h1 class="title  my-1">
            {h1R}
        </h1>
    {/if}
    
    {#if h2}
            <h2 class="subtitle is-uppercase mt-3 mb-1">
                {h2R}
            </h2>
    {/if}
</header>

<style lang="scss">
    // .titleBg {
    //     background-color: var(--main-color-2);
    //     border: 1px solid var(--main-border-color);
    //     border-radius: .5rem;
    //     color: var(--main-color-1);
    //     padding: .3rem;
    // }
    h1 {
        letter-spacing: .2rem;
        font-size: 5vw;
        text-transform: uppercase;
        @media (min-width: 768px) {
            font-size: 2vw;
        }
        // &::first-letter {
        //     text-transform: uppercase;
        // }
    }
    h2 {
        border-top: 1px solid transparent;
        letter-spacing: .2rem;
        font-size: 3vw;
        @media (min-width: 768px) {
            font-size: 1vw;
        }
    }
</style>