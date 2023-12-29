<script>
	const nav = ['Score', 'Questions', 'Progression']
	export let pageSet
	export let formPos
	const setPage = (item) => {
		pageSet = item
	}
</script>

<div class="nav-container">
	<div class="nav">
		{#each nav as item}
			<div class="nav-btn" on:click={()=>setPage(item)}>
				{#if item == pageSet}
					<img src={"../src/assets/"+item+"-active.svg"} height="32px" width="32px">
					<div class="nav-label active">{item}</div>
				{:else}
					<img src={"../src/assets/"+item+".svg"} height="32px" width="32px">
					<div class="nav-label">{item}</div>
				{/if}
			</div>
		{/each}
	</div>
</div>