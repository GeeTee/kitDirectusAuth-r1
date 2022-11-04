<script>
     import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import TextInput from "$lib/UI/TextInput.svelte"

    import ShowColor from '$lib/UI/ShowColor.svelte'


    const dispatch = createEventDispatcher()

    export let itemToEdit = null   

    let main_color_1 = ''
    let main_color_2 = ''
    let main_color_3 = ''
    let hove_link_color = ''
    let hover_bg_link_color = ''
    let bg_color = ''
    let bg_banner = ''

    let itemBup = {}

    let keys = []

    if (itemToEdit) {
        itemBup = {...itemToEdit}
        keys = Object.keys(itemToEdit)
        console.log('kyes', {keys})
        main_color_1 = itemToEdit.main_color_1
        main_color_2 = itemToEdit.main_color_2
        main_color_3 = itemToEdit.main_color_3
        hove_link_color = itemToEdit.hove_link_color
        hover_bg_link_color = itemToEdit.hover_bg_link_color
        bg_color = itemToEdit.bg_color
        bg_banner = itemToEdit.bg_banner
    }

    const saveUpdates = (e) => {
        const {label, hex} = e.detail
        const itemUpdated = {...itemBup}
        console.log('saveUpdates', e.detail)

        if (label === 'main_color_1') {
            if (itemBup.main_color_1 !== hex) {
                itemUpdated.main_color_1 = hex
                console.log('saveUpdates', itemUpdated.main_color_1)
            }
        }

        if (label === 'main_color_2') {
            if (itemBup.main_color_2 !== hex) {
                itemUpdated.main_color_2 = hex
                console.log('saveUpdates', itemUpdated.main_color_2)
            }
        }

        if (label === 'main_color_3') {
            if (itemBup.main_color_3 !== hex) {
                itemUpdated.main_color_3 = hex
                console.log('saveUpdates', itemUpdated.main_color_3)
            }
        }

        if (label === 'hove_link_color') {
            if (itemBup.hove_link_color !== hex) {
                itemUpdated.hove_link_color = hex
                console.log('saveUpdates', itemUpdated.hove_link_color)
            }
        }

        if (label === 'hover_bg_link_color') {
            if (itemBup.hover_bg_link_color !== hex) {
                itemUpdated.hover_bg_link_color = hex
                console.log('saveUpdates', itemUpdated.hover_bg_link_color)
            }
        }

        if (label === 'bg_color') {
            if (itemBup.bg_color !== hex) {
                itemUpdated.bg_color = hex
                console.log('saveUpdates', itemUpdated.bg_color)
            }
        }

        if (label === 'bg_banner') {
            if (itemBup.bg_banner !== hex) {
                itemUpdated.bg_banner = hex
                console.log('saveUpdates', itemUpdated.bg_banner)
            }
        }

        console.log('saveUpdates colors',{itemUpdated})  
        dispatch('save-item-updated', itemUpdated)
    }

    // let color
    // console.log('Settings Colors', {color})
</script>


    <p class="label">Charte graphique</p>

    {#if keys?.length > 0}
        <div>
        {#each keys as key}
            <ShowColor 
            name={key} 
            value={itemToEdit[key]} 
            on:saving-color={saveUpdates}
            />
        {/each}
        </div>
    {/if}
