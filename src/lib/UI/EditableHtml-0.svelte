<script>
    import Actions from '$lib/UI/ActionComponent.svelte'
    export let fct;
    export let fctDel;
    export let label = 'Le label'
    export let deleting = false
    export let creating = false
</script>
<div class="box">
<p class="label">{@html label}</p>
<hr>
<div class="container notification is-info is-light">
    <slot>Fall back</slot>
    <Actions
    is-size-4
    {fct}
    {fctDel}
    {deleting}
    {creating}
    />
</div>
</div>
<style lang="scss">
    .container {
        $dim: 0.5rem;
        align-items: flex-start;
        display: flex;
        justify-content: space-between;
        padding: $dim;
    }
</style>