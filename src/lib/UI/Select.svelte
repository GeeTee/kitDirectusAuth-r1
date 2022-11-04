<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();
    export let selectItems = []
    const items = [
        {
            text: 'Choisir ...',
            value: ''
        },
        ...selectItems
    ]
    export let selected = ''
    if (selected === null) {
        selected = ''
    }
    $: console.log('select', {selected})
</script>
<div class="select">
    <select 
    bind:value={selected} 
    on:change={() => dispatch('get-selected', {selected})}
    >
    {#each items as {text, value}}
         <option {value}>{text}</option>
    {/each}
</select>
</div>