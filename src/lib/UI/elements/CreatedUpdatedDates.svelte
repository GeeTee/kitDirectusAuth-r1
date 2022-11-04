<script>
    import { getContext } from 'svelte';
    import ShortDateFormatted from './ShortDateFormatted.svelte';
    export let date_created = null;
    export let date_updated = null;
    export let redactor = "Anonyme";
</script>
<div class="is-size-7">
par : {redactor} - {getContext('siteName')}, le <time datetime={date_created}><ShortDateFormatted datetime={date_created} /></time>
    {#if date_updated !== date_created}
        <br>mise à jour le <time datetime={date_updated}><ShortDateFormatted datetime={date_updated} /></time>
    {/if}
</div>