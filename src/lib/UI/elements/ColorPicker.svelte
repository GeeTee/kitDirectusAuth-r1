<script>
    import {createEventDispatcher, onDestroy} from 'svelte'
	import Buttons from '$lib/UI/ButtonsCancelConfirm.svelte'
	import ColorPicker, {CircleVariant} from 'svelte-awesome-color-picker';

	const dispatch = createEventDispatcher()

	export let hex = '' // or hsv or hex
	export let label = 'test'

    let disableConfirm = true; 
    let disableCancel = true; 


	console.log('colorPicker start', {label}, {hex})

    const cancelColor = () => {
        console.log('cancelColor')
        dispatch('cancel-color')
    }
    const saveColor = () => {
        console.log('saveColor', {hex})
		dispatch('save-color', {label, hex})
    }

	onDestroy(
		() => {
			hex = ''
			label = 'test'
		}
	)

</script>

<ColorPicker 
{label} 
toRight={true}
components={{...CircleVariant}}
bind:hex 
/>

<Buttons
cancelText='Abandonner'
saveText='Enregistrer'
{disableConfirm}
{disableCancel}
on:button-canceling={cancelColor}
on:button-saving={saveColor}
/>