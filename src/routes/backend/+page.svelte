<script>
    export let data 
    // console.log('backend +page.svelte', data)
    let first_name = ''
    let last_name = ''
    let email = '' 
    if (data) {
        first_name = data.user.first_name
        last_name = data.user.last_name
        email = data.user.email
    }
</script>
<h1 class="title has-text-centered">Backend</h1>
{#if data}
    <h2 class="subtitle">Est connecté</h2>
    <ul>
        <li>{first_name} {last_name}</li>
        <li>{email}</li>
    </ul>
{/if}