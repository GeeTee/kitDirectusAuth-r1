<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();

    export let tel = ''
    export let telVal = ''
    export let email = ''

    const toggleMailAction = () => {
        console.log('Button toggleMailAction')
        dispatch('toggleMailAction')
    }
</script>
<div class="gtbuttons mt-3">
    {#if tel !== '' && tel !== null}
         <a class="button is-link" href="tel:{telVal}">{tel}</a>
    {/if}
    {#if email !== '' && email !== null}
         <button class="button is-info" on:click|preventDefault={toggleMailAction}>{email}</button>
         <!-- <a class="button is-info" href="mailto:{email}">{email}</a> -->
    {/if}
</div>

<style lang="scss">
    .gtbuttons {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 0 !important;
        order: 2;
        > .button {
            margin: 0.2rem !important;
        }
    }
</style>