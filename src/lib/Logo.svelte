<script>
	export let pageSet
	export let lang
	const setPage = (item) => {
		pageSet = item
	}
</script>

{#if lang=="fr-FR"}
	<div class="flex-h logo" on:click={()=>setPage('Score')}>
		<img 
			src="/src/assets/EQ.svg" 
			height="38px" 
			width="38px"
			alt="EQ logo">
		<p> <span class="accessory">Mon </span>
			<span><span class="initials">Q</span>uotien</span><br>
			<span class="principal linetwo"><span class="initials">E</span>cologique</span>
		</p>
	</div>
{:else}
	<div class="flex-h logo" on:click={()=>setPage('Score')}>
		<img 
			src="/src/assets/EQ.svg" 
			height="38px" 
			width="38px"
			alt="EQ logo">
		<p> <span class="accessory">My </span>
			<span><span class="initials">Q</span>uotient</span><br>
			<span class="principal linetwo"><span class="initials">E</span>cological</span>
		</p>
	</div>
{/if}
