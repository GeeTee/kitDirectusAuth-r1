<script>
    // import ar from '$lib/stores/articlesStore'
    import { writable } from 'svelte/store'
    import { getContext, onDestroy } from "svelte";
    import { goto } from '$app/navigation'

    import slugify from 'slugify'

    import f from '$lib/helpers/scripts'

    // import TextInput from "$lib/UI/TextInput.svelte";
    import HtmlO from "$lib/UI/EditableHtml-0.svelte";
    import GroupTitleTextForm from '$lib/partials/forms/GroupTitleTextForm.svelte';
    import Block from "$lib/UI/Block.svelte";
    import ImagUpload from '$lib/partials/images/cld/ImageUploadCld.svelte'
    import GallUpload from '$lib/partials/images/cld/GalleryImgsUploadCld.svelte'
    import ThumbsGallery from '$lib/partials/images/ThumbsGallery.svelte'
    import Button from '$lib/UI/Button.svelte'
    // import ButtonsCancelConfirm from '$lib/UI/ButtonsCancelConfirm.svelte'
    import Confirmation from '$lib/UI/ConfirmationActionLite.svelte'
    import Notification from '$lib/UI/elements/NotificationDetails.svelte'
    // import NotificationM from '$lib/UI/elements/NotificationMotion.svelte';
    import IconsLinks from '$lib/UI/actionsIcones/IconsLinks.svelte'
    import GalleryVideos from '$lib/partials/videos/GalleryVideos.svelte'
    import GalleryVideosUpload from '$lib/partials/videos/GalleryVideosUpload.svelte'

    export let itemToEdit = undefined
    export let canDeleteArticle = true
    export let newArticle = false 
    export let creatingArticle = true
    export let gVBup = []

    const directus = getContext('directus')
    const articles = directus.items('advanced_articles')

    // STORES
    let parts = writable([])
    // let videos = writable([])

    // ITEM TO EDIT OR NEW
    let id = ''
    let title = ''
    let main_text = ''
    let slug = '' //TODO: => ?????? 
    let cld_public_id = ''
    let blocks = []
    let gallery_photos = []
    let gallery_videos = []
    // UTILITIES
    let itemBup = {}
    let thumbGallery= []
    let imgsKept = []
    let imgsToDelete = []
    // slugify 
    const options = {
        lower: true
    }
    const croppingAspectRatio = 1.385

    // VARS ICONLINKS
    // linkValue dans if itemToEdit
    let linkValue = ''
    const linkLibelle = 'Article pubié'
    const linkDirection = 'to'

    // VARS NOTIFICATIONS
    const headingNotifItemToEditDefault = 'ici, vous pouvez'
    const textNotifItemToEditDefault = `
    <ul class="subtitle">
        <li>Compléter votre article</li>
        <li>Le modifier</li>
        <li>Le détruire définitivement</li>
    </ul>
    `
    const textNotifItemCreatingStep1 = `
    <span class="has-text-primary"><i class="fas fa-user-edit fa-2x"></i></span> Ici première étape pour créer un article <br/>vous effectuez les deux étapes obligatoires : <br /><br />
    <ul class="subtitle">
        <li>Renseigner le titre</li>
        <li>Rédigez le rédactionnel principal</li>
    </ul>
    Puis Enregistrez et laissez vous guider
    `
    const headingNotifItemCreatingStep2 = 'Deuxième étape'
    const textNotifItemCreatingStep2 = `
    <span class="has-text-success"><i class="fas fa-thumbs-up fa-2x"></i></span> <strong>Bravo vous venez de créer un nouvel article!</strong>, <br />maintenant, vous pouvez lui ajouter :  <br /><br />f
    <ul class="subtitle">
        <li>Une image de bannière</li>
        <li>Un (des) block(s) de texte agrémentés ou non d'image</li>
        <li>Une galerie image </li>
    </ul>
    `
    $: textNotifItemToEdit = newArticle ? textNotifItemCreatingStep2 : textNotifItemToEditDefault
    $: headingNotifItemToEdit = newArticle ? headingNotifItemCreatingStep2 : headingNotifItemToEditDefault

    const dangerIcon = '<span class="has-text-danger"><i class="fas fa-exclamation-triangle"></i></span>'

    // VARS CONFIRMATIONS
    let openGalleryModal = false
    let openGalleryVideosModal = false
    let openBannerModal = false
    let openDangerModal = false
    const openingGalleryModal = () => {
    // console.log('openingGalleryModal')
    openGalleryModal = true
    }
    const openingBannerModal = () => {
        // console.log('openingBannerModal')
        openBannerModal = true
    }
    const openingDangerModal = () => {
        // console.log('openingDangerModal')
        openDangerModal = true
    }
    const openingGalleryVideosModal = () => {
    console.log('openingGalleryVideosModal')
    openGalleryVideosModal = true
    }

    // CREATING NEW GALLERY OR UPDATING
    $: creatingGalleryBtn = (thumbGallery.length <= 0) ? true : false
    $: deletingGallBtn = (thumbGallery.length > 0) ? true : false

    // CREATING NEW GALLERY VIDEOS OR UPDATING
    $: creatingGalleryVideosBtn = (gallery_videos?.length <= 0) ? true : false
    $: deletingGallVideosBtn = (gallery_videos?.length > 0) ? true : false

    // CONFIRMATION ACTION ENREGISTER //TODO:
    let haveSaved = false
    let showWarningLeavingPage = false
    // -- activation des notifications pour enregistrer les changement d'imgs
    let dnBanner = true
    let dnGallery = true

    // VARS FIELDSVALID
    // const titleValid = true
    let disableConfirmCreate = true
    let disableCancelCreate = true


    // VARS EDITING FIELDS
    $: editTitle = itemToEdit ? false : true
    $: editMainText = itemToEdit ? false : true
    $: editTitleMainText = itemToEdit ? false : true
    let editBanner = false
    let editGallery = false
    let editGalleryVideos = false
    let galleryAction = ''
    let blockIsUpdated = false

    if (itemToEdit) {
        itemBup = {...itemToEdit}
        console.log('EDITARTICLE', {itemToEdit}, {itemBup})
        id = itemToEdit.id
        title = itemToEdit.title
        slug = itemToEdit.slug
        linkValue = `articles/${slug}`
        main_text = itemToEdit.main_text
        slug = itemToEdit.slug
        if (itemToEdit.blocks) {
            blocks = itemToEdit.blocks
            parts.set(itemToEdit.blocks)        
        }
        cld_public_id = itemToEdit.cld_public_id // BAnner
        // if (itemToEdit.gallery_photos && itemToEdit.gallery_photos !== null) {
        if (itemToEdit.gallery_photos && Array.isArray(itemToEdit.gallery_photos) && itemToEdit.gallery_photos.length > 0) {
            console.log('on a une gallery images')
            gallery_photos = itemToEdit.gallery_photos
            thumbGallery = gallery_photos.map(img => {
                return {
                    slug: f.slashToUnderscore(img.public_id),
                    public_id: img.public_id
                }
            })
        }
        // Gallery vidéos 
        if (itemToEdit.gallery_videos && Array.isArray(itemToEdit.gallery_videos) && itemToEdit.gallery_videos.length > 0) {
            console.log('on a une gallery videos')
            gallery_videos = itemToEdit.gallery_videos
            // videos.set(itemToEdit.gallery_videos)
        }
    }

    // $: console.log('EditArticle', {blocks})

    const saveItem = async () => {
        if (itemToEdit) {
            // console.log('itemToEdit saveItem 1', {id}, {title})
            const updatedItem = {...itemToEdit}

            // SAVING BANNER
            if (cld_public_id !== itemBup.cld_public_id) {
                
                if (cld_public_id === '') { // on enlève la banner
                    f.deleteOneImg(f.slashToUnderscore(itemBup.cld_public_id))
                    itemBup.cld_public_id = ''
                }
                // cld_public_id !== '' on remplace
                updatedItem.cld_public_id = cld_public_id
                imgsKept = f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(cld_public_id))
                imgsToDelete = [...imgsKept]

                if (itemBup.cld_public_id) {
                    f.deleteOneImg(f.slashToUnderscore(itemBup.cld_public_id))
                }
            }

            // SAVING TITLE
            if (title !== itemBup.title) {
                updatedItem.title = title
                updatedItem.slug = slugify(title, options)
                console.log('SAVING TITLE', {updatedItem})
            }

            // SAVING MAIN_TEXT
            if (main_text !== itemBup.main_text) {
                updatedItem.main_text = main_text
                console.log('SAVING MAIN_TEXT', {updatedItem})
            }

            // SAVING BLOCKS
            if (blockIsUpdated) {
                updatedItem.blocks = blocks
                console.log('saveItem BBlocks', 'blocks.l :', blocks?.length, '<br />updatedItem.blocks.l :', updatedItem.blocks?.length, '<br />itemToEdit.blocks.l :',  itemToEdit.blocks?.length)
                // console.log('saveItem blocks', {blocks})
            }

            // SAVING GALLERY PHOTOS
            updatedItem.gallery_photos = gallery_photos
            if (updatedItem.gallery_photos.length > 0) {
                console.log('updatedItem.gallery_photos : ', updatedItem.gallery_photos)
                updatedItem.gallery_photos.forEach(elt => {
                    imgsKept = f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(elt.public_id))
                    imgsToDelete = [...imgsKept]
                });
                thumbGallProps.thumbGallery = thumbGallery
            }
            if (updatedItem.gallery_photos.length === 0 && imgsKept.length > 0) {
                imgsToDelete = [...imgsKept]
            }

            // SAVING GALLERY VIDEOS
            
            if (gallery_videos.length <= 0) {
               updatedItem.gallery_videos = null 
            }
            if (gallery_videos.length > 0 && gallery_videos !== itemBup.gallery_videos) {
               updatedItem.gallery_videos = gallery_videos
               console.log('itemToEdit gallery videos', {updatedItem})
            }

            console.log('itemToEdit saveItem 2', {updatedItem})
                        
            const res = await articles.updateOne(itemToEdit.id, updatedItem)
            // // console.log('update itemToEdit saveItem 3', res)
            haveSaved = true

            if (res) {
                console.log('update itemToEdit if {res} 1', res)
                itemToEdit = {...res}
                itemBup = {...res}
                if (res.gallery_videos) {
                    gVBup = [...res.gallery_videos]
                }
                if (!res.gallery_videos) {
                    gVBup = []
                }
                console.log('update itemToEdit if {res} 2', {itemToEdit}, {itemBup})
            }            
        }

        if (!itemToEdit) {
            console.log('createItem saveItem 1', {title}, {main_text})
            const createdItem = {
                status: 'published',
                project: getContext(project)
            }
            // if (!title || !main_text) {
            //     disableConfirmCreate = false
            // }
            createdItem.title = title.trim()
            createdItem.slug = slugify(title, options)
            createdItem.main_text = main_text.trim()

            console.log('createItem saveItem 2', {createdItem})

            const res = await articles.createOne(createdItem)
            // ar.addArticle(createdItem)
            console.log('createItem saveItem 3', res)
            haveSaved = true
            if (res) {
                console.log('create article', {res})
                goto(`/backend/articles/${res.slug}/update?action=complete-article`)
            }            
        }
    }
    const resetForm = (e) => {
        // e.preventDefault()
        const {component, action} = e.detail
        if (component === 'creatingArticle' && action === 'cancel') {
            console.log('fct=resetForm CANCEL component = creatingArticle')
            if (title) {
                title = ''
            }
            if (main_text) {
                main_text = ''
            }
        }
        
    }
    const createArticle = (e) => {
        const {component, action} = e.detail
        if (component === 'creatingArticle' && action === 'save') {
            console.log('fct=createArticle SAVE component = creatingArticle')
            saveItem()
        }
    }

    // BANNER
    $: bannerValid = (cld_public_id !== itemBup.cld_public_id)? true : false
    // $: deleteBannerValid = (cld_public_id !== '')? true : false
    const getNewBannerId = (e) => {
        const {public_id} = e.detail
        // console.log('getNewBannerId', public_id)
        imgsKept.push(f.slashToUnderscore(public_id))
        // console.log('getNewBannerId', {imgsKept})
        cld_public_id = public_id
        // console.log('getNewBannerId', {cld_public_id})
    }
    const renewBannerId = (e) => {
        const {public_id} = e.detail
        // console.log('renewBannerId', {public_id})
        imgsKept.push(f.slashToUnderscore(public_id))
        // console.log('renewBannerId', {imgsKept})
        cld_public_id = public_id
        // console.log('renewBannerId', {cld_public_id})
        dnBanner = false
    }
    const saveNewBanner = async () => {
        await saveItem()
        editBanner = false        
    }
    const editingBanner = () => {
        editBanner = true
    }
    const deletingBanner = () => {
        cld_public_id = ''
    }
    const externalDeletingBanner = async () => {
        // console.log('externalDeletingBanner')
        await deletingBanner()
        await saveItem()
        openBannerModal = false
    }
    const cancelModifBanner = () => {
        cld_public_id = itemBup.cld_public_id
        editBanner = false
    }

    // TITLE + MAIN TEXT 
    const editingTitleMainText = () => editTitleMainText = true
    const cancelModifTitleMainText = () => {
        cancelModifTitle()
        cancelModifMainText()
        editTitleMainText = false
    }
    const savingTitleMainText = async (e) => {
        const {updatedTitleMainText} = e.detail
        console.log('savingTitleMainText', {updatedTitleMainText})
        if (updatedTitleMainText.title) {title = updatedTitleMainText.title}
        if (updatedTitleMainText.main_text) {main_text = updatedTitleMainText.main_text}
        console.log('savingTitleMainText', {title}, itemBup.title)
        await saveItem()
        editTitleMainText = false
    }

    // TITLE
    $: titleValid = (title !== itemBup.title && title !== '') ? true : false
    const editingTitle = () => {
        editTitle = true
    }
    
    const saveNewTitle = async () => {
        await saveItem()
        editTitle = false
    }
    const cancelModifTitle = () => {
        title = itemBup.title
        // editTitle = false
    }

    // MAIN TEXT 
    $: mainTextValid = (main_text !== itemBup.main_text && main_text !== '') ? true : false
    const editingMainText = () => {
        // console.log('editingMainText')
        editMainText = true
    }
    const saveNewMainText = async () => {
        await saveItem()
        editMainText = false
    }
    const cancelModifMainText = () => {
        main_text = itemBup.main_text
        // editMainText = false
    }

    // GALLERY IMGS
    let thumbGallProps = {
        thumbGallery,
    }
    const getGalleryInfo = (e) => {
        const cldArray = e.detail 
        console.log('getGalleryInfo', cldArray)
        if (itemToEdit) {
            dnGallery = false
        }
        cldArray.forEach(elt => {
            const slug = f.slashToUnderscore(elt.uploadInfo.public_id)
            imgsKept.push(slug)
            gallery_photos = [
                ...gallery_photos,
                {
                    public_id: elt.uploadInfo.public_id,
                    height: elt.uploadInfo.height,
                    width: elt.uploadInfo.width
                }
            ]
            thumbGallery = [
                ...thumbGallery,
                {
                    slug,
                    public_id: elt.uploadInfo.public_id,
                }
            ]
        });
        
        galleryAction = 'adding'
        console.log('getGalleryInfo adding', {imgsKept}, {gallery_photos})
    }
    const deletingImgs = (e) => {
        let {public_id, slug} = e.detail
        console.log('EditArticle deletingImgs', {public_id, slug})
        imgsKept.push(slug)
        thumbGallery = thumbGallery.filter(item => item.public_id !== public_id)
        gallery_photos = gallery_photos.filter(item => item.public_id !== public_id)
        dnGallery = false
        galleryAction = 'removing'
    }
    const emptyGalleryImgs = () => {
        // console.log('EditArticle emptyGallery 1', {imgsKept})
        const allImgToDelete = thumbGallery.map(img => {return img.slug})
        console.log('EditArticle emptyGallery 2', {allImgToDelete})
        f.deleteAllImgsFromArray(allImgToDelete)
        thumbGallery = []
        gallery_photos = []
        dnGallery = false
    }
    const externalEmptyGalleryImgs = async () => {
        console.log('externalEmptyGallery')
        thumbGallProps.thumbGallery = []
        await emptyGalleryImgs()
        saveItem()
    }
    const editingGallery = () => {
        // console.log('editingGallery')
        editGallery = true
    }
    const saveNewGallery = async () => {
        await saveItem()
        editGallery = false
    }
    const cancelModifGallery = async () => {
        const thumbsGallSlugRef = await itemBup.gallery_photos.map(img => {
            return f.slashToUnderscore(img.public_id)
        })
        if (galleryAction === 'removing') {
            console.log('cancelModifGallery removing 1', {imgsKept}, {thumbsGallSlugRef})

            await thumbsGallSlugRef.forEach(slug => {
                if (imgsKept.includes(slug)) {
                    imgsKept = imgsKept.filter(item => item !== slug)
                }
            });
            thumbGallery = []
            thumbGallery = itemBup.gallery_photos.map(img => {
                return {
                    slug: f.slashToUnderscore(img.public_id),
                    public_id: img.public_id
                }
            })
            console.log('cancelModifGallery removing 2', {imgsKept}, {thumbsGallSlugRef}, {thumbGallery})
        }
        // ADDING => QUAND ON QUITTE LA PAGE, ELLE(S) EST / SONT ENLEVÉES

        editGallery = false
    }

    // GALLERY VIDEOS
    const editingGalleryVideos = () => {
        console.log('editingGalleryVideos')
        editGalleryVideos = true
    }

    const saveNewGalleryVideos = async (e) => {
        console.log('saveNewGalleryVideos', e.detail, gVBup)
        const gallerie_videos_updated = e.detail
        if (gallerie_videos_updated !== gVBup) {
            gallery_videos = []
            gallery_videos = [...gallerie_videos_updated]
        }
        await saveItem()
        editGalleryVideos = false
    }
    const cancelModifGalleryVideos = () => {
        console.log('cancelModifGalleryVideos // 1', {gVBup}, {gallery_videos})
        if (gVBup !== gallery_videos) {
            gallery_videos = []
            gallery_videos = [...gVBup]
        }
        console.log('cancelModifGalleryVideos // 2', {gVBup}, {gallery_videos})
        editGalleryVideos = false
    }

    const emptyGalleryVideos = () => {
        gallery_videos = []
    }
    const externalEmptyGalleryVideos = async () => {
        console.log('externalEmptyGalleryVideos //TODO:')
        await emptyGalleryVideos()
        saveItem()
    }

    // BLOCKS
    const updateBlock = (e) => {
        const {blockWithChanges} = e.detail
        console.log('updateBlock EditArticle 1', {blockWithChanges})
        const {id} = blockWithChanges
        let idx = blocks.findIndex(item => item.id === id)

        // MANAGING TITLE
        if (blocks[idx].title) { // ON A UN TITLE
            if (blockWithChanges.title) { // ON A UN NOUVEAU TITLE 
                if (blocks[idx].title !== blockWithChanges.title) { // TITLES DIFFÉRENTS
                    blocks[idx].title = blockWithChanges.title
                }
            }
            // PAS DE NOUVEAU TITLE
            delete blocks[idx].title
        }

        if (!blocks[idx].title) { // PAS DE TITLE ON EN AJOUTE UN
            if (blockWithChanges.title) {
                blocks[idx].title = blockWithChanges.title
            }        
        }

        // MANAGING TEXT
        if (blocks[idx].text) { // ON A UN TEXT
            if (blockWithChanges.text) { // ON A UN NOUVEAU TEXT 
                if (blocks[idx].text !== blockWithChanges.text) { // TEXTS DIFFÉRENTS
                    blocks[idx].text = blockWithChanges.text
                }
            }
            // PAS DE NOUVEAU TEXT
            delete blocks[idx].text
        }

        if (!blocks[idx].text) { // PAS DE TEXT ON EN AJOUTE UN
            if (blockWithChanges.text) {
                blocks[idx].text = blockWithChanges.text
            }        
        }

        // MANAGING IMAGE
        if (blocks[idx].image) { // ON A UN IMAGE
            if (blockWithChanges.image) { // ON A UN NOUVEAU IMAGE 
                if (blocks[idx].image !== blockWithChanges.image) { // IMAGES DIFFÉRENTS
                    blocks[idx].image = blockWithChanges.image
                    blocks[idx].image_width = blockWithChanges.image_width
                    blocks[idx].image_height = blockWithChanges.image_height
                    blocks[idx].image_position = blockWithChanges.image_position
                }
            }
            if (!blockWithChanges.image) { // ON A PAS UN NOUVEAU IMAGE 
                delete blocks[idx].image
                delete blocks[idx].image_width
                delete blocks[idx].image_height
                delete blocks[idx].image_position
            }
        }

        if (!blocks[idx].image) { // PAS DE IMAGE ON EN AJOUTE UN
            if (blockWithChanges.image) {
                blocks[idx].image = blockWithChanges.image
                blocks[idx].image_width = blockWithChanges.image_width
                blocks[idx].image_height = blockWithChanges.image_height
                blocks[idx].image_position = blockWithChanges.image_position
            }        
        }

        // MANAGING VIDEO IN BLOCK
        if (blocks[idx].video_url) { // ON A UN VIDEO ANCIENNE
            if (blockWithChanges.video_url) { // ON A UN NOUVEAU VIDEO 
                if (blocks[idx].video_url !== blockWithChanges.video_url) { // VIDEOS DIFFÉRENTS
                    blocks[idx].video_url = blockWithChanges.video_url
                    if (blockWithChanges.video_title) {
                        blocks[idx].video_title = blockWithChanges.video_title
                    }
                    if (blockWithChanges.video_position) {
                        blocks[idx].video_position = blockWithChanges.video_position
                    }
                }
                if (blocks[idx].video_url === blockWithChanges.video_url) { // VIDEOS ÉGALES
                    // blocks[idx].video_url = blockWithChanges.video_url
                    if (blockWithChanges.video_title !== '' && blockWithChanges.video_title !== blocks[idx].video_title) {
                        blocks[idx].video_title = blockWithChanges.video_title
                    }
                    if (blockWithChanges.video_title === '' && blockWithChanges.video_title !== blocks[idx].video_title) {
                        delete blocks[idx].video_title
                    }
                    if (blockWithChanges.video_position !== '' && blockWithChanges.video_position !== blocks[idx].video_position) {
                        blocks[idx].video_position = blockWithChanges.video_position
                    }
                    if (blockWithChanges.video_position === '' && blockWithChanges.video_position !== blocks[idx].video_position) {
                        delete blocks[idx].video_position
                    }
                }
            }
            // PAS DE NOUVEAU VIDEO
            if (!blockWithChanges.video_url) { // ON A PAS UN NOUVEAU VIDEO ON ENLEVE
                delete blocks[idx].video_url
                delete blocks[idx].video_title
                delete blocks[idx].video_position
            }

        }

        if (!blocks[idx].video_url) { // PAS DE VIDEO ANCIENNE ON EN AJOUTE UNE NOUVELLE
            if (blockWithChanges.video_url) {
                blocks[idx].video_url = blockWithChanges.video_url
                if (blockWithChanges.video_title) {
                    blocks[idx].video_title = blockWithChanges.video_title
                }
                if (blockWithChanges.video_position) {
                    blocks[idx].video_position = blockWithChanges.video_position
                }
            }        
        }

        // MANAGING GALLERY VIDEOS

        // blocks[idx] = blockUpdated
        console.log('updateBlock EditArticle 2', {blocks}, idx, id)
        parts.set([])
        parts.set(blocks)
        blockIsUpdated = true
        saveItem()
    }
    const saveNewBlock = (e) => {
        const {blockCreated} = e.detail
        console.log('saveNewBlock EditArticle 1', {blockCreated})
        blocks.push(blockCreated)
        parts.set([])
        parts.set(blocks)
        console.log('saveNewBlock EditArticle 1O', {blocks}, {parts})
        blockIsUpdated = true
        saveItem()
        
    }
    const deletingThisBlock = async (e) => {
        const {id} = e.detail
        // console.log('deletingBlock in EditArticle', {id})
        const blockToDelete = blocks.filter(block => block.id === id)[0]
        if (blockToDelete.image) {
            // console.log('on a une image : ', blockToDelete.image)
            f.deleteOneImg(f.slashToUnderscore(blockToDelete.image))
        }
        blocks = blocks.filter(block => block.id !== id)
        blockIsUpdated = true
        await saveItem()
        parts.set([])
        parts.set(blocks)
        console.log('deletingBlock in EditArticle', {blockToDelete}, {blocks})
    }

    // FULL ARTICLE
    const externalDeletingArticle = async () => {
        console.log('externalDeletingArticle', {itemToEdit})
        
        if (itemToEdit) {
                console.log('externalDeletingArticle itemToEdit', {id}, {cld_public_id})
                // BANNER
                if (cld_public_id && itemBup.cld_public_id) {
                    console.log('cld_public_id && itemBup.cld_public_id', {cld_public_id}, itemBup.cld_public_id)
                    f.definitiveDeletingBanner(f.slashToUnderscore(itemBup.cld_public_id), f.slashToUnderscore(cld_public_id), imgsKept)
                }

                if (cld_public_id && !itemBup.cld_public_id) {
                    console.log('cld_public_id && !itemBup.cld_public_id', {cld_public_id}, itemBup.cld_public_id)
                    f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(cld_public_id))
                    f.deleteOneImg(f.slashToUnderscore(cld_public_id))
                }

                // ILLUSTRATIONS DES BLOCKS
                if ($parts.length > 0) { // on a des blocks
                    const blocksImgsToDelete = $parts.map(block => {
                        if (block.image) {
                            return f.slashToUnderscore(block.image)
                        }
                    })
                    if (blocksImgsToDelete.length > 0) {
                        console.log('illustrations des blocks à détruire', {blocksImgsToDelete})
                        f.deleteAllImgsFromArray(blocksImgsToDelete) 
                    }                
                }
                // GALLERY IMGS
                if (gallery_photos !== null && gallery_photos.length > 0) {
                    console.log('on a une gallery photos', {gallery_photos})
                    emptyGallery()
                }
                
            const res = await articles.deleteOne(id)
            // ar.deleteArticle(id)
        }

        openDangerModal = false
        goto('/backend/articles')
        
    }

    onDestroy(
        () => {
            if (!haveSaved) {
                showWarningLeavingPage = true
                console.log('ONDESTROY na pas sauvegardé', {showWarningLeavingPage})
                imgsToDelete = [...imgsKept]
            }
            if (haveSaved) {
                console.log('ONDESTROY a sauvegardé', {showWarningLeavingPage})
            }
            console.log('ONDESTROY', {imgsToDelete})
            if (imgsToDelete.length > 0) {
                f.deleteAllImgsFromArray(imgsToDelete)
            }
        }
    )
