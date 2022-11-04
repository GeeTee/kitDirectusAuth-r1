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
        console.log('cancelUpdates', e.detail)
        site_name = itemBup.site_name  
        logo = itemBup.logo
        isEdited = false
    }

    const saveUpdates = (e) => {
        // console.log('saveUpdates', e.detail)
        const itemUpdated = {...itemBup}
        if (itemBup.site_name !== site_name) {
            console.log('saveUpdates', site_name)
            itemUpdated.site_name = site_name
        }
        if (itemBup.logo !== logo) {
            console.log('saveUpdates', logo)
            itemUpdated.logo = logo
        }  
        console.log('saveUpdates',{itemUpdated})  
        dispatch('save-item-updated', itemUpdated)  
        isEdited = false
    }

    const gettingImg = (e) => {
        // console.log('gettingImg', e.detail)
        logo = e.detail.cld_public_id
        console.log('gettingImg', {logo})
    }

</script>

{#if isEdited}
    <TextInput
    id="site-name"
    label="Nom du site"
    type="text"
    valid={site_nameValid}
    validityMessage="Entrez le nom de votre site internet"
    controlType="input"
    value={site_name}
    on:input={event => (site_name = event.target.value)} 
    />

    <ManagingOneImg 
    cld_public_id={logo} 
    uploadPreset='Actibenne-logo'
    on:get-img={gettingImg}
    />

    <Buttons 
    cancelText='Abandonner'
    saveText='Enregistrer'
    {disableConfirm}
    {disableCancel}
    on:button-canceling={cancelUpdates}
    on:button-saving={saveUpdates}
    />

{/if}
{#if !isEdited}
    <HtmlO 
    label={`Project infos`}
    fct={editingSettings}
    >
        <ul>
            <li>{site_name}</li>
            <li>{domain_name} (ne peut être modifié)</li>
            <li>
                {#if logo}
                    <img src={f.bannerResizeW(100, logo)} alt="logo">
                {:else}
                    Pas de logo
                {/if}
            </li>
        </ul>
    </HtmlO>
{/if}