<script>
    import {beforeNavigate} from '$app/navigation'
    import f from '$lib/helpers/scripts'
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
	import ManagingOneImg from '$lib/components/images/ManagingOneImg.svelte'
    import Buttons from '$lib/UI/ButtonsCancelDo.svelte'

    beforeNavigate(
        () => console.log('beforeNavigate')
    )

    export let logoData = null
    $: logo = logoData ?? null
    $: logoBup = logoData ?? null

    $: enableDoing = logo? true : false
    $: enableCanceling = logo? true : false

    // $: console.log('$: SETTINGLOGO', {logo}, {logoBup}, {logoToDelete})

    let logoToDelete = null
    let action = null

    let doText='Confirmer'
    let cancelText='Abandonner'

    let isEdited = false

    const editingSettings = () => isEdited = true

    const cancelUpdates = async (e) => {
        action = await e.detail.action

        if (logoBup && logo === logoToDelete) logo = logoBup

        if (!logoBup && logo ) {
            logoToDelete = logo
            logo = null
        }

        if (logo !== logoBup && !logoToDelete) {
            logoToDelete = logo
            logo = logoBup
        }

    }

    const checkUpdates = async (e) => {
        action = await e.detail.action

        if (logoBup && logo === logoToDelete) logoToDelete = logoBup

        if (logo !== logoBup && !logoToDelete) logoToDelete = logoBup

    }

    const logoDeleting = (e) => {
        logoToDelete = e.detail
        logo = null
    }

    const gettingImg = (e) => { // in form preview
        logo = e.detail.cld_public_id
        console.log('SETTINGLOGO gettingImg', {logo}, {logoToDelete}, {logoBup})
    }

</script>

{#if isEdited}
    <ManagingOneImg 
    choisirText='Sélectionner un logo'
    w=150
    cld_public_id={logo} 
    uploadPreset='Actibenne-logo'
    showDeleteImg={true}
    on:get-img={gettingImg}
    on:delete-img={logoDeleting}
    />


    <form method="POST" action="?/logoSettings">

    <input 
    type="hidden" 
    name="action" 
    id="action"
    value={action}
    >

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

    <input 
    type="hidden" 
    name="logoBup" 
    id="logoBup"
    value={logoBup}
    >

    <Buttons 
    {doText}
    {cancelText}
    {enableDoing}
    {enableCanceling}
    whichComponent='SettingLogo'
    on:button-canceling={cancelUpdates}
    on:button-doing={checkUpdates}
    />
    </form>
{/if}
{#if !isEdited}
    <HtmlO 
    label={`Project logo`}
    fct={editingSettings}
    >
        {#if logo}
            <img src={f.bannerResizeW(100, logo)} alt="logo">
        {:else}
            Pas de logo
        {/if}
    </HtmlO>
{/if}