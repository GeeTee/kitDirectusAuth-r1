<script>
    import { getContext } from "svelte";

    let gtCalfCentered = getContext('centrageArticles') === 'yes' ? true : false

    let classBase = []
    let classL = undefined
    
    for (const key in $$restProps) {
        classBase.push(key)
    }
    classL = classBase.join(' ')
</script>

<div
class={classL}
class:gt-half-centered={gtCalfCentered}
>
    <slot />
</div>