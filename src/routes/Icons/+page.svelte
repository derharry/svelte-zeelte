<script>
	import Icons from "$lib/Components/Icons/Icons.svelte";
	import LucideIcon from "$lib/Components/Icons/LucideIcon.svelte";
</script>

<h1>Icons</h1>

Font-Awesome and Google Material:
<ul> 
     <li><Icons /> &lt;Icons /&gt;</li>
     <li><Icons name="fa fa-ambulance" /> &lt;Icons name="fa fa-ambulance"/&gt;</li>
</ul>

Lucide
<ul> 
     <li><LucideIcon /> &lt;LucideIcon /&gt;</li>
     <li><LucideIcon name="ambulance" /> &lt;LucideIcon name="ambulance"/&gt;</li>
</ul>