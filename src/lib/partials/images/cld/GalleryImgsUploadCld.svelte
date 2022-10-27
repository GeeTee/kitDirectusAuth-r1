<script>
    import {createEventDispatcher} from 'svelte'
    import {CLOUDINARY_NAME} from '$lib/helpers/Env'
    import f from '$lib/helpers/scripts'
    import Button from '$lib/UI/Button.svelte'
    import Confirmation from '$lib/UI/ConfirmationAction.svelte'
    import Notification from '../../../UI/elements/Notification.svelte';

    const dispatch = createEventDispatcher();

    export let defaultSource = "local";
    export let uploadPreset = 'postGalleries';
    export let showAdvancedOptions = true;
    export let dispatchTitle = 'get-gallery-info';
    export let dn = true
    export let isOutlined = false

    export let thumbGallery = []

    $: buttonText = thumbGallery.length > 0 ? 'Compléter votre galerie' : 'Ajouter vos photos'

    let isLoading = false
    //MODAL
    let openModal = false
    const text = `
        Pour détruire toutes les images de cette galerie, il vous faut recopier le mot : <br /><span class="tag is-warning">Effacer</span> <br />dans la champ ci dessous puis cliquer le bouton rouge : Confirmer
        `

    const handleUploadImage = () => {
        console.log('handleUploadImage')
        isLoading = true;
        cloudinary.openUploadWidget({
            cloudName: CLOUDINARY_NAME, 
            uploadPreset,
            sources: [ 'local', 'url', 'camera', 'facebook', 'instagram', 'google_drive'],
            language: 'en',
            text: {
                'en': {
                    'or': 'ou bien',
                    'back': 'retour',
                    'advanced': 'Améliorer',
                    'close': 'fermer',
                    'no_results': 'Pas de résultats',
                    'search_placeholders': 'Chercher vos fichiers images, vidéos',
                    'about_uw': 'Au sujet du Widget Upload',
                    'menu': {
                        'files': 'Mes fichiers'
                    },
                    'actions' : {
                        'upload': 'Chargement',
                        'clear_all': 'Tout éffacer',
                        'log_out': 'Sortir'
                    },
                    'advanced_options': {
                        'public_id_ph': 'Nom image',
                        'tags_ph': 'Ajouter un tag',
                        'add_new': 'Ajouter un nouveau tag',
                    },
                    'statuses': {
                        'uploading': 'Chargement...',
                        'error': 'Erreur',
                        'uploaded': 'Réussi',
                        'aborted': 'Raté'
                    },
                    "queue": {
                        "title": "Liste à charger",
                        "title_uploading_with_counter": "Chargement de {{num}} fichiers",
                        'title_uploading': 'Chargment des fichiers',
                        'mini_title': 'Chargé',
                        'mini_title_uploading': 'Chargement',
                        'show_completed': 'voir le résultat',
                        'retry_failed': 'nouvelle tentative ratée',
                        'abort_all': 'Tout arréter',
                        'upload_more': 'Charger plus',
                        'done': 'Enregistrer',
                        'mini_upload_count': '{{num}} chargés',
                        'mini_failed': '{{num}} ratés'
                    },
                    "local": {
                        "main_title": "Charger des fichiers",
                        "dd_title_single": "Glisser et Déposer votre fichier ici",
                        "dd_title_multi": "Glisser et Déposer vos fichiers ici",
                        "drop_title_single": "Déposer votre fichier ici",
                        "drop_title_multi": "Déposer vos fichiers ici",
                    }
                }
            },
            multiple: true,
            defaultSource,
            showAdvancedOptions,
            // getTags: getMyTags,
                }, (error, result) => { 
                    
                    if (!error && result && result.event === "queues-end") { 
                    console.log('CLD UPLOAD: ', result);
                    dispatch(dispatchTitle, result.info.files);
                    isLoading = false;
                    } else if (result.event === 'close') {
                        isLoading = false;
                    }
                }
        );
    }

    const deleteImg = (public_id, slug) => {
        console.log('Gallery deleteImg', public_id)
        // thumbGallery = thumbGallery.filter(item => item.public_id !== public_id)
        dispatch('deleting-Imgs', {public_id, slug})
    }

    // EMPTY GALLERY IMAGES
    const canDelete = () => {
        console.log('canDelete')
        openModal = false
        emptyAllGallery()
    }
    const emptyAllGallery = () => {
        console.log('Gallery emptyAllGallery')
        dispatch('empty-gallery')
    }
    const confirmEmptyGallery = () => {
        openModal = true
        console.log('confirmEmptyGallery', {openModal})
    }
</script> 

{#if thumbGallery.length > 0}
    <p class="label">Gérer la gallerie images</p>
{:else}
    <p class="label">Alimenter la gallerie images</p>
{/if}
{#if thumbGallery.length > 0}
     <ol>
        {#each thumbGallery as {slug, public_id}}
            <li>
                <div>
                    <img src={f.thumbImg(public_id)} alt="//TODO:">
                </div>
                <Button
                is-danger
                mt-2
                {isOutlined}
                enabled={true}
                fct={() => deleteImg(public_id, slug)}
                >
                    Enlever
                </Button>
            </li>
        {/each}
     </ol>
{/if}
{#if thumbGallery.length <= 0}
    <div class="notification is-primary">
        <strong>Notification //TODO: vide</strong>
    </div>   
     
{/if}
<div class="buttons">
    <button 
    class:is-loading={isLoading} 
    class:is-primary={thumbGallery.length === 0} 
    class:is-info={thumbGallery.length > 0}
    class:is-outlined={isOutlined}
    class="button" 
    on:click={handleUploadImage}
    >
    <span class="icon is-small"><i class="fas fa-camera-retro"></i></span>
    <span>{buttonText}</span>
    </button>

    {#if thumbGallery.length > 0}
        <button 
        class="button is-danger" 
        class:is-outlined={isOutlined}
        on:click={confirmEmptyGallery}
        >
        <span class="icon is-small"><i class="fas fa-camera-retro"></i></span>
        <span>Enlever toutes les images</span>
        </button>
    {/if}

</div>
<Notification
{dn}
is-warning
text='Pensez à enregistrer les changements de votre galerie. <br />Bouton vert Enregistrer en bas'
/>
<Confirmation
{openModal}
title='Enlever toutes les images de la galerie'
slug='Effacer'
{text}
on:confirmation={canDelete}
on:leaving={() => openModal = false}
 />

<style lang="scss">
    ol {
        display: flex;
        flex-flow: row wrap;
        > li {
            margin: 0.7rem;
            display: flex;
            flex-direction: column;
            max-width: 150px;
            > div {
                text-align: center;
            }
        }
    }
</style>