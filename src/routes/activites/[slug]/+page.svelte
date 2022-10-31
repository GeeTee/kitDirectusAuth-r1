<script>
    import { page } from '$app/stores';
    // export let data
    // console.log('ACTIVITES Slug +page.svelte', {data}) 
    $: item = $page.data.item
    
    console.log('ACTIVITES Slug +page.svelte $page', $page)
</script>
<h1 class="title">{item.title}</h1>