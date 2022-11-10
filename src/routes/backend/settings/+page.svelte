<script>
    import {page} from '$app/stores'
    // import { onDestroy, afterUpdate } from 'svelte';
    import f from '$lib/helpers/scripts'
    import SettingsProjects from '$lib/components/settings/SettingsProjects.svelte'

    // console.log('BACKEND SETTINGS +page.svelte $page', $page)
    let {data: {settings}} = $page
    // console.log('BACKEND SETTINGS +page.svelte', {settings})

    const projectSettings = {
        site_name: settings.site_name,
        domain_name: settings.domain_name,
        logo: settings.logo
    }

    let public_id = 'Actibenne/logos/gpx0vxzjcdeorcqnk6ke'
    const test = async () => {
        f.deleteOneImg(f.slashToUnderscore(public_id))
    }


</script>
<h2 class="subtitle has-text-centered is-uppercase">Settings</h2>

<SettingsProjects 
itemToEdit={projectSettings} 
/>

