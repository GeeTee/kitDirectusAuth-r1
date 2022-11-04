<script>
    export let heading = 'Action'
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

<details class={classL} class:dn >
    <summary class="subtitle is-uppercase">{heading}</summary>
    {@html text}
</details>

<style>
    .dn {
        display: none;
    }
    summary:hover {cursor: pointer;}
</style>