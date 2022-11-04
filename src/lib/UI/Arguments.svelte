<script>
    import { getContext } from 'svelte';
    export let argtCollection = []
    import Symbol from "./elements/MaterialSymbols.svelte";

    let gtCalfCentered = getContext('centrageArticles') === 'yes' ? true : false
</script>

{#if argtCollection.length > 0}
<div class:gt-half-centered={gtCalfCentered}>
    <div 
    id="gt-cols" 
    class="children-4"
    >
        {#each argtCollection as {title, icone, very_short_description}}
            <div class="well argts">
                <Symbol tag={icone} />
                <br>
                <span class="title is-size-6 is-uppercase has-text-centered mb-1">{title}</span>
                <br>
                {#if very_short_description !== null}
                    <div>
                        {very_short_description}
                    </div>
                {/if}
                
            </div>
        {/each}
    </div>
</div>
{/if}

<style lang="scss">
    .argts {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>