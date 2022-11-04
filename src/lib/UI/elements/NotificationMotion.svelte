<script>
    import { fly } from 'svelte/transition'
	import { sineInOut } from 'svelte/easing'

    export let heading = null
    export let text = 'Pas d\'élément disponible'
    export let dn = false

    // CLASSES CSS
    let classBase = ['notification']
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }
    // console.log('classBase in Article : ', {classBase})
    if (classBase.length > 1) {classL = classBase.join(' ')}
    if (classBase.length === 1) {classL = classBase[0]}
</script>
<div 
transition:fly="{{delay: 0, duration: 800, x: 1000, opacity: 0.5, easing: sineInOut}}"
>
    {#if heading}
        <h3 class="subtitle is-uppercase is-size-7 mb-2">{@html heading}</h3>
    {/if}
    <div class={classL} class:dn >{@html text}</div>
</div>


<style>
    .dn {
        display: none;
    }
</style>