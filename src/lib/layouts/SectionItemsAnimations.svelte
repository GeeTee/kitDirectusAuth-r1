<script>
    // CLASSES CSS
    let classBase = []
    let classL = undefined
    
    for (const key in $$restProps) {
        if (!classBase.includes(key))
        {classBase.push(key)}
    }

    classL = classBase.join(' ')
</script>
<div class={classL}>
    <slot />
</div>