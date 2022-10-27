<script>
    import {getContext} from 'svelte'
    import f from '$lib/helpers/scripts'
    export let thumbGallery = []
    export let fctImg = f.thumbImg
    export let altText = null

    $: alt = altText ? `${altText} sur ${getContext('siteName')}` : `${getContext('siteName')}`
</script>

{#if thumbGallery.length > 0}
<div class="is-flex is-flex-direction-column">
    <p class="label">Gérer la gallerie images ({thumbGallery.length})</p>
     <ol>
        {#each thumbGallery as {public_id}}
            <li>
                <div>
                    <img src={fctImg(public_id)} {alt}>
                </div>
            </li>
        {/each}
     </ol>
</div>
{:else}
<div class="is-flex is-flex-direction-column">
    <p class="label">Débuter la gallerie images</p>
    <div class="notification is-primary">
        En cliquant sur la bouton plus vous pourrez alimenter votre gallerie images
    </div> 
</div>
{/if}

<style lang="scss">
    ol {
        display: flex;
        flex-flow: row wrap;
        > li {
            margin: 0.7rem;
            display: flex;
            flex-direction: column;
            max-width: 150px;
            > div {
                text-align: center;
            }
        }
    }
</style>