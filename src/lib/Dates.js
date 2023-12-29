function now() {
	const date = new Date()
	return Date.parse(date)
}

export function currentHour() {
	return Math.round(now()/1000/60/60,0)*1000*60*60
}

export function getMonthYear(par, lang) {
		const dt = new Date(par*1)
		const options = { month: "long" };
		const month = new Intl.DateTimeFormat(lang, options).format(dt);
		const year = dt.getFullYear()
		return month.charAt(0).toUpperCase() + month.slice(1) + " " + year
}
