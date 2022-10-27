<script>
  import { getContext } from "svelte";
  import { onMount } from "svelte";
  import f from '$lib/helpers/scripts'
  import Banner from '$lib/partials/images/cld/BannerCldFull.svelte'

  export let heading = 'Header title'
  export let slogan = null
  export let bannerId = null // cld_public_id


  let header
  let offsetH
  let y

  const goToMain = () => {
    // console.log('goToMain before', {offsetH})
    window.scrollTo({
      top: offsetH,
      behavior: 'smooth'
    })
    // console.log('goToMain after', {offsetH})
  }

  onMount(
    () => {
      offsetH = header.clientHeight
    }
  )

</script>
<svelte:window bind:scrollY={y}/>
<header id="main-header"  class="main-header" bind:this={header}>
  <hgroup style:transform={`translateY(-${y * 0.5}px)`}>
    <h1 id="header-title" class="title is-uppercase is-text-overflow px-6">
      {heading}
    </h1>
    
    {#if slogan}
         <h2 class="subtitle mb-1">{@html slogan}</h2>
    {/if}
  </hgroup>
  {#if bannerId}
     <Banner cld_public_id={bannerId} />
  {/if}
  <!-- <a class="gt-anchor" href="#level-main-content"><i class="fa fa-angle-double-down" aria-hidden="true"></i> {offsetH}</a> -->
  <button class="gt-anchor" on:click={goToMain}><i class="fa fa-angle-double-down" aria-hidden="true"></i></button>
  

</header>

<style lang="scss">
  .main-header {
    // background-color: var(--main-color-2) !important;
    position: relative;
    overflow: hidden;
    // img {
    // object-fit: cover;
    // pointer-events: none;
    // width: 100%;
    // height: auto;
    // mix-blend-mode: overlay;
    // }   
    > hgroup {
      padding-left: 1rem;
      padding-right: 1rem;
      position: absolute;
      top: 60%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: center;
      > h1 {
      color: #FB8604;
      $borderW: 0.2rem;
      font-size: 9vw;
      border-bottom: $borderW solid #FB8604;
      border-top: $borderW solid #FB8604;
      text-align: center;
      }
    }
    .gt-anchor {
      background-color: transparent;
      border: none;
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      > i.fa {
      color: #FB8604;
      font-size: 4rem;

      // z-index: 1000;
      &:hover {
        cursor: pointer;
      }
    }
    }
    
  }

  @media(min-width: 768px) {
    .main-header {
      height: calc(100vh - 52px);
      > hgroup {
        top: 30%;
      }
      // img {
      //   height: 100%;
      // }
    }
  }

  // .with-banner{
  //   background-color: var(--main-color-2);
  //   position: relative;
  //   overflow: hidden;
  //   height: calc(100vh - 52px);
  //   hgroup {
  //     position: absolute;
  //     top: 30%;
  //     // left: 50%;
  //     transform: translateY(-50%);
  //     width: 100%;
  //     display: flex;
  //     justify-content: center;
  //   }
  //   h1 {
  //     color: var(--main-color-1);
  //     $borderW: 0.2rem;
  //     font-size: 10vw;
  //     border-bottom: $borderW solid var(--main-color-1);
  //     border-top: $borderW solid var(--main-color-1);
  //   }
  //   img {
  //     // object-fit: cover;
  //     // pointer-events: none;
  //     mix-blend-mode: overlay;
  //   }
  // }

</style>