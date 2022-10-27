<script>
    export let tag = 'h1'
    export let title = 'Title'
    const attr = {
        class: "title is-text-overflow is-size-4"
    }

    // CLASSES CSS
    let classBase = []
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }
    // console.log('classBase in Article : ', {classBase})
    if (classBase.length > 1) {classL = classBase.join(' ')}
    if (classBase.length === 1) {classL = classBase[0]}
</script>
<article>
    <header class="block-header pb-3">
        <svelte:element this={tag} {...attr}>{@html title}</svelte:element>
    </header>
    <div class="gt-content">
        <slot>Mon content</slot>
    </div>
    {#if $$slots.footer}
            <footer>
                <slot name="footer" />
            </footer>
    {/if}
</article>