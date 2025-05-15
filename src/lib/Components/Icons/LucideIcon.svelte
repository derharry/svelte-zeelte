<!--

<LucideIcon icon="" />
<LucideIcon icon="" cssClass="" cssStyle="">

Load SVG-icons from CDN for Lucide-static-Icons by given icon-name

v1, v2025-05-14, Svelte 4, 5
See available icons:
    Visit Lucide-Icons https://lucide.dev/icons/
    Use <LucideIconSearch />
Default <LucideIcon icon="circle-help" cssClass="" cssStyle="font-size:1em">  

-->
<script lang="ts">
    //import * as icons from '@lucide/svelte';

    /** name of the icon */
    export let name     :string  = 'circle-help'

    /** <i class=""> */
    export let cssClass :string  = ''

    /** <i style=""> */
    export let cssStyle :string  = 'font-size:1em'

    /** html IMG props */
    export let props:object = {}
</script>


<!-- load CDN into head (1-time) -->
<svelte:head>
    <!-- Icon font -->
    <style>
         @font-face {
             font-family: 'LucideIcons';
             src: url(https://unpkg.com/lucide-static@latest/font/Lucide.ttf) format('truetype');
        }
    </style>
</svelte:head>


<!-- SVG file for a single icon -->
<img src="https://unpkg.com/lucide-static@latest/icons/{name}.svg" class="{cssClass}" style="font-size:1em {cssStyle}" {...props}/>
