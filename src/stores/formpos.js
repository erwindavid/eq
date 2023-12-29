import { writable } from 'svelte/store'

// Get the value out of storage on load.
let stored
if (localStorage.formpos) { 
	stored = JSON.parse(localStorage.formpos)
} else {
	stored = {"activeSection": 0, "scroll": 0}
}

// Set the stored value or a sane default.
export let formpos = writable(stored)

// Anytime the store changes, update the local storage value.
formpos.subscribe((value) => localStorage.formpos = JSON.stringify(value))
