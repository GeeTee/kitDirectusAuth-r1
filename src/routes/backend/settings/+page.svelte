<script>
    import {page} from '$app/stores'
    import { onDestroy, afterUpdate } from 'svelte';
    import f from '$lib/helpers/scripts'
    import SettingsProjects from '$lib/components/settings/SettingsProjects.svelte'

    // console.log('BACKEND SETTINGS +page.svelte $page', $page)
    let {data: {settings}} = $page
    // console.log('BACKEND SETTINGS +page.svelte', {settings})

    let imgToClean = []

    const projectSettings = {
        site_name: settings.site_name,
        domain_name: settings.domain_name,
        logo: settings.logo
    }

    const deleteLogo = async (e) => {
        const logo_id = e.detail
        imgToClean.push(logo_id)

        console.log('SETTINGS +page.svelte',  {logo_id}, imgToClean)

        // f.deleteOneImg(f.slashToUnderscore(logo_id))
    }
    let public_id = 'Actibenne/logos/gpx0vxzjcdeorcqnk6ke'
    const test = async () => {
        f.deleteOneImg(f.slashToUnderscore(public_id))
    }

    $: console.log({imgToClean})

    afterUpdate(
        () => {
            console.log('afterUpdate', {imgToClean})
        }
    )

    // onDestroy(
    //     () => {
    //         console.log('onDestroy', {imgToClean})
    //         if (imgToClean.length > 0) {
    //             imgToClean.forEach(element => {
    //                 console.log('onDestroy check imgToClean', element)
    //             });
    //         }
    //     }
    // )
</script>
<h2 class="subtitle has-text-centered is-uppercase">Settings</h2>
<button on:click={test}>test</button> <br> <br>
<SettingsProjects 
itemToEdit={projectSettings} 
on:logo-to-delete={deleteLogo}
/>

