<script>
    import {createEventDispatcher} from 'svelte'
    import f from '$lib/helpers/scripts'
    import ImagUpload from '$lib/partials/images/cld/ImageUploadCld.svelte'

    const dispatch = createEventDispatcher()

    export let cld_public_id = ''
    export let croppingAspectRatio = 1
    export let w = 500
    export let uploadPreset = 'Actibenne_banners'
    export let choisirText = 'Choisir une image'
    export let showDeleteImg = false

    const getNewImgId = (e) => {
        // console.log('getNewImgId', e.detail)
        const {public_id} = e.detail
        cld_public_id = public_id
        dispatch('get-img',{cld_public_id})
    }
    // const deletingImg = (e) => {
    //     console.log('deletingImg', e.detail)
    //     f.deleteOneImg(f.slashToUnderscore(e.detail))
    //     // dispatch('logo-deleted')
    // }

    // export const deletImg = (elt) => {
    //     f.deleteOneImg(f.slashToUnderscore(elt))
    // }


</script>

{#if cld_public_id}
    <ImagUpload 
    {cld_public_id}
    {croppingAspectRatio} 
    {choisirText}
    {w}
    isOutlined={true}
    {showDeleteImg}
    buttonTextDelete={`Enlever l'image`}
    imageInstalled={true}
    {uploadPreset }
    dispatchTitle='renew-img-id'
    on:renew-img-id={getNewImgId}    
    on:delete-img
    />
{/if}
{#if !cld_public_id}
    <ImagUpload 
    buttonText='Choisir' 
    {croppingAspectRatio} 
    {choisirText}
    {w}
    isOutlined={true}
    {uploadPreset }
    dispatchTitle='get-new-img-id'
    on:get-new-img-id={getNewImgId}
    on:delete-img
    />
{/if}