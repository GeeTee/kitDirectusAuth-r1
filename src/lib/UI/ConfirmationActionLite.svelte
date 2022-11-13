<script>
    import {createEventDispatcher} from 'svelte'
    import { copy } from 'svelte-copy'
    import Modal from '$lib/UI/Modal.svelte'
    import Button from '$lib/UI/Button.svelte'

    export let title = 'Modal title'
    export let phrase ='phrase'
    export let openModal = false
    export let dangerWord = ''

    const dangerTexte = (str) => {
        if (typeof str !== 'string') return
        if (str !== '') {
            return `et <span class="tag is-warning">${str}</span>`
        }
        return ''
    }

    let warning = `
    <span style="color: yellow"><i class="fas fa-exclamation-triangle fa-2x"></i></span> : Détruire cet élément est <strong>IRRÉVERSIBLE ${dangerTexte(dangerWord)}</strong>. <br />
    Si vous y tenez, il vous faut recopier : <br /><span class="tag is-warning">${phrase} <i class="fa fa-clone fa-border" aria-hidden="true"></i>
    </span> <br />dans la champ ci dessous puis cliquer le bouton : Confirmer
    `
    let warningIntro = `<span style="color: yellow"><i class="fas fa-exclamation-triangle fa-2x"></i></span> Détruire cet élément est <strong>IRRÉVERSIBLE ${dangerTexte(dangerWord)}</strong>. <br />
    Si vous y tenez, il vous faut copier le mot dans le cadre jaune, puis le coller dans le champ <strong>Confirmer</strong>`

    let phraseInput = ''

    $: enabled = (phraseInput === phrase) ? true : false

    const dispatch = createEventDispatcher();

    const closeModale = () => {
        // openModal = false
        dispatch('leaving')
    }

    const confirmDeleting = () => {
        dispatch('confirmation')
        // openModal = false
    }


</script>
{#if openModal}
    <Modal 
    {title}
    on:cancelMod={closeModale}
    >
        <div class="notification is-danger">
            <p class="mb-1">{@html warningIntro}</p>
            <span 
            use:copy={phrase}
            class="tag is-warning has-text-weight-bold"
            >
                {phrase} 
                <i class="fa fa-clone fa-border is-clickable" aria-hidden="true"></i>
            </span>
            <div class="field">
                <label for="confirmation" class="label">Confirmer</label>
                <div class="control">
                    <input 
                    id="confirmation" 
                    class="input" 
                    class:is-warning={!enabled}
                    class:is-danger={enabled}
                    type="text" 
                    placeholder="Recopier ici" 
                    bind:value={phraseInput}
                    >
                </div>
            </div>
            <div class="field">
                <Button
                is-warning
                fct={confirmDeleting}
                {enabled}
                >
                    Confirmer
                </Button>
            </div>
        </div>
    </Modal>
{/if}