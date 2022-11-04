<script>
  import { fade } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  export let refresh = '';
</script>

{#key refresh}
  <div
    in:fade={{duration: 400, delay: 400, easing:sineInOut}}
    out:fade={{duration: 400, easing:sineInOut}}
    >
    <slot/>
  </div>
{/key}