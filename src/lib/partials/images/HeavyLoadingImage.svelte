<script>
    import {onMount} from 'svelte'
    import { fade, blur } from 'svelte/transition';
    import Spinner from '$lib/UI/elements/Spinner.svelte'

    export let src = ''
    export let alt = ''
    export let width = ''

	let loaded = false;
	let failed = false;
	let loading = true;
  let waiting = true

    onMount(
        () => {
            const img = new Image();
			img.src = src;
			// loading = true;
            
			img.onload = () => {
					loading = false;
					loaded = true;
          waiting = loading;
                    // console.log({loading}, {loaded})
			};
			img.onerror = () => {
					loading = false;
					failed = true;
                    // console.log({loading}, {failed})
			};
            
        }
    )
</script>
{#if waiting}
   <Spinner text='photo' />
{/if}
{#if loaded}
	<img transition:blur="{{amount: 10, duration: 1000}}" {src} {alt} {width} />
{:else if failed}
	<span class="title is-uppercase is-size-7">Désolé, <br />photo non disponible</span>
<!-- {:else if loading}
	<Spinner text='photo' /> -->
{/if}

<style lang="scss">
    img {
    object-fit: cover;
    pointer-events: none;
    width: 100%;
    height: auto;
    mix-blend-mode: overlay;
    } 
  @media(min-width: 768px) {
    img {
    height: 100%;
    }
  }
  span {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
