<script>
    import {createEventDispatcher, onDestroy, beforeUpdate, tick} from 'svelte'
    import Button from '$lib/UI/Button.svelte'
    import Youtube from "$lib/partials/videos/Youtube.svelte"
    import Modal from '$lib/partials/videos/ModalVideo.svelte'
    import Confirmation from '$lib/UI/ConfirmationActionLite.svelte'

    export let video_title = null
    export let video_url = null
    export let video_position = null
    export let id = null
    export let forBlock = false
    export let needVideoPosition = true
    export let onlyAddVideoToGallery = false

    const dispatch = createEventDispatcher();

    let updatingVideo = false
    let openModal = false
    let videoInfos = {} // UPDATING DELETING VIDEO
    $: modalTitle = video_url ? 'Modifier le titre ou le lien de vidéo' : 'Ajouter une vidéo'

    // VARS CONFIRMATION DELETE VIDEO
    let openVideoConfirm = false
    const openingConfirmVideoMal = () => {
        console.log(('openingConfirmVideoMal'))
        openVideoConfirm = true
    }
    console.log('EditVideo', {video_url})

    onDestroy(
        () => {
            id = null
            video_title = null
            video_url = null
            video_position = ''
            updatingVideo = false
        }
    )

    // FUNCTIONS

    const closeModale = () => {
        openModal = false
        // dispatch('leaving')
    }

    const editVideo = () => {
        openModal = true
    }
    
    const getVideoInfos = (e) => {
        console.log('getVideoInfos EditVidéo 1', e.detail)
        videoInfos = e.detail 
        updatingVideo = true
        console.log('getVideoInfos EditVidéo 2', {videoInfos}, {onlyAddVideoToGallery}) 
        dispatch('updating-video', videoInfos)
    }

    const deletingVideo = () => {
        if (!forBlock) {
            // console.log('delete-video gallery')
            dispatch('delete-video', {id})
        }
        if (forBlock) {
            console.log('delete-video forBlock')
            video_title = null 
            video_url = null 
            video_position = null
            dispatch('delete-video')
        }
        openVideoConfirm = false
    }
</script>
{#if onlyAddVideoToGallery}
    <span class="label">Ajouter une vidéo à la galerie</span>
{/if}
{#if !onlyAddVideoToGallery}
    <span class="label">Gérer la vidéo</span>
{/if}

<!-- {video_url} -->

{#if video_url}
    {#if !updatingVideo}
        <Youtube {video_url} {video_title} />  
    {/if}

    {#if updatingVideo}
        <Youtube video_url={videoInfos.video_url} video_title={videoInfos.video_title} />  
    {/if}

    <Confirmation
    openModal={openVideoConfirm}
    title={`Détruire la vidéo`}
    phrase='détruire'
    on:confirmation={deletingVideo}
    on:leaving={
        () => openVideoConfirm = false
    } 
    />

{/if}

{#if !video_url && !onlyAddVideoToGallery}
    <span class="has-text-info">Actuellement pas / plus de vidéo installée</span>
{/if}
<div class="buttons my-3">
    {#if video_url} 
        <Button
        is-info
        is-outlined
        enabled={true}
        fct={editVideo}
        >
            <span class="icon is-small"><i class="fas fa-wrench"></i></span>
            <span>Modifier</span>
        </Button>
        <Button
        is-danger
        is-outlined
        enabled={true}
        fct={openingConfirmVideoMal}
        >
            <span class="icon is-small"><i class="fas fa-video-slash"></i></span>
            <span>Détruire</span>
        </Button>
    {/if}
    {#if !video_url}
        <Button
        is-primary
        is-outlined
        enabled={true}
        fct={editVideo}
        >
            <span class="icon is-small"><i class="fas fa-film"></i></span>
            <span>Ajouter une vidéo</span>
        </Button>
    {/if}
</div>
{#if openModal}
<Modal
title={modalTitle}
closeButtonTitle='Abandonner'
{id}
{video_title}
{video_url}
{video_position}
{needVideoPosition}
{forBlock}
on:save-new-video
on:update-video={getVideoInfos}
on:save-video-in-block={getVideoInfos}
on:cancelMod={closeModale}
/>
{/if}
