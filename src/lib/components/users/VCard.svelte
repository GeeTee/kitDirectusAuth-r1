<script>
    export let company = ''
    export let vcard = {}
</script>
<div itemprop="articleSection" itemscope itemtype="https://schema.org/Organization">
    <span itemprop="brand" class="subtitle">{company}</span>
    <div itemprop="member" itemscope itemtype="https://schema.org/OrganizationRole">
        <span itemprop="member" itemscope itemtype="https://schema.org/Person">
            Responsable : <br><span class="icone-color"><i class="fas fa-male"></i></span> <span itemprop="name" class="subtitle">{vcard.full_name}</span> <br>
            <span class="icone-color"><i class="fas fa-laptop-code"></i></span> <span itemprop="roleName">{vcard.job}</span>
        </span>
    </div>
    <span class="icone-color"><i class="fas fa-mobile-alt"></i></span> <span itemprop="telephone">{vcard.mobile}</span> <br>
    <span class="icone-color"><i class="fas fa-envelope-open"></i></span> <span itemprop="email">
        {vcard.email}
    </span>
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
        <span class="icone-color"><i class="fas fa-address-card"></i></span> <span itemprop="streetAddress">{vcard.address_1}</span>
        <span itemprop="postalCode">{vcard.zip}</span>
        <span itemprop="addressLocality">{vcard.town} {vcard.country}</span>
    </div>
</div>

<style lang="scss">
    i {
        color: var(--main-color-3);
    }
</style>