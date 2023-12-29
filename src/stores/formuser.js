import { writable } from 'svelte/store'
import { form } from "../data/form.js"

let defo = form.reduce((acc,cur)=>{
	cur.items.map(e=>{
		acc[e.title.id] = {"answer":0, "monitored":[], "notified":[], "target":0, "frequency": "Weekly"}
	})
	return acc},{})

// Get the value out of storage on load.
let stored
if (localStorage.formuser) { 
	stored = JSON.parse(localStorage.formuser)}
else {
	stored = defo
}

// Set the stored value or a sane default.
export let formuser = writable(stored)

// Anytime the store changes, update the local storage value.
formuser.subscribe((value) => localStorage.formuser = JSON.stringify(value))
