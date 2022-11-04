<script>
  export let controlType = null;
  export let id;
  export let label;
  export let name;
  export let rows = null;
  export let value;
  export let type = "text";
  export let placeholder = null;
  export let valid = true;
  export let validityMessage = "";

  let touched = false;
</script>

<div class="field">
  <label class="label" for={id}>{@html label}</label>
  <div class="control">
    {#if controlType === 'textarea'}
    <textarea class="textarea" class:invalid={!valid && touched} {rows} {id} {placeholder} bind:value on:blur="{() => touched = true}" />
  {:else}
    <input class="input" class:invalid={!valid && touched} {name} {type} {id} {value} {placeholder} on:input on:blur="{() => touched = true}" />
  {/if}
  </div>
    <p class:dn={!(validityMessage && !valid && touched)} class="tag is-danger">{validityMessage}</p>
</div>

<style>
    .dn {
        visibility: hidden;
    }
</style>