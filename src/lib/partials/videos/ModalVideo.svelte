<script>
  import { createEventDispatcher } from "svelte"
  import { fly, fade } from 'svelte/transition'
  import f from '$lib/helpers/scripts'
  import Button from "$lib/UI/Button.svelte"
  import Select from '$lib/UI/Select.svelte'
  import Notification from '$lib/UI/elements/NotificationMotion.svelte';

  const dispatch = createEventDispatcher();

  export let title;
  export let closeButtonTitle = 'Fermer'
  export let id = null
  export let video_title = ''
  export let video_url = ''
  export let video_position = ''
	export let needVideoPosition = true
  export let forBlock = false

  $: video_titleValid = (typeof video_title === 'string' && video_title !== '') ? true : false 
  $: video_urlValid = (typeof video_url === 'string' && video_url !== '') ? true : false
  $: video_urlValidCode = (f.isYouTube(video_url)) ? true : false
  $: formValid = video_urlValid && video_urlValidCode

  // BUTTON 
  // const enabled = 

  // SELECT
  const selectItems = [
      {
          text: 'au dessus',
          value: 'top'
      },
      {
          text: 'dessous',
          value: 'bottom'
      }
  ]

  const getVideoPosition = (e) => {
      const {selected} = e.detail
      console.log('getSelectedvideo_position ds block', {selected})
      video_position = selected       
  }

  const savingVideo = () => {
    console.log('savingVideo ModalVidéo',{id}, {video_title}, {video_url}, {video_position})
    
    if (id) { // UPDATE VIDEO IN GALLERY
      if (needVideoPosition) {
        dispatch('update-video', {id, video_title, video_url, video_position})
      }
      if (!needVideoPosition) {
        dispatch('update-video', {id, video_title, video_url})
      } 
    }
   
    if (!id) { // CREATE VIDEO IN GALLERY 
      id = Date.now()
      if (needVideoPosition) {
        dispatch('save-new-video', {id, video_title, video_url, video_position})
      }
      if (!needVideoPosition) {
        dispatch('save-new-video', {id, video_title, video_url})
      } 
    }
    if (forBlock) { // VIDEO IN BLOCK
      console.log('VIDEO IN BLOCK',{id}, {video_title}, {video_url}, {video_position})
      dispatch('save-video-in-block', {video_title, video_url, video_position})
    }
    closeModal()
  }

  const closeModal = () => {
    dispatch("cancelMod");
  }
</script>

<div transition:fade class="modal-backdrop" on:click={closeModal} />

<div transition:fly={{
  y:300
}} class="gt-modal">
  <h4 class="subtitle p-2">{title}</h4>
  <div class="p-3">
    <div class="notification is-info is-light">
          <div class="field">
          <label for="video-title" class="label">titre de la vidéo <span class="has-text-success">(optionnel)</span></label>
          <div class="control">
              <input 
              id="video-title" 
              class="input" 
              class:is-info={!video_titleValid}
              class:is-success={video_titleValid}
              type="text" 
              placeholder="Noter un titre" 
              bind:value={video_title}
              >
          </div>
        </div> 
        <div class="field">
            <label for="video-url" class="label">Url de la vidéo <span class="has-text-danger">(indispensable)</span></label>
            <div class="control">
                <input 
                id="video-url" 
                class="input" 
                class:is-danger={!video_urlValid}
                class:is-success={video_urlValid}
                type="text" 
                placeholder="Recopier ici l'url YouTube de la vidéo" 
                bind:value={video_url}
                >
            </div>
        </div>
            {#if !video_urlValidCode}
              <Notification
              is-danger
              is-light
              text="L'Url de la vidéo n'est pas valide"
              />
            {/if}
            {#if !video_urlValid}
              <Notification
              is-danger
              is-light
              text='Obligatoire : url vidéo'
              />
            {/if}   
        {#if needVideoPosition}
          <div class="field">
              <label for="video-url" class="label">Position de la vidéo</label>
              <div class="control">
                  <Select 
                  {selectItems} 
                  selected={video_position}
                  on:get-selected={getVideoPosition}
                  />
              </div>
          </div>
        {/if}
    </div>
    {#if needVideoPosition && !video_position}
      <Notification
      is-info
      is-light
      text='Si vous ne choisissez pas de position de la vidéo par rapport au text => elle sera installée automatiquement sous le texte'
      />
    {/if}
    <div class="buttons">
      <Button
      is-info
      is-outlined
      enabled={formValid}
      fct={savingVideo}
      >
          <span class="icon is-small"><i class="fas fa-film"></i></span>
          <span>Enregistrer</span>
      </Button>
    </div>
  </div>
  <footer>
    <slot name="footer">
      <Button 
      is-warning
      enabled={true}
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

  footer {
    padding: 1rem;
  }

  .buttons {
    border-top: 1px solid transparent;
  }

  @media (min-width: 768px) {
    .gt-modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
</style>
