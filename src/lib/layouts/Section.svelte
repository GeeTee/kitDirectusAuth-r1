<script>
    import { getContext } from "svelte";

    let gtCalfCentered = getContext('centrageArticles') === 'yes' ? true : false
    import Header from "./Header.svelte";

    export let h1 = 'H1 article'
    export let h2 = undefined
    export let headerCentered = false
    export let titleBg = true
</script>

<section
class:gt-half-centered={gtCalfCentered}
>
    <Header {h1} {h2} {titleBg} {headerCentered} />
    {#if $$slots.map}
        <div class="mb-6">
            <slot name="map" />
         </div>
    {/if}

    <slot />

    {#if $$slots.mapDown}
         <div class="mt-6">
             <slot name="mapDown" />
         </div>
    {/if}
</section>
