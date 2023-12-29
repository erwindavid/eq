<script>
	import { getText } from "./Lang.js"
	import { getMonthYear } from "./Dates.js"
	import { uitexts } from "../data/uitexts.js"
	export let timeseries
	export let lang
	let staw = screenWidth()
	let stay = [0,25,50,75,100]
	let stah = screenHeight()*0.5
	let stal = 40
	let star = staw-stal
	$: points = Object.entries(timeseries).reduce((acc, cur) => {
		const x = getx((cur[0]-Object.keys(timeseries)[0]) / (Object.keys(timeseries).slice(-1)-Object.keys(timeseries)[0]))
		const y = gety(cur[1])
		acc.push([x,y])
		return acc
	},[])
	$: stap = points.reduce((acc,cur,i)=>{
		acc += (i==0?'M ':' L')+cur.join(' ')
		return acc
	},'')
	$: stag = stap + ' L'+getx(1)+" "+gety(0)+" L"+getx(0)+" "+gety(0)+"z"
	$: stax = Object.keys(timeseries).reduce((acc, cur)=>{
		const month = getMonthYear(cur, lang) 
		if (!acc.includes(month)){
			acc.push(month)
			}
		return acc
	},[])

	const data = uitexts
			 .filter(e=>e["id"].includes("score-hist"))
			 .reduce((acc, cur)=>{
				cur["trend"] = Boolean(Number(cur["id"].split("-")[2]))
				cur["global"] = Boolean(Number(cur["id"].split("-")[3]))
				acc.push(cur)
			 	return acc
			 },[])

	const first = Object.values(timeseries)[0]
	const penult = Object.values(timeseries).slice(-2)[0]
	const ult = Object.values(timeseries).slice(-1)[0]

	function getx(par) {
		return par*star+stal
	}
	function gety(par) {
		return (1-par/100)*stah
	}
	function screenWidth() {
		return window.innerWidth
	}
	function screenHeight() {
		return window.screen.height
	}

</script>

<h3>🗓️ {getText("progression-title", lang)}</h3>
<div class="staf">
	<svg viewBox={"0 -10 "+(staw+10)+" "+(stah+60)}>
	<style>
        .axis {
            fill: black;
        }
        @media (prefers-color-scheme: dark) {
            .axis { fill: white; }
        }
	</style>
	<defs>
        <linearGradient 
			id="stag" 
			x1="0%" 
			y1="0%" 
			x2="0%" 
			y2="100%"
		>
        	<stop 
				offset="0%" 
				style="stop-color: green; stop-opacity: 0.3"
			/>
        	<stop 
				offset="100%" 
				style="stop-color: green; stop-opacity: 0" 
			/>
        </linearGradient>
    </defs>
		<path 
			class="stag" 
			d={stag} 
			stroke="none"
		/>
		{#each stay as yy} 
			<text x="0" y={(1-yy/100)*stah+5}>{yy}%</text>
			<line x1={yy==100?42:yy==0?22:32} 
				  y1={(1-yy/100)*stah} 
				  x2={staw}
				  y2={(1-yy/100)*stah} 
				  stroke="grey" 
				  stroke-width="0.5"
				  stroke-dasharray={yy==0?0:3}
			/>
		{/each}
		{#each points as point}
			<circle 
				cx={point[0]} 
				cy={point[1]} 
				r="4" 
				fill="green"
			/>
		{/each}
		{#each stax as xx}
			<text class="axis"
				x={staw/stax.length/2} 
				y={stah+stal}
				dominant-baseline="middle" 
				text-anchor="middle" 
			>
				{xx}
			</text>
		{/each}
		<path 
			d={stap} 
			stroke="green" 
			fill="none" 
			stroke-width="3"
		/>
		<line 
			x1={getx(0)}
			y1={gety(12)}
			x2={getx(1)} 
			y2={gety(12)}
			stroke="brown" 
			stroke-width="2"
			stroke-dasharray="8"
			stroke-linecap="round"
		/>
		<text
			x={getx(0)}
			y={gety(12+2)}
			fill="brown"
			font-size="small"
		>	{getText("score-chart-vs1", lang)}
		</text>
		<line 
			x1={getx(0)}
			y1={gety(30)}
			x2={getx(1)} 
			y2={gety(30)}
			stroke="chocolate" 
			stroke-width="2"
			stroke-dasharray="8"
			stroke-linecap="round"
		/>
		<text
			x={getx(0)}
			y={gety(30+2)}
			fill="chocolate"
			font-size="small"
		>	{getText("score-chart-vs2", lang)}
		</text>
		<line 
			x1={getx(0)}
			y1={gety(48)}
			x2={getx(1)} 
			y2={gety(48)}
			stroke="orange" 
			stroke-width="2"
			stroke-dasharray="8"
			stroke-linecap="round"
		/>
		<image
			x={getx(0)}  
			y={gety(48+7)}
			width="20" 
			height="20" 
			href="/src/assets/EQ2.svg" 
		/>
	</svg>
	<div class="btm-space">
		<b>{getText("progression-subtitle", lang)}</b>
		{#each data as e}
			{#if (ult>=penult) == e["trend"] & (ult>=first) == e["global"] }
				<p style="text-align: justify">{e[lang]}</p>
			{/if}
		{/each}
	</div>
</div>