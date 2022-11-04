<script>
    import { goto } from '$app/navigation'

    export let linkDirection = "back";
    export let linkValue = "#";
    export let linkLibelle = null;


function backToPage() {
		goto(`/${linkValue}`);
    }
async function goToLogOut() {
    goto('/logout');
}
</script>

{#if linkDirection === "back"}
     <span class="icons-links" on:click={backToPage}><i class="fas fa-long-arrow-alt-left"></i> <span class="back-label">
        {#if linkLibelle}
             {linkLibelle}
        {:else}
             {linkValue}
        {/if}
     </span>
    </span>
{:else if linkDirection === "to"}
     <span class="icons-links" on:click={backToPage}>
         <span class="back-label">
             {#if linkLibelle}
                {linkLibelle}
            {:else}
                {linkValue}
            {/if}
         </span>
         <i class="fas fa-long-arrow-alt-right"></i> 
        </span>
{:else if linkDirection === "link-to-page"}
     <span class="icons-links" on:click={backToPage}>
         <span class="to-label">
             {#if linkLibelle}
                {linkLibelle}
            {:else}
                {linkValue}
            {/if}
         </span>
         <i class="fas fa-external-link-alt"></i> 
        </span>
{:else if linkDirection === "logout"}
     <span class="icons-links" on:click={goToLogOut}>
         <span class="to-label">
             {#if linkLibelle}
                {linkLibelle}
            {:else}
                {linkValue}
            {/if}
         </span>
         <i class="fas fa-sign-out-alt"></i> 
        </span>
{:else if linkDirection === "dashboard"}
     <span class="icons-links" on:click={backToPage}>
         <i class="fas fa-tachometer-alt"></i> 
         <span class="back-label">
             {#if linkLibelle}
                {linkLibelle}
            {:else}
                {linkValue}
            {/if}
         </span>
        </span>
{:else if linkDirection === "login"}
     <span class="icons-links" on:click={backToPage}>
         <span class="to-label">
             {#if linkLibelle}
                {linkLibelle}
            {:else}
                {linkValue}
            {/if}
         </span>
         <i class="fas fa-sign-in-alt"></i>
        </span>
{/if}

<style>
	.icons-links {
		align-items: center;
		color: tomato;
		display: flex;
		/* justify-content: flex-end; */
	}
	.icons-links:hover {
		cursor: pointer;
	}
    .to-label,
    .back-label {
        color: dodgerblue;
    }
    .to-label {
        margin-right: .5rem;
    }
    .back-label {
        margin-left: .5rem;
    }
</style>