<script>
    import f from '$lib/helpers/scripts'
    import Youtube from '$lib/partials/videos/Youtube.svelte';
    export let block = {}
</script>

{#if block}
    <div class="content">
        {#if block?.title}
            <h2 class="subtitle">{block?.title}</h2>
        {/if}
        {#if block?.text}
            {#if !block?.image}
                <div class="block">
                    {@html block?.text}
                </div>
            {/if}
            {#if block?.image}
                {#if !block?.image_position}
                    <div class="horizontal-img-and-text block">
                        <img src={f.imgSquareW(200, block?.image)} alt="test //TODO:">
                        <div class="pl-4">{@html block?.text}</div>
                    </div>
                {/if}
                {#if block?.image_position === 'left'}
                    <div class="horizontal-img-and-text block">
                        <img src={f.imgSquareW(200, block?.image)} alt="test //TODO:">
                        <div class="pl-4">{@html block?.text}</div>
                    </div>
                {/if}
                {#if block?.image_position === 'right'}
                    <div class="horizontal-img-and-text right block">
                        <div class="pr-4">{@html block?.text}</div>
                        <img src={f.imgSquareW(200, block?.image)} alt="test //TODO:">
                    </div>
                {/if}
                {#if block?.image_position === 'bottom block'}
                    <div class="vertical-img-and-text">
                        <div class="pr-4">{@html block?.text}</div>
                        <div class="has-text-centered">
                            <img src={f.bannerResizeWH(800, 400, block?.image)} alt="test //TODO:">
                        </div>
                    </div>
                {/if}
                {#if block?.image_position === 'top'}
                    <div class="vertical-img-and-text block">
                        <div class="has-text-centered">
                            <img src={f.bannerResizeWH(800, 400, block?.image)} alt="test //TODO:">
                        </div>
                        <div class="pr-4">{@html block?.text}</div>
                    </div>
                {/if}
            {/if}
            {#if block?.video_url}
                <Youtube video_url={block.video_url} video_title={block?.video_title} />
            {/if}
        {/if}
        {#if !block?.text && block?.image}
            <div>
                <img src={f.bannerResizeWH(500, 250, block?.image)} alt="test //TODO:">
            </div>
        {/if}
    </div>
{/if}
<hr>

<style lang="scss">
    .horizontal-img-and-text {
        align-items: center;
        display: flex;
        &.right {
            justify-content: flex-end;
        }
        width: 100%;
    }
    .vertical-img-and-text {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>