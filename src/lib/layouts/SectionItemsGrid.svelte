<script>

    // CLASSES CSS
    export let classBase = []
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }

    classL = classBase.join(' ')
</script>
<div 
id="gt-cols-by-hand" 
class={classL}
>
    <slot />
</div>
