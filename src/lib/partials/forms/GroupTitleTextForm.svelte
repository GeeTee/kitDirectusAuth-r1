<script>
    import {createEventDispatcher} from 'svelte'
    import {goto} from '$app/navigation'
    import TextInput from "$lib/UI/TextInput.svelte"
    import NotificationM from '$lib/UI/elements/NotificationMotion.svelte'
    import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'

    const dispatch = createEventDispatcher()

    export let title = ''
    export let main_text = ''
    export let creatingArticle = true

    let titleBup = ''
    let main_textBup = ''
    if (title != '') {titleBup = title}
    if (main_text != '') {main_textBup = title}
    // console.log('Group title main text', {titleBup})

    const dangerIcon = '<span class="has-text-danger"><i class="fas fa-exclamation-triangle"></i></span>'

    $: titleValid = title !== '' ? true : false
    $: mainTextValid = main_text !== '' ? true : false

    $: disableConfirm = titleValid && mainTextValid
    const disableCancel = true 

    const canceling = () => {
        // console.log('canceling title main text')
        if (creatingArticle === true) {
            // console.log('creatingArticle canceling')
            goto('/backend/articles')
        } 
      if (creatingArticle === false) {
            // console.log('updatingArticle canceling')
            dispatch('canceling')
        } 
    }

    const saving = () => {
        // console.log('saving title main text', {title}, {main_text})
        let saveTitle = false 
        let saveMainText = false
        let updatedTitleMainText = {}
        if (title !== titleBup) {
            console.log('saving title', {title}, titleBup)
            updatedTitleMainText.title = title
            saveTitle = true
        }
        if (main_text !== main_textBup) {
            console.log('saving main_text', {main_text}, main_textBup)
            updatedTitleMainText.main_text = main_text
            saveMainText = true
        }

        dispatch('saving-title-maintext', {updatedTitleMainText})

    }

</script>

<TextInput
id="title"
label="Titre"
type="text"
valid={titleValid}
validityMessage="Entrez votre Titre"
controlType="input"
value={title}
on:input={event => (title = event.target.value)} 
/>
{#if title === '' && !creatingArticle}
        <NotificationM
        is-danger
        is-light
        mb-4
        heading='Attention'
        text={`${dangerIcon} Vous ne pouvez pas effacer le titre de l'article`}
        />
{/if}

<TextInput
    id="main-text"
    label="Text principal"
    valid={mainTextValid}
    validityMessage="Rédigez votre texte"
    controlType="textarea"
    bind:value={main_text}
    />
{#if main_text === '' && !creatingArticle}
    <NotificationM
    is-danger
    is-light
    mb-4
    heading='Attention'
    text={`${dangerIcon} Vous ne pouvez pas effacer le texte principal de l'article`}
    />
{/if}
<Buttons 
{disableConfirm}
{disableCancel}
whichComponent='TitleMainText'
cancelText='Abandonner'
saveText='Enregistrer'
on:button-canceling={canceling}
on:button-saving={saving}
/>