<script>
let scoreboard = {}
$: score = Math.round(Object.values(scoreboard).reduce((acc,curr)=>acc+curr,0)/(Object.keys(scoreboard).length==0?1:Object.keys(scoreboard).length) ,0)
let menu = ["About", "Project", "Links"]
let questionnaire =
{
  "content": [
    {
      "title": {
        "FR": "Alimentation",
        "EN": "Food"
      },
      "items": [
        {
          "title": {
            "FR": "Je mange de la viande"
          },
          "items": [
            {
              "FR": "Jamais",
            },
            {
              "FR": "Rarement",
            },
            {
              "FR": "Principalement",
            }
          ]
        },
        {
          "title": {
            "FR": "Je mange au restaurant"
          },
          "items": [
            {
              "FR": "Parfois"
            },
            {
              "FR": "Souvent"
            },
            {
              "FR": "Principalement"
            }
          ]
        }
      ]
    },
    {
      "title": {
        "FR": "Deplacements",
        "EN": "Travel"
      },
      "items": [
        {
          "title": {
            "FR": "Je prends l'avion"
          },
          "items": [
            {
              "FR": "Jamais"
            },
            {
              "FR": "Rarement"
            },
            {
              "FR": "Principalement"
            }
          ]
        },
        {
          "title": {
            "FR": "Je possede une voiture"
          },
          "items": [
            {
              "FR": "Non"
            },
            {
              "FR": "Oui,Electirque"
            },
            {
              "FR": "Oui, Thermique"
            }
          ]
        }
      ]
    }
  ]
}


function toggleSection(e){
	if (e.target.children[1].innerText == 'ߜ') {
		e.target.children[1].innerText = 'ߡ'
		e.target.parentElement.children[1].style.display = "none"
	}
	else {
		e.target.children[1].innerText = 'ߜ'
		e.target.parentElement.children[1].style.display = "block"
	}
}

function note(event) {
	let key = event.currentTarget.getAttribute('id0').concat(event.currentTarget.getAttribute('id1'))
	let value = parseInt(event.currentTarget.getAttribute('id2'))/(event.currentTarget.parentElement.childNodes.length-1)*100
	scoreboard[key] = value
}

</script>

<body>

<header class="header">
	<h1>Quel est mon <span class="eq">QE</span> ?</h1>
	<h1 class="sandwich">≡</h1>
	<!--<nav>
		<ul>
			{#each menu as item}
				<li>{item}</li>
			{/each}
		</ul>
	</nav>-->
 </header>
 
<div class="synthesis">
	<div class="kpigroup">
		<div></div>
		<div class="kpi">{score}</div>
		<div class="pct">%</div>
	</div>
	<div class="cont">
		<div class="bar" style={`left:${score}%`}></div>
		<div class="grad"></div>
	</div>
	<br>
</div>
 
<div>
	{#each questionnaire.content as section,id0}
	<div class="section">
		<div class="sectionttl" on:click={toggleSection}>
			<h3>{section.title.FR}</h3>
			<div>ߜ</div>
		</div>
		<ol>
		{#each section.items as item, id1}
			<div>
			<h4><li>{item.title.FR}</li></h4>
			{#each item.items as answer, id2}
				<div>
					<input on:change={note} type="radio" name={item.title.FR} id0={id0} id1={id1} id2={id2}>
					<label>{answer.FR}</label>
				</div>
			{/each}
			</div>
		{/each}
		</ol>
	</div>
	{/each}

</div>

</body>

<style>

	.synthesis {
		display: block;
		margin: auto;
		width: 75%;
	}
	
	.kpigroup{
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}
	
	.pct{
		font-size: 35px;
		text-align:left;
	}

	.kpi {
		font-size: 60px;
	}
	
	.cont {
		position: relative;
		height: 40px;
	}
	
	.grad {
		position: absolute;
		top:0px;
		left:0px;
		height:100%;
		width: 100%;
		background-image: linear-gradient(to left, red , yellow, green);
	}
	
	.bar {
		z-index: 5;
		position: absolute;
		top: 0px;
		height: 100%;
		width: 5px;
		background-color: grey;
	}

	body {
		color : #333;
		font-family: sans-serif;
		max-width: 800px;
		margin: auto;
	}

	.flip {
		transform: rotate(180deg);
	}

	header, .sectionttl {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.sectionttl {
		padding: 0 10px;
		background-color: whitesmoke;
		position: sticky;
	}
	
	.sectionttl > * {
		pointer-events: none
	}
	
	h1 {
		font-weight: normal
	}
	
	.eq {
		font-weight: bolder;
		color:green;
	}
	
	ul {
		display:flex;
	}
	
	nav li {
		padding: 10px;
		list-style-type: none;
	}

</style>