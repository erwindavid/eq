import { writable } from 'svelte/store'

// Get the value out of storage on load.
let stored
if (localStorage.lang) { 
	stored = localStorage.lang
} else {
	stored = "fr-FR"
}

// Set the stored value or a sane default.
export let lang = writable(stored)

// Anytime the store changes, update the local storage value.
lang.subscribe((value) => localStorage.lang = value)
