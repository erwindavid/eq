import { uitexts } from "../data/uitexts.js"

export function getText(par, lang) {
	return uitexts.reduce((acc,cur)=>{
		if (cur['id']==par) {
			acc = cur[lang]
		}
		return acc
	},'')
}