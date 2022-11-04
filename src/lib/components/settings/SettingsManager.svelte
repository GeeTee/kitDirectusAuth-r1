<script>
     import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import TextInput from "$lib/UI/TextInput.svelte"
    import HtmlO from "$lib/UI/EditableHtml-0.svelte"
	import ManagingOneImg from '$lib/components/images/ManagingOneImg.svelte'
    import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'

    const dispatch = createEventDispatcher()

    export let itemToEdit = null   

    let full_name = ''
    let avatar = ''
    let job = ''
    let speech_about = ''

    let itemBup = {}

    let full_nameValid = true
    let jobValid = true
    let speech_aboutValid = true

    if (itemToEdit) {
        itemBup = {...itemToEdit}
        full_name = itemToEdit.full_name
        avatar = itemToEdit.avatar
        job = itemToEdit.job
        speech_about = itemToEdit.speech_about
    }

    let isEdited = false
    let disableConfirm = true; 
    let disableCancel = true; 

    const editingSettings = () => isEdited = true

    const cancelUpdates = () => {
        console.log('cancelUpdates')
        isEdited = false
    }
    const saveUpdates = () => {
        const itemUpdated = {...itemBup}
        console.log('saveUpdates')
        if (itemBup.full_name !== full_name) {
            console.log('saveUpdates', {full_name})
            itemUpdated.full_name = full_name
        }
        if (itemBup.job !== job) {
            console.log('saveUpdates', {job})
            itemUpdated.job = job
        }
        if (itemBup.speech_about !== speech_about) {
            console.log('saveUpdates Manager', {speech_about})
            itemUpdated.speech_about = speech_about
        }
        if (itemBup.avatar !== avatar) {
            console.log('saveUpdates Manager', {avatar})
            itemUpdated.avatar = avatar
        }
        console.log('saveUpdates Manager',{itemUpdated})  
        dispatch('save-item-updated', itemUpdated)
        isEdited = false
    }
    const gettingImg = (e) => {
        console.log('gettingImg Manager', e.detail)
        avatar = e.detail.cld_public_id
        console.log('gettingImg Manager', {avatar})
    }
</script>

{#if isEdited}
    <TextInput
    id="full-name"
    label="Nom complet"
    type="text"
    valid={full_nameValid}
    validityMessage="Entrez votre prénom et votre nom de famille"
    controlType="input"
    value={full_name}
    on:input={event => (full_name = event.target.value)} 
    />

    <TextInput
    id="job"
    label="Métier"
    type="text"
    valid={jobValid}
    validityMessage="Entrez votre prénom et votre nom de famille"
    controlType="input"
    value={job}
    on:input={event => (job = event.target.value)} 
    />

    <TextInput
    id="speech-about"
    label="Text principal"
    valid={speech_aboutValid}
    validityMessage="Rédigez votre texte"
    controlType="textarea"
    bind:value={speech_about}
    />

    <ManagingOneImg 
    cld_public_id={avatar} 
    uploadPreset='Actibenne-avatars'
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
    label={`Manager infos`}
    fct={editingSettings}
    >
        <ul>
            <li>{full_name}</li>
            {#if avatar}
                <li><img src={f.bannerResizeW(100, avatar)} alt="avatar"></li>
            {:else}
            <li>Pas d'avatar</li>
            {/if}
            <li>{job}</li>
            {#if speech_about}
                <li><div>{@html speech_about}</div></li>
            {/if}
        </ul>
    </HtmlO>
{/if}