<script>
    import { writable } from 'svelte/store'
    import {createEventDispatcher, onDestroy} from 'svelte'
    import EditVideo from '$lib/partials/videos/EditVideo.svelte'
    import Button from '$lib/UI/Button.svelte'

    export let gallery_videos = []
    export let galleryVideosBup = []

    const dispatch = createEventDispatcher();
 
    // STORES
    let videos = writable([])

    if (gallery_videos.length > 0) {
        videos.set(gallery_videos)
        console.log('get gall', {gallery_videos}, $videos)
    }

    onDestroy(
        () => {
            gallery_videos = []
            videos.set([])
        }
    )

    const saveNewGalleryVideos = () => {
        console.log('saveNewGalleryVideos //', {gallery_videos})
        // dispatch('save-updated-video')
        dispatch('save-updated-gallery', gallery_videos)
    }

    //  $: console.log('XXXXXXXX',{galleryVideosBup})

    const cancelModifGalleryVideos = () => {
        console.log('cancelModifGalleryVideos //1', {galleryVideosBup}, {gallery_videos})
        if (gallery_videos !== galleryVideosBup) {
            gallery_videos = []
            gallery_videos = [...galleryVideosBup]
            resetStoreVideos(galleryVideosBup)
        }
        console.log('cancelModifGalleryVideos //2', {galleryVideosBup}, {gallery_videos})
        dispatch('cancel-modif')
    }

    const saveNewVideo = (e) => {
        console.log('saveNewVideo', e.detail)
        gallery_videos.push(e.detail)
        resetStoreVideos(gallery_videos)
    }

    // $: console.log('TTTTTTTTTTTTT',{gallery_videos})

    const updatingVideo = (e) => {
        // console.log('updatingVideo -1 //', {gallery_videos})
        // console.log('updatingVideo 0 //', e.detail)
        const {id, video_title, video_url} = e.detail
        // console.log('updatingVideo 1 //', {id}, {gallery_videos})
        const idx = gallery_videos.findIndex(item => item.id === id)
        const updatedItem = gallery_videos[idx]
        if (video_title !== updatedItem.video_title) {updatedItem.video_title = video_title}
        if (video_url !== updatedItem.video_url) {updatedItem.video_url = video_url}
        // console.log('updatingVideo 2 //', {updatedItem}, {gallery_videos})
        resetStoreVideos(gallery_videos)
        // dispatch('video-updated-in-gallery', gallery_videos)
    }


    const deleteVideoInGallery = (e) => {
        const idToDelete = e.detail.id
        console.log('deleteVideoInGallery 0', {idToDelete})
        gallery_videos = gallery_videos.filter(video => video.id !== idToDelete)
        resetStoreVideos(gallery_videos)
        console.log('deleteVideoInGallery 1', {gallery_videos})
    }

    const resetStoreVideos = (arr) => {
        if (!Array.isArray(arr)) {return}
        videos.set([])
        videos.set(arr)
    }

</script>
{#if $videos.length > 0}
    <p class="label">Gérer la galerie Vidéos ({$videos.length})</p>
{:else}
    <p class="label">Alimenter la galerie vidéos</p>
{/if}
{#if $videos.length > 0 }
    <ol>
        {#each $videos as {video_url, video_title, id} (id)}
            <li> 
                <div>
                    <EditVideo 
                    {video_title} 
                    {video_url} 
                    {id}
                    needVideoPosition={false} 
                    on:updating-video={updatingVideo}
                    on:delete-video={deleteVideoInGallery}
                    />
                </div>
            </li>
        {/each}
    </ol>
    <div>
        <EditVideo 
        onlyAddVideoToGallery={true}
        needVideoPosition={false} 
        on:save-new-video={saveNewVideo}
        />
    </div>
    <div class="buttons">
        <Button
        is-primary
        enabled={true}
        fct={saveNewGalleryVideos}
        >
            Enregistrer la modif
        </Button>
        <Button
        is-info
        enabled={true}
        fct={cancelModifGalleryVideos}
        >
            Abandonner la modif
        </Button>
    </div>
{/if}

{#if $videos.length <= 0}
    <div>
        <EditVideo 
        onlyAddVideoToGallery={true}
        needVideoPosition={false} 
        on:save-new-video={saveNewVideo}
        />
    </div>
{/if}