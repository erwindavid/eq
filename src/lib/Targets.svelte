<script>
	import { getText } from "./Lang.js"
	import { form } from "../data/form.js"
	export let items
	export let lang
	export let pageSet
	export let formUser
	export let formPos
	let checkAll
	function toggleAllNotifs(){
		formUser = Object.entries(formUser).reduce((acc,cur)=>{
				if (checkAll.checked) {
					cur[1]["notified"] = [Number(cur[0])]
				} else {
					cur[1]["notified"] = []
				}
			// acc.push(
			acc[cur[0]] = cur[1]
			return acc}
		,{})
		console.log(formUser)
	}
	// console.log(items)
	
	function getNextFrequency(e) {
		switch (e) {
			case "Daily" : return "Weekly"
			case "Weekly" : return "Monthly"
			case "Monthly" : return "Daily"
			default : return "Weekly"
		}
	}
	
	function handleLabelClick(e) {
		formPos["activeDiv"]=Number(e["question-id"])
		pageSet="Questions"
	}

</script>

<div class="targets btm-space">
	<h3><span class="emoji">🎯</span>{getText("score-target-title", lang)}</h3>
	{#if Object.values(formUser).reduce((acc, cur)=>{
		acc += cur["monitored"]
		return acc
	},0) > 0}
		<div class="notify btm-line header">
			<div></div>
			<div>{getText("score-target-header1", lang)}</div>
			<div>{getText("score-target-header2", lang)}</div>
			<input 
				id="all" 
				type="checkbox" 
				on:change={toggleAllNotifs} 
				bind:this={checkAll}>
			<label for="all"></label>
			<img class="center-h-grid"
				src="./src/assets/Frequency.svg" 
				height="26px" 
				width="26px"
				alt="Frequency icon">
		</div>
		{#each items as item}
			<div class="notify btm-line" 
				style="min-height: 40px">
				<div class="center-h-grid">{item.icon}</div>
				<div on:click={()=>handleLabelClick(item)}>{item.question+" : "+item.answer}</div>
				{#if form.reduce((acc,cur) => {
						if (cur.title.id == item["section-id"]) {
							cur.items.map(f=>{
								if (f.title.id == item["question-id"]){
									f.items.map(g=>{
										if (g.id>item["answer-id"]) {
											acc.push(g)
										}
									})
								}
							})
						}
						return acc
					},[]).length>0}
				<select bind:value={formUser[item["question-id"]]["target"]}>
					{#each form.reduce((acc,cur) => {
						if (cur.title.id == item["section-id"]) {
							cur.items.map(f=>{
								if (f.title.id == item["question-id"]){
									f.items.map(g=>{
										if (g.id>item["answer-id"]) {
											acc.push(g)
										}
									})
								}
							})
						}
						return acc
					},[]) as option}
						<option
							value={option["id"]}>
								{option[lang]}
						</option>
					{/each}
				</select>
				{:else}
				<div>{getText("score-target-achieved", lang)}</div>
				{/if}
				<input 
					type="checkbox"
					id={item.question}
					value={item["question-id"]}
					on:change={checkAll.checked=false}
					bind:group={formUser[item["question-id"]]["notified"]}>
				<label for={item.question}></label>
				{#if formUser[item["question-id"]]["notified"].length > 0}
						<img class="center-h-grid"
							on:click={()=>formUser[item["question-id"]]["frequency"]=getNextFrequency(formUser[item["question-id"]]["frequency"])}
							src={"/eq/src/assets/"+formUser[item["question-id"]]["frequency"]+".svg"}
							height="24px" 
							width="24px"
							alt="Frequency icon">
				{/if}
			</div>
		{/each}
		<br>
	{:else}
		<div class="no-target">
			<div class="italic">
				{getText("notify-start1" ,lang)}
			</div>
			<div class="no-target-demo flex-h">
				<img 
					src="./src/assets/Monitore.svg" 
					height="24px" 
					width="24px"
					alt="Monitore icon">
				<img 
					class="rotate-90 opacity20" 
					src="./src/assets/Arrow.svg" 
					height="24px"
					width="24px"
					alt="Arrow icon">
				<img 
					src="./src/assets/Monitore-active.svg" 
					height="24px" 
					width="24px"
					alt="Monitore-active icon">
			</div>
			<div class="italic">
				{getText("notify-start2" ,lang)}
			</div>
			<div class="no-target-demo">
				<img 
					src="./src/assets/Dropdown.svg" 
					height="24px" 
					width="24px"
					alt="Dropdown icon">
			</div>
			<div class="italic">
				{getText("notify-start3" ,lang)}
			</div>
			<div class="no-target-demo flex-h">
				<img 
					src="./src/assets/Notify.svg" 
					height="24px" 
					width="24px"
					alt="Notify icon">
				<img 
					class="rotate-90 opacity20" 
					src="./src/assets/Arrow.svg" 
					height="24px"
					width="24px"
					alt="Arrow icon">
				<img 
					src="./src/assets/Notify-active.svg" 
					height="24px" 
					width="24px"
					alt="Notify-active icon">
			</div>
		</div>
	{/if}
</div>
