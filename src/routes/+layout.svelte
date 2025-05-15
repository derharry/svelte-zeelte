<script>

	import '@picocss/pico';
	import '../app.css';

	import { base } from '$app/paths';

	let { children } = $props();
	
</script>

<nav>
	<ul>
		<li><a href="{base}/">Home</a></li>
	</ul>
</nav>

{@render children()}