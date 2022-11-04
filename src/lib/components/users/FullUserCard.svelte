<script>
    import { getContext } from 'svelte';
    import f from '$lib/helpers/scripts'
    import ContactCard from '$lib/components/users/ContactCard.svelte'
    import VCard from '$lib/components/users/VCard.svelte'

    const h3 = getContext('siteName')    
    const vcardFull = getContext('vcard')
    const {
        avatar, 
        full_name, 
        job,
        company, 
        redactionnel, 
        mobile, 
        email,
        address_1,
        zip,
        town,
        country} = vcardFull
    const vcardSummary = {
        full_name,
        job,
        mobile,
        email,
        address_1,
        zip,
        town,
        country
    }
</script>
<div>
    <div class="block">
        <ContactCard
        h2={full_name}
        {h3}
        {avatar}
        {email}
        tel={mobile}
        telVal={f.condensifyPhone(mobile)}
            />
    </div>
    <div class="block">
        <div id="gt-cols-by-hand" class="children-2">
            <div class="well">{@html redactionnel}</div>
            <div class="well">
                <VCard
                {company}
                vcard={vcardSummary}
                    />
            </div>
        </div>
    </div>
</div>