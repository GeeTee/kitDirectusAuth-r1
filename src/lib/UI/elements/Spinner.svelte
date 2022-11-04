<script>
    export let text = 'Chargement'
</script>
<div id="loader">
  <div id="loader-item">
    <span class="title is-uppercase is-size-7">{text}</span>
    <div id="spining-item">
    </div>
  </div>
</div>

<style lang="scss">
$borderW: .4rem;
#loader {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
}
  #loader-item {
    // .title {
    //     color: var(--main-color-1)
    // }
    $dim: 12rem;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    align-items: center;
    display: flex;
    justify-content: center;
    height: $dim;
    width: $dim;
  }
#spining-item {
animation: spin 2s linear infinite;
border: $borderW solid transparent;
border-top-color: var(--main-color-1);
border-radius: 50%;
position: absolute;
top: 0;
left: 0;
height: 100%;
width: 100%;
&::before {
    $dim: .25rem;
    animation: spin 2.5s linear infinite;
    border: $borderW solid transparent;
    border-top-color: var(--main-color-3);
    border-radius: 50%;
    content: "";
    position: absolute;
    top: $dim;
    right: $dim;
    bottom: $dim;
    left: $dim;
}
&::after {
    $dim: 1rem;
    animation: spin 3s linear infinite;
    border: $borderW solid transparent;
    border-top-color: var(--hover-link-color);
    border-radius: 50%;
    content: "";
    position: absolute;
    top: $dim;
    right: $dim;
    bottom: $dim;
    left: $dim;
}
}
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
