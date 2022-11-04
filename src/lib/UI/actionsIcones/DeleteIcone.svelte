<script>
    import {goto} from '$app/navigation'
    export let categ = 'news'
    export let slug = 'slug'
</script>
<span class="has-text-danger mr-3" on:click={() => {
                goto(`/${categ}/${slug}/delete`)
                }}><i class="fas fa-trash-alt"></i></span>

<style>
    i:hover {
        cursor: pointer;
    }
</style>