<!-- 
	Select field with SearchFieldNew
	v2025
-->
<script lang="ts">

	import SearchFieldNew from './SearchFieldZeelte.svelte';

	/** array[] list of raw-data for SearchField */
	export let data = [];

	/** array[] list of filtered-data to show in UI */
	export let data_filtered = [];

	/** name for SELECT */
	export let name: string = '';

	/** selected value for SELECT */
	export let value = -1;

	/** size of SELECT (how many rows) */
	export let size: number = 3;

	/** css styling */
	export let cssClass: string = ""
	export let cssStyle: string = ""

	/** selected id (keyvalue) to auto select and return */
	// -- export let selected_id = -1;
	/** selected text of the option field - readonly */
	// -- export let selected_text = '';
	// -- export let onchange = null;
	/** dom binding of select field */
	// -- let dom_select = undefined;

</script>

<div class="mx-auto w-full preset-outlined-primary-500">

	<SearchFieldNew 
		data={data} 
		bind:data_filtered={data_filtered}
	/>

	<slot>
	<select  
		{name}
		bind:value
		{size} 
		class="select rounded-container {cssClass}"
		style="{cssStyle}"
	>

		{#each data_filtered as row, id}

			{#if row instanceof Array}

				<!-- for now just dump,   future maybe styled? like tabbed  
					<li>{row[1]} {row[2]} {row[3]}</li>
				 -->
				<option value={row}>{row}</option>

			{:else if row instanceof Object}

				<!-- for now just dump,   future maybe styled? like tabbed  
					<li>{row.name} {row.date} {row.anyvalue}</li>
				 -->
				<option value={row?.id || row?.uuid || id}>
					{#each Object.entries(row) as [key, value],ido}
						{#if key != 'id' && key != 'uuid'} 
							{value}
						{/if}
					{/each}
				</option>

				<!-- previous tryouts, keep to do not again :-)

					<option value={row}>
						{#each row as col}
						{#each row as [key, value], id}
							{id} {key} {value}
						{/each}
					</option>

				{#each Object.entries(data_filtered) as [id, attrs] (id)}
					<option value={attrs?.id || '-1'}> {attrs?.name || '-'} </option>
				{/each}
				-->

			{:else}

				<!-- default fallback, just dump the content  -->
				<option value={row}>{row}</option>

			{/if}

		{/each}

	</select>
	</slot>

</div>
