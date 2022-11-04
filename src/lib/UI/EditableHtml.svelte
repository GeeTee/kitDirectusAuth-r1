<script>
    // import {createEventDispatcher} from 'svelte'
    import Actions from '$lib/UI/ActionComponent.svelte'

    // const dispatch = createEventDispatcher();

    export let fct;
    export let fctDel;

    export let content = 'Mon content'

    export let type = 'html'
    export let deleting = false
    export let creating = false
    export let deletingCompo = false

    export let component
    export let props = {}

</script>
{#if type === 'html'}
    <div class="container">
        {@html content}
        <Actions
        is-size-4
        {fct}
        {fctDel}
        {deleting}
        {creating}
        />
    </div>
{/if}
{#if type === 'component'}
    <div class="container">
        <div>
            <svelte:component this={component} {...props} />
        </div>
        <Actions
        is-size-4
        {fct}
        {fctDel}
        deleting={deletingCompo}
        {creating}
        />
    </div>
{/if}
<style lang="scss">
    .container {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
</style>