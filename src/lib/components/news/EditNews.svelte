<script>
    import n from '$lib/stores/newsStore'
    import { getContext, onDestroy } from "svelte";
    import { goto } from '$app/navigation'

    import slugify from 'slugify'

    import f from '$lib/helpers/scripts'

    import TextInput from "../../UI/TextInput.svelte";
    import Button from "../../UI/Button.svelte";
    import ImagUpload from '$lib/partials/images/cld/ImageUploadCld.svelte'
    import GallUpload from '$lib/partials/images/cld/GalleryImgsUploadCld.svelte'

    export let itemToEdit = undefined

    const directus = getContext('directus')
    const news = directus.items('test')

    let id = ''
    let title = ''
    let slug = '' //TODO: => ?????? 
    let redaction = ''
    let cld_public_id = ''
    let gallery_photos = []
    let thumbGallery= []
    let itemBup = {}
    let imgsKept = []
    let imgsToDelete = []
    // slugify 
    const options = {
        lower: true
    }

    // CONFIRMATION ACTION ENREGISTER //TODO:
    let haveSaved = false
    let showWarningLeavingPage = false
    // -- activation des notifications pour enregistrer les changement d'imgs
    let dnBanner = true
    let dnGallery = true

    const titleValid = true
    const redactionValid = true
    const croppingAspectRatio = 1.385

    $: formValid = titleValid && redactionValid

    let isEdited = false

    if (itemToEdit) {
        console.log('EditNews', {itemToEdit})
        isEdited = true
        itemBup = {...itemToEdit}
        id = itemToEdit.id
        title = itemToEdit.title
        slug = itemToEdit.slug
        redaction = itemToEdit.redaction
        cld_public_id = itemToEdit.cld_public_id // BAnner
        if (itemToEdit.gallery_photos !== null) {
            gallery_photos = itemToEdit.gallery_photos
            thumbGallery = gallery_photos.map(img => {
                return {
                    slug: f.slashToUnderscore(img.public_id),
                    public_id: img.public_id
                }
            })
        }
        
    }

    const saveItem = async () => {
        if (itemToEdit) {
            console.log('itemToEdit saveItem 1', {title}, {redaction})
            const updatedItem = {}
            // let imageToDelete = ''
            
            if (cld_public_id !== itemBup.cld_public_id) {
                updatedItem.cld_public_id = cld_public_id
                imgsKept = f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(cld_public_id))
                imgsToDelete = [...imgsKept]
                f.deleteOneImg(f.slashToUnderscore(itemBup.cld_public_id))
            }
            if (title !== itemBup.title) {
                updatedItem.title = title
                updatedItem.slug = slugify(title, options)
            }
            if (redaction !== itemBup.redaction) {
                updatedItem.redaction = redaction
            }

            //TODO: Manage gallery
            updatedItem.gallery_photos = gallery_photos
            if (updatedItem.gallery_photos.length > 0) {
                console.log('updatedItem.gallery_photos : ', updatedItem.gallery_photos)
                updatedItem.gallery_photos.forEach(elt => {
                    imgsKept = f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(elt.public_id))
                    imgsToDelete = [...imgsKept]
                });
            }
            if (updatedItem.gallery_photos.length === 0 && imgsKept.length > 0) {
                imgsToDelete = [...imgsKept]
            }

            console.log('itemToEdit saveItem 2', {updatedItem})
            n.updatePost(id, updatedItem)
            const res = await news.updateOne(id, updatedItem)
            console.log('itemToEdit saveItem 3', res)
            haveSaved = true
            if (res) {
                goto(`/news/${updatedItem.slug || itemBup.slug}?img=${cld_public_id}`)
            }            
        }

        if (!itemToEdit) {
            console.log('createItem saveItem 1', {cld_public_id}, {title}, {redaction})
            const createdItem = {}

            createdItem.cld_public_id = cld_public_id
            imgsKept = f.deleteOneEltFromArray(imgsKept, f.slashToUnderscore(cld_public_id))
            console.log('saveItem', {imgsKept})

            createdItem.title = title
            createdItem.slug = slugify(title, options)

            createdItem.redaction = redaction

            createdItem.gallery_photos = gallery_photos

            console.log('createItem saveItem 2', {createdItem})
            n.addPost(createdItem)
            const res = await news.createOne(createdItem)
            console.log('createItem saveItem 3', res)
            haveSaved = true
            if (res) {
                goto(`/news/${createdItem.slug}?img=${cld_public_id}`)
            }            
        }

    }
    const resetForm = (e) => {
        e.preventDefault()
        console.log('resetForm')
    }
    // BANNER
    const getNewBannerId = (e) => {
        const {public_id} = e.detail
        console.log('getNewBannerId', public_id)
        imgsKept.push(f.slashToUnderscore(public_id))
        console.log('getNewBannerId', {imgsKept})
        cld_public_id = public_id
        console.log('getNewBannerId', {cld_public_id})
    }
    const renewBannerId = (e) => {
        const {public_id} = e.detail
        console.log('renewBannerId', {public_id})
        imgsKept.push(f.slashToUnderscore(public_id))
        console.log('renewBannerId', {imgsKept})
        cld_public_id = public_id
        console.log('renewBannerId', {cld_public_id})
        dnBanner = false
    }

    // GALLERY IMGS
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
        console.log('getGalleryInfo', {imgsKept}, {gallery_photos})
    }
    const deletingImgs = (e) => {
        let {public_id, slug} = e.detail
        console.log('EditNews deletingImgs', {public_id, slug})
        imgsKept.push(slug)
        thumbGallery = thumbGallery.filter(item => item.public_id !== public_id)
        gallery_photos = gallery_photos.filter(item => item.public_id !== public_id)
        dnGallery = false
    }
    const emptyGallery = () => {
        console.log('EditNews emptyGallery 1', {imgsKept})
        imgsKept = thumbGallery.map(img => {return img.slug})
        console.log('EditNews emptyGallery 2', {imgsKept})
        thumbGallery = []
        gallery_photos = []
        dnGallery = false
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
<div class="edit-news has-background-white-ter p-3 block">
    <div class="banner-choice">
        <p class="label">Bannière</p>
        {#if cld_public_id}
            <ImagUpload 
            {cld_public_id} 
            {croppingAspectRatio} 
            imageInstalled={true}
            uploadPreset='Actibenne_banners' 
            dispatchTitle='renew-banner-id'
            dn={dnBanner}
            on:renew-banner-id={renewBannerId}
            />
        {:else}
            <ImagUpload 
            buttonText='Choisir' 
            {croppingAspectRatio} 
            uploadPreset='Actibenne_banners' 
            dispatchTitle='get-new-banner-id'
            on:get-new-banner-id={getNewBannerId}
            />
        {/if}
        
    </div>

        <TextInput
            id="title"
            label="Titre"
            type="text"
            valid={titleValid}
            validityMessage="Entrez votre Titre"
            controlType="input"
            value={title}
            on:input={event => (title = event.target.value)} />

        <TextInput
            id="redaction"
            label="Rédaction"
            valid={redactionValid}
            validityMessage="Entrez votre Titre"
            controlType="textarea"
            bind:value={redaction}
             />

    <GallUpload 
    {thumbGallery}
    showAdvancedOptions={false}
    uploadPreset='Actibenne_postsGalleries'
    dn={dnGallery}
    on:get-gallery-info={getGalleryInfo}
    on:deleting-Imgs={deletingImgs}
    on:empty-gallery={emptyGallery}
    />
</div>

<div class="buttons">
    <Button
    is-success
    enabled={formValid}
    fct={saveItem}
    >
        Enregistrer
    </Button>
    {#if !itemToEdit}
        <Button
        is-warning
        enabled={formValid}
        fct={resetForm}
        >
            Effacer
        </Button>
    {/if}

</div>

<style>
    .edit-news {
        max-width: 500px;
    }
</style>