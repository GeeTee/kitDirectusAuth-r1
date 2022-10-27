<script>
    let isLoading = false

    const handleUploadImage = () => {
        console.log('handleUploadImage')
        //TODO:
    }  
</script>

Banner upload <br>
<button class:is-loading={isLoading} class="button is-primary" on:click={handleUploadImage}>
<span class="icon is-small"><i class="fas fa-camera-retro"></i></span>
<span>Choisir</span>
</button>