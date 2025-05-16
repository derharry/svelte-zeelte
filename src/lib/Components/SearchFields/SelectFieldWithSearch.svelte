<!-- 
	Select field with SearchFieldNew
	v2025
-->
<script lang="ts">

	import { onMount } from 'svelte';

	import SearchFieldNew from './SearchField.svelte';

	/** array[] list of raw-data for SearchField */
	export let data = [];

	/** array[] list of filtered-data to show in UI */
	export let data_filtered = [];

	/** name for SELECT */
	export let name: string = '';

	/** selected value for SELECT. id = index or id,uuid */
	export let value = undefined;

	/** size of SELECT (how many rows) */
	export let size: number = 3;

	/** css styling */
	export let cssClass: string = ""
	export let cssStyle: string = ""

	/** selected text of the option field - readonly */
	export let value_text = '';

	/** dom binding of select field */
	let dom_select :HTMLSelectElement = undefined;

	// -- Svelte4: // $:value_text = value ? dom_select.options[dom_select.selectedIndex].textContent ?? '' : '';
	// --> changed select on:change to onchange to work in Svelte 5

	onMount(() => {
		// update the value_text after document is mounted
		value_text = dom_select.options[dom_select.selectedIndex].textContent ?? '';
	})

</script>

<style>

	/*
		self styling because default selected is missing with skeletonUI 
	*/
	select {
		margin-top: 1px;
		width: 100%;
		padding: 0.5rem 0rem;
		font-size: 1em;
		/*
		border-radius: 0.5rem;
		border: 1px solid #d1d5db; /* gray-300 * /
		background: #fff;
		color: #222;
		font-size: 1rem;
		transition: border-color 0.2s, box-shadow 0.2s;
		*/
	}
	option {
		padding: 0.25rem 0.75rem;
	}
	/*
	option:selected {
		background-color: red !important;
	}
	select:focus {
		border-color: #f97316; /* orange-500 * /
		box-shadow: 0 0 0 2px #fde68a88; /* subtle orange focus ring * /
		outline: none;
	}
	select:checked,
	select::selection
	 {
		background-color: DodgerBlue !important;
	}
	*/
</style>

<div class="mx-auto w-full preset-outlined-primary-500">

	<SearchFieldNew 
		data={data} 
		bind:data_filtered={data_filtered}
	/>

	<slot>

		<select 
			bind:this={dom_select}
			bind:value
			{name}
			{size}
			class="{cssClass}"
			style="{cssStyle}"
			onchange={() => {
				// Update value_text with the selected option's label
				value_text = dom_select.options[dom_select.selectedIndex]?.textContent ?? '';
			}}
		>
			{#each data_filtered as row (row?.id || row?.uuid || row)} <!-- Keyed each loop -->

				{#if row instanceof Array}

                         <!-- 
                              for now just dump, future maybe styled? like tabbed  
					     <li>{row[1]} {row[2]} {row[3]}</li>
				     -->
					<option value={row}>{row}</option>

				{:else if row instanceof Object}

                         <!-- 
                              for now just dump,   future maybe styled? like tabbed  
                              <li>{row.name} {row.date} {row.anyvalue}</li>
                         -->
					<option value={row?.id || row?.uuid || row}>
						{#each Object.entries(row) as [key, val],id}
							{#if !['id', 'uuid'].includes(key)}
								{val}
							{/if}
						{/each}
					</option>

                         <!-- 
                              previous tryouts, keep to do not again :-)
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
