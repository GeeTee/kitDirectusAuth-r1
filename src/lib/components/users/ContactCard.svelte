<script>
    import { getContext } from "svelte";
    import Buttons from "$lib/UI/TelEmailButtons.svelte"
    import Modal from '$lib/UI/Modal.svelte'
    import Form from '$lib/partials/forms/ShortForm.svelte'

    export let h2 = 'H2 contact form'
    export let h3 = 'H3 contact form'
    export let avatar = {}
    export let tel = ''
    export let telVal = ''
    export let email = ''

    const getImgSrc = getContext('getImgSrc')
    const siteName = getContext('siteName')
    const permalink = getContext('permalink')
    const key = '128x128-png'
    const {id} = avatar

    // Modal VARS
    let openModal = ''
    const titleModal = `Contacter ${h2}`

    const toggleMail = (e) => {
        console.log('Card toggleMail')
        openModal = 'open'
    }
    // MODAL FUNCTIONS
    // const openThisModal = (e) => {
    //     console.log('openThisModal', e.detail)
    //     name = e.detail.name
    //     openModal = 'open'
    // }
    const closeModal = () => {
        openModal = ''
    }
</script>
<div class="contact-card">
    <div class="header has-text-centered mb-4">
        <h2 class="subtitle is-size-5 mb-2">{h2}</h2>
        <h3 class="subtitle is-uppercase is-size-6 mb-2">{h3}</h3>
    </div>
  <div class="avatar">
    <div class="image is-128x128">
        <img class="is-rounded" src={getImgSrc(id, key)} alt="{h2}" width="128" heigh="128">
    </div>
  </div>
  <Buttons 
  {telVal} 
  {tel} 
  {email} 
  on:toggleMailAction={toggleMail}
  />
</div>

{#if openModal === 'open'}
    <Modal
    title={titleModal}
    on:cancelMod={closeModal}
    >
        <Form emailDest={email} {siteName} {permalink} />
     </Modal>
{/if}

<style lang="scss">
.contact-card {
    align-items: center;
    display: flex;
    flex-direction: column;
    .header {
        order: 1;
    }
    .avatar {
        order: 0;
    }
    // .divers {
    //     align-self: stretch;
    //     order: 2;
    // }
    img {
        border: 0.2rem solid var(--main-color-1);
    }
}
</style>