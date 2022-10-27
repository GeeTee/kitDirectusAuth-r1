<script>
    import Youtube from '$lib/partials/videos/Youtube.svelte'

    export let gallery_videos = []    
</script>

{#if gallery_videos.length > 0}
    <ul>
        {#each gallery_videos as {video_url, video_title}}
            <li>
                <Youtube {video_url} {video_title} />
            </li>
        {/each}
    </ul>
{:else}
<div class="is-flex is-flex-direction-column">
    <p class="label">Débuter la gallerie videos</p>
    <div class="notification is-primary">
        En cliquant sur la bouton plus vous pourrez alimenter votre gallerie videos
    </div> 
</div>
{/if}

<style lang="scss">
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
    li {
        width: calc(50% - 0.35rem);
        margin: 0.175rem 0;
    }
</style>