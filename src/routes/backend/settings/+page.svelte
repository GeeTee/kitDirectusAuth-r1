<script>
    import {page} from '$app/stores'
    import SettingsProjects from '$lib/components/settings/SettingsProjects.svelte'
    import SettingLogo from '$lib/components/settings/SettingLogo.svelte'

    // console.log('BACKEND SETTINGS +page.svelte $page', $page)
    let {data: {settings}} = $page
    // console.log('BACKEND SETTINGS +page.svelte', {settings})

    // export let form 
    // $: console.log(form)
    // $: doit = (form && form?.done == 'ok') ? true : false

    // let toDelete = null

    const projectSettings = {
        site_name: settings.site_name,
        domain_name: settings.domain_name,
        logo: settings.logo
    }
    
</script>
<h2 class="subtitle has-text-centered is-uppercase">Settings</h2>

<SettingLogo 
logoData={settings.logo} 
/>

<SettingsProjects 
itemToEdit={projectSettings} 
/>