</script>

<svelte:head>
<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">  
</script>
</svelte:head>

<div class="edit-news has-background-white-bis p-3 block">
    {#if !itemToEdit}
        <Notification
        is-primary
        is-light
        heading='à savoir'
        text={textNotifItemCreatingStep1}
        />
    {/if}
    {#if itemToEdit}
        <Notification
        is-info
        is-light
        heading={headingNotifItemToEdit}
        text={textNotifItemToEdit}
        />
    {/if}

    {#if itemToEdit}
        <div class="is-flex is-justify-content-flex-end notification">
        <IconsLinks
        {linkValue}
        {linkLibelle}
        {linkDirection}
        />
        </div>
    {/if}


    <h2 class="subtitle is-uppercase is-size-5 has-text-primary">Éléments indispensables</h2>

    {#if editTitleMainText}
        <GroupTitleTextForm 
        {title}
        {main_text}
        {creatingArticle}
        on:canceling={cancelModifTitleMainText}
        on:saving-title-maintext={savingTitleMainText}
        />
    {/if}

    {#if !editTitleMainText}
        <HtmlO 
        label={`Titre et text principal`}
        fct={editingTitleMainText}
        >
        <div>
            <p class="title">{itemToEdit ? title : 'Renseigner le titre'}</p>
        <div>{@html itemToEdit ? main_text : '<span class="title">Rédigez votre texte</span>'}</div>
        </div>
        </HtmlO>
    {/if}






    {#if itemToEdit}
        <h2 class="subtitle is-uppercase is-size-5 has-text-info">Éléments complémentaires - optionnels</h2>
    {/if}
    
    {#if editBanner}
    <div class="block">
        <p class="label">Bannière</p>
        {#if cld_public_id}
            <ImagUpload 
            {cld_public_id} 
            {croppingAspectRatio} 
            isOutlined={true}
            text={`Pensez à enregistrer le choix de votre photo. <br />Bouton jaune ci dessous :  "Enregistrer la modif"`}
            buttonTextDelete={`Enlever l'image`}
            imageInstalled={true}
            uploadPreset='Actibenne_banners' 
            dispatchTitle='renew-banner-id'
            dn={dnBanner}
            on:renew-banner-id={renewBannerId}
            on:delete-img={deletingBanner}
            />
        {:else}
            <ImagUpload 
            buttonText='Choisir' 
            {croppingAspectRatio} 
            isOutlined={true}
            text={`Pensez à enregistrer le choix de votre photo. <br />Bouton jaune ci dessous :  "Enregistrer la modif"`}
            uploadPreset='Actibenne_banners' 
            dispatchTitle='get-new-banner-id'
            on:get-new-banner-id={getNewBannerId}
            />
        {/if}
        <div class="buttons mt-3">
            <Button
            is-primary
            enabled={bannerValid}
            fct={saveNewBanner}
            >
                Enregistrer 
            </Button>
            <Button
            is-info
            enabled={true}
            fct={cancelModifBanner}
            >
                Abandonner la modif
            </Button>
        </div>       
    </div>
    {/if}
    {#if !editBanner && cld_public_id}
        <HtmlO 
        label='Image de bannière'
        fct={editingBanner}
        fctDel={openingBannerModal}
        deleting={true}
        >
        <div class="edit-banner block">
            <img src={f.bannerResizeW(500, cld_public_id)} alt="">
        </div>
        </HtmlO>
        <Confirmation
        openModal={openBannerModal}
        title={`Détruire la photo`}
        phrase='détruire'
        on:confirmation={externalDeletingBanner}
        on:leaving={
            () => openBannerModal = false
        }
        />
    {/if}
    {#if !editBanner && !cld_public_id && itemToEdit}
        <HtmlO 
        label='Image de bannière'
        fct={editingBanner}
        creating={true}
        >
        Installer une image de bannière
        </HtmlO>
    {/if}



    {#if $parts.length > 0}
        <span class="tag is-info mb-1">Nombre de blocks : {$parts.length}</span>
    
        {#each $parts as block}
            <Block 
            {block}
            updateBlock={true}
            deletingBlock={true}
            on:update-block={updateBlock}
            on:deleting-this-block={deletingThisBlock}
            />
        {/each}
        <Block 
        newMoreBlockInfo='Compléter avec un autre block'
        updateBlock={true} 
        creatingBlock={true}
        on:save-new-block={saveNewBlock}
        />
    {:else if $parts.length === 0 && itemToEdit }
        <span class="tag is-warning mb-1">Nombre de blocks : 0</span>
        <Block
        updateBlock={true} 
        creatingBlock={true}
        newMoreBlockInfo='Ajouter un premier block'
        on:save-new-block={saveNewBlock}
        />
    {/if}

    {#if editGallery}
        <GallUpload 
        {thumbGallery}
        showAdvancedOptions={false}
        uploadPreset='Actibenne_postsGalleries'
        isOutlined={true}
        dn={dnGallery}
        on:get-gallery-info={getGalleryInfo}
        on:deleting-Imgs={deletingImgs}
        on:empty-gallery={emptyGalleryImgs}
        />
        <div class="buttons">
            <Button
            is-primary
            enabled={true}
            fct={saveNewGallery}
            >
                Enregistrer la modif
            </Button>
            <Button
            is-info
            enabled={true}
            fct={cancelModifGallery}
            >
                Abandonner la modif
            </Button>
        </div>
    {/if}
    {#if !editGallery && itemToEdit}
        <HtmlO
        label='Vignettes des images de la galerie'
        fct={editingGallery}
        fctDel={openingGalleryModal}
        creating={creatingGalleryBtn}
        deleting={deletingGallBtn}
        >
            <ThumbsGallery {thumbGallery} altText={title} />
        </HtmlO>

        <Confirmation
        openModal={openGalleryModal}
        title={`Détruire la gallerie images`}
        phrase='détruire'
        on:confirmation={() => {
            console.log('Emptying Gallery')
            externalEmptyGalleryImgs()
            openGalleryModal = false
        }}
        on:leaving={
            () => openGalleryModal = false
        } />

    {/if}

    {#if editGalleryVideos}
        <GalleryVideosUpload 
        {gallery_videos}
        galleryVideosBup={gVBup}
        on:save-updated-gallery={saveNewGalleryVideos}
        on:cancel-modif={cancelModifGalleryVideos}
        />

    {/if}

    {#if !editGalleryVideos && itemToEdit}
        <HtmlO
        label={`Galerie Vidéos (${gallery_videos.length})`}
        fct={editingGalleryVideos}
        fctDel={openingGalleryVideosModal}
        creating={creatingGalleryVideosBtn}
        deleting={deletingGallVideosBtn}
        >
            <GalleryVideos 
            {gallery_videos} 
            />
        </HtmlO>

        <Confirmation
        openModal={openGalleryVideosModal}
        title={`Détruire la galerie vidéos`}
        phrase='détruire'
        dangerWord='IMMÉDIAT'
        on:confirmation={() => {
            console.log('Emptying Gallery Vidéos')
            externalEmptyGalleryVideos()
            openGalleryVideosModal = false
        }}
        on:leaving={
            () => openGalleryVideosModal = false
        } />
    {/if}
</div>

{#if itemToEdit && canDeleteArticle}
    <div class="notification is-danger is-light">
        <p><strong>Zone dangereuse :</strong> Ici vous pouvez détruire globalement l'intégralité de l'article. <br />Les images associées (bannière, images de la galerie) seront également définitivement détruites.</p>
        <Button
            is-danger
            enabled={true}
            fct={openingDangerModal}
            >
                Détruire 
            </Button>
    </div>
        <Confirmation
        openModal={openDangerModal}
        title={`Détruire globalement l'article`}
        phrase='détruire'
        on:confirmation={externalDeletingArticle}
        on:leaving={
            () => openDangerModal = false
        }
        />
{/if}

{#if itemToEdit}
    <div class="is-flex is-justify-content-flex-end notification">
    <IconsLinks
    {linkValue}
    {linkLibelle}
    {linkDirection}
    />
    </div>
{/if}

<!-- {#if !itemToEdit}
    <ButtonsCancelConfirm 
    whichComponent='creatingArticle'
    cancelText='Effacer'
    disableConfirm={disableConfirmCreate}
    disableCancel={disableCancelCreate}
    on:button-canceling={resetForm}
    on:button-saving={createArticle}
    />
{/if} -->

<style>
    .edit-news {
        max-width: 500px;
    }
</style>