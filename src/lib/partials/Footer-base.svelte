<script>
  import { getContext } from 'svelte';

  import NavG from '$partials/navs/NavGeneraleFooter.svelte'
  import NavM from '$partials/navs/NavMetier.svelte'
  import NavA from '$partials/navs/NavAdmin.svelte'
  import NavBsbE from '$partials/navs/NavBsbEntreprises.svelte'
  import Card from '$components/users/SimpleCard.svelte'

  export let path = '/'

  const company = getContext('title')
  const vcard = getContext('vCard')
  const padLeft = true
</script>
<footer id="main-footer" role="contentinfo">
  <div class="columns">
    <div class="column">
      <h4 class="subtitle is-size-5  is-text-relief">joindre</h4>
      <div class="footer-nav">
        <div class="nav block">
          <NavBsbE />
        </div>
      </div>
      <Card
        {company}
        {vcard}
        {padLeft}
          />
    </div>
    <div class="column">
      <h4 class="subtitle is-size-5  is-text-relief">suivre</h4>
      <div class="footer-nav">
        <div class="nav">
          <NavM {path} />
        </div>
      </div>
    </div>
    <div class="column">
      <h4 class="subtitle is-size-5  is-text-relief">découvrir</h4>
      <div class="nav">
        <NavG {path} />
      </div>
    </div>
    <div class="column">
      <h4 class="subtitle is-size-5  is-text-relief">légal</h4>
      <div class="footer-nav">
        <div class="nav">
          <NavA {path} />
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
	$main-color-1: #313131;
	$main-color-2: #FFD700;
	footer {
        &#main-footer {
            padding: 1.5rem;
            background: $main-color-1;
            min-height: 10rem;
            // margin-top: auto;
            h4 {
                &.subtitle {
                    color: $main-color-2;
                    text-transform: uppercase;
                }
            }
        }
    }
</style>