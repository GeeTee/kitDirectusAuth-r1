<script>
    export let fct;
    export let fctDel;
    // export let editing = false
    export let creating = false
    export let deleting = false
    let classBase = ["actions", "ml-3"]
	// console.log($$restProps)
	for (const key in $$restProps) {
		if(!classBase.includes('key')) {
			classBase.push(key)
		}
	}
	// console.log({classBase})
	let classL = classBase.join(' ')
	// console.log({classL})
	// console.log(fct)
</script>

<div 
class={classL}
>
    <span
    on:click={fct}
    >
    {#if creating}
        <i class="fas fa-plus-circle has-text-primary"></i>
    {:else}
        <i class="fas fa-pen-square has-text-info"></i>
    {/if}
    </span>
    {#if deleting}
        <span
        on:click={fctDel}
        ><i class="fas fa-trash-alt has-text-danger"></i>
        </span>
    {/if}
</div>

<style lang="scss">
    .actions {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
            &:first-child {
                margin-bottom: 0.5rem;
            }
        }
    }
    i:hover {
        cursor: pointer;
    }
</style>