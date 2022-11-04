<script>
    import f from '$lib/helpers/scripts'

    export let company = null
    export let vcard = {}
    export let padLeft = false
    export let dark = false
</script>
<ul class="vcard simple" class:padLeft class:dark class:light={!dark}>
    {#if company}
         <li class="org"><i class="fas fa-building"></i>{company }</li>
    {/if}
    
    <li class="fn"><i class="fas fa-male"></i>{vcard.full_name}</li>
    {#if vcard.address_1}
         <li class="street-address"><i class="fas fa-map-pin"></i>{vcard.address_1}</li>
    {/if}
    {#if vcard.town !== 'undefined'}
         <li> <i class="fas fa-map-marker-alt"></i>
            {#if vcard.zip}
                <span class="zip">{vcard.zip}</span> 
            {/if}
        <span class="locality">{vcard.town}</span></li>
    {/if}
    

    <li class="phone"><i class="fas fa-phone"></i> <a title="Téléphoner à {vcard.fullName}"
                href="tel:{f.condensifyPhone(vcard.mobile)}">{vcard.mobile}</a></li>
    {#if vcard.email !== 'null'}
        <li class="email">
            <i class="fas fa-at"></i>
            <a title="adresser un mail à {vcard.fullName}" href="mailto:{vcard.email}">{vcard.email}</a>
        </li>
    {/if}

</ul>

<style lang="scss">
    $color: var(--main-color-1);
    $colorDark: var(--main-border-color);
    .light, i {
        color: $color;
    }

    .dark {
        i {
            color: $colorDark;
        }
        a {
            color: $colorDark;
            &:hover {
                color: $color;
            }
        }
    }

    .padLeft {
        padding-left: .75rem;
        > li {
            padding-bottom: .3rem;
            padding-top: .3rem;
        }
    }
</style>