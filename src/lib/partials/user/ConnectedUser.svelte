<script>
    import u from "$lib/stores/userStore";
    import { getContext, onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let positionAbsolute = true
    export let isAuthenticated = false
    export let ConnectedUser = {}

    const getImgSrc = getContext('getImgSrc')
    const key = '60x60-png'
</script>
{#if isAuthenticated}
<div class="avatar-container" class:positionAbsolute class:positionRelative={!positionAbsolute}>
  <div class="avatar">
    <div class="image is-64x64">
        <img in:fade="{{duration: 300}}" class="is-rounded" src={getImgSrc(ConnectedUser.avatar, key)} alt="{ConnectedUser.first_name} {ConnectedUser.last_name}">
      
    </div>
    <span in:fade="{{duration: 300}}" class="has-text-weight-medium is-size-7 has-background-dark">{ConnectedUser.first_name}</span>
  </div>
</div>
{/if}

<style lang="scss">
  $color: var(--main-color-2);
  .positionAbsolute {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .positionRelative {
    position: relative;
    height: 64px;
    width: 64px;
    margin-left: auto;
    margin-right: auto;
  }
  .avatar-container {
    // background-color: red;
    border-radius: 50%;
    display: flex;
    justify-content: flex-end;
    // overflow: hidden;
    padding: 0 !important;
    // position: absolute;
    // top: 10px;
    // right: 0;
    z-index: 5;
  }
  .avatar {
    // align-items: center;
    // display: flex;
    // flex-direction: column;
    position: relative;
    // text-align: center;
    width: 64px;
    span {
      // background-color: transparentize($color, 1);
      color: $color;
      position: absolute;
      bottom: -1rem;
      left: 0;
      right: 0;
      text-align: center;
      // transform: translateX(-50%);
    }
  }
</style>