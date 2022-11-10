<script>
    import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import TextInput from "$lib/UI/TextInput.svelte"
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
	import ManagingOneImg from '$lib/components/images/ManagingOneImg.svelte'
    import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'

    const dispatch = createEventDispatcher()

    export let itemToEdit = null

    let site_name = ''
    let domain_name = ''
    let logo = ''
    let logoToDelete = ''

    let itemBup = {}

    let site_nameValid = true
    let logoValid = true

    if (itemToEdit) {
        itemBup = {...itemToEdit}
        site_name = itemToEdit.site_name
        domain_name = itemToEdit.domain_name
        logo = itemToEdit.logo
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

    const saveUpdates = async (e) => {
        console.log('SETTINGSPROJECT saveUpdates', e.detail, {logoToDelete})
        if (logoToDelete) {
            dispatch('logo-to-delete', logoToDelete)
            // f.deleteOneImg(f.slashToUnderscore(logoToDelete))
            
        }
        
    }

    const logoDeleted = (e) => {
        logoToDelete = e.detail
        console.log('SETTINGS +page.svelte logoDeleted', {logoToDelete})
        logo = null
    }

    const gettingImg = (e) => { // in form preview
        logo = e.detail.cld_public_id
        console.log('gettingImg', {logo})
    }

</script>

{#if isEdited}
    <ManagingOneImg 
    choisirText='Sélectionner un logo'
    w=150
    cld_public_id={logo} 
    uploadPreset='Actibenne-logo'
    on:get-img={gettingImg}
    on:delete-img={logoDeleted}
    />
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

    <input 
    type="hidden" 
    name="logo" 
    id="logo"
    value={logo}
    >

    <Buttons 
    cancelText='Abandonner'
    saveText='Enregistrer'
    {disableConfirm}
    {disableCancel}
    on:button-canceling={cancelUpdates}
    on:button-saving={saveUpdates}
    />
    </form>
{/if}
{#if !isEdited}
    <HtmlO 
    label={`Project infos`}
    fct={editingSettings}
    >
        <ul>
            <li>
                {#if logo}
                    <img src={f.bannerResizeW(100, logo)} alt="logo">
                {:else}
                    Pas de logo
                {/if}
            </li>
            <li>{site_name}</li>
            <li>{domain_name} (ne peut être modifié)</li>
        </ul>
    </HtmlO>
{/if}