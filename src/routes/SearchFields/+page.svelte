<script lang="ts">

	//import SearchFieldNew from "./SearchFieldNew.svelte";
	import SelectFieldWithSearch from "$lib/Components/SearchFields/SelectFieldWithSearch.svelte";

	/** example search data */
	let data_listArray_string = [
		'xxx',
		'yyy',
		'zzz'
	]

	/** example search data */
	let data_listArray_array = [
		[ 0, 'hello', '2025-01-01', 'xxx' ],
		[ 1, 'John',  '2025-02-01', 'yyy' ],
		[ 2, 'Wick',  '2025-05-01', 'zzz' ],
	]

	/** example search data */
	let data_listObject = [
		{ id: 0, name: 'hello', date: '2025-01-01', anyvalue: 'xxx' },
		{ id: 1, name: 'John',  date: '2025-02-01', anyvalue: 'yyy' },
		{ id: 2, name: 'Wick',  date: '2025-05-01', anyvalue: 'zzz' },
	]

</script>

<h1>SearchFields</h1>

&lt;SearchFieldNew /&gt;
<br>
&lt;SelectFieldWithSearch /&gt;

<div class="mx-auto p-4">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">

		<div>
			List&lt;Array&gt;
			<SelectFieldWithSearch data={data_listArray_string} />
		</div>		
		<div>
			ObjectList&lt;key-value-pairs&gt;		
			<SelectFieldWithSearch data={data_listArray_array} />

		</div>		
		<div>
			ObjectList&lt;key-value-pairs&gt;
			<SelectFieldWithSearch data={data_listObject} />
		</div>
	</div>
</div>