<script>
    import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
	import ManagingOneImg from '$lib/components/images/ManagingOneImg.svelte'
    import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'

    const dispatch = createEventDispatcher()



  
    export let logoData = null
    $: logo = logoData? logoData : null
    $: logoBup = logoData? logoData : null

    let logoToDelete = null

    let imgManager

    let site_nameValid = true
    let logoValid = true


    // export let projectSettings = {}
    // const {site_name, domain_name, logo} = projectSettings
    let isEdited = false
    let disableConfirm = true; 
    let disableCancel = true; 

    const editingSettings = () => isEdited = true

    const cancelUpdates = () => {
        logo = logoBup
    }

    const saveUpdates = async () => {
        if (logoToDelete) imgManager.deletImg(logoToDelete)
        // await imgManager.deletImg(logoToDelete)
    }

    const logoDeleting = (e) => {
        logoToDelete = e.detail
        logo = null
        // console.log('SETTINGS +page.svelte logoDeleted', {logo}, {logoToDelete})
        // dispatch('logo-to-delete', logoToDelete)
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
    on:delete-img={logoDeleting}
    />
    <form method="POST" action="?/logoSettings">

    <input 
    type="hidden" 
    name="logo" 
    id="logo"
    value={logo}
    >

    <input 
    type="hidden" 
    name="logoToDelete" 
    id="logoToDelete"
    value={logoToDelete}
    >
    
    {#if !logoToDelete}
        <button>Save</button>
    {/if}
    
    {#if logoToDelete}
        <button formaction="?/logoDelete">Delete</button> <br> <br>
        <button on:click={cancelUpdates}>Abandonner</button>
    {/if}
    </form>
{/if}
{#if !isEdited}
    <HtmlO 
    label={`Project infos`}
    fct={editingSettings}
    >
        {#if logo}
            <img src={f.bannerResizeW(100, logo)} alt="logo">
        {:else}
            Pas de logo
        {/if}
    </HtmlO>
{/if}