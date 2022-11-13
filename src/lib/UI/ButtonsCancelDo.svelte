<script>
    import {createEventDispatcher} from 'svelte'
    import Button from './Button.svelte'

    const dispatch = createEventDispatcher()

    export let enableDoing = false; 
    export let enableCanceling = false; 
    export let whichComponent = "null";
    export let cancelText = "Non merci, continuer";
    export let doText = "Enregistrer et continuer";
    export let isCentered = false;
    export let formactionSourceCanceling = false
    export let formactionSourceDoing = false
</script>

<div class="buttons" class:isCentered>
    <Button
    is-warning
    enabled={enableCanceling}
    formactionSource={formactionSourceCanceling}
    fct={
        () => {
            // alert('button-canceling' + whichComponent)
            dispatch('button-canceling', {component: whichComponent, action: "cancel"})
        }
    }
    >
        {cancelText} 
    </Button>
    <Button
    is-success
    formactionSource={formactionSourceDoing}
    enabled={enableDoing}
    fct={
        () => {
            // alert('button-doing' + whichComponent)
            dispatch('button-doing', {component: whichComponent, action: "do"})
        }
    }
    >
        {doText} 
    </Button>
</div>

<style>
    .buttons.isCentered {
        justify-content: center;
    }
</style>