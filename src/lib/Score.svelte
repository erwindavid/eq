<script>
	import { uitexts } from "../data/uitexts.js"
	import { getText } from "../lib/Lang.js"
	export let score
	export let lang
	$: chartitems = 
	[
		{
			"x" : 12,
			"text-y": 90,
			"color" : "brown",
			"text" : getText("score-chart-vs1", lang),
			"font-size": "small",
			"font-weight": "normal",
			"mark" : "▲",
			"mark-y" : 73,
			"stroke" : 0.3
		},
		{
			"x" : 30,
			"text-y": 90,
			"color" : "chocolate",
			"text" : getText("score-chart-vs2", lang),
			"font-size": "small",
			"font-weight": "normal",
			"mark" : "▲",
			"mark-y" : 73,
			"stroke" : 0.3
		},
		{
			"x" : 48,
			"text-y": 78,
			"color" : "orange",
			"text" : "users",
			"font-size": "small",
			"font-weight": "normal",
			"mark" : "▲",
			"mark-y" : 73,
			"stroke" : 0.3
		},
		{
			"x" : score,
			"text-y" : 8,
			"color" : "#444",
			"text" : getText("score-chart-me", lang),
			"font-size": "normal",
			"font-weight": "bold",
			"mark" : "▼",
			"mark-y": 21,
			"stroke": 2
		}
	]
	const data = uitexts
			 .filter(e=>e["id"].includes("score-text"))
			 .reduce((acc, cur)=>{
				cur["start"] = Number(cur["id"].split("-")[2])
				cur["end"] = Number(cur["id"].split("-")[3])
				acc.push(cur)
			 	return acc
			 },[])
</script>

<div class="score">
	<div class="kpi">
		<div></div>
		<div class="figure">{score}</div>
		<div class="pct">%</div>
	</div>
	<svg width="100%" height="100px">
		<defs>
	        <linearGradient 
				id="stag" 
				x1="0%" 
				y1="0%" 
				x2="100%" 
				y2="0%"
			>
	        	<stop 
					offset="0%" 
					style="stop-color: red; stop-opacity: 1" 
				/>
	        	<stop 
					offset="50%"
					style="stop-color: yellow; stop-opacity: 1" 
				/>
	        	<stop 
					offset="100%" 
					style="stop-color: green; stop-opacity: 1" 
				/>
	        </linearGradient>
	    </defs>
		<rect 
			class="stag" 
			width="100%" 
			height="45" 
			y="24" 
			rx="5"
		/>
		{#each chartitems as e}
			<line 
				x1={e["x"]+"%"} 
				y1="24" 
				x2={e["x"]+"%"} 
				y2="68" 
				stroke={e["color"]} 
				stroke-width={e["stroke"]}
			/>
			<text 
				x={e["x"]+"%"} 
				y={e["mark-y"]} 
				dominant-baseline="middle" 
				text-anchor="middle" 
				font-size="x-small" 
				fill={e["color"]}
			>
				{e["mark"]}
			</text>
			{#if e["text"] != "users"}
				<text 
					x={e["x"]+"%"} 
					y={e["text-y"]} 
					dominant-baseline="middle" 
					text-anchor="middle" 
					font-size={e["font-size"]} 
					fill={e["color"]} 
					font-weight={e["font-weight"]}
				>
					{e["text"]}
				</text>
			{:else}
				<image
					x={e["x"]+"%"}  
					y={e["text-y"]}
					transform='translate(-10 0)'
					width="20" 
					height="20" 
					href="/eq/src/assets/EQ2.svg" 
				/>
			{/if}
		{/each}
	</svg>
		{#each data as e}
			{#if score >= e["start"] && score < e["end"] }
				<h2 class="text-center">{e[lang]}</h2>
			{/if}
		{/each}
</div>


