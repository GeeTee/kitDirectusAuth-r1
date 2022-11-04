<script>
    import {getContext} from 'svelte'
    // SVELTE COMPONENTS
    import Div from "$lib/layouts/DivHeader.svelte";

    // VARIABLES
        // DEV 
    import {DIRECTUS_EMAIL, DIRECTUS_PW} from '$lib/helpers/Env'

    // export let form 

    // $: console.log('LOGIN +page.svelte', {form})

    const headT = 'Connexion'
    const h2 = getContext('siteName')

    // DEV
    let email = DIRECTUS_EMAIL
    let password = DIRECTUS_PW

    // PROD 
    // let email = ''
    // let password = ''  

    // $: emailValid = checkEntry(email, 'email') ? true : false;
    // $: passwordValid = checkEntry(password, 'password') ? true : false;
    // let captchaValid = true
    // $: formValid = emailValid && passwordValid && captchaValid;

    // HELPS
    let helpEmail = false
    let helpPassword = false

    const resetForm = () => {
        email = ''
        password = ''
        helpEmail = false
        helpPassword = false
    }

    // async function handleSubmit(event) {
    //     const data = new FormData(this);

    //     const response = await fetch(this.action, {
    //     method: 'POST',
    //     body: data
    //     });
    //     /** @type {import('@sveltejs/kit').ActionResult} */
    //     const result = await response.json();
    //     console.log('LOGIN +page.svelte handleSubmit', {result})
    //     if (result.type === 'success') {
    //     // re-run all `load` functions, following the successful update
    //     await invalidateAll();
    //     }

    //     applyAction(result);
    // }
</script>

<Div
    titleBg={true}
    h1={headT}
    {h2}
    beWell={true}
>
    <form 
    id="login-form" 
    name="login" 
    method="POST"
    >
        <legend class="subtitle is-4 is-uppercase">Se connecter</legend>
        <div class="columns">
            <div class="field column">
                <label for="email" class="label"><span class="has-text-danger">*</span> email </label>
                <div class="control has-icons-left">
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    class="input"
                    placeholder="Noter un mail valide"
                    bind:value={email}
                    required
                    >
                    <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
                    </span>
                </div>
                <p class="help has-text-danger" class:is-invisible={!helpEmail}>Champ indispensable, merci de noter un mail valide</p>
            </div>
            <div class="field column">
                <label for="password" class="label"><span class="has-text-danger">*</span> Mot de passe </label>
                <div class="control has-icons-left">
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    class="input"
                    placeholder="Noter un mail valide"
                    bind:value={password}
                    required
                    >
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div> 
                <p class="help has-text-danger" class:is-invisible={!helpPassword}>Au moins 8 caractères, 1 petite lettre, 1 capitale, 2 chiffres, 2 caractèrs spéciaux</p>               
            </div>
        </div>
    <div class="field">
        <div id="login-captcha"></div>
    </div>
    <div class="field is-grouped">
        <div class="control">
            <button 
            id="submit-button" 
            class="button is-link" 
            type="submit" 
            >Se connecter</button>
        </div>
        <div class="control">
            <button 
            id="reset-button" 
            class="button is-warning"
            on:click|preventDefault={resetForm}
            >Effacer</button>
        </div>
    </div>
    </form>
</Div>
