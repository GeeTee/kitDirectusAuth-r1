<script>
    export let tag = 'h1'
    export let title = 'Title'
    const attr = {
        class: "title is-text-overflow is-size-4"
    }

    // CLASSES CSS
    let classBase = ['blocs--argumentation-argument']
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }
    // console.log('classBase in Article : ', {classBase})
    if (classBase.length > 1) {classL = classBase.join(' ')}
    if (classBase.length === 1) {classL = classBase[0]}
</script>
<article 
class={classL}
>
    <header class="block-header pb-3">
        <svelte:element this={tag} {...attr}>{@html title}</svelte:element>
    </header>
    <div class="blocs--argumentation-argument-content columns  is-vcentered">
        <div class="blocs--argumentation-argument-redaction column is-two-thirds">
            <div class="has-text-justified">
                <slot name="summary" />
            </div>
            {#if $$slots.footer}
                 <footer>
                     <slot name="footer" />
                 </footer>
            {/if}
        </div>
        <div class="blocs--argumentation-argument-img column">
            <slot name="banner" />
        </div>
    </div>
</article>

<style lang="scss">
    // article {
    //     background-color: #fff;
    // }
    // footer {
    //     margin-top: auto;
    // }
</style>