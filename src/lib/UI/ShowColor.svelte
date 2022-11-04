<script>
    import {createEventDispatcher} from 'svelte'
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
    import ColorPicker from '$lib/UI/elements/ColorPicker.svelte'

    const dispatch = createEventDispatcher()

    export let name = ''
    export let value = ''

    let isEdited = false

    console.log('SettingsColors first', {value})

    const editingSettings = () => isEdited = true
    const cancelColor = () => {
        console.log('cancelColor')
        isEdited = false
    }
    const saveColor = (e) => {
        const objColor = e.detail
        console.log('saveColor', e.detail)
        value = e.detail.hex
        isEdited = false
        dispatch('saving-color', objColor)
    }
</script>
{#if isEdited}
{value}
    <ColorPicker 
    hex={value} 
    label={name} 
    on:cancel-color={cancelColor}
    on:save-color={saveColor}
    />
{/if}

{#if !isEdited}
    <HtmlO 
        label='Modifier cette couleur'
        fct={editingSettings}
        >
            <div class="block">
                <div class="is-flex">
                    <div id="value" style="background-color: {value};"></div>
                    <div class="name pl-1 has-text-weight-bold" style="color: {value};">{name}</div>
                </div>
            </div>
        </HtmlO>
{/if}



<style lang="scss">
    $dim: 3rem;
    // .container {
    //     // background-color: beige;
    //     width: 20rem;
    // }
    .is-flex {
        // background-color: coral;
        height: $dim;
        width: 100%;
    }
    #value {
        height: $dim;
        width: 5rem;
    }
    .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: $dim;
    }
</style>