<!-- 
	SearchField
	v2025
-->
<script lang="ts">

	//#region Component related

	import { createEventDispatcher } from 'svelte';
	const event = createEventDispatcher()

	import { Search } from "@lucide/svelte";
	import { ZP_EventDetails } from 'zeeltephp';

	/** name of Input searchfield */
	export let name : string = '';

	/** value of Input searchfield */
	export let value : string = '';
	
	/** value of Input placeholder */
	export let placeholder : string = '';

	/** title of Component */
	export let title : string = "zoeken";

	/** formaction for Button */
	export let formaction : string = '';

	/** is Input required ? */
	export let required : boolean = false;

	/** css of Input */
	export let cssClass : string = '';

	/** css of Input */
	export let cssStyle : string = '';

	//#endregion Component related

	//#region Search and Filter

	/** data to use search-filter on */
	export let data = []

	/** filtered data of search-filter */
	export let data_filtered = []

	/** fields to search-filter */
	export let search_fields = ['*']

	/** extra fields to search-filter. like set dynamicaly when you use a checkbox for example */
	export let search_fields_extended = []

	/** the search-fields to search-filter - update on changes */
	$: search_fields_todo = [...search_fields, ...search_fields_extended];

	/** 
	 * the search-filter on the data 
	 * loads the list data on page-navigation and search_string changes
	*/  
	$: data_filtered = data.filter((row) => {
		const searchTerm = value.toLowerCase();
		let match = value === ''; // value = empty ? just true to show all data
		if (!match && row !== null) {
			if (typeof row === 'string') return row.toLocaleLowerCase().includes(value)
			if (Array.isArray(row)) return row.some(col => String(col).toLowerCase().includes(value))
			if (typeof row === 'object') return Object.entries(row).some(([key, val]) => {
				if (['id', 'uuid'].includes(key)) return false;
				if (!val) return false;
				return String(val).toLowerCase().includes(searchTerm);
			})
			return false
		}
		return match;
	});

	//#endregion Search and Filter
	
</script>

<div 
	{title}
	class="
		input-group grid-cols-[1fr_auto]
		preset-outlined-primary-500
	"
>
	<input 
		id="searchInput"
		{name}
		bind:value
		type="text"
		{placeholder} 
		{required}
		class="ig-input {cssClass}" 
		style={cssStyle}
		on:keydown={ (e) => { 
			const ed = new ZP_EventDetails(e);
			if (ed.keyId == 27) 
				// when ESC   - clear search field to ''
				value = '';
			else if (ed.keyId == 13) 
				// when ENTER - SubmitEvent //--event('submit')} 
				event('submit')
			
		}}
	/>
	<button 
		type="button"
		id="submitBtn"
		{formaction}
		class="ig-btn preset-filled-primary-500" 
		on:click|preventDefault={ (e) => { 
			//if (document.getElementById('searchInput').checkValidity())
			event('submit')
		}}
	><Search size={16} /></button>
</div>
