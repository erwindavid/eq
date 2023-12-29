<script>
	export let formUser
	export let formPos
	export let form
	export let handleNote
	export let lang
	function handleClick(id, i) {
		formPos["activeDiv"] = Number(id)
		scrollToDiv(formPos["activeDiv"])
	}
	function scrollToDiv(id) {
		setTimeout(()=>{
			window.scrollTo(0, document.getElementById(id).parentElement.getBoundingClientRect().top+window.scrollY-80 )
		},100)
	}
	scrollToDiv(formPos["activeDiv"])

</script>

<div class="btm-space">
	{#each form as section, i}
	<div>
		<div
			id={section.title.id}
			class="flex-h question-title" 
			on:click={handleClick(section.title.id, i)}
		>
			<div class="flex-h">
				<div class="emoji">{section.title.icon}</div>
				<h3>{section.title[lang]}</h3>
			</div>
			<div>{formPos["activeSection"] == section.title.id ? "ߡ" : "ߜ" }</div>
		</div>
		{#if Math.round(formPos["activeDiv"]/1000,0)*1000 == section.title.id}
			<ol>
			{#each section.items as question}
				<div>
					<div class="flex-h monitore">
						<h4><li>{question.title[lang]}</li></h4>
						<input
							type="checkbox"
							id={question.title.id}
							value={question.title.id}
							bind:group={formUser[question.title.id]["monitored"]}>
						<label for={question.title.id}></label>
					</div>
					{#each question.items as answer}
						<div>
							<input
								type="radio" 
								value={answer.id} 
								name={question.title.id}
								bind:group={formUser[question.title.id]["answer"]}
								on:change={handleNote}>
							<label>{answer[lang]}</label>
						</div>
					{/each}
				</div>
			{/each}
			</ol>
		{/if}
	</div>
	{/each}
</div>