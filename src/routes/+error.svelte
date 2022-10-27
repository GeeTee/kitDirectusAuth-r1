<script>
  import { page } from '$app/stores';
</script>
<div class="notification is-warning">
    <h1 class="title">{$page.status}: {$page.error.message}</h1>
</div>

<style lang="scss">
    div {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
