<script>
    import { page } from '$app/stores';

    $: item = $page.data.item
    
    // console.log('ACTIVITES Slug +page.svelte $page', $page)
</script>
<h1 class="title">{item.title}</h1>