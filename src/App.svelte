<script>

// MODULES

	// Stores
	import { timeseries } from "./stores/timeseries.js"
	import { lang } from "./stores/lang.js"
	import { formpos } from "./stores/formpos.js"
	import { formuser } from "./stores/formuser.js"
 
	// Data
	import { form } from "./data/form.js"

	// Utils
	import { getText } from "./lib/Lang.js"
	import { currentHour } from "./lib/Dates.js"

	// Components
	import Logo from "./lib/Logo.svelte"
	import Menu from "./lib/Menu.svelte"
	import Score from "./lib/Score.svelte"
	import Noscore from "./lib/Noscore.svelte"
	import Targets from "./lib/Targets.svelte"
	import Form from "./lib/Form.svelte"
	import Linechart from "./lib/Linechart.svelte"
	import Nav from "./lib/Nav.svelte"


// VARIABLES
 
	let activePage = "Score"
	let panneled = false
	let menu
	let mask

	const leng = form.reduce((acc,cur)=>{
		cur.items.map(e=>{
			acc[e.title.id] = e.items.length-1
		})
		return acc
	},{})
	
	const pos = form.reduce((acc,cur)=>{
		cur.items.map(f=>{
			f.items.map((g,i)=>{
				acc[g.id] = i
			})
		})
		return acc
	},{})

	$: score = Math.round(Object.entries($formuser).filter(e=>e[1]["answer"]>0).reduce((acc,cur)=>{
		acc += pos[cur[1]["answer"]] / leng[cur[0]] * 100
		return  acc  
	},0) / Object.entries($formuser).filter(e=>e[1]["answer"]>0).length,0)

	$: monitems = form.reduce((acc,cur)=>{
		cur.items.map(f=>{
			if (Object.values($formuser).filter(e=>e["monitored"].length>0).map(e=>e["monitored"][0]).includes(f.title.id)) {
				f.items.map(g=>{
					if (Object.values($formuser).map(e=>e["answer"]).includes(g.id)) {
						acc.push({"section-id": cur.title.id ,"question-id": f.title.id, "answer-id": g.id, "icon": cur.title.icon, "question": f.title[$lang], "answer": g[$lang]})
					}
				})
			}
		})
		return acc
	},[])
	

// FUNCTIONS

	function handleNote() {
		$timeseries[currentHour()] = score
	}
	function toggleMenu() {
		panneled = !panneled
		if (panneled) {
			menu.classList.add('menu-in')
			menu.classList.remove('menu-out')
			mask.classList.add('mask-in')
			mask.classList.remove('mask-out')
		} else {
			menu.classList.add('menu-out')
			menu.classList.remove('menu-in')
			mask.classList.add('mask-out')
			mask.classList.remove('mask-in')
		}
	}

</script>

<Menu 
	toggleMenu={toggleMenu} 
	bind:menu={menu} 
	bind:mask={mask} 
	bind:lang={$lang} 
/>
<div class="wrapper">
	<div class="head flex-h">
		<Logo 
			bind:pageSet={activePage} 
			lang={$lang}
		/>
		<h1 class="sandwich" on:click={toggleMenu}>≡</h1>
	 </div>
	<div class="page">
		{#if activePage=="Score"}
			{#if !isNaN(score)}
				<Score 
					score={score} 
					lang={$lang}
				/>
				<Targets 
					bind:formUser={$formuser}
					bind:pageSet={activePage}
					bind:formPos={$formpos}
					items={monitems} 
					lang={$lang}
				/>
			{:else}
				<Noscore 
					message={getText("noscore-start", $lang)}/>
			{/if}
		{:else if activePage=="Progression"}
			{#if Object.values($timeseries).length>=2}
				<Linechart 
					bind:timeseries={$timeseries} 
					lang={$lang}
				/>
			{:else}
				<Noscore 
					message={getText("noscore-continue", $lang)}
				/>
			{/if}
		{:else}
			<Form 
				bind:formUser={$formuser}
				bind:formPos={$formpos}
				form={form} 
				handleNote={handleNote} 
				lang={$lang} 
			/>
		{/if}
	</div>
	<Nav 
		bind:pageSet={activePage}
		formPos={$formpos}
	/>
</div>
