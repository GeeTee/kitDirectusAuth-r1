<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id = undefined
    const confirmDeleting = async () => {
        console.log('confirmDeleting')
        dispatch('want-to-confirm')
    }
</script>
<span class="has-text-danger mr-3" on:click={confirmDeleting}><i class="fas fa-trash-alt"></i></span>

<style>
    i:hover {
        cursor: pointer;
    }
</style>