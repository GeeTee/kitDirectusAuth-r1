<script>
    import {createEventDispatcher} from 'svelte'
    import Button from './Button.svelte'

    const dispatch = createEventDispatcher()

    export let disableConfirm = false; 
    export let disableCancel = false; 
    export let whichComponent = "";
    export let cancelText = "Non merci, continuer";
    export let saveText = "Enregistrer et continuer";
    export let isCentered = false;
</script>

<div class="buttons" class:isCentered>
    <Button
    is-warning
    enabled={disableCancel}
    fct={() => dispatch('button-canceling', {component: whichComponent, action: "cancel"})}
    >
        {cancelText} 
    </Button>
    <Button
    is-success
    enabled={disableConfirm}
    fct={() => dispatch('button-saving', {component: whichComponent, action: "save"})}
    >
        {saveText} 
    </Button>
</div>

<style>
    .buttons.isCentered {
        justify-content: center;
    }
</style>