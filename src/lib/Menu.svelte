<script>
	import Logo from "./Logo.svelte"
	import { getText } from "./Lang.js" 
	export let toggleMenu
	export let menu
	export let mask
	export let lang
	let langs = { "en-US": "🇬🇧", "fr-FR": "🇫🇷" }
</script>

<div on:click={toggleMenu} >
	<div bind:this={menu} class="menu menu-out">
		<Logo lang={lang}/>
		<ul>
			<li>{getText("menu-link1", lang)}</li>
			<li>{getText("menu-link2", lang)}</li>
			<li>{getText("menu-link3", lang)}</li>
			<li>
				<label>{getText("menu-link4", lang)} </label>
				<select bind:value={lang}>
					{#each Object.entries(langs) as option}
						<option value={option[0]}>{option[1]}</option>
					{/each}
				</select>
			</li>
		</ul>
	</div>
	<div bind:this={mask} class="mask mask-out"></div>
</div>