<script>
    import {createEventDispatcher} from 'svelte'
    import {CLOUDINARY_NAME} from '$lib/helpers/Env'
    import f from '$lib/helpers/scripts'

    import Notification from '../../../UI/elements/Notification.svelte'; 
    import Confirmation from '$lib/UI/ConfirmationActionLite.svelte'

    const dispatch = createEventDispatcher();

    export let cld_public_id = ''
    export let imgResize = f.bannerResizeW
    export let w = 500
    export let showDeleteImg = false
    export let buttonTextDelete = 'Enlever'

    $: src = cld_public_id !== ''? imgResize(w, cld_public_id) : false  
    // $: src = cld_public_id !== ''? `https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_500,q_auto,f_jpg/Actibenne/banners/${cld_public_id}` : false  

    export let buttonText = 'Changer'
    export let isOutlined = false
    export let imageInstalled = false
    export let defaultSource = "local"
    export let uploadPreset = 'avatar'
    export let croppingAspectRatio = 1
    export let multiple = false
    export let showAdvancedOptions = true
    export let croppingCoordinatesMode = 'custom'
    export let dispatchTitle = 'get-avatar-public-id'
    export let dn = true
    export let text = 'Enregistrer pour garder vos modifications'

    const iconChange = '<i class="fas fa-exchange-alt"></i>'
    const iconAdd = '<i class="fas fa-image"></i>'

    $: iconAddChange = cld_public_id? `${iconChange}` : `${iconAdd}`

    // VARS CONFIRMATION DELETE VIDEO
    let openImgConfirm = false
    const openingConfirmImgModal = () => {
        console.log(('openingConfirmImgMal'))
        openImgConfirm = true
    }

    let isLoading = false

    $: cropping = multiple ? false : true

    const handleUploadImage = () => {
        isLoading = true
        const uploadImage = cloudinary.createUploadWidget({
            
            cloudName: CLOUDINARY_NAME, 
            uploadPreset, // défini entre autre le folder
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
                        'done': 'Réussi',
                        'mini_upload_count': '{{num}} chargés',
                        'mini_failed': '{{num}} ratés'
                    },
                    "crop": {
                        "title": "Recadrer",
                        "crop_btn": "Recadrer",
                        "skip_btn": "Continuer",
                        "cancel_btn": "Abandonner",
                        "reset_btn": "Effacer",
                        "close_btn": "Fermer",
                        "close_prompt": "Fermer va annuler tous les chargements, êtes vous certain?",
                        "image_error": "Erreur au chargement de l'image",
                        "corner_tooltip": "Tirer le coin pour re-dimensionner",
                        "handle_tooltip": "Tirer la poignée pour re-dimensionner"

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
            cropping,
            croppingAspectRatio,
            croppingCoordinatesMode,
            multiple,
            defaultSource,
            showAdvancedOptions,
                }, (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log('CLD UPLOAD: ', result.info);

                        dispatch(dispatchTitle, {
                            public_id: result.info.public_id, 
                            thumbnail_url: result.info.thumbnail_url
                            })
                        isLoading = false;
                    } else if (result.event === 'close') {
                        isLoading = false;
                    }
                }
        );
        uploadImage.open()
    }
</script>

{#if src}
    <div class="edit-banner block">
        <img {src} alt="">
    </div>
{:else}
        <strong>Choisir une image</strong>
{/if}
<div class="buttons block">
    <button 
    class:is-loading={isLoading} 
    class:is-primary={!imageInstalled} 
    class:is-info={imageInstalled}
    class:is-outlined={isOutlined}
    class="button" 
    on:click={handleUploadImage}
    >
    <span class="icon is-small">{@html iconAddChange}</span>
    <span>{buttonText}</span>
    </button>
    {#if showDeleteImg}
    <button 
    class="button is-danger" 
    class:is-outlined={isOutlined}
    on:click={openingConfirmImgModal}
    >
    <span class="icon is-small"><i class="fas fa-trash-alt"></i></span>
    <span>{buttonTextDelete}</span>
    </button>
    <Confirmation
    openModal={openImgConfirm}
    title={`Détruire la vidéo`}
    phrase='détruire'
    on:confirmation={() => {
        console.log('delete-img')
        dispatch('delete-img')
        openImgConfirm = false
    }}
    on:leaving={
        () => openImgConfirm = false
    } 
    />
    {/if}
</div>
<Notification
{dn}
is-warning
{text}
/>

