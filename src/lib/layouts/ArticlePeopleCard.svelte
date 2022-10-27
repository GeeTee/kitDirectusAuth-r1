<script>
    import Card from "$components/users/UserCard.svelte";

    // PROPS
    export let h1 = 'H1 article people card'
    export let h2 = 'H2 article people card'
    export let id = '0cbfb677-313a-419e-b352-730d7d03a7bf'

    export let tel = ''
    export let telVal = ''
    export let email = ''

    // CLASSES CSS
    let classBase = ['item']
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

    <Card
    {h1}
    {h2}
    {id}
    {tel}
    {telVal}
    {email}
     />
    {#if $$slots.footer}
    <hr>
    <footer class="block gt-half-centered is-in-item">
        <slot name="footer"></slot>
    </footer>
    {/if}
</article>

