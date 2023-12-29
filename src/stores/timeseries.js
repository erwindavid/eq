import { writable } from 'svelte/store'
import { currentHour } from "../lib/Dates.js"


let stored
if (localStorage.timeseries) { 
	stored = JSON.parse(localStorage.timeseries)}
else {
	stored = {[currentHour()]: 0}
}

export let timeseries = writable(stored)

timeseries.subscribe((value) => localStorage.timeseries = JSON.stringify(value))
