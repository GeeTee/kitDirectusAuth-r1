<script>
    let classBase = []
    let classL = undefined
    
    for (const key in $$restProps) {
        classBase.push(key)
    }
    classL = classBase.join(' ')
</script>

<div
class={classL}
>
    <slot />
</div>