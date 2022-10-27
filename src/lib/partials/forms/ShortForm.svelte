<script>
    import emailjs from '@emailjs/browser'
    import {EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_TEMPLATE_COPY_ID, EMAILJS_PUBLIC_KEY} from '$lib/helpers/Env'

    import {checkEntry, checkPhone, checkRgpd, toggleHelp} from '$lib/helpers/validations'
    emailjs.init(EMAILJS_PUBLIC_KEY)

    export let emailDest = ''
    export let siteName = ''
    export let permalink = ''

    // CONTACT FORM BINDING
    let lastName = ""
    let firstName = ""
    let phone = ""
    let email = ""
    let message = ""
    let checked = false
    const rgpdText = "J'accepte que les informations utilisées ici soient nécessaires au traitement de ma demande";

    $: lastNameValid = checkEntry(lastName, 'last-name') ? true : false
    $: firstNameValid = checkEntry(firstName, 'first-name') ? true : false
    $: phoneValid = checkPhone(phone) ? true : false
    $: emailValid = checkEntry(email, 'email') ? true : false
    $: messageValid = checkEntry(message, 'message') ? true : false
    $: rgpdValid = checkRgpd(checked)
    $: formValid = lastNameValid && firstNameValid && messageValid && phoneValid && emailValid && rgpdValid

    let showHelpLN = false
    let showHelpFN = false
    let showHelpMess = false
    let showHelpPhone = false
    let showHelpEmail = false
    let showHelpRgpd = false
    let showHelpCaptcha = false

    // SENDING MAIL 
    $: rgpd = checked? rgpdText : 'no'
    $: name = firstName + ' ' + lastName

    const submittingMail = () => {
        let templateParams = {
            emailDest,
            siteName,
            name,
            phone,
            email,
            message,
            rgpd,
            permalink
        }

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(
            (response) => {
                console.log('SUCCESS 1!', response.status)
                resetContactForm()
                // dispatch('emailSent', {name})
                // on envoi la copie
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_COPY_ID, templateParams)
                .then(
                    (response) => {
                        console.log('SUCCESS copy!', response.status)
                    },
                    (error) => {
                        console.log('FAILED copy...', error)
                    }
                )
                // c'est fait !
            },
            (error) => {
                console.log('FAILED 1...', error)
            }
        )
    }

    const resetContactForm = () => {
        lastName = ""
        firstName = ""
        phone = ""
        email = ""
        message = ""
        checked = false 
        showHelpLN = false
        showHelpFN = false
        showHelpSubj = false
        showHelpMess = false
        showHelpPhone = false
        showHelpEmail = false
        showHelpRgpd = false
        showHelpCaptcha = false
    }
</script>
<form id="short-form" name="short-contact">
    <div class="columns">
        <div class="field column">
            <label for="last-name" class="label"><span class="has-text-danger">*</span> Nom de famille </label>
            <div class="control has-icons-left">
                <input 
                id="last-name" 
                class="input" 
                class:is-danger={showHelpLN}
                class:is-success={lastNameValid}
                on:blur={() => {showHelpLN = toggleHelp(lastName, 'last-name')}}
                bind:value={lastName}
                type="text" 
                name="last-name" 
                placeholder="mon nom de famille ici" 
                required
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-male"></i>
                </span>
            </div>
            <p class="help has-text-danger" class:is-invisible={!showHelpLN}>Champ indispensable (uniquement : a, ..., z / A,..., Z / - ' , . ? ! : _)</p>
        </div>
        
        <div class="field column">
            <label for="first-name" class="label"><span class="has-text-danger">*</span> Prénom</label>
            <div class="control has-icons-left">
                <input 
                id="first-name" 
                bind:value="{firstName}"
                class="input" 
                class:is-danger={showHelpFN}
                class:is-success={firstNameValid}
                on:blur={() => {showHelpFN = toggleHelp(lastName, 'last-name')}}
                type="text" 
                name="first-name" 
                placeholder="mon prénom ici" 
                required
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <p class="help has-text-danger" class:is-invisible={!showHelpFN}>Champ indispensable (uniquement : a, ..., z / A,..., Z / - ' , . ? ! : _)</p>
        </div>
    </div>
    <div class="columns">
        <div class="field column">
            <label for="email" class="label"><span class="has-text-danger">*</span> Email</label>
            <div class="control has-icons-left">
                <input 
                id="email"
                bind:value="{email}" 
                class="input" 
                class:is-danger={showHelpEmail}
                class:is-success={emailValid}
                on:blur={() => {showHelpEmail = toggleHelp(email, 'email')}}
                type="email" 
                name="email" 
                placeholder="contact@domain.com"  
                required
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
            <p class="help has-text-danger" class:is-invisible={!showHelpEmail}>Champ indispensable, merci de noter un mail valide</p>
        </div>
        <div class="field column">
            <label for="phone" class="label"><span class="has-text-danger">*</span> Téléphone</label>
            <div class="control has-icons-left">
                <input 
                id="phone" 
                bind:value={phone}
                on:blur={() => {showHelpPhone = toggleHelp(phone, 'phone')}}
                class="input" 
                class:is-danger={showHelpPhone}
                class:is-success={phoneValid}
                type="tel" 
                name="phone" 
                required
                > 
                <span class="icon is-small is-left">
                    <i class="fas fa-mobile"></i>
                </span>
            </div>
            <p class="help has-text-danger" class:is-invisible={!showHelpPhone}>Champ indispensable (0666096109 ou 0033666096109), sans aucun signe</p>
        </div>
    </div>
    <div class="field">
        <label for="message" class="label"><span class="has-text-danger">*</span> Message</label>
        <div class="control">
            <textarea 
            id="message" 
            bind:value={message}
            class="textarea" 
            class:is-danger={showHelpMess}
            class:is-success={messageValid}
            on:blur={() => {showHelpMess = toggleHelp(message, 'message')}}
            name="message" 
            required
            ></textarea>
        </div>
        <p class="help has-text-danger" class:is-invisible={!showHelpMess}>Champ indispensable (un certain nombre de caractères ne pourront pas être utilisés ex {@html '>, <, [, ])'}</p>
    </div>
    <div class="field">
        <div class="control">
            <label for="rgpd" class="checkbox">
                <input 
                id="rgpd" 
                bind:checked
                on:click={() => {showHelpRgpd = checked}}
                type="checkbox" 
                name="rgpd" 
                value="J'accepte que les informations utilisées ici soient nécessaires au traitement de ma demande" 
                required
                >
                <span class="has-text-danger">*</span> <span class:has-text-danger={showHelpRgpd}>{rgpdText}</span> <a href="/rgpd/">RGPD</a>
            </label>
            <p class="help is-danger" class:is-invisible={!showHelpRgpd}>Doit être approuvé pour envoyer ce mail</p>
        </div>
    </div>
    <div class="field is-grouped">
        <div class="control">
            <button 
            id="submit-button" 
            class="button is-link" 
            type="submit" 
            on:click|preventDefault={submittingMail}
            disabled={!formValid}
            >Envoyer</button>
        </div>
        <div class="control">
            <button 
            id="reset-button" 
            class="button is-warning"
            disabled={!formValid}
            on:click|preventDefault={resetContactForm}
            >Effacer</button>
        </div>
    </div>
</form>

<style lang="scss">
    .is-invisible {
        height: 0;
    }
    .field.column {
        margin-bottom: 0;
    }
</style>