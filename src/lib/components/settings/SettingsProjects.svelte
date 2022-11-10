<script>
    import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
    import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'

    // const dispatch = createEventDispatcher()

    export let itemToEdit = null

    let site_name = ''
    let domain_name = ''
    let logo = ''
    let logoToDelete = null

    let itemBup = {}

    let site_nameValid = true

    if (itemToEdit) {
        itemBup = {...itemToEdit}
        site_name = itemToEdit.site_name
        domain_name = itemToEdit.domain_name
    }

    // export let projectSettings = {}
    // const {site_name, domain_name, logo} = projectSettings
    let isEdited = false
    let disableConfirm = true; 
    let disableCancel = true; 

    const editingSettings = () => isEdited = true

    const cancelUpdates = (e) => {
        console.log('SETTINGSPROJECT cancelUpdates', {logoToDelete}, e.detail)
        site_name = itemBup.site_name
        logo = itemBup.logo
        isEdited = false
    }

    const gettingImg = (e) => { // in form preview
        logo = e.detail.cld_public_id
        console.log('gettingImg', {logo})
    }

</script>

{#if isEdited}
<form method="POST" action="?/projectSettings">
    <input 
    type="text" 
    name="site_name" 
    id="site_name"
    class="input"
    placeholder="Nom du site"
    value={site_name}
    required
    >

    <Buttons 
    cancelText='Abandonner'
    saveText='Enregistrer'
    {disableConfirm}
    {disableCancel}
    on:button-canceling={cancelUpdates}
    />
    </form>
{/if}
{#if !isEdited}
    <HtmlO 
    label={`Project infos`}
    fct={editingSettings}
    >
        <ul>
            <li>{site_name}</li>
            <li>{domain_name} (ne peut être modifié)</li>
        </ul>
    </HtmlO>
{/if}