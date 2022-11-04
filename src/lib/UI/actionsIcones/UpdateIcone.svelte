<script>
    import {goto} from '$app/navigation'
    export let categ = 'news'
    export let slug = 'slug'
</script>
<span class="has-text-info mr-3" on:click={() => {
                goto(`/${categ}/${slug}/update`)
                }}><i class="fas fa-pen-square"></i></span>

<style>
    i:hover {
        cursor: pointer;
    }
</style>