<script>
  import { createEventDispatcher } from "svelte";
  import {fly, fade} from "svelte/transition"
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  export let title;
  export let closeButtonTitle = 'Fermer'
  // export let buttonStyle = 'is-link'

  // BUTTON 
  const enabled = true

  function closeModal() {
    dispatch("cancelMod");
  }
</script>

<div transition:fade class="modal-backdrop" on:click={closeModal} />

<div transition:fly={{
  y:300
}} class="gt-modal">
  <h4 class="subtitle p-2">{title}</h4>
  <div class="content">
    <slot />
  </div>
  <footer>
    <slot name="footer">
      <Button 
      is-warning
      {enabled}
      fct={closeModal}
      >
        {closeButtonTitle}
      </Button>
    </slot>
  </footer>
</div>

<style>
  .subtitle:not(:last-child) {margin-bottom: 0;}
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .gt-modal {
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 1500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  h4 {
     padding: 1rem;
    /* margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: "Roboto Slab", sans-serif; */
  }

  .content {
    padding: 1rem;
  }

  footer {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .gt-modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
</style>
