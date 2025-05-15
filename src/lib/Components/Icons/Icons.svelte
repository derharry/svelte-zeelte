<!--

<Icons icon="" />
<Icons icon="" cssClass="" cssStyle="">

Load icon from CDN for
    FontAwesome v4.7.0      (icon: starts with `fa fa-`)
    Google Material-Icons   (icon: any)

v1, v2025-05-14, Svelte 4, 5
See available icons:
    W3Schools https://www.w3schools.com/icons/icons_reference.asp
    Use </IconOldSearch />
Default <Icons icon="fa fa-question-circle-o" cssClass="" cssStyle="font-size:1em">  

-->
<script lang="ts">

    /** name of the icon */
    export let name     :string  = 'fa fa-question-circle-o'

    /** <i class=""> */
    export let cssClass :string  = ''

    /** <i style=""> */
    export let cssStyle :string  = 'font-size:1em'

    /** html IMG props */
    export let props:object = {}

    /** internal flag for $: and if/else */
    let icon_reference : string  = 'fontawesome|materialicons'

    /** set internal flag */
    icon_reference = name && name.startsWith('fa fa-') ? 'fontawesome' : 'materialicons'

</script>

<!-- load CDN into head (1-time) -->
<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</svelte:head>

<!-- load the icon from ... -->
{#if icon_reference == 'fontawesome'}
    <i class="{name} {cssClass}" style="{cssStyle}"></i>
{:else if icon_reference == 'materialicons'}
    <i class="material-icons {cssClass}" style="{cssStyle}" {...props}>{name}</i>
{/if}