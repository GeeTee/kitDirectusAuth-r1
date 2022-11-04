<script>
    import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import TextInput from '$lib/UI/TextInput.svelte'
    import Button from '$lib/UI/Button.svelte'
    import Select from '$lib/UI/Select.svelte'
    import Notification from '$lib/UI/elements/NotificationMotion.svelte'
    import ImagUpload from '$lib/partials/images/cld/ImageUploadCld.svelte'
    import Content from '$lib/components/articles/BlockContent.svelte'
    import HtmlO from "$lib/UI/EditableHtml-0.svelte";
    import EditVideo from '$lib/partials/videos/EditVideo.svelte';
    import Confirmation from '$lib/UI/ConfirmationActionLite.svelte'

    const dispatch = createEventDispatcher();

    export let block
    export let updateBlock = false
    export let creatingBlock = false
    export let deletingBlock = false
    export let newMoreBlockInfo = 'Créer un block'

    const forBlock = true

    let isEdited = false
    // let showSavingWarning = false
    $: savingCreatingButtonText = creatingBlock ? 'Enregister' : 'Enregister la modif'


    let blockBup = {}
    let id = ''
    let title = ''
    let text = ''
    let image = ''
    let image_width = ''
    let image_height = ''
    let image_position = ''
    let video_title = null 
    let video_url = null
    let video_position = null

    const titleLabel = 'Titre du block <span class="has-text-info">(optionnel)</span>'
    const redactionLabel = 'Texte <span class="has-text-info">(optionnel)</span>'

    $: imagePositionEmpty = (image_position === '' || !image_position)? true : false
    $: titleEmpty = (typeof title !== 'string' || title === '')? true : false

    // VARS CONFIRMATIONS
    let openModal = false
    const openingModal = () => {
    openModal = true
    }

    if (block) {
        blockBup = {...block}
        id = block.id
        
        if (block.title) {
           title = block.title 
        }
        
        if (block.text) {
           text = block.text 
        }
        
        if (block.image) {
            image = block.image
            if (block.image_width) {
                image_width = block.image_width
            }
            if (block.image_height) {
                image_height = block.image_height
            }
            if (block.image_position) {
                image_position = block.image_position
            }
        }
        if (block.video_url) {
           video_url = block.video_url 
           if (block.video_title) {
            video_title = block.video_title
           } 
           if (block.video_position) {
            video_position = block.video_position
           }
        }
    } 

    const croppingAspectRatio = 1
    let dnBanner = true

    const selectItems = [
        {
            text: 'à droite',
            value: 'right'
        },
        {
            text: 'à gauche',
            value: 'left'
        },
        {
            text: 'au dessus',
            value: 'top'
        },
        {
            text: 'dessous',
            value: 'bottom'
        }
    ]

    if (!title) {
        title = ''
    }
    if (!text) {
        text = ''
    }

    const getIllustrationId = (e) => {
        image = e.detail.public_id
        console.log('getIllustrationId', {image})
    }

    const deleteIllustration = () => {
        console.log('deleteIllustration image 1 : ', {image})
        image = ''
        console.log('deleteIllustration image 2 : ', {image})
    }

    const getSelectedImgPosition = (e) => {
        const {selected} = e.detail
        console.log('getSelectedImgPosition ds block', {selected})
        image_position = selected
    }

    const saveVideo = (e) => {
        console.log('saveVideo Block', e.detail)
        video_title = e.detail.video_title
        video_url = e.detail.video_url
        video_position = e.detail.video_position
    }

    const deleteVideo = (e) => {
        console.log('deleteVideo Block')
        video_url = null
    }

    const saveBlock = () => {
        if (block) {
        console.log(('saveBlock updating block'), {blockBup})
        const blockWithChanges = {
            id,
        }
        //TODO:  MANAGING TITLE
        if (blockBup.title) {
            if (title) {
                if (blockBup.title !== title) {
                    blockWithChanges.title = title
                }
                if (blockBup.title === title) {
                    blockWithChanges.title = blockBup.title
                }
            }
        }
        if (!blockBup.title) {
            if (title) {
                blockWithChanges.title = title
            }
        }
        //TODO: MANAGING TEXT
        if (blockBup.text) {
            if (text) {
                if (blockBup.text !== text) {
                    blockWithChanges.text = text
                }
                if (blockBup.text === text) {
                    blockWithChanges.text = blockBup.text
                }
            }
        }
        if (!blockBup.text) {
            if (text) {
                blockWithChanges.text = text
            }
        }

        // MANANING ILLUSTRATION IMAGE

        console.log('saveBlock point img', {image}, 'blockBup.image :', blockBup.image)

        if (typeof blockBup.image === 'string' && blockBup.image !== '') {
            console.log('ON A BUP IMG', blockBup.image)

            if (image === '') { 
            console.log('on a enlevé l image et on confirme donc la supprimme', {image})
            f.deleteOneImg(f.slashToUnderscore(blockBup.image))
            // pas besoin de delete image, blockWithChanges est vide à la base !
            }

            if ( image !== '' && image !== blockBup.image) { 
            console.log('on a changé l image et on confirme. donc détruire le bup',blockBup.image)
            f.deleteOneImg(f.slashToUnderscore(blockBup.image))
            blockWithChanges.image = image
            blockWithChanges.image_width = image_width
            blockWithChanges.image_height = image_height
            // ON A PU CHANGER LA POSITION DE L'IMAGE
            if (image_position !== blockBup.image_position) {
                blockWithChanges.image_position = image_position
            } else{
            blockWithChanges.image_position = blockBup.image_position
            }
            }

            if ( image !== '' && image === blockBup.image) { 
            console.log('pas changé l image, on garde ',blockBup.image)
            // f.deleteOneImg(f.slashToUnderscore(blockBup.image))
            blockWithChanges.image = blockBup.image
            blockWithChanges.image_width = blockBup.image_width
            blockWithChanges.image_height = blockBup.image_height 
            // ON A PU CHANGER LA POSITION DE L'IMAGE
            if (image_position !== blockBup.image_position) {
                blockWithChanges.image_position = image_position
            } else{
            blockWithChanges.image_position = blockBup.image_position
            }
            }
        }

        if (!blockBup.image) {
            console.log('PAS DE BUP IMG')
            if ( image !== '') { 
            console.log('on ajoute une image, il n y en avait pas',{image} )
            blockWithChanges.image = image
            blockWithChanges.image_width = image_width
            blockWithChanges.image_height = image_height
            blockWithChanges.image_position = image_position            
            }

        }

        //TODO: MANAGING VIDEO
        if (blockBup.video_url) { // on a un vidéo ancienne
            console.log('on a un vidéo ancienne : ', blockBup.video_url, 'nouvelle : ', {video_url})
            if (video_url) { 
                if (blockBup.video_url !== video_url) { // on la change
                    blockWithChanges.video_url = video_url
                    if (video_title) {
                        blockWithChanges.video_title = video_title
                    }
                    if (video_position) {
                        blockWithChanges.video_position = video_position
                    }
                }
                if (blockBup.video_url === video_url) { // on change le title ou la position
                    blockWithChanges.video_url = blockBup.video_url
                    if (video_title) {
                        blockWithChanges.video_title = video_title
                    }
                    if (video_position) {
                        blockWithChanges.video_position = video_position
                    }
                }
                console.log('on a une vidéo ancienne \n on la remplace', {video_url}, {video_title}, {video_position})
            }
        }
        if (!blockBup.video_url) {
            console.log('on a pas de vidéo ancienne')
            if (video_url) {
                blockWithChanges.video_url = video_url
                if (video_title) {
                    blockWithChanges.video_title = video_title
                }
                if (video_position) {
                    blockWithChanges.video_position = video_position
                }
                console.log('on a pas de vidéo ancienne \n on en ajoute une', {video_url}, {video_title}, {video_position})
            }
        }

        console.log(('saveBlock updating Block'), {blockWithChanges})

        dispatch('update-block', {blockWithChanges})
        isEdited = false
        }

        if (!block) {
            console.log(('saveBlock creating block'))
            if (title === '' && text === '' && image === '') {
                showSavingWarning = true
            }
            let blockCreated = {}
            if (title !== '') {
                blockCreated.title = title
            }
            if (text !== '') {
                blockCreated.text = text
            }

            if (image !== '') {
                blockCreated.image = image
            }

            if (text !== '' && image !== '' && image_position !== '') {
                blockCreated.image_position = image_position
            }
            if (video_url) {
                blockCreated.video_url = video_url
                if (video_title) {
                    blockCreated.video_title = video_title
                }
                if (video_position) {
                    blockCreated.video_position = video_position
                }
            }
            blockCreated = {
                id: Date.now(),
                ...blockCreated
            }
            console.log(('saveBlock creating block', {blockCreated}))
            dispatch('save-new-block', {blockCreated})
            isEdited = false
        }
    }

    const enableModalToDelete = () => {
        console.log(' enableModalToDelete in Block', {id})
        openModal = true
        // dispatch('deleting-this-block', {id})
    }

    const cancelModifBlock = () => {
        if (block) {
            if (blockBup.title) {
                title = blockBup.title
            }
            if (blockBup.text) {
                text = blockBup.text
            }
            if (blockBup.image) {
                image = blockBup.image
                if (blockBup.image_width) {
                    image_width = blockBup.image_width
                }
                if (blockBup.image_height) {
                    image_height = blockBup.image_height
                }
                if (blockBup.image_position) {
                    image_position = blockBup.image_position
                }
            }
            if (blockBup.video_url) {
                video_url = blockBup.video_url
                if (blockBup.video_title) {
                    video_title = blockBup.video_title
                }
                if (blockBup.video_position) {
                    video_position = blockBup.video_position
                }
            }
        

        console.log('cancelModifBlock updating', {block})
        }
        if (!block) {
            block = {}
            title = ''
            text = ''
            image = ''
            image_width = ''
            image_height = ''
            image_position = ''
            video_url = ''
            video_title = ''
            video_position = ''
            console.log('cancelModifBlock creating', {block})
        }
        isEdited = false
    }
