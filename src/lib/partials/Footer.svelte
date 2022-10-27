<script>
  import { getContext } from 'svelte';

  import Nav from '$lib/partials/navs/NavLinks.svelte'
  import Card from '$lib/components/users/SimpleCard.svelte'

  export let path = '/'
  export let isAuthenticated = false

  const metiersLinks = getContext('metiersLinks')
  const navGeneraleLinks = getContext('navGeneraleLinks')
  const navAdminLinks = getContext('navAdminLinks')

  const vcard = getContext('vcard')
  const footerWidth = getContext('footerLargeur')
  // console.log('footer', {vcard})

  // const company = getContext('title')
  // const vcard = getContext('vCard')
  const padLeft = true
</script>
<footer id="main-footer" class="p-4" class:container={footerWidth === 'container'}>
  <div class="columns">
    {#if metiersLinks.length > 0}
      <div class="column">
        <h4 class="subtitle is-size-6 is-uppercase">métiers</h4>
        <div class="nav">
          <Nav {path} links={metiersLinks} {padLeft} />
        </div>
      </div>
    {/if}
      {#if navGeneraleLinks.length > 0}
        <div class="column">
          <h4 class="subtitle is-size-6 is-uppercase">suivre</h4>
          <div class="nav">
            <Nav {path} links={navGeneraleLinks} {padLeft} {isAuthenticated} />
          </div>
        </div>
      {/if}

    <div class="column">
      <h4 class="subtitle is-size-6 is-uppercase">à noter</h4>
      <Card
        company={vcard.company}
        {vcard}
          />
    </div>
    {#if navAdminLinks.length > 0}
      <div class="column">
        <h4 class="subtitle is-size-6 is-uppercase">légal</h4>
        <div class="nav">
          <Nav {path} links={navAdminLinks} {padLeft} />
        </div>
      </div>
    {/if}

  </div>
</footer>

<style lang="scss">
  footer {
    background-color: var(--main-color-2);
    color: var(--bg-color)
  }
  .subtitle {
    letter-spacing: 0.2rem;
  }
</style>