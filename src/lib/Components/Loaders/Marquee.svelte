<script>
     export let value = "?";
     export let padding = "0px";
     export let direction = "down";
</script>

<!-- svelte-ignore a11y_distracting_elements -->
<marquee {direction} style="padding:{padding}">
     <slot>
          {@html value}
     </slot>
</marquee>

<style>
     marquee {
          font-style: italic bold;
          text-align: center;
          display: inline-block;
          width: fit-content;
          height: fit-content;
     }
</style>