</script>

{#if updateBlock}
    {#if isEdited}
        <div class="has-background-warning-light block">
            {#if id}
                <p>id: {id}</p>
            {/if}
            <TextInput
            id="subtitle"
            label={titleLabel}
            type="text"
            validityMessage="Entrez votre Titre"
            controlType="input"
            bind:value={title}
            on:input={event => (title = event.target.value)} />

            <TextInput
            id="redaction"
            label={redactionLabel}
            validityMessage="Entrez votre Titre"
            controlType="textarea"
            bind:value={text}
            />

            <div>
                {#if image}
                    <span class="label">Image illustrant ce block</span>
                {:else}
                    <span class="label">Ajouter une image à ce block <span class="has-text-info">(optionnel)</span></span>
                {/if}
                <div class="columns">
                    <div class="column">
                        {#if image}
                            <ImagUpload 
                            cld_public_id={image} 
                            {croppingAspectRatio} 
                            buttonText='Remplacer'
                            buttonTextDelete={`Détruire l'image`}
                            isOutlined={true}
                            imageInstalled={true} 
                            showDeleteImg={true}
                            uploadPreset='Actibenne_illustrations' 
                            dispatchTitle='renew-illustration-id'
                            dn={dnBanner}
                            imgResize={f.imgSquareW}
                            w=200
                            on:renew-illustration-id={getIllustrationId}
                            on:delete-img={deleteIllustration}
                            />
                        {:else}
                            <ImagUpload 
                            buttonText='Choisir' 
                            {croppingAspectRatio}
                            isOutlined={true}
                            uploadPreset='Actibenne_illustrations' 
                            dispatchTitle='get-new-illustration-id'
                            on:get-new-illustration-id={getIllustrationId}
                            />
                        {/if}
                    </div>
                    <div class="column">
                        <span class="label">Position de l'image par rapport au texte</span>
                        <Select 
                        {selectItems} 
                        selected={image_position}
                        on:get-selected={getSelectedImgPosition}
                        />
                        {#if imagePositionEmpty}
                            <Notification 
                            mt-3
                            is-info
                            is-light
                            text='par défaut : image à gauche du texte' 
                            />
                        {/if}
                    </div>
                </div>
            </div>

            <div>
                <EditVideo 
                {video_url} 
                {video_title} 
                {video_position} 
                {forBlock}
                on:updating-video={saveVideo}
                on:delete-video={deleteVideo}
                />
            </div>

            <div class="buttons">
                    <Button
                    is-primary
                    enabled={true}
                    fct={saveBlock}
                    >
                        {savingCreatingButtonText}
                    </Button>

                <Button
                is-info
                enabled={true}
                fct={cancelModifBlock}
                >
                    Fermer / Abandonner
                </Button>
            </div>
        </div>
    {/if}
    {#if !isEdited}
        <HtmlO
        label='Block de rédaction'
        fct={() => {
                isEdited = true
                console.log('open block', {block})
            }}
        creating={creatingBlock}
        deleting={deletingBlock}
        fctDel={enableModalToDelete}
        >
        {#if block}
            <Content {block} />
        {/if}
        {#if !block}
            {newMoreBlockInfo}
        {/if}
        </HtmlO>

        <Confirmation
        {openModal}
        title={`Détruire ce block`}
        phrase='détruire'
        on:confirmation={() => {
            console.log('deleting-this-block')
            dispatch('deleting-this-block', {id})
            openModal = false
        }}
        on:leaving={
            () => openModal = false
        } 
        />
    {/if}
{/if}
{#if !updateBlock}
     <Content {block} />
{/if}


