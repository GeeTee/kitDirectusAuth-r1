<script>
    import {createEventDispatcher} from 'svelte'
    import Modal from '$lib/UI/Modal.svelte'
    import Button from '$lib/UI/Button.svelte'

    export let title = 'Modal title'
    export let text = 'Description action'
    export let slug ='slug'

    export let openModal = false

    let slugInput = ''

    $: enabled = (slugInput === slug) ? true : false

    const dispatch = createEventDispatcher();

    const closeModale = () => {
        // openModal = false
        dispatch('leaving')
    }

    const confirmDeleting = () => {
        dispatch('confirmation')
        // openModal = false
    }

    // const checkVallidity = () => {
    //     if (slugInput === slug) {
    //         enabled = true
    //     }
    // }

</script>
{#if openModal}
    <Modal 
    {title}
    on:cancelMod={closeModale}
    >
        <div class="notification is-danger">
            {@html text}
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
                    bind:value={slugInput}
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